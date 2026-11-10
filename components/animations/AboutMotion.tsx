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
      media.add("(prefers-reduced-motion: reduce)", () => {
        const previous = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        return () => { document.documentElement.style.scrollBehavior = previous; };
      });
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro.fromTo("[data-about-title]", { yPercent: 105 }, { yPercent: 0, duration: 0.9, stagger: 0.08, clearProps: "transform" });
        intro.fromTo("[data-about-intro]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, clearProps: "transform,opacity" }, 0.18);

        // One owner per element: parent and child entrances must never stack.
        // WAAPI hands the fixed entry choreography to the browser compositor.
        const entries = new Map<HTMLElement, { kind: "text" | "heading" | "image"; delay: number; opacity: string; played: boolean }>();
        const running = new Set<Animation>();
        const scope = root.current;
        if (!scope) return;
        const register = (element: HTMLElement, kind: "text" | "heading" | "image" = "text", delay = 0) => {
          if (entries.has(element)) return;
          if (Array.from(entries.keys()).some((owner) => owner.contains(element))) return;
          entries.set(element, { kind, delay, opacity: element.style.opacity, played: false });
          element.style.opacity = "0";
        };

        scope.querySelectorAll<HTMLElement>("[data-about-reveal]").forEach((element) => {
          if (element.dataset.aboutReveal === "heading") {
            Array.from(element.children).forEach((child, index) => {
              if (child instanceof HTMLElement) register(child, child.matches("h2, div") ? "heading" : "text", Math.min(index, 3) * 60);
            });
          } else {
            register(element, element.dataset.aboutReveal === "image" ? "image" : "text");
          }
        });
        scope.querySelectorAll<HTMLElement>("[data-about-stagger]").forEach((group) => {
          let top = -Infinity;
          let column = 0;
          Array.from(group.children).forEach((child) => {
            if (!(child instanceof HTMLElement)) return;
            const nextTop = child.getBoundingClientRect().top;
            column = Math.abs(nextTop - top) < 8 ? column + 1 : 0;
            top = nextTop;
            register(child, "text", Math.min(column, 3) * 60);
          });
        });
        scope.querySelectorAll<HTMLElement>("main > section:not(:first-child)").forEach((section) => {
          section.querySelectorAll<HTMLElement>("figure").forEach((figure) => register(figure, "image"));
          const heading = section.querySelector<HTMLElement>("h2");
          if (heading) register(heading, "heading");
        });

        const enter = (element: HTMLElement, immediate = false) => {
          const entry = entries.get(element);
          if (!entry || entry.played) return;
          entry.played = true;
          const image = entry.kind === "image";
          const distance = entry.kind === "heading" ? 26 : 18;
          const animation = element.animate([
            { opacity: 0, transform: image ? "translate3d(0,18px,0) scale(.985)" : `translate3d(0,${distance}px,0)` },
            { opacity: 1, transform: "translate3d(0,0,0) scale(1)" },
          ], {
            duration: image ? 800 : entry.kind === "heading" ? 750 : 600,
            delay: immediate ? 0 : entry.delay,
            easing: "cubic-bezier(0.23, 1, 0.32, 1)",
            fill: "both",
          });
          running.add(animation);
          animation.finished.then(() => {
            element.style.opacity = entry.opacity;
            element.dataset.aboutEntered = "true";
            animation.cancel();
            running.delete(animation);
          }).catch(() => { /* Cancellation is expected on route or motion-preference changes. */ });
        };
        const observer = new IntersectionObserver((observations) => {
          observations.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            enter(target as HTMLElement);
            observer.unobserve(target);
          });
        }, { rootMargin: "0px 0px -5% 0px", threshold: 0 });
        entries.forEach((_, element) => {
          // Content above a deep-link destination should not wait for a return scroll.
          if (element.getBoundingClientRect().bottom < 0) {
            element.style.opacity = entries.get(element)!.opacity;
            entries.get(element)!.played = true;
          } else observer.observe(element);
        });
        const showFocusedContent = (event: FocusEvent) => {
          if (!(event.target instanceof Node)) return;
          entries.forEach((_, element) => {
            if (element.contains(event.target as Node)) enter(element, true);
          });
        };
        scope.addEventListener("focusin", showFocusedContent);
        return () => {
          observer.disconnect();
          scope.removeEventListener("focusin", showFocusedContent);
          running.forEach((animation) => animation.cancel());
          entries.forEach((entry, element) => {
            element.style.opacity = entry.opacity;
            delete element.dataset.aboutEntered;
          });
        };
      });
      media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo("[data-about-stage]", { clipPath: "inset(0% 3% 0% 3% round 12px)" }, {
          clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
          scrollTrigger: { trigger: "[data-about-stage]", start: "top 85%", end: "top 20%", scrub: 0.6 },
        });
        gsap.fromTo("[data-about-hero-image]", { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: "none",
          scrollTrigger: { trigger: "[data-about-stage]", start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
        gsap.fromTo("[data-about-word]", { opacity: 0.22 }, { opacity: 1, stagger: 0.12, ease: "none",
          scrollTrigger: { trigger: "[data-about-statement]", start: "top 80%", end: "bottom 55%", scrub: 0.4 },
        });
        gsap.utils.toArray<HTMLElement>("[data-about-parallax]").forEach((image) => {
          gsap.fromTo(image, { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: "none",
            scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });
        gsap.to("[data-about-orbit]", { rotation: 100, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=1000", scrub: 0.8 },
        });
        gsap.fromTo("[data-about-seal]", { rotation: -12 }, { rotation: 12, ease: "none",
          scrollTrigger: { trigger: "[data-about-seal]", start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
    }, root);
    return () => { media.revert(); context.revert(); };
  }, []);

  return <div ref={root}>{children}</div>;
}
