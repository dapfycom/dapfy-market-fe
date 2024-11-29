import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "./config";
import { BASE_URL } from "./utils/axios";

export enum SourceType {
  DIRECT = "DIRECT",
  SEARCH = "SEARCH",
  SOCIAL = "SOCIAL",
  REFERRAL = "REFERRAL",
  EMAIL = "EMAIL",
  PAID = "PAID",
  OTHER = "OTHER",
}

// Define the routes we want to track
const TRACKED_PATHS = ["/", "/docs", "/blog"];

const DEBOUNCE_WINDOW = 1000; // 1 second window
const viewsTracked = new Map<string, number>();

const IP_API_URL = "http://ip-api.com/json";
const COUNTRY_COOKIE_NAME = "user-country";
const COUNTRY_COOKIE_EXPIRES = 7 * 24 * 60 * 60; // 7 days in seconds

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const urlToken = request.nextUrl.searchParams.get("token");
  let authToken = request.cookies.get(AUTH_TOKEN_KEY);

  // Get referrer and UTM source
  const referrer = request.headers.get("referer") || "";
  const utmSource = request.nextUrl.searchParams.get("utm_source") || "";
  const source =
    utmSource || (referrer ? new URL(referrer).hostname : SourceType.DIRECT);

  const response = NextResponse.next();

  // Handle auth token
  if (!authToken && urlToken) {
    response.cookies.set(AUTH_TOKEN_KEY, urlToken);
  }

  // Track views for specified routes
  if (
    TRACKED_PATHS.some(
      (path) => pathname === path || (path !== "/" && pathname.startsWith(path))
    )
  ) {
    const userAgent = request.headers.get("user-agent") || "unknown";
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : request.ip;

    // Check country from Next.js geo or cookie
    const country =
      request.geo?.country ||
      request.cookies.get(COUNTRY_COOKIE_NAME)?.value ||
      "unknown";

    // Create a unique key for this request
    const requestKey = `${ip}-${pathname}`;
    const now = Date.now();
    const lastTracked = viewsTracked.get(requestKey);

    // Only track if we haven't seen this combination recently
    if (!lastTracked || now - lastTracked > DEBOUNCE_WINDOW) {
      viewsTracked.set(requestKey, now);

      // Clean up old entries
      Array.from(viewsTracked.entries()).forEach(([key, timestamp]) => {
        if (now - timestamp > DEBOUNCE_WINDOW) {
          viewsTracked.delete(key);
        }
      });

      const getCountryFromIP = async (ip: string) => {
        try {
          const response = await fetch(`${IP_API_URL}/${ip}`);
          const data = await response.json();
          return data.countryCode || "unknown";
        } catch (error) {
          console.error("Failed to fetch country from IP:", error);
          return "unknown";
        }
      };

      const trackView = async () => {
        let finalCountry = country;

        // Only fetch from IP API if we don't have the country
        if (country === "unknown") {
          finalCountry = await getCountryFromIP(ip || "");

          // Save the country in cookie if we got a valid result
          if (finalCountry !== "unknown") {
            response.cookies.set(COUNTRY_COOKIE_NAME, finalCountry, {
              maxAge: COUNTRY_COOKIE_EXPIRES,
              path: "/",
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
            });
          }
        }
        console.log({ finalCountry });

        fetch(`${BASE_URL}/views/track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: pathname,
            referrer: referrer || "none",
            source,
            userAgent,
            ip,
            country: finalCountry,
          }),
        }).catch((err) => console.error("Failed to track view:", err));
      };

      trackView().catch((err) => console.error("Failed to track view:", err));
    }
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
