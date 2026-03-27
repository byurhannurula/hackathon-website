"use client";

import { useEffect, useState } from "react";

/**
 * Fetches the live registration count from /api/count.
 * Polls every `intervalMs` (default 30s).
 * Set `enabled=false` to disable fetching.
 */
export function useLiveCount(enabled = true, intervalMs = 30_000) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const fetchCount = async () => {
      try {
        const res = await fetch("/api/count");
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled && typeof json.count === "number") {
          setCount(json.count);
        }
      } catch {
        // Silently ignore fetch errors
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, intervalMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [enabled, intervalMs]);

  return count;
}
