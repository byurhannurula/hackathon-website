"use client";

import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseProject } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { useInView } from "@/hooks";

interface ProjectsGallerySectionProps {
  projects: ShowcaseProject[];
}

export function ProjectsGallerySection({ projects }: ProjectsGallerySectionProps) {
  const { ref, inView } = useInView({ threshold: 0.12 });

  if (projects.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="48 ЧАСА РАБОТА" title="Всички отбори" />
          <p className="max-w-[560px] font-mono text-[12px] text-white/50 leading-[1.8] mt-4">
            Всеки проект тук е резултат от идея, код и финално представяне — построени на живо.
          </p>
        </div>

        <ul className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li
              key={`${p.teamName}-${p.projectName}`}
              className={cn(
                "list-none transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: inView ? `${Math.min(i, 12) * 40}ms` : "0ms" }}
            >
              <article className="group relative flex h-full flex-col bg-card p-5 md:p-6 hover:bg-acid/[0.03] transition-colors">
                {/* Top accent line — slides in on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 bg-acid transition-[width] duration-500 group-hover:w-full"
                />

                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase mb-1">
                      {p.teamName}
                    </div>
                    <h3 className="font-body text-lg font-semibold tracking-[-0.02em] group-hover:text-acid transition-colors">
                      {p.projectName}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/25 group-hover:text-acid shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>

                <p className="font-mono text-[12px] text-white/55 leading-[1.75] flex-1">
                  {p.description}
                </p>

                {p.tech && p.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/55 border border-white/10 px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {(p.repoUrl || p.demoUrl) && (
                  <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-white/60 hover:text-acid no-underline transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Код
                      </a>
                    )}
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-white/60 hover:text-acid no-underline transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Демо
                      </a>
                    )}
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
