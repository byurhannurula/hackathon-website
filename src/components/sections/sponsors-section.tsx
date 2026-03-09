"use client";

import Image from "next/image";
import { SPONSORS, siteConfig } from "@/constants";
import { SectionHeader } from "@/components/section-header";

export function SponsorsSection() {
  return (
    <section id="sponsors" className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="ПРАВЯТ ТОВА ВЪЗМОЖНО" title="СПОНСОРИ" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-13">
          {SPONSORS.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center p-8 border border-border-hover bg-white/3 transition-all duration-200 group hover:border-acid/50 hover:bg-acid/5 min-h-[120px]"
            >
              {sponsor.logo ? (
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={150}
                  height={60}
                  className="object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                />
              ) : (
                <span className="font-display text-lg tracking-[0.06em] text-white/70">
                  {sponsor.name}
                </span>
              )}
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
