"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";

import type { Registration, RegistrationStatus } from "@/lib/types";

// ─── Types ──────────────────────────────────────────────────

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

type SortField = "created_at" | "full_name" | "ticket_number" | "registration_status";

interface ConfirmAction {
  reg: Registration;
  status: RegistrationStatus;
}

// ─── Status helpers ─────────────────────────────────────────

const STATUS_LABELS: Record<RegistrationStatus, string> = {
  pending: "Изчакващ",
  approved: "Одобрен",
  rejected: "Отхвърлен",
};

const STATUS_COLORS: Record<RegistrationStatus, string> = {
  pending: "bg-white/10 text-white/70",
  approved: "bg-emerald-500/15 text-emerald-400",
  rejected: "bg-red-500/15 text-red-400",
};

// ─── Main Component ─────────────────────────────────────────

export function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [pagination, setPagination] = useState<Pagination>({
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
  const [toast, setToast] = useState<{ message: string; type: "ok" | "error" } | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const [regOpen, setRegOpen] = useState(true);
  const [regToggleLoading, setRegToggleLoading] = useState(false);
  const [regToggleStep, setRegToggleStep] = useState<0 | 1 | 2>(0); // 0=hidden, 1=first confirm, 2=final confirm

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
    [search, statusFilter, sort, order, page]
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

  // Close sheet on Escape
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

  // Show toast
  function showToast(message: string, type: "ok" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
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

  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-70 px-6 py-4 font-mono text-[13px] border shadow-lg ${
            toast.type === "ok"
              ? "bg-emerald-950 border-emerald-500/40 text-emerald-400"
              : "bg-red-950 border-red-500/40 text-red-400"
          } animate-[fadeIn_0.3s_ease]`}
        >
          {toast.message}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <>
          <div
            className="fixed inset-0 z-60 bg-black/70 backdrop-blur-[3px] animate-[fadeIn_0.15s_ease]"
            onClick={() => setConfirmAction(null)}
          />
          <div className="fixed inset-0 z-61 flex items-center justify-center p-4">
            <div
              role="dialog"
              aria-labelledby="confirm-dialog-title"
              aria-modal="true"
              className="bg-card border border-white/10 p-6 max-w-[400px] w-full animate-[fadeUp_0.2s_ease]"
            >
              <div id="confirm-dialog-title" className="font-display text-xl mb-2">
                {confirmAction.status === "approved" ? "ОДОБРЯВАНЕ" : "ОТХВЪРЛЯНЕ"}
              </div>
              <p className="font-mono text-[13px] text-white/60 leading-[1.7] mb-2">
                {confirmAction.status === "approved"
                  ? "Сигурен ли си, че искаш да одобриш"
                  : "Сигурен ли си, че искаш да отхвърлиш"}{" "}
                <span className="text-white font-bold">{confirmAction.reg.full_name}</span>?
              </p>
              <p className="font-mono text-[11px] text-white/40 mb-6">
                Ще бъде изпратен имейл до {confirmAction.reg.email}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase border border-white/15 text-white/50 px-5 py-2.5 cursor-pointer transition-all hover:text-white hover:border-white/30"
                >
                  Отказ
                </button>
                <button
                  onClick={confirmStatusChange}
                  className={`flex-1 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-2.5 cursor-pointer transition-all ${
                    confirmAction.status === "approved"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                      : "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25"
                  }`}
                >
                  {confirmAction.status === "approved" ? "Одобри" : "Отхвърли"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Registration Toggle — Double Confirmation */}
      {regToggleStep > 0 && (
        <>
          <div
            className="fixed inset-0 z-60 bg-black/80 backdrop-blur-[4px] animate-[fadeIn_0.15s_ease]"
            onClick={() => setRegToggleStep(0)}
          />
          <div className="fixed inset-0 z-61 flex items-center justify-center p-4">
            <div
              role="dialog"
              aria-labelledby="confirm-reg-toggle-title"
              aria-modal="true"
              className="bg-card border border-white/10 p-7 max-w-[460px] w-full animate-[fadeUp_0.2s_ease] shadow-2xl"
            >
              {regToggleStep === 1 ? (
                <>
                  <div
                    id="confirm-reg-toggle-title"
                    className={`font-display text-2xl mb-3 ${regOpen ? "text-red-400" : "text-emerald-400"}`}
                  >
                    {regOpen ? "ЗАТВАРЯНЕ НА РЕГИСТРАЦИЯТА" : "ОТВАРЯНЕ НА РЕГИСТРАЦИЯТА"}
                  </div>
                  <div className="font-mono text-[13px] text-white/60 leading-[1.8] mb-4 space-y-2">
                    {regOpen ? (
                      <>
                        <p>
                          Това ще <span className="text-red-400 font-bold">блокира</span> всички
                          нови регистрации:
                        </p>
                        <ul className="list-disc list-inside text-white/45 space-y-1 pl-1">
                          <li>
                            Формата за регистрация ще покаже &quot;Регистрацията е затворена&quot;
                          </li>
                          <li>API-то ще отхвърля нови заявки</li>
                          <li>Бутоните за регистрация ще бъдат деактивирани на сайта</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>
                          Това ще <span className="text-emerald-400 font-bold">отвори</span>{" "}
                          регистрациите отново:
                        </p>
                        <ul className="list-disc list-inside text-white/45 space-y-1 pl-1">
                          <li>Потребителите ще могат да се регистрират</li>
                          <li>Формата и бутоните ще бъдат активни на сайта</li>
                          <li>API-то ще приема нови заявки</li>
                        </ul>
                      </>
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-white/30 mb-6">
                    Промяната влиза в сила веднага за всички потребители.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setRegToggleStep(0)}
                      className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase border border-white/15 text-white/50 px-5 py-3 cursor-pointer transition-all hover:text-white hover:border-white/30"
                    >
                      Отказ
                    </button>
                    <button
                      onClick={() => setRegToggleStep(2)}
                      className={`flex-1 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 cursor-pointer transition-all ${
                        regOpen
                          ? "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25"
                          : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                      }`}
                    >
                      Продължи →
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`font-display text-2xl mb-3 ${regOpen ? "text-red-400" : "text-emerald-400"}`}
                  >
                    СИГУРЕН ЛИ СИ?
                  </div>
                  <p className="font-mono text-[14px] text-white/70 leading-[1.8] mb-2">
                    {regOpen
                      ? "Потвърди, че искаш да ЗАТВОРИШ регистрацията."
                      : "Потвърди, че искаш да ОТВОРИШ регистрацията."}
                  </p>
                  <p className="font-mono text-[11px] text-white/30 mb-6">
                    Тази стъпка не може да бъде отменена автоматично — ще трябва ръчно да превключиш
                    обратно.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setRegToggleStep(1)}
                      className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase border border-white/15 text-white/50 px-5 py-3 cursor-pointer transition-all hover:text-white hover:border-white/30"
                    >
                      ← Назад
                    </button>
                    <button
                      onClick={confirmAndToggleRegistration}
                      className={`flex-1 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 cursor-pointer transition-all font-bold ${
                        regOpen
                          ? "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                      }`}
                    >
                      {regOpen ? "ЗАТВОРИ РЕГИСТРАЦИЯТА" : "ОТВОРИ РЕГИСТРАЦИЯТА"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Header */}
      <header className="border-b border-white/7 px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/">
          <span className="font-display text-xl">
            <span className="text-acid">RUSE</span> AI HACK
          </span>
          <span className="font-mono text-[10px] text-white/30 ml-3 tracking-[0.14em]">ADMIN</span>
        </Link>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
              Регистрация
            </span>
            <button
              onClick={() => setRegToggleStep(1)}
              disabled={regToggleLoading}
              className={`relative w-11 h-6 rounded-full border transition-colors duration-200 cursor-pointer disabled:opacity-50 ${
                regOpen
                  ? "bg-emerald-500/20 border-emerald-500/40"
                  : "bg-red-500/15 border-red-500/30"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-200 ${
                  regOpen ? "translate-x-5 bg-emerald-400" : "translate-x-0 bg-red-400"
                }`}
              />
            </button>
            <span
              className={`font-mono text-[10px] tracking-widest uppercase ${
                regOpen ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {regOpen ? "ON" : "OFF"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="font-mono text-[11px] text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            Изход
          </button>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {(
            [
              { label: "Общо", value: stats.total, cls: "text-white" },
              { label: "Изчакващи", value: stats.pending, cls: "text-white/70" },
              { label: "Одобрени", value: stats.approved, cls: "text-emerald-400" },
              { label: "Отхвърлени", value: stats.rejected, cls: "text-red-400" },
            ] as const
          ).map((s) => (
            <div key={s.label} className="border border-white/7 bg-card p-4">
              <div className="font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase">
                {s.label}
              </div>
              <div className={`font-display text-3xl mt-1 ${s.cls}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Търси по име или имейл..."
            className="flex-1 py-2.5 px-3.5 text-xs bg-white/3 border border-white/12 text-white font-mono outline-none transition-colors duration-200 focus:border-acid placeholder:text-white/20"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2.5 px-3.5 text-xs bg-white/3 border border-white/12 text-white font-mono outline-none cursor-pointer"
          >
            <option value="all">Всички статуси</option>
            <option value="pending">Изчакващи</option>
            <option value="approved">Одобрени</option>
            <option value="rejected">Отхвърлени</option>
          </select>
          <a
            href="/api/kcah-ia-esur/export-csv"
            download
            className="py-2.5 px-4 text-xs bg-white/3 border border-white/12 text-white/60 font-mono transition-colors duration-200 hover:text-acid hover:border-acid/30 no-underline whitespace-nowrap text-center"
          >
            ↓ CSV Export
          </a>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-14 bg-white/2 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20 font-mono text-sm text-white/30">
            Няма намерени регистрации
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block border border-white/7 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/7 bg-white/2">
                    {[
                      { field: "ticket_number" as SortField, label: "#" },
                      { field: "full_name" as SortField, label: "Име" },
                      { field: null, label: "Имейл" },
                      { field: null, label: "Роля" },
                      { field: "registration_status" as SortField, label: "Статус" },
                      { field: "created_at" as SortField, label: "Дата" },
                    ].map((col, i) => (
                      <th
                        key={i}
                        onClick={col.field ? () => handleSort(col.field!) : undefined}
                        className={`font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase px-4 py-3 ${
                          col.field ? "cursor-pointer hover:text-acid transition-colors" : ""
                        } ${sort === col.field ? "text-acid" : ""}`}
                      >
                        {col.label}
                        {sort === col.field && (order === "asc" ? " ↑" : " ↓")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((reg) => (
                    <tr
                      key={reg.id}
                      onClick={() => setSelectedReg(reg)}
                      className={`border-b border-white/5 cursor-pointer transition-colors group ${
                        selectedReg?.id === reg.id ? "bg-acid/3" : "hover:bg-white/3"
                      }`}
                    >
                      <td className="px-4 py-3.5 font-mono text-[12px] text-acid/70">
                        {String(reg.ticket_number).padStart(4, "0")}
                      </td>
                      <td className="px-4 py-3.5 font-body text-[14px] font-bold">
                        {reg.full_name}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[12px] text-white/50">
                        {reg.email}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[12px] text-white/40">
                        {reg.role}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={reg.registration_status} />
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[11px] text-white/30">
                        {fmtDate(reg.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {data.map((reg) => (
                <div
                  key={reg.id}
                  onClick={() => setSelectedReg(reg)}
                  className={`border bg-card transition-colors cursor-pointer ${
                    selectedReg?.id === reg.id ? "border-acid/20" : "border-white/7"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-body text-[15px] font-bold">{reg.full_name}</div>
                        <div className="font-mono text-[12px] text-white/40 mt-0.5">
                          {reg.email}
                        </div>
                      </div>
                      <StatusBadge status={reg.registration_status} />
                    </div>
                    <div className="flex items-center gap-3 mt-2 font-mono text-[11px] text-white/30">
                      <span>#{String(reg.ticket_number).padStart(4, "0")}</span>
                      <span>{reg.role}</span>
                      <span>{fmtDate(reg.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <div className="font-mono text-[11px] text-white/30">
                  {(page - 1) * pagination.pageSize + 1}–
                  {Math.min(page * pagination.pageSize, pagination.total)} от {pagination.total}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    className="font-mono text-[11px] px-3 py-1.5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    ← Назад
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`font-mono text-[11px] px-3 py-1.5 border transition-colors cursor-pointer ${
                        p === page
                          ? "border-acid/40 text-acid bg-acid/5"
                          : "border-white/10 text-white/40 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= pagination.totalPages}
                    className="font-mono text-[11px] px-3 py-1.5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    Напред →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Sheet overlay + panel */}
      {selectedReg && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease]"
            onClick={() => setSelectedReg(null)}
          />
          <aside className="fixed top-0 right-0 z-50 h-full w-full max-w-[520px] bg-bg border-l border-white/7 overflow-y-auto animate-[slideIn_0.25s_ease]">
            <SheetContent
              reg={selectedReg}
              onClose={() => setSelectedReg(null)}
              onUpdateStatus={requestStatusChange}
              isLoading={actionLoading === selectedReg.id}
              fmtDate={fmtDate}
            />
          </aside>
        </>
      )}
    </div>
  );
}

// ─── Sheet Content ──────────────────────────────────────────

function SheetContent({
  reg,
  onClose,
  onUpdateStatus,
  isLoading,
  fmtDate,
}: {
  reg: Registration;
  onClose: () => void;
  onUpdateStatus: (reg: Registration, status: RegistrationStatus) => void;
  isLoading: boolean;
  fmtDate: (iso: string) => string;
}) {
  const fields: [string, string | null][] = [
    ["Телефон", reg.phone],
    ["Възраст", reg.age],
    ["Организация", reg.organization],
    ["Dev опит", reg.dev_experience],
    ["AI опит", reg.ai_experience],
    ["AI инструменти", reg.ai_tools],
    ["Има тема", reg.has_theme],
    ["Описание на тема", reg.theme_description],
    ["Има отбор", reg.has_team],
    ["Име на отбор", reg.team_name],
    ["Иска предизвикателство", reg.want_challenge],
    ["Доброволец", reg.volunteer_help],
    ["GitHub", reg.github_handle],
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Sheet header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/7">
        <div>
          <div className="font-body text-lg font-bold">{reg.full_name}</div>
          <div className="flex items-center gap-3 mt-1">
            <span className="font-mono text-[12px] text-acid/70">
              #{String(reg.ticket_number).padStart(4, "0")}
            </span>
            <StatusBadge status={reg.registration_status} />
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/30 hover:text-white transition-colors cursor-pointer p-1"
        >
          <X size={18} />
        </button>
      </div>

      {/* Sheet body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Contact */}
        <div className="flex items-center gap-4 font-mono text-[13px]">
          <span className="text-white/50">{reg.email}</span>
          <span className="text-white/20">·</span>
          <span className="text-white/40">{reg.role}</span>
          <span className="text-white/20">·</span>
          <span className="text-white/30">{fmtDate(reg.created_at)}</span>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          {fields.map(
            ([label, value]) =>
              value && (
                <div key={label}>
                  <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-1">
                    {label}
                  </div>
                  <div className="font-mono text-[14px] text-white/85">{value}</div>
                </div>
              )
          )}
        </div>

        {/* Motivation */}
        <div>
          <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2">
            Мотивация
          </div>
          <div className="font-mono text-[13px] text-white/70 leading-[1.8] bg-white/2 p-4 border border-white/5">
            {reg.motivation}
          </div>
        </div>

        {/* Expectations */}
        <div>
          <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2">
            Очаквания
          </div>
          <div className="font-mono text-[13px] text-white/70 leading-[1.8] bg-white/2 p-4 border border-white/5">
            {reg.expectations}
          </div>
        </div>

        {/* Notes */}
        {reg.notes && (
          <div>
            <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2">
              Бележки
            </div>
            <div className="font-mono text-[13px] text-white/60 leading-[1.8]">{reg.notes}</div>
          </div>
        )}
      </div>

      {/* Sheet footer with actions */}
      <div className="px-6 py-5 border-t border-white/7 flex gap-3">
        {reg.registration_status !== "approved" && (
          <button
            onClick={() => onUpdateStatus(reg, "approved")}
            disabled={isLoading}
            className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-6 py-2.5 cursor-pointer transition-all hover:bg-emerald-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "Одобри"}
          </button>
        )}
        {reg.registration_status !== "rejected" && (
          <button
            onClick={() => onUpdateStatus(reg, "rejected")}
            disabled={isLoading}
            className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase bg-red-500/15 text-red-400 border border-red-500/30 px-6 py-2.5 cursor-pointer transition-all hover:bg-red-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "Отхвърли"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Status Badge ───────────────────────────────────────────

function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span
      className={`inline-block font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
