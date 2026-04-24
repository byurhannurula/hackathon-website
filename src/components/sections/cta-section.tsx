"use client";

import { Link } from "@/components/ui";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { siteConfig } from "@/constants";
import { useRegistrationOpen, useInView } from "@/hooks";
import { cn } from "@/lib";

export function CTASection() {
  const { ref, inView: visible } = useInView({ threshold: 0.3 });
  const regOpen = useRegistrationOpen();

  return (
    <section ref={ref} className="px-6 py-35 md:px-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-grid-acid" />
      <div className="absolute inset-0 pointer-events-none bg-glow-acid" />

      <div className="relative z-1">
        <div
          className={cn(
            "font-mono text-[10px] tracking-[0.22em] text-acid mb-7 transition-all duration-600 ease-out delay-100",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          ◆ ОГРАНИЧЕНИ МЕСТА ◆
        </div>

        <div
          className={cn(
            "font-display text-[clamp(40px,7vw,90px)] leading-[1.1] text-acid transition-all duration-700 ease-expo-out delay-350",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          Създай смислено и <br /> полезно приложение с AI
        </div>

        <div
          className={cn(
            "transition-all duration-600 ease-out delay-800",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <p className="font-mono text-sm text-muted mt-12 tracking-[0.05em]">
            {siteConfig.event.ctaSubline}
          </p>

          <div className="mt-10 animate-[fadeUp_0.6s_1.5s_both_ease]">
            <CountdownTimer enabled={true} />
          </div>

          {regOpen ? (
            <>
              <p className="font-mono text-xs tracking-[0.12em] text-acid/70 mt-8">
                Регистрациите са отворени до <span className="text-acid font-bold">20 април</span>
              </p>
              <Link
                href="/register"
                variant="primary"
                className="text-xl py-5 px-18 mt-6 hover:scale-[1.03]"
              >
                РЕГИСТРИРАЙ СЕ &mdash; БЕЗПЛАТНО Е
              </Link>
            </>
          ) : (
            <>
              <p className="font-mono text-xs tracking-[0.12em] text-white/40 mt-8">
                Регистрацията за RUSE AI HACK &apos;26 приключи
              </p>
              <span className="inline-block font-display text-xl tracking-[0.08em] bg-white/10 text-white/40 py-5 px-18 mt-6 cursor-not-allowed">
                РЕГИСТРАЦИЯТА ПРИКЛЮЧИ
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
