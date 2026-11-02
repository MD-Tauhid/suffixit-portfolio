"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";

// ─────────────────────────────────────────────────────────────
// Suffix IT — 3D Domino Topple Physics Engine
// ─────────────────────────────────────────────────────────────
// Key Features:
// 1. Exact Domino Math with Overlap & Bounce:
//    - Natural cascade where each card triggers the next with OVERLAP = 0.45.
//    - Gravity acceleration (u * u) up to 72% of the window.
//    - Micro-elastic surface rebound (+6% sine bounce) from 72% to 100%.
// 2. Continuous Viewport Intersection Tracking (No 100vh Sticky Traps):
//    - Tracks getBoundingClientRect() on every RAF scroll frame per row.
//    - Zero scroll hijacking, zero trapped pages, 100% natural document flow.
// 3. Tab Switch Wave Trigger:
//    - On filter change, animates an entrance domino cascade wave across cards.
// 4. Hardware-Accelerated 3D Transforms:
//    - transformOrigin: bottom center with dynamic perspective and specular rim.
// ─────────────────────────────────────────────────────────────

const OVERLAP = 0.45;

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function topple(t: number) {
  if (t < 0.72) {
    const u = t / 0.72;
    return u * u;
  }
  const u = (t - 0.72) / 0.28;
  return 1 + 0.06 * Math.sin(u * Math.PI) * (1 - u);
}

export function cardProgress(progress: number, index: number, count: number) {
  if (count <= 1) return clamp01(progress);
  const window = 1 / (1 + OVERLAP * (count - 1));
  const start = index * window * OVERLAP;
  return clamp01((progress - start) / window);
}

export interface DominoRowProps {
  children: ReactNode[];
  className?: string;
  standAngle?: number;
  triggerKey?: string | number;
  style?: React.CSSProperties;
}

export function DominoRow({
  children,
  className = "",
  standAngle = 82,
  triggerKey,
  style,
}: DominoRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [filterWaveProgress, setFilterWaveProgress] = useState<number | null>(null);
  const waveRafRef = useRef<number | null>(null);

  // Check mobile screen size to optimize tilt angle
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Viewport Intersection Progress Calculation via RAF
  useEffect(() => {
    let rafId: number | null = null;

    const measureProgress = () => {
      if (!rowRef.current) return;
      const rect = rowRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // Start topple as the row enters lower viewport (88% from top)
      // Complete topple when row ascends into comfortable viewing band (24% from top)
      const startY = vh * 0.90;
      const endY = vh * 0.24;
      const raw = (startY - rect.top) / (startY - endY);
      const p = clamp01(raw);

      setScrollProgress(p);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        measureProgress();
        rafId = null;
      });
    };

    measureProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Tab Filter Change Wave Animation
  useEffect(() => {
    if (triggerKey === undefined) return;
    if (!rowRef.current) return;

    const rect = rowRef.current.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const inView = rect.top < vh && rect.bottom > 0;

    if (!inView) {
      setFilterWaveProgress(null);
      return;
    }

    if (waveRafRef.current !== null) {
      cancelAnimationFrame(waveRafRef.current);
    }

    const startTime = performance.now();
    const duration = 650; // 650ms smooth entrance wave

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = clamp01(elapsed / duration);
      setFilterWaveProgress(progress);

      if (progress < 1) {
        waveRafRef.current = requestAnimationFrame(step);
      } else {
        waveRafRef.current = null;
        setFilterWaveProgress(null);
      }
    };

    setFilterWaveProgress(0);
    waveRafRef.current = requestAnimationFrame(step);

    return () => {
      if (waveRafRef.current !== null) {
        cancelAnimationFrame(waveRafRef.current);
      }
    };
  }, [triggerKey]);

  // Combined Progress: Active filter wave overrides scroll during the 650ms transition
  const effectiveProgress = filterWaveProgress !== null ? filterWaveProgress : scrollProgress;
  const count = React.Children.count(children);
  const activeStandAngle = isMobile ? Math.min(54, standAngle * 0.65) : standAngle;

  return (
    <div
      ref={rowRef}
      className={className}
      style={{
        perspective: isMobile ? "900px" : "1400px",
        perspectiveOrigin: "50% 65%",
        ...style,
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const t = cardProgress(effectiveProgress, index, count);
        const toppled = topple(t);
        const angle = activeStandAngle * (1 - toppled);

        // Dynamic 3D depth and displacement
        const yOffset = (1 - clamp01(toppled)) * (isMobile ? 12 : 20);
        const zOffset = (clamp01(toppled) - 1) * (isMobile ? 18 : 32);
        const opacity = 0.68 + 0.32 * clamp01(t * 1.4);

        // Dynamic shadow that anchors the domino as it strikes flat
        const shadowSpread = clamp01(toppled);
        const shadowY = 6 + 18 * shadowSpread;
        const shadowBlur = 14 + 32 * shadowSpread;
        const shadowAlpha = 0.04 + 0.08 * shadowSpread;

        const isFullyFlat = toppled >= 0.99;

        return (
          <div
            key={index}
            className="group/domino relative h-full transition-[transform,box-shadow] duration-200"
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
              transform: `rotateX(${angle}deg) translateY(${yOffset}px) translateZ(${zOffset}px)`,
              opacity,
              boxShadow: `0 ${shadowY}px ${shadowBlur}px rgba(0, 114, 188, ${shadowAlpha})`,
              willChange: effectiveProgress > 0 && effectiveProgress < 1 ? "transform, opacity, box-shadow" : "auto",
            }}
          >
            {/* Specular Top-Edge Rim Highlight (shines while tilted) */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] z-30 transition-opacity duration-300 rounded-t-2xl bg-gradient-to-r from-transparent via-white/80 to-transparent"
              style={{
                opacity: 1 - clamp01(toppled * 1.2),
              }}
            />

            {/* Subtle bottom bevel reflection */}
            <div
              className="pointer-events-none absolute inset-x-2 -bottom-1 h-2 rounded-full blur-sm transition-opacity duration-300 bg-sky-900/10 -z-10"
              style={{
                opacity: shadowSpread,
              }}
            />

            {/* Inner Card Child */}
            <div
              className={`h-full w-full rounded-2xl transition-all duration-300 ${
                isFullyFlat ? "group-hover/domino:-translate-y-1.5 group-hover/domino:shadow-xl" : ""
              }`}
            >
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}

