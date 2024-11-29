"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const TRACKED_PATHS = ["/", "/docs", "/blog"];
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

export function ViewsTracker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const shouldTrack = TRACKED_PATHS.some(
      (path) => pathname === path || (path !== "/" && pathname.startsWith(path))
    );

    if (!shouldTrack || isBot(navigator.userAgent)) return;
    console.log("tracking ", pathname);

    const now = Date.now();
    const lastTracked = getLastTracked(pathname);

    if (!lastTracked || now - lastTracked > DEBOUNCE_WINDOW) {
      setLastTracked(pathname, now);

      const trackPageView = async () => {
        // Get UTM source or referrer
        const referrer = document.referrer;
        const source = referrer ? new URL(referrer).hostname : "DIRECT";

        // Track the view
        await axios.post("/api/views", {
          path: pathname,
          referrer: referrer || "none",
          source,
          userAgent: navigator.userAgent,
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
