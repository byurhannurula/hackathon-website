"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/section-header";
import { cn, JURY_MEMBERS, MENTORS, JUDGING_CRITERIA, type Person, type Criterion } from "@/lib";

function PersonCard({
  person,
  isHovered,
  isDimmed,
  onEnter,
  onLeave,
}: {
  person: Person;
  isHovered: boolean;
  isDimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className={cn(
        "group border border-white/7 bg-card transition-all duration-300 cursor-pointer",
        isDimmed ? "opacity-50" : "opacity-100",
        isHovered && "border-acid/30"
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="aspect-3/4 overflow-hidden relative">
        <Image
          src={person.image}
          alt={person.name}
          width={300}
          height={400}
          className="w-full h-full object-cover transition-[filter] duration-500"
          style={{
            filter: isHovered ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.7)",
          }}
        />
        {isHovered && (
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        )}
      </div>
      <div className="p-4">
        <div className="font-body font-bold text-[14px] text-white leading-tight">
          {person.name}
        </div>
        <div className="font-mono text-[10px] tracking-widest text-acid/80 mt-1.5 uppercase">
          {person.role}
        </div>
        <div className="font-mono text-[10px] text-white/40 mt-0.5">{person.org}</div>
      </div>
    </div>
  );
}

function PersonGrid({ people, label }: { people: Person[]; label: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase mb-6">
        {label}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {people.map((person: Person, i: number) => (
          <PersonCard
            key={i}
            person={person}
            isHovered={hoveredIdx === i}
            isDimmed={hoveredIdx !== null && hoveredIdx !== i}
            onEnter={() => setHoveredIdx(i)}
            onLeave={() => setHoveredIdx(null)}
          />
        ))}
      </div>
    </div>
  );
}

export function JurySection() {
  return (
    <section id="jury" className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="КОЙ ОЦЕНЯВА И НАСОЧВА" title="ЖУРИ И МЕНТОРИ" />

        <div className="mt-12 space-y-14">
          <PersonGrid people={JURY_MEMBERS} label="КОЙ ОЦЕНЯВА И НАСОЧВА" />
          <PersonGrid people={MENTORS} label="МЕНТОРИ" />
        </div>

        {/* Judging Criteria */}
        <div className="mt-16">
          <div className="font-mono text-[10px] tracking-[0.18em] text-acid/85 uppercase mb-6">
            КРИТЕРИИ ЗА ОЦЕНЯВАНЕ
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-px bg-white/5">
            {JUDGING_CRITERIA.map((c: Criterion, i: number) => (
              <div key={i} className="bg-bg p-5 border-t-2 border-t-acid/30">
                <div className="font-body font-bold text-[13px] text-white">{c.title}</div>
                <div className="font-mono text-[11px] text-white/45 mt-2 leading-[1.7]">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
