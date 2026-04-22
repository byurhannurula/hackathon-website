"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, Trophy } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseWinner } from "@/constants";
import { SectionHeader } from "@/components/section-header";

interface WinnersSectionProps {
  winners: ShowcaseWinner[];
}

const PLACE_LABEL: Record<1 | 2 | 3, string> = {
  1: "I място",
  2: "II място",
  3: "III място",
};

export function WinnersSection({ winners }: WinnersSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (winners.length === 0) return null;

  const ordered = [...winners].sort((a, b) => a.place - b.place);

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26" title="Победители" />
        </div>

        <ul className="grid gap-5 md:grid-cols-3">
          {ordered.map((w, i) => (
            <li
              key={`${w.place}-${w.teamName}`}
              className={cn(
                "list-none transition-all duration-700",
                w.place === 1 && "md:order-2 md:-translate-y-2",
                w.place === 2 && "md:order-1",
                w.place === 3 && "md:order-3",
                inView ? "opacity-100" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: inView ? `${i * 120}ms` : "0ms" }}
            >
              <article
                className={cn(
                  "group relative flex h-full flex-col bg-card border border-border transition-colors",
                  w.place === 1 ? "hover:border-acid/60" : "hover:border-white/25"
                )}
              >
                {/* Top accent — always visible on 1st place, on hover for others */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-0 h-[2px] bg-acid transition-all duration-500",
                    w.place === 1 ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />

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
                      "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                      w.place === 1 ? "text-acid" : "text-white/35"
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
        </ul>
      </div>
    </section>
  );
}
