"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLiveCount } from "@/hooks";
import { siteConfig } from "@/constants";
import { DecryptText, CountUp } from "@/components/ui";

const DottedSurface = dynamic(
  () => import("@/components/ui/dotted-surface").then((m) => m.DottedSurface),
  { ssr: false }
);

export function HeroSection() {
  const liveCount = useLiveCount();

  const stats: [string, string][] = [
    ...(liveCount !== null && liveCount > 0
      ? [[`${liveCount}+`, "ЗАПИСАНИ"] as [string, string]]
      : []),
    ["48Ч", "От 08:00 до 23:00"],
    [siteConfig.event.prizesPool, "В НАГРАДИ"],
    ["БЕЗПЛАТНО", "Участие"],
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-[120px] pb-20 md:px-12">
      <DottedSurface className="absolute inset-0 z-0" />

      {/* Subtle dot grid overlay underneath shader */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(var(--acid-rgb),0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette — pulls focus to center */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(5,5,5,0.7) 65%, rgba(5,5,5,0.97) 100%)",
        }}
      />

      {/* CONTENT */}
      <div
        className="relative z-2 max-w-[1000px] p-5"
        style={{ background: "radial-gradient(circle, rgba(5,5,5,0.5) 0%, transparent 80%)" }}
      >
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <DecryptText text={siteConfig.event.heroSubline} speed={40} delay={250} />
        </div>

        <h1 className="font-display font-bold leading-[0.9] tracking-tight mt-3">
          <span
            className="glitch-1 block text-acid text-[clamp(170px,28vw,200px)]"
            style={{ animation: "fadeUp 0.7s 0.5s both ease, glitch 4s 1.5s ease infinite" }}
          >
            AI
          </span>
          <span
            className="glitch-2 block text-white text-[clamp(72px,11.5vw,172px)] tracking-[0.06em] mt-1 sm:-mt-1"
            style={{ animation: "fadeUp 0.7s 0.65s both ease, glitch2 8s 4s ease infinite" }}
          >
            HACK
          </span>
          <span
            className="glitch-2 block text-acid text-[clamp(12px,11.5vw,28px)] tracking-[1.2rem] pl-4 mt-4"
            style={{ animation: "fadeUp 0.7s 0.65s both ease, glitch2 8s 4s ease infinite" }}
          >
            {/* APP IN A SNAP */}
          </span>
        </h1>

        <div
          className="font-serif italic text-[clamp(15px,1.8vw,18px)] font-medium text-white/70 mt-8"
          style={{ animation: "fadeUp 0.6s 0.85s both ease" }}
        >
          — AI Хакатон организиран от {siteConfig.event.organizer}
        </div>

        <p
          className="font-mono text-[clamp(11px,1.1vw,16px)] leading-[1.95] text-white/85 max-w-[560px] mx-auto mt-6"
          style={{ animation: "fadeUp 0.6s 1.1s both ease" }}
        >
          {siteConfig.event.shortDescription}
        </p>

        <div
          className="flex gap-3.5 mt-11 justify-center flex-wrap"
          style={{ animation: "fadeUp 0.6s 1.25s both ease" }}
        >
          <Link
            href="/register"
            className="inline-block font-display uppercase text-lg tracking-[0.07em] bg-acid text-black border-none py-4 px-11 cursor-pointer transition-all duration-200 hover:bg-white hover:-translate-y-0.5 no-underline"
          >
            Регистрация
          </Link>
          <button
            className="font-display uppercase text-lg tracking-[0.07em] bg-transparent text-acid border border-acid/60 py-4 px-11 cursor-pointer transition-all duration-200 hover:border-acid hover:text-acid"
            onClick={() =>
              document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            ВИЖ ПРОГРАМАТА
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-6 md:gap-15 mt-12 md:mt-18 justify-center flex-wrap">
          {stats.map(([v, l]) => (
            <div key={l} className="text-center">
              <CountUp
                value={v}
                className="font-display text-3xl md:text-5xl text-acid leading-[1.1]"
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 mt-1.5">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-2 flex flex-col items-center gap-1.5">
        <div
          className="w-px h-11 animate-fade-up"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(var(--acid-rgb),0.4), transparent)",
            animationDelay: "2s",
          }}
        />
      </div>
    </section>
  );
}
