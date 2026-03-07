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
        className="rounded-full shrink-0 flex items-center justify-center border-2 border-acid/40"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, rgba(200,255,0,0.18), rgba(200,255,0,0.05))",
        }}
      >
        <span
          className="font-body font-extrabold text-acid -tracking-[0.02em]"
          style={{ fontSize: size * 0.38 }}
        >
          {initials}
        </span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatarUrl}
      alt={name}
      draggable="false"
      className="rounded-full object-cover block border-2 border-white/20 shrink-0"
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
}
