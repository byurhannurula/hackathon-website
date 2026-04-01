import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST, DELETE } from "@/app/api/kcah-ia-esur/auth/route";
import { NextRequest } from "next/server";

function makePostRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/kcah-ia-esur/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/kcah-ia-esur/auth (login)", () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = "correct-password";
    process.env.ADMIN_SECRET = "test-secret-key";
  });

  afterEach(() => {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.ADMIN_SECRET;
  });

  it("returns 200 and sets cookie for correct password", async () => {
    const res = await POST(makePostRequest({ password: "correct-password" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);

    const cookie = res.cookies.get("admin-token");
    expect(cookie).toBeDefined();
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe("strict");
    expect(cookie?.path).toBe("/");
  });

  it("returns 401 for wrong password", async () => {
    const res = await POST(makePostRequest({ password: "wrong-password" }));
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.error).toBe("Грешна парола");
  });

  it("returns 401 for empty password", async () => {
    const res = await POST(makePostRequest({ password: "" }));
    expect(res.status).toBe(401);
  });

  it("returns 500 when ADMIN_PASSWORD is not configured", async () => {
    delete process.env.ADMIN_PASSWORD;
    const res = await POST(makePostRequest({ password: "anything" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Server not configured");
  });

  it("returns 500 when ADMIN_SECRET is not configured", async () => {
    delete process.env.ADMIN_SECRET;
    const res = await POST(makePostRequest({ password: "correct-password" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Server not configured");
  });

  it("handles non-string password in body", async () => {
    const res = await POST(makePostRequest({ password: 12345 }));
    expect(res.status).toBe(401);
  });

  it("handles missing password field", async () => {
    const res = await POST(makePostRequest({}));
    expect(res.status).toBe(401);
  });

  it("handles null body gracefully", async () => {
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid request");
  });

  it("sets cookie with 7-day maxAge", async () => {
    const res = await POST(makePostRequest({ password: "correct-password" }));
    const cookie = res.cookies.get("admin-token");
    expect(cookie?.maxAge).toBe(60 * 60 * 24 * 7);
  });

  it("sets secure=false in non-production", async () => {
    const res = await POST(makePostRequest({ password: "correct-password" }));
    const cookie = res.cookies.get("admin-token");
    // In test env, NODE_ENV is "test", not "production"
    expect(cookie?.secure).toBe(false);
  });
});

describe("DELETE /api/kcah-ia-esur/auth (logout)", () => {
  it("returns 200 with ok: true", async () => {
    const res = await DELETE();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("sets cookie with maxAge 0 to clear it", async () => {
    const res = await DELETE();
    const cookie = res.cookies.get("admin-token");
    expect(cookie).toBeDefined();
    expect(cookie?.value).toBe("");
    expect(cookie?.maxAge).toBe(0);
  });

  it("clears cookie with httpOnly and strict sameSite", async () => {
    const res = await DELETE();
    const cookie = res.cookies.get("admin-token");
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe("strict");
    expect(cookie?.path).toBe("/");
  });
});
