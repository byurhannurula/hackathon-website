import type { AdminStats } from "@/constants";

interface StatsGridProps {
  stats: AdminStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    { label: "Общо", value: stats.total, cls: "text-white" },
    { label: "Изчакващи", value: stats.pending, cls: "text-white/70" },
    { label: "Одобрени", value: stats.approved, cls: "text-emerald-400" },
    { label: "Отхвърлени", value: stats.rejected, cls: "text-red-400" },
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {items.map((s) => (
        <div key={s.label} className="border border-white/7 bg-card p-4">
          <div className="font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase">
            {s.label}
          </div>
          <div className={`font-display text-3xl mt-1 ${s.cls}`}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}
