"use client";

import { cn } from "@/lib";

interface ModalShellProps {
  onClose: () => void;
  labelledBy?: string;
  maxWidth?: string;
  backdropOpacity?: "medium" | "strong";
  children: React.ReactNode;
}

export function ModalShell({
  onClose,
  labelledBy,
  maxWidth = "max-w-[460px]",
  backdropOpacity = "strong",
  children,
}: ModalShellProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-60 backdrop-blur-[3px] animate-[fadeIn_0.15s_ease]",
          backdropOpacity === "strong" ? "bg-black/80" : "bg-black/70"
        )}
        onClick={onClose}
      />
      <div className="fixed inset-0 z-61 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-labelledby={labelledBy}
          aria-modal="true"
          className={cn(
            "bg-card border border-white/10 p-7 w-full animate-[fadeUp_0.2s_ease] shadow-2xl max-h-[90vh] overflow-y-auto",
            maxWidth
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
}

type Tone = "neutral" | "acid" | "emerald" | "red";
type Variant = "solid" | "outline";

const TONE_SOLID: Record<Tone, string> = {
  neutral: "bg-white/10 text-white border-white/20 hover:bg-white/15",
  acid: "bg-acid/15 text-acid border-acid/30 hover:bg-acid/25",
  emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30",
  red: "bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30",
};

const TONE_OUTLINE: Record<Tone, string> = {
  neutral: "border-white/20 text-white/60 hover:text-white hover:border-white/40",
  acid: "border-acid/30 text-acid/80 hover:text-acid hover:border-acid/60",
  emerald: "border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60",
  red: "border-red-500/30 text-red-400 hover:border-red-500/60",
};

interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone;
  variant?: Variant;
  bold?: boolean;
}

export function ModalButton({
  tone = "neutral",
  variant = "outline",
  bold,
  className,
  children,
  ...rest
}: ModalButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "flex-1 font-mono text-[13px] tracking-[0.08em] uppercase px-5 py-3 cursor-pointer transition-all border disabled:opacity-40 disabled:cursor-not-allowed",
        variant === "solid" ? TONE_SOLID[tone] : TONE_OUTLINE[tone],
        bold && "font-bold",
        className
      )}
    >
      {children}
    </button>
  );
}
