import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { broadcastEmailSchema } from "@/lib/schemas";
import { createAdminClient } from "@/lib/supabase-admin";
import { BroadcastEmail } from "@/emails/broadcast";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return NextResponse.json({ ok: false, error: "Email not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const parsed = broadcastEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid data" }, { status: 400 });
    }

    const { subject, body: emailBody, recipientFilter } = parsed.data;

    const supabase = createAdminClient();
    let query = supabase.from("registrations").select("email, full_name");

    if (recipientFilter !== "all") {
      query = query.eq("registration_status", recipientFilter);
    }

    const { data: recipients, error: dbError } = await query;

    if (dbError) {
      console.error("Supabase error:", dbError.message);
      return NextResponse.json({ ok: false, error: "Failed to fetch recipients" }, { status: 500 });
    }

    if (!recipients || recipients.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Няма получатели за избрания филтър" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://viberuse.com";
    const resend = new Resend(apiKey);

    let sent = 0;
    let failed = 0;

    // Send emails in batches of 10 to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map((recipient) =>
          resend.emails.send({
            from,
            to: recipient.email,
            subject,
            react: BroadcastEmail({
              fullName: recipient.full_name,
              subject,
              body: emailBody,
              siteUrl,
            }),
          })
        )
      );

      for (const result of results) {
        if (result.status === "fulfilled" && !result.value.error) {
          sent++;
        } else {
          failed++;
        }
      }
    }

    return NextResponse.json({ ok: true, sent, failed, total: recipients.length });
  } catch (e) {
    console.error("Broadcast email error:", e);
    return NextResponse.json({ ok: false, error: "Failed to send emails" }, { status: 500 });
  }
}
