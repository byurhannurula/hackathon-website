import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// The hook has module-level shared state (count cache, poll timer, subscribers).
// Re-import the module fresh for each test.
describe("useLiveCount", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ count: 42 }),
      })
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("starts with null count", async () => {
    const { useLiveCount } = await import("@/hooks/use-live-count");
    const { result } = renderHook(() => useLiveCount());
    expect(result.current).toBeNull();
  });

  it("fetches count on mount", async () => {
    const { useLiveCount } = await import("@/hooks/use-live-count");
    renderHook(() => useLiveCount());
    await vi.advanceTimersByTimeAsync(0);
    expect(fetch).toHaveBeenCalledWith("/api/count");
  });

  it("updates count after fetch resolves", async () => {
    vi.useRealTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ count: 42 }),
      })
    );
    const { useLiveCount } = await import("@/hooks/use-live-count");
    const { result } = renderHook(() => useLiveCount());
    await waitFor(() => {
      expect(result.current).toBe(42);
    });
    vi.useFakeTimers();
  });

  it("polls at the specified interval", async () => {
    const { useLiveCount } = await import("@/hooks/use-live-count");
    renderHook(() => useLiveCount(true, 5000));
    await vi.advanceTimersByTimeAsync(0);
    expect(fetch).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(5000);
    expect(fetch).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(5000);
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it("does not fetch when disabled", async () => {
    const { useLiveCount } = await import("@/hooks/use-live-count");
    renderHook(() => useLiveCount(false));
    await vi.advanceTimersByTimeAsync(60000);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("cleans up interval on unmount", async () => {
    const { useLiveCount } = await import("@/hooks/use-live-count");
    const { unmount } = renderHook(() => useLiveCount(true, 5000));
    await vi.advanceTimersByTimeAsync(0);
    expect(fetch).toHaveBeenCalledTimes(1);

    unmount();
    await vi.advanceTimersByTimeAsync(15000);
    // Should not have been called again after unmount
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("handles fetch errors silently", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));
    const { useLiveCount } = await import("@/hooks/use-live-count");
    const { result } = renderHook(() => useLiveCount());
    await vi.advanceTimersByTimeAsync(0);
    // Count should remain null
    expect(result.current).toBeNull();
  });

  it("handles non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const { useLiveCount } = await import("@/hooks/use-live-count");
    const { result } = renderHook(() => useLiveCount());
    await vi.advanceTimersByTimeAsync(0);
    expect(result.current).toBeNull();
  });

  it("ignores response with non-number count", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ count: "not-a-number" }),
      })
    );
    const { useLiveCount } = await import("@/hooks/use-live-count");
    const { result } = renderHook(() => useLiveCount());
    await vi.advanceTimersByTimeAsync(0);
    expect(result.current).toBeNull();
  });
});
