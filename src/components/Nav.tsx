"use client";

import { useState, useEffect } from "react";

interface NavProps {
  onRegister: () => void;
}

export function Nav({ onRegister }: NavProps) {
  const [sc, setSc] = useState(false);

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        background: sc ? "rgba(5,5,5,0.94)" : "transparent",
        backdropFilter: sc ? "blur(20px)" : "none",
        borderBottom: sc ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "22px",
            color: "var(--acid)",
          }}
        >
          VIBE
        </span>
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "22px",
            color: "#fff",
          }}
        >
          RUSE
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono-google)",
            fontSize: "11px",
            color: "rgba(255,255,255,0.45)",
            marginLeft: "4px",
          }}
        >
          &apos;26
        </span>
      </div>
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {["Agenda", "Prizes", "Sponsors", "FAQ"].map((l) => (
          <span
            key={l}
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.35)",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--acid)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
            }
          >
            {l}
          </span>
        ))}
        <button
          onClick={onRegister}
          style={{
            fontFamily: "var(--font-mono-google)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            background: "var(--acid)",
            color: "#000",
            border: "none",
            padding: "9px 22px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#fff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--acid)")
          }
        >
          Register →
        </button>
      </div>
    </nav>
  );
}
