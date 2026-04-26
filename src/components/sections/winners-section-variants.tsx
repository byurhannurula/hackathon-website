"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseWinner } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { CornerBrackets } from "@/components/ui";
import { useInView } from "@/hooks";

interface Props {
  winners: ShowcaseWinner[];
}

const PLACE_LABEL: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "I място",
  2: "II място",
  3: "III място",
  4: "IV място",
  5: "V място",
};

// ───────────────────────────────────────────────────────────────────────────
// 1. Leaderboard — retro high-score table
// ───────────────────────────────────────────────────────────────────────────

export function WinnersSectionLeaderboard({ winners }: Props) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);

  if (ordered.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26" title="Победители" />
        </div>

        <div className="border border-border bg-card font-mono">
          {/* Terminal-style header bar */}
          <div className="flex items-center gap-2 px-4 md:px-6 py-2.5 border-b border-border bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-acid/60" />
            <span className="ml-3 text-[10px] tracking-[0.18em] uppercase text-white/45">
              winners.log
            </span>
          </div>

          {/* Column header */}
          <div className="grid grid-cols-[50px_1fr_70px] md:grid-cols-[60px_1.2fr_1.6fr_120px_90px] gap-3 md:gap-5 px-4 md:px-6 py-3 border-b border-border text-[10px] tracking-[0.18em] uppercase text-white/40">
            <div>Rank</div>
            <div>Team</div>
            <div className="hidden md:block">Project</div>
            <div className="hidden md:block">Prize</div>
            <div className="text-right">Links</div>
          </div>

          {/* Rows */}
          <ol className="list-none p-0 m-0">
            {ordered.map((w, i) => (
              <li
                key={`${w.place}-${w.teamName}`}
                className={cn(
                  "group grid grid-cols-[50px_1fr_70px] md:grid-cols-[60px_1.2fr_1.6fr_120px_90px] gap-3 md:gap-5 px-4 md:px-6 py-4 border-b border-border last:border-b-0 transition-all duration-500 hover:bg-acid/[0.05]",
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                )}
                style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
              >
                <div
                  className={cn(
                    "font-display text-[26px] tracking-[-0.02em] leading-none flex items-center gap-1.5",
                    w.place === 1 ? "text-acid" : "text-white/70 group-hover:text-white"
                  )}
                >
                  {w.place === 1 && (
                    <span aria-hidden className="text-acid animate-pulse">
                      ▋
                    </span>
                  )}
                  0{w.place}
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  {w.imageUrl && (
                    <div className="relative w-10 h-10 shrink-0 overflow-hidden border border-white/10">
                      <Image
                        src={w.imageUrl}
                        alt={w.teamName}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "text-[13px] font-bold truncate",
                        w.place === 1 ? "text-acid" : "text-white/85"
                      )}
                    >
                      {w.teamName}
                    </div>
                    <div className="text-[10px] text-white/40 truncate md:hidden">
                      {w.projectName}
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex flex-col justify-center min-w-0">
                  <div className="text-white/85 text-[13px] font-semibold truncate">
                    {w.projectName}
                  </div>
                  <div className="text-white/45 text-[11px] truncate">{w.pitch}</div>
                </div>

                <div className="hidden md:flex items-center text-acid text-[11px] tracking-[0.14em]">
                  {w.prize ?? "—"}
                </div>

                <div className="flex items-center justify-end gap-3 text-white/55">
                  {w.repoUrl && (
                    <a
                      href={w.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${w.teamName} repo`}
                      className="hover:text-acid transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {w.demoUrl && (
                    <a
                      href={w.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${w.teamName} demo`}
                      className="hover:text-acid transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* Footer caret */}
          <div className="px-4 md:px-6 py-3 text-[10px] text-white/35 tracking-[0.18em] uppercase border-t border-border flex items-center gap-2">
            <span className="text-acid animate-pulse">▋</span>
            <span>{ordered.length} record(s) · end of file</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 2. Mosaic — magazine-cover split with hero + side rows
// ───────────────────────────────────────────────────────────────────────────

const BIG_ROW_SPAN: Record<number, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
  3: "lg:row-span-3",
  4: "lg:row-span-4",
};

export function WinnersSectionMosaic({ winners }: Props) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);

  if (ordered.length === 0) return null;
  const [hero, ...rest] = ordered;
  const heroRowSpan = BIG_ROW_SPAN[Math.max(1, rest.length)] ?? "lg:row-span-1";

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26" title="Победители" />
        </div>

        <div
          className={cn(
            "grid gap-3 lg:grid-cols-12 lg:auto-rows-fr",
            rest.length > 0 && "lg:min-h-[640px]"
          )}
        >
          {/* Hero — 1st place */}
          <article
            className={cn(
              "group relative overflow-hidden bg-card border border-border hover:border-acid/60 transition-all duration-700",
              "lg:col-span-7",
              heroRowSpan,
              inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
            )}
          >
            {hero.imageUrl ? (
              <>
                <Image
                  src={hero.imageUrl}
                  alt={hero.projectName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15"
                />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-acid/15 via-transparent to-transparent" />
            )}
            <span aria-hidden className="absolute left-0 top-0 h-[3px] w-full bg-acid z-10" />
            <CornerBrackets variant="fade" size="md" />

            <div className="relative z-10 flex flex-col h-full min-h-[340px] lg:min-h-0 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-acid">
                  {PLACE_LABEL[hero.place]}
                </span>
                <span
                  aria-hidden
                  className="font-display text-[64px] md:text-[88px] leading-none text-acid/80 tracking-[-0.04em] -mt-2"
                >
                  0{hero.place}
                </span>
              </div>

              <div className="mt-auto">
                <div className="font-mono text-[10px] tracking-[0.16em] text-white/65 uppercase mb-2">
                  {hero.teamName}
                </div>
                <h3 className="font-body text-3xl md:text-[34px] font-semibold tracking-[-0.02em] leading-[1.1] mb-4 group-hover:text-acid transition-colors">
                  {hero.projectName}
                </h3>
                <p className="font-mono text-[12.5px] text-white/80 leading-[1.8] mb-5 max-w-[460px]">
                  {hero.pitch}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {hero.prize && (
                    <span className="inline-flex font-mono text-[11px] text-acid tracking-[0.16em] uppercase px-3 py-1 border border-acid/30 bg-black/40">
                      {hero.prize}
                    </span>
                  )}
                  {hero.repoUrl && (
                    <a
                      href={hero.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-white/85 hover:text-acid no-underline"
                    >
                      <Github className="w-3.5 h-3.5" /> Код
                    </a>
                  )}
                  {hero.demoUrl && (
                    <a
                      href={hero.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-white/85 hover:text-acid no-underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Демо
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* Side rows — 2nd through 5th */}
          {rest.map((w, i) => (
            <article
              key={`${w.place}-${w.teamName}`}
              className={cn(
                "group relative overflow-hidden bg-card border border-border hover:border-white/30 transition-all duration-500",
                "lg:col-span-5",
                inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
              )}
              style={{ transitionDelay: inView ? `${(i + 1) * 120}ms` : "0ms" }}
            >
              <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] h-full">
                <div className="relative overflow-hidden border-r border-white/10">
                  {w.imageUrl ? (
                    <Image
                      src={w.imageUrl}
                      alt={w.projectName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="140px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
                  )}
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-2 font-display text-3xl text-white/85 leading-none"
                  >
                    0{w.place}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-4 md:p-5 min-w-0">
                  <div className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase mb-1">
                    {PLACE_LABEL[w.place]} · {w.teamName}
                  </div>
                  <h4 className="font-body text-[17px] md:text-[19px] font-semibold tracking-[-0.01em] mb-1.5 truncate group-hover:text-acid transition-colors">
                    {w.projectName}
                  </h4>
                  {w.prize && (
                    <div className="font-mono text-[10px] text-acid tracking-[0.14em]">
                      {w.prize}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 3. Polaroid stack — playful overlapping photo cards
// ───────────────────────────────────────────────────────────────────────────

// Pre-set rotations per slot so they look hand-arranged but stay deterministic (SSR-safe).
const ROTATIONS = ["-4deg", "3deg", "-2deg", "4deg", "-3deg"];

export function WinnersSectionPolaroid({ winners }: Props) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);
  const [hovered, setHovered] = useState<number | null>(null);

  if (ordered.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12 overflow-hidden">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26" title="Победители" />
        </div>

        <div className="flex flex-col items-center gap-8 md:gap-0 md:flex-row md:flex-wrap md:justify-center md:items-start py-6">
          {ordered.map((w, i) => {
            const rotation = ROTATIONS[i % ROTATIONS.length];
            const isHovered = hovered === i;
            // Default stacking: 1st always on top, then later cards layered under earlier ones.
            const baseZ = w.place === 1 ? ordered.length + 1 : ordered.length - i;
            const transform = !inView
              ? "rotate(0deg)"
              : isHovered
                ? "rotate(0deg) scale(1.14) translateY(-14px)"
                : `rotate(${rotation})`;
            return (
              <article
                key={`${w.place}-${w.teamName}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "group relative w-[260px] md:w-[230px] bg-white text-black p-3 pb-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] transition-all duration-500 md:-mx-2",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{
                  transform,
                  transitionDelay: inView ? `${i * 120}ms` : "0ms",
                  zIndex: isHovered ? 100 : baseZ,
                  boxShadow: isHovered
                    ? "0 30px 60px -20px rgba(0,0,0,0.85)"
                    : "0 18px 40px -18px rgba(0,0,0,0.7)",
                }}
              >
                {/* Place tape */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 font-mono text-[10px] font-bold tracking-[0.18em] uppercase",
                    w.place === 1 ? "bg-acid text-black" : "bg-black/85 text-white"
                  )}
                >
                  {PLACE_LABEL[w.place]}
                </span>

                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                  {w.imageUrl ? (
                    <Image
                      src={w.imageUrl}
                      alt={w.projectName}
                      fill
                      className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-[filter] duration-500"
                      sizes="260px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-display text-5xl">
                      0{w.place}
                    </div>
                  )}
                </div>

                <div className="mt-3 px-1">
                  <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-neutral-500 mb-1">
                    {w.teamName}
                  </div>
                  <h4 className="font-body text-[18px] font-semibold tracking-[-0.01em] leading-[1.15] mb-1.5 text-neutral-900">
                    {w.projectName}
                  </h4>
                  {w.prize && (
                    <div className="font-mono text-[10px] text-neutral-600 tracking-[0.12em]">
                      {w.prize}
                    </div>
                  )}
                  {(w.repoUrl || w.demoUrl) && (
                    <div className="flex gap-2.5 mt-2.5 text-neutral-500">
                      {w.repoUrl && (
                        <a
                          href={w.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${w.teamName} repo`}
                          className="hover:text-black transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {w.demoUrl && (
                        <a
                          href={w.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${w.teamName} demo`}
                          className="hover:text-black transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
