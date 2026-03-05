"use client";

import { useState } from "react";

interface FaqItemProps {
  q: string;
  a: string;
}

export const FaqItem = ({ q, a }: FaqItemProps) => {
  const [o, sO] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "18px 0",
      }}
    >
      <div
        onClick={() => sO(!o)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "15px",
            color: o ? "var(--acid)" : "#fff",
            transition: "color 0.2s",
          }}
        >
          {q}
        </span>
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "22px",
            color: "var(--acid)",
            transform: o ? "rotate(45deg)" : "none",
            transition: "transform 0.2s",
            flexShrink: 0,
            marginLeft: "16px",
          }}
        >
          +
        </span>
      </div>
      {o && (
        <p
          style={{
            fontFamily: "var(--font-mono-google)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.6)",
            marginTop: "12px",
            lineHeight: 1.9,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
};
