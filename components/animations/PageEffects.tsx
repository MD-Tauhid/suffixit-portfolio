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

    // 4. Section Container Kinetic Scroll Observer
    // REVEAL RULE: The reveal effect triggers ONLY when the top border of the section container reaches the center of the display (50% viewport).
    const revealSelector = ".rv, .rv-up, .rv-left, .rv-right, .rv-zoom, .rv-flip, .rv-stagger";

    const triggerSection = (container: HTMLElement) => {
      container.classList.add("in");
      container
        .querySelectorAll<HTMLElement>(revealSelector)
        .forEach((child) => {
          child.classList.add("in");
        });
      container.querySelectorAll<HTMLElement>("[data-c]").forEach(countUp);
    };

    // Find all major section containers across the website
    const allSections = document.querySelectorAll<HTMLElement>(
      "section, #hero, .st, main > div, footer, [id='why'], [id='contact']"
    );

    // rootMargin: "0px 0px -50% 0px" defines the bottom of the intersection root at exactly 50% of the display.
    // threshold: 0 triggers immediately when the top border of the section container crosses into the center line.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const container = entry.target as HTMLElement;
          triggerSection(container);
          io.unobserve(container);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -50% 0px",
      }
    );

    // Observe each section container
    allSections.forEach((sec) => {
      // Check if top border is already at or above center on initial load
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5) {
        triggerSection(sec);
      } else {
        io.observe(sec);
      }
    });

    // Also observe any orphan reveal elements not wrapped in a standard section
    document.querySelectorAll<HTMLElement>(revealSelector).forEach((el) => {
      const parentSec = el.closest<HTMLElement>(
        "section, #hero, .st, main > div, footer"
      );
      if (!parentSec) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          el.classList.add("in");
        } else {
          io.observe(el);
        }
      }
    });

    cleanups.push(() => io.disconnect());

    return () => {
      cleanups.forEach((fn) => fn());
      frames.forEach(cancelAnimationFrame);
    };
  }, []);

  return null;
}
