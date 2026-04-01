import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

// Mock Resend — must be a class since the route uses `new Resend()`
const mockSend = vi.fn().mockResolvedValue({ error: null });
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

// Mock supabase-admin
vi.mock("@/lib/supabase-admin", () => ({
  createAdminClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: { id: "uuid-1", email: "test@example.com" },
          }),
        })),
      })),
    })),
  })),
}));

// Mock email templates
vi.mock("@/emails/approved", () => ({
  ApprovedEmail: vi.fn(() => null),
}));
vi.mock("@/emails/rejected", () => ({
  RejectedEmail: vi.fn(() => null),
}));

import { POST } from "@/app/api/kcah-ia-esur/send-email/route";

const validBody = {
  registrationId: "550e8400-e29b-41d4-a716-446655440000",
  email: "test@example.com",
  fullName: "Test User",
  status: "approved" as const,
  ticketNumber: 42,
  ticketId: "abc-123",
};

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/kcah-ia-esur/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/kcah-ia-esur/send-email", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.EMAIL_FROM = "noreply@ruseaihack.com";
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_PRIVATE_KEY = "test-key";
    mockSend.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_FROM;
  });

  // ─── Success ──────────────────────────────────────────

  it("sends approved email successfully", async () => {
    const res = await POST(makeRequest(validBody));
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it("sends rejected email successfully", async () => {
    const res = await POST(makeRequest({ ...validBody, status: "rejected" }));
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("uses correct subject for approved email", async () => {
    await POST(makeRequest(validBody));
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining("одобрена"),
      })
    );
  });

  it("uses correct subject for rejected email", async () => {
    await POST(makeRequest({ ...validBody, status: "rejected" }));
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining("Относно"),
      })
    );
  });

  it("sends to the correct recipient", async () => {
    await POST(makeRequest(validBody));
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "test@example.com",
      })
    );
  });

  // ─── Missing Config ──────────────────────────────────

  it("returns 500 when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Email not configured");
  });

  it("returns 500 when EMAIL_FROM is missing", async () => {
    delete process.env.EMAIL_FROM;
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
  });

  // ─── Validation ───────────────────────────────────────

  it("returns 400 for invalid data (missing fields)", async () => {
    const res = await POST(makeRequest({ email: "test@example.com" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid data");
  });

  it("returns 400 for invalid registrationId (not UUID)", async () => {
    const res = await POST(makeRequest({ ...validBody, registrationId: "not-a-uuid" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "not-email" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid status", async () => {
    const res = await POST(makeRequest({ ...validBody, status: "pending" }));
    expect(res.status).toBe(400);
  });

  // ─── Registration Verification ────────────────────────

  it("returns 404 when registration does not exist", async () => {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    vi.mocked(createAdminClient).mockReturnValueOnce({
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: null }),
          })),
        })),
      })),
    } as any);

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error).toBe("Registration not found");
  });

  it("returns 404 when email does not match registration", async () => {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    vi.mocked(createAdminClient).mockReturnValueOnce({
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: { id: "uuid-1", email: "different@example.com" },
            }),
          })),
        })),
      })),
    } as any);

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(404);
  });

  // ─── Resend Errors ────────────────────────────────────

  it("returns 500 when Resend returns an error", async () => {
    mockSend.mockResolvedValueOnce({ error: { message: "Rate limited" } });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Failed to send email");
  });

  it("returns 500 when Resend throws", async () => {
    mockSend.mockRejectedValueOnce(new Error("Network error"));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
  });

  // ─── Invalid JSON ────────────────────────────────────

  it("returns 500 for invalid JSON body", async () => {
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
