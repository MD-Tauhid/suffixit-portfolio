"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Database, Layers, Navigation, Smartphone, Zap } from "lucide-react";

/**
 * ProductGlassStageVisual
 * ─────────────────────────────────────────────────────────────
 * Ultra-luxury 3D Frosted Liquid Glass Product Suite Visual.
 *
 * Engineered with:
 *  1. 4-Layer Tactile Stacked Squircle Glassmorphism Plates
 *  2. Specular Light Glare Sweep & Dynamic Tilt Physics
 *  3. Ethereal Depth-Graduated Suffix S-Logo Emblem
 *  4. 3 Orbiting Product Telemetry HUD Cards (ERP, Field Force, Smart POS)
 *  5. Concentric Dashed Trajectory Rings & Ambient Blueprint Matrix
 */
export default function ProductGlassStageVisual({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 60FPS Spring Physics for cursor tracking
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const targetRotRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const nx = (e.clientX - centerX) / (window.innerWidth / 2);
      const ny = (e.clientY - centerY) / (window.innerHeight / 2);

      targetRotRef.current = {
        x: Math.max(-20, Math.min(20, -ny * 24)),
        y: Math.max(-32, Math.min(32, nx * 36)),
      };
    };

    const handleMouseLeave = () => {
      targetRotRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const updatePhysics = () => {
      const cur = currentRotRef.current;
      const tgt = targetRotRef.current;

      cur.x += (tgt.x - cur.x) * 0.12;
      cur.y += (tgt.y - cur.y) * 0.12;

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

  const normY = rotation.y / 32;
  const normX = rotation.x / 20;
  const tiltMagnitude = Math.sqrt(normY * normY + normX * normX);
  const tiltReflectionOpacity = Math.min(1, Math.max(0, (tiltMagnitude - 0.08) * 1.5));
  const sweepTranslateX = normY * 150;
  const sweepTranslateY = -normX * 100;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[540px] h-[460px] sm:h-[500px] md:h-[530px] flex items-center justify-center select-none pointer-events-auto cursor-grab active:cursor-grabbing ${className}`}
      style={{ perspective: "1400px" }}
    >
      <style jsx>{`
        .liquid-glass-plate {
          width: 204px;
          height: 305px;
          border-radius: 52px;
          position: absolute;
          transform-style: preserve-3d;
          transition: box-shadow 0.25s ease;
        }

        @keyframes subtleDrift {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        .animate-drift {
          animation: subtleDrift 6.5s ease-in-out infinite;
        }
      `}</style>

      {/* ─── 1. Architectural Blueprint Grid Background ─── */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(0,114,188,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,114,188,0.06)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* ─── 2. Luminous Ambient Backlight Aura ─── */}
      <div
        className="pointer-events-none absolute size-[440px] sm:size-[490px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.24)_0%,rgba(0,114,188,0.18)_42%,transparent_70%)] blur-3xl opacity-85 transition-transform duration-500"
        style={{
          transform: `translate3d(${rotation.y * 2.2}px, ${-rotation.x * 2.2}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* ─── 3. Dashed Trajectory Orbit Rings ─── */}
      <div
        className="pointer-events-none absolute size-[360px] sm:size-[420px] rounded-full border border-[#0072bc]/20 border-dashed animate-[spin_110s_linear_infinite]"
        style={{
          transform: `translate3d(${rotation.y * 0.4}px, ${-rotation.x * 0.4}px, 0)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute size-[440px] sm:size-[500px] rounded-full border border-[#38bdf8]/15 border-dotted animate-[spin_160s_linear_infinite_reverse]"
        style={{
          transform: `translate3d(${rotation.y * 0.25}px, ${-rotation.x * 0.25}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* ─── 4. Floor Soft Contact Shadow ─── */}
      <div
        className="pointer-events-none absolute bottom-4 w-[310px] sm:w-[350px] h-9 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,40,120,0.18)_0%,rgba(0,40,120,0.04)_55%,transparent_75%)] blur-xl transition-transform duration-200"
        style={{
          transform: `translateX(${rotation.y * 1.6}px) scale(${1 - Math.abs(rotation.x) * 0.015})`,
        }}
        aria-hidden="true"
      />

      {/* ─── 5. 3D Stack Stage (4 Cascading Liquid Glass Plates) ─── */}
      <div
        className="relative size-[360px] sm:size-[400px] flex items-center justify-center animate-drift"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* PLATE 1: BASE VIBRANT OCEANIC PILL (Bottom-Left) */}
        <div
          className="liquid-glass-plate overflow-hidden flex items-center justify-center"
          style={{
            zIndex: 1,
            transform: `translate3d(
              ${-72 + rotation.y * 0.15}px,
              ${86 - rotation.x * 0.15}px,
              0px
            ) rotateY(${rotation.y * 0.25}deg)`,
            background: "linear-gradient(to top, #005a96 0%, #0072bc 45%, #38bdf8 100%)",
            boxShadow:
              "0 35px 70px -15px rgba(0, 114, 188, 0.52), 0 12px 30px -5px rgba(56, 189, 248, 0.40), inset 0 2px 3px rgba(255, 255, 255, 0.70)",
          }}
        >
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.22) 100%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 260px 360px at ${50 + rotation.y * 1.2}% ${50 + rotation.x * 1.2}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.10) 45%, transparent 75%)`,
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-white/45 via-white/10 to-transparent rounded-t-[52px] pointer-events-none" />
          <div className="absolute inset-0 rounded-[52px] border border-white/50 pointer-events-none" />

          {/* S-LOGO: Deepest Layer Watermark (0.12 Opacity) */}
          <div className="relative z-10 w-[105px] h-auto flex items-center justify-center pointer-events-none">
            <div
              className="relative w-full h-[70px]"
              style={{
                filter: "brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                opacity: 0.12,
                transform: `translate3d(${rotation.y * 0.1}px, ${-rotation.x * 0.1}px, 0)`,
              }}
            >
              <Image
                src="/assets/services/s-logo.png"
                alt="Suffix IT"
                fill
                priority
                className="object-contain"
                sizes="110px"
              />
            </div>
          </div>
        </div>

        {/* PLATE 2: LIQUID GLASS LAYER 1 (Middle-Low) */}
        <div
          className="liquid-glass-plate overflow-hidden flex items-center justify-center"
          style={{
            zIndex: 2,
            transform: `translate3d(
              ${-24 + rotation.y * 0.35}px,
              ${28 - rotation.x * 0.35}px,
              40px
            ) rotateY(${rotation.y * 0.45}deg)`,
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(103, 160, 255, 0.22) 50%, rgba(255, 255, 255, 0.15) 100%)",
            backdropFilter: "blur(22px) saturate(220%)",
            WebkitBackdropFilter: "blur(22px) saturate(220%)",
            border: "1.5px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 25px 50px -10px rgba(0, 40, 120, 0.18), inset 0 1px 2px rgba(0, 0, 0, 0.08), inset 2px 2px 4px rgba(255, 255, 255, 0.90)",
          }}
        >
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.28) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute -inset-x-28 -inset-y-36 w-[440px] h-[580px] transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity * 0.4,
              transform: `translate3d(${sweepTranslateX * 0.7}px, ${sweepTranslateY * 0.7}px, 0) rotate(32deg)`,
              background:
                "linear-gradient(120deg, transparent 10%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.28) 45%, rgba(255,255,255,0.50) 50%, rgba(255,255,255,0.28) 55%, rgba(255,255,255,0.05) 75%, transparent 90%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[135px] bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-t-[52px] pointer-events-none" />
          <div className="absolute inset-[1.5px] rounded-[50.5px] border border-white/40 pointer-events-none" />

          {/* S-LOGO: Layer 2 -> 0.28 Opacity */}
          <div className="relative z-10 w-[100px] h-auto flex items-center justify-center pointer-events-none">
            <div
              className="relative w-full h-[66px]"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0,70,180,0.20)) saturate(150%)",
                opacity: 0.28,
                transform: `translate3d(${rotation.y * 0.2}px, ${-rotation.x * 0.2}px, 0)`,
              }}
            >
              <Image
                src="/assets/services/s-logo.png"
                alt=""
                fill
                className="object-contain"
                sizes="105px"
              />
            </div>
          </div>
        </div>

        {/* PLATE 3: LIQUID GLASS LAYER 2 (Middle-High) */}
        <div
          className="liquid-glass-plate overflow-hidden flex items-center justify-center"
          style={{
            zIndex: 3,
            transform: `translate3d(
              ${24 + rotation.y * 0.55}px,
              ${-30 - rotation.x * 0.55}px,
              80px
            ) rotateY(${rotation.y * 0.65}deg)`,
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.48) 0%, rgba(103, 160, 255, 0.24) 45%, rgba(255, 255, 255, 0.18) 100%)",
            backdropFilter: "blur(26px) saturate(230%)",
            WebkitBackdropFilter: "blur(26px) saturate(230%)",
            border: "1.6px solid rgba(255, 255, 255, 0.90)",
            boxShadow:
              "0 30px 60px -12px rgba(0, 40, 120, 0.22), inset 0 1px 2px rgba(0, 0, 0, 0.10), inset 2px 2px 5px rgba(255, 255, 255, 0.95)",
          }}
        >
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.22) 35%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.32) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute -inset-x-28 -inset-y-36 w-[440px] h-[580px] transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity * 0.65,
              transform: `translate3d(${sweepTranslateX * 0.85}px, ${sweepTranslateY * 0.85}px, 0) rotate(32deg)`,
              background:
                "linear-gradient(120deg, transparent 10%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0.06) 75%, transparent 90%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[135px] bg-gradient-to-b from-white/45 via-white/12 to-transparent rounded-t-[52px] pointer-events-none" />
          <div className="absolute inset-[1.5px] rounded-[50.5px] border border-white/45 pointer-events-none" />

          {/* S-LOGO: Layer 3 -> 0.55 Opacity */}
          <div className="relative z-10 w-[104px] h-auto flex items-center justify-center pointer-events-none">
            <div
              className="relative w-full h-[68px]"
              style={{
                filter: "brightness(1.10) contrast(1.12) drop-shadow(0 6px 14px rgba(0,40,120,0.22))",
                opacity: 0.55,
                transform: `translate3d(${rotation.y * 0.3}px, ${-rotation.x * 0.3}px, 0)`,
              }}
            >
              <Image
                src="/assets/services/s-logo.png"
                alt=""
                fill
                className="object-contain"
                sizes="105px"
              />
            </div>
          </div>
        </div>

        {/* PLATE 4: TOPMOST DIAMOND CHROME GLASS LAYER (Top-Right) */}
        <div
          className="liquid-glass-plate overflow-hidden flex items-center justify-center"
          style={{
            zIndex: 4,
            transform: `translate3d(
              ${80 + rotation.y * 0.75}px,
              ${-66 - rotation.x * 0.75}px,
              120px
            ) rotateY(${rotation.y * 0.88}deg)`,
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.60) 0%, rgba(103, 160, 255, 0.28) 40%, rgba(255, 255, 255, 0.22) 100%)",
            backdropFilter: "blur(30px) saturate(240%) contrast(110%)",
            WebkitBackdropFilter: "blur(30px) saturate(240%) contrast(110%)",
            border: "1.8px solid rgba(255, 255, 255, 0.98)",
            boxShadow:
              "0 35px 75px -15px rgba(0, 30, 100, 0.26), 0 14px 28px -6px rgba(0, 0, 0, 0.10), 0 0 25px rgba(255, 255, 255, 0.40), inset 2.5px 2.5px 6px rgba(255, 255, 255, 1)",
          }}
        >
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.10) 55%, rgba(255,255,255,0.40) 100%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity > 0 ? 1 : 0.30,
              background: `radial-gradient(ellipse 320px 420px at ${50 + rotation.y * 1.5}% ${50 + rotation.x * 1.5}%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.06) 65%, transparent 85%)`,
            }}
          />
          <div
            className="pointer-events-none absolute -inset-x-28 -inset-y-36 w-[440px] h-[580px] transition-opacity duration-150"
            style={{
              opacity: tiltReflectionOpacity * 0.95,
              transform: `translate3d(${sweepTranslateX}px, ${sweepTranslateY}px, 0) rotate(32deg)`,
              background:
                "linear-gradient(120deg, transparent 10%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0.08) 75%, transparent 90%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[145px] bg-gradient-to-b from-white/55 via-white/18 to-transparent rounded-t-[52px] pointer-events-none" />
          <div className="absolute inset-[1.8px] rounded-[50.2px] border border-white/50 pointer-events-none" />

          {/* S-LOGO: Topmost Layer -> 1.00 Crisp Chrome Emblem */}
          <div className="relative z-10 w-[110px] h-auto flex items-center justify-center pointer-events-none">
            <div
              className="relative w-full h-[74px] transition-transform duration-150"
              style={{
                filter:
                  "drop-shadow(0 12px 24px rgba(0,30,90,0.45)) drop-shadow(0 0 14px rgba(255,255,255,0.90)) contrast(115%)",
                opacity: 1.0,
                transform: `translate3d(${rotation.y * 0.4}px, ${-rotation.x * 0.4}px, 0)`,
              }}
            >
              <Image
                src="/assets/services/s-logo.png"
                alt="Suffix IT Software Suite"
                fill
                priority
                className="object-contain"
                sizes="115px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── 6. FLOATING HUD SATELLITE CARDS (PRODUCT TELEMETRY) ─── */}

      {/* SATELLITE 1 (Top-Right): Rupantar ERP & Tax Automation */}
      <div
        className="pointer-events-none absolute -top-1 right-0 sm:right-2 z-30 flex items-center gap-2.5 rounded-2xl border border-white/90 bg-white/90 p-2.5 shadow-[0_16px_36px_-8px_rgba(0,114,188,0.22)] backdrop-blur-xl transition-transform duration-300"
        style={{
          transform: `translate3d(${rotation.y * 1.5}px, ${-rotation.x * 1.5}px, 50px)`,
        }}
      >
        <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-tr from-[#0072bc] to-[#38bdf8] text-white shadow-xs">
          <Layers size={16} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <b className="text-[11px] font-black tracking-tight text-[#062b43]">Rupantar ERP</b>
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <small className="block text-[9.5px] font-bold text-[#0072bc]">
            NBR VAT 9.1 &amp; Multi-Branch GL
          </small>
          {/* Micro Activity Equalizer */}
          <div className="mt-1 flex items-end gap-0.5 h-2 w-20">
            {[65, 90, 75, 100, 85, 95, 80].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-xs bg-[#0072bc]"
                style={{ height: `${h}%`, opacity: 0.5 + i * 0.08 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SATELLITE 2 (Bottom-Left): Field Force & Live GPS Telemetry */}
      <div
        className="pointer-events-none absolute -bottom-1 left-0 sm:left-2 z-30 flex items-center gap-2.5 rounded-2xl border border-white/90 bg-white/90 p-2.5 shadow-[0_16px_36px_-8px_rgba(16,185,129,0.22)] backdrop-blur-xl transition-transform duration-300"
        style={{
          transform: `translate3d(${rotation.y * -1.3}px, ${-rotation.x * -1.3}px, 60px)`,
        }}
      >
        <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-tr from-[#059669] to-[#34d399] text-white shadow-xs">
          <Smartphone size={16} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <b className="text-[11px] font-black tracking-tight text-[#062b43]">Field Force (FFMS)</b>
            <span className="inline-flex items-center rounded-xs bg-emerald-50 px-1 py-0.2 font-mono text-[8.5px] font-bold text-emerald-700 border border-emerald-200">
              LIVE GPS
            </span>
          </div>
          <small className="block text-[9.5px] font-bold text-emerald-700">
            100k+ Visits/Day · Offline Sync
          </small>
        </div>
      </div>

      {/* SATELLITE 3 (Bottom-Right / Floating Badge): Smart POS Latency */}
      <div
        className="pointer-events-none absolute bottom-14 right-2 sm:right-6 z-30 hidden sm:flex items-center gap-2 rounded-xl border border-white/90 bg-white/95 px-3 py-1.5 shadow-[0_12px_28px_-6px_rgba(2,132,199,0.20)] backdrop-blur-xl transition-transform duration-300"
        style={{
          transform: `translate3d(${rotation.y * 1.8}px, ${-rotation.x * 1.8}px, 70px)`,
        }}
      >
        <div className="grid size-5.5 place-items-center rounded-lg bg-[#0284c7]/10 text-[#0284c7]">
          <Zap size={12} />
        </div>
        <div className="text-[10px] font-extrabold text-[#062b43]">
          &lt; 50ms <span className="font-medium text-slate-500 font-sans">POS Checkout</span>
        </div>
      </div>
    </div>
  );
}

