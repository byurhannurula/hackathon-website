"use client";

import { useEffect, useState } from "react";

import { useAdminAuth } from "./use-admin-auth";

export interface StatsData {
  status: Record<string, number>;
  role: Record<string, number>;
  devExperience: Record<string, number>;
  aiExperience: Record<string, number>;
  aiTools: Record<string, number>;
  hasTeam: Record<string, number>;
  hasTheme: Record<string, number>;
  wantChallenge: Record<string, number>;
  volunteerHelp: Record<string, number>;
  age: Record<string, number>;
  timeline: Record<string, number>;
}

export function useAdminStats() {
  const { adminFetch } = useAdminAuth();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    adminFetch("/api/kcah-ia-esur/stats")
      .then((r) => r?.json())
      .then((json) => {
        if (!json) return;
        if (json.ok) {
          setStats(json.stats);
          setTotal(json.total);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [adminFetch]);

  return { stats, total, loading, error };
}
