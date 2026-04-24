interface TipProps {
  label: string;
  children: React.ReactNode;
}

export function Tip({ label, children }: TipProps) {
  return (
    <span className="relative group/tip cursor-help" aria-label={label}>
      {children}
      <span className="pointer-events-none absolute bottom-full right-0 mb-1.5 px-2.5 py-1.5 bg-neutral-900 border border-white/10 text-white/80 font-mono text-[11px] leading-relaxed whitespace-normal opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 z-50 w-max max-w-[280px]">
        {label}
      </span>
    </span>
  );
}
