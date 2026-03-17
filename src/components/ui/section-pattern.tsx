"use client";

import { cn } from "@/lib";

type PatternVariant = "code" | "topo" | "circuit" | "grid" | "dots";

interface SectionPatternProps {
  variant: PatternVariant;
  className?: string;
  opacity?: number;
  /** Set to false to disable the pattern entirely */
  enabled?: boolean;
}

const patterns: Record<PatternVariant, string> = {
  // Code block pattern — horizontal lines with varying widths like text
  code: `url("data:image/svg+xml,%3Csvg width='200' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='16' y='12' width='80' height='2' rx='1' fill='white' opacity='0.07'/%3E%3Crect x='16' y='24' width='120' height='2' rx='1' fill='white' opacity='0.05'/%3E%3Crect x='32' y='36' width='60' height='2' rx='1' fill='white' opacity='0.06'/%3E%3Crect x='32' y='48' width='90' height='2' rx='1' fill='white' opacity='0.04'/%3E%3Crect x='32' y='60' width='40' height='2' rx='1' fill='white' opacity='0.05'/%3E%3Crect x='16' y='72' width='70' height='2' rx='1' fill='white' opacity='0.06'/%3E%3Crect x='16' y='84' width='110' height='2' rx='1' fill='white' opacity='0.04'/%3E%3Crect x='32' y='96' width='50' height='2' rx='1' fill='white' opacity='0.05'/%3E%3Crect x='16' y='108' width='30' height='2' rx='1' fill='white' opacity='0.06'/%3E%3C/svg%3E")`,

  // Topographic contour lines
  topo: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='100' cy='100' rx='90' ry='60' fill='none' stroke='white' stroke-width='0.5' opacity='0.06'/%3E%3Cellipse cx='100' cy='100' rx='70' ry='45' fill='none' stroke='white' stroke-width='0.5' opacity='0.05'/%3E%3Cellipse cx='100' cy='100' rx='50' ry='30' fill='none' stroke='white' stroke-width='0.5' opacity='0.04'/%3E%3Cellipse cx='100' cy='100' rx='30' ry='18' fill='none' stroke='white' stroke-width='0.5' opacity='0.03'/%3E%3Cellipse cx='100' cy='95' rx='80' ry='55' fill='none' stroke='white' stroke-width='0.5' opacity='0.04' transform='rotate(15 100 100)'/%3E%3C/svg%3E")`,

  // Circuit board traces
  circuit: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 H40 V20 H80 V60 H120' fill='none' stroke='white' stroke-width='0.5' opacity='0.06'/%3E%3Cpath d='M60 0 V40 H100 V80 H60 V120' fill='none' stroke='white' stroke-width='0.5' opacity='0.05'/%3E%3Ccircle cx='40' cy='20' r='2' fill='white' opacity='0.08'/%3E%3Ccircle cx='80' cy='60' r='2' fill='white' opacity='0.08'/%3E%3Ccircle cx='60' cy='40' r='2' fill='white' opacity='0.08'/%3E%3Ccircle cx='100' cy='80' r='2' fill='white' opacity='0.08'/%3E%3C/svg%3E")`,

  // Subtle grid with intersections
  grid: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 V60 M0 60 H60' fill='none' stroke='white' stroke-width='0.3' opacity='0.06'/%3E%3Ccircle cx='60' cy='60' r='1' fill='white' opacity='0.1'/%3E%3C/svg%3E")`,

  // Scattered dots
  dots: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='0.8' fill='white' opacity='0.08'/%3E%3Ccircle cx='50' cy='25' r='0.6' fill='white' opacity='0.06'/%3E%3Ccircle cx='30' cy='55' r='0.8' fill='white' opacity='0.07'/%3E%3Ccircle cx='70' cy='45' r='0.6' fill='white' opacity='0.05'/%3E%3Ccircle cx='20' cy='75' r='0.7' fill='white' opacity='0.06'/%3E%3Ccircle cx='65' cy='70' r='0.8' fill='white' opacity='0.07'/%3E%3C/svg%3E")`,
};

/**
 * Subtle, repeating SVG pattern overlay for section backgrounds.
 *
 * Usage:
 *   <section className="relative ...">
 *     <SectionPattern variant="code" />
 *     ...content...
 *   </section>
 *
 * Toggle: set `enabled={false}` to hide without removing the component.
 */
export function SectionPattern({
  variant,
  className,
  opacity = 1,
  enabled = true,
}: SectionPatternProps) {
  if (!enabled) return null;

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none z-0", className)}
      style={{
        backgroundImage: patterns[variant],
        opacity,
      }}
      aria-hidden="true"
    />
  );
}
