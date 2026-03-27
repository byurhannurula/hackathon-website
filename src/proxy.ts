import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip the login page itself
  if (pathname === "/kcah-ia-esur/login") {
    return NextResponse.next();
  }

  // Skip the auth API (needs to be accessible to log in)
  if (pathname === "/api/kcah-ia-esur/auth") {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_SECRET;

  if (!token || !secret || !(await verifyAdminToken(token, secret))) {
    // API routes get 401, pages get redirected to login
    if (pathname.startsWith("/api/kcah-ia-esur")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/kcah-ia-esur/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/kcah-ia-esur/:path*", "/api/kcah-ia-esur/:path*"],
};
