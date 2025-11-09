import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Public pages that don't require login
const publicPaths = ["/login", "/signup", "/"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value || null;
  console.log('accessToken', token)

  // 🚫 1. If NOT logged in and trying to access protected pages → redirect to login
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔒 2. If already logged in, block access to login/signup → redirect to dashboard
  if (token && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ 3. Otherwise allow request to proceed
  return NextResponse.next();
}

// ✅ Apply proxy to specific routes
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard",
    "/chatbot",
    "/brain-tumor-analysis",
    "/diabetes",
  ],
};
