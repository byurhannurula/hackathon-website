import { ExternalLink } from "lucide-react";

import type { Registration } from "@/lib/types";
import type { AdminPagination, SortField } from "@/constants";
import { fmtDate } from "@/lib";
import { StatusBadge } from "./status-badge";

const COLUMNS: { field: SortField | null; label: string }[] = [
  { field: "ticket_number", label: "#" },
  { field: "full_name", label: "Име" },
  { field: null, label: "Имейл" },
  { field: null, label: "Роля" },
  { field: "registration_status", label: "Статус" },
  { field: "created_at", label: "Дата" },
  { field: null, label: "" },
];

function TicketExternalLink({ ticketId }: { ticketId: string }) {
  return (
    <a
      href={`/tickets/${ticketId}?admin`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center justify-center w-8 h-8 text-white/30 hover:text-acid transition-colors"
      title="Отвори билета"
    >
      <ExternalLink size={15} />
    </a>
  );
}

interface RowProps {
  reg: Registration;
  selected: boolean;
  onSelect: (reg: Registration) => void;
}

function DesktopRow({ reg, selected, onSelect }: RowProps) {
  return (
    <tr
      onClick={() => onSelect(reg)}
      className={`border-b border-white/5 cursor-pointer transition-colors group ${
        selected ? "bg-acid/3" : "hover:bg-white/3"
      }`}
    >
      <td className="px-4 py-4 font-mono text-[13px] text-acid/80">
        {String(reg.ticket_number).padStart(4, "0")}
      </td>
      <td className="px-4 py-4 font-body text-[15px] font-bold text-white/95">{reg.full_name}</td>
      <td className="px-4 py-4 font-mono text-[13px] text-white/65">{reg.email}</td>
      <td className="px-4 py-4 font-mono text-[13px] text-white/55">{reg.role}</td>
      <td className="px-4 py-4">
        <StatusBadge status={reg.registration_status} />
      </td>
      <td className="px-4 py-4 font-mono text-[13px] text-white/45">{fmtDate(reg.created_at)}</td>
      <td className="px-4 py-4">
        <TicketExternalLink ticketId={reg.ticket_id} />
      </td>
    </tr>
  );
}

function MobileCard({ reg, selected, onSelect }: RowProps) {
  return (
    <div
      onClick={() => onSelect(reg)}
      className={`border bg-card transition-colors cursor-pointer ${
        selected ? "border-acid/20" : "border-white/7"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body text-base font-bold text-white/95">{reg.full_name}</div>
            <div className="font-mono text-[13px] text-white/55 mt-0.5">{reg.email}</div>
          </div>
          <StatusBadge status={reg.registration_status} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3 font-mono text-[13px] text-white/45">
            <span>#{String(reg.ticket_number).padStart(4, "0")}</span>
            <span>{reg.role}</span>
            <span>{fmtDate(reg.created_at)}</span>
          </div>
          <TicketExternalLink ticketId={reg.ticket_id} />
        </div>
      </div>
    </div>
  );
}

interface PaginationProps {
  pagination: AdminPagination;
  page: number;
  onPageChange: (page: number) => void;
}

function PaginationControls({ pagination, page, onPageChange }: PaginationProps) {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
      <div className="font-mono text-[13px] text-white/45">
        {(page - 1) * pagination.pageSize + 1}–
        {Math.min(page * pagination.pageSize, pagination.total)} от {pagination.total}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="font-mono text-[13px] px-4 py-2 border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
        >
          ← Назад
        </button>
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`font-mono text-[13px] px-4 py-2 border transition-colors cursor-pointer ${
              p === page
                ? "border-acid/40 text-acid bg-acid/5"
                : "border-white/15 text-white/50 hover:text-white hover:border-white/30"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pagination.totalPages}
          className="font-mono text-[13px] px-4 py-2 border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Напред →
        </button>
      </div>
    </div>
  );
}

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
      <div className="text-center py-20 font-mono text-base text-white/40">
        Няма намерени регистрации
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block border border-white/7 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/7 bg-white/2">
              {COLUMNS.map((col, i) => (
                <th
                  key={i}
                  onClick={col.field ? () => onSort(col.field!) : undefined}
                  className={`font-mono text-[12px] tracking-[0.12em] text-white/55 uppercase px-4 py-3.5 ${
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
              <DesktopRow
                key={reg.id}
                reg={reg}
                selected={selectedReg?.id === reg.id}
                onSelect={onSelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {data.map((reg) => (
          <MobileCard
            key={reg.id}
            reg={reg}
            selected={selectedReg?.id === reg.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      <PaginationControls pagination={pagination} page={page} onPageChange={onPageChange} />
    </>
  );
}
