"use client";

import { useState } from "react";

interface AgendaItemProps {
  time: string;
  label: string;
  desc: string;
}

export const AgendaItem = ({ time, label, desc }: AgendaItemProps) => {
  const [h, sH] = useState(false);
  return (
    <div
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        background: h ? "rgba(200,255,0,0.03)" : "transparent",
        borderLeft: `2px solid ${h ? "var(--acid)" : "rgba(255,255,255,0.1)"
          }`,
        padding: "26px 28px",
        transition: "all 0.2s",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono-google)",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "var(--acid)",
        }}
      >
        {time}
      </div>
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: "16px",
          color: "#fff",
          marginTop: "7px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono-google)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.55)",
          marginTop: "7px",
          lineHeight: 1.8,
        }}
      >
        {desc}
      </div>
    </div>
  );
};
