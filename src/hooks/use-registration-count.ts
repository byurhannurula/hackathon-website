"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PRIVATE_KEY;

/**
 * Fetches the initial registration count from the API,
 * then subscribes to Supabase Realtime INSERT events
 * to increment the count live without re-fetching.
 */
export function useRegistrationCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // 1. Initial fetch via API (uses service role key server-side)
    fetch("/api/registration-count")
      .then((r) => r.json())
      .then((d) => {
        if (d.count != null) setCount(d.count);
      })
      .catch(() => {});

    // 2. Realtime subscription (uses anon key client-side)
    if (!supabaseUrl || !supabaseKey) return;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const channel = supabase
      .channel("registrations-count")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "registrations" }, () => {
        setCount((prev) => (prev != null ? prev + 1 : 1));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return count;
}
