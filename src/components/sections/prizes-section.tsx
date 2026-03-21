"use client";

import { cn } from "@/lib";
import { siteConfig, PRIZES } from "@/constants";
import { SectionHeader } from "@/components/section-header";

export function PrizesSection() {
  return (
    <section id="prizes" className="px-6 py-25 md:px-12 border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label={`ОБЩ НАГРАДЕН ФОНД ${siteConfig.event.prizesPool}`} title="НАГРАДИ" />
        {/* Desktop: all 3 in one row. Mobile: 1st full-width, 2nd+3rd side by side */}
        <div className="mt-12 hidden md:grid md:grid-cols-3 gap-px bg-border">
          {PRIZES.map((p, i) => {
            const borderColors = ["border-t-acid", "border-t-white/45", "border-t-white/25"];
            return (
              <div key={i} className={cn("bg-card p-8 border-t-[3px]", borderColors[i])}>
                <div
                  className={cn(
                    "font-mono text-[11px] tracking-[0.18em]",
                    i === 0 ? "text-acid" : "text-white/60"
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
                <div className="font-mono text-[11px] text-white/60 mt-2.5 leading-[1.8]">
                  {p.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile layout */}
        <div className="mt-12 flex flex-col gap-px bg-border md:hidden">
          <div className="bg-card p-6 border-t-[3px] border-t-acid">
            <div className="font-mono text-[11px] tracking-[0.18em] text-acid">
              {PRIZES[0].place}
            </div>
            <div className="font-display text-5xl leading-[1.1] mt-2 text-acid">
              {PRIZES[0].amount}
            </div>
            <div className="font-mono text-[11px] text-white/60 mt-2.5 leading-[1.8]">
              {PRIZES[0].desc}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px">
            {PRIZES.slice(1).map((p, i) => {
              const borderColors = ["border-t-white/45", "border-t-white/25"];
              return (
                <div key={i} className={cn("bg-card p-6 border-t-[3px]", borderColors[i])}>
                  <div className="font-mono text-[11px] tracking-[0.18em] text-white/60">
                    {p.place}
                  </div>
                  <div className="font-display text-5xl leading-[1.1] mt-2 text-white">
                    {p.amount}
                  </div>
                  <div className="font-mono text-[11px] text-white/60 mt-2.5 leading-[1.8]">
                    {p.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
