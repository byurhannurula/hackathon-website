"use client";

import { Ticker } from "@/components/ticker";
import { HACKATHON_INFO } from "@/lib";

export function OrganizerSection() {
  return (
    <section className="px-6 py-14 md:px-12 border-b border-border">
      <div className="max-w-[1100px] mx-auto flex items-center gap-13 flex-wrap">
        <div className="shrink-0">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 mb-2 uppercase">
            Организирано от
          </div>
          <div className="font-display text-[34px] tracking-[0.04em] text-acid">
            {HACKATHON_INFO.organizer.toUpperCase()}
          </div>
          <div className="font-mono text-[11px] text-white/45 mt-1">
            Русенски иновационен хъб · Изграждаме основатели от 2018
          </div>
        </div>
        <div className="w-px self-stretch bg-white/10 shrink-0" />
        <div className="flex-1 min-w-[200px] overflow-hidden">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 mb-3 uppercase">
            Технологични партньори
          </div>
          <Ticker />
        </div>
      </div>
    </section>
  );
}
