"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "ok" | "error" } | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>(null);

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

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, sort, order]);

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
    setExpandedId(null);
    fetchData({ page: p });
  }

  // Show toast
  function showToast(message: string, type: "ok" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Update status
  async function updateStatus(reg: Registration, newStatus: RegistrationStatus) {
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

      fetchData();
    } catch {
      showToast("Грешка при обновяване", "error");
    } finally {
      setActionLoading(null);
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
          className={`fixed top-4 right-4 z-50 px-5 py-3 font-mono text-[12px] border ${
            toast.type === "ok"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          } animate-[fadeIn_0.3s_ease]`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/7 px-4 md:px-8 py-4 flex items-center justify-between">
        <div>
          <span className="font-display text-xl">
            <span className="text-acid">RUSE</span> AI HACK
          </span>
          <span className="font-mono text-[10px] text-white/30 ml-3 tracking-[0.14em]">ADMIN</span>
        </div>
        <button
          onClick={handleLogout}
          className="font-mono text-[11px] text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          Изход
        </button>
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
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-14 bg-white/[0.02] border border-white/5 animate-pulse" />
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
                  <tr className="border-b border-white/7 bg-white/[0.02]">
                    {[
                      { field: "ticket_number" as SortField, label: "#" },
                      { field: "full_name" as SortField, label: "Име" },
                      { field: null, label: "Имейл" },
                      { field: null, label: "Роля" },
                      { field: "registration_status" as SortField, label: "Статус" },
                      { field: "created_at" as SortField, label: "Дата" },
                      { field: null, label: "" },
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
                    <TableRow
                      key={reg.id}
                      reg={reg}
                      expanded={expandedId === reg.id}
                      onToggle={() => setExpandedId(expandedId === reg.id ? null : reg.id)}
                      onUpdateStatus={updateStatus}
                      actionLoading={actionLoading}
                      fmtDate={fmtDate}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {data.map((reg) => (
                <MobileCard
                  key={reg.id}
                  reg={reg}
                  expanded={expandedId === reg.id}
                  onToggle={() => setExpandedId(expandedId === reg.id ? null : reg.id)}
                  onUpdateStatus={updateStatus}
                  actionLoading={actionLoading}
                  fmtDate={fmtDate}
                />
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
    </div>
  );
}

// ─── Table Row ──────────────────────────────────────────────

function TableRow({
  reg,
  expanded,
  onToggle,
  onUpdateStatus,
  actionLoading,
  fmtDate,
}: {
  reg: Registration;
  expanded: boolean;
  onToggle: () => void;
  onUpdateStatus: (reg: Registration, status: RegistrationStatus) => void;
  actionLoading: string | null;
  fmtDate: (iso: string) => string;
}) {
  const isLoading = actionLoading === reg.id;

  return (
    <>
      <tr
        onClick={onToggle}
        className={`border-b border-white/5 cursor-pointer transition-colors group ${
          expanded ? "bg-acid/[0.03]" : "hover:bg-white/[0.03]"
        }`}
      >
        <td className="px-4 py-3.5 font-mono text-[12px] text-acid/70">
          {String(reg.ticket_number).padStart(4, "0")}
        </td>
        <td className="px-4 py-3.5 font-body text-[14px] font-bold">{reg.full_name}</td>
        <td className="px-4 py-3.5 font-mono text-[12px] text-white/50">{reg.email}</td>
        <td className="px-4 py-3.5 font-mono text-[12px] text-white/40">{reg.role}</td>
        <td className="px-4 py-3.5">
          <StatusBadge status={reg.registration_status} />
        </td>
        <td className="px-4 py-3.5 font-mono text-[11px] text-white/30">
          {fmtDate(reg.created_at)}
        </td>
        <td className="px-4 py-3.5 font-mono text-[11px] text-white/20 group-hover:text-white/50 transition-colors">
          {expanded ? "▲" : "▼"}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={7} className="bg-white/[0.02] border-b border-acid/10 px-6 py-6">
            <DetailPanel reg={reg} onUpdateStatus={onUpdateStatus} isLoading={isLoading} />
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Mobile Card ────────────────────────────────────────────

function MobileCard({
  reg,
  expanded,
  onToggle,
  onUpdateStatus,
  actionLoading,
  fmtDate,
}: {
  reg: Registration;
  expanded: boolean;
  onToggle: () => void;
  onUpdateStatus: (reg: Registration, status: RegistrationStatus) => void;
  actionLoading: string | null;
  fmtDate: (iso: string) => string;
}) {
  const isLoading = actionLoading === reg.id;

  return (
    <div
      className={`border bg-card transition-colors ${expanded ? "border-acid/20" : "border-white/7"}`}
    >
      <div onClick={onToggle} className="p-4 cursor-pointer">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body text-[15px] font-bold">{reg.full_name}</div>
            <div className="font-mono text-[12px] text-white/40 mt-0.5">{reg.email}</div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={reg.registration_status} />
            <span className="font-mono text-[11px] text-white/20">{expanded ? "▲" : "▼"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2 font-mono text-[11px] text-white/30">
          <span>#{String(reg.ticket_number).padStart(4, "0")}</span>
          <span>{reg.role}</span>
          <span>{fmtDate(reg.created_at)}</span>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-white/5 p-4">
          <DetailPanel reg={reg} onUpdateStatus={onUpdateStatus} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}

// ─── Status Badge ───────────────────────────────────────────

function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span
      className={`inline-block font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

// ─── Detail Panel ───────────────────────────────────────────

function DetailPanel({
  reg,
  onUpdateStatus,
  isLoading,
}: {
  reg: Registration;
  onUpdateStatus: (reg: Registration, status: RegistrationStatus) => void;
  isLoading: boolean;
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
    <div className="space-y-5">
      {/* Info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
        {fields.map(
          ([label, value]) =>
            value && (
              <div key={label}>
                <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em] mb-0.5">
                  {label}
                </div>
                <div className="font-mono text-[13px] text-white/80">{value}</div>
              </div>
            )
        )}
      </div>

      {/* Motivation */}
      <div>
        <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em] mb-1.5">
          Мотивация
        </div>
        <div className="font-mono text-[13px] text-white/70 leading-[1.8] bg-white/[0.02] p-4 border border-white/5">
          {reg.motivation}
        </div>
      </div>

      {/* Expectations */}
      <div>
        <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em] mb-1.5">
          Очаквания
        </div>
        <div className="font-mono text-[13px] text-white/70 leading-[1.8] bg-white/[0.02] p-4 border border-white/5">
          {reg.expectations}
        </div>
      </div>

      {/* Notes */}
      {reg.notes && (
        <div>
          <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.1em] mb-1.5">
            Бележки
          </div>
          <div className="font-mono text-[13px] text-white/60 leading-[1.8]">{reg.notes}</div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-3">
        {reg.registration_status !== "approved" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(reg, "approved");
            }}
            disabled={isLoading}
            className="font-mono text-[12px] tracking-[0.08em] uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-6 py-2.5 cursor-pointer transition-all hover:bg-emerald-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "Одобри"}
          </button>
        )}
        {reg.registration_status !== "rejected" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(reg, "rejected");
            }}
            disabled={isLoading}
            className="font-mono text-[12px] tracking-[0.08em] uppercase bg-red-500/15 text-red-400 border border-red-500/30 px-6 py-2.5 cursor-pointer transition-all hover:bg-red-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "Отхвърли"}
          </button>
        )}
      </div>
    </div>
  );
}
