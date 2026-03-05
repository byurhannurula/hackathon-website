"use client";

import { useRef, useState, useCallback } from "react";
import { TicketSVG } from "./TicketSVG";
import { AvatarCircle } from "../ui/AvatarCircle";
import { GHIcon } from "../ui/icons";
import { TicketData } from "../../lib/utils";

interface TicketVisualProps {
  data: TicketData | null;
  interactive?: boolean;
}

export function TicketVisual({ data, interactive = false }: TicketVisualProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const name = data?.name || "Your Name";
  const handle = data?.handle || "handle";
  const avatarUrl = data?.avatarUrl || "";
  const ticketNum = data?.ticketNum || null;

  const cleanHandle = handle.replace(/^@/, "");
  const numStr = ticketNum ? String(ticketNum).padStart(6, "0") : "000000";

  const onEnter = useCallback(() => setHov(true), []);
  const onLeave = useCallback(() => {
    setHov(false);
    setRot({ x: 0, y: 0 });
  }, []);
  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      setRot({
        x: -((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 10,
        y: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 10,
      });
    },
    [interactive]
  );

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      style={{
        position: "relative",
        width: "640px",
        maxWidth: "96vw",
        aspectRatio: "720 / 320", // must match SVG viewBox exactly
        transformStyle: "preserve-3d",
        transform: `perspective(1100px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: hov
          ? "transform 0.08s ease-out"
          : "transform 0.5s ease-out",
        cursor: interactive ? "default" : "default",
        flexShrink: 0,
        filter: hov
          ? "drop-shadow(0 36px 70px rgba(0,0,0,0.95)) drop-shadow(0 0 40px rgba(200,255,0,0.07))"
          : "drop-shadow(0 20px 44px rgba(0,0,0,0.8))",
      }}
    >
      <TicketSVG hovering={hov} />

      {/* MAIN BODY */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          bottom: "8%",
          left: "4%",
          right: "25%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TOP: avatar + name + handle */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <AvatarCircle name={name} avatarUrl={avatarUrl} size={64} />
          <div style={{ overflow: "hidden", minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(15px, 2.6vw, 21px)",
                lineHeight: 1.1,
                color: "#fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "-0.02em",
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-mono-google)",
                fontSize: "clamp(10px, 1.5vw, 12px)",
                color: "rgba(255,255,255,0.5)",
                marginTop: "6px",
                letterSpacing: "0.01em",
              }}
            >
              <GHIcon />
              {cleanHandle}
            </div>
          </div>
        </div>

        {/* BOTTOM: brand | event info */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
          {/* Brand */}
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(22px, 3.8vw, 34px)",
                lineHeight: 0.88,
                letterSpacing: "0.02em",
              }}
            >
              <span style={{ color: "var(--acid)" }}>VIBE</span>
              <span style={{ color: "#fff" }}> RUSE</span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono-google)",
                fontSize: "clamp(7px,1vw,9px)",
                color: "rgba(255,255,255,0.4)",
                marginTop: "5px",
                letterSpacing: "0.12em",
              }}
            >
              HACKATHON &apos;26
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "38px",
              background: "rgba(255,255,255,0.12)",
              flexShrink: 0,
            }}
          />

          {/* Date + location */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "clamp(12px,1.9vw,15px)",
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              26 APRIL 2026
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono-google)",
                fontSize: "clamp(9px,1.3vw,11px)",
                color: "rgba(255,255,255,0.45)",
                marginTop: "3px",
              }}
            >
              RUSE, BULGARIA
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono-google)",
                fontSize: "clamp(7px,1vw,9px)",
                color: "rgba(255,255,255,0.22)",
                marginTop: "6px",
                letterSpacing: "0.06em",
              }}
            >
              by <span style={{ color: "rgba(200,255,0,0.6)" }}>StartupFactory</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT STUB */}
      <div
        style={{
          position: "absolute",
          top: "7%",
          bottom: "7%",
          left: "77%",
          right: "0%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: "rotate(-90deg)",
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(200,255,0,0.75)",
              letterSpacing: "0.06em",
            }}
          >
            Nº
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono-google)",
              fontWeight: 700,
              fontSize: "clamp(20px, 3.2vw, 28px)",
              color: "#ffffff",
              letterSpacing: "0.12em",
            }}
          >
            {numStr}
          </span>
        </div>
      </div>
    </div>
  );
}
