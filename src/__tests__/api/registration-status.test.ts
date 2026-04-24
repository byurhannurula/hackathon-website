import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/registration-status", () => ({
  isRegistrationOpen: vi.fn().mockResolvedValue(true),
}));

import { GET } from "@/app/api/registration-status/route";

describe("GET /api/registration-status", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns open: true when registration is open", async () => {
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    vi.mocked(isRegistrationOpen).mockResolvedValue(true);

    const res = await GET();
    const json = await res.json();
    expect(json.open).toBe(true);
  });

  it("returns open: false when registration is closed", async () => {
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    vi.mocked(isRegistrationOpen).mockResolvedValue(false);

    const res = await GET();
    const json = await res.json();
    expect(json.open).toBe(false);
  });

  it("returns 200 status", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
  });
});
