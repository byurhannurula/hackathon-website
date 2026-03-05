"use client";

import { useEffect, useState } from "react";
import { TicketVisual } from "./ticket/TicketVisual";
import { XIcon, LIIcon, FBIcon, DLIcon } from "./ui/icons";
import { TicketData, encryptTicket } from "../lib/utils";

interface TicketPageProps {
  data: TicketData | null;
  onBack: () => void;
}

export function TicketPage({ data, onBack }: TicketPageProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shareUrl = data
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/?t=${encryptTicket(data)}`
    : "";

  const doCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shr = (url: string) => window.open(url, "_blank", "width=600,height=400");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        position: "relative",
      }}
    >
      {/* Background glow behind ticket */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "60vw",
          height: "40vw",
          background: "radial-gradient(ellipse at center, rgba(200,255,0,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "48px",
          cursor: "pointer",
          fontFamily: "var(--font-mono-google)",
          fontSize: "12px",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.1em",
          transition: "color 0.2s",
          zIndex: 10,
        }}
        onClick={onBack}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
      >
        ← Back to Home
      </div>

      <div style={{ position: "relative", zIndex: 1, animation: "revealUp 0.6s ease-out" }}>
        <TicketVisual data={data} interactive={true} />
      </div>

      {/* Share Actions */}
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          position: "relative",
          zIndex: 1,
          animation: "revealUp 0.6s 0.2s both ease-out",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono-google)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
          }}
        >
          Share your ticket
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() =>
              shr(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  "I'm building at Vibe Ruse '26! Join me. ✦"
                )}&url=${encodeURIComponent(shareUrl)}`
              )
            }
            style={shareBtnStyle}
            onMouseEnter={sHover}
            onMouseLeave={sLeave}
          >
            <XIcon />
          </button>
          <button
            onClick={() =>
              shr(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl
                )}`
              )
            }
            style={shareBtnStyle}
            onMouseEnter={sHover}
            onMouseLeave={sLeave}
          >
            <LIIcon />
          </button>
          <button
            onClick={() =>
              shr(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`
              )
            }
            style={shareBtnStyle}
            onMouseEnter={sHover}
            onMouseLeave={sLeave}
          >
            <FBIcon />
          </button>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={doCopy}
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              background: "rgba(255,255,255,0.05)",
              color: copied ? "var(--acid)" : "#fff",
              border: `1px solid ${copied ? "var(--acid)" : "rgba(255,255,255,0.15)"}`,
              padding: "12px 24px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!copied) e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              if (!copied) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
          >
            {copied ? "COPIED URL!" : "COPY LINK"}
          </button>
          <button
            onClick={() => alert("Stub: Canvas -> toDataURL() -> download anchor. (Omitted for brevity)")}
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              background: "transparent",
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "12px 24px",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <DLIcon />
            DOWNLOAD IMAGE
          </button>
        </div>
      </div>
    </div>
  );
}

const shareBtnStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.25s",
};

const sHover = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.background = "var(--acid)";
  e.currentTarget.style.color = "#000";
  e.currentTarget.style.borderColor = "var(--acid)";
  e.currentTarget.style.transform = "translateY(-3px)";
};
const sLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
  e.currentTarget.style.color = "#fff";
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
  e.currentTarget.style.transform = "none";
};
