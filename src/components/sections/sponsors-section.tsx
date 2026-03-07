"use client";

import { SPONSORS, siteConfig } from "@/lib";
import { SectionHeader } from "@/components/section-header";

export function SponsorsSection() {
  return (
    <section id="sponsors" className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="ПРАВЯТ ТОВА ВЪЗМОЖНО" title="СПОНСОРИ" />
        <div className="flex flex-wrap gap-2.5 mt-13">
          {SPONSORS.map((name) => (
            <div
              key={name}
              className="font-display text-lg tracking-[0.06em] py-3.5 px-7 border border-border-hover bg-white/3 text-white/70 cursor-pointer transition-all duration-200 hover:border-acid/50 hover:text-acid hover:bg-acid/5"
            >
              {name}
            </div>
          ))}
        </div>
        {/* Sponsor CTA */}
        <div className="mt-12 p-6 md:p-8 border border-acid/10 bg-acid/2 flex justify-between items-center flex-wrap gap-5">
          <div>
            <div className="font-body font-bold text-[15px]">Интересувате се от спонсорство?</div>
            <div className="font-mono text-[11px] text-muted mt-1">
              Застанете пред 600+ строители. Ограничени места.
            </div>
          </div>
          <a
            href={`mailto:${siteConfig.contact.sponsorEmail}`}
            className="font-display text-[15px] tracking-[0.08em] bg-transparent text-acid border border-acid/30 py-3 px-7 cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-acid/7 no-underline"
          >
            СТАНИ СПОНСОР &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
