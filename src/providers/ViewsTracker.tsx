"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const TRACKED_PATHS = ["/", "/docs", "/blog", "/analytics"];
const DEBOUNCE_WINDOW = 1000; // 1 second

// Add bot detection patterns
const BOT_USER_AGENTS = [
  /bot/i,
  /spider/i,
  /crawler/i,
  /vercel-screenshot/i,
  /googlebot/i,
  /chrome-lighthouse/i,
  /headless/i,
  /puppet/i,
  /selenium/i,
];

function isBot(userAgent: string): boolean {
  return BOT_USER_AGENTS.some((pattern) => pattern.test(userAgent));
}

// Use localStorage instead of Map for client-side persistence
function getLastTracked(path: string) {
  const stored = localStorage.getItem(`lastTracked-${path}`);
  return stored ? parseInt(stored, 10) : null;
}

function setLastTracked(path: string, timestamp: number) {
  localStorage.setItem(`lastTracked-${path}`, timestamp.toString());
}

interface IpApiResponse {
  ip: string;
  country: string;
  iso: string;
  isp: string;
  org: string;
  asn: number;
}

export function ViewsTracker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const shouldTrack = TRACKED_PATHS.some(
      (path) => pathname === path || (path !== "/" && pathname.startsWith(path))
    );

    if (!shouldTrack || isBot(navigator.userAgent)) return;

    const now = Date.now();
    const lastTracked = getLastTracked(pathname);

    if (!lastTracked || now - lastTracked > DEBOUNCE_WINDOW) {
      setLastTracked(pathname, now);

      const trackPageView = async () => {
        // Get IP and location data

        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const ip = data.ip;

        const referrer = document.referrer;
        const source = referrer ? new URL(referrer).hostname : "DIRECT";

        // Track the view with additional data
        await axios.post("/api/views", {
          path: pathname,
          referrer: referrer || "none",
          source,
          userAgent: navigator.userAgent,
          ip: ip,
        });
      };

      trackPageView().catch((error) => {
        console.error("Failed to track view:", error);
      });
    }
  }, [pathname]);

  return <>{children}</>;
}

export default ViewsTracker;
