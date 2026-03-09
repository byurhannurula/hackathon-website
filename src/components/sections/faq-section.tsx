"use client";

import { FAQ_ITEMS } from "@/constants";
import { FaqItem } from "@/components/faq-item";
import { SectionHeader } from "@/components/section-header";

export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div className="max-w-[800px] mx-auto">
        <SectionHeader title="ЧЕСТО ЗАДАВАНИ ВЪПРОСИ" />
        <div className="mt-12">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
