"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { Registration, RegistrationStatus } from "@/lib/types";
import type { AdminStats, AdminPagination, SortField, ConfirmAction } from "@/constants";
import { STATUS_LABELS } from "@/constants";
import { ADMIN_API } from "@/lib";

type ShowToast = (message: string, type: "ok" | "error") => void;

export function useAdminRegistrations(showToast: ShowToast) {
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
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  // ── Fetch list ─────────────────────────────────────────────────
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
        const res = await fetch(ADMIN_API.registrations(params.toString()));
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
    fetch(ADMIN_API.registrationToggle)
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
      if (e.key !== "Escape") return;
      if (broadcastOpen) setBroadcastOpen(false);
      else if (regToggleStep > 0) setRegToggleStep(0);
      else if (confirmAction) setConfirmAction(null);
      else setSelectedReg(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmAction, regToggleStep, broadcastOpen]);

  // ── Debounced search ───────────────────────────────────────────
  function handleSearch(val: string) {
    setSearch(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchData({ search: val, page: 1 });
    }, 300);
  }

  function handleSort(field: SortField) {
    if (sort === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(field);
      setOrder("asc");
    }
  }

  function goToPage(p: number) {
    setPage(p);
    setSelectedReg(null);
    fetchData({ page: p });
  }

  function requestStatusChange(reg: Registration, newStatus: RegistrationStatus) {
    setConfirmAction({ reg, status: newStatus });
  }

  // ── Status update ──────────────────────────────────────────────
  async function confirmStatusChange() {
    if (!confirmAction) return;
    const { reg, status: newStatus } = confirmAction;
    setConfirmAction(null);
    setActionLoading(reg.id);
    try {
      const res = await fetch(ADMIN_API.registration(reg.id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration_status: newStatus }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);

      const emailRes = await fetch(ADMIN_API.sendEmail, {
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

      const updatedReg = { ...reg, registration_status: newStatus };
      setSelectedReg((prev) => (prev?.id === reg.id ? updatedReg : prev));
      fetchData();
    } catch {
      showToast("Грешка при обновяване", "error");
    } finally {
      setActionLoading(null);
    }
  }

  // ── Registration toggle ────────────────────────────────────────
  async function confirmAndToggleRegistration() {
    setRegToggleStep(0);
    setRegToggleLoading(true);
    try {
      const res = await fetch(ADMIN_API.registrationToggle, {
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

  // ── Broadcast ──────────────────────────────────────────────────
  async function sendBroadcast(payload: {
    subject: string;
    body: string;
    recipientFilter: "all" | "approved" | "pending" | "rejected";
  }) {
    setBroadcastLoading(true);
    try {
      const res = await fetch(ADMIN_API.broadcastEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.ok) {
        showToast(`Изпратени: ${json.sent}/${json.total} имейла`, "ok");
        setBroadcastOpen(false);
      } else {
        showToast(json.error || "Грешка при изпращане", "error");
      }
    } catch {
      showToast("Грешка при изпращане", "error");
    } finally {
      setBroadcastLoading(false);
    }
  }

  // Notes updated in sheet — sync list + selected row
  function handleNotesUpdated(reg: Registration, newNotes: string) {
    const updated = { ...reg, notes: newNotes || null };
    setSelectedReg(updated);
    setData((prev) => prev.map((r) => (r.id === reg.id ? updated : r)));
  }

  async function handleLogout() {
    await fetch(ADMIN_API.auth, { method: "DELETE" });
    router.push("/kcah-ia-esur/login");
  }

  const selectedRegLoading = selectedReg != null && actionLoading === selectedReg.id;

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
    selectedRegLoading,
    confirmAction,
    setConfirmAction,
    regOpen,
    regToggleLoading,
    regToggleStep,
    setRegToggleStep,
    broadcastOpen,
    setBroadcastOpen,
    broadcastLoading,
    sendBroadcast,
    handleNotesUpdated,
    handleSearch,
    handleSort,
    goToPage,
    requestStatusChange,
    confirmStatusChange,
    confirmAndToggleRegistration,
    handleLogout,
    showToast,
  };
}
