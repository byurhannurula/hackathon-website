"use client";

import { SectionHeader } from "@/components/section-header";
import { AgendaItem } from "@/components/agenda-item";
import { AGENDA_ITEMS } from "@/lib";

export function AgendaSection() {
  return (
    <section id="agenda" className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="26 АПРИЛ 2026" title="ПРОГРАМА" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12">
          {AGENDA_ITEMS.map((a, i) => (
            <AgendaItem key={i} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}
