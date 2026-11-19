"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import type { Product } from "@/lib/products";
import type { ProductMediaConfig } from "./productDataMap";

export default function ProductDetailHero({
  product,
  mediaConfig,
}: {
  product: Product;
  mediaConfig: ProductMediaConfig;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 8, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden !pt-24 !pb-16 md:!pt-28 md:!pb-24 border-b border-[#0072bc]/10 bg-gradient-to-b from-[#f0f8ff] via-white to-[#f4f9fc]">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[500px] rounded-full bg-gradient-to-br from-[#0072bc]/15 via-[#38bdf8]/10 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-20 size-[450px] rounded-full bg-[#0072bc]/5 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs font-semibold text-[#17162a]/60"
        >
          <Link href="/" className="hover:text-[#0072bc] transition-colors">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/products" className="hover:text-[#0072bc] transition-colors">
            Products
          </Link>
          <span className="text-slate-400">/</span>
          <span aria-current="page" className="text-[#0072bc] font-bold">
            {product.name}
          </span>
        </nav>

        {/* Hero 2-Column Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:gap-14">
          {/* Left Column: SaaS Value Proposition */}
          <div data-service-stagger>
            {/* Version & Release Tag */}
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-[11px] font-bold text-emerald-700 shadow-2xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
                </span>
                <span>{mediaConfig.version}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200/80 px-3 py-1 text-[11px] font-bold text-[#0072bc] shadow-2xs">
                <Sparkles size={11} className="text-[#0072bc]" />
                <span>{mediaConfig.releaseBadge}</span>
              </span>
            </div>

            {/* Main Product Headline */}
            <h1 className="!m-0 text-[clamp(36px,4.5vw,66px)] font-black leading-[1.08] tracking-[-0.035em] text-[#062033]">
              {product.name}
              <br />
              <span className="bg-gradient-to-r from-[#0072bc] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
                Engineered for Scale.
              </span>
            </h1>

            {/* Tagline / Summary */}
            <p className="mt-5 mb-7 max-w-[530px] text-base sm:text-[17px] leading-relaxed text-[#17162a]/75 font-normal">
              {product.summary}
            </p>

            {/* High-impact Feature checklist */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[540px]">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2.5 rounded-xl border border-sky-100/80 bg-white/80 px-3.5 py-2.5 shadow-xs backdrop-blur-sm"
                >
                  <CheckCircle2 size={16} className="shrink-0 text-[#0072bc]" />
                  <span className="text-xs font-semibold text-[#062033]">{feature}</span>
                </div>
              ))}
            </div>

            {/* Primary & Secondary SaaS CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-between gap-3 min-h-[50px] px-6 py-3 rounded-full bg-[#0072bc] hover:bg-[#005c99] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#0072bc]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <span>Schedule a Live Walkthrough</span>
                <span className="size-7 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowUpRight size={16} />
                </span>
              </Link>

              <a
                href="#product-modules"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#062033] hover:text-[#0072bc] transition-colors py-2 px-3 rounded-full hover:bg-white/90"
              >
                <span>Explore Live Modules</span>
                <ArrowDown size={14} className="text-[#0072bc] animate-bounce" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D SaaS Window Stage Mockup */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* macOS SaaS Container */}
            <div className="relative rounded-[26px] border border-white/80 bg-white/90 p-3 sm:p-4 shadow-[0_24px_60px_-15px_rgba(0,114,188,0.22)] backdrop-blur-xl">
              {/* Window Header */}
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3 px-2">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#ff5f56]" />
                  <span className="size-3 rounded-full bg-[#ffbd2e]" />
                  <span className="size-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-100/80 px-3 py-1 text-[11px] font-medium text-slate-600">
                  <Shield size={11} className="text-emerald-600" />
                  <span>https://app.suffixit.com/{product.slug}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0072bc]">
                  <span className="size-1.5 rounded-full bg-[#0072bc] animate-pulse" />
                  <span>Live Sync</span>
                </div>
              </div>

              {/* Main Software Screenshot */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-slate-900 border border-slate-200/60 shadow-inner group">
                <Image
                  src={mediaConfig.heroImage}
                  alt={`${product.name} dashboard interface mockup`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Glass Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Telemetry Pill 1 (Top Right) */}
                <div className="absolute top-4 right-4 rounded-xl border border-white/30 bg-slate-950/75 px-3.5 py-2 text-white shadow-xl backdrop-blur-md">
                  <div className="text-[10px] font-semibold text-sky-300">1-Click Disbursement</div>
                  <div className="text-xs font-bold text-white">BEFTN Bank Advice Validated</div>
                </div>

                {/* Floating Telemetry Pill 2 (Bottom Left) */}
                <div className="absolute bottom-4 left-4 rounded-xl border border-white/30 bg-white/90 px-3.5 py-2 text-slate-800 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      ZKTeco Sync
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-[#062033]">
                    100% Biometric Records Matched
                  </div>
                </div>
              </div>

              {/* Bottom Software Tray */}
              <div className="mt-3 flex items-center justify-between px-2 pt-1 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <Cpu size={13} className="text-[#0072bc]" />
                  <span>Sub-50ms Processing Architecture</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                  <CheckCircle2 size={13} />
                  <span>Audit Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
