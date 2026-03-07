"use client";

import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/";

interface DecryptTextProps {
  text: string;
  speed?: number;
  delay?: number;
}

export function DecryptText({ text, speed = 38, delay = 0 }: DecryptTextProps) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    let idx = 0;
    let timer: NodeJS.Timeout;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        idx++;
        setOut(
          text
            .split("")
            .map((c, i) => {
              if (c === " " || i < idx) return c;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        if (idx >= text.length) clearInterval(timer);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [text, speed, delay]);

  return <span className="font-mono text-[13px] tracking-[0.18em] text-acid/85">{out}</span>;
}
