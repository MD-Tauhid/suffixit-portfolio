"use client";

import { useEffect } from "react";

/**
 * Page-wide behaviours ported from the original main.js. It renders nothing and only attaches
 * listeners to elements that were already server-rendered, so the page content stays static HTML.
 *  1. Hero glow follows the pointer (--mx / --my).
 *  2. Card spotlight follows the pointer (--x / --y), via one delegated listener.
 *  3. Scroll reveal for `.rv` elements, with the original staggered delay.
 *  4. Count-up numbers for `[data-c]` inside revealed elements.
 */
export default function PageEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const frames = new Set<number>();

    // 1. hero glow
    const hero = document.getElementById("hero");
    if (hero) {
      const onMove = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", e.clientX - r.left + "px");
        hero.style.setProperty("--my", e.clientY - r.top + "px");
      };
      hero.addEventListener("pointermove", onMove);
      cleanups.push(() => hero.removeEventListener("pointermove", onMove));
    }

    // 2. card spotlight
    const onCardMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".cd");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", e.clientX - r.left + "px");
      card.style.setProperty("--y", e.clientY - r.top + "px");
    };
    document.addEventListener("pointermove", onCardMove, { passive: true });
    cleanups.push(() => document.removeEventListener("pointermove", onCardMove));

    // 4. counters (easeOutCubic over 1.4s, exactly as before)
    const countUp = (el: HTMLElement) => {
      const to = Number(el.dataset.c);
      const suffix = el.dataset.n ?? "";
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1400);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : "");
        if (p < 1) frames.add(requestAnimationFrame(tick));
      };
      frames.add(requestAnimationFrame(tick));
    };

    // 3. reveal on scroll
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("in");
          el.querySelectorAll<HTMLElement>("[data-c]").forEach(countUp);
          io.unobserve(el);
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll<HTMLElement>(".rv").forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    return () => {
      cleanups.forEach((fn) => fn());
      frames.forEach(cancelAnimationFrame);
    };
  }, []);

  return null;
}
