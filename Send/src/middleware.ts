import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   const token = request.cookies.get("token")?.value;

    // Redirect to sign page if no token
  if (!token && request.nextUrl.pathname !== "/auth/signin") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }



  return NextResponse.next();
}

export const config = {
  matcher: ["/","/:path*,/dashboard/:path*", "/users/:path*", "/admin/:path*, /qa/:path*"],
};