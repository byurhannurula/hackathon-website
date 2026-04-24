import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock supabase-admin before importing
const mockSelect = vi.fn();
const mockEq = vi.fn();
const mockSingle = vi.fn();
const mockUpsert = vi.fn();

vi.mock("@/lib/supabase-admin", () => ({
  createAdminClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: mockSelect,
      upsert: mockUpsert,
    })),
  })),
}));

describe("isRegistrationOpen", () => {
  beforeEach(() => {
    vi.resetModules();
    mockSingle.mockResolvedValue({ data: { value: "true" } });
    mockEq.mockReturnValue({ single: mockSingle });
    mockSelect.mockReturnValue({ eq: mockEq });
  });

  afterEach(() => {
    delete process.env.REGISTRATION_OPEN;
  });

  it("returns true when DB value is 'true'", async () => {
    mockSingle.mockResolvedValue({ data: { value: "true" } });
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    const result = await isRegistrationOpen();
    expect(result).toBe(true);
  });

  it("returns false when DB value is 'false'", async () => {
    mockSingle.mockResolvedValue({ data: { value: "false" } });
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    const result = await isRegistrationOpen();
    expect(result).toBe(false);
  });

  it("falls back to env var when DB fails", async () => {
    mockSelect.mockImplementation(() => {
      throw new Error("DB error");
    });
    process.env.REGISTRATION_OPEN = "false";
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    const result = await isRegistrationOpen();
    expect(result).toBe(false);
  });

  it("defaults to true when no DB and no env var", async () => {
    mockSelect.mockImplementation(() => {
      throw new Error("DB error");
    });
    delete process.env.REGISTRATION_OPEN;
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    const result = await isRegistrationOpen();
    expect(result).toBe(true);
  });

  it("falls back to env when DB returns no data", async () => {
    mockSingle.mockResolvedValue({ data: null });
    process.env.REGISTRATION_OPEN = "false";
    const { isRegistrationOpen } = await import("@/lib/registration-status");
    const result = await isRegistrationOpen();
    expect(result).toBe(false);
  });
});

describe("setRegistrationOpen", () => {
  beforeEach(() => {
    mockUpsert.mockResolvedValue({});
  });

  it("upserts true value to site_settings", async () => {
    const { setRegistrationOpen } = await import("@/lib/registration-status");
    await setRegistrationOpen(true);
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "registration_open",
        value: "true",
      })
    );
  });

  it("upserts false value to site_settings", async () => {
    const { setRegistrationOpen } = await import("@/lib/registration-status");
    await setRegistrationOpen(false);
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "registration_open",
        value: "false",
      })
    );
  });

  it("includes updated_at timestamp", async () => {
    const { setRegistrationOpen } = await import("@/lib/registration-status");
    await setRegistrationOpen(true);
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        updated_at: expect.any(String),
      })
    );
  });

  it("handles upsert error silently", async () => {
    mockUpsert.mockRejectedValue(new Error("DB error"));
    const { setRegistrationOpen } = await import("@/lib/registration-status");
    // Should not throw
    await expect(setRegistrationOpen(true)).resolves.toBeUndefined();
  });
});
