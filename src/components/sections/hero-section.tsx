"use client";

import { siteConfig } from "@/constants";
import { DottedSurface, DecryptText, CountUp } from "@/components/ui";

interface HeroSectionProps {
  onRegister: () => void;
}

export function HeroSection({ onRegister }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-[120px] pb-20 md:px-12">
      <DottedSurface className="absolute inset-0 z-0" />

      {/* Subtle dot grid overlay underneath shader */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(200,255,0,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette — pulls focus to center */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 10%, rgba(5,5,5,0.7) 65%, rgba(5,5,5,0.97) 100%)",
        }}
      />

      {/* CONTENT */}
      <div
        className="relative z-2 max-w-[1000px] p-5"
        style={{ background: "radial-gradient(circle, rgba(5,5,5,0.5) 0%, transparent 80%)" }}
      >
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <DecryptText
            text={`26 АПРИЛ 2026  \u00B7  РУСЕ, БЪЛГАРИЯ  \u00B7  48Ч ХАКАТОН`}
            speed={45}
            delay={100}
          />
        </div>

        <h1 className="font-display font-semibold text-[clamp(48px,12vw,172px)] leading-[0.95] tracking-tight mt-[18px]">
          <span
            className="glitch-1 block text-white"
            style={{ animation: "fadeUp 0.7s 0.5s both ease, glitch 4s 1.5s ease infinite" }}
          >
            VIBE TO
          </span>
          <span
            className="glitch-2 block text-acid"
            style={{ animation: "fadeUp 0.7s 0.65s both ease, glitch2 8s 4s ease infinite" }}
          >
            PRODUCTION
          </span>
        </h1>

        <div
          className="font-serif italic text-[clamp(16px,2vw,20px)] text-white/85 mt-8"
          style={{ animation: "fadeUp 0.6s 0.95s both ease" }}
        >
          — хакатон от StartupFactory
        </div>

        <p
          className="font-mono text-[clamp(11px,1.1vw,13px)] leading-[1.95] text-white/85 max-w-[560px] mx-auto mt-6"
          style={{ animation: "fadeUp 0.6s 1.1s both ease" }}
        >
          {siteConfig.event.shortDescription}
        </p>

        <div
          className="flex gap-3.5 mt-11 justify-center flex-wrap"
          style={{ animation: "fadeUp 0.6s 1.25s both ease" }}
        >
          <button
            onClick={onRegister}
            className="font-display text-lg tracking-[0.07em] bg-acid text-black border-none py-4 px-11 cursor-pointer transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
          >
            ВЗЕМИ БИЛЕТ
          </button>
          <button className="font-display text-lg tracking-[0.07em] bg-transparent text-muted border border-border-hover py-4 px-11 cursor-pointer transition-all duration-200 hover:border-acid hover:text-acid">
            ВИЖ ПРОГРАМАТА
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-6 md:gap-15 mt-12 md:mt-18 justify-center flex-wrap">
          {[
            ["48Ч", "БЕЗ ПРЕКЪСВАНЕ"],
            [siteConfig.event.prizesPool, "В НАГРАДИ"],
            ["БЕЗПЛАТНО", "ВХОД"],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <CountUp
                value={v}
                className="font-display text-3xl md:text-5xl text-acid leading-[1.1]"
              />
              <div className="font-mono text-[11px] tracking-[0.18em] text-white/55 mt-1.5">
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
            background: "linear-gradient(to bottom, transparent, rgba(200,255,0,0.4), transparent)",
            animationDelay: "2s",
          }}
        />
      </div>
    </section>
  );
}
