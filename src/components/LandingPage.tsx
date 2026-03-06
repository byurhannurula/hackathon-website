"use client";

import { useState } from "react";
import { Nav } from "./Nav";
import { DitheringBg } from "./DitheringBg";
import { FallingPattern } from "./ui/falling-pattern";
import { DottedSurface } from "./ui/dotted-surface";
import { PaperDithering } from "./ui/PaperDithering";
import { FloatingIconsShader } from "./ui/floating-icons-shader";
import { DecryptText } from "./ui/DecryptText";
import { Ticker } from "./Ticker";
import { SectionHeader as SH } from "./SectionHeader";
import { AgendaItem } from "./AgendaItem";
import { FaqItem } from "./FaqItem";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";
import {
  HACKATHON_INFO,
  AGENDA,
  PRIZES,
  FAQS,
  SPONSORS
} from "../lib/constants";
import { useTranslation } from "@/lib/i18n";

interface LandingPageProps {
  onRegister: () => void;
}

export function LandingPage({ onRegister }: LandingPageProps) {
  const { t } = useTranslation();
  const [heroHover, setHeroHover] = useState(false);
  const [bgType, setBgType] = useState<"original" | "falling" | "dotted" | "paper" | "icons">("icons");


  return (
    <div style={{ background: "var(--bg)" }}>
      <Nav onRegister={onRegister} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        onMouseEnter={() => setHeroHover(true)}
        onMouseLeave={() => setHeroHover(false)}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: "120px 48px 80px",
        }}
      >
        {bgType === "original" && <DitheringBg hovered={heroHover} />}
        {bgType === "falling" && <FallingPattern className="absolute inset-0 z-0" />}
        {bgType === "dotted" && <DottedSurface className="absolute inset-0 z-0" />}
        {bgType === "paper" && <PaperDithering isHovered={heroHover} />}
        {bgType === "icons" && <FloatingIconsShader />}

        {/* Subtle dot grid overlay underneath shader */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(circle, rgba(200,255,0,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            zIndex: 0,
          }}
        />

        {/* Vignette — pulls focus to center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            background:
              "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 10%, rgba(5,5,5,0.7) 65%, rgba(5,5,5,0.97) 100%)",
          }}
        />

        {/* CONTENT */}
        <div style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1000px",
          // Subtle readability glaze
          background: "radial-gradient(circle, rgba(5,5,5,0.5) 0%, transparent 80%)",
          padding: "20px",
        }}>
          <div style={{ animation: "fadeIn 0.5s 0.2s both" }}>
            <DecryptText
              text={t.hero.dateLocation}
              speed={30}
              delay={300}
            />
          </div>

          <h1
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(80px, 14vw, 195px)",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
              marginTop: "18px",
            }}
          >
            <span
              className="glitch-1"
              style={{
                display: "block",
                color: "#fff",
                animation:
                  "fadeUp 0.7s 0.5s both ease, glitch 8s 1.5s ease infinite",
              }}
            >
              {t.hero.titleTop}
            </span>
            <span
              className="glitch-2"
              style={{
                display: "block",
                color: "var(--acid)",
                animation:
                  "fadeUp 0.7s 0.65s both ease, glitch2 11s 4s ease infinite",
              }}
            >
              {t.hero.titleBottom}
            </span>
          </h1>

          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255,255,255,0.85)", // Boosted from 0.45 for readability
              marginTop: "14px",
              animation: "fadeUp 0.6s 0.95s both ease",
            }}
          >
            — {t.hero.organizer}
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "clamp(11px, 1.1vw, 13px)",
              lineHeight: 1.95,
              color: "rgba(255,255,255,0.85)", // Boosted from 0.42 for readability
              maxWidth: "560px",
              margin: "24px auto 0",
              animation: "fadeUp 0.6s 1.1s both ease",
            }}
          >
            {t.hero.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              marginTop: "44px",
              justifyContent: "center",
              flexWrap: "wrap",
              animation: "fadeUp 0.6s 1.25s both ease",
            }}
          >
            <button
              onClick={onRegister}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "18px",
                letterSpacing: "0.07em",
                background: "var(--acid)",
                color: "#000",
                border: "none",
                padding: "16px 44px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--acid)";
                e.currentTarget.style.transform = "";
              }}
            >
              {t.hero.ctaTicket}
            </button>
            <button
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "18px",
                letterSpacing: "0.07em",
                background: "transparent",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.14)",
                padding: "16px 44px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--acid)";
                e.currentTarget.style.color = "var(--acid)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              {t.hero.ctaAgenda}
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "60px",
              marginTop: "72px",
              justifyContent: "center",
              flexWrap: "wrap",
              animation: "fadeUp 0.6s 1.45s both ease",
            }}
          >
            {[
              [HACKATHON_INFO.buildersCount, t.hero.statsBuilders],
              ["48H", t.hero.statsNonstop],
              [HACKATHON_INFO.prizesPool, t.hero.statsPrizes],
              ["FREE", t.hero.statsEntry],
            ].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "48px",
                    color: "var(--acid)",
                    lineHeight: 1,
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono-google)",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.55)",
                    marginTop: "6px",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "44px",
              background:
                "linear-gradient(to bottom, transparent, rgba(200,255,0,0.4), transparent)",
              animation: "fadeUp 0.5s 2s both",
            }}
          />
        </div>

        {/* Background Switcher UI */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "48px",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            Switch Shader
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "original", label: "OG" },
              { id: "falling", label: "RAIN" },
              { id: "dotted", label: "SURFACE" },
              { id: "paper", label: "WARP" },
              { id: "icons", label: "ICONS" },
            ].map((bt) => (
              <button
                key={bt.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setBgType(bt.id as any);
                }}
                style={{
                  padding: "6px 12px",
                  fontSize: "10px",
                  fontFamily: "var(--font-mono-google)",
                  backgroundColor: bgType === bt.id ? "var(--acid)" : "rgba(255,255,255,0.05)",
                  color: bgType === bt.id ? "#000" : "rgba(255,255,255,0.5)",
                  border: `1px solid ${bgType === bt.id ? "var(--acid)" : "rgba(255,255,255,0.1)"}`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {bt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORGANIZER + PARTNERS ─────────────────────────────────────────── */}
      <section
        style={{ padding: "56px 48px", borderBottom: "1px solid var(--border)" }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "52px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-mono-google)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              {t.footer.organizedBy}
            </div>
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "34px",
                letterSpacing: "0.04em",
                color: "var(--acid)",
              }}
            >
              {HACKATHON_INFO.organizer.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono-google)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
                marginTop: "4px",
              }}
            >
              Ruse Innovation Hub · Building founders since 2018
            </div>
          </div>
          <div
            style={{
              width: "1px",
              alignSelf: "stretch",
              background: "rgba(255,255,255,0.1)",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: "200px", overflow: "hidden" }}>
            <div
              style={{
                fontFamily: "var(--font-mono-google)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              {t.footer.techPartners}
            </div>
            <Ticker />
          </div>
        </div>
      </section>

      {/* ── AGENDA ───────────────────────────────────────────────────────── */}
      <section id="agenda" style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SH label={t.hero.dateLocation.split("  ·  ")[0]} title={t.sections.agenda} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              marginTop: "48px",
            }}
          >
            {AGENDA.map((a, i) => (
              <AgendaItem key={i} {...a} />
            ))}
          </div>
        </div>
      </section>

      <Ticker dir={-1} />

      {/* ── PRIZES ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 48px", background: "var(--card)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SH
            label={`TOTAL POOL ${HACKATHON_INFO.prizesPool}`}
            title={t.sections.prizes}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "1px",
              background: "var(--border)",
              marginTop: "48px",
            }}
          >
            {PRIZES.map((p, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg)",
                  padding: "32px 24px",
                  borderTop: `3px solid ${[
                    "var(--acid)",
                    "rgba(255,255,255,0.45)",
                    "rgba(255,255,255,0.25)",
                    "rgba(255,255,255,0.12)",
                  ][i]
                    }`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono-google)",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    color: i === 0 ? "var(--acid)" : "rgba(255,255,255,0.55)",
                  }}
                >
                  {p.place}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "48px",
                    color: i === 0 ? "var(--acid)" : "#fff",
                    lineHeight: 1,
                    marginTop: "8px",
                  }}
                >
                  {p.amount}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono-google)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.55)",
                    marginTop: "10px",
                    lineHeight: 1.8,
                  }}
                >
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSORS ─────────────────────────────────────────────────────── */}
      <section
        id="sponsors"
        style={{
          padding: "100px 48px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SH label="MAKING THIS POSSIBLE" title={t.sections.sponsors} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "52px",
            }}
          >
            {SPONSORS.map((name) => (
              <div
                key={name}
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "18px",
                  letterSpacing: "0.06em",
                  padding: "14px 28px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,255,0,0.5)";
                  e.currentTarget.style.color = "var(--acid)";
                  e.currentTarget.style.background = "rgba(200,255,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {name}
              </div>
            ))}
          </div>
          {/* Sponsor CTA */}
          <div
            style={{
              marginTop: "48px",
              padding: "26px 32px",
              border: "1px solid rgba(200,255,0,0.1)",
              background: "rgba(200,255,0,0.02)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                {t.footer.sponsoring}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono-google)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "4px",
                }}
              >
                {t.footer.sponsoringDesc}
              </div>
            </div>
            <button
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "15px",
                letterSpacing: "0.08em",
                background: "transparent",
                color: "var(--acid)",
                border: "1px solid rgba(200,255,0,0.3)",
                padding: "12px 28px",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(200,255,0,0.07)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {t.footer.becomeSponsor} →
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        style={{
          padding: "100px 48px",
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <SH title={t.sections.faq} />
          <div style={{ marginTop: "48px" }}>
            {FAQS.map((f, i) => (
              <FaqItem key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection onRegister={onRegister} />

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <Footer onRegister={onRegister} />
    </div>
  );
}
