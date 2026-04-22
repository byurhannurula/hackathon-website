import { NextRequest, NextResponse } from "next/server";
import { computeAdminToken, ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE } from "@/lib/admin-auth";

// ─── Simple in-memory rate limiter for login attempts ────────
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkLoginRate(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_ATTEMPTS) return false;
  record.count++;
  return true;
}

/** Constant-time string comparison to prevent timing attacks. */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Still do the full comparison to avoid length-based timing leak
    let diff = 1;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
    }
    return diff === 0;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkLoginRate(ip)) {
    return NextResponse.json(
      { ok: false, error: "Твърде много опити. Опитайте отново след 15 минути." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const password = typeof body?.password === "string" ? body.password : "";
    const expected = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SECRET;

    if (!expected || !secret) {
      return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
    }

    if (!safeCompare(password, expected)) {
      return NextResponse.json({ ok: false, error: "Грешна парола" }, { status: 401 });
    }

    const token = await computeAdminToken(password, secret);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_COOKIE_MAX_AGE,
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return res;
}
