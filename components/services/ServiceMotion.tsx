"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServiceMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        scope.querySelectorAll<HTMLElement>("[data-service-hero] [data-service-float]").forEach(element => {
          gsap.to(element, {
            y: -24,
            ease: "none",
            scrollTrigger: {
              trigger: element.closest("section"),
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });
      });
    }, scope);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
