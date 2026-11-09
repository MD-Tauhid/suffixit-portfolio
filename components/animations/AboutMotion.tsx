"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Progressive enhancement: all content is visible in server HTML and without JavaScript. */
export default function AboutMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro.fromTo("[data-about-title]", { yPercent: 105 }, { yPercent: 0, duration: 1.05, stagger: 0.12 });
        intro.fromTo("[data-about-intro]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 0.3);
        gsap.utils.toArray<HTMLElement>("[data-about-reveal]").forEach((element) => {
          gsap.fromTo(element, { y: 32, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-about-stagger]").forEach((group) => {
          gsap.fromTo(Array.from(group.children), { y: 24, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 90%", once: true },
          });
        });
      });
      media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-about-parallax]").forEach((image) => {
          gsap.fromTo(image, { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: "none",
            scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });
        gsap.to("[data-about-orbit]", { rotation: 70, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=1000", scrub: 0.8 },
        });
      });
    }, root);
    return () => { media.revert(); context.revert(); };
  }, []);

  return <div ref={root}>{children}</div>;
}
