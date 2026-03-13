"use client";

import Image from "next/image";
import { User } from "lucide-react";

import type { Person, Criterion } from "@/lib/types";
import { JURY_MEMBERS, MENTORS, JUDGING_CRITERIA } from "@/constants";
import { SectionHeader } from "@/components/section-header";
import { GlareCard } from "@/components/ui/glare-card";

function PersonGlareCard({ person }: { person: Person }) {
  const hasImage = person.image.length > 0;
  const hasDetails = person.org.length > 0;

  return (
    <GlareCard className="flex flex-col items-center justify-end relative p-0">
      {/* Avatar area */}
      {hasImage ? (
        <Image
          src={person.image}
          alt={person.name}
          width={300}
          height={400}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <User className="w-16 h-16 text-white/8" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      {/* Info at bottom */}
      <div className="relative z-10 p-5 pb-6 w-full text-left">
        <div className="font-body font-bold text-[15px] text-white leading-tight">
          {person.name}
        </div>
        {hasDetails ? (
          <>
            <div className="font-mono text-[10px] tracking-widest text-acid/90 mt-1.5 uppercase">
              {person.role}
            </div>
            <div className="font-mono text-[10px] text-white/45 mt-0.5">{person.org}</div>
          </>
        ) : (
          <div className="font-mono text-[10px] text-acid/50 mt-1.5">Ще бъде обявен скоро</div>
        )}
      </div>
    </GlareCard>
  );
}

function PersonGrid({ people, label }: { people: Person[]; label: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase mb-6">
        {label}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
        {people.map((person: Person, i: number) => (
          <PersonGlareCard key={i} person={person} />
        ))}
      </div>
    </div>
  );
}

export function JurySectionGlare() {
  return (
    <section id="jury" className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="КОЙ ОЦЕНЯВА И НАСОЧВА" title="ЖУРИ И МЕНТОРИ" />

        <div className="mt-12 space-y-14">
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
