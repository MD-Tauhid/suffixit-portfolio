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
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = new Map<HTMLElement, { delay: number; opacity: string }>();
      const animations = new Set<Animation>();
      const add = (element: HTMLElement, delay = 0) => {
        if (targets.has(element) || Array.from(targets.keys()).some(parent => parent.contains(element))) return;
        targets.set(element, { delay, opacity: element.style.opacity });
        element.style.opacity = "0";
      };
      scope.querySelectorAll<HTMLElement>("[data-service-reveal]").forEach(element => add(element));
      scope.querySelectorAll<HTMLElement>("[data-service-stagger]").forEach(group => {
        let previousTop = -1;
        let column = 0;
        Array.from(group.children).forEach(child => {
          if (!(child instanceof HTMLElement)) return;
          const top = child.getBoundingClientRect().top;
          column = Math.abs(top - previousTop) < 8 ? column + 1 : 0;
          previousTop = top;
          add(child, Math.min(column, 3) * 60);
        });
      });
      const enter = (element: HTMLElement) => {
        const config = targets.get(element);
        if (!config) return;
        const animation = element.animate([{ opacity: 0, transform: "translate3d(0,24px,0)" }, { opacity: 1, transform: "translate3d(0,0,0)" }], { duration: 750, delay: config.delay, easing: "cubic-bezier(.23,1,.32,1)", fill: "both" });
        animations.add(animation);
        animation.finished.then(() => { element.style.opacity = config.opacity; animation.cancel(); animations.delete(animation); }).catch(() => {});
        observer.unobserve(element);
      };
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) enter(entry.target as HTMLElement);
      }), { rootMargin: "0px 0px -4% 0px", threshold: 0 });
      targets.forEach((config, element) => {
        if (element.getBoundingClientRect().bottom < 0) element.style.opacity = config.opacity;
        else observer.observe(element);
      });
      const focus = (event: FocusEvent) => {
        if (!(event.target instanceof Node)) return;
        targets.forEach((_, element) => {
          if (element.contains(event.target as Node)) { element.style.opacity = ""; observer.unobserve(element); }
        });
      };
      scope.addEventListener("focusin", focus);
      return () => {
        observer.disconnect();
        animations.forEach(animation => animation.cancel());
        targets.forEach((config, element) => { element.style.opacity = config.opacity; });
        scope.removeEventListener("focusin", focus);
      };
    });
    const context = gsap.context(() => {
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        scope.querySelectorAll<HTMLElement>("[data-service-hero] [data-service-float]").forEach(element => {
          gsap.to(element, { y: -24, ease: "none", scrollTrigger: { trigger: element.closest("section"), start: "top top", end: "bottom top", scrub: .6 } });
        });
      });
    }, scope);
    return () => { media.revert(); context.revert(); };
  }, []);
  return <div ref={root}>{children}</div>;
}
