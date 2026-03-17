"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

/**
 * Fires a celebratory confetti burst once on mount.
 * Toggle: set `enabled={false}` or remove the component to disable.
 */
interface ConfettiBurstProps {
  enabled?: boolean;
  /** Called once after the confetti fires — use to mark as seen */
  onFired?: () => void;
}

export function ConfettiBurst({ enabled = true, onFired }: ConfettiBurstProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (!enabled || fired.current) return;
    fired.current = true;
    onFired?.();

    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#C8FF00", "#ffffff", "#a3e635", "#22d3ee", "#FF3355", "#7B61FF"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#C8FF00", "#ffffff", "#a3e635", "#22d3ee", "#FF3355", "#7B61FF"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Small delay so ticket renders first
    setTimeout(frame, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return null;
}
