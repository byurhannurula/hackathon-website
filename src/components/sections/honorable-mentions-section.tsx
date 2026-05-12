"use client";

import { Award } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseHonorableMention } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { CornerBrackets } from "@/components/ui";
import { useInView } from "@/hooks";

interface HonorableMentionsSectionProps {
  mentions: ShowcaseHonorableMention[];
}

export function HonorableMentionsSection({ mentions }: HonorableMentionsSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  if (mentions.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12 border-t border-border">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="СПЕЦИАЛНИ НАГРАДИ" title="Допълнителни награди" />
          <p className="font-mono text-[13px] text-white/55 leading-[1.8] mt-5 max-w-[640px]">
            Освен първите три места, спонсорите ни връчиха и редица специални награди — за най-млад
            отбор, най-голям ентусиазъм, специални теми и още.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {mentions.map((m, i) => (
            <li
              key={`${m.teamName}-${m.projectName}`}
              className={cn(
                "transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: inView ? `${i * 70}ms` : "0ms" }}
            >
              <article className="group relative flex h-full flex-col bg-card border border-border hover:border-acid/40 transition-colors p-6">
                <CornerBrackets variant="fade" size="sm" />
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-0 bg-acid transition-all duration-500 group-hover:w-full"
                />

                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-acid/85">
                    {m.category}
                  </span>
                  <Award className="w-4 h-4 text-white/35 transition-transform duration-300 group-hover:scale-110 group-hover:text-acid" />
                </div>

                <div className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase mb-1">
                  {m.teamName}
                </div>
                <h3 className="font-body text-lg font-semibold tracking-[-0.01em] leading-[1.2] mb-3 group-hover:text-acid transition-colors">
                  {m.projectName}
                </h3>
                <p className="font-mono text-[12px] text-white/60 leading-[1.7] mb-5">{m.pitch}</p>

                {m.sponsor && (
                  <div className="mt-auto pt-4 border-t border-border">
                    <div className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase mb-1">
                      Награда от
                    </div>
                    <div className="font-mono text-[12px] text-white/75">{m.sponsor}</div>
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
