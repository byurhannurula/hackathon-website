import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("registrations")
    .select(
      "role, dev_experience, ai_experience, ai_tools, has_team, has_theme, want_challenge, volunteer_help, age, created_at, registration_status"
    );

  if (error) {
    console.error("Stats fetch error:", error.code);
    return NextResponse.json({ ok: false, error: "Failed to fetch stats" }, { status: 500 });
  }

  const registrations = data ?? [];
  const total = registrations.length;

  // Count occurrences helper
  function countBy(field: string): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const row of registrations) {
      const val = (row as Record<string, string>)[field] || "Неизвестно";
      counts[val] = (counts[val] || 0) + 1;
    }
    return counts;
  }

  // Parse AI tools from comma-separated free text
  function countAiTools(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const row of registrations) {
      const raw = row.ai_tools || "";
      const tools = raw
        .split(/[,;/\n]+/)
        .map((t: string) => t.trim().toLowerCase())
        .filter((t: string) => t.length > 0 && t.length < 60);

      for (const tool of tools) {
        // Normalize common tool names
        const normalized = normalizeTool(tool);
        counts[normalized] = (counts[normalized] || 0) + 1;
      }
    }
    // Sort by count and take top 15
    return Object.fromEntries(
      Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
    );
  }

  // Age buckets
  function ageDistribution(): Record<string, number> {
    const buckets: Record<string, number> = {
      "12-17": 0,
      "18-24": 0,
      "25-34": 0,
      "35-44": 0,
      "45+": 0,
    };
    for (const row of registrations) {
      const age = parseInt(row.age, 10);
      if (isNaN(age)) continue;
      if (age < 18) buckets["12-17"]++;
      else if (age < 25) buckets["18-24"]++;
      else if (age < 35) buckets["25-34"]++;
      else if (age < 45) buckets["35-44"]++;
      else buckets["45+"]++;
    }
    return buckets;
  }

  // Registrations per day
  function registrationsPerDay(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const row of registrations) {
      const day = row.created_at?.slice(0, 10);
      if (day) counts[day] = (counts[day] || 0) + 1;
    }
    // Sort by date
    return Object.fromEntries(Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0])));
  }

  // Status breakdown
  function statusDistribution(): Record<string, number> {
    const counts: Record<string, number> = { pending: 0, approved: 0, rejected: 0 };
    for (const row of registrations) {
      const s = row.registration_status || "pending";
      counts[s] = (counts[s] || 0) + 1;
    }
    return counts;
  }

  return NextResponse.json({
    ok: true,
    total,
    stats: {
      status: statusDistribution(),
      role: countBy("role"),
      devExperience: countBy("dev_experience"),
      aiExperience: countBy("ai_experience"),
      aiTools: countAiTools(),
      hasTeam: countBy("has_team"),
      hasTheme: countBy("has_theme"),
      wantChallenge: countBy("want_challenge"),
      volunteerHelp: countBy("volunteer_help"),
      age: ageDistribution(),
      timeline: registrationsPerDay(),
    },
  });
}

function normalizeTool(raw: string): string {
  const t = raw.toLowerCase().trim();

  // ChatGPT variants
  if (t.includes("chatgpt") || t.includes("chat gpt") || t === "gpt" || t.includes("openai"))
    return "ChatGPT";

  // Claude variants (check "claude code" before generic "claude")
  if (t.includes("claude code") || t.includes("claude-code")) return "Claude Code";
  if (t.includes("claude")) return "Claude";

  // Copilot
  if (t.includes("copilot") || t.includes("co-pilot")) return "GitHub Copilot";

  // Cursor
  if (t.includes("cursor")) return "Cursor";

  // Gemini
  if (t.includes("gemini") || t.includes("bard")) return "Gemini";

  // Midjourney
  if (t.includes("midjourney") || t.includes("mid journey")) return "Midjourney";

  // DALL-E
  if (t.includes("dall") || t.includes("dalle")) return "DALL-E";

  // Stable Diffusion
  if (t.includes("stable diffusion") || t.includes("stablediffusion")) return "Stable Diffusion";

  // v0
  if (t === "v0" || t.includes("v0.dev")) return "v0";

  // Perplexity
  if (t.includes("perplexity")) return "Perplexity";

  // Bolt
  if (t.includes("bolt")) return "Bolt";

  // Lovable
  if (t.includes("lovable")) return "Lovable";

  // Replit
  if (t.includes("replit")) return "Replit";

  // Windsurf / Codeium
  if (t.includes("windsurf") || t.includes("codeium")) return "Windsurf";

  // DeepSeek
  if (t.includes("deepseek") || t.includes("deep seek")) return "DeepSeek";

  // Grok
  if (t.includes("grok")) return "Grok";

  // Capitalize first letter for unknown tools
  return raw.trim().charAt(0).toUpperCase() + raw.trim().slice(1).toLowerCase();
}
