"use client";

import { useEffect, useRef, useState } from "react";

import type { UserAnalytics } from "@/lib/types";
import { ADMIN_API } from "@/lib";
import { StatCard } from "./stat-card";

interface AnalyticsTabProps {
  ticketId: string;
}

export function AnalyticsTab({ ticketId }: AnalyticsTabProps) {
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const cache = useRef<Record<string, UserAnalytics>>({});

  useEffect(() => {
    if (cache.current[ticketId]) {
      setAnalytics(cache.current[ticketId]);
      return;
    }

    setLoading(true);
    setError(false);
    fetch(ADMIN_API.analytics(ticketId))
      .then((r) => r.json())
      .then((json) => {
        if (json.ok) {
          setAnalytics(json.data);
          cache.current[ticketId] = json.data;
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [ticketId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[72px] bg-white/2 border border-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-mono text-sm text-white/40 py-8 text-center">
        Грешка при зареждане на данните
      </div>
    );
  }

  if (!analytics) {
    return <div className="font-mono text-sm text-white/40 py-8 text-center">Няма данни</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard label="Преглеждания" value={analytics.pageViews} />
      <StatCard label="Споделяния" value={analytics.shares} />
      <StatCard label="Изтегляния" value={analytics.downloads} />
      <StatCard
        label="Easter Eggs"
        value={
          [analytics.consoleSecret && "Конзола", analytics.konamiCode && "Konami"]
            .filter(Boolean)
            .join(", ") || "—"
        }
      />
    </div>
  );
}
