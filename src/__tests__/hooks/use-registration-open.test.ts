import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// The hook has a module-level `cached` variable that persists between tests.
// We need to re-import the module fresh for each test.
describe("useRegistrationOpen", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ open: true }),
      })
    );
  });

  it("defaults to false before fetch completes", async () => {
    const { useRegistrationOpen } = await import("@/hooks/use-registration-open");
    const { result } = renderHook(() => useRegistrationOpen());
    expect(result.current).toBe(false);
  });

  it("fetches from /api/registration-status on mount", async () => {
    const { useRegistrationOpen } = await import("@/hooks/use-registration-open");
    renderHook(() => useRegistrationOpen());
    expect(fetch).toHaveBeenCalledWith("/api/registration-status");
  });

  it("updates to false when API returns open: false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ open: false }),
      })
    );
    const { useRegistrationOpen } = await import("@/hooks/use-registration-open");
    const { result } = renderHook(() => useRegistrationOpen());
    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("caches the result for subsequent calls", async () => {
    const { useRegistrationOpen } = await import("@/hooks/use-registration-open");
    const { result: first } = renderHook(() => useRegistrationOpen());
    await waitFor(() => {
      expect(first.current).toBe(true);
    });

    // Second call should use cache, not fetch again
    const fetchCount = (fetch as ReturnType<typeof vi.fn>).mock.calls.length;
    renderHook(() => useRegistrationOpen());
    expect((fetch as ReturnType<typeof vi.fn>).mock.calls.length).toBe(fetchCount);
  });

  it("handles fetch errors gracefully, staying at default", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));
    const { useRegistrationOpen } = await import("@/hooks/use-registration-open");
    const { result } = renderHook(() => useRegistrationOpen());
    // Should stay at default (false) even after error
    expect(result.current).toBe(false);
  });
});
