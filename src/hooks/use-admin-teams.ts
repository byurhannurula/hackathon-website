"use client";

import { useEffect, useState } from "react";

import { useAdminAuth } from "./use-admin-auth";
import type { Member, Team, SuggestedTeam, TeamsSummary } from "@/components/admin/teams/types";

export function useAdminTeams() {
  const { adminFetch } = useAdminAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [solos, setSolos] = useState<Member[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestedTeam[]>([]);
  const [summary, setSummary] = useState<TeamsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    adminFetch("/api/kcah-ia-esur/teams")
      .then((r) => r?.json())
      .then((json) => {
        if (!json) return;
        if (json.ok) {
          setTeams(json.teams);
          setSolos(json.solos);
          setSuggestions(json.suggestions);
          setSummary(json.summary);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [adminFetch]);

  return { teams, solos, suggestions, summary, loading, error };
}
