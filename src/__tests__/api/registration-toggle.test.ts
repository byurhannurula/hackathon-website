import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock registration-status module
vi.mock("@/lib/registration-status", () => ({
  isRegistrationOpen: vi.fn().mockResolvedValue(true),
  setRegistrationOpen: vi.fn().mockResolvedValue(undefined),
}));

import { GET, POST } from "@/app/api/kcah-ia-esur/registration-toggle/route";

describe("GET /api/kcah-ia-esur/registration-toggle", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns current registration open status", async () => {
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    vi.mocked(isRegistrationOpen).mockResolvedValueOnce(true);

    const res = await GET();
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.open).toBe(true);
  });

  it("returns false when registration is closed", async () => {
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    vi.mocked(isRegistrationOpen).mockResolvedValueOnce(false);

    const res = await GET();
    const json = await res.json();
    expect(json.open).toBe(false);
  });
});

describe("POST /api/kcah-ia-esur/registration-toggle", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("toggles registration to closed", async () => {
    const { isRegistrationOpen, setRegistrationOpen } = await import("@/lib/registration-status");
    vi.mocked(setRegistrationOpen).mockResolvedValueOnce(undefined);
    vi.mocked(isRegistrationOpen).mockResolvedValueOnce(false);

    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registration-toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ open: false }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.open).toBe(false);
    expect(setRegistrationOpen).toHaveBeenCalledWith(false);
  });

  it("toggles registration to open", async () => {
    const { isRegistrationOpen, setRegistrationOpen } = await import("@/lib/registration-status");
    vi.mocked(setRegistrationOpen).mockResolvedValueOnce(undefined);
    vi.mocked(isRegistrationOpen).mockResolvedValueOnce(true);

    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registration-toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ open: true }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.open).toBe(true);
  });

  it("returns 400 for non-boolean open value", async () => {
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registration-toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ open: "yes" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid value");
  });

  it("returns 400 for missing open field", async () => {
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registration-toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for numeric open value", async () => {
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registration-toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ open: 1 }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid JSON body", async () => {
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registration-toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid request");
  });
});
