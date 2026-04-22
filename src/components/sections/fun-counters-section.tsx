"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib";
import type { ShowcaseFunCounter } from "@/constants";
import { SectionHeader } from "@/components/section-header";

interface FunCountersSectionProps {
  counters: ShowcaseFunCounter[];
}

export function FunCountersSection({ counters }: FunCountersSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (counters.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ЗАБАВНА СТАТИСТИКА" title="По цифрите" />
        </div>

        {/* Terminal-style list with monospace hierarchy */}
        <ul className="divide-y divide-border border-y border-border">
          {counters.map((c, i) => (
            <li
              key={c.label}
              className={cn(
                "group list-none transition-all duration-700",
                inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}
              style={{ transitionDelay: inView ? `${i * 60}ms` : "0ms" }}
            >
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 px-2 md:px-4 py-5 md:py-7 hover:bg-acid/[0.03] transition-colors">
                <div className="font-mono text-[11px] text-acid/60 tabular-nums tracking-[0.14em]">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <div className="font-body text-base md:text-lg font-semibold tracking-[-0.01em] text-white/90 group-hover:text-acid transition-colors">
                    {c.label}
                  </div>
                  {c.hint && (
                    <div className="font-mono text-[11px] text-white/45 leading-[1.7] mt-1">
                      {c.hint}
                    </div>
                  )}
                </div>

                <div className="font-display text-[clamp(32px,5vw,56px)] text-acid leading-none tabular-nums text-right">
                  {c.value}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
