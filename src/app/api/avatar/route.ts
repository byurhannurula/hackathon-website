import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies avatar image requests to avoid CORS/redirect issues.
 * GitHub avatar URLs (github.com/user.png) 302-redirect to avatars.githubusercontent.com
 * which blocks cross-origin fetch from the browser.
 */
const ALLOWED_HOSTS = new Set([
  "github.com",
  "avatars.githubusercontent.com",
  "gravatar.com",
  "www.gravatar.com",
  "i.pravatar.cc",
]);

const MAX_RESPONSE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  // Validate URL to prevent SSRF
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
  }

  // Strict hostname matching — no subdomain wildcards
  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
  }

  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }

    // Guard against oversized responses before buffering
    const contentLength = res.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_SIZE) {
      return NextResponse.json({ error: "Image too large" }, { status: 413 });
    }

    const buffer = await res.arrayBuffer();

    // Double-check actual size (content-length can be absent or wrong)
    if (buffer.byteLength > MAX_RESPONSE_SIZE) {
      return NextResponse.json({ error: "Image too large" }, { status: 413 });
    }

    const contentType = res.headers.get("content-type") || "image/png";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch avatar" }, { status: 502 });
  }
}
