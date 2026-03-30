"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib";
import { SPONSORS } from "@/constants";
import { SectionHeader } from "@/components/section-header";

export function MediaPartnersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const mediaSponsors = SPONSORS.filter((s) => s.tier === "media");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (mediaSponsors.length === 0) return null;

  return (
    <section id="media-partners" className="px-6 py-25 md:px-12 border-t border-border">
      <div ref={ref} className="max-w-[1100px] mx-auto">
        <SectionHeader label="РАЗПРОСТРАНЯВАТ ПОСЛАНИЕТО" title="Медийни партньори" />

        <div
          className={cn(
            "mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {mediaSponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative flex items-center justify-center min-h-[90px] p-5 border border-border-hover bg-white/3 transition-all duration-300 group-hover:border-acid/30 group-hover:bg-acid/5 group-hover:shadow-[0_0_20px_rgba(254,238,4,0.06)]">
                <span className="absolute top-0 left-0 h-0 w-0 border-t border-l border-acid opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100" />
                <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-acid opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100" />
                <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-acid opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100" />
                <span className="absolute bottom-0 right-0 h-0 w-0 border-b border-r border-acid opacity-0 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100" />

                {sponsor.logo ? (
                  <div className="relative" style={{ width: 120, height: 45 }}>
                    <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
                  </div>
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
    </section>
  );
}
