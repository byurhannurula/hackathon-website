"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcaseWinner } from "@/lib";
import { SectionHeader } from "@/components/section-header";
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
// 4. Boarding pass / ticket stub — reuses the event ticket motif
// ───────────────────────────────────────────────────────────────────────────

function gateCode(place: number, teamName: string): string {
  const letter = String.fromCharCode(64 + place); // A, B, C, ...
  const num = (teamName.length * 7 + place * 13) % 90;
  return `${letter}${num.toString().padStart(2, "0")}`;
}

export function WinnersSectionTicket({ winners }: Props) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);
  if (ordered.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26" title="Победители" />
        </div>

        <ol className="list-none p-0 m-0 flex flex-col gap-5">
          {ordered.map((w, i) => (
            <li
              key={`${w.place}-${w.teamName}`}
              className={cn(
                "transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: inView ? `${i * 110}ms` : "0ms" }}
            >
              <article
                className={cn(
                  "group relative flex bg-card border transition-colors overflow-hidden",
                  w.place === 1
                    ? "border-acid/50 hover:border-acid"
                    : "border-border hover:border-white/30"
                )}
              >
                {/* Image strip — desktop only */}
                {w.imageUrl && (
                  <div className="hidden md:block relative w-[160px] lg:w-[200px] shrink-0 border-r border-white/10">
                    <Image
                      src={w.imageUrl}
                      alt={w.projectName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="200px"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"
                    />
                  </div>
                )}

                {/* Main content */}
                <div className="flex-1 p-5 md:p-6 flex flex-col gap-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      className={cn(
                        "font-mono text-[10px] font-bold tracking-[0.18em] uppercase",
                        w.place === 1 ? "text-acid" : "text-white/55"
                      )}
                    >
                      {PLACE_LABEL[w.place]} · BOARDING
                    </span>
                    <span className="font-mono text-[10px] text-white/40 tracking-[0.14em]">
                      GATE {gateCode(w.place, w.teamName)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3
                      className={cn(
                        "font-display text-2xl md:text-3xl tracking-[-0.02em] leading-none",
                        w.place === 1 ? "text-acid" : "text-white"
                      )}
                    >
                      {w.projectName}
                    </h3>
                    <span className="font-mono text-[11px] text-white/45 tracking-[0.14em]">
                      ✈ {w.teamName}
                    </span>
                  </div>

                  <p className="font-mono text-[12px] text-white/60 leading-[1.7] mt-1 line-clamp-2">
                    {w.pitch}
                  </p>

                  {(w.repoUrl || w.demoUrl) && (
                    <div className="flex gap-4 mt-1 text-white/55">
                      {w.repoUrl && (
                        <a
                          href={w.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Repo"
                          className="hover:text-acid transition-colors inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase"
                        >
                          <Github className="w-3.5 h-3.5" /> Код
                        </a>
                      )}
                      {w.demoUrl && (
                        <a
                          href={w.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Demo"
                          className="hover:text-acid transition-colors inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Демо
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Perforation */}
                <div
                  aria-hidden
                  className="relative shrink-0 w-px self-stretch border-l border-dashed border-white/20 mx-1"
                >
                  <span className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-card border border-border" />
                  <span className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-card border border-border" />
                </div>

                {/* Stub */}
                <div
                  className={cn(
                    "shrink-0 flex flex-col items-center justify-center px-5 md:px-7 py-5 min-w-[110px] md:min-w-[140px]",
                    w.place === 1 ? "bg-acid/[0.06]" : "bg-white/[0.02]"
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-[56px] md:text-[68px] leading-none tracking-[-0.04em]",
                      w.place === 1 ? "text-acid" : "text-white/85"
                    )}
                  >
                    0{w.place}
                  </span>
                  {w.prize && (
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-[0.14em] mt-2 text-center uppercase",
                        w.place === 1 ? "text-acid/85" : "text-white/55"
                      )}
                    >
                      {w.prize}
                    </span>
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

// ───────────────────────────────────────────────────────────────────────────
// 5. Commit log — `git log --winners`
// ───────────────────────────────────────────────────────────────────────────

function fakeHash(seed: string): string {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h * 31) ^ seed.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
}

const COMMIT_DATES = [
  "Sat Apr 18 23:59:59 2026 +0300",
  "Sat Apr 18 23:42:11 2026 +0300",
  "Sat Apr 18 23:18:02 2026 +0300",
  "Sat Apr 18 22:55:37 2026 +0300",
  "Sat Apr 18 22:31:14 2026 +0300",
];

export function WinnersSectionCommitLog({ winners }: Props) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);
  if (ordered.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[900px] mx-auto" ref={ref}>
        <div className="mb-10">
          <SectionHeader label="ХАКАТОН '26" title="git log --winners" />
        </div>

        <div className="bg-card border border-border font-mono text-[12.5px] leading-[1.85]">
          <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 border-b border-border bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-acid/60" />
            <span className="ml-3 text-[10px] tracking-[0.18em] uppercase text-white/45">
              ~/hackathon-2026 · git log --winners
            </span>
          </div>

          <div className="p-5 md:p-7 overflow-x-auto">
            {ordered.map((w, i) => {
              const email = `${w.teamName.toLowerCase().replace(/[^a-z]+/g, ".")}@hackathon.bg`;
              const tagColor = w.place === 1 ? "text-acid" : "text-blue-300";
              return (
                <div
                  key={`${w.place}-${w.teamName}`}
                  className={cn(
                    "transition-all duration-500",
                    i > 0 && "mt-7",
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  )}
                  style={{ transitionDelay: inView ? `${i * 130}ms` : "0ms" }}
                >
                  <div className="text-amber-200 whitespace-nowrap">
                    <span>commit {fakeHash(w.teamName + w.place)}</span>
                    <span className="text-white/45">
                      {" "}
                      (
                      {i === 0 && (
                        <>
                          <span className="text-cyan-300">HEAD → winners</span>
                          <span>, </span>
                        </>
                      )}
                      <span className={tagColor}>tag: place-{w.place}</span>)
                    </span>
                  </div>
                  <div className="text-white/65">
                    Author: {w.teamName} &lt;{email}&gt;
                  </div>
                  <div className="text-white/65">
                    Date:&nbsp;&nbsp; {COMMIT_DATES[(w.place - 1) % COMMIT_DATES.length]}
                  </div>

                  <div className="mt-3 ml-4 md:ml-6">
                    <div
                      className={cn(
                        "font-bold mb-2",
                        w.place === 1 ? "text-acid" : "text-white/90"
                      )}
                    >
                      {w.projectName}
                    </div>
                    <div className="text-white/60 mb-3 max-w-[640px]">{w.pitch}</div>
                    {w.prize && (
                      <div className="text-white/55">
                        Prize:&nbsp;&nbsp;<span className="text-acid">{w.prize}</span>
                      </div>
                    )}
                    {w.members.length > 0 && (
                      <div className="text-white/55">Members: {w.members.join(", ")}</div>
                    )}
                    {(w.repoUrl || w.demoUrl) && (
                      <div className="text-white/55 mt-2 flex gap-4">
                        {w.repoUrl && (
                          <a
                            href={w.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-acid transition-colors no-underline"
                          >
                            [repo]
                          </a>
                        )}
                        {w.demoUrl && (
                          <a
                            href={w.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-acid transition-colors no-underline"
                          >
                            [demo]
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="mt-7 flex items-center gap-2 text-white/35 text-[11px]">
              <span>$</span>
              <span className="text-acid animate-pulse">▋</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 7. Boarding pass — full airline-style ticket with route/seat/gate
// ───────────────────────────────────────────────────────────────────────────

function flightNumber(place: number, teamName: string): string {
  const num = ((teamName.length * 17 + place * 41) % 900) + 100;
  return `RH${num}`;
}

function seatCode(place: number, teamName: string): string {
  const row = ((teamName.length * 3 + place) % 30) + 1;
  const letters = "ABCDEF";
  const letter = letters[(teamName.charCodeAt(0) + place) % letters.length];
  return `${row}${letter}`;
}

const DESTINATION_CODES = ["WIN", "PRZ", "TOP", "FNL", "STG"];

export function WinnersSectionBoardingPass({ winners }: Props) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);
  if (ordered.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26 · BOARDING" title="Победители" />
        </div>

        <ol className="list-none p-0 m-0 flex flex-col gap-6">
          {ordered.map((w, i) => {
            const flight = flightNumber(w.place, w.teamName);
            const seat = seatCode(w.place, w.teamName);
            const dest = DESTINATION_CODES[(w.place - 1) % DESTINATION_CODES.length];
            const isFirst = w.place === 1;
            return (
              <li
                key={`${w.place}-${w.teamName}`}
                className={cn(
                  "transition-all duration-700",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: inView ? `${i * 130}ms` : "0ms" }}
              >
                <article
                  className={cn(
                    "group relative flex flex-col md:flex-row bg-card border transition-colors overflow-hidden",
                    isFirst
                      ? "border-acid/50 hover:border-acid"
                      : "border-border hover:border-white/30"
                  )}
                >
                  {/* Main pass */}
                  <div className="flex-1 min-w-0">
                    {/* Top bar — airline header */}
                    <div
                      className={cn(
                        "flex items-center justify-between px-5 md:px-7 py-3 border-b",
                        isFirst ? "bg-acid/10 border-acid/30" : "bg-white/[0.03] border-white/10"
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-[18px] md:text-[20px] tracking-[0.18em] uppercase leading-none",
                          isFirst ? "text-acid" : "text-white/85"
                        )}
                      >
                        RUSE AIR
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/50">
                        BOARDING PASS · {PLACE_LABEL[w.place]}
                      </span>
                    </div>

                    {/* Route */}
                    <div className="px-5 md:px-7 pt-5 pb-3 flex items-center gap-4 md:gap-6">
                      <div className="flex flex-col items-start">
                        <span className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
                          From
                        </span>
                        <span
                          className={cn(
                            "font-display text-[40px] md:text-[52px] leading-none tracking-[-0.04em]",
                            isFirst ? "text-acid" : "text-white/90"
                          )}
                        >
                          RSE
                        </span>
                      </div>

                      <div className="flex-1 flex items-center gap-2 text-white/35 px-1">
                        <span
                          className={cn("h-px flex-1", isFirst ? "bg-acid/40" : "bg-white/15")}
                        />
                        <span
                          className={cn(
                            "text-[18px] -translate-y-[1px]",
                            isFirst ? "text-acid/80" : "text-white/40"
                          )}
                        >
                          ✈
                        </span>
                        <span
                          className={cn("h-px flex-1", isFirst ? "bg-acid/40" : "bg-white/15")}
                        />
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
                          To
                        </span>
                        <span
                          className={cn(
                            "font-display text-[40px] md:text-[52px] leading-none tracking-[-0.04em]",
                            isFirst ? "text-acid" : "text-white/90"
                          )}
                        >
                          {dest}
                        </span>
                      </div>
                    </div>

                    {/* Project / team line */}
                    <div className="px-5 md:px-7 pb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-body font-semibold text-[18px] md:text-[20px] tracking-[-0.01em] text-white">
                        {w.projectName}
                      </h3>
                      <span className="font-mono text-[11px] text-white/45 tracking-[0.14em]">
                        ✦ {w.teamName}
                      </span>
                    </div>

                    {/* Detail grid — passenger / flight / seat / gate / boarding */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-3 px-5 md:px-7 pb-5 border-t border-dashed border-white/10 pt-4">
                      <Detail label="Passenger" value={w.teamName} />
                      <Detail label="Flight" value={flight} />
                      <Detail label="Seat" value={seat} />
                      <Detail label="Gate" value={gateCode(w.place, w.teamName)} />
                      <Detail
                        label="Class"
                        value={isFirst ? "WINNER" : `PLACE 0${w.place}`}
                        accent={isFirst}
                      />
                    </div>
                  </div>

                  {/* Perforation */}
                  <div
                    aria-hidden
                    className="relative shrink-0 hidden md:block w-px self-stretch border-l border-dashed border-white/20 mx-1"
                  >
                    <span className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-bg border border-border" />
                    <span className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-bg border border-border" />
                  </div>

                  {/* Stub with barcode */}
                  <div
                    className={cn(
                      "shrink-0 flex md:flex-col items-center justify-between md:justify-center gap-3 md:gap-4 px-5 md:px-6 py-5 md:min-w-[160px] border-t md:border-t-0 border-dashed border-white/15",
                      isFirst ? "md:bg-acid/[0.05]" : "md:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex flex-col md:items-center">
                      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/45">
                        Seat
                      </span>
                      <span
                        className={cn(
                          "font-display text-[34px] md:text-[42px] leading-none tracking-[-0.02em]",
                          isFirst ? "text-acid" : "text-white/85"
                        )}
                      >
                        {seat}
                      </span>
                    </div>
                    {/* Faux barcode */}
                    <div
                      aria-hidden
                      className="flex items-end gap-[2px] h-10 md:h-12"
                      style={{
                        // deterministic per-team bar pattern
                        ["--seed" as string]: w.teamName.length,
                      }}
                    >
                      {Array.from({ length: 18 }).map((_, b) => {
                        const wide = (w.teamName.charCodeAt(b % w.teamName.length) + b) % 3 === 0;
                        return (
                          <span
                            key={b}
                            className={cn("block h-full", isFirst ? "bg-acid/85" : "bg-white/75")}
                            style={{ width: wide ? 3 : 1.5 }}
                          />
                        );
                      })}
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/40">
                      {flight}
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Detail({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col min-w-0">
      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">{label}</span>
      <span
        className={cn(
          "font-mono text-[13px] tracking-[0.06em] truncate",
          accent ? "text-acid" : "text-white/85"
        )}
      >
        {value}
      </span>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 8. Cassette tape — mixtape side A
// ───────────────────────────────────────────────────────────────────────────

export function WinnersSectionCassette({ winners }: Props) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);
  if (ordered.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26 · MIXTAPE" title="Победители" />
        </div>

        <ol className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-6">
          {ordered.map((w, i) => {
            const isFirst = w.place === 1;
            const sideLabel = String.fromCharCode(64 + w.place); // A, B, C…
            return (
              <li
                key={`${w.place}-${w.teamName}`}
                className={cn(
                  "transition-all duration-700",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: inView ? `${i * 120}ms` : "0ms" }}
              >
                <article
                  className={cn(
                    "group relative flex flex-col bg-card border rounded-[6px] transition-all overflow-hidden",
                    isFirst
                      ? "border-acid/50 hover:border-acid"
                      : "border-border hover:border-white/30"
                  )}
                >
                  {/* Outer shell top — screw dots */}
                  <div className="flex items-center justify-between px-4 pt-3 text-white/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span className="font-mono text-[9px] tracking-[0.22em] uppercase">
                      COMPACT CASSETTE · {PLACE_LABEL[w.place]}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  </div>

                  {/* Label window */}
                  <div className="mx-4 mt-3 mb-4 border border-white/15 bg-white/[0.04] p-4 relative">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45">
                          {w.teamName}
                        </div>
                        <h3
                          className={cn(
                            "font-display text-[26px] md:text-[30px] leading-[1.05] tracking-[-0.02em] truncate",
                            isFirst ? "text-acid" : "text-white/90"
                          )}
                        >
                          {w.projectName}
                        </h3>
                      </div>
                      <div
                        className={cn(
                          "shrink-0 px-2 py-1 border font-mono text-[10px] tracking-[0.18em] uppercase",
                          isFirst
                            ? "border-acid/40 text-acid bg-acid/5"
                            : "border-white/20 text-white/65"
                        )}
                      >
                        Side {sideLabel}
                      </div>
                    </div>
                    <p className="font-mono text-[11px] text-white/55 leading-[1.7] line-clamp-2">
                      {w.pitch}
                    </p>
                    {w.prize && (
                      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-acid mt-2">
                        ★ {w.prize}
                      </div>
                    )}
                  </div>

                  {/* Reel deck */}
                  <div className="relative mx-4 mb-4 h-[110px] bg-black/60 border border-white/10 rounded-[3px] flex items-center justify-around overflow-hidden">
                    {/* tape window strip */}
                    <div
                      aria-hidden
                      className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-amber-200/30"
                    />
                    <Reel isFirst={isFirst} />
                    <Reel isFirst={isFirst} />
                  </div>

                  {/* Bottom bar — counters / links */}
                  <div className="flex items-center justify-between px-4 pb-3 text-white/45">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
                      0{w.place} / {ordered.length}
                    </span>
                    <div className="flex gap-3">
                      {w.repoUrl && (
                        <a
                          href={w.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-acid transition-colors inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.14em] uppercase"
                        >
                          <Github className="w-3.5 h-3.5" /> Код
                        </a>
                      )}
                      {w.demoUrl && (
                        <a
                          href={w.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-acid transition-colors inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.14em] uppercase"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Демо
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Local keyframes — used by both Cassette reels and Vinyl disc */}
      <style jsx>{`
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

function Reel({ isFirst }: { isFirst: boolean }) {
  return (
    <div
      className={cn(
        "relative w-[72px] h-[72px] rounded-full border-2 flex items-center justify-center",
        isFirst ? "border-white/20" : "border-white/15"
      )}
    >
      <div
        className={cn(
          "absolute inset-3 rounded-full border border-white/10 transition-transform duration-1000",
          "group-hover:[animation:spin-slow_3s_linear_infinite]"
        )}
        style={{ transformOrigin: "center" }}
      >
        {/* Spokes */}
        {[0, 60, 120].map((deg) => (
          <span
            key={deg}
            aria-hidden
            className={cn(
              "absolute top-1/2 left-1/2 w-[2px] h-full -translate-x-1/2 -translate-y-1/2",
              isFirst ? "bg-white/20" : "bg-white/15"
            )}
            style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
          />
        ))}
      </div>
      <div className={cn("relative w-3 h-3 rounded-full", isFirst ? "bg-acid" : "bg-white/40")} />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 9. Vinyl record — sleeve + spinning disc
// ───────────────────────────────────────────────────────────────────────────

export function WinnersSectionVinyl({ winners }: Props) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);
  if (ordered.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26 · LP" title="Победители" />
        </div>

        <ol className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-7">
          {ordered.map((w, i) => {
            const isFirst = w.place === 1;
            return (
              <li
                key={`${w.place}-${w.teamName}`}
                className={cn(
                  "transition-all duration-700",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: inView ? `${i * 120}ms` : "0ms" }}
              >
                <article
                  className={cn(
                    "group relative flex bg-card border transition-colors overflow-visible",
                    isFirst
                      ? "border-acid/50 hover:border-acid"
                      : "border-border hover:border-white/30"
                  )}
                >
                  {/* Disc — peeks out of sleeve on hover */}
                  <div className="relative w-[160px] md:w-[200px] shrink-0 self-center -ml-10 md:-ml-16 z-0 transition-transform duration-700 ease-out group-hover:translate-x-12 md:group-hover:translate-x-20">
                    <Disc isFirst={isFirst} place={w.place} />
                  </div>

                  {/* Sleeve content */}
                  <div className="relative flex-1 min-w-0 p-5 md:p-7 z-10 bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold tracking-[0.18em] uppercase",
                          isFirst ? "text-acid" : "text-white/55"
                        )}
                      >
                        {PLACE_LABEL[w.place]} · 33⅓ RPM
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/35">
                        Side A
                      </span>
                    </div>

                    <div className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase mb-1">
                      {w.teamName}
                    </div>
                    <h3
                      className={cn(
                        "font-display text-[28px] md:text-[34px] leading-[1.02] tracking-[-0.02em] mb-3",
                        isFirst ? "text-acid" : "text-white/95"
                      )}
                    >
                      {w.projectName}
                    </h3>
                    <p className="font-mono text-[12px] text-white/60 leading-[1.7] line-clamp-3 mb-4">
                      {w.pitch}
                    </p>

                    {w.prize && (
                      <div
                        className={cn(
                          "inline-flex w-fit font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-1 border mb-3",
                          isFirst
                            ? "border-acid/30 bg-acid/5 text-acid"
                            : "border-white/15 text-white/65"
                        )}
                      >
                        ★ {w.prize}
                      </div>
                    )}

                    {(w.repoUrl || w.demoUrl) && (
                      <div className="flex gap-3 pt-3 border-t border-border text-white/55">
                        {w.repoUrl && (
                          <a
                            href={w.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-acid transition-colors inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.14em] uppercase"
                          >
                            <Github className="w-3.5 h-3.5" /> Код
                          </a>
                        )}
                        {w.demoUrl && (
                          <a
                            href={w.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-acid transition-colors inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.14em] uppercase"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Демо
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      <style jsx>{`
        @keyframes vinyl-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

function Disc({ isFirst, place }: { isFirst: boolean; place: number }) {
  return (
    <div className="relative aspect-square w-full">
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-black border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]",
          "transition-transform duration-700 ease-out",
          "group-hover:[animation:vinyl-spin_5s_linear_infinite]"
        )}
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at center, rgba(255,255,255,0.06) 0 1px, transparent 1px 4px)",
        }}
      >
        {/* Center label */}
        <div
          className={cn(
            "absolute inset-[33%] rounded-full flex items-center justify-center border",
            isFirst ? "bg-acid border-acid/60 text-bg" : "bg-white/85 border-white/40 text-bg"
          )}
        >
          <span className="font-display text-[22px] leading-none tracking-[-0.02em]">0{place}</span>
        </div>
        {/* Spindle hole */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg" />
      </div>
    </div>
  );
}

const FLIP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·€/+";

function FlipChar({ target, delay, active }: { target: string; delay: number; active: boolean }) {
  const [ch, setCh] = useState(" ");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!active) {
      setCh(" ");
      return;
    }
    if (target === " ") {
      setCh(" ");
      return;
    }
    let frame = 0;
    const totalFrames = 8 + Math.floor(Math.random() * 8);
    const tick = () => {
      frame++;
      if (frame >= totalFrames) {
        setCh(target);
        return;
      }
      setCh(FLIP_CHARS[Math.floor(Math.random() * FLIP_CHARS.length)]);
      timerRef.current = setTimeout(tick, 55);
    };
    timerRef.current = setTimeout(tick, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [target, delay, active]);

  return <span className="inline-block">{ch}</span>;
}

function FlipText({
  text,
  baseDelay,
  active,
  className,
}: {
  text: string;
  baseDelay: number;
  active: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((c, i) => (
        <FlipChar key={`${i}-${c}`} target={c} delay={baseDelay + i * 35} active={active} />
      ))}
    </span>
  );
}

export function WinnersSectionFlipBoard({ winners }: Props) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const ordered = useMemo(() => [...winners].sort((a, b) => a.place - b.place), [winners]);
  if (ordered.length === 0) return null;

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="ХАКАТОН '26" title="Победители" />
        </div>

        <div className="border border-amber-300/30 bg-black p-3 md:p-5 font-mono">
          {/* Column header */}
          <div className="grid grid-cols-[50px_1fr_110px] md:grid-cols-[60px_1.4fr_1.1fr_120px] gap-3 md:gap-5 px-3 md:px-4 py-2 border-b border-amber-300/25 text-[10px] tracking-[0.22em] uppercase text-amber-300/60">
            <div>Rank</div>
            <div>Project</div>
            <div className="hidden md:block">Team</div>
            <div className="text-right">Status</div>
          </div>

          <ol className="list-none p-0 m-0">
            {ordered.map((w, i) => {
              const project = w.projectName.toUpperCase().slice(0, 18);
              const team = w.teamName.toUpperCase().slice(0, 16);
              const status = (w.prize ?? "BOARDING").toUpperCase().slice(0, 10);
              return (
                <li
                  key={`${w.place}-${w.teamName}`}
                  className={cn(
                    "grid grid-cols-[50px_1fr_110px] md:grid-cols-[60px_1.4fr_1.1fr_120px] gap-3 md:gap-5 px-3 md:px-4 py-3 border-b border-amber-300/15 last:border-b-0 items-center text-amber-300",
                    w.place === 1 && "bg-amber-300/[0.04]"
                  )}
                >
                  <FlipText
                    text={`0${w.place}`}
                    baseDelay={i * 220}
                    active={inView}
                    className="text-[20px] md:text-[22px] tracking-[0.08em]"
                  />
                  <FlipText
                    text={project}
                    baseDelay={i * 220 + 200}
                    active={inView}
                    className="text-[14px] md:text-[16px] tracking-[0.1em]"
                  />
                  <FlipText
                    text={team}
                    baseDelay={i * 220 + 450}
                    active={inView}
                    className="hidden md:inline text-[13px] tracking-[0.08em] text-amber-300/75"
                  />
                  <FlipText
                    text={status}
                    baseDelay={i * 220 + 700}
                    active={inView}
                    className="text-[12px] md:text-[13px] text-right tracking-[0.1em]"
                  />
                </li>
              );
            })}
          </ol>

          <div className="px-3 md:px-4 py-2 mt-1 text-[10px] tracking-[0.2em] uppercase text-amber-300/45">
            <span className="text-amber-300 animate-pulse">●</span> LIVE · {ordered.length}{" "}
            CONFIRMED
          </div>
        </div>
      </div>
    </section>
  );
}
