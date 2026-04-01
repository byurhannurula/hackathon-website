import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useClipboard } from "@/hooks";

describe("useClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("starts with copied as false", () => {
    const { result } = renderHook(() => useClipboard());
    expect(result.current.copied).toBe(false);
  });

  it("sets copied to true after copy", () => {
    const { result } = renderHook(() => useClipboard());
    act(() => {
      result.current.copy("hello");
    });
    expect(result.current.copied).toBe(true);
  });

  it("calls navigator.clipboard.writeText with the text", () => {
    const { result } = renderHook(() => useClipboard());
    act(() => {
      result.current.copy("test text");
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test text");
  });

  it("resets copied to false after default timeout (2000ms)", () => {
    const { result } = renderHook(() => useClipboard());
    act(() => {
      result.current.copy("hello");
    });
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.copied).toBe(false);
  });

  it("respects custom timeout", () => {
    const { result } = renderHook(() => useClipboard(500));
    act(() => {
      result.current.copy("hello");
    });
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.copied).toBe(false);
  });

  it("does not reset early with default timeout", () => {
    const { result } = renderHook(() => useClipboard());
    act(() => {
      result.current.copy("hello");
    });

    act(() => {
      vi.advanceTimersByTime(1999);
    });
    expect(result.current.copied).toBe(true);
  });
});
