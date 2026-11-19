"use client";

import React, { useEffect, useRef } from "react";
import useMotionPreference from "./useMotionPreference";
import "./hero-curves.css";

export default function HeroCurves() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let visible = false;
    const update = () => {
      element.dataset.motion = visible && !document.hidden && !reduced ? "active" : "static";
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      element.dataset.motion = "static";
    };
  }, [reduced]);

  return (
    <div ref={host} className="hero-curves pointer-events-none" aria-hidden="true" data-motion="static">
      <div className="hero-curve hero-curve-right" />
      <div className="hero-curve hero-curve-left" />
    </div>
  );
}
