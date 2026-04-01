/**
 * HMAC-SHA256 auth utilities for admin password gate.
 * Uses Web Crypto API — compatible with Edge Runtime (middleware).
 */

const encoder = new TextEncoder();

export async function computeAdminToken(password: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(password));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyAdminToken(token: string, secret: string): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !secret) return false;
  const expected = await computeAdminToken(password, secret);
  // Constant-time comparison — always iterate max length to prevent timing leaks
  const len = Math.max(token.length, expected.length);
  let diff = token.length ^ expected.length;
  for (let i = 0; i < len; i++) {
    diff |= (token.charCodeAt(i) || 0) ^ (expected.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export const ADMIN_COOKIE_NAME = "admin-token";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
