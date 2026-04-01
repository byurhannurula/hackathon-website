import type { Registration } from "@/lib/types";
import type { AdminPagination, SortField } from "@/constants";
import { StatusBadge } from "./status-badge";

interface RegistrationsTableProps {
  data: Registration[];
  loading: boolean;
  selectedReg: Registration | null;
  onSelect: (reg: Registration) => void;
  pagination: AdminPagination;
  page: number;
  sort: SortField;
  order: "asc" | "desc";
  onSort: (field: SortField) => void;
  onPageChange: (page: number) => void;
  fmtDate: (iso: string) => string;
}

export function RegistrationsTable({
  data,
  loading,
  selectedReg,
  onSelect,
  pagination,
  page,
  sort,
  order,
  onSort,
  onPageChange,
  fmtDate,
}: RegistrationsTableProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-14 bg-white/2 border border-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-20 font-mono text-sm text-white/30">
        Няма намерени регистрации
      </div>
    );
  }

  return (
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
                  onClick={col.field ? () => onSort(col.field!) : undefined}
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
                onClick={() => onSelect(reg)}
                className={`border-b border-white/5 cursor-pointer transition-colors group ${
                  selectedReg?.id === reg.id ? "bg-acid/3" : "hover:bg-white/3"
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
            onClick={() => onSelect(reg)}
            className={`border bg-card transition-colors cursor-pointer ${
              selectedReg?.id === reg.id ? "border-acid/20" : "border-white/7"
            }`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-body text-[15px] font-bold">{reg.full_name}</div>
                  <div className="font-mono text-[12px] text-white/40 mt-0.5">{reg.email}</div>
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
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="font-mono text-[11px] px-3 py-1.5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
            >
              ← Назад
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
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
              onClick={() => onPageChange(page + 1)}
              disabled={page >= pagination.totalPages}
              className="font-mono text-[11px] px-3 py-1.5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Напред →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
