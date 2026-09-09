import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cheap presence check only (no crypto here — Edge runtime). The
// authoritative signature/expiry check happens server-side in
// src/app/admin/(dashboard)/layout.tsx, which always runs in Node.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const hasSession = request.cookies.has("stride_admin_session");
  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
