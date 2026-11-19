"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Check,
  MoveUpRight,
  Globe2,
  Activity,
  Layers,
  Cpu,
  Lock,
} from "lucide-react";
import type { Product } from "@/lib/products";
import type { ProductMediaConfig } from "../productDataMap";

interface ProductDetailHeroProps {
  product: Product;
  mediaConfig: ProductMediaConfig;
}

const getHeadlineTagline = (slug: string) => {
  if (slug.includes("payroll") || slug.includes("hcm")) {
    return {
      accent: "Engineered for Zero-Error Operations.",
      sub: "Automate complex salary structures, statutory NBR tax slabs, biometric shift deductions, and multi-bank BEFTN disbursements on a unified platform.",
      statNumber: "10k+",
      statLabel: "Active Records / Run",
      statSub: "Computed in < 1.2s",
    };
  }
  if (slug.includes("field")) {
    return {
      accent: "Real-Time Field Telemetry & Order Booking.",
      sub: "Track field sales reps, geofenced customer visits, and offline order capture with zero data loss across retail beats.",
      statNumber: "100k+",
      statLabel: "Daily Field Visits",
      statSub: "GPS-verified telemetry",
    };
  }
  if (slug.includes("e-commerce")) {
    return {
      accent: "High-Velocity Headless Omnichannel.",
      sub: "Scale transactions with sub-second page loads, automated inventory sync, and instant payment gateway fallbacks.",
      statNumber: "< 80ms",
      statLabel: "Checkout Latency",
      statSub: "+32% conversion lift",
    };
  }
  if (slug.includes("provident")) {
    return {
      accent: "Transparent Fund Governance & Auditing.",
      sub: "Maintain member contributions, interest distributions, and loan amortizations with bank-grade audit logs.",
      statNumber: "100%",
      statLabel: "Audit Reconciled",
      statSub: "Immutable PF ledgers",
    };
  }
  if (slug.includes("smart-pos") || slug.includes("pos")) {
    return {
      accent: "Lightning-Fast Point of Sale & Inventory.",
      sub: "Process transactions in under 50ms with multi-terminal sync, barcode scanning, and offline resilience.",
      statNumber: "< 50ms",
      statLabel: "Barcode Checkout",
      statSub: "Instant slip & cash drawer",
    };
  }
  if (slug.includes("erp")) {
    return {
      accent: "Unified Multi-Entity Enterprise Core.",
      sub: "Synchronize finance, supply chain, production, and statutory reporting across all your group companies.",
      statNumber: "99.98%",
      statLabel: "Ledger Accuracy",
      statSub: "NBR VAT & GL integrated",
    };
  }
  return {
    accent: "Built for Scalable Enterprise Operations.",
    sub: "High-concurrency architecture engineered to eliminate bottlenecks and automate mission-critical corporate workflows.",
    statNumber: "99.99%",
    statLabel: "Operational SLA",
    statSub: "Mission-critical uptime",
  };
};

