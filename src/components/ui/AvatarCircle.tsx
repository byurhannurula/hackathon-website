"use client";

import { useState } from "react";

interface AvatarCircleProps {
  name: string;
  avatarUrl: string;
  size?: number;
}

export function AvatarCircle({ name, avatarUrl, size = 68 }: AvatarCircleProps) {
  const [failed, setFailed] = useState(false);
  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  if (!avatarUrl || failed) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          flexShrink: 0,
          background:
            "linear-gradient(135deg, rgba(200,255,0,0.18), rgba(200,255,0,0.05))",
          border: "2px solid rgba(200,255,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: size * 0.38,
            color: "var(--acid)",
            letterSpacing: "-0.02em",
          }}
        >
          {initials}
        </span>
      </div>
    );
  }
  return (
    <img
      src={avatarUrl}
      alt=""
      draggable="false"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        display: "block",
        border: "2px solid rgba(255,255,255,0.2)",
        flexShrink: 0,
      }}
      onError={() => setFailed(true)}
    />
  );
}
