import { NextRequest, NextResponse } from "next/server";
import { getUserAnalytics } from "@/lib/umami-api";
import type { UserAnalytics } from "@/lib/types";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Simple in-memory cache (5 min TTL)
const cache = new Map<string, { data: UserAnalytics; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;

  if (!UUID_RE.test(ticketId)) {
    return NextResponse.json({ ok: false, error: "Invalid ticketId" }, { status: 400 });
  }

  // Check cache
  const cached = cache.get(ticketId);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json({ ok: true, data: cached.data });
  }

  try {
    const data = await getUserAnalytics(ticketId);
    cache.set(ticketId, { data, ts: Date.now() });
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Umami analytics fetch failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch analytics" }, { status: 500 });
  }
}
