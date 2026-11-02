"use client";

import { useEffect } from "react";

/**
 * Enhanced Page-wide kinetic scroll effects engine.
 * Observes all `.rv`, `.rv-up`, `.rv-left`, `.rv-right`, `.rv-zoom` elements.
 * Features:
 * - Directional entrances: Left, Right, Ascending, 3D Scaling with blur dissipation.
 * - Dynamic split-entrance for card grids (alternates left & right).
 * - Multi-counter easeOut animation.
 */
export default function PageEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const frames = new Set<number>();

    // 1. Hero Glow Tracker
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

    // 2. Card Spotlight Hover
    const onCardMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".cd");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", e.clientX - r.left + "px");
      card.style.setProperty("--y", e.clientY - r.top + "px");
    };
    document.addEventListener("pointermove", onCardMove, { passive: true });
    cleanups.push(() => document.removeEventListener("pointermove", onCardMove));

    // 3. Counter Animation
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

    // 4. Kinetic Scroll Observer
    const selector = ".rv, .rv-up, .rv-left, .rv-right, .rv-zoom";
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("in");
          el.querySelectorAll<HTMLElement>("[data-c]").forEach(countUp);
          io.unobserve(el);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -90px 0px",
      }
    );

    const elements = document.querySelectorAll<HTMLElement>(selector);
    elements.forEach((el) => {
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
