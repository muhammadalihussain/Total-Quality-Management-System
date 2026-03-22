
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPayloadEdge } from "@/lib/jwt";



export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If no token → go to sign page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {

  const user = await getPayloadEdge(token);
  const path = request.nextUrl.pathname;
  const allowedUrls = Array.isArray(user?.urls)
  ? user.urls
  : [];

  // Skip public routes
  if (!path.startsWith("/dashboard") && !path.startsWith("/users") && !path.startsWith("/profile")) {
    return NextResponse.next();
  }

 const hasAccess = allowedUrls.some((url: string) =>
      path.startsWith(url)
    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/","/:path*,/dashboard/:path*", "/users/:path*", "/admin/:path*, /qa/:path*"],
};

