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
    <section
      ref={ref}
      style={{
        padding: "140px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid bg subtle */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,255,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-mono-google)",
            fontSize: "10px",
            letterSpacing: "0.22em",
            color: "var(--acid)",
            marginBottom: "28px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.6s 0.1s ease",
          }}
        >
          ◆ LIMITED SPOTS REMAINING ◆
        </div>

        <div
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(56px, 10vw, 130px)",
            lineHeight: 0.88,
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.12)",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(40px) skewY(3deg)",
              transition: "all 0.7s 0.25s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            STOP OVERTHINKING.
          </div>
          <div
            style={{
              color: "var(--acid)",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(40px) skewY(3deg)",
              transition: "all 0.7s 0.45s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            START SHIPPING.
          </div>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "all 0.6s 0.8s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              marginTop: "24px",
              letterSpacing: "0.12em",
            }}
          >
            26 April 2026 · Ruse, Bulgaria · 48 hours · Free entry
          </p>
          <button
            onClick={onRegister}
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "20px",
              letterSpacing: "0.08em",
              background: "var(--acid)",
              color: "#000",
              border: "none",
              padding: "20px 72px",
              cursor: "pointer",
              marginTop: "40px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--acid)";
              e.currentTarget.style.transform = "";
            }}
          >
            REGISTER NOW — IT&apos;S FREE
          </button>
        </div>
      </div>
    </section>
  );
}
