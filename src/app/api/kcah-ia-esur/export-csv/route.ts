import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const COLUMNS = [
  "ticket_number",
  "ticket_id",
  "full_name",
  "email",
  "phone",
  "age",
  "role",
  "organization",
  "dev_experience",
  "ai_experience",
  "ai_tools",
  "motivation",
  "expectations",
  "has_theme",
  "theme_description",
  "has_team",
  "team_name",
  "want_challenge",
  "volunteer_help",
  "github_handle",
  "avatar_url",
  "registration_status",
  "notes",
  "created_at",
  "status_updated_at",
] as const;

export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("ticket_number", { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }

  const header = COLUMNS.join(",");
  const rows = (data || []).map((row) =>
    COLUMNS.map((col) => escapeCsv(row[col])).join(",")
  );
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
