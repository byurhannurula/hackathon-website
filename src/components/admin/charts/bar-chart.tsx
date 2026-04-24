interface BarChartProps {
  title: string;
  data: Record<string, number>;
  total: number;
  color?: "white" | "acid";
  ordered?: boolean;
}

export function BarChart({ title, data, total, color = "white", ordered = false }: BarChartProps) {
  const entries = ordered ? Object.entries(data) : Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 1);
  const barColor = color === "acid" ? "bg-acid/60" : "bg-white/30";
  const textColor = color === "acid" ? "text-acid" : "text-white/90";

  return (
    <div className="border border-white/10 bg-card p-5">
      <div className="font-mono text-[12px] tracking-[0.14em] text-white/55 uppercase mb-4">
        {title}
      </div>
      <div className="space-y-2.5">
        {entries.map(([label, count]) => {
          const pct = total > 0 ? ((count / total) * 100).toFixed(1) : "0";
          const barWidth = max > 0 ? (count / max) * 100 : 0;
          return (
            <div key={label}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[13px] text-white/75 truncate mr-3 max-w-[70%]">
                  {label}
                </span>
                <span className={`font-mono text-[13px] ${textColor} whitespace-nowrap`}>
                  {count} <span className="text-white/35 text-[11px]">({pct}%)</span>
                </span>
              </div>
              <div className="h-2 bg-white/5 w-full">
                <div
                  className={`h-full ${barColor} transition-all duration-500 ease-out`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
        {entries.length === 0 && (
          <div className="font-mono text-[13px] text-white/30 py-4 text-center">Няма данни</div>
        )}
      </div>
    </div>
  );
}
