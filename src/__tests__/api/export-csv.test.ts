import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase-admin", () => ({
  createAdminClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn().mockResolvedValue({
          data: [
            {
              ticket_number: 1,
              ticket_id: "uuid-1",
              full_name: "Test User",
              email: "test@example.com",
              phone: "+359888123456",
              age: "25",
              role: "Developer",
              organization: "Test Org",
              dev_experience: "3-5",
              ai_experience: "Mid",
              ai_tools: "ChatGPT",
              motivation: "I want to learn",
              expectations: "Learn new things",
              has_theme: "Да",
              theme_description: null,
              has_team: "Не",
              team_name: null,
              want_challenge: "Да",
              volunteer_help: "Не",
              github_handle: "testuser",
              avatar_url: null,
              registration_status: "pending",
              notes: null,
              created_at: "2026-01-01T00:00:00Z",
              status_updated_at: null,
            },
          ],
          error: null,
        }),
      })),
    })),
  })),
}));

import { GET } from "@/app/api/kcah-ia-esur/export-csv/route";

describe("GET /api/kcah-ia-esur/export-csv", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_PRIVATE_KEY = "test-key";
  });

  it("returns CSV content type", async () => {
    const res = await GET();
    expect(res.headers.get("content-type")).toContain("text/csv");
  });

  it("includes content-disposition header with filename", async () => {
    const res = await GET();
    expect(res.headers.get("content-disposition")).toContain("registrations-");
    expect(res.headers.get("content-disposition")).toContain(".csv");
  });

  it("includes header row", async () => {
    const res = await GET();
    const csv = await res.text();
    const headerLine = csv.split("\n")[0];
    expect(headerLine).toContain("ticket_number");
    expect(headerLine).toContain("full_name");
    expect(headerLine).toContain("email");
  });

  it("includes data rows", async () => {
    const res = await GET();
    const csv = await res.text();
    const lines = csv.split("\n");
    expect(lines.length).toBe(2); // header + 1 data row
    expect(lines[1]).toContain("Test User");
    expect(lines[1]).toContain("test@example.com");
  });

  // ─── Formula Injection Prevention ────────────────────

  it("prefixes cells starting with = to prevent formula injection", async () => {
    const { createAdminClient } = await import("@/lib/supabase-admin");
    vi.mocked(createAdminClient).mockReturnValueOnce({
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          order: vi.fn().mockResolvedValue({
            data: [
              {
                ticket_number: 1,
                ticket_id: "uuid-1",
                full_name: '=CMD("calc")',
                email: "test@example.com",
                phone: "",
                age: "",
                role: "",
                organization: "",
                dev_experience: "",
                ai_experience: "",
                ai_tools: "",
                motivation: "+HYPERLINK",
                expectations: "-1+1",
                has_theme: "",
                theme_description: null,
                has_team: "",
                team_name: null,
                want_challenge: "",
                volunteer_help: "",
                github_handle: "",
                avatar_url: null,
                registration_status: "pending",
                notes: "@SUM(A1:A10)",
                created_at: "2026-01-01",
                status_updated_at: null,
              },
            ],
            error: null,
          }),
        })),
      })),
    } as unknown as ReturnType<typeof createAdminClient>);

    const res = await GET();
    const csv = await res.text();
    const dataLine = csv.split("\n")[1];

    // None of the dangerous chars should appear at the start of a cell value
    // They should all be prefixed with a tab
    expect(dataLine).not.toMatch(/(?:^|,)=/);
    expect(dataLine).not.toMatch(/(?:^|,)\+/);
    expect(dataLine).not.toMatch(/(?:^|,)-/);
    expect(dataLine).not.toMatch(/(?:^|,)@/);
  });
});
