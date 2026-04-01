import { describe, it, expect, vi, beforeEach } from "vitest";
import { cn, getGithubAvatarUrl, buildShareUrl, buildSocialShareUrls } from "@/lib";

// ─── cn() ──────────────────────────────────────────────────

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-3")).toBe("px-2 py-3");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });

  it("deduplicates conflicting tailwind classes", () => {
    const result = cn("px-2", "px-4");
    expect(result).toBe("px-4");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("handles undefined and null inputs", () => {
    expect(cn(undefined, null, "visible")).toBe("visible");
  });
});

// ─── getGithubAvatarUrl() ──────────────────────────────────

describe("getGithubAvatarUrl", () => {
  it("returns github avatar URL for a handle", () => {
    expect(getGithubAvatarUrl("octocat")).toBe("https://github.com/octocat.png");
  });

  it("strips leading @ from handle", () => {
    expect(getGithubAvatarUrl("@octocat")).toBe("https://github.com/octocat.png");
  });

  it("returns empty string for empty handle", () => {
    expect(getGithubAvatarUrl("")).toBe("");
  });

  it("handles handle with special characters", () => {
    expect(getGithubAvatarUrl("user-name_123")).toBe("https://github.com/user-name_123.png");
  });
});

// ─── buildShareUrl() ───────────────────────────────────────

describe("buildShareUrl", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://ruseaihack.com");
  });

  it("builds share URL from env variable", () => {
    const url = buildShareUrl("abc-123");
    expect(url).toBe("https://ruseaihack.com/tickets/abc-123");
  });

  it("includes ticket ID in the path", () => {
    const url = buildShareUrl("550e8400-e29b-41d4-a716-446655440000");
    expect(url).toContain("/tickets/550e8400-e29b-41d4-a716-446655440000");
  });

  it("falls back to window.location.origin when env is not set", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    // In test env window may not be fully available, but the function handles it
    const url = buildShareUrl("test-id");
    expect(url).toContain("/tickets/test-id");
  });
});

// ─── buildSocialShareUrls() ────────────────────────────────

describe("buildSocialShareUrls", () => {
  const shareUrl = "https://ruseaihack.com/tickets/abc-123";

  it("returns twitter, linkedin, and facebook URLs", () => {
    const urls = buildSocialShareUrls(shareUrl);
    expect(urls).toHaveProperty("twitter");
    expect(urls).toHaveProperty("linkedin");
    expect(urls).toHaveProperty("facebook");
  });

  it("twitter URL includes intent/tweet endpoint", () => {
    const urls = buildSocialShareUrls(shareUrl);
    expect(urls.twitter).toContain("https://twitter.com/intent/tweet");
  });

  it("twitter URL includes encoded share URL", () => {
    const urls = buildSocialShareUrls(shareUrl);
    expect(urls.twitter).toContain(encodeURIComponent(shareUrl));
  });

  it("twitter URL includes hashtags", () => {
    const urls = buildSocialShareUrls(shareUrl);
    expect(urls.twitter).toContain("RuseAIHack");
  });

  it("linkedin URL uses sharing endpoint", () => {
    const urls = buildSocialShareUrls(shareUrl);
    expect(urls.linkedin).toContain("linkedin.com/sharing/share-offsite");
    expect(urls.linkedin).toContain(encodeURIComponent(shareUrl));
  });

  it("facebook URL uses sharer endpoint", () => {
    const urls = buildSocialShareUrls(shareUrl);
    expect(urls.facebook).toContain("facebook.com/sharer/sharer.php");
    expect(urls.facebook).toContain(encodeURIComponent(shareUrl));
  });

  it("facebook URL includes RuseAIHack hashtag", () => {
    const urls = buildSocialShareUrls(shareUrl);
    expect(urls.facebook).toContain(encodeURIComponent("#RuseAIHack"));
  });

  it("properly encodes special characters in share URL", () => {
    const urlWithSpecial = "https://example.com/tickets/abc def&foo=bar";
    const urls = buildSocialShareUrls(urlWithSpecial);
    expect(urls.twitter).toContain(encodeURIComponent(urlWithSpecial));
    expect(urls.linkedin).toContain(encodeURIComponent(urlWithSpecial));
  });
});
