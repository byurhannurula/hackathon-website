import { describe, it, expect } from "vitest";
import {
  computeAdminToken,
  verifyAdminToken,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
} from "@/lib/admin-auth";

// ─── computeAdminToken ─────────────────────────────────────

describe("computeAdminToken", () => {
  it("returns a hex string", async () => {
    const token = await computeAdminToken("password", "secret");
    expect(token).toMatch(/^[0-9a-f]+$/);
  });

  it("returns a 64-char hex string (SHA-256 = 32 bytes)", async () => {
    const token = await computeAdminToken("password", "secret");
    expect(token).toHaveLength(64);
  });

  it("produces deterministic output for same inputs", async () => {
    const a = await computeAdminToken("password", "secret");
    const b = await computeAdminToken("password", "secret");
    expect(a).toBe(b);
  });

  it("produces different tokens for different passwords", async () => {
    const a = await computeAdminToken("password1", "secret");
    const b = await computeAdminToken("password2", "secret");
    expect(a).not.toBe(b);
  });

  it("produces different tokens for different secrets", async () => {
    const a = await computeAdminToken("password", "secret1");
    const b = await computeAdminToken("password", "secret2");
    expect(a).not.toBe(b);
  });

  it("handles empty password", async () => {
    const token = await computeAdminToken("", "secret");
    expect(token).toHaveLength(64);
  });

  it("handles unicode password", async () => {
    const token = await computeAdminToken("парола123", "secret");
    expect(token).toHaveLength(64);
  });
});

// ─── verifyAdminToken ──────────────────────────────────────

describe("verifyAdminToken", () => {
  const secret = "test-secret";
  const password = "test-password";

  it("returns true for valid token", async () => {
    process.env.ADMIN_PASSWORD = password;
    const token = await computeAdminToken(password, secret);
    const valid = await verifyAdminToken(token, secret);
    expect(valid).toBe(true);
  });

  it("returns false for invalid token", async () => {
    process.env.ADMIN_PASSWORD = password;
    const valid = await verifyAdminToken("invalid-token-value", secret);
    expect(valid).toBe(false);
  });

  it("returns false for wrong-length token (constant-time)", async () => {
    process.env.ADMIN_PASSWORD = password;
    const valid = await verifyAdminToken("abc", secret);
    expect(valid).toBe(false);
  });

  it("returns false when ADMIN_PASSWORD is not set", async () => {
    delete process.env.ADMIN_PASSWORD;
    const token = await computeAdminToken("any", secret);
    const valid = await verifyAdminToken(token, secret);
    expect(valid).toBe(false);
  });

  it("returns false when secret is empty", async () => {
    process.env.ADMIN_PASSWORD = password;
    const valid = await verifyAdminToken("some-token", "");
    expect(valid).toBe(false);
  });

  it("returns false for token with correct length but wrong content", async () => {
    process.env.ADMIN_PASSWORD = password;
    const token = await computeAdminToken(password, secret);
    // Flip one character
    const tampered = token.slice(0, -1) + (token.endsWith("0") ? "1" : "0");
    const valid = await verifyAdminToken(tampered, secret);
    expect(valid).toBe(false);
  });
});

// ─── Constants ─────────────────────────────────────────────

describe("admin auth constants", () => {
  it("ADMIN_COOKIE_NAME is admin-token", () => {
    expect(ADMIN_COOKIE_NAME).toBe("admin-token");
  });

  it("ADMIN_COOKIE_MAX_AGE is 7 days in seconds", () => {
    expect(ADMIN_COOKIE_MAX_AGE).toBe(60 * 60 * 24 * 7);
  });
});
