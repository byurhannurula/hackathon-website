"use client";

import { useEffect, useState } from "react";

let cached: boolean | null = null;

export function useRegistrationOpen() {
  const [open, setOpen] = useState(cached ?? true);

  useEffect(() => {
    if (cached !== null) return;
    fetch("/api/registration-status")
      .then((r) => r.json())
      .then((d) => {
        cached = d.open;
        setOpen(d.open);
      })
      .catch(() => {});
  }, []);

  return open;
}
