import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies avatar image requests to avoid CORS/redirect issues.
 * GitHub avatar URLs (github.com/user.png) 302-redirect to avatars.githubusercontent.com
 * which blocks cross-origin fetch from the browser.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/png";
    const buffer = await res.arrayBuffer();

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
