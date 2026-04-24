"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseWinner } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { useInView } from "@/hooks";

interface WinnersSectionEditorialProps {
  winners: ShowcaseWinner[];
}

const PLACE_LABEL: Record<1 | 2 | 3, string> = {
  1: "I място",
  2: "II място",
  3: "III място",
};

export function WinnersSectionEditorial({ winners }: WinnersSectionEditorialProps) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);

  if (winners.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-14">
          <SectionHeader label="ХАКАТОН '26" title="Победители" />
        </div>

        <ol className="list-none p-0 border-t border-border">
          {ordered.map((w, i) => (
            <li
              key={`${w.place}-${w.teamName}`}
              className={cn(
                "group border-b border-border transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: inView ? `${i * 140}ms` : "0ms" }}
            >
              <article className="grid gap-6 md:gap-10 md:grid-cols-[auto_1.15fr_1fr] py-10 md:py-14 items-start">
                {/* Big numeral */}
                <div className="flex md:block items-baseline gap-3 md:min-w-[140px]">
                  <span
                    className={cn(
                      "font-display leading-[0.85] tracking-[-0.04em] select-none transition-colors",
                      w.place === 1
                        ? "text-acid text-[80px] md:text-[140px]"
                        : "text-white/15 group-hover:text-white/30 text-[64px] md:text-[120px]"
                    )}
                  >
                    0{w.place}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[11px] font-bold tracking-[0.2em] uppercase md:mt-4 md:block",
                      w.place === 1 ? "text-acid" : "text-white/45"
                    )}
                  >
                    {PLACE_LABEL[w.place]}
                  </span>
                </div>

                {/* Image */}
                {w.imageUrl ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10">
                    <Image
                      src={w.imageUrl}
                      alt={w.projectName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority={w.place === 1}
                    />
                    {w.place === 1 && (
                      <span aria-hidden className="absolute left-0 top-0 h-[2px] w-full bg-acid" />
                    )}
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent" />
                )}

                {/* Content */}
                <div className="flex flex-col">
                  <div className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase mb-2">
                    {w.teamName}
                  </div>
                  <h3
                    className={cn(
                      "font-body font-semibold tracking-[-0.02em] leading-[1.1] mb-4 transition-colors group-hover:text-acid",
                      w.place === 1 ? "text-3xl md:text-[34px]" : "text-2xl md:text-[26px]"
                    )}
                  >
                    {w.projectName}
                  </h3>
                  <p className="font-mono text-[12.5px] text-white/65 leading-[1.8] mb-5">
                    {w.pitch}
                  </p>

                  {w.members.length > 0 && (
                    <div className="font-mono text-[10px] text-white/40 leading-[1.7] mb-4">
                      {w.members.join(" · ")}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    {w.prize && (
                      <div className="inline-flex font-mono text-[11px] text-acid tracking-[0.14em] uppercase px-3 py-1 border border-acid/25 bg-acid/5">
                        {w.prize}
                      </div>
                    )}
                    {w.repoUrl && (
                      <a
                        href={w.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] uppercase text-white/70 hover:text-acid no-underline transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Код
                      </a>
                    )}
                    {w.demoUrl && (
                      <a
                        href={w.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] uppercase text-white/70 hover:text-acid no-underline transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Демо
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
