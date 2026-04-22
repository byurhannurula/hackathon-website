"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();

  const logout = useCallback(async () => {
    await fetch("/api/kcah-ia-esur/auth", { method: "DELETE" });
    router.push("/kcah-ia-esur/login");
  }, [router]);

  /** Fetch an admin API route. Redirects to login on 401, returns null. */
  const adminFetch = useCallback(
    async (url: string, init?: RequestInit): Promise<Response | null> => {
      const res = await fetch(url, init);
      if (res.status === 401) {
        router.push("/kcah-ia-esur/login");
        return null;
      }
      return res;
    },
    [router]
  );

  return { logout, adminFetch };
}
