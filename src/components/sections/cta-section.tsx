"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { siteConfig } from "@/constants";
import { cn } from "@/lib";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

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

        <div className="font-display text-[clamp(56px,10vw,130px)] leading-[1.05]">
          <div
            className={cn(
              "text-white/12 transition-all duration-700 ease-expo-out delay-250",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            СПРИ ДА МИСЛИШ.
          </div>
          <div
            className={cn(
              "text-acid transition-all duration-700 ease-expo-out delay-450",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            ЗАПОЧНИ ДА СЪЗДАВАШ.
          </div>
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

          <Link
            href="/register"
            className="inline-block font-display text-xl tracking-[0.08em] bg-acid text-black border-none py-5 px-18 cursor-pointer mt-10 transition-all duration-200 hover:bg-white hover:scale-[1.03] no-underline"
          >
            РЕГИСТРИРАЙ СЕ &mdash; БЕЗПЛАТНО Е
          </Link>
        </div>
      </div>
    </section>
  );
}
