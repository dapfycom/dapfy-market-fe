"use client";

import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const TRACKED_PATHS = ["/", "/docs", "/blog"];
const DEBOUNCE_WINDOW = 1000; // 1 second

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
  const searchParams = useSearchParams();

  useEffect(() => {
    const shouldTrack = TRACKED_PATHS.some(
      (path) => pathname === path || (path !== "/" && pathname.startsWith(path))
    );

    if (!shouldTrack) return;
    console.log("tracking ", pathname);

    const now = Date.now();
    const lastTracked = getLastTracked(pathname);

    if (!lastTracked || now - lastTracked > DEBOUNCE_WINDOW) {
      setLastTracked(pathname, now);

      const trackPageView = async () => {
        // Get UTM source or referrer
        const utmSource = searchParams.get("utm_source");
        const referrer = document.referrer;
        const source =
          utmSource || (referrer ? new URL(referrer).hostname : "DIRECT");

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
  }, [pathname, searchParams]);

  return <>{children}</>;
}

export default ViewsTracker;
