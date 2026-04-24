import { cn } from "@/lib/utils";

type CornerVariant = "fade" | "grow" | "static";
type CornerSize = "sm" | "md" | "lg";

interface CornerBracketsProps {
  /**
   * fade (default) — borders fade in from transparent to acid on group-hover.
   * grow            — brackets grow from 0×0 + fade in on group-hover.
   * static          — always visible at low opacity (decorative, no hover).
   */
  variant?: CornerVariant;
  /** Bracket side length: 16px (sm), 20px (md), 24px (lg). */
  size?: CornerSize;
  /** Extra classes merged into each corner span (e.g. "z-10"). */
  className?: string;
}

const SIZE_CLS: Record<CornerSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

// Kept as full static strings so Tailwind's JIT sees them.
const GROW_TARGET: Record<CornerSize, string> = {
  sm: "group-hover:w-4 group-hover:h-4",
  md: "group-hover:w-5 group-hover:h-5",
  lg: "group-hover:w-6 group-hover:h-6",
};

/**
 * Four L-shaped brackets pinned to the corners of the nearest positioned
 * ancestor. Parent must be `relative group` for hover variants to fire.
 * Renders a fragment (no wrapper element).
 */
export function CornerBrackets({ variant = "fade", size = "md", className }: CornerBracketsProps) {
  const base = "absolute pointer-events-none z-[2] transition-all duration-300";

  if (variant === "static") {
    const cls = cn(base, SIZE_CLS[size], "border-acid/40", className);
    return (
      <>
        <span aria-hidden className={cn(cls, "top-0 left-0 border-t-2 border-l-2")} />
        <span aria-hidden className={cn(cls, "top-0 right-0 border-t-2 border-r-2")} />
        <span aria-hidden className={cn(cls, "bottom-0 left-0 border-b-2 border-l-2")} />
        <span aria-hidden className={cn(cls, "bottom-0 right-0 border-b-2 border-r-2")} />
      </>
    );
  }

  if (variant === "grow") {
    const cls = cn(
      base,
      "h-0 w-0 opacity-0 border-acid group-hover:opacity-100",
      GROW_TARGET[size],
      className
    );
    return (
      <>
        <span aria-hidden className={cn(cls, "top-0 left-0 border-t border-l")} />
        <span aria-hidden className={cn(cls, "top-0 right-0 border-t border-r")} />
        <span aria-hidden className={cn(cls, "bottom-0 left-0 border-b border-l")} />
        <span aria-hidden className={cn(cls, "bottom-0 right-0 border-b border-r")} />
      </>
    );
  }

  const cls = cn(base, SIZE_CLS[size], "border-acid/0 group-hover:border-acid/70", className);
  return (
    <>
      <span aria-hidden className={cn(cls, "top-0 left-0 border-t-2 border-l-2")} />
      <span aria-hidden className={cn(cls, "top-0 right-0 border-t-2 border-r-2")} />
      <span aria-hidden className={cn(cls, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span aria-hidden className={cn(cls, "bottom-0 right-0 border-b-2 border-r-2")} />
    </>
  );
}
