"use client";

import { useCallback, useState } from "react";

interface Toast {
  message: string;
  type: "ok" | "error";
}

export function useToast(duration = 3000) {
  const [toast, setToast] = useState<Toast | null>(null);

  const show = useCallback(
    (message: string, type: "ok" | "error") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), duration);
    },
    [duration]
  );

  return { toast, show } as const;
}
