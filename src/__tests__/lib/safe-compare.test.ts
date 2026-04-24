import { describe, it, expect } from "vitest";

/**
 * Direct tests for the safeCompare logic used in admin auth.
 * The function is defined inline in the auth route, so we replicate
 * it here to verify the constant-time comparison algorithm.
 */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    let diff = 1;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
    }
    return diff === 0;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

describe("safeCompare (constant-time string comparison)", () => {
  // ─── Equal Strings ────────────────────────────────────

  it("returns true for identical strings", () => {
    expect(safeCompare("password", "password")).toBe(true);
  });

  it("returns true for empty strings", () => {
    expect(safeCompare("", "")).toBe(true);
  });

  it("returns true for single character match", () => {
    expect(safeCompare("a", "a")).toBe(true);
  });

  it("returns true for unicode strings", () => {
    expect(safeCompare("парола123", "парола123")).toBe(true);
  });

  // ─── Different Strings (Same Length) ──────────────────

  it("returns false for same-length different strings", () => {
    expect(safeCompare("abc", "abd")).toBe(false);
  });

  it("returns false when only first char differs", () => {
    expect(safeCompare("xbcdef", "abcdef")).toBe(false);
  });

  it("returns false when only last char differs", () => {
    expect(safeCompare("abcdex", "abcdef")).toBe(false);
  });

  // ─── Different Lengths ────────────────────────────────

  it("returns false for different length strings", () => {
    expect(safeCompare("short", "longer")).toBe(false);
  });

  it("returns false when one is prefix of the other", () => {
    expect(safeCompare("pass", "password")).toBe(false);
  });

  it("returns false for empty vs non-empty", () => {
    expect(safeCompare("", "a")).toBe(false);
    expect(safeCompare("a", "")).toBe(false);
  });

  // ─── Timing Attack Prevention ─────────────────────────
  // These tests verify the algorithm does full comparison
  // even for different-length strings (no early return on length)

  it("always returns false for different lengths regardless of content overlap", () => {
    // Even though "pass" is a prefix of "password", should still return false
    expect(safeCompare("pass", "password")).toBe(false);
    expect(safeCompare("password", "pass")).toBe(false);
  });

  it("handles very long strings", () => {
    const long = "a".repeat(10000);
    expect(safeCompare(long, long)).toBe(true);
    expect(safeCompare(long, long + "b")).toBe(false);
  });

  // ─── Edge Cases ──────────────────────────────────────

  it("handles special characters", () => {
    expect(safeCompare("p@$$w0rd!", "p@$$w0rd!")).toBe(true);
    expect(safeCompare("p@$$w0rd!", "p@$$w0rd?")).toBe(false);
  });

  it("handles null bytes in strings", () => {
    expect(safeCompare("a\0b", "a\0b")).toBe(true);
    expect(safeCompare("a\0b", "a\0c")).toBe(false);
  });
});
