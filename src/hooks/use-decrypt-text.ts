"use client";

import { useState, useEffect } from "react";

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/";

/**
 * Deterministic scramble — produces the same output on server and client
 * for a given input string, avoiding hydration mismatches.
 */
function scrambleDeterministic(text: string, chars: string): string {
  return text
    .split("")
    .map((ch, i) => (ch === " " ? " " : chars[(i * 7 + ch.charCodeAt(0) * 13) % chars.length]))
    .join("");
}

/**
 * Hook that animates text with a "decrypt" effect — characters scramble
 * then resolve left-to-right.
 *
 * @param text    Target string to reveal
 * @param options Configuration
 * @returns The current (possibly scrambled) string
 */
export function useDecryptText(
  text: string,
  options: {
    /** Start animating immediately or wait for `active` flag */
    active?: boolean;
    /** ms between each character reveal (default 38) */
    speed?: number;
    /** ms delay before animation starts (default 0) */
    delay?: number;
    /** Characters used for scramble noise */
    chars?: string;
  } = {}
) {
  const { active = true, speed = 38, delay = 0, chars = DEFAULT_CHARS } = options;

  // SSR-safe initial value: if not active, show deterministic scramble;
  // if active with no delay, show the text (will animate immediately).
  const [out, setOut] = useState(() => (active ? text : scrambleDeterministic(text, chars)));

  useEffect(() => {
    if (!active) {
      setOut(scrambleDeterministic(text, chars));
      return;
    }

    let idx = 0;
    let timer: NodeJS.Timeout;

    const tick = () => {
      setOut(
        text
          .split("")
          .map((c, i) => {
            if (c === " " || i < idx) return c;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (idx >= text.length) {
        clearInterval(timer);
        return;
      }
      idx++;
    };

    const start = setTimeout(() => {
      timer = setInterval(tick, speed);
      // Fire first tick immediately so scramble is visible right away
      tick();
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [text, active, speed, delay, chars]);

  return out;
}
