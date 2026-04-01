"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib";
import type { ShowcaseStat } from "@/constants";
import { CountUp } from "@/components/ui";

interface ShowcaseStatsSectionProps {
  stats: ShowcaseStat[];
}

export function ShowcaseStatsSection({ stats }: ShowcaseStatsSectionProps) {
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
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="px-6 py-16 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "border-t-2 border-acid/30 pt-6 transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <CountUp
                value={stat.value}
                className="font-display text-[clamp(48px,8vw,72px)] text-acid leading-none"
              />
              <div className="font-mono text-[11px] text-white/50 uppercase tracking-[0.14em] mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
