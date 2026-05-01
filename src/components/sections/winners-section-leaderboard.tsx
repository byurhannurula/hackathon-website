"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseWinner, ShowcaseHonorableMention } from "@/lib";
import { SectionHeader } from "@/components/section-header";
import { useInView } from "@/hooks";

type LeaderboardProps =
  | {
      kind?: "winners";
      winners: ShowcaseWinner[];
      label?: string;
      title?: string;
    }
  | {
      kind: "mentions";
      mentions: ShowcaseHonorableMention[];
      label?: string;
      title?: string;
    };

export function WinnersSectionLeaderboard(props: LeaderboardProps) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const isMentions = props.kind === "mentions";

  const rows = useMemo(() => {
    if (isMentions) {
      return props.mentions.map((m) => ({
        key: m.category + m.teamName,
        rankLabel: "▸",
        rankAccent: false,
        teamName: m.teamName,
        projectName: m.projectName,
        pitch: m.pitch,
        sideLabel: m.sponsor ? `${m.category} · ${m.sponsor}` : m.category,
        imageUrl: m.imageUrl,
        repoUrl: m.repoUrl,
        demoUrl: m.demoUrl,
      }));
    }
    return [...props.winners]
      .sort((a, b) => a.place - b.place)
      .map((w) => ({
        key: `${w.place}-${w.teamName}`,
        rankLabel: `0${w.place}`,
        rankAccent: w.place === 1,
        teamName: w.teamName,
        projectName: w.projectName,
        pitch: w.pitch,
        sideLabel: w.prize ?? "—",
        imageUrl: w.imageUrl,
        repoUrl: w.repoUrl,
        demoUrl: w.demoUrl,
      }));
  }, [isMentions, props]);

  if (rows.length === 0) return null;

  const label = props.label ?? "ХАКАТОН '26";
  const title = props.title ?? (isMentions ? "Почетни отличия" : "Победители");
  const filename = isMentions ? "mentions.log" : "winners.log";
  const sideHeading = isMentions ? "Category" : "Prize";
  const recordWord = isMentions ? "mention(s)" : "record(s)";

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label={label} title={title} />
        </div>

        <div className="border border-border bg-card font-mono">
          {/* Terminal-style header bar */}
          <div className="flex items-center gap-2 px-4 md:px-6 py-2.5 border-b border-border bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-acid/60" />
            <span className="ml-3 text-[10px] tracking-[0.18em] uppercase text-white/45">
              {filename}
            </span>
          </div>

          {/* Column header */}
          <div className="grid grid-cols-[50px_1fr_70px] md:grid-cols-[60px_1.2fr_1.6fr_140px_90px] gap-3 md:gap-5 px-4 md:px-6 py-3 border-b border-border text-[10px] tracking-[0.18em] uppercase text-white/40">
            <div>{isMentions ? "" : "Rank"}</div>
            <div>Team</div>
            <div className="hidden md:block">Project</div>
            <div className="hidden md:block">{sideHeading}</div>
            <div className="text-right">Links</div>
          </div>

          {/* Rows */}
          <ol className="list-none p-0 m-0">
            {rows.map((r, i) => (
              <li
                key={r.key}
                className={cn(
                  "group grid grid-cols-[50px_1fr_70px] md:grid-cols-[60px_1.2fr_1.6fr_140px_90px] gap-3 md:gap-5 px-4 md:px-6 py-4 border-b border-border last:border-b-0 transition-all duration-500 hover:bg-acid/[0.05]",
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                )}
                style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
              >
                <div
                  className={cn(
                    "font-display tracking-[-0.02em] leading-none flex items-center gap-1.5",
                    isMentions ? "text-[20px] text-white/55" : "text-[26px]",
                    !isMentions && r.rankAccent
                      ? "text-acid"
                      : !isMentions && "text-white/70 group-hover:text-white"
                  )}
                >
                  {!isMentions && r.rankAccent && (
                    <span aria-hidden className="text-acid animate-pulse">
                      ▋
                    </span>
                  )}
                  {r.rankLabel}
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  {r.imageUrl && (
                    <div className="relative w-10 h-10 shrink-0 overflow-hidden border border-white/10">
                      <Image
                        src={r.imageUrl}
                        alt={r.teamName}
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
                        !isMentions && r.rankAccent ? "text-acid" : "text-white/85"
                      )}
                    >
                      {r.teamName}
                    </div>
                    <div className="text-[10px] text-white/40 truncate md:hidden">
                      {r.projectName}
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex flex-col justify-center min-w-0">
                  <div className="text-white/85 text-[13px] font-semibold truncate">
                    {r.projectName}
                  </div>
                  <div className="text-white/45 text-[11px] truncate">{r.pitch}</div>
                </div>

                <div
                  className={cn(
                    "hidden md:flex items-center text-[11px] tracking-[0.14em]",
                    isMentions ? "text-white/65" : "text-acid"
                  )}
                >
                  {r.sideLabel}
                </div>

                <div className="flex items-center justify-end gap-3 text-white/55">
                  {r.repoUrl && (
                    <a
                      href={r.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${r.teamName} repo`}
                      className="hover:text-acid transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {r.demoUrl && (
                    <a
                      href={r.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${r.teamName} demo`}
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
            <span>
              {rows.length} {recordWord} · end of file
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
