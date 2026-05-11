import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const adminToken = request.cookies.get("admin_token")?.value;
  const studentToken = request.cookies.get("student_token")?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  // Admin auth logic
  if (isAdminRoute) {
    if (!adminToken && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (adminToken && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Student auth logic: If logged in, don't allow access to login/register pages
  if (studentToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If NOT logged in and trying to access profile, redirect to login
  if (!studentToken && pathname === "/profile") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register", "/profile"],
};
