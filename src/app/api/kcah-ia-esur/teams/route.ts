import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

interface Member {
  id: string;
  full_name: string;
  role: string;
  dev_experience: string;
  ai_experience: string;
  ai_tools: string;
  has_theme: string;
  theme_description: string | null;
  organization: string;
  github_handle: string | null;
  avatar_url: string | null;
  ticket_number: number;
  ticket_id: string;
  registration_status: string;
}

const DEV_LEVEL: Record<string, number> = {
  "Нямам опит": 0,
  "Минимален - под 1 година": 1,
  "Начално ниво - между 1 и 3 години": 2,
  "Средно ниво - между 4 и 7 години": 3,
  "Високо ниво - над 8 години": 4,
};

const SELECT_FIELDS =
  "id, full_name, role, dev_experience, ai_experience, ai_tools, has_theme, theme_description, organization, github_handle, avatar_url, ticket_number, ticket_id, has_team, team_name, registration_status";

export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("registrations")
    .select(SELECT_FIELDS)
    .neq("registration_status", "rejected");

  if (error) {
    console.error("Teams fetch error:", error.code);
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }

  const registrations = data ?? [];

  // Split into teams and solos
  const teamMap = new Map<string, { display: string; members: Member[] }>();
  const solos: Member[] = [];

  for (const reg of registrations) {
    const member: Member = {
      id: reg.id,
      full_name: reg.full_name,
      role: reg.role,
      dev_experience: reg.dev_experience,
      ai_experience: reg.ai_experience,
      ai_tools: reg.ai_tools,
      has_theme: reg.has_theme,
      theme_description: reg.theme_description,
      organization: reg.organization,
      github_handle: reg.github_handle,
      avatar_url: reg.avatar_url,
      ticket_number: reg.ticket_number,
      ticket_id: reg.ticket_id,
      registration_status: reg.registration_status,
    };

    if (reg.has_team === "Да" && reg.team_name) {
      // Normalize: strip quotes, collapse whitespace, lowercase for grouping key
      const raw = reg.team_name.trim();
      const key = raw
        .replace(/["""''`]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      if (!teamMap.has(key)) teamMap.set(key, { display: raw, members: [] });
      teamMap.get(key)!.members.push(member);
    } else if (reg.registration_status === "approved") {
      // Only approved solos go into potential teams / suggestions
      solos.push(member);
    }
  }

  const teams = Array.from(teamMap.values()).map(({ display, members }) => ({
    name: display,
    members,
  }));

  // Generate suggested teams from solos
  const suggestions = buildSuggestions(solos);

  return NextResponse.json({
    ok: true,
    teams,
    solos,
    suggestions,
    summary: {
      totalApproved: registrations.length,
      formedTeams: teams.length,
      soloCount: solos.length,
      solosWithIdea: solos.filter((s) => s.has_theme === "Да").length,
      pendingCount: registrations.filter((r) => r.registration_status === "pending").length,
    },
  });
}

// ─── Suggestion engine ─────────────────────────────────────

interface SuggestedTeam {
  reason: string;
  members: Member[];
}

function buildSuggestions(solos: Member[]): SuggestedTeam[] {
  if (solos.length < 2) return [];

  const suggestions: SuggestedTeam[] = [];
  const used = new Set<string>();

  // Pass 1: Group by similar theme descriptions (people with matching interests)
  const withTheme = solos.filter((s) => s.has_theme === "Да" && s.theme_description);
  const themeGroups = groupByKeywords(withTheme);

  for (const group of themeGroups) {
    if (group.length < 2) continue;
    // Take up to 4, try to mix in people without themes for balance
    const core = group.slice(0, 3);
    const coreIds = new Set(core.map((m) => m.id));
    const keywords = extractKeywords(core.map((m) => m.theme_description || "").join(" "));

    // Find a complementary solo (no theme, different skill level)
    const complement = solos.find(
      (s) => !coreIds.has(s.id) && !used.has(s.id) && s.has_theme === "Не"
    );

    const team = complement ? [...core, complement] : core;
    for (const m of team) used.add(m.id);

    suggestions.push({
      reason: `Сходни интереси: ${keywords.slice(0, 3).join(", ")}`,
      members: team,
    });
  }

  // Pass 2: Balance remaining solos by skill diversity
  const remaining = solos.filter((s) => !used.has(s.id));
  const balanced = buildBalancedTeams(remaining, 3);

  for (const team of balanced) {
    for (const m of team) used.add(m.id);

    const hasIdea = team.some((m) => m.has_theme === "Да");
    const levels = team.map((m) => DEV_LEVEL[m.dev_experience] ?? 0);
    const spread = Math.max(...levels) - Math.min(...levels);

    let reason = "Балансирани умения";
    if (hasIdea && spread >= 2) reason = "Има идея + смесен опит";
    else if (hasIdea) reason = "Има идея за проект";
    else if (spread >= 2) reason = "Смесени нива на опит";

    suggestions.push({ reason, members: team });
  }

  return suggestions;
}

function extractKeywords(text: string): string[] {
  const stopwords = new Set([
    "и",
    "в",
    "на",
    "за",
    "с",
    "от",
    "по",
    "да",
    "не",
    "се",
    "е",
    "че",
    "ще",
    "може",
    "като",
    "или",
    "но",
    "до",
    "при",
    "със",
    "без",
    "ни",
    "която",
    "който",
    "което",
    "бих",
    "ai",
    "the",
    "a",
    "an",
    "is",
    "to",
    "of",
    "and",
    "for",
    "with",
    "that",
    "this",
    "using",
    "use",
    "based",
    "app",
    "application",
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopwords.has(w));

  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);

  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w);
}

function groupByKeywords(members: Member[]): Member[][] {
  if (members.length === 0) return [];

  // Extract keyword sets for each member
  const memberKeywords = members.map((m) => ({
    member: m,
    keywords: new Set(extractKeywords(m.theme_description || "").slice(0, 8)),
  }));

  const groups: Member[][] = [];
  const assigned = new Set<string>();

  for (let i = 0; i < memberKeywords.length; i++) {
    if (assigned.has(memberKeywords[i].member.id)) continue;

    const group = [memberKeywords[i].member];
    assigned.add(memberKeywords[i].member.id);

    for (let j = i + 1; j < memberKeywords.length; j++) {
      if (assigned.has(memberKeywords[j].member.id)) continue;

      // Count keyword overlap
      let overlap = 0;
      for (const kw of memberKeywords[j].keywords) {
        if (memberKeywords[i].keywords.has(kw)) overlap++;
      }

      if (overlap >= 2 && group.length < 4) {
        group.push(memberKeywords[j].member);
        assigned.add(memberKeywords[j].member.id);
      }
    }

    if (group.length >= 2) groups.push(group);
    else assigned.delete(memberKeywords[i].member.id);
  }

  return groups;
}

function buildBalancedTeams(members: Member[], teamSize: number): Member[][] {
  if (members.length < 2) return members.length === 1 ? [] : [];

  // Sort by dev experience level
  const sorted = [...members].sort(
    (a, b) => (DEV_LEVEL[a.dev_experience] ?? 0) - (DEV_LEVEL[b.dev_experience] ?? 0)
  );

  const numTeams = Math.max(1, Math.floor(sorted.length / teamSize));
  const teams: Member[][] = Array.from({ length: numTeams }, () => []);

  // Distribute round-robin style (snake draft) so each team gets mix of levels
  let teamIdx = 0;
  let direction = 1;

  for (const member of sorted) {
    teams[teamIdx].push(member);
    teamIdx += direction;
    if (teamIdx >= numTeams || teamIdx < 0) {
      direction *= -1;
      teamIdx += direction;
    }
  }

  // Filter out teams with < 2 members
  return teams.filter((t) => t.length >= 2);
}
