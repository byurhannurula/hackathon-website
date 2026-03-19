"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  trigger?: boolean;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 45,
  trigger = true,
  className,
}: TypewriterTextProps) {
  const [typed, setTyped] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, speed);

    return () => clearInterval(iv);
  }, [trigger, text, speed]);

  return (
    <span className={className}>
      {typed}
      <span className="inline-block w-[7px] h-[17px] bg-acid align-top animate-blink" />
    </span>
  );
}
