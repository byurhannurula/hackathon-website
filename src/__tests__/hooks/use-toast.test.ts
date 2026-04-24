import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useToast } from "@/hooks";

describe("useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with null toast", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toast).toBeNull();
  });

  it("shows a toast with correct message and type", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show("Success!", "ok");
    });

    expect(result.current.toast).toEqual({ message: "Success!", type: "ok" });
  });

  it("shows error toast", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show("Something failed", "error");
    });

    expect(result.current.toast).toEqual({ message: "Something failed", type: "error" });
  });

  it("auto-dismisses after default duration (3000ms)", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show("Temporary", "ok");
    });

    expect(result.current.toast).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.toast).toBeNull();
  });

  it("auto-dismisses after custom duration", () => {
    const { result } = renderHook(() => useToast(1000));

    act(() => {
      result.current.show("Quick", "ok");
    });

    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(result.current.toast).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.toast).toBeNull();
  });
});
