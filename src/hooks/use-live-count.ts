"use client";

import { useEffect, useState } from "react";

/**
 * Module-level store so multiple consumers share one poll timer and fetch.
 */
let count: number | null = null;
const subscribers = new Set<(n: number | null) => void>();
let interval: ReturnType<typeof setInterval> | null = null;
let inflight: Promise<void> | null = null;

async function fetchCount() {
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch("/api/count");
      if (!res.ok) return;
      const json = await res.json();
      if (typeof json.count === "number" && json.count !== count) {
        count = json.count;
        subscribers.forEach((fn) => fn(count));
      }
    } catch {
      // Silently ignore fetch errors
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

function subscribe(setter: (n: number | null) => void, intervalMs: number) {
  subscribers.add(setter);
  if (count !== null) setter(count);

  if (subscribers.size === 1) {
    fetchCount();
    interval = setInterval(fetchCount, intervalMs);
  }

  return () => {
    subscribers.delete(setter);
    if (subscribers.size === 0 && interval) {
      clearInterval(interval);
      interval = null;
    }
  };
}

/**
 * Fetches the live registration count from /api/count.
 * Polls every `intervalMs` (default 30s). Shared across consumers.
 * Set `enabled=false` to disable fetching.
 */
export function useLiveCount(enabled = true, intervalMs = 30_000) {
  const [value, setValue] = useState<number | null>(count);

  useEffect(() => {
    if (!enabled) return;
    return subscribe(setValue, intervalMs);
  }, [enabled, intervalMs]);

  return value;
}
