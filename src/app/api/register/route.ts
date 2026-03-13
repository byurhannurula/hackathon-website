import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const AIRTABLE_TOKEN = process.env.AIRTABLE_PAT;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "EventRegistrations";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PRIVATE_KEY = process.env.SUPABASE_PRIVATE_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const results: { airtable?: boolean; supabase?: boolean } = {};
    let ticketNumber: number | null = null;
    let ticketId: string | null = null;

    // ── Supabase (primary — provides sequential ticket number) ──
    if (SUPABASE_URL && SUPABASE_PRIVATE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_PRIVATE_KEY);
        const { data, error } = await supabase
          .from("registrations")
          .insert({
            full_name: body.fullName,
            email: body.email,
            phone: body.phone,
            role: body.role,
            organization: body.organization,
            dev_experience: body.devExperience,
            ai_experience: body.aiExperience,
            ai_tools: body.aiTools,
            motivation: body.motivation,
            expectations: body.expectations,
            has_theme: body.hasTheme,
            theme_description: body.themeDescription || null,
            has_team: body.hasTeam,
            team_name: body.teamName || null,
            want_challenge: body.wantChallenge,
            volunteer_help: body.volunteerHelp,
            agree_random_teams: body.agreeRandomTeams,
            gdpr_consent: body.gdprConsent,
            additional_questions: body.additionalQuestions || null,
            github_handle: body.handle || null,
            avatar_url: body.avatarUrl || null,
          })
          .select("ticket_number, ticket_id")
          .single();

        if (error) {
          console.error("Supabase error:", error.message, error.code);
          // 23505 = unique_violation (e.g. duplicate email)
          if (error.code === "23505") {
            const isDuplicateEmail = error.message?.includes("registrations_email_key");
            return NextResponse.json(
              {
                ok: false,
                code: isDuplicateEmail ? "DUPLICATE_EMAIL" : "DUPLICATE_ENTRY",
                error: isDuplicateEmail
                  ? "Този имейл вече е регистриран."
                  : "Вече съществува регистрация с тези данни.",
              },
              { status: 409 }
            );
          }
          results.supabase = false;
        } else {
          results.supabase = true;
          if (data?.ticket_number) ticketNumber = data.ticket_number;
          if (data?.ticket_id) ticketId = data.ticket_id;
        }
      } catch (e) {
        console.error("Supabase write failed:", e);
        results.supabase = false;
      }
    }

    // No fallback — ticket number must come from Supabase
    if (!ticketNumber) {
      return NextResponse.json(
        { ok: false, error: "Неуспешна регистрация. Моля, опитайте отново." },
        { status: 500 }
      );
    }

    // ── Airtable (secondary backup) ──
    if (AIRTABLE_TOKEN && AIRTABLE_BASE_ID) {
      try {
        const fields: Record<string, string | number> = {
          Name: body.fullName,
          Email: body.email,
          Phone: body.phone,
          Role: body.role,
          Organization: body.organization,
          DevExperience: body.devExperience,
          AIExperience: body.aiExperience,
          AITools: body.aiTools,
          Motivation: body.motivation,
          Expectations: body.expectations,
          HasTheme: body.hasTheme,
          HasTeam: body.hasTeam,
          WantChallenge: body.wantChallenge,
          VolunteerHelp: body.volunteerHelp,
          AgreeRandomTeams: body.agreeRandomTeams ? "Да" : "Не",
          GdprConsent: body.gdprConsent ? "Да" : "Не",
          TicketNumber: ticketNumber,
        };
        if (body.themeDescription) fields.ThemeDescription = body.themeDescription;
        if (body.teamName) fields.TeamName = body.teamName;
        if (body.additionalQuestions) fields.AdditionalQuestions = body.additionalQuestions;
        if (body.handle) fields.Github = body.handle;

        const res = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${AIRTABLE_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fields }),
          }
        );
        results.airtable = res.ok;
        if (!res.ok) console.error("Airtable error:", await res.text());
      } catch (e) {
        console.error("Airtable write failed:", e);
        results.airtable = false;
      }
    }

    return NextResponse.json({ ok: true, ticketNumber, ticketId, ...results });
  } catch (e) {
    console.error("Registration API error:", e);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
