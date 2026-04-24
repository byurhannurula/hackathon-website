"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Github, ExternalLink, Trophy } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseWinner } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { CornerBrackets } from "@/components/ui";
import { useInView } from "@/hooks";

interface WinnersSectionProps {
  winners: ShowcaseWinner[];
}

const PLACE_LABEL: Record<1 | 2 | 3, string> = {
  1: "I място",
  2: "II място",
  3: "III място",
};

export function WinnersSection({ winners }: WinnersSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);

  if (winners.length === 0) return null;

  const winner1 = ordered.find((w) => w.place === 1);
  const runnersUp = ordered.filter((w) => w.place !== 1);

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26" title="Победители" />
        </div>

        <ol className="grid gap-5 md:grid-cols-2 list-none p-0">
          {winner1 && (
            <li
              className={cn(
                "md:col-span-2 transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              <article className="group relative grid md:grid-cols-[1.35fr_1fr] bg-card border border-border hover:border-acid/60 transition-colors overflow-hidden">
                <span aria-hidden className="absolute left-0 top-0 h-[2px] w-full bg-acid z-10" />
                <CornerBrackets variant="fade" size="md" />

                {winner1.imageUrl ? (
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                    <Image
                      src={winner1.imageUrl}
                      alt={winner1.projectName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="hidden md:block md:min-h-[420px] border-r border-white/10 bg-gradient-to-br from-acid/10 via-transparent to-transparent" />
                )}

                <div className="flex flex-col p-7 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-[12px] font-bold tracking-[0.22em] uppercase text-acid">
                      {PLACE_LABEL[1]}
                    </span>
                    <Trophy className="w-6 h-6 text-acid transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  </div>

                  <div className="font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase mb-2">
                    {winner1.teamName}
                  </div>
                  <h3 className="font-body text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.1] mb-5 group-hover:text-acid transition-colors">
                    {winner1.projectName}
                  </h3>
                  <p className="font-mono text-[13px] text-white/65 leading-[1.8] mb-6">
                    {winner1.pitch}
                  </p>

                  {winner1.members.length > 0 && (
                    <div className="font-mono text-[10px] text-white/40 leading-[1.7] mb-5">
                      {winner1.members.join(" · ")}
                    </div>
                  )}

                  {winner1.prize && (
                    <div className="inline-flex w-fit font-mono text-[11px] text-acid tracking-[0.16em] uppercase px-3.5 py-1.5 border border-acid/25 bg-acid/5 mb-5">
                      {winner1.prize}
                    </div>
                  )}

                  {(winner1.repoUrl || winner1.demoUrl) && (
                    <div className="flex gap-4 pt-5 mt-auto border-t border-border">
                      {winner1.repoUrl && (
                        <a
                          href={winner1.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-white/70 hover:text-acid no-underline transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" /> Код
                        </a>
                      )}
                      {winner1.demoUrl && (
                        <a
                          href={winner1.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-white/70 hover:text-acid no-underline transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Демо
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </li>
          )}

          {runnersUp.map((w, i) => (
            <li
              key={`${w.place}-${w.teamName}`}
              className={cn(
                "transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: inView ? `${(i + 1) * 140}ms` : "0ms" }}
            >
              <article className="group relative flex h-full flex-col bg-card border border-border hover:border-white/25 transition-colors">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-0 bg-acid transition-all duration-500 group-hover:w-full"
                />
                <CornerBrackets variant="fade" size="md" />

                <div className="flex items-center justify-between p-6 md:p-7 pb-0">
                  <span className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-white/55">
                    {PLACE_LABEL[w.place]}
                  </span>
                  <Trophy className="w-5 h-5 text-white/35 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {w.imageUrl && (
                  <div className="px-6 md:px-7 mt-5">
                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10">
                      <Image
                        src={w.imageUrl}
                        alt={w.projectName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6 md:p-7 pt-5">
                  <div className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase mb-1">
                    {w.teamName}
                  </div>
                  <h3 className="font-body text-xl font-semibold tracking-[-0.02em] mb-3 group-hover:text-acid transition-colors">
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
