"use client";

import { ReactNode } from "react";
import { TypewriterText } from "@/components/ui";
import { useInView } from "@/hooks";

interface SectionHeaderProps {
  title: ReactNode;
  label?: string;
  as?: "h1" | "h2";
}

export const SectionHeader = ({ title, label, as: Tag = "h2" }: SectionHeaderProps) => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <div ref={ref}>
      {label && (
        <div className="mb-4 inline-flex items-center">
          <TypewriterText
            text={label}
            trigger={inView}
            className="font-mono text-[12px] font-medium tracking-[0.14em] text-acid/90 uppercase bg-acid/8 px-2 py-1 rounded-sm"
          />
        </div>
      )}
      <Tag className="font-display text-[clamp(52px,7vw,64px)] leading-[1.05]">{title}</Tag>
    </div>
  );
};
