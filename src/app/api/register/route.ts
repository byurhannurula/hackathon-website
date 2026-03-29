import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { step1Schema, step2Schema, step3Schema } from "@/lib/schemas";

const AIRTABLE_TOKEN = process.env.AIRTABLE_PAT;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "EventRegistrations";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PRIVATE_KEY = process.env.SUPABASE_PRIVATE_KEY;

const registrationSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();

    // Guard against oversized payloads
    const rawStr = JSON.stringify(raw);
    if (rawStr.length > 50_000) {
      return NextResponse.json({ ok: false, error: "Заявката е твърде голяма." }, { status: 413 });
    }

    // Server-side validation
    const parsed = registrationSchema.safeParse(raw);
    if (!parsed.success) {
      console.error("Validation error:", parsed.error.flatten().fieldErrors);
      return NextResponse.json(
        { ok: false, error: "Невалидни данни. Моля, проверете полетата и опитайте отново." },
        { status: 400 }
      );
    }
    const body = parsed.data;

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
            age: body.age,
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
          console.error("Supabase error:", error.code);
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
          // Non-duplicate Supabase error — fall through to "no ticket" check
        } else {
          if (data?.ticket_number) ticketNumber = data.ticket_number;
          if (data?.ticket_id) ticketId = data.ticket_id;
        }
      } catch (e) {
        console.error("Supabase write failed:", e);
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
          Age: body.age || "",
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
        if (body.avatarUrl) fields.AvatarUrl = body.avatarUrl;

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
        if (!res.ok) console.error("Airtable error: status", res.status);
      } catch (e) {
        console.error("Airtable write failed:", e);
      }
    }

    return NextResponse.json({ ok: true, ticketNumber, ticketId });
  } catch (e) {
    console.error("Registration API error:", e);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
