import { ReactNode } from "react";

interface SectionHeaderProps {
  title: ReactNode;
  label?: string;
}

export const SectionHeader = ({ title, label }: SectionHeaderProps) => (
  <div>
    {label && (
      <div className="font-mono text-[11px] tracking-[0.18em] text-acid/85 mb-3 uppercase">
        {label}
      </div>
    )}
    <h2 className="font-display text-[clamp(52px,7vw,64px)] leading-[1.05]">{title}</h2>
  </div>
);
