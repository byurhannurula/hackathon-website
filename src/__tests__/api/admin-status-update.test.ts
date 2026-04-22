import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockUpdate = vi.fn();
const mockEq = vi.fn();
const mockSelectSingle = vi.fn();

vi.mock("@/lib/supabase-admin", () => ({
  createAdminClient: vi.fn(() => ({
    from: vi.fn(() => ({
      update: mockUpdate,
    })),
  })),
}));

function setupMockChain(data: unknown = { id: "1" }, error: unknown = null) {
  mockSelectSingle.mockResolvedValue({ data, error });
  mockEq.mockReturnValue({ select: vi.fn().mockReturnValue({ single: mockSelectSingle }) });
  mockUpdate.mockReturnValue({ eq: mockEq });
}

function makeRequest(
  id: string,
  body: unknown
): [NextRequest, { params: Promise<{ id: string }> }] {
  const req = new NextRequest(`http://localhost:3000/api/kcah-ia-esur/registrations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return [req, { params: Promise.resolve({ id }) }];
}

describe("PATCH /api/kcah-ia-esur/registrations/[id]", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_PRIVATE_KEY = "test-key";
    setupMockChain();
  });

  it("updates status to approved", async () => {
    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const [req, ctx] = makeRequest("uuid-1", { registration_status: "approved" });
    const res = await PATCH(req, ctx);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("updates status to rejected", async () => {
    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const [req, ctx] = makeRequest("uuid-1", { registration_status: "rejected" });
    const res = await PATCH(req, ctx);
    expect(res.status).toBe(200);
  });

  it("includes notes when provided", async () => {
    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const [req, ctx] = makeRequest("uuid-1", {
      registration_status: "approved",
      notes: "Great candidate",
    });
    await PATCH(req, ctx);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        registration_status: "approved",
        notes: "Great candidate",
      })
    );
  });

  it("sets status_updated_at timestamp", async () => {
    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const [req, ctx] = makeRequest("uuid-1", { registration_status: "approved" });
    await PATCH(req, ctx);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        status_updated_at: expect.any(String),
      })
    );
  });

  it("accepts pending status (default DB state)", async () => {
    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const [req, ctx] = makeRequest("uuid-1", { registration_status: "pending" });
    const res = await PATCH(req, ctx);
    expect(res.status).toBe(200);
  });

  it("returns 400 for invalid status (arbitrary string)", async () => {
    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const [req, ctx] = makeRequest("uuid-1", { registration_status: "unknown" });
    const res = await PATCH(req, ctx);
    expect(res.status).toBe(400);
  });

  it("returns 400 for missing registration_status", async () => {
    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const [req, ctx] = makeRequest("uuid-1", {});
    const res = await PATCH(req, ctx);
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid JSON body", async () => {
    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registrations/uuid-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });
    const res = await PATCH(req, { params: Promise.resolve({ id: "uuid-1" }) });
    expect(res.status).toBe(400);
  });

  it("returns 500 when Supabase update fails", async () => {
    setupMockChain(null, { code: "PGRST116", message: "Not found" });

    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const [req, ctx] = makeRequest("uuid-1", { registration_status: "approved" });
    const res = await PATCH(req, ctx);
    expect(res.status).toBe(500);
  });

  it("rejects notes over 2000 chars", async () => {
    const { PATCH } = await import("@/app/api/kcah-ia-esur/registrations/[id]/route");
    const [req, ctx] = makeRequest("uuid-1", {
      registration_status: "approved",
      notes: "A".repeat(2001),
    });
    const res = await PATCH(req, ctx);
    expect(res.status).toBe(400);
  });
});
