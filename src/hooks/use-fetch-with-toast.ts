"use client";

import { useCallback, useState } from "react";

type ShowToast = (message: string, type: "ok" | "error") => void;

interface FetchOptions<TBody> {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: TBody;
  successMessage?: string | ((json: Record<string, unknown>) => string);
  errorMessage?: string;
}

interface Result {
  ok: boolean;
  data: Record<string, unknown> | null;
}

/**
 * Fetch wrapper that surfaces success/failure through the toast hook and tracks
 * a loading flag. Returns the parsed JSON so callers can read response fields.
 */
export function useFetchWithToast(showToast: ShowToast) {
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async <TBody>({
      url,
      method = "GET",
      body,
      successMessage,
      errorMessage = "Грешка при заявката",
    }: FetchOptions<TBody>): Promise<Result> => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method,
          headers: body ? { "Content-Type": "application/json" } : undefined,
          body: body ? JSON.stringify(body) : undefined,
        });
        const json = (await res.json()) as Record<string, unknown>;

        if (!json.ok) {
          showToast(errorMessage, "error");
          return { ok: false, data: json };
        }

        if (successMessage) {
          const msg = typeof successMessage === "function" ? successMessage(json) : successMessage;
          showToast(msg, "ok");
        }
        return { ok: true, data: json };
      } catch {
        showToast(errorMessage, "error");
        return { ok: false, data: null };
      } finally {
        setLoading(false);
      }
    },
    [showToast]
  );

  return { run, loading };
}
