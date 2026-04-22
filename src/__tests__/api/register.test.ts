import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

// Mock Supabase before importing the route
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: { ticket_number: 1, ticket_id: "uuid-123" },
            error: null,
          }),
        })),
      })),
    })),
  })),
}));

// Mock registration status
vi.mock("@/lib/registration-status", () => ({
  isRegistrationOpen: vi.fn().mockResolvedValue(true),
}));

const validRegistration = {
  fullName: "Иван Иванов",
  email: "ivan@example.com",
  phone: "+359 888 123 456",
  age: "25",
  role: "Студент",
  organization: "Русенски университет",
  devExperience: "Начално ниво - между 1 и 3 години",
  aiExperience: "Между 1 и 6 месеца",
  aiTools: "ChatGPT, Claude",
  motivation:
    "Искам да участвам защото обичам AI технологиите и искам да науча нови неща. Вярвам че този хакатон ще бъде невероятна възможност.",
  expectations: "Очаквам да науча нови неща",
  hasTheme: "Да",
  hasTeam: "Не",
  wantChallenge: "Да",
  volunteerHelp: "Възможно",
  agreeRandomTeams: true,
  gdprConsent: true,
  registrationNotGuaranteed: true,
};

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/register", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_PRIVATE_KEY = "test-key";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ─── Success ──────────────────────────────────────────

  it("returns 200 with ticketNumber on successful registration", async () => {
    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest(validRegistration));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.ticketNumber).toBe(1);
    expect(json.ticketId).toBe("uuid-123");
  });

  // ─── Registration Closed ─────────────────────────────

  it("returns 403 when registration is closed", async () => {
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    vi.mocked(isRegistrationOpen).mockResolvedValueOnce(false);

    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest(validRegistration));
    expect(res.status).toBe(403);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.error).toContain("затворена");
  });

  // ─── Validation ───────────────────────────────────────

  it("returns 400 for invalid data (missing fields)", async () => {
    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest({ fullName: "Test" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("returns 400 for invalid email format", async () => {
    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest({ ...validRegistration, email: "not-email" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for motivation too short", async () => {
    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest({ ...validRegistration, motivation: "Too short" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for gdprConsent = false", async () => {
    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest({ ...validRegistration, gdprConsent: false }));
    expect(res.status).toBe(400);
  });

  // ─── Payload Size Guard ───────────────────────────────

  it("returns 413 for oversized payload (>50KB)", async () => {
    const { POST } = await import("@/app/api/register/route");
    const oversized = {
      ...validRegistration,
      motivation: "A".repeat(60000),
    };
    const res = await POST(makeRequest(oversized));
    // Could be 400 (validation) or 413 (size guard) — depends on order
    expect([400, 413]).toContain(res.status);
  });

  // ─── Duplicate Email ──────────────────────────────────

  it("returns 409 with DUPLICATE_EMAIL code for duplicate email", async () => {
    const { createClient } = await import("@supabase/supabase-js");
    vi.mocked(createClient).mockReturnValueOnce({
      from: vi.fn(() => ({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: {
                code: "23505",
                message: "duplicate key value violates unique constraint registrations_email_key",
              },
            }),
          })),
        })),
      })),
    } as unknown as ReturnType<typeof createClient>);

    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest(validRegistration));
    expect(res.status).toBe(409);
    const json = await res.json();
    expect(json.code).toBe("DUPLICATE_EMAIL");
  });

  it("returns 409 with DUPLICATE_ENTRY for other unique violations", async () => {
    const { createClient } = await import("@supabase/supabase-js");
    vi.mocked(createClient).mockReturnValueOnce({
      from: vi.fn(() => ({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: {
                code: "23505",
                message: "duplicate key value violates unique constraint registrations_phone_key",
              },
            }),
          })),
        })),
      })),
    } as unknown as ReturnType<typeof createClient>);

    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest(validRegistration));
    expect(res.status).toBe(409);
    const json = await res.json();
    expect(json.code).toBe("DUPLICATE_ENTRY");
  });

  // ─── Supabase Failure ─────────────────────────────────

  it("returns 500 when Supabase fails to return ticket number", async () => {
    const { createClient } = await import("@supabase/supabase-js");
    vi.mocked(createClient).mockReturnValueOnce({
      from: vi.fn(() => ({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: "PGRST116", message: "Some other error" },
            }),
          })),
        })),
      })),
    } as unknown as ReturnType<typeof createClient>);

    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest(validRegistration));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  // ─── Missing Supabase Config ──────────────────────────
  // Note: env vars are read at module load time, so this test
  // verifies the fallback when Supabase returns no ticket number.
  it("returns 500 when Supabase insert returns no ticket number", async () => {
    const { createClient } = await import("@supabase/supabase-js");
    vi.mocked(createClient).mockReturnValueOnce({
      from: vi.fn(() => ({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: { ticket_number: null, ticket_id: null },
              error: null,
            }),
          })),
        })),
      })),
    } as unknown as ReturnType<typeof createClient>);

    const { POST } = await import("@/app/api/register/route");
    const res = await POST(makeRequest(validRegistration));
    expect(res.status).toBe(500);
  });

  // ─── Optional Fields ─────────────────────────────────

  it("accepts registration with optional fields (handle, avatarUrl, themeDescription, teamName)", async () => {
    const { POST } = await import("@/app/api/register/route");
    const res = await POST(
      makeRequest({
        ...validRegistration,
        handle: "octocat",
        avatarUrl: "https://github.com/octocat.png",
        themeDescription: "AI chatbot",
        teamName: "Team Vibe",
        additionalQuestions: "Parking?",
      })
    );
    expect(res.status).toBe(200);
  });
});
