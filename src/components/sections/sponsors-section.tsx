"use client";

import Image from "next/image";
import { cn } from "@/lib";
import { SPONSORS, SPONSOR_TIER_LABELS, siteConfig } from "@/constants";
import { SectionHeader } from "@/components/section-header";
import { useInView } from "@/hooks";
import type { SponsorTier } from "@/lib/types";

const TIER_ORDER: SponsorTier[] = ["general", "strategic", "partner", "supporter"];

const TIER_GRID: Record<SponsorTier, string> = {
  general: "grid-cols-1",
  strategic: "grid-cols-1 sm:grid-cols-3",
  partner: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  supporter: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  media: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

const TIER_HEIGHT: Record<SponsorTier, string> = {
  general: "min-h-[170px] p-8",
  strategic: "min-h-[120px] p-5",
  partner: "min-h-[100px] p-5",
  supporter: "min-h-[90px] p-5",
  media: "min-h-[90px] p-5",
};

const TIER_LOGO_SIZE: Record<SponsorTier, { w: number; h: number }> = {
  general: { w: 400, h: 100 },
  strategic: { w: 220, h: 80 },
  partner: { w: 200, h: 50 },
  supporter: { w: 120, h: 45 },
  media: { w: 120, h: 45 },
};

function SponsorCard({
  sponsor,
  logoSize,
  tierHeight,
}: {
  sponsor: (typeof SPONSORS)[number];
  logoSize: { w: number; h: number };
  tierHeight: string;
}) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block transition-transform duration-300 hover:-translate-y-1"
    >
      {sponsor.label && (
        <div className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase mb-2">
          {sponsor.label}
        </div>
      )}
      <div
        className={cn(
          "relative flex items-center justify-center border border-border-hover bg-white/3 transition-all duration-300 group-hover:border-acid/30 group-hover:bg-acid/5 group-hover:shadow-[0_0_20px_rgba(254,238,4,0.06)]",
          tierHeight
        )}
      >
        {/* Corner accents */}
        <span className="absolute top-0 left-0 h-0 w-0 border-t border-l border-acid opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100" />
        <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-acid opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100" />
        <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-acid opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100" />
        <span className="absolute bottom-0 right-0 h-0 w-0 border-b border-r border-acid opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100" />

        {sponsor.logo ? (
          <div
            className="relative"
            style={{
              width: logoSize.w,
              height: logoSize.h,
              ...(sponsor.invertLogo && { filter: "brightness(0) invert(1)" }),
              ...(sponsor.logoScale && {
                transform: `scale(${sponsor.logoScale})`,
              }),
            }}
          >
            <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
          </div>
        ) : (
          <span className="font-display text-lg tracking-[0.06em] text-white/70">
            {sponsor.name}
          </span>
        )}
      </div>
    </a>
  );
}

export function SponsorsSection() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section id="sponsors" className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div ref={ref} className="max-w-[1100px] mx-auto">
        <SectionHeader label="ПРАВЯТ ТОВА ВЪЗМОЖНО" title="Спонсори" />

        {TIER_ORDER.map((tier, tierIdx) => {
          const tierSponsors = SPONSORS.filter((s) => s.tier === tier);
          if (tierSponsors.length === 0) return null;
          const logoSize = TIER_LOGO_SIZE[tier];

          return (
            <div
              key={tier}
              className={cn(
                "mt-10 first:mt-13 transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: inView ? `${tierIdx * 150}ms` : "0ms" }}
            >
              <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase mb-4">
                {tier === "strategic" ? "" : SPONSOR_TIER_LABELS[tier]}
              </div>
              <div className={cn("grid gap-4", TIER_GRID[tier])}>
                {tierSponsors.map((sponsor) => (
                  <SponsorCard
                    key={sponsor.name}
                    sponsor={sponsor}
                    logoSize={logoSize}
                    tierHeight={TIER_HEIGHT[tier]}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Sponsor CTA */}
        <div
          className={cn(
            "mt-12 p-6 md:p-8 border border-acid/10 bg-acid/2 flex justify-between items-center flex-wrap gap-5 transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{
            transitionDelay: inView ? `${TIER_ORDER.length * 150}ms` : "0ms",
          }}
        >
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
