"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseTestimonial } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { CornerBrackets } from "@/components/ui";
import { useInView } from "@/hooks";

interface TestimonialsSectionProps {
  testimonials: ShowcaseTestimonial[];
}

const AUTO_ADVANCE_MS = 9000;

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const go = useCallback(
    (next: number) => {
      const len = testimonials.length;
      const nextIdx = ((next % len) + len) % len;
      setActive(nextIdx);
      setProgress(0);
      startRef.current = performance.now();
    },
    [testimonials.length]
  );

  const next = useCallback(() => go(active + 1), [go, active]);
  const prev = useCallback(() => go(active - 1), [go, active]);

  useEffect(() => {
    if (paused || !inView || testimonials.length <= 1) return;
    startRef.current = performance.now();
    const tick = (t: number) => {
      const elapsed = t - startRef.current;
      const p = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      setProgress(p);
      if (p >= 1) {
        go(active + 1);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, paused, inView, go, testimonials.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, next, prev]);

  if (testimonials.length === 0) return null;

  const total = testimonials.length;

  return (
    <section className="px-6 py-25 md:px-12 overflow-hidden">
      <div className="max-w-[1180px] mx-auto" ref={ref}>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader label="ОТЗИВИ" title="Какво казаха" />
          <div className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase md:text-right">
            <div className="mb-2">
              <span className="text-acid">{String(active + 1).padStart(2, "0")}</span>
              <span className="text-white/30"> / {String(total).padStart(2, "0")}</span>
            </div>
            <div className="relative h-px w-[180px] md:ml-auto bg-white/10 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-acid transition-[width] duration-100 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Stage — all cards share one grid cell so container sizes to the tallest */}
          <div className="relative z-1 grid">
            {testimonials.map((entry, i) => {
              const isActive = i === active;
              return (
                <figure
                  key={i}
                  aria-hidden={!isActive}
                  className={cn(
                    "[grid-area:1/1] relative flex flex-col bg-card border border-border p-6 md:p-8 overflow-hidden transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "opacity-100 translate-x-0 blur-0 pointer-events-auto"
                      : "opacity-0 pointer-events-none blur-[6px]"
                  )}
                  style={{
                    transform: isActive
                      ? "translate3d(0,0,0) scale(1)"
                      : `translate3d(${(i < active ? -1 : 1) * 28}px, 0, 0) scale(0.99)`,
                  }}
                >
                  <CornerBrackets variant="fade" size="sm" />
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-[2px] w-full bg-acid/70 z-2"
                  />

                  {/* Giant watermark numeral inside the card */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-6 md:-top-10 -right-2 md:-right-6 font-display text-[clamp(220px,32vw,380px)] leading-[0.78] tracking-tight select-none z-0"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "2px rgba(254,238,4,0.5)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden
                    className="font-display block text-[56px] md:text-[72px] leading-[0.7] text-acid/70 mb-1 select-none relative z-1"
                  >
                    &ldquo;
                  </span>

                  <blockquote className="relative z-1 font-serif text-[15px] md:text-[17px] leading-[1.65] text-white/85 whitespace-pre-line max-w-[760px] mb-8">
                    {entry.quote}
                  </blockquote>

                  <figcaption className="relative z-1 mt-auto pt-5 flex items-center gap-3 border-t border-border">
                    {entry.avatarUrl ? (
                      <div className="relative w-10 h-10 overflow-hidden border border-white/10 shrink-0">
                        <Image
                          src={entry.avatarUrl}
                          alt={entry.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div
                        aria-hidden
                        className="w-10 h-10 border border-acid/40 shrink-0 grid place-items-center font-mono text-[11px] text-acid bg-acid/5"
                      >
                        {initialsOf(entry.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-display text-[18px] md:text-[20px] leading-[1.1] tracking-[-0.01em] text-white">
                        {entry.name}
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase mt-1">
                        {entry.role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* Controls */}
          <div className="mt-7 flex items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Предишен отзив"
                className="group w-10 h-10 grid place-items-center border border-border hover:border-acid hover:bg-acid/5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white/70 group-hover:text-acid transition-colors" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Следващ отзив"
                className="group w-10 h-10 grid place-items-center border border-border hover:border-acid hover:bg-acid/5 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-acid transition-colors" />
              </button>
            </div>

            {/* Thumbnail picker */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              {testimonials.map((entry, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={`${entry.name}-${i}`}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Отзив от ${entry.name}`}
                    aria-current={isActive}
                    title={entry.name}
                    className={cn(
                      "relative h-10 px-3 min-w-10 font-mono text-[10px] tracking-[0.14em] uppercase border transition-all",
                      isActive
                        ? "border-acid text-acid bg-acid/10"
                        : "border-border text-white/50 hover:text-white hover:border-white/30"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute left-0 bottom-[-1px] h-[2px] bg-acid"
                        style={{ width: `${progress * 100}%` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden md:block font-mono text-[10px] tracking-[0.18em] uppercase text-white/35">
              ← / → за навигация
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
