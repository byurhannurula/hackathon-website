"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { TypewriterText } from "@/components/ui";

interface SectionHeaderProps {
  title: ReactNode;
  label?: string;
}

export const SectionHeader = ({ title, label }: SectionHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !label) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [label]);

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
      <h2 className="font-display text-[clamp(52px,7vw,64px)] leading-[1.05]">{title}</h2>
    </div>
  );
};
