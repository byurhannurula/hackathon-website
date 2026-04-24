import type { RegistrationStatus } from "@/lib/types";
import { STATUS_LABELS, STATUS_COLORS } from "@/constants";

export function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span
      className={`inline-block font-mono text-[12px] tracking-widest uppercase px-3 py-1 font-bold ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
