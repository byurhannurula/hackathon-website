"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AvatarCircle } from "./ui/AvatarCircle";
import { encryptTicket, TicketData, getGithubAvatarUrl } from "../lib/utils";

interface RegisterPageProps {
  onBack: () => void;
  onComplete: (data: TicketData) => void;
  currentTicket: TicketData | null;
}

const inp = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.12)",
  padding: "16px 20px",
  color: "#fff",
  fontFamily: "var(--font-mono-google)",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s",
};
const lbl = {
  display: "block",
  fontFamily: "var(--font-mono-google)",
  fontSize: "10px",
  color: "rgba(255,255,255,0.5)",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  marginBottom: "8px",
};

export function RegisterPage({
  onBack,
  onComplete,
  currentTicket,
}: RegisterPageProps) {
  const [fN, setFN] = useState(currentTicket?.name || "");
  const [fH, setFH] = useState(currentTicket?.handle || "");
  const [fAv, setFAv] = useState(currentTicket?.avatarUrl || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFetch = (e: React.MouseEvent) => {
    e.preventDefault();
    if (fH.trim().length > 1) {
      setFAv(getGithubAvatarUrl(fH));
    }
  };

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fN.trim() || !fH.trim()) return;
    const tNum = currentTicket?.ticketNum || Math.floor(Math.random() * 899999) + 100000;
    const td: TicketData = {
      name: fN.trim(),
      handle: fH.trim(),
      avatarUrl: fAv,
      ticketNum: tNum,
    };
    onComplete(td);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        position: "relative",
      }}
    >
      <Link
        href="/"
        style={{
          position: "absolute",
          top: "40px",
          left: "48px",
          cursor: "pointer",
          fontFamily: "var(--font-mono-google)",
          fontSize: "12px",
          color: "rgba(255,255,255,0.5)",
          textDecoration: "none",
          letterSpacing: "0.1em",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
        }
      >
        ← Back to Home
      </Link>

      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          animation: "slideIn 0.4s ease-out",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 8vw, 72px)",
            lineHeight: 0.9,
            marginBottom: "12px",
          }}
        >
          CLAIM YOUR <span style={{ color: "var(--acid)" }}>SPOT</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-mono-google)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
            marginBottom: "40px",
          }}
        >
          Enter your details below to generate your unique hacker ticket. GitHub
          handle is recommended for the avatar fetch.
        </p>

        <form onSubmit={handleSub} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <label style={lbl}>Full Name / Moniker</label>
            <input
              required
              value={fN}
              onChange={(e) => setFN(e.target.value)}
              placeholder="Satoshi Nakamoto"
              style={inp}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--acid)")}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
              }
            />
          </div>

          <div>
            <label style={lbl}>GitHub Handle (For Avatar)</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                required
                value={fH}
                onChange={(e) => setFH(e.target.value)}
                placeholder="@username"
                style={{ ...inp, flex: 1 }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--acid)")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
                }
              />
              <button
                type="button"
                onClick={handleFetch}
                style={{
                  fontFamily: "var(--font-mono-google)",
                  fontSize: "11px",
                  fontWeight: 700,
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "0 20px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "var(--acid)";
                  e.currentTarget.style.color = "var(--acid)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                FETCH
              </button>
            </div>
          </div>

          {/* Preview of fetched avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
            <AvatarCircle name={fN || "?"} avatarUrl={fAv} size={48} />
            <div
              style={{
                fontFamily: "var(--font-mono-google)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {fAv ? "Avatar loaded." : "No avatar yet."}
            </div>
          </div>

          <button
            type="submit"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "22px",
              letterSpacing: "0.08em",
              background: "var(--acid)",
              color: "#000",
              border: "none",
              padding: "20px",
              cursor: "pointer",
              marginTop: "16px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--acid)";
              e.currentTarget.style.transform = "";
            }}
          >
            GET MY TICKET ✦
          </button>
        </form>
      </div>
    </div>
  );
}
