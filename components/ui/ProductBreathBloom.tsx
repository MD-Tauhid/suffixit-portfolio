"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Layers,
  Smartphone,
  Users,
  ShoppingCart,
  Cloud,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  cubicBezier,
  sampleKeys,
  breathAt,
  pointerPose,
  damp,
  type BloomPose,
  type Range,
  type BloomKey,
} from "./breath-bloom";
import { SuffixGlassReveal } from "./liquid-glass-logo-reveal";

export interface BloomProductItem {
  id: string;
  name: string;
  tag: string;
  category: string;
  image: string;
  slug: string;
  stat: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const BLOOM_PRODUCTS: BloomProductItem[] = [
  {
    id: "erp",
    name: "Rupantar ERP",
    tag: "Multi-Warehouse & NBR VAT",
    category: "Operations",
    image: "/assets/products/hex-erp.jpg",
    slug: "rupantar-erp",
    stat: "99.98% Ledger Accuracy",
    icon: Layers,
  },
  {
    id: "ffms",
    name: "Field Force",
    tag: "GPS Telemetry & Beat Visits",
    category: "Field & Retail",
    image: "/assets/products/hex-ffms.jpg",
    slug: "field-force",
    stat: "100k+ Visits / Day",
    icon: Smartphone,
  },
  {
    id: "hcm",
    name: "Rupantar HCM",
    tag: "Biometric & Statutory Payroll",
    category: "People & Tax",
    image: "/assets/products/hex-hcm.jpg",
    slug: "rupantar-hcm",
    stat: "100% Tax Compliant",
    icon: Users,
  },
  {
    id: "pos",
    name: "Smart POS",
    tag: "Barcode & Fast Checkout",
    category: "Retail Operations",
    image: "/assets/products/hex-pos.jpg",
    slug: "smart-pos",
    stat: "< 50ms Response",
    icon: Activity,
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    tag: "Headless Omnichannel Store",
    category: "Digital Commerce",
    image: "/assets/products/hex-ecommerce.jpg",
    slug: "e-commerce",
    stat: "+32% Conversion Lift",
    icon: ShoppingCart,
  },
  {
    id: "cloud",
    name: "Cloud Security",
    tag: "Microservices & 99.99% SLA",
    category: "Infrastructure",
    image: "/assets/products/hex-cloud.jpg",
    slug: "cloud-hosting",
    stat: "Bank-Grade Encryption",
    icon: Cloud,
  },
];

const KEYFRAMES: BloomKey[] = [
  { at: 0, amplitude: 1.34, scale: 0.98 },
  { at: 0.5, amplitude: 1.12, scale: 1.08 },
  { at: 1, amplitude: 1.34, scale: 1.10 },
];

export default function ProductBreathBloom({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const petalRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  const pointer = useRef({ px: 0.5, py: 0.5, active: false });
  const pinned = useRef<BloomPose | null>(null);
  const pose = useRef<BloomPose>({ amplitude: 0.25, scale: 0.35 });

  const count = BLOOM_PRODUCTS.length; // 6 hexagons

  const ease = useMemo(() => cubicBezier(0.8, 0, 0.2, 1), []);

  useEffect(() => {
    const root = rootRef.current;
    const stageEl = stageRef.current;
    if (!root || !stageEl) return;

    let hexW = 138; // Hexagon width in px
    let raf = 0;
    let last = 0;
    let clock = 0;
    let ring = 0;
    let onScreen = true;
    let reduced = false;

    const measure = () => {
      const short = Math.min(root.clientWidth, root.clientHeight);
      // Balanced hexagon width between 124px and 152px
      const w = Math.min(152, Math.max(124, short * 0.28));
      // Regular hexagon height = width * 1.1547
      const h = w * 1.1547;
      hexW = w;
      stageEl.style.setProperty("--hex-w", `${w.toFixed(1)}px`);
      stageEl.style.setProperty("--hex-h", `${h.toFixed(1)}px`);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(root);

    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;

      if (!reduced) {
        clock += dt;
        ring += 2.5 * dt; // Luxurious orbital glide (2.5 deg/sec)
      }

      const breath = reduced ? { x: 0.5, stage: 1 } : breathAt(clock, 4.2);
      const ptr = pointer.current;
      const steering = ptr.active;

      const target =
        pinned.current ??
        (steering
          ? pointerPose(ptr.px, ptr.py, [0.8, 1.8], [0.85, 1.35])
          : sampleKeys(KEYFRAMES, breath.x, ease));

      const cur = pose.current;
      cur.amplitude = damp(cur.amplitude, target.amplitude, 4.8, dt);
      cur.scale = damp(cur.scale, target.scale, 4.8, dt);

      // Position each hexagon along the orbital circle with organic entry bloom
      for (let i = 0; i < count; i++) {
        const el = petalRefs.current[i];
        if (!el) continue;

        const deg = (360 / count) * i + (30 + ring);
        const rad = (deg * Math.PI) / 180;
        const r = cur.amplitude * (hexW * 1.16);
        const x = Math.cos(rad) * r;
        const y = -Math.sin(rad) * r;
        const s = cur.scale;

        const opacity = Math.min(1, Math.max(0, (cur.scale - 0.35) / 0.45));
        el.style.opacity = String(opacity);
        el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${s.toFixed(3)})`;
      }

      // Soft ambient backing glow
      const glow = glowRef.current;
      if (glow) {
        const reach = cur.amplitude + cur.scale * 0.5 + 0.5;
        glow.style.transform = `translate(-50%, -50%) scale(${(reach / 2.6).toFixed(3)})`;
        glow.style.opacity = String(0.42 * Math.min(1, 0.4 + cur.scale / 3.5));
      }

      setActiveStage(breath.stage);

      if (onScreen && !document.hidden) {
        raf = requestAnimationFrame(frame);
      }
    };

    const wake = () => {
      if (!raf && onScreen && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const io = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting;
      wake();
    });
    io.observe(root);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      reduced = mq.matches;
      wake();
    };
    onMotion();
    mq.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", wake);
    wake();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      mq.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [count, ease]);

  const handlePointerMove = (e: React.PointerEvent) => {
    const r = rootRef.current?.getBoundingClientRect();
    if (!r || !r.width || !r.height) return;
    pointer.current = {
      px: (e.clientX - r.left) / r.width,
      py: (e.clientY - r.top) / r.height,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointer.current.active = false;
  };

  const handleTogglePin = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    const r = rootRef.current?.getBoundingClientRect();
    if (!r || !r.width || !r.height) return;
    if (pinned.current) {
      pinned.current = null;
      setIsPinned(false);
    } else {
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      pinned.current = pointerPose(px, py, [0.8, 1.8], [0.85, 1.35]);
      setIsPinned(true);
    }
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handleTogglePin}
      className={`relative w-full h-[460px] sm:h-[490px] lg:h-[510px] select-none flex items-center justify-center overflow-visible ${className}`}
      style={{ touchAction: "pan-y" }}
      aria-label="Suffix IT Modular Product Hexagon Constellation"
    >
      {/* Global SVG ClipPath Definition for Rounded Pointy-Topped Hexagon with Luxury Fillets */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="rounded-hex" clipPathUnits="objectBoundingBox">
            <path d="M 0.58 0.04 L 0.931 0.21 Q 1 0.25 1 0.33 L 1 0.67 Q 1 0.75 0.931 0.79 L 0.58 0.96 Q 0.5 1 0.42 0.96 L 0.069 0.79 Q 0 0.75 0 0.67 L 0 0.33 Q 0 0.25 0.069 0.21 L 0.42 0.04 Q 0.5 0 0.58 0.04 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 1. AMBIENT BACKING GLOW & CYBERNETIC GUIDES */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[380px] sm:size-[440px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(0,114,188,0.20)_42%,transparent_70%)] blur-3xl will-change-transform"
        aria-hidden="true"
      />

      {/* Rotating Hexagonal Telemetry Guide */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[440px] sm:size-[490px] animate-[spin_180s_linear_infinite] opacity-30"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="200,20 355.88,110 355.88,290 200,380 44.12,290 44.12,110"
          stroke="#0072bc"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
        <polygon
          points="200,65 316.91,132.5 316.91,267.5 200,335 83.09,267.5 83.09,132.5"
          stroke="#38bdf8"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />
      </svg>

      {/* Outer Dashed Orbit Ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[390px] sm:size-[440px] rounded-full border border-[#0072bc]/20 border-dashed animate-[spin_140s_linear_infinite]"
        aria-hidden="true"
      />

      {/* Middle Concentric Ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[290px] sm:size-[330px] rounded-full border border-sky-300/35"
        aria-hidden="true"
      />

      {/* 2. THE 6 BREATHING PRODUCT HEXAGONS */}
      <div
        ref={stageRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {BLOOM_PRODUCTS.map((prod, idx) => {
          const isHovered = hoveredIdx === idx;
          const IconComp = prod.icon;

          return (
            <div
              key={prod.id}
              ref={(el) => {
                petalRefs.current[idx] = el;
              }}
              className="pointer-events-auto absolute left-1/2 top-1/2 cursor-pointer transition-all duration-300"
              style={{
                width: "var(--hex-w, 138px)",
                height: "var(--hex-h, 159px)",
                margin: "calc(var(--hex-h, 159px) * -0.5) 0 0 calc(var(--hex-w, 138px) * -0.5)",
                transformOrigin: "center",
                zIndex: isHovered ? 40 : 15,
                filter: isHovered
                  ? "drop-shadow(0 20px 38px rgba(0, 114, 188, 0.42)) drop-shadow(0 4px 14px rgba(56, 189, 248, 0.55))"
                  : "drop-shadow(0 10px 24px rgba(0, 114, 188, 0.18)) drop-shadow(0 2px 6px rgba(15, 23, 42, 0.08))",
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Link
                href={`/products/${prod.slug}`}
                className="group relative block size-full transition-transform duration-300 hover:scale-[1.06]"
                title={`${prod.name} — ${prod.tag}`}
              >
                {/* Outer Hexagon Border (Rounded Pointy-Topped, Gradient Edge) */}
                <div
                  className="size-full p-[2.2px] transition-all duration-300"
                  style={{
                    clipPath: "url(#rounded-hex)",
                    background: isHovered
                      ? "linear-gradient(135deg, #38bdf8 0%, #0072bc 50%, #93c5fd 100%)"
                      : "linear-gradient(135deg, rgba(56,189,248,0.95) 0%, rgba(0,114,188,0.75) 45%, rgba(255,255,255,0.95) 100%)",
                  }}
                >
                  {/* Inner Hexagon Body (3D Visuals & Glass Glaze) */}
                  <div
                    className="relative size-full overflow-hidden bg-white"
                    style={{
                      clipPath: "url(#rounded-hex)",
                    }}
                  >
                    {/* 3D Product Art */}
                    <div className="absolute inset-0 size-full">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 768px) 150px, 180px"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                        priority={idx < 2}
                      />
                    </div>

                    {/* Top Architectural Crystal Reflection */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 via-white/20 to-transparent"
                    />

                    {/* Bottom Vignette for Legibility */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent transition-opacity group-hover:from-slate-950/95" />

                    {/* Upright Content Overlay (Positioned in wide zone above bottom taper) */}
                    <div className="relative z-10 size-full flex flex-col items-center justify-end pb-5 sm:pb-6 px-2 text-center">
                      {/* Category Tag Pill */}
                      <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[8px] sm:text-[8.5px] font-black text-[#0072bc] shadow-sm backdrop-blur-md">
                        <IconComp size={8.5} className="shrink-0 text-[#0072bc]" />
                        <span className="truncate max-w-[80px]">{prod.category}</span>
                      </span>

                      {/* Product Title (Always clear and never clipped by bottom taper) */}
                      <span className="text-[10.5px] sm:text-[11.5px] font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-[108px] truncate">
                        {prod.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Reveal Floating Stat Badge */}
                {isHovered && (
                  <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 rounded-lg bg-slate-950/95 border border-sky-400/60 px-2.5 py-1 text-[10px] font-bold text-white shadow-xl backdrop-blur-md animate-fadeIn">
                    <span className="text-sky-300">{prod.stat}</span>
                    <span className="ml-1 text-slate-400">→</span>
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      {/* 3. LUMINOUS CENTER CORE (Liquid Glass Logo in 3D Hexagon Architecture) */}
      <div
        className="relative z-20 pointer-events-auto flex flex-col items-center justify-center cursor-pointer"
        style={{
          filter: "drop-shadow(0 16px 40px rgba(0, 114, 188, 0.28)) drop-shadow(0 4px 14px rgba(56, 189, 248, 0.35))",
        }}
      >
        <div
          className="group relative flex items-center justify-center transition-transform duration-300 hover:scale-105"
          style={{
            width: "124px",
            height: "143px",
          }}
        >
          {/* Pulsing Luminous Backing Aura */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.48)_0%,rgba(0,114,188,0.25)_45%,transparent_70%)] blur-2xl opacity-90 animate-pulse"
            aria-hidden="true"
          />

          {/* Concentric Orbital Tech Ring */}
          <div
            className="pointer-events-none absolute -inset-3 rounded-full border border-[#0072bc]/30 border-dashed animate-[spin_80s_linear_infinite]"
            aria-hidden="true"
          />

          {/* Outer Hexagonal Border (Vibrant Cyan-Blue-White Holographic Edge) */}
          <div
            className="size-full p-[2.5px] transition-all duration-300"
            style={{
              clipPath: "url(#rounded-hex)",
              background: "linear-gradient(135deg, #0072bc 0%, #38bdf8 50%, #ffffff 100%)",
            }}
          >
            {/* Inner Hexagon Core Housing SuffixGlassReveal */}
            <div
              className="relative size-full overflow-hidden bg-[#e8f3fc] flex items-center justify-center"
              style={{
                clipPath: "url(#rounded-hex)",
              }}
            >
              {/* Fallback Image for Instant Paint */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image
                  src="/assets/about/s-logo.png"
                  alt="Suffix IT"
                  width={68}
                  height={68}
                  className="object-contain drop-shadow-[0_2px_8px_rgba(0,114,188,0.3)]"
                  priority
                />
              </div>

              <SuffixGlassReveal
                className="size-full cursor-pointer relative z-10"
                background="#e8f3fc"
                look="light"
                logo="/assets/about/s-logo.png"
                logoColor="#0072bc"
                originalColors={false}
                tileSize={280}
                loop={true}
                speed={1}
                tuning={{
                  startZoom: 2.3,
                  dispersion: 1.85,
                  colorBleed: 1.35,
                  corner: 4.8,
                  specular: 1.25,
                  sheen: 1.1,
                }}
              />

              {/* Top Crystal Edge Glaze */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/75 via-white/20 to-transparent z-20"
              />
            </div>
          </div>

          {/* Bottom Floating Engine Status Badge */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 rounded-full bg-[#0072bc] px-3 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-white shadow-md whitespace-nowrap border border-white/40">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>6 ENGINES • SUITE 6.0</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM INTERACTION HINT */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-5 sm:-bottom-6 z-20 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-sky-200/80 px-3.5 py-1 text-[9.5px] font-bold text-slate-700 shadow-2xs backdrop-blur-md">
          <Sparkles size={11} className="text-[#0072bc]" />
          <span>
            {isPinned
              ? "Pinned Constellation • Click anywhere to breathe"
              : "Move pointer to steer hexagons • Click to pin"}
          </span>
        </div>
      </div>
    </div>
  );
}
