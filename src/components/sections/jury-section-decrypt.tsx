"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { User } from "lucide-react";

import type { Person, Criterion } from "@/lib/types";
import { JURY_MEMBERS, MENTORS, JUDGING_CRITERIA } from "@/constants";
import { SectionHeader } from "@/components/section-header";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>{}[]";

function scramble(text: string): string {
  return text
    .split("")
    .map((ch) => (ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join("");
}

// Deterministic scramble for SSR-safe initial render (same output on server & client)
function scrambleDeterministic(text: string): string {
  return text
    .split("")
    .map((ch, i) => (ch === " " ? " " : CHARS[(i * 7 + ch.charCodeAt(0) * 13) % CHARS.length]))
    .join("");
}

function useDecryptText(target: string, active: boolean, speed = 40) {
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;

    let pos = 0;
    // First tick fires immediately (delay 0), subsequent at `speed` ms
    const tick = () => {
      const text = target.slice(0, pos) + scramble(target.slice(pos));
      setDisplay(text);
      if (pos >= target.length) {
        clearInterval(interval);
        return;
      }
      pos++;
    };
    const interval = setInterval(tick, speed);
    // fire first tick from within the interval callback context
    setTimeout(tick, 0);

    return () => {
      clearInterval(interval);
      setDisplay(null);
    };
  }, [active, target, speed]);

  return display ?? scrambleDeterministic(target);
}

function DecryptPersonCard({
  person,
  index,
  revealed,
}: {
  person: Person;
  index: number;
  revealed: boolean;
}) {
  const hasImage = person.image.length > 0;
  const hasDetails = person.org.length > 0;

  const [active, setActive] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  // Stagger activation
  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => setActive(true), index * 150);
    return () => clearTimeout(timer);
  }, [revealed, index]);

  // Show image after text decrypts
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(
      () => setImageVisible(true),
      hasDetails ? person.name.length * 40 + 200 : 600
    );
    return () => clearTimeout(timer);
  }, [active, person.name.length, hasDetails]);

  const nameText = useDecryptText(person.name, active, 40);
  const roleText = useDecryptText(person.role, active, 35);
  const orgText = useDecryptText(person.org, active, 30);
  const tbaText = useDecryptText("Ще бъде обявен скоро", active, 30);

  return (
    <div className="group border border-white/7 bg-card overflow-hidden transition-all duration-300 hover:border-acid/30">
      {/* Image area */}
      <div className="aspect-square overflow-hidden relative bg-white/3 flex items-center justify-center">
        {/* Terminal scanline overlay */}
        {active && !imageVisible && (
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            <div
              className="absolute inset-x-0 h-px bg-acid/40"
              style={{
                animation: "scanDown 1.2s linear infinite",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[9px] text-acid/60 tracking-[0.2em] uppercase animate-pulse">
                {hasDetails ? "IDENTITY INCOMING…" : "STANDBY…"}
              </span>
            </div>
          </div>
        )}

        {hasImage ? (
          <Image
            src={person.image}
            alt={person.name}
            width={200}
            height={200}
            className="w-full h-full object-cover transition-all duration-700"
            style={{
              filter: imageVisible
                ? "grayscale(0.75) brightness(0.75)"
                : "grayscale(1) brightness(0.1) blur(8px)",
              opacity: imageVisible ? 1 : 0,
              transform: imageVisible ? "scale(1)" : "scale(1.1)",
            }}
          />
        ) : (
          <User
            className="w-10 h-10 transition-opacity duration-500"
            style={{
              color: imageVisible ? "rgba(255,255,255,0.1)" : "rgba(200,255,0,0.15)",
              opacity: active ? 1 : 0,
            }}
          />
        )}

        {/* Hover: show image without filters */}
        <style jsx>{`
          .group:hover img {
            filter: grayscale(0) brightness(1) !important;
          }
        `}</style>
      </div>

      {/* Text area */}
      <div className="p-3">
        <div
          className="font-mono font-bold text-[13px] leading-tight truncate transition-colors duration-500"
          style={{ color: active ? "#fff" : "rgba(200,255,0,0.4)" }}
          suppressHydrationWarning
        >
          {nameText}
        </div>
        {hasDetails ? (
          <>
            <div
              className="font-mono text-[10px] tracking-widest mt-1 uppercase truncate transition-colors duration-500"
              style={{ color: active ? "rgba(200,255,0,0.7)" : "rgba(200,255,0,0.2)" }}
              suppressHydrationWarning
            >
              {roleText}
            </div>
            <div
              className="font-mono text-[10px] mt-0.5 truncate transition-colors duration-500"
              style={{ color: active ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)" }}
              suppressHydrationWarning
            >
              {orgText}
            </div>
          </>
        ) : (
          <div
            className="font-mono text-[10px] mt-1 transition-colors duration-500"
            style={{ color: active ? "rgba(200,255,0,0.5)" : "rgba(200,255,0,0.15)" }}
            suppressHydrationWarning
          >
            {tbaText}
          </div>
        )}
      </div>
    </div>
  );
}

function DecryptPersonGrid({ people, label }: { people: Person[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0]?.isIntersecting) {
      setRevealed(true);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(handleIntersect, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [handleIntersect]);

  return (
    <div ref={ref}>
      <div className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase mb-5 flex items-center gap-3">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full transition-colors duration-500"
          style={{ backgroundColor: revealed ? "#c8ff00" : "rgba(255,255,255,0.15)" }}
        />
        {label}
        {!revealed && <span className="text-acid/30 animate-pulse ml-1">▌</span>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {people.map((person: Person, i: number) => (
          <DecryptPersonCard key={i} person={person} index={i} revealed={revealed} />
        ))}
      </div>
    </div>
  );
}

export function JurySectionDecrypt() {
  return (
    <section id="jury" className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="КОЙ ОЦЕНЯВА И НАСОЧВА" title="ЖУРИ И МЕНТОРИ" />

        <div className="mt-12 space-y-12">
          <DecryptPersonGrid people={JURY_MEMBERS} label="ЖУРИ" />
          <DecryptPersonGrid people={MENTORS} label="МЕНТОРИ" />
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

      {/* Scanline animation keyframes */}
      <style jsx>{`
        @keyframes scanDown {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </section>
  );
}
