import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock Supabase
const mockRpc = vi.fn();
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    rpc: mockRpc,
  })),
}));

import { GET } from "@/app/api/count/route";

describe("GET /api/count", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_PRIVATE_KEY = "test-key";
    mockRpc.mockResolvedValue({ data: 42, error: null });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the registration count", async () => {
    const res = await GET();
    const json = await res.json();
    expect(json.count).toBe(42);
    expect(res.status).toBe(200);
  });

  it("calls the get_registration_count RPC", async () => {
    await GET();
    expect(mockRpc).toHaveBeenCalledWith("get_registration_count");
  });

  it("sets cache-control header", async () => {
    const res = await GET();
    expect(res.headers.get("cache-control")).toContain("s-maxage=30");
  });

  it("returns 0 when Supabase is not configured", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_PRIVATE_KEY;
    // Need to re-import since env vars are read at call time
    const { GET: freshGET } = await import("@/app/api/count/route");
    const res = await freshGET();
    const json = await res.json();
    expect(json.count).toBe(0);
  });

  it("returns 0 on RPC error", async () => {
    mockRpc.mockResolvedValue({ data: null, error: { message: "Function not found" } });
    const res = await GET();
    const json = await res.json();
    expect(json.count).toBe(0);
    expect(res.status).toBe(200);
  });

  it("returns 0 when RPC throws", async () => {
    mockRpc.mockRejectedValue(new Error("Connection refused"));
    const res = await GET();
    const json = await res.json();
    expect(json.count).toBe(0);
    expect(res.status).toBe(200);
  });

  it("returns 0 when data is null", async () => {
    mockRpc.mockResolvedValue({ data: null, error: null });
    const res = await GET();
    const json = await res.json();
    expect(json.count).toBe(0);
  });

  it("never exposes errors to the client (always returns count)", async () => {
    mockRpc.mockRejectedValue(new Error("Internal"));
    const res = await GET();
    const json = await res.json();
    // Should always return a count field, never an error field
    expect(json).toHaveProperty("count");
    expect(json).not.toHaveProperty("error");
  });
});
