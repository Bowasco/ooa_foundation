import { NextResponse } from "next/server";

export function middleware(request) {
  const isAdmin = request.cookies.get("admin-auth");

  if (request.nextUrl.pathname.startsWith("/dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  if (request.nextUrl.pathname === "/admin-login" && isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
