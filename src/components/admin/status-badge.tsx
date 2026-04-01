import type { RegistrationStatus } from "@/lib/types";
import { STATUS_LABELS, STATUS_COLORS } from "@/constants";

export function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span
      className={`inline-block font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