export default function ProductDetailHeroNagorik({
  product,
  mediaConfig,
}: ProductDetailHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [stageTilt, setStageTilt] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  const taglineInfo = getHeadlineTagline(product.slug);

  // Scroll Parallax Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, -rect.top / (rect.height || 1)));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth 3D Mouse Parallax & Tilt Tracking
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x: nx, y: ny });
    setStageTilt({ x: -ny * 6, y: nx * 7 });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 });
    setStageTilt({ x: 0, y: 0 });
  }, []);

  const featureItems = product.features?.length
    ? product.features
    : [
        "100% NBR Tax Slabs Automated",
        "BEFTN Electronic Bank Advice",
        "ZKTeco Biometric Timeclock Sync",
        "Immutable Audit Trail & Permissions",
      ];

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-7 md:pb-20 bg-gradient-to-b from-[#f8fcff] via-[#f0f7fc] to-white border-b border-sky-100 select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. INTERACTIVE MOUSE-RESPONSIVE SHAPES & ARCHITECTURAL GRID
          ───────────────────────────────────────────────────────────── */}
      {/* Fine architectural dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0, 114, 188, 0.16) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Floating Interactive Wireframe Shape 1 (Top-Left Concentric Ring) */}
      <div
        className="pointer-events-none absolute -top-16 -left-16 size-[380px] rounded-full border border-[#0072bc]/15 border-dashed transition-transform duration-700 ease-out -z-10"
        style={{
          transform: `translate3d(${mouse.x * -35}px, ${mouse.y * -35}px, 0) rotate(${mouse.x * 45}deg)`,
        }}
        aria-hidden="true"
      />

      {/* Floating Interactive Wireframe Shape 2 (Top-Right Tech Hexagon) */}
      <div
        className="pointer-events-none absolute top-12 right-10 size-40 transition-transform duration-500 ease-out opacity-25 -z-10"
        style={{
          transform: `translate3d(${mouse.x * 45}px, ${mouse.y * 45}px, 0) rotate(${mouse.y * -35}deg)`,
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" className="size-full stroke-[#0072bc] stroke-[1.2]">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" strokeDasharray="5 5" />
          <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" strokeDasharray="3 3" opacity="0.6" />
        </svg>
      </div>

      {/* Floating Interactive Cyber Node 3 (Bottom-Left) */}
      <div
        className="pointer-events-none absolute bottom-10 left-12 size-28 rounded-full bg-gradient-to-tr from-sky-400/10 to-[#0072bc]/15 blur-xl transition-transform duration-600 ease-out -z-10"
        style={{
          transform: `translate3d(${mouse.x * -20}px, ${mouse.y * 25}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* Ambient glowing radial light orbs */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[680px] rounded-full bg-gradient-to-br from-sky-300/25 via-[#0072bc]/10 to-transparent blur-3xl -z-10 animate-pulse"
        style={{ animationDuration: "10s" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-36 -left-20 size-[520px] rounded-full bg-gradient-to-tr from-[#38bdf8]/15 via-blue-100/20 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* ─────────────────────────────────────────────────────────────
            2. TOP CONSOLE: BREADCRUMBS & LIVE STATUS CAPSULE
            ───────────────────────────────────────────────────────────── */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"
          >
            <Link href="/" className="hover:text-[#0072bc] transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <Link
              href="/products"
              className="hover:text-[#0072bc] transition-colors"
            >
              Products
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span aria-current="page" className="text-[#0072bc] font-bold">
              {product.name}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-sky-200/90 px-3.5 py-1 text-xs font-bold shadow-2xs backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-slate-900 font-extrabold uppercase tracking-wider text-[11px]">
              {product.category || "Enterprise Suite"}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-[#0072bc] font-semibold text-[11px]">
              {mediaConfig.version || "Cloud v3.4"}
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. EDITORIAL HERO HEADLINE & POSITIONING
            ───────────────────────────────────────────────────────────── */}
        <div className="mb-6 md:mb-8 max-w-[960px]">
          <h1 className="!m-0 text-[clamp(32px,4.8vw,64px)] font-black leading-[1.04] tracking-[-0.04em] text-[#0f172a]">
            {product.name}.{" "}
            <span className="bg-gradient-to-r from-[#0072bc] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
              {taglineInfo.accent}
            </span>
          </h1>

          <p className="mt-4 max-w-[680px] text-base sm:text-lg leading-relaxed text-[#334155] font-normal">
            {taglineInfo.sub}
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. THE GRAND CINEMATIC STAGE (ABOUT-PAGE STYLE WITH PARALLAX)
            A large panoramic visual stage with royal blue origin panel
            ───────────────────────────────────────────────────────────── */}
        <div
          className="relative transition-transform duration-500 ease-out"
          style={{
            perspective: "1600px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_220px] xl:grid-cols-[1fr_260px] rounded-3xl overflow-hidden shadow-[0_28px_70px_-18px_rgba(0,114,188,0.28),0_12px_28px_-6px_rgba(15,23,42,0.1)] border border-slate-200/90 bg-white transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `rotateX(${stageTilt.x}deg) rotateY(${stageTilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* ─── LEFT: BIG CINEMATIC IMAGE STAGE WITH PARALLAX ─── */}
            <div className="relative isolate min-h-[440px] sm:min-h-[490px] md:min-h-[530px] xl:min-h-[590px] overflow-hidden bg-slate-900 group">
              {/* Grand Panoramic 3D Image with Smooth Scroll & Mouse Parallax */}
              <div
                className="absolute inset-0 size-full transition-transform duration-150 ease-out will-change-transform"
                style={{
                  transform: `scale(1.08) translateY(${scrollProgress * 26}px) translate3d(${mouse.x * -14}px, ${mouse.y * -14}px, 0)`,
                }}
              >
                <Image
                  src={mediaConfig.heroImage}
                  alt={`${product.name} Enterprise Visual Architecture`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 85vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Cinematic Vignette Overlay ensuring pristine contrast */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-transparent z-10"
                aria-hidden="true"
              />

              {/* Top Glass Caption Index */}
              <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-20">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 border border-white/20 px-3 py-1 text-[11px] font-semibold text-sky-200 shadow-md backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Architecture &amp; Interface • Live Production</span>
                </span>
              </div>

              {/* Bottom Editorial Title Overlaid on Image */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 text-white max-w-[580px]">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-sky-300" />
                  <span>{mediaConfig.releaseBadge || "NBR Tax Slabs 2024-25 Compliant"}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-[34px] xl:text-[40px] font-extrabold leading-[1.08] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {product.name}.{" "}
                  <em className="font-normal italic font-serif text-sky-200">
                    {taglineInfo.accent}
                  </em>
                </h2>
              </div>

              {/* Bottom Right Floating Action Pill */}
              <Link
                href="/contact"
                className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white text-slate-900 hover:text-[#0072bc] border border-white/60 px-5 py-2.5 text-xs font-bold shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Live Walkthrough</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* ─── RIGHT: SUFFIX IT ROYAL BLUE ORIGIN & TELEMETRY PANEL ─── */}
            <div className="relative flex flex-row flex-wrap items-center gap-x-5 overflow-hidden bg-[#0072bc] px-6 py-6 text-white md:flex-col md:items-start md:gap-0 md:px-6 md:py-8 xl:px-8 xl:py-9 select-none">
              <span className="w-full text-xs font-bold uppercase tracking-wider text-sky-200">
                Performance Telemetry
              </span>

              {/* Monumental Stat Callout */}
              <strong className="text-4xl font-black leading-tight tracking-tight md:text-5xl xl:text-6xl text-white mt-1">
                {taglineInfo.statNumber}
              </strong>

              <span className="text-xs font-semibold text-sky-100 mt-0.5">
                {taglineInfo.statLabel}
              </span>

              {/* Interactive Concentric Wireframe Shapes (Reacts to Mouse Position) */}
              <div
                className="absolute -right-10 top-24 hidden h-[180px] w-[260px] -rotate-[22deg] md:block pointer-events-none transition-transform duration-500 ease-out"
                style={{
                  transform: `rotate(-22deg) translate3d(${mouse.x * 25}px, ${mouse.y * 20}px, 0)`,
                }}
                aria-hidden="true"
              >
                <i
                  className="block h-[58px] rounded-[50%] border border-white/30 -mt-4 transition-transform duration-300"
                  style={{ transform: `scale(${1 + mouse.x * 0.12})` }}
                />
                <i
                  className="block h-[58px] rounded-[50%] border border-white/30 -mt-4 transition-transform duration-300"
                  style={{ transform: `scale(${1 + mouse.y * 0.12})` }}
                />
                <i
                  className="block h-[58px] rounded-[50%] border border-white/30 -mt-4 transition-transform duration-300"
                  style={{ transform: `scale(${1 - mouse.x * 0.12})` }}
                />
              </div>

              {/* Bottom Grounding Narrative */}
              <div className="mt-auto pt-6 border-t border-white/20 w-full hidden md:block">
                <p className="text-xs sm:text-[13px] leading-relaxed text-sky-50 font-medium">
                  Built for Bangladesh Enterprise.
                  <br />
                  Engineered to Global Standards.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-200">
                    Suffix Suite 6.0
                  </span>
                  <MoveUpRight size={20} className="text-sky-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 5. HERO CARD BOTTOM ACTIONS & TRUST STRIP ─── */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-2">
          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0072bc] to-[#0284c7] hover:from-[#005a96] hover:to-[#0072bc] text-white px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-[#0072bc]/25 hover:shadow-xl hover:shadow-[#0072bc]/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <span>Request Platform Demo</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <a
              href="#consultation-form"
              className="group inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#0072bc] border border-slate-200/90 hover:border-[#0072bc]/30 px-6 py-3.5 text-sm sm:text-base font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <Sparkles
                size={15}
                className="text-[#0072bc] transition-transform duration-300 group-hover:rotate-12"
              />
              <span>Schedule Walkthrough</span>
            </a>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {featureItems.slice(0, 3).map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-100/90 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-sm"
              >
                <Check size={12} className="text-[#0072bc]" strokeWidth={2.5} />
                <span>{f}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
