"use client";

import { useDecryptText } from "@/hooks";

interface DecryptTextProps {
  text: string;
  speed?: number;
  delay?: number;
}

export function DecryptText({ text, speed = 38, delay = 0 }: DecryptTextProps) {
  const out = useDecryptText(text, { speed, delay });

  return <span className="font-mono text-[13px] tracking-[0.18em] text-acid/85">{out}</span>;
}
