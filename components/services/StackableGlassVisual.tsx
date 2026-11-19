"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * StackableGlassVisual
 * ─────────────────────────────────────────────────────────────
 * Pixel-accurate, shader-grade replica of Spline's "Stackable Glass"
 *
 * Enhancements:
 *  1. FULL-CARD SPECULAR REFLECTION:
 *     - Broad, enveloping light sweep that covers the entire card face from corner to corner
 *     - Dynamic cursor-driven specular glare pool that glides across the whole card surface as mouse moves
 *     - Full-surface ambient glass reflection layer (edge-to-edge gloss)
 *     - Cascading sweep delays across stacked glass plates for realistic refraction
 *  2. STRICT LOGO DEPTH OPACITY PROGRESSION ("joto nicher card toto kom"):
 *     - Card 4 (Topmost Layer):   1.00 (100% - Crisp, vivid, diamond-sharp emblem)
 *     - Card 3 (Upper-Mid Layer): 0.55 (55%  - Prismatic frosted watermark)
 *     - Card 2 (Lower-Mid Layer): 0.28 (28%  - Submerged oceanic translucent refraction)
 *     - Card 1 (Bottommost Base): 0.12 (12%  - Deep, faint, ethereal glowing core etching)
 *  3. PRESERVED COLORS & SHADERS:
 *     - 100% authentic Spline colors: Gradient pill (#2040ff -> #35ffbb) and LiquidGlass (#6785ff33)
 *     - CornerRadius 55px (Squircle), 214.83px x 320px exact Spline geometry
 *  4. RESPONSIVE 60FPS 3D SPRING PHYSICS:
 *     - Cursor tracking with preserve-3d, layer fanning, and tactile response
 */
export default function StackableGlassVisual({
  className = "",
}: {
  className?: string;
  activeDomainTitle?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // High-responsiveness Spring Physics State
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const targetRotRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Relative to window viewport center for smooth ubiquitous tracking
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const nx = (e.clientX - centerX) / (window.innerWidth / 2); // -1 to +1
      const ny = (e.clientY - centerY) / (window.innerHeight / 2); // -1 to +1

      // Punchy, alive 3D rotation angles
      targetRotRef.current = {
        x: Math.max(-22, Math.min(22, -ny * 25)),
        y: Math.max(-35, Math.min(35, nx * 38)),
      };
    };

    const handleMouseLeave = () => {
      targetRotRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // High-performance 60FPS spring loop with snappy easing
    const updatePhysics = () => {
      const cur = currentRotRef.current;
      const tgt = targetRotRef.current;

      cur.x += (tgt.x - cur.x) * 0.14;
      cur.y += (tgt.y - cur.y) * 0.14;

      setRotation({ x: cur.x, y: cur.y });
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Pure Tilt-Driven Optics (NO LOOP - Strictly Tilt Reactive)
  // ─────────────────────────────────────────────────────────────
  const normY = rotation.y / 35; // -1 to +1
  const normX = rotation.x / 22; // -1 to +1
  const tiltMagnitude = Math.sqrt(normY * normY + normX * normX);

  // Reflection intensity strictly activates on tilt (0 at rest/center, NO loop!)
  const tiltReflectionOpacity = Math.min(
    1,
    Math.max(0, (tiltMagnitude - 0.08) * 1.5)
  );

  // Dynamic sweep translation across the 214.83px x 320px card face
  const sweepTranslateX = normY * 160;
  const sweepTranslateY = -normX * 110;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[440px] sm:h-[480px] md:h-[520px] flex items-center justify-center select-none pointer-events-auto cursor-grab active:cursor-grabbing ${className}`}
      style={{ perspective: "1400px" }}
    >
      <style jsx>{`
        /* Authentic Liquid Glass Beveled Border */
        .liquid-glass-card {
          width: 214.83px;
          height: 320px;
          border-radius: 55px;
          position: absolute;
          transform-style: preserve-3d;
          transition: box-shadow 0.25s ease;
        }

        /* Ambient subtle zero-G float drift */
        @keyframes subtleDrift {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(0.4deg); }
        }
        .animate-drift {
          animation: subtleDrift 6s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Luminous Ambient Backlight Aura (Underneath the Stack) */}
      <div
        className="pointer-events-none absolute size-[420px] sm:size-[480px] rounded-full bg-[radial-gradient(circle,rgba(53,255,187,0.22)_0%,rgba(32,64,255,0.18)_40%,transparent_70%)] blur-3xl opacity-80 transition-transform duration-500"
        style={{
          transform: `translate3d(${rotation.y * 2.2}px, ${-rotation.x * 2.2}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Soft Floor Contact Shadow */}
      <div
        className="pointer-events-none absolute bottom-4 w-[320px] sm:w-[360px] h-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,40,120,0.18)_0%,rgba(0,40,120,0.05)_55%,transparent_75%)] blur-xl transition-transform duration-200"
        style={{
          transform: `translateX(${rotation.y * 1.8}px) scale(${1 - Math.abs(rotation.x) * 0.015})`,
        }}
        aria-hidden="true"
      />

      {/* 3. 3D Stack Stage (Full 3D Tilt with Preserve-3D) */}
      <div
        className="relative size-[380px] sm:size-[420px] flex items-center justify-center animate-drift"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* ─────────────────────────────────────────────────────────────
            CARD 1: BASE VIBRANT GRADIENT PILL (Bottom-Left: Deepest Layer)
            Offset: X: -75.08px, Y: +90.50px, Z: 0px
            Logo Opacity: 0.12 (Deepest, Lowest Opacity - Ethereal Core Watermark)
           ───────────────────────────────────────────────────────────── */}
        <div
          className="liquid-glass-card overflow-hidden flex items-center justify-center"
          style={{
            zIndex: 1,
            transform: `translate3d(
              ${-75.08 + rotation.y * 0.15}px,
              ${90.50 - rotation.x * 0.15}px,
              0px
            ) rotateY(${rotation.y * 0.25}deg)`,
            background: "linear-gradient(to top, #2040ff 0%, #35ffbb 100%)",
            boxShadow:
              "0 35px 70px -15px rgba(32, 64, 255, 0.50), 0 12px 30px -5px rgba(53, 255, 187, 0.40), inset 0 2px 3px rgba(255, 255, 255, 0.70)",
          }}
        >
          {/* Full-Surface Specular Sheen (Spans entire card) */}
          <div
            className="absolute inset-0 rounded-[55px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.22) 100%)",
            }}
          />

          {/* Dynamic Cursor Light Glare - moves across full card surface */}
          <div
            className="absolute inset-0 rounded-[55px] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 260px 360px at ${50 + rotation.y * 1.2}% ${50 + rotation.x * 1.2}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.10) 45%, transparent 75%)`,
            }}
          />

          {/* Top Gloss Flare Arch & Bevel Border */}
          <div className="absolute inset-x-0 top-0 h-[150px] bg-gradient-to-b from-white/45 via-white/10 to-transparent rounded-t-[55px] pointer-events-none" />
          <div className="absolute inset-0 rounded-[55px] border border-white/50 pointer-events-none" />
          <div className="absolute inset-0 rounded-[55px] bg-gradient-to-tl from-black/15 via-transparent to-transparent pointer-events-none" />

          {/* S-LOGO: Deepest Layer -> Lowest Opacity (0.12) */}
          <div className="relative z-10 w-[110px] h-auto flex items-center justify-center pointer-events-none">
            <div
              className="relative w-full h-[74px] transition-transform duration-300"
              style={{
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                opacity: 0.12,
                transform: `translate3d(${rotation.y * 0.1}px, ${-rotation.x * 0.1}px, 0)`,
              }}
            >
              <Image
                src="/assets/services/s-logo.png"
                alt="Suffix IT Logo"
                fill
                priority
                className="object-contain"
                sizes="120px"
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CARD 2: LIQUID GLASS LAYER 1 (Middle-Low)
            Offset: X: -25.33px, Y: +29.70px, Z: 40px
            Logo Opacity: 0.28 (Submerged Oceanic Translucent)
            Full-Card Specular Reflection Across Entire Surface
           ───────────────────────────────────────────────────────────── */}
        <div
          className="liquid-glass-card overflow-hidden flex items-center justify-center"
          style={{
            zIndex: 2,
            transform: `translate3d(
              ${-25.33 + rotation.y * 0.35}px,
              ${29.70 - rotation.x * 0.35}px,
              40px
            ) rotateY(${rotation.y * 0.45}deg)`,
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(103, 133, 255, 0.22) 50%, rgba(255, 255, 255, 0.15) 100%)",
            backdropFilter: "blur(22px) saturate(220%) contrast(105%)",
            WebkitBackdropFilter: "blur(22px) saturate(220%) contrast(105%)",
            border: "1.5px solid rgba(255, 255, 255, 0.85)",
            boxShadow: `
              0 25px 50px -10px rgba(0, 40, 120, 0.18),
              0 8px 18px -4px rgba(0, 0, 0, 0.06),
              inset 0 1px 2px rgba(0, 0, 0, 0.10),
              inset 1px -1px 2px rgba(255, 255, 255, 0.40),
              inset 2px 2px 4px rgba(255, 255, 255, 0.90),
              inset -2px -2px 6px rgba(103, 133, 255, 0.25),
              inset 0 0 25px rgba(255, 255, 255, 0.20)
            `,
          }}
        >
          {/* Full-Surface Specular Sheen (Edge-to-Edge) */}
          <div
            className="absolute inset-0 rounded-[55px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.28) 100%)",
            }}
          />

          {/* Dynamic Cursor Light Glare - sweeps across full card face */}
          <div
            className="absolute inset-0 rounded-[55px] pointer-events-none transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity > 0 ? 1 : 0.25,
              background: `radial-gradient(ellipse 280px 380px at ${50 + rotation.y * 1.3}% ${50 + rotation.x * 1.3}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.14) 45%, transparent 80%)`,
            }}
          />

          {/* Tilt-Reactive Specular Reflection Sweep (NO LOOP - Strictly on Tilt) */}
          <div
            className="pointer-events-none absolute -inset-x-28 -inset-y-36 w-[450px] h-[600px] transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity * 0.38,
              transform: `translate3d(${sweepTranslateX * 0.7}px, ${sweepTranslateY * 0.7}px, 0) rotate(32deg)`,
              background:
                "linear-gradient(120deg, transparent 10%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.28) 45%, rgba(255,255,255,0.50) 50%, rgba(255,255,255,0.28) 55%, rgba(255,255,255,0.05) 75%, transparent 90%)",
            }}
          />

          {/* Curved Edge Specular Highlight & Inner Rim */}
          <div className="absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-t-[55px] pointer-events-none" />
          <div className="absolute inset-[1.5px] rounded-[53.5px] border border-white/40 pointer-events-none" />

          {/* S-LOGO: Layer 2 -> 0.28 Opacity */}
          <div className="relative z-10 w-[105px] h-auto flex items-center justify-center pointer-events-none">
            <div
              className="relative w-full h-[70px] transition-transform duration-200"
              style={{
                filter:
                  "drop-shadow(0 4px 12px rgba(0,70,180,0.20)) saturate(150%) brightness(1.02)",
                opacity: 0.28,
                transform: `translate3d(${rotation.y * 0.2}px, ${-rotation.x * 0.2}px, 0)`,
              }}
            >
              <Image
                src="/assets/services/s-logo.png"
                alt=""
                fill
                className="object-contain"
                sizes="110px"
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CARD 3: LIQUID GLASS LAYER 2 (Middle-High)
            Offset: X: +24.42px, Y: -31.10px, Z: 80px
            Logo Opacity: 0.55 (Frosted Prismatic Watermark)
            Full-Card Specular Reflection Beam Across the Surface
           ───────────────────────────────────────────────────────────── */}
        <div
          className="liquid-glass-card overflow-hidden flex items-center justify-center"
          style={{
            zIndex: 3,
            transform: `translate3d(
              ${24.42 + rotation.y * 0.55}px,
              ${-31.10 - rotation.x * 0.55}px,
              80px
            ) rotateY(${rotation.y * 0.65}deg)`,
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.48) 0%, rgba(103, 133, 255, 0.24) 45%, rgba(255, 255, 255, 0.18) 100%)",
            backdropFilter: "blur(26px) saturate(230%) contrast(108%)",
            WebkitBackdropFilter: "blur(26px) saturate(230%) contrast(108%)",
            border: "1.6px solid rgba(255, 255, 255, 0.90)",
            boxShadow: `
              0 30px 60px -12px rgba(0, 40, 120, 0.22),
              0 10px 22px -5px rgba(0, 0, 0, 0.08),
              inset 0 1px 2px rgba(0, 0, 0, 0.10),
              inset 1px -1px 2px rgba(255, 255, 255, 0.40),
              inset 2px 2px 5px rgba(255, 255, 255, 0.95),
              inset -2px -2px 8px rgba(103, 133, 255, 0.30),
              inset 0 0 30px rgba(255, 255, 255, 0.25)
            `,
          }}
        >
          {/* Full-Surface Specular Sheen (Edge-to-Edge) */}
          <div
            className="absolute inset-0 rounded-[55px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.22) 35%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.32) 100%)",
            }}
          />

          {/* Dynamic Cursor Light Glare - sweeps across full card face */}
          <div
            className="absolute inset-0 rounded-[55px] pointer-events-none transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity > 0 ? 1 : 0.25,
              background: `radial-gradient(ellipse 300px 400px at ${50 + rotation.y * 1.4}% ${50 + rotation.x * 1.4}%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.18) 45%, transparent 80%)`,
            }}
          />

          {/* Tilt-Reactive Specular Reflection Sweep (NO LOOP - Strictly on Tilt) */}
          <div
            className="pointer-events-none absolute -inset-x-28 -inset-y-36 w-[450px] h-[600px] transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity * 0.65,
              transform: `translate3d(${sweepTranslateX * 0.85}px, ${sweepTranslateY * 0.85}px, 0) rotate(32deg)`,
              background:
                "linear-gradient(120deg, transparent 10%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0.06) 75%, transparent 90%)",
            }}
          />

          {/* Curved Edge Specular Highlight & Inner Rim */}
          <div className="absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-white/45 via-white/12 to-transparent rounded-t-[55px] pointer-events-none" />
          <div className="absolute inset-[1.5px] rounded-[53.5px] border border-white/45 pointer-events-none" />

          {/* S-LOGO: Layer 3 -> 0.55 Opacity */}
          <div className="relative z-10 w-[108px] h-auto flex items-center justify-center pointer-events-none">
            <div
              className="relative w-full h-[72px] transition-transform duration-200"
              style={{
                filter:
                  "brightness(1.10) contrast(1.12) drop-shadow(0 6px 14px rgba(0,40,120,0.22))",
                opacity: 0.55,
                transform: `translate3d(${rotation.y * 0.3}px, ${-rotation.x * 0.3}px, 0)`,
              }}
            >
              <Image
                src="/assets/services/s-logo.png"
                alt=""
                fill
                className="object-contain"
                sizes="110px"
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CARD 4: LIQUID GLASS LAYER 3 (Top-Right: Highest Topmost Layer)
            Offset: X: +82.08px, Y: -69.50px, Z: 120px
            Logo Opacity: 1.00 (100% - Crisp, Prominent Diamond-Sharp Chrome Emblem)
            FULL-CARD SPECULAR LIGHT SWEEP ACROSS ENTIRE SURFACE
           ───────────────────────────────────────────────────────────── */}
        <div
          className="liquid-glass-card overflow-hidden flex items-center justify-center"
          style={{
            zIndex: 4,
            transform: `translate3d(
              ${82.08 + rotation.y * 0.75}px,
              ${-69.50 - rotation.x * 0.75}px,
              120px
            ) rotateY(${rotation.y * 0.88}deg)`,
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.58) 0%, rgba(103, 133, 255, 0.26) 40%, rgba(255, 255, 255, 0.22) 100%)",
            backdropFilter: "blur(30px) saturate(240%) contrast(110%)",
            WebkitBackdropFilter: "blur(30px) saturate(240%) contrast(110%)",
            border: "1.8px solid rgba(255, 255, 255, 0.98)",
            boxShadow: `
              0 35px 75px -15px rgba(0, 30, 100, 0.26),
              0 14px 28px -6px rgba(0, 0, 0, 0.10),
              0 0 25px rgba(255, 255, 255, 0.40),
              inset 0 1px 2px rgba(0, 0, 0, 0.10),
              inset 1px -1px 2px rgba(255, 255, 255, 0.40),
              inset 2.5px 2.5px 6px rgba(255, 255, 255, 1),
              inset -2px -2px 10px rgba(103, 133, 255, 0.35),
              inset 0 0 35px rgba(255, 255, 255, 0.30)
            `,
          }}
        >
          {/* Full-Surface Specular Sheen (Edge-to-Edge) */}
          <div
            className="absolute inset-0 rounded-[55px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.10) 55%, rgba(255,255,255,0.40) 100%)",
            }}
          />

          {/* Dynamic Cursor Light Glare - sweeps across full card surface with mouse */}
          <div
            className="absolute inset-0 rounded-[55px] pointer-events-none transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity > 0 ? 1 : 0.30,
              background: `radial-gradient(ellipse 320px 420px at ${50 + rotation.y * 1.5}% ${50 + rotation.x * 1.5}%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.06) 65%, transparent 85%)`,
            }}
          />

          {/* Tilt-Reactive Specular Reflection Sweep (NO LOOP - Strictly on Tilt) */}
          <div
            className="pointer-events-none absolute -inset-x-28 -inset-y-36 w-[450px] h-[600px] transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity * 0.95,
              transform: `translate3d(${sweepTranslateX}px, ${sweepTranslateY}px, 0) rotate(32deg)`,
              background:
                "linear-gradient(120deg, transparent 10%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0.08) 75%, transparent 90%)",
            }}
          />

          {/* Top-Left Polished Acrylic Glare & Inner Rim */}
          <div className="absolute inset-x-0 top-0 h-[150px] bg-gradient-to-b from-white/55 via-white/18 to-transparent rounded-t-[55px] pointer-events-none" />
          <div className="absolute inset-[1.8px] rounded-[53.2px] border border-white/50 pointer-events-none" />

          {/* S-LOGO: Topmost Layer -> 1.00 (100% Opacity) & Raised 3D Diamond Emblem */}
          <div className="relative z-10 w-[114px] h-auto flex items-center justify-center pointer-events-none">
            <div
              className="relative w-full h-[78px] transition-transform duration-150"
              style={{
                filter: `
                  drop-shadow(0 12px 24px rgba(0,30,90,0.45))
                  drop-shadow(0 0 14px rgba(255,255,255,0.90))
                  contrast(115%)
                `,
                opacity: 1.0,
                transform: `translate3d(${rotation.y * 0.4}px, ${-rotation.x * 0.4}px, 0)`,
              }}
            >
              <Image
                src="/assets/services/s-logo.png"
                alt="Suffix IT Emblem"
                fill
                priority
                className="object-contain"
                sizes="120px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
