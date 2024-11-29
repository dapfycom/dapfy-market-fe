import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "./config";

export function middleware(request: NextRequest) {
  const urlToken = request.nextUrl.searchParams.get("token");
  let authToken = request.cookies.get(AUTH_TOKEN_KEY);

  const response = NextResponse.next();

  // Handle auth token
  if (!authToken && urlToken) {
    response.cookies.set(AUTH_TOKEN_KEY, urlToken);
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
