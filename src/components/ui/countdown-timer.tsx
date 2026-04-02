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
    const timeLeft = calcTimeLeft(end);

    return (
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2.5 mb-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-acid" />
          </span>
          <span className="font-display text-2xl text-acid tracking-[0.08em]">LIVE NOW</span>
        </div>
        {timeLeft && (
          <div className="flex gap-3 md:gap-5 justify-center items-center">
            {[
              { value: timeLeft.hours + timeLeft.days * 24, label: "ЧАСА" },
              { value: timeLeft.minutes, label: "МИН" },
              { value: timeLeft.seconds, label: "СЕК" },
            ].map((unit, i, arr) => (
              <div key={unit.label} className="flex items-center gap-3 md:gap-5">
                <div className="text-center min-w-[52px] md:min-w-[72px]">
                  <div className="font-display text-3xl md:text-5xl text-acid leading-[1.1] tabular-nums">
                    {pad(unit.value)}
                  </div>
                  <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 mt-1">
                    {unit.label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <span className="font-display text-2xl md:text-4xl text-white/15 -mt-4">:</span>
                )}
              </div>
            ))}
          </div>
        )}
        <p className="font-mono text-[10px] text-white/30 mt-3 tracking-[0.1em]">ОСТАВАЩО ВРЕМЕ</p>
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
