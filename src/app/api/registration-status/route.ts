import { NextResponse } from "next/server";
import { isRegistrationOpen } from "@/lib/registration-status";

export async function GET() {
  return NextResponse.json({ open: await isRegistrationOpen() });
}
