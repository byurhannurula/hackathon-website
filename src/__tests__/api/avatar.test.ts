import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/avatar/route";
import { NextRequest } from "next/server";

function makeRequest(urlParam?: string): NextRequest {
  const base = "http://localhost:3000/api/avatar";
  const url = urlParam ? `${base}?url=${encodeURIComponent(urlParam)}` : base;
  return new NextRequest(url);
}

describe("GET /api/avatar", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // ─── Missing / Invalid URL ─────────────────────────────

  it("returns 400 when url param is missing", async () => {
    const res = await GET(makeRequest());
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Missing url param");
  });

  it("returns 400 for invalid URL", async () => {
    const res = await GET(makeRequest("not-a-valid-url"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid URL");
  });

  it("returns 400 for non-http protocol (ftp)", async () => {
    const res = await GET(makeRequest("ftp://github.com/user.png"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid protocol");
  });

  it("returns 400 for file:// protocol (SSRF prevention)", async () => {
    const res = await GET(makeRequest("file:///etc/passwd"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid protocol");
  });

  // ─── SSRF Prevention — Domain Allowlist ────────────────

  it("returns 403 for disallowed domain", async () => {
    const res = await GET(makeRequest("https://evil.com/avatar.png"));
    expect(res.status).toBe(403);
    const json = await res.json();
    expect(json.error).toBe("Domain not allowed");
  });

  it("returns 403 for subdomain of allowed domain (no wildcards)", async () => {
    const res = await GET(makeRequest("https://sub.github.com/avatar.png"));
    expect(res.status).toBe(403);
  });

  it("returns 403 for localhost (SSRF prevention)", async () => {
    const res = await GET(makeRequest("https://localhost/avatar.png"));
    expect(res.status).toBe(403);
  });

  it("returns 403 for IP address (SSRF prevention)", async () => {
    const res = await GET(makeRequest("https://127.0.0.1/avatar.png"));
    expect(res.status).toBe(403);
  });

  it("returns 403 for internal network IPs", async () => {
    const res = await GET(makeRequest("https://192.168.1.1/avatar.png"));
    expect(res.status).toBe(403);
  });

  // ─── Allowed Hosts ────────────────────────────────────

  it("allows github.com", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "image/png" }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)),
      })
    );
    const res = await GET(makeRequest("https://github.com/octocat.png"));
    expect(res.status).toBe(200);
  });

  it("allows avatars.githubusercontent.com", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "image/jpeg" }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(50)),
      })
    );
    const res = await GET(makeRequest("https://avatars.githubusercontent.com/u/12345"));
    expect(res.status).toBe(200);
  });

  it("allows gravatar.com", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "image/png" }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(50)),
      })
    );
    const res = await GET(makeRequest("https://gravatar.com/avatar/abc"));
    expect(res.status).toBe(200);
  });

  it("allows www.gravatar.com", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "image/png" }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(50)),
      })
    );
    const res = await GET(makeRequest("https://www.gravatar.com/avatar/abc"));
    expect(res.status).toBe(200);
  });

  it("allows i.pravatar.cc", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "image/jpeg" }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(50)),
      })
    );
    const res = await GET(makeRequest("https://i.pravatar.cc/300"));
    expect(res.status).toBe(200);
  });

  // ─── Size Limits ──────────────────────────────────────

  it("returns 413 when content-length exceeds 5MB", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-length": String(6 * 1024 * 1024) }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)),
      })
    );
    const res = await GET(makeRequest("https://github.com/large.png"));
    expect(res.status).toBe(413);
    const json = await res.json();
    expect(json.error).toBe("Image too large");
  });

  it("returns 413 when actual buffer size exceeds 5MB", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({}), // No content-length header
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(6 * 1024 * 1024)),
      })
    );
    const res = await GET(makeRequest("https://github.com/huge.png"));
    expect(res.status).toBe(413);
  });

  it("allows images at exactly 5MB", async () => {
    const fiveMB = 5 * 1024 * 1024;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "image/png", "content-length": String(fiveMB) }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(fiveMB)),
      })
    );
    const res = await GET(makeRequest("https://github.com/exact5mb.png"));
    expect(res.status).toBe(200);
  });

  // ─── Response Headers ─────────────────────────────────

  it("sets cache-control header with 24h max-age", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "image/png" }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)),
      })
    );
    const res = await GET(makeRequest("https://github.com/octocat.png"));
    expect(res.headers.get("cache-control")).toContain("max-age=86400");
    expect(res.headers.get("cache-control")).toContain("immutable");
  });

  it("passes through content-type from upstream", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "image/webp" }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)),
      })
    );
    const res = await GET(makeRequest("https://github.com/avatar.webp"));
    expect(res.headers.get("content-type")).toBe("image/webp");
  });

  it("defaults content-type to image/png when not provided", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({}),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)),
      })
    );
    const res = await GET(makeRequest("https://github.com/no-type.png"));
    expect(res.headers.get("content-type")).toBe("image/png");
  });

  it("rejects non-image content-type (XSS prevention)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "text/html" }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)),
      })
    );
    const res = await GET(makeRequest("https://github.com/evil.html"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Not an image");
  });

  it("rejects application/javascript content-type", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "application/javascript" }),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)),
      })
    );
    const res = await GET(makeRequest("https://github.com/script.js"));
    expect(res.status).toBe(400);
  });

  // ─── Upstream Errors ──────────────────────────────────

  it("returns upstream status when fetch is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        headers: new Headers({}),
      })
    );
    const res = await GET(makeRequest("https://github.com/nonexistent.png"));
    expect(res.status).toBe(404);
  });

  it("returns 502 when fetch throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Connection refused")));
    const res = await GET(makeRequest("https://github.com/error.png"));
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.error).toBe("Failed to fetch avatar");
  });
});
