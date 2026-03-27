import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendEmailSchema } from "@/lib/schemas";
import { createAdminClient } from "@/lib/supabase-admin";
import { ApprovedEmail } from "@/emails/approved";
import { RejectedEmail } from "@/emails/rejected";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return NextResponse.json({ ok: false, error: "Email not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const parsed = sendEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid data" }, { status: 400 });
    }

    const { registrationId, email, fullName, status, ticketNumber, ticketId } = parsed.data;

    // Verify this registration actually exists and the email matches
    const supabase = createAdminClient();
    const { data: reg } = await supabase
      .from("registrations")
      .select("id, email")
      .eq("id", registrationId)
      .single();

    if (!reg || reg.email !== email) {
      return NextResponse.json({ ok: false, error: "Registration not found" }, { status: 404 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://viberuse.com";
    const resend = new Resend(apiKey);
    const isApproved = status === "approved";

    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: isApproved
        ? "Регистрацията ти е одобрена! | RUSE AI HACK '26"
        : "Относно регистрацията ти | RUSE AI HACK '26",
      react: isApproved
        ? ApprovedEmail({ fullName, ticketNumber, ticketId, siteUrl })
        : RejectedEmail({ fullName, siteUrl }),
    });

    if (error) {
      console.error("Resend error:", error.message);
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Send email error:", e);
    return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
  }
}
