"use client";

import { useEffect, useRef, useState } from "react";
import { useAnalytics } from "@/components/analytics";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

interface KonamiEasterEggProps {
  /** Set to false to disable the easter egg entirely */
  enabled?: boolean;
}

/**
 * Konami code easter egg (↑↑↓↓←→←→BA).
 * On activation: acid-rain particle animation + hidden message.
 *
 * Toggle: set `enabled={false}` to disable without removing from tree.
 */
export function KonamiEasterEgg({ enabled = true }: KonamiEasterEggProps) {
  const { trackEvent } = useAnalytics();
  const [activated, setActivated] = useState(false);
  const bufferRef = useRef<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Console hint
  useEffect(() => {
    if (!enabled) return;
    console.log(
      "%c🎮 Psst… there's a secret code hidden on this page. Gamers know it.",
      "color: #c8ff00; font-size: 12px; font-family: monospace;"
    );
  }, [enabled]);

  // Listen for key sequence
  useEffect(() => {
    if (!enabled) return;

    const handleKey = (e: KeyboardEvent) => {
      bufferRef.current = [...bufferRef.current, e.code].slice(-KONAMI_SEQUENCE.length);
      if (bufferRef.current.join(",") === KONAMI_SEQUENCE.join(",")) {
        setActivated(true);
        trackEvent("konami_code_activated");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled, trackEvent]);

  // Run acid rain animation when activated
  useEffect(() => {
    if (!activated) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01VIBE_TO_PRODUCTION{}[]<>/*AI#";
    const columns = Math.floor(canvas.width / 16);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);

    let animId: number;
    let frame = 0;
    const maxFrames = 360; // ~3s at 60fps

    const draw = () => {
      frame++;
      ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = drops[i] * 16;

        // Mix acid green and white
        const isAccent = Math.random() > 0.7;
        ctx.fillStyle = isAccent ? "rgba(200, 255, 0, 0.9)" : "rgba(200, 255, 0, 0.35)";
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.6 + Math.random() * 0.4;
      }

      if (frame < maxFrames) {
        animId = requestAnimationFrame(draw);
      } else {
        // Fade out
        const fadeOut = () => {
          ctx.fillStyle = "rgba(5, 5, 5, 0.06)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          frame++;
          if (frame < maxFrames + 60) {
            animId = requestAnimationFrame(fadeOut);
          } else {
            setActivated(false);
          }
        };
        fadeOut();
      }
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [activated]);

  if (!enabled) return null;

  return (
    <>
      {activated && (
        <div className="fixed inset-0 z-9999 pointer-events-none">
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center" style={{ animation: "fadeUp 0.8s 1s both ease" }}>
              <div className="font-display text-4xl md:text-6xl text-acid drop-shadow-[0_0_30px_rgba(200,255,0,0.5)]">
                ТИ СИ ИСТИНСКИ СТРОИТЕЛ
              </div>
              <div className="font-mono text-sm text-white/60 mt-4 tracking-widest">
                🛠️ KONAMI CODE UNLOCKED 🛠️
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
