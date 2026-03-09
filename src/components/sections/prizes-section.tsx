"use client";

import { cn } from "@/lib";
import { siteConfig, PRIZES } from "@/constants";
import { SectionHeader } from "@/components/section-header";

export function PrizesSection() {
  return (
    <section id="prizes" className="px-6 py-25 md:px-12 border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label={`ОБЩ НАГРАДЕН ФОНД ${siteConfig.event.prizesPool}`} title="НАГРАДИ" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mt-12">
          {PRIZES.map((p, i) => {
            const borderColors = [
              "border-t-acid",
              "border-t-white/45",
              "border-t-white/25",
              "border-t-white/12",
            ];
            return (
              <div key={i} className={cn("bg-card p-6 md:p-8 border-t-[3px]", borderColors[i])}>
                <div
                  className={cn(
                    "font-mono text-[11px] tracking-[0.18em]",
                    i === 0 ? "text-acid" : "text-white/55"
                  )}
                >
                  {p.place}
                </div>
                <div
                  className={cn(
                    "font-display text-5xl leading-[1.1] mt-2",
                    i === 0 ? "text-acid" : "text-white"
                  )}
                >
                  {p.amount}
                </div>
                <div className="font-mono text-[11px] text-white/55 mt-2.5 leading-[1.8]">
                  {p.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
