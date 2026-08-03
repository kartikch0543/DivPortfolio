import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes check
  const isCmsRoute = pathname.startsWith("/cms");
  const isProfileRoute = pathname.startsWith("/profile");

  if (isCmsRoute || isProfileRoute) {
    // Check for auth token in cookies or headers (Supabase auth cookie / header adapter)
    const token = request.cookies.get("kd_arcade_token")?.value;

    // For demo/development, if no token, allow default admin access or redirect to /login
    // In production with Supabase, verify token and user role
    if (!token && process.env.NODE_ENV === "production") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*", "/profile/:path*"],
};
