import { NextRequest, NextResponse } from "next/server";
import { isRegistrationOpen, setRegistrationOpen } from "@/lib/registration-status";

export async function GET() {
  return NextResponse.json({ ok: true, open: await isRegistrationOpen() });
}

export async function POST(req: NextRequest) {
  const { open } = await req.json();
  if (typeof open !== "boolean") {
    return NextResponse.json({ ok: false, error: "Invalid value" }, { status: 400 });
  }
  await setRegistrationOpen(open);
  return NextResponse.json({ ok: true, open: await isRegistrationOpen() });
}
