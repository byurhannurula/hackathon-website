"use client";

import { useState, useCallback } from "react";

/**
 * Copy text to clipboard with a temporary "copied" state.
 */
export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    },
    [timeout]
  );

  return { copied, copy } as const;
}
