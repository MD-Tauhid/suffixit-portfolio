"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Reset new routes after the outgoing smooth-scroll provider has unmounted. */
export default function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Keep explicit section links, such as /about#careers, working normally.
    if (window.location.hash) return;
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    const frame = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
