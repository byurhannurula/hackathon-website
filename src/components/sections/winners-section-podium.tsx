"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Github, ExternalLink, Trophy } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseWinner } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { CornerBrackets } from "@/components/ui";
import { useInView } from "@/hooks";

interface WinnersSectionPodiumProps {
  winners: ShowcaseWinner[];
}

const PLACE_LABEL: Record<1 | 2 | 3, string> = {
  1: "I място",
  2: "II място",
  3: "III място",
};

// Podium visual arrangement on desktop: 2nd | 1st | 3rd.
const DESKTOP_ORDER: Record<1 | 2 | 3, string> = {
  1: "md:order-2",
  2: "md:order-1",
  3: "md:order-3",
};

// Plinth heights in px — 1st is the tallest platform.
const PLINTH_HEIGHT: Record<1 | 2 | 3, number> = {
  1: 96,
  2: 60,
  3: 36,
};

export function WinnersSectionPodium({ winners }: WinnersSectionPodiumProps) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);

  if (winners.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-14">
          <SectionHeader label="ХАКАТОН '26" title="Победители" />
        </div>

        <ol className="grid gap-5 md:grid-cols-3 md:items-end list-none p-0">
          {ordered.map((w, i) => (
            <li
              key={`${w.place}-${w.teamName}`}
              className={cn(
                "flex flex-col transition-all duration-700",
                DESKTOP_ORDER[w.place],
                inView ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: inView ? `${i * 140}ms` : "0ms" }}
            >
              <article
                className={cn(
                  "group relative flex flex-1 flex-col bg-card border transition-colors",
                  w.place === 1
                    ? "border-acid/40 hover:border-acid"
                    : "border-border hover:border-white/25"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-0 h-[2px] bg-acid transition-all duration-500",
                    w.place === 1 ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
                <CornerBrackets variant="fade" size="md" />

                <div className="flex items-center justify-between p-6 md:p-7 pb-0">
                  <span
                    className={cn(
                      "font-mono text-[11px] font-bold tracking-[0.18em] uppercase",
                      w.place === 1 ? "text-acid" : "text-white/55"
                    )}
                  >
                    {PLACE_LABEL[w.place]}
                  </span>
                  <Trophy
                    className={cn(
                      "transition-transform duration-300 group-hover:scale-110",
                      w.place === 1 ? "w-6 h-6 text-acid" : "w-5 h-5 text-white/35"
                    )}
                  />
                </div>

                {w.imageUrl && (
                  <div className="px-6 md:px-7 mt-5">
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/10">
                      <Image
                        src={w.imageUrl}
                        alt={w.projectName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6 md:p-7 pt-5">
                  <div className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase mb-1">
                    {w.teamName}
                  </div>
                  <h3
                    className={cn(
                      "font-body font-semibold tracking-[-0.02em] mb-3 transition-colors group-hover:text-acid",
                      w.place === 1 ? "text-2xl md:text-[26px]" : "text-xl"
                    )}
                  >
                    {w.projectName}
                  </h3>
                  <p className="font-mono text-[12px] text-white/60 leading-[1.7] mb-4">
                    {w.pitch}
                  </p>

                  {w.members.length > 0 && (
                    <div className="font-mono text-[10px] text-white/40 leading-[1.6] mb-4">
                      {w.members.join(" · ")}
                    </div>
                  )}

                  {w.prize && (
                    <div className="inline-flex w-fit font-mono text-[11px] text-acid tracking-[0.14em] uppercase px-3 py-1 border border-acid/20 bg-acid/5 mb-4">
                      {w.prize}
                    </div>
                  )}

                  {(w.repoUrl || w.demoUrl) && (
                    <div className="flex gap-3 pt-4 mt-auto border-t border-border">
                      {w.repoUrl && (
                        <a
                          href={w.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-white/60 hover:text-acid no-underline transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" /> Код
                        </a>
                      )}
                      {w.demoUrl && (
                        <a
                          href={w.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-white/60 hover:text-acid no-underline transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Демо
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>

              {/* Podium plinth — sells the "podium" metaphor on desktop.
                  Hidden on mobile where the stacking order is just 1/2/3. */}
              <div
                aria-hidden
                className={cn(
                  "hidden md:flex items-center justify-center relative overflow-hidden border-x border-b",
                  w.place === 1 ? "bg-acid/10 border-acid/30" : "bg-white/[0.03] border-white/10"
                )}
                style={{ height: PLINTH_HEIGHT[w.place] }}
              >
                <span
                  className={cn(
                    "font-display tracking-[-0.02em] leading-none select-none",
                    w.place === 1 ? "text-acid/80 text-5xl" : "text-white/25 text-4xl"
                  )}
                >
                  0{w.place}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
