"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/constants";

interface CountdownTimerProps {
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

type EventPhase = "before" | "live" | "ended";

function getPhase(start: Date, end: Date): EventPhase {
  const now = Date.now();
  if (now < start.getTime()) return "before";
  if (now < end.getTime()) return "live";
  return "ended";
}

/**
 * Live countdown with three phases:
 * - Before event: countdown to start
 * - During event: "LIVE NOW" with countdown to end
 * - After event: "Event ended" message
 */
export function CountdownTimer({ enabled = true }: CountdownTimerProps) {
  const second = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!enabled) return null;

  // On server (second===0), render nothing to avoid hydration mismatch
  if (second === 0) return null;

  const start = new Date(siteConfig.event.startDate);
  const end = new Date(siteConfig.event.endDate);
  const phase = getPhase(start, end);

  if (phase === "ended") {
    return (
      <div className="text-center py-6">
        <div className="font-display text-2xl text-white/50 tracking-[0.06em]">
          ХАКАТОНЪТ ПРИКЛЮЧИ
        </div>
        <p className="font-mono text-[11px] text-white/25 mt-2 tracking-[0.1em]">
          Благодарим на всички участници!
        </p>
      </div>
    );
  }

  if (phase === "live") {
    const nowMs = second * 1000;
    const elapsedMs = nowMs - start.getTime();
    const totalMs = end.getTime() - start.getTime();
    const progress = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
    const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60));

    return (
      <div className="py-4 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-4 md:gap-6">
          <span className="font-display text-3xl md:text-5xl text-acid/30 leading-none select-none">
            [
          </span>
          <div className="flex items-center gap-4 md:gap-5">
            <span className="relative flex h-4 w-4 md:h-5 md:w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-60" />
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-40"
                style={{ animationDelay: "0.4s" }}
              />
              <span className="relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 bg-acid shadow-[0_0_24px_rgba(var(--acid-rgb),0.8)]" />
            </span>
            <span className="font-display text-4xl md:text-6xl text-acid tracking-[0.12em] leading-none">
              LIVE NOW
            </span>
          </div>
          <span className="font-display text-3xl md:text-5xl text-acid/30 leading-none select-none">
            ]
          </span>
        </div>

        <div className="w-full max-w-[420px] flex flex-col gap-2">
          <div className="flex justify-between font-mono text-[10px] tracking-[0.15em] text-white/40 uppercase">
            <span>Час {elapsedHours} / 48</span>
            <span>Хакатонът е в ход</span>
          </div>
          <div className="h-[2px] w-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-acid shadow-[0_0_8px_rgba(var(--acid-rgb),0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Before event — countdown to start
  const timeLeft = calcTimeLeft(start);
  if (!timeLeft) return null;

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
