"use client";

import Image from "next/image";
import { User } from "lucide-react";

import type { Person, Criterion } from "@/lib/types";
import { JURY_MEMBERS, MENTORS, JUDGING_CRITERIA } from "@/constants";
import { SectionHeader } from "@/components/section-header";
import { LIIcon } from "@/components/ui";

function PersonCard({ person }: { person: Person }) {
  const hasImage = person.image.length > 0;
  const hasDetails = person.org.length > 0;

  return (
    <div className="flex items-center gap-3 border border-white/7 bg-card p-3 transition-all duration-200 hover:border-acid/30">
      <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
        {hasImage ? (
          <Image
            src={person.image}
            alt={person.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-5 h-5 text-white/20" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <div className="font-body font-bold text-[13px] text-white leading-tight truncate">
            {person.name}
          </div>
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-white/30 hover:text-acid transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <LIIcon />
            </a>
          )}
        </div>
        {hasDetails ? (
          <div className="font-mono text-[10px] text-white/40 mt-0.5 truncate">
            {person.role} · {person.org}
          </div>
        ) : (
          <div className="font-mono text-[10px] text-acid/50 mt-0.5">Ще бъде обявен скоро</div>
        )}
      </div>
    </div>
  );
}

function PersonGrid({ people, label }: { people: Person[]; label: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase mb-4">
        {label}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {people.map((person: Person, i: number) => (
          <PersonCard key={i} person={person} />
        ))}
      </div>
    </div>
  );
}

export function JurySectionCompact() {
  return (
    <section id="jury" className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="КОЙ ОЦЕНЯВА И НАСОЧВА" title="ЖУРИ И МЕНТОРИ" />

        <div className="mt-12 space-y-10">
          <PersonGrid people={JURY_MEMBERS} label="ЖУРИ" />
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
