"use client";

import Image from "next/image";
import { SPONSORS, SPONSOR_TIER_LABELS, siteConfig } from "@/constants";
import { SectionHeader } from "@/components/section-header";
import type { SponsorTier } from "@/lib/types";

const TIER_ORDER: SponsorTier[] = ["gold", "silver", "bronze"];

const TIER_GRID: Record<SponsorTier, string> = {
  gold: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  silver: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  bronze: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

const TIER_HEIGHT: Record<SponsorTier, string> = {
  gold: "min-h-[140px] p-10",
  silver: "min-h-[110px] p-7",
  bronze: "min-h-[90px] p-5",
};

const TIER_LOGO_SIZE: Record<SponsorTier, { w: number; h: number }> = {
  gold: { w: 180, h: 70 },
  silver: { w: 150, h: 60 },
  bronze: { w: 120, h: 45 },
};

export function SponsorsSection() {
  return (
    <section id="sponsors" className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="ПРАВЯТ ТОВА ВЪЗМОЖНО" title="СПОНСОРИ" />

        {TIER_ORDER.map((tier) => {
          const tierSponsors = SPONSORS.filter((s) => s.tier === tier);
          if (tierSponsors.length === 0) return null;
          const logoSize = TIER_LOGO_SIZE[tier];

          return (
            <div key={tier} className="mt-10 first:mt-13">
              <div className="font-mono text-[10px] tracking-[0.18em] text-white/30 uppercase mb-4">
                {SPONSOR_TIER_LABELS[tier]}
              </div>
              <div className={`grid ${TIER_GRID[tier]} gap-4`}>
                {tierSponsors.map((sponsor) => (
                  <a
                    href={sponsor.href}
                    key={sponsor.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      className={`flex items-center justify-center border border-border-hover hover:cursor-pointer bg-white/3 transition-all duration-200 group hover:border-acid/50 hover:bg-acid/5 ${TIER_HEIGHT[tier]}`}
                    >
                      {sponsor.logo ? (
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          width={logoSize.w}
                          height={logoSize.h}
                          className="object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                        />
                      ) : (
                        <span className="font-display text-lg tracking-[0.06em] text-white/70">
                          {sponsor.name}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}

        {/* Sponsor CTA */}
        <div className="mt-12 p-6 md:p-8 border border-acid/10 bg-acid/2 flex justify-between items-center flex-wrap gap-5">
          <div>
            <div className="font-body font-bold text-[15px]">Интересувате се от спонсорство?</div>
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
