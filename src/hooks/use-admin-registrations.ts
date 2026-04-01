"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { Registration, RegistrationStatus } from "@/lib/types";
import type { AdminStats, AdminPagination, SortField, ConfirmAction } from "@/constants";
import { STATUS_LABELS } from "@/constants";

export function useAdminRegistrations(showToast: (message: string, type: "ok" | "error") => void) {
  const router = useRouter();
  const [data, setData] = useState<Registration[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [pagination, setPagination] = useState<AdminPagination>({
    page: 1,
    pageSize: 50,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState<SortField>("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const [regOpen, setRegOpen] = useState(true);
  const [regToggleLoading, setRegToggleLoading] = useState(false);
  const [regToggleStep, setRegToggleStep] = useState<0 | 1 | 2>(0);

  // Fetch data
  const fetchData = useCallback(
    async (overrides?: { search?: string; page?: number }) => {
      setLoading(true);
      const params = new URLSearchParams();
      const s = overrides?.search ?? search;
      const p = overrides?.page ?? page;
      if (s) params.set("search", s);
      if (statusFilter !== "all") params.set("status", statusFilter);
      params.set("sort", sort);
      params.set("order", order);
      params.set("page", String(p));

      try {
        const res = await fetch(`/api/kcah-ia-esur/registrations?${params}`);
        const json = await res.json();
        if (json.ok) {
          setData(json.data);
          setStats(json.stats);
          setPagination(json.pagination);
        }
      } catch {
        showToast("Грешка при зареждане", "error");
      } finally {
        setLoading(false);
      }
    },
    [search, statusFilter, sort, order, page, showToast]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetch registration open/closed status
  useEffect(() => {
    fetch("/api/kcah-ia-esur/registration-toggle")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setRegOpen(d.open);
      })
      .catch(() => {});
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, sort, order]);

  // Close sheet/modals on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (regToggleStep > 0) {
          setRegToggleStep(0);
        } else if (confirmAction) {
          setConfirmAction(null);
        } else {
          setSelectedReg(null);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmAction, regToggleStep]);

  // Debounced search
  function handleSearch(val: string) {
    setSearch(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchData({ search: val, page: 1 });
    }, 300);
  }

  // Sort toggle
  function handleSort(field: SortField) {
    if (sort === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(field);
      setOrder("asc");
    }
  }

  // Page change
  function goToPage(p: number) {
    setPage(p);
    setSelectedReg(null);
    fetchData({ page: p });
  }

  // Request confirmation before status change
  function requestStatusChange(reg: Registration, newStatus: RegistrationStatus) {
    setConfirmAction({ reg, status: newStatus });
  }

  // Confirm and execute status update
  async function confirmStatusChange() {
    if (!confirmAction) return;
    const { reg, status: newStatus } = confirmAction;
    setConfirmAction(null);
    setActionLoading(reg.id);
    try {
      const res = await fetch(`/api/kcah-ia-esur/registrations/${reg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration_status: newStatus }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);

      // Send email
      const emailRes = await fetch("/api/kcah-ia-esur/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: reg.id,
          email: reg.email,
          fullName: reg.full_name,
          status: newStatus,
          ticketNumber: reg.ticket_number,
          ticketId: reg.ticket_id,
        }),
      });
      const emailJson = await emailRes.json();

      if (emailJson.ok) {
        showToast(`${STATUS_LABELS[newStatus]} + имейл изпратен`, "ok");
      } else {
        showToast(`${STATUS_LABELS[newStatus]}, но имейлът не беше изпратен`, "error");
      }

      // Update the selected reg in sheet if it's the same one
      const updatedReg = { ...reg, registration_status: newStatus };
      setSelectedReg((prev) => (prev?.id === reg.id ? updatedReg : prev));
      fetchData();
    } catch {
      showToast("Грешка при обновяване", "error");
    } finally {
      setActionLoading(null);
    }
  }

  // Toggle registration open/closed (with double confirmation)
  async function confirmAndToggleRegistration() {
    setRegToggleStep(0);
    setRegToggleLoading(true);
    try {
      const res = await fetch("/api/kcah-ia-esur/registration-toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ open: !regOpen }),
      });
      const json = await res.json();
      if (json.ok) {
        setRegOpen(json.open);
        showToast(json.open ? "Регистрацията е отворена" : "Регистрацията е затворена", "ok");
      }
    } catch {
      showToast("Грешка при промяна", "error");
    } finally {
      setRegToggleLoading(false);
    }
  }

  // Logout
  async function handleLogout() {
    await fetch("/api/kcah-ia-esur/auth", { method: "DELETE" });
    router.push("/kcah-ia-esur/login");
  }

  // Format date
  function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString("bg-BG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return {
    data,
    stats,
    pagination,
    loading,
    search,
    statusFilter,
    setStatusFilter,
    sort,
    order,
    page,
    selectedReg,
    setSelectedReg,
    actionLoading,
    confirmAction,
    setConfirmAction,
    regOpen,
    regToggleLoading,
    regToggleStep,
    setRegToggleStep,
    handleSearch,
    handleSort,
    goToPage,
    requestStatusChange,
    confirmStatusChange,
    confirmAndToggleRegistration,
    handleLogout,
    fmtDate,
  };
}
