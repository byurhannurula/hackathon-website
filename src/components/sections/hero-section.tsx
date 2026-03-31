"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { useLiveCount } from "@/hooks";
import { siteConfig } from "@/constants";
import { DecryptText, CountUp } from "@/components/ui";
import { LogoGlitchNoise } from "@/components/ui/logo-glitch-noise";

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
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle,rgba(var(--acid-rgb),0.08)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* Vignette — pulls focus to center */}
      <div className="absolute inset-0 pointer-events-none z-1 bg-[radial-gradient(ellipse_85%_80%_at_50%_50%,transparent_30%,rgba(5,5,5,0.7)_65%,rgba(5,5,5,0.97)_100%)]" />

      {/* CONTENT */}
      <div className="relative z-2 max-w-[1000px] p-5 bg-[radial-gradient(circle,rgba(5,5,5,0.5)_0%,transparent_80%)]">
        <h1 className="sr-only">
          {siteConfig.event.name} {siteConfig.event.year} — {siteConfig.event.shortDescription}
        </h1>
        <div className="animate-fade-in delay-200">
          <DecryptText text={siteConfig.event.heroSubline} speed={40} delay={250} />
        </div>

        <div className="flex items-center justify-center my-8 animate-[fadeUp_0.7s_0.5s_both_ease]">
          <LogoGlitchNoise className="w-[clamp(100px,50vw,320px)]!" />
        </div>

        <div className="font-serif italic text-[clamp(15px,1.8vw,18px)] font-medium text-white/85 animate-[fadeUp_0.6s_0.85s_both_ease]">
          — AI Хакатон организиран от {siteConfig.event.organizer}
        </div>

        <p className="font-mono text-[clamp(11px,1.1vw,16px)] leading-[1.95] text-white/85 max-w-[560px] mx-auto mt-6 animate-[fadeUp_0.6s_1.1s_both_ease]">
          {siteConfig.event.shortDescription}
        </p>

        <div className="flex gap-3.5 mt-11 justify-center flex-wrap animate-[fadeUp_0.6s_1.25s_both_ease]">
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

        <p className="font-mono text-xs tracking-[0.08em] text-white/50 mt-5 animate-[fadeUp_0.6s_1.4s_both_ease]">
          Регистрациите са отворени до <span className="text-acid/80">20 април</span>
        </p>

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
        <div className="w-px h-11 animate-fade-up delay-[2s] bg-linear-to-b from-transparent via-acid/40 to-transparent" />
      </div>
    </section>
  );
}
