"use client";

import { cn } from "@/lib";

type Tone = "acid" | "emerald";

const TONE_ACTIVE: Record<Tone, string> = {
  acid: "text-acid border-acid",
  emerald: "text-emerald-400 border-emerald-400",
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  tone?: Tone;
  children: React.ReactNode;
}

export function TabButton({ active, onClick, tone = "acid", children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-mono text-[13px] tracking-[0.1em] uppercase px-5 py-3.5 cursor-pointer transition-colors border-b-2 -mb-px",
        active ? TONE_ACTIVE[tone] : "text-white/50 border-transparent hover:text-white/70"
      )}
    >
      {children}
    </button>
  );
}
