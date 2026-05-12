"use client";

import { ArrowUpRight, Newspaper } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseMediaItem } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { CornerBrackets } from "@/components/ui";
import { useInView } from "@/hooks";

interface PressSectionProps {
  items: ShowcaseMediaItem[];
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function PressSection({ items }: PressSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.2 });

  if (items.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12 border-t border-border">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="МЕДИИ" title="Те говориха за нас" />
          <p className="font-mono text-[13px] text-white/55 leading-[1.8] mt-5 max-w-[640px]">
            Български и международни медии отразиха събитието. Ето откъде можете да научите повече.
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 list-none p-0">
          {items.map((m, i) => (
            <li
              key={m.url}
              className={cn(
                "transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col bg-card border border-border hover:border-acid/40 transition-colors p-6 md:p-7 no-underline"
              >
                <CornerBrackets variant="fade" size="sm" />
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-0 bg-acid transition-all duration-500 group-hover:w-full"
                />

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-3.5 h-3.5 text-acid/80" />
                    <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-acid/85">
                      {m.outlet}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 transition-all duration-300 group-hover:text-acid group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="font-body text-lg md:text-xl font-semibold tracking-[-0.01em] leading-[1.3] text-white/90 group-hover:text-acid transition-colors mb-5">
                  {m.title}
                </h3>

                {m.excerpt && (
                  <p className="font-mono text-[12px] text-white/55 leading-[1.7] mb-5">
                    {m.excerpt}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-white/40">
                  <span>{getDomain(m.url)}</span>
                  {m.date && <span>{m.date}</span>}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
