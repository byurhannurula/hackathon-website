"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

import type { Person, InfoCriterion } from "@/lib/types";
import { MENTORS, JUDGING_CRITERIA } from "@/constants";
import { SectionHeader } from "@/components/section-header";
import { LIIcon } from "@/components/ui";

function PersonCard({ person, index, priority }: { person: Person; index: number; priority?: boolean }) {
  const hasImage = person.image.length > 0;
  const hasDetails = person.org.length > 0;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Wrapper = person.linkedin ? "a" : "div";
  const linkProps = person.linkedin
    ? { href: person.linkedin, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      ref={ref as React.Ref<HTMLAnchorElement> & React.Ref<HTMLDivElement>}
      className="group block border border-white/7 bg-card transition-all duration-300 hover:border-acid/30 no-underline"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, border-color 0.2s`,
      }}
    >
      <div className="aspect-square overflow-hidden relative bg-white/3 flex items-center justify-center">
        {hasImage ? (
          <Image
            src={person.image}
            alt={person.name}
            width={200}
            height={200}
            {...(priority && { priority: true, loading: "eager" as const })}
            className="w-full h-full object-cover grayscale brightness-75 transition-[filter] duration-500 ease-out group-hover:grayscale-0 group-hover:brightness-100"
          />
        ) : (
          <User className="w-10 h-10 text-white/10" />
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5">
          <div className="font-body font-bold text-[13px] text-white leading-tight truncate">
            {person.name}
          </div>
          {person.linkedin && (
            <span className="shrink-0 text-white/30 group-hover:text-acid transition-colors duration-200">
              <LIIcon />
            </span>
          )}
        </div>
        {hasDetails ? (
          <>
            <div className="font-mono text-[10px] tracking-widest text-acid/70 mt-1 uppercase truncate">
              {person.role}
            </div>
            <div className="font-mono text-[10px] text-white/35 mt-0.5 truncate">{person.org}</div>
          </>
        ) : (
          <div className="font-mono text-[10px] text-acid/50 mt-1">Ще бъде обявен скоро</div>
        )}
      </div>
    </Wrapper>
  );
}

function PersonGrid({ people, label }: { people: Person[]; label: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase mb-5">
        {label}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {people.map((person: Person, i: number) => (
          <PersonCard key={person.name} person={person} index={i} priority={i < 6} />
        ))}
      </div>
    </div>
  );
}

export function JurySectionMedium({ hideCriteria = false }: { hideCriteria?: boolean } = {}) {
  return (
    <section id="jury" className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="КОЙ НАСОЧВА" title="Ментори" />

        <div className="mt-12 space-y-12">
          <PersonGrid people={MENTORS} label="МЕНТОРИ" />
        </div>

        {/* Judging Criteria */}
        {!hideCriteria && (
          <div className="mt-16">
            <div className="font-mono text-[10px] tracking-[0.18em] text-acid/85 uppercase mb-6">
              КРИТЕРИИ ЗА ОЦЕНЯВАНЕ
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
              {JUDGING_CRITERIA.map((c: InfoCriterion, i: number) => (
                <div key={i} className="bg-bg p-5 border-t-2 border-t-acid/30">
                  <div className="font-display text-2xl text-acid/80 mb-1">{c.pct}</div>
                  <div className="font-body font-bold text-[13px] text-white">{c.title}</div>
                  <div className="font-mono text-[11px] text-white/45 mt-2 leading-[1.7]">
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
