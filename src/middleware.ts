import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "./config";

export function middleware(request: NextRequest) {
  const urlToken = request.nextUrl.searchParams.get("token");
  let authToken = request.cookies.get(AUTH_TOKEN_KEY);

  const response = NextResponse.next();

  if (!authToken && urlToken) {
    // Setting cookies on the response using the `ResponseCookies` API
    response.cookies.set(AUTH_TOKEN_KEY, urlToken);
  }

  return response;
}
