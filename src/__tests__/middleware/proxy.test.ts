import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

// Mock admin-auth
vi.mock("@/lib/admin-auth", () => ({
  verifyAdminToken: vi.fn().mockResolvedValue(true),
  ADMIN_COOKIE_NAME: "admin-token",
}));

import { proxy } from "@/proxy";
import { verifyAdminToken } from "@/lib/admin-auth";

function makeRequest(pathname: string, token?: string): NextRequest {
  const url = `http://localhost:3000${pathname}`;
  const req = new NextRequest(url);
  if (token) {
    req.cookies.set("admin-token", token);
  }
  return req;
}

describe("admin middleware (proxy)", () => {
  beforeEach(() => {
    process.env.ADMIN_SECRET = "test-secret";
    vi.mocked(verifyAdminToken).mockResolvedValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.ADMIN_SECRET;
  });

  // ─── Skip Rules ───────────────────────────────────────

  it("skips login page (allows unauthenticated access)", async () => {
    const res = await proxy(makeRequest("/kcah-ia-esur/login"));
    // NextResponse.next() does not redirect
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("skips auth API endpoint (allows login requests)", async () => {
    const res = await proxy(makeRequest("/api/kcah-ia-esur/auth"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  // ─── Authenticated Access ────────────────────────────

  it("allows access with valid token", async () => {
    vi.mocked(verifyAdminToken).mockResolvedValue(true);
    const res = await proxy(makeRequest("/kcah-ia-esur", "valid-token"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("calls verifyAdminToken with token and secret", async () => {
    await proxy(makeRequest("/kcah-ia-esur", "my-token"));
    expect(verifyAdminToken).toHaveBeenCalledWith("my-token", "test-secret");
  });

  // ─── Unauthenticated — Page Routes ───────────────────

  it("redirects to login for admin pages without token", async () => {
    const res = await proxy(makeRequest("/kcah-ia-esur"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/kcah-ia-esur/login");
  });

  it("redirects to login for admin pages with invalid token", async () => {
    vi.mocked(verifyAdminToken).mockResolvedValue(false);
    const res = await proxy(makeRequest("/kcah-ia-esur", "bad-token"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/kcah-ia-esur/login");
  });

  // ─── Unauthenticated — API Routes ────────────────────

  it("returns 401 for admin API routes without token", async () => {
    const res = await proxy(makeRequest("/api/kcah-ia-esur/registrations"));
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Unauthorized");
  });

  it("returns 401 for admin API routes with invalid token", async () => {
    vi.mocked(verifyAdminToken).mockResolvedValue(false);
    const res = await proxy(makeRequest("/api/kcah-ia-esur/registrations", "bad-token"));
    expect(res.status).toBe(401);
  });

  it("returns 401 for send-email API without token", async () => {
    const res = await proxy(makeRequest("/api/kcah-ia-esur/send-email"));
    expect(res.status).toBe(401);
  });

  it("returns 401 for registration-toggle API without token", async () => {
    const res = await proxy(makeRequest("/api/kcah-ia-esur/registration-toggle"));
    expect(res.status).toBe(401);
  });

  // ─── Missing Secret ──────────────────────────────────

  it("rejects when ADMIN_SECRET is not set", async () => {
    delete process.env.ADMIN_SECRET;
    const res = await proxy(makeRequest("/kcah-ia-esur", "valid-token"));
    // Should redirect since secret is missing
    expect(res.status).toBe(307);
  });

  it("returns 401 for API when ADMIN_SECRET is missing", async () => {
    delete process.env.ADMIN_SECRET;
    const res = await proxy(makeRequest("/api/kcah-ia-esur/registrations", "valid-token"));
    expect(res.status).toBe(401);
  });
});
