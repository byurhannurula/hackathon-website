import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock html-to-image
vi.mock("html-to-image", () => ({
  toPng: vi.fn().mockResolvedValue("data:image/png;base64,fakedata"),
}));

// Mock fetchAvatarAsBase64
vi.mock("@/lib", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib")>();
  return {
    ...actual,
    fetchAvatarAsBase64: vi.fn().mockResolvedValue("data:image/png;base64,avatar"),
  };
});

// Mock siteConfig
vi.mock("@/constants", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/constants")>();
  return {
    ...actual,
    siteConfig: {
      ...actual.siteConfig,
      event: { name: "RUSE AI HACK 26" },
    },
  };
});

import { useTicketDownload } from "@/hooks/use-ticket-download";

describe("useTicketDownload", () => {
  it("starts with downloading as false", () => {
    const { result } = renderHook(() => useTicketDownload(42));
    expect(result.current.downloading).toBe(false);
  });

  it("starts with exporting as false", () => {
    const { result } = renderHook(() => useTicketDownload(42));
    expect(result.current.exporting).toBe(false);
  });

  it("returns a nodeRef", () => {
    const { result } = renderHook(() => useTicketDownload(42));
    expect(result.current.nodeRef).toBeDefined();
    expect(result.current.nodeRef.current).toBeNull();
  });

  it("returns a download function", () => {
    const { result } = renderHook(() => useTicketDownload(42));
    expect(typeof result.current.download).toBe("function");
  });

  it("does not crash when download is called without a nodeRef", async () => {
    const { result } = renderHook(() => useTicketDownload(42));
    // nodeRef.current is null, so download should bail out early
    await expect(result.current.download()).resolves.toBeUndefined();
    expect(result.current.downloading).toBe(false);
  });

  it("works without ticketNum parameter", () => {
    const { result } = renderHook(() => useTicketDownload());
    expect(result.current.downloading).toBe(false);
  });
});
