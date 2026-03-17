"use client";

import { useState, useEffect, useCallback } from "react";

interface UnlockStep {
  text: string;
  duration: number;
}

const UNLOCK_STEPS: UnlockStep[] = [
  { text: "ENCRYPTING PASS…", duration: 900 },
  { text: "RESERVING SEAT IN GRID…", duration: 800 },
  { text: "SYNCING WITH HACKATHON MAINFRAME…", duration: 1000 },
  { text: "ACCESS GRANTED ✦", duration: 600 },
];

interface TicketUnlockSequenceProps {
  enabled?: boolean;
  onComplete: () => void;
}

export function TicketUnlockSequence({ enabled = true, onComplete }: TicketUnlockSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const stableComplete = useCallback(() => onComplete(), [onComplete]);

  // Step progression
  useEffect(() => {
    if (!enabled) return;
    if (currentStep >= UNLOCK_STEPS.length) {
      const t = setTimeout(stableComplete, 300);
      return () => clearTimeout(t);
    }

    const stepDuration = UNLOCK_STEPS[currentStep].duration;
    const t = setTimeout(() => {
      setCurrentStep((s) => s + 1);
      setCharIndex(0);
    }, stepDuration);

    return () => clearTimeout(t);
  }, [enabled, currentStep, stableComplete]);

  // Typewriter effect for current step text
  useEffect(() => {
    if (!enabled || currentStep >= UNLOCK_STEPS.length) return;
    const text = UNLOCK_STEPS[currentStep].text;
    if (charIndex >= text.length) return;

    const t = setTimeout(() => {
      setCharIndex((i) => i + 1);
    }, 20);
    return () => clearTimeout(t);
  }, [enabled, currentStep, charIndex]);

  // Derive progress from currentStep (no state needed)
  const total = UNLOCK_STEPS.reduce((a, s) => a + s.duration, 0);
  const elapsed = UNLOCK_STEPS.slice(0, currentStep).reduce((a, s) => a + s.duration, 0);
  const progress = Math.min((elapsed / total) * 100, 100);

  if (!enabled) return null;

  const isComplete = currentStep >= UNLOCK_STEPS.length;
  const displayText = isComplete
    ? UNLOCK_STEPS[UNLOCK_STEPS.length - 1].text
    : UNLOCK_STEPS[currentStep].text.slice(0, charIndex);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Scanline background effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,0,0.5) 2px, rgba(200,255,0,0.5) 3px)",
          backgroundSize: "100% 3px",
        }}
      />

      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        {/* Terminal window */}
        <div className="w-full border border-white/10 bg-black/50 backdrop-blur-sm">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-acid/60" />
            <div className="w-2 h-2 rounded-full bg-white/15" />
            <div className="w-2 h-2 rounded-full bg-white/15" />
            <span className="font-mono text-[9px] text-white/25 ml-2 tracking-[0.15em] uppercase">
              ticket-gen v1.0
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-4 min-h-[160px] flex flex-col justify-end gap-1.5">
            {UNLOCK_STEPS.slice(0, currentStep).map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-acid/70">✓</span>
                <span className="font-mono text-[11px] text-white/40 tracking-[0.06em]">
                  {step.text}
                </span>
              </div>
            ))}

            {!isComplete && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-acid animate-pulse">▸</span>
                <span className="font-mono text-[11px] text-acid tracking-[0.06em]">
                  {displayText}
                  <span className="inline-block w-[6px] h-[13px] bg-acid/80 ml-0.5 animate-[blink_0.8s_steps(1)_infinite]" />
                </span>
              </div>
            )}

            {isComplete && (
              <div className="flex items-center gap-2 animate-pulse">
                <span className="font-mono text-[10px] text-acid">✦</span>
                <span className="font-mono text-[11px] text-acid font-bold tracking-[0.06em]">
                  ACCESS GRANTED ✦
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-px bg-white/10 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-acid transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status label */}
        <div className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
          {isComplete ? "REDIRECTING…" : "GENERATING TICKET"}
        </div>
      </div>

      {/* Blink cursor keyframe */}
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
