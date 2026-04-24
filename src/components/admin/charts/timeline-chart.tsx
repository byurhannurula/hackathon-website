interface TimelineChartProps {
  title: string;
  data: Record<string, number>;
}

export function TimelineChart({ title, data }: TimelineChartProps) {
  const entries = Object.entries(data);
  const max = Math.max(...entries.map(([, v]) => v), 1);
  const totalReg = entries.reduce((sum, [, v]) => sum + v, 0);

  let cumulative = 0;

  return (
    <div className="border border-white/10 bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-[12px] tracking-[0.14em] text-white/55 uppercase">
          {title}
        </div>
        <div className="font-mono text-[12px] text-white/40">{entries.length} дни</div>
      </div>

      {entries.length === 0 ? (
        <div className="font-mono text-[13px] text-white/30 py-8 text-center">Няма данни</div>
      ) : (
        <div className="space-y-1.5">
          {entries.map(([date, count]) => {
            cumulative += count;
            const barWidth = (count / max) * 100;
            const fmtDate = new Date(date + "T00:00:00").toLocaleDateString("bg-BG", {
              day: "2-digit",
              month: "2-digit",
            });

            return (
              <div key={date} className="flex items-center gap-3">
                <span className="font-mono text-[12px] text-white/45 w-[42px] shrink-0 text-right">
                  {fmtDate}
                </span>
                <div className="flex-1 h-5 bg-white/5 relative">
                  <div
                    className="h-full bg-acid/50 transition-all duration-500 ease-out"
                    style={{ width: `${barWidth}%` }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[11px] text-white/50">
                    {count}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white/25 w-[40px] shrink-0 text-right">
                  Σ{cumulative}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/5 flex gap-6 font-mono text-[12px] text-white/40">
          <span>
            Среден брой на ден:{" "}
            <span className="text-white/70">{(totalReg / entries.length).toFixed(1)}</span>
          </span>
          <span>
            Пик: <span className="text-acid/80">{max}</span>
          </span>
        </div>
      )}
    </div>
  );
}
