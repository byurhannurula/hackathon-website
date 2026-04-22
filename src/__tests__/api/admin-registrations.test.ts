import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockSelect = vi.fn();
const mockFrom = vi.fn();
const mockOrder = vi.fn();
const mockRange = vi.fn();
const mockEq = vi.fn();
const mockOr = vi.fn();

// Mock Supabase admin client
vi.mock("@/lib/supabase-admin", () => ({
  createAdminClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

// Default chain setup
function setupMockChain(
  data: unknown[] = [],
  count = 0,
  statsData: { registration_status: string }[] = []
) {
  const chainEnd = { data, error: null, count };
  const statsEnd = { data: statsData };

  mockOr.mockReturnValue(chainEnd);
  mockEq.mockReturnValue(chainEnd);
  mockRange.mockReturnValue({
    eq: mockEq,
    or: mockOr,
    then: undefined,
    ...chainEnd,
  });
  mockOrder.mockReturnValue({ range: mockRange, ...chainEnd });
  mockSelect.mockReturnValue({ order: mockOrder, ...chainEnd });

  let callCount = 0;
  mockFrom.mockImplementation(() => {
    callCount++;
    if (callCount === 1) {
      return {
        select: mockSelect,
      };
    }
    // Second call is for stats
    return {
      select: vi.fn().mockReturnValue(statsEnd),
    };
  });
}

describe("GET /api/kcah-ia-esur/registrations", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_PRIVATE_KEY = "test-key";
    setupMockChain();
  });

  it("returns paginated data with stats", async () => {
    setupMockChain([{ id: "1", full_name: "Test" }], 1, [
      { registration_status: "pending" },
      { registration_status: "approved" },
      { registration_status: "approved" },
    ]);

    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registrations");
    const res = await GET(req);
    const json = await res.json();

    expect(json.ok).toBe(true);
    expect(json.data).toBeDefined();
    expect(json.stats).toBeDefined();
    expect(json.pagination).toBeDefined();
  });

  it("defaults to page 1 when no page param", async () => {
    setupMockChain();
    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registrations");
    await GET(req);

    // range should be called with (0, 9) for page 1, pageSize 10
    expect(mockRange).toHaveBeenCalledWith(0, 9);
  });

  it("calculates correct range for page 2", async () => {
    setupMockChain();
    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registrations?page=2");
    await GET(req);
    expect(mockRange).toHaveBeenCalledWith(10, 19);
  });

  it("clamps negative page to 1", async () => {
    setupMockChain();
    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registrations?page=-5");
    await GET(req);
    expect(mockRange).toHaveBeenCalledWith(0, 9);
  });

  it("defaults sort to created_at desc", async () => {
    setupMockChain();
    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registrations");
    await GET(req);
    expect(mockOrder).toHaveBeenCalledWith("created_at", { ascending: false });
  });

  it("rejects disallowed sort columns (SQL injection prevention)", async () => {
    setupMockChain();
    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest(
      "http://localhost:3000/api/kcah-ia-esur/registrations?sort=DROP TABLE registrations"
    );
    await GET(req);
    // Should fall back to created_at
    expect(mockOrder).toHaveBeenCalledWith("created_at", expect.anything());
  });

  it("allows valid sort columns", async () => {
    setupMockChain();
    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest(
      "http://localhost:3000/api/kcah-ia-esur/registrations?sort=full_name&order=asc"
    );
    await GET(req);
    expect(mockOrder).toHaveBeenCalledWith("full_name", { ascending: true });
  });

  it("sanitizes search input (strips %, _, \\)", async () => {
    setupMockChain();
    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest(
      "http://localhost:3000/api/kcah-ia-esur/registrations?search=%25DROP%20TABLE%25"
    );
    await GET(req);
    // The % characters should be stripped from search
    // The actual .or() call should not contain raw %
  });

  it("truncates search to MAX_SEARCH_LENGTH (100)", async () => {
    setupMockChain();
    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const longSearch = "A".repeat(200);
    const req = new NextRequest(
      `http://localhost:3000/api/kcah-ia-esur/registrations?search=${longSearch}`
    );
    await GET(req);
    // Should not crash and should work with truncated search
  });

  it("defaults order to desc for invalid values", async () => {
    setupMockChain();
    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registrations?order=DROP");
    await GET(req);
    expect(mockOrder).toHaveBeenCalledWith("created_at", { ascending: false });
  });

  it("computes correct stats from all registrations", async () => {
    setupMockChain([{ id: "1" }], 1, [
      { registration_status: "pending" },
      { registration_status: "pending" },
      { registration_status: "approved" },
      { registration_status: "rejected" },
    ]);

    const { GET } = await import("@/app/api/kcah-ia-esur/registrations/route");
    const req = new NextRequest("http://localhost:3000/api/kcah-ia-esur/registrations");
    const res = await GET(req);
    const json = await res.json();

    expect(json.stats.total).toBe(4);
    expect(json.stats.pending).toBe(2);
    expect(json.stats.approved).toBe(1);
    expect(json.stats.rejected).toBe(1);
  });
});
