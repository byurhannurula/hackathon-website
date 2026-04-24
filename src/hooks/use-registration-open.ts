"use client";

import { useEffect, useState } from "react";

let cached: boolean | null = null;
let inflight: Promise<boolean> | null = null;

function load(): Promise<boolean> {
  if (cached !== null) return Promise.resolve(cached);
  if (inflight) return inflight;
  inflight = fetch("/api/registration-status")
    .then((r) => r.json())
    .then((d) => {
      cached = !!d.open;
      return cached;
    })
    .catch(() => {
      cached = false;
      return false;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export function useRegistrationOpen() {
  const [open, setOpen] = useState(cached ?? false);

  useEffect(() => {
    if (cached !== null) return;
    let cancelled = false;
    load().then((v) => {
      if (!cancelled) setOpen(v);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return open;
}
