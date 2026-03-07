"use client";

import { useRef, useState, useEffect } from "react";

interface CTASectionProps {
  onRegister: () => void;
}

export function CTASection({ onRegister }: CTASectionProps) {
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
      {/* Grid bg subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,255,0,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-1">
        <div
          className="font-mono text-[10px] tracking-[0.22em] text-acid mb-7 transition-all duration-600 ease-out"
          style={{
            transitionDelay: "0.1s",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
          }}
        >
          ◆ ОГРАНИЧЕНИ МЕСТА ◆
        </div>

        <div className="font-display text-[clamp(56px,10vw,130px)] leading-[1.05]">
          <div
            className="text-white/12 transition-all duration-700"
            style={{
              transitionDelay: "0.25s",
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(40px) skewY(3deg)",
            }}
          >
            СПРИ ДА МИСЛИШ.
          </div>
          <div
            className="text-acid transition-all duration-700"
            style={{
              transitionDelay: "0.45s",
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(40px) skewY(3deg)",
            }}
          >
            ЗАПОЧНИ ДА ДОСТАВЯШ.
          </div>
        </div>

        <div
          className="transition-all duration-600 ease-out"
          style={{
            transitionDelay: "0.8s",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
          }}
        >
          <p className="font-mono text-xs text-muted mt-6 tracking-[0.12em]">
            26 април 2026 · Русе, България · 48 часа · Безплатен вход
          </p>
          <button
            onClick={onRegister}
            className="font-display text-xl tracking-[0.08em] bg-acid text-black border-none py-5 px-18 cursor-pointer mt-10 transition-all duration-200 hover:bg-white hover:scale-[1.03]"
          >
            РЕГИСТРИРАЙ СЕ — БЕЗПЛАТНО Е
          </button>
        </div>
      </div>
    </section>
  );
}
