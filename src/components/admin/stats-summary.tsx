interface StatsSummaryProps {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}

export function StatsSummary({ total, approved, pending, rejected }: StatsSummaryProps) {
  return (
    <div className="mb-8 border border-white/10 bg-card p-6">
      <div className="font-mono text-[12px] tracking-[0.14em] text-white/55 uppercase">
        Общо регистрации
      </div>
      <div className="font-display text-5xl mt-1 text-white">{total}</div>
      <div className="flex gap-4 mt-3 font-mono text-[13px]">
        <span className="text-emerald-400">{approved} одобрени</span>
        <span className="text-white/60">{pending} изчакващи</span>
        <span className="text-red-400">{rejected} отхвърлени</span>
      </div>
    </div>
  );
}
