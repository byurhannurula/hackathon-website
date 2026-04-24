"use client";

import Image from "next/image";

import { cn } from "@/lib";
import type { ShowcaseTestimonial } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { useInView } from "@/hooks";

interface TestimonialsSectionProps {
  testimonials: ShowcaseTestimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.2 });

  if (testimonials.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ОТЗИВИ" title="Какво казаха участниците" />
        </div>

        <ul className="grid gap-8 md:gap-12 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              className={cn(
                "list-none transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
            >
              <figure className="group relative pl-6 md:pl-8">
                {/* Left accent bar — expands to acid on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-px bg-white/15 transition-all duration-500 group-hover:w-[3px] group-hover:bg-acid"
                />
                {/* Oversized opening quote */}
                <span
                  aria-hidden
                  className="font-display text-[80px] leading-none text-acid/40 absolute -top-4 left-4 md:left-6 select-none"
                >
                  &ldquo;
                </span>
                <blockquote className="relative font-serif text-[19px] md:text-[22px] leading-[1.5] text-white/85 mb-6">
                  {t.quote}
                </blockquote>
                <figcaption className="relative flex items-center gap-3">
                  {t.avatarUrl && (
                    <div className="relative w-10 h-10 overflow-hidden border border-white/10 shrink-0">
                      <Image
                        src={t.avatarUrl}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-mono text-[12px] font-bold text-white/85">{t.name}</div>
                    <div className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
