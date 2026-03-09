"use client";

import { Ticker } from "@/components/ticker";
import { siteConfig } from "@/constants";

export function OrganizerSection() {
  return (
    <section className="px-6 py-14 md:px-12 border-b border-border">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-13">
        <div className="shrink-0">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 mb-2 uppercase">
            Организирано от
          </div>
          <div className="font-display text-[28px] md:text-[34px] tracking-[0.04em] text-acid">
            {siteConfig.event.organizer.toUpperCase()}
          </div>
          <div className="font-mono text-[11px] text-white/45 mt-1">
            Русенски иновационен хъб · Изграждаме основатели от 2018
          </div>
        </div>
        <div className="hidden md:block w-px self-stretch bg-white/10 shrink-0" />
        <div className="w-full md:flex-1 min-w-[200px] overflow-hidden">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 mb-3 uppercase">
            Технологични партньори
          </div>
          <Ticker />
        </div>
      </div>
    </section>
  );
}
