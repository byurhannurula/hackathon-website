import type { Registration, RegistrationStatus } from "@/lib/types";

// ─── Admin Types ────────────────────────────────────────────

export interface AdminStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface AdminPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type SortField = "created_at" | "full_name" | "ticket_number" | "registration_status";

export interface ConfirmAction {
  reg: Registration;
  status: RegistrationStatus;
}

// ─── Status helpers ─────────────────────────────────────────

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  pending: "Изчакващ",
  approved: "Одобрен",
  rejected: "Отхвърлен",
};

export const STATUS_COLORS: Record<RegistrationStatus, string> = {
  pending: "bg-white/10 text-white/70",
  approved: "bg-emerald-500/15 text-emerald-400",
  rejected: "bg-red-500/15 text-red-400",
};
