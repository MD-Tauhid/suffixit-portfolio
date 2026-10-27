"use client";

import { useEffect, useRef } from "react";

/** Thin gradient bar at the top of the page. Updates the DOM directly, so scrolling never re-renders React. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);

  return <div id="sp" ref={bar} aria-hidden="true" />;
}
