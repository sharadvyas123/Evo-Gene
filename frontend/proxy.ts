import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/signup"];

// ✅ Function name must match file name ("proxy")
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value || null;

  // 🚫 If user not logged in and trying to access protected route
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔒 If already logged in, block access to login/signup
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Otherwise allow
  return NextResponse.next();
}

// ✅ Define which routes should be handled by proxy
export const config = {
  matcher: ["/", "/dashboard", "/login", "/signup"],
};
