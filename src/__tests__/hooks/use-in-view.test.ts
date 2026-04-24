import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useInView } from "@/hooks";

describe("useInView", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn(() => ({
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      }))
    );
  });

  it("starts with inView as false", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.inView).toBe(false);
  });

  it("returns a ref object", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref).toHaveProperty("current");
  });

  it("ref starts as null", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.ref.current).toBeNull();
  });
});
