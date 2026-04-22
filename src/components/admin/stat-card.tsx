import { cn } from "@/lib";

interface StatCardProps {
  label: string;
  value: number | string;
  className?: string;
}

export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div className="border border-white/10 bg-card p-5">
      <div className="font-mono text-[12px] tracking-[0.14em] text-white/55 uppercase">{label}</div>
      <div className={cn("font-display text-4xl mt-1 text-white", className)}>{value}</div>
    </div>
  );
}
