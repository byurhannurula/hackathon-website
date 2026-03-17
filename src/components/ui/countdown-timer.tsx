"use client";

import { useSyncExternalStore } from "react";

interface CountdownTimerProps {
  /** ISO date string or Date for the target event */
  targetDate?: string | Date;
  /** Set to false to hide the component entirely */
  enabled?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

// External store that ticks every second
let listeners: Array<() => void> = [];
let currentSecond = Math.floor(Date.now() / 1000);

if (typeof window !== "undefined") {
  setInterval(() => {
    const now = Math.floor(Date.now() / 1000);
    if (now !== currentSecond) {
      currentSecond = now;
      listeners.forEach((l) => l());
    }
  }, 200);
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return currentSecond;
}

function getServerSnapshot() {
  return 0;
}

/**
 * Live countdown to the hackathon.
 *
 * Toggle: set `enabled={false}` to hide entirely without removing from the tree.
 * Default target: April 26, 2026 09:00 EET (UTC+2).
 */
export function CountdownTimer({
  targetDate = "2026-04-24T09:00:00+02:00",
  enabled = true,
}: CountdownTimerProps) {
  const second = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!enabled) return null;

  // On server (second===0), render nothing to avoid hydration mismatch
  if (second === 0) return null;

  const target = new Date(targetDate);
  const timeLeft = calcTimeLeft(target);

  if (!timeLeft) {
    return (
      <div className="text-center py-6">
        <div className="font-display text-2xl text-acid tracking-[0.06em]">ХАКАТОНЪТ ЗАПОЧНА!</div>
      </div>
    );
  }

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "ДНИ" },
    { value: timeLeft.hours, label: "ЧАСА" },
    { value: timeLeft.minutes, label: "МИН" },
    { value: timeLeft.seconds, label: "СЕК" },
  ];

  return (
    <div className="flex gap-3 md:gap-5 justify-center items-center py-2">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 md:gap-5">
          <div className="text-center min-w-[52px] md:min-w-[72px]">
            <div className="font-display text-3xl md:text-5xl text-acid leading-[1.1] tabular-nums">
              {pad(unit.value)}
            </div>
            <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 mt-1">
              {unit.label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="font-display text-2xl md:text-4xl text-white/15 -mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
