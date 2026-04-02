import { SPONSOR_NAMES } from "@/constants";
import { cn } from "@/lib";

interface TickerProps {
  dir?: number;
}

export const Ticker = ({ dir = 1 }: TickerProps) => (
  <div className="overflow-hidden border-y border-white/10 py-3 relative">
    <div
      className="absolute left-0 top-0 bottom-0 w-15 z-1 pointer-events-none"
      style={{
        background: "linear-gradient(to right, var(--bg), transparent)",
      }}
    />
    <div
      className="absolute right-0 top-0 bottom-0 w-15 z-1 pointer-events-none"
      style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
    />
    <div
      className="flex gap-15 w-max"
      style={{
        animation: `ticker ${dir > 0 ? 20 : 16}s linear infinite ${dir < 0 ? "reverse" : ""}`,
      }}
    >
      {Array.from({ length: 5 }, () => SPONSOR_NAMES)
        .flat()
        .map((p, i) => (
          <span
            key={i}
            className={cn(
              "font-mono text-[11px] tracking-[0.14em] uppercase whitespace-nowrap",
              i % 4 === 0 ? "text-acid/75" : "text-white/45"
            )}
          >
            {i % 4 === 0 ? "\u25C6" : "\u00B7"} {p}
          </span>
        ))}
    </div>
  </div>
);
