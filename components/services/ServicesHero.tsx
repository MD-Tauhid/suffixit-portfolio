"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import HeroOrb from "@/components/sections/HeroOrb";
import { serviceContainer } from "./service-styles";
import StackableGlassVisual from "./StackableGlassVisual";

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Multi-Plane 3D Mouse Parallax Engine
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const items = section.querySelectorAll<HTMLElement>("[data-parallax-speed]");

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center, scaled smoothly (-1 to 1 range approx)
      const x = (e.clientX - centerX) / 45;
      const y = (e.clientY - centerY) / 45;

      // Parallax translation for floating HUD cards
      items.forEach((item) => {
        const speed = parseFloat(item.dataset.parallaxSpeed || "1");
        item.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
      });
    };

    const handleMouseLeave = () => {
      items.forEach((item) => {
        item.style.transform = "translate3d(0px, 0px, 0)";
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parallax-section"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#f4f8fc] via-[#edf5fc] to-[#f8fbfe] pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14 border-b border-[#dce8f5]"
    >
      <style jsx>{`
        .parallax-item {
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
      `}</style>

      {/* ────────────────────────────────────────────────────────
          1. CINEMATIC BACKGROUND ATMOSPHERE & ARCHITECTURAL GRID
         ──────────────────────────────────────────────────────── */}
      {/* Blueprint Image Backdrop with Subtle Vignette Blend */}
      <div className="pointer-events-none absolute inset-0 -z-30 overflow-hidden opacity-30 select-none">
        <Image
          src="/assets/services/services-hero-cinematic.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter blur-[1px] saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8fc]/90 via-[#edf5fc]/85 to-[#f8fbfe]/95 backdrop-blur-[2px]" />
      </div>

      {/* Atmospheric Radial Sapphire & Cyan Lighting Mesh */}
      <div
        data-parallax-speed="0.8"
        className="parallax-item pointer-events-none absolute -top-40 left-1/4 -z-20 size-[620px] rounded-full bg-[radial-gradient(circle,rgba(0,114,188,0.18)_0%,rgba(56,189,248,0.1)_45%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        data-parallax-speed="-1.2"
        className="parallax-item pointer-events-none absolute top-1/3 -right-28 -z-20 size-[550px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,rgba(0,114,188,0.08)_50%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        data-parallax-speed="0.5"
        className="parallax-item pointer-events-none absolute -bottom-32 left-10 -z-20 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.12)_0%,transparent_65%)] blur-3xl"
        aria-hidden="true"
      />

      {/* High-Tech Architectural Grid Matrix */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,114,188,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,114,188,0.06)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Technical Watermark Telemetry Coordinates Banner */}
      <div className="pointer-events-none absolute top-3 left-0 right-0 -z-10 hidden lg:flex items-center justify-between px-10 text-[10px] font-mono tracking-widest text-[#0072bc]/30 uppercase select-none">
        <span>SUFFIX IT ENGINEERING LABS // ENTERPRISE PRACTICES &amp; INFRASTRUCTURE</span>
        <span>LAT 23.8103° N · LON 90.4125° E · DHAKA, BANGLADESH · 14 DISCIPLINES</span>
      </div>

      <div className={serviceContainer}>
        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-12">
          {/* ────────────────────────────────────────────────────────
              LEFT COLUMN: EXECUTIVE HEADLINE & ULTRA-CLEAN LUXURY HERO
             ──────────────────────────────────────────────────────── */}
          <div className="z-10">
            {/* Top Eyebrow Badge with Pulsing Green Indicator */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#0072bc35] bg-white/80 px-3.5 py-1 shadow-xs backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
              </span>
              <span className="text-[10.5px] font-extrabold tracking-wider uppercase text-[#0072bc]">
                Enterprise Software &amp; IT Engineering Capabilities
              </span>
            </div>

            {/* Cinematic Main Headline */}
            <h1 className="text-[clamp(28px,3.4vw,46px)] font-black leading-[1.12] tracking-[-1.5px] text-[#05263d] md:tracking-[-2px]">
              Enterprise Software &amp;{" "}
              <span className="block text-[#062b43]">IT Engineering Services.</span>
              <em className="mt-0.5 block font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-[#0072bc] via-[#0284c7] to-[#059669]">
                Built For Mission-Critical Scale.
              </em>
            </h1>

            {/* Authoritative Lead Description */}
            <p className="mt-3.5 max-w-[510px] text-[13.5px] sm:text-[14px] leading-[1.68] text-[#425d74]">
              From custom enterprise web platforms and 60fps native mobile apps to zero-trust defensive cybersecurity, resilient cloud storage, and ERP business transformation—we engineer dependable software and IT infrastructure for Bangladesh&apos;s leading institutions and global enterprises.
            </p>

            {/* High-Converting Action CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#our-services"
                className="group relative inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0072bc] to-[#0284c7] px-6 py-2.5 text-xs sm:text-[13px] font-bold text-white shadow-[0_10px_24px_-4px_rgba(0,114,188,0.38)] transition-all duration-300 hover:from-[#005a96] hover:to-[#0072bc] hover:shadow-[0_14px_28px_-4px_rgba(0,114,188,0.48)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Practice Areas</span>
                <span className="grid size-5 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0.5">
                  <ArrowDown size={12} />
                </span>
              </a>

              <Link
                href="/contact"
                className="group inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#cbdce9] bg-white/95 px-5 py-2.5 text-xs sm:text-[13px] font-bold text-[#062b43] shadow-xs backdrop-blur-md transition-all duration-300 hover:border-[#0072bc] hover:bg-white hover:text-[#0072bc] hover:shadow-xs cursor-pointer"
              >
                <span>Book Technical Consultation</span>
                <ArrowUpRight size={14} className="text-[#0072bc] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Enterprise Engineering Guarantees Trust Strip (Ultra-Clean Luxury Design) */}
            <div className="mt-7 border-t border-[#dce8f5] pt-5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[11.5px] sm:text-xs font-semibold text-[#486379]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>100% Source Code &amp; IP Ownership</span>
                </div>
                <div className="hidden sm:block size-1 rounded-full bg-slate-300" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#0072bc] shrink-0" />
                  <span>Sub-28ms p99 Latency Architecture</span>
                </div>
                <div className="hidden sm:block size-1 rounded-full bg-slate-300" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-purple-600 shrink-0" />
                  <span>ISO 27001 Zero-Trust Governed</span>
                </div>
                <div className="hidden sm:block size-1 rounded-full bg-slate-300" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>99.98% High Availability SLA</span>
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────
              RIGHT COLUMN: 3D HOLOGRAPHIC OPERATIONS CONSOLE
              With Multi-Plane Depth Floating HUD Cards
             ──────────────────────────────────────────────────────── */}
          <div className="relative flex items-center justify-center py-2 sm:py-4">
            {/* Spinning Ambient HeroOrb in background with gentle parallax */}
            <div
              data-parallax-speed="0.4"
              className="parallax-item pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-80"
              aria-hidden="true"
            >
              <div className="size-[320px] md:size-[360px]">
                <HeroOrb />
              </div>
            </div>

            {/* 3D Tech Orbit Ring Around 3D Glass Sculpture */}
            <div
              data-parallax-speed="0.6"
              className="parallax-item pointer-events-none absolute size-[340px] sm:size-[390px] md:size-[430px] -z-10 rounded-full border border-[#0072bc]/15 border-dashed animate-[spin_120s_linear_infinite]"
              aria-hidden="true"
            />

            {/* ========================================================
                FLOATING PARALLAX HUD CARDS (2 Orbiting Satellites)
               ======================================================== */}
            {/* SATELLITE 1 (Top-Right): 99.98% High Availability Cloud SLA */}
            <div
              data-parallax-speed="2.2"
              className="parallax-item absolute top-1 right-1 sm:right-2 z-30 hidden sm:flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/95 p-2 shadow-[0_12px_28px_-8px_rgba(0,114,188,0.22)] backdrop-blur-xl"
            >
              <div className="grid size-7.5 place-items-center rounded-lg bg-gradient-to-tr from-[#0072bc] to-[#38bdf8] text-white shadow-xs">
                <Cloud size={15} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <b className="text-[10.5px] font-black text-[#062b43]">Multi-AZ Cloud</b>
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <small className="block text-[9.5px] font-bold text-[#0072bc]">99.98% High Uptime SLA</small>
                {/* Micro Uptime Activity Equalizer */}
                <div className="mt-1 flex items-end gap-0.5 h-2.5 w-16">
                  {[60, 85, 70, 95, 80, 100, 90].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-xs bg-[#0072bc]"
                      style={{ height: `${h}%`, opacity: 0.5 + (i * 0.08) }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* SATELLITE 2 (Bottom-Left): Zero-Trust Defensive Cybersecurity & ISO 27001 */}
            <div
              data-parallax-speed="-2.0"
              className="parallax-item absolute bottom-1 left-1 sm:left-2 z-30 hidden sm:flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/95 p-2 shadow-[0_12px_28px_-8px_rgba(124,58,237,0.22)] backdrop-blur-xl"
            >
              <div className="grid size-7.5 place-items-center rounded-lg bg-gradient-to-tr from-[#7c3aed] to-[#a855f7] text-white shadow-xs">
                <ShieldCheck size={15} />
              </div>
              <div>
                <b className="block text-[10.5px] font-black text-[#062b43]">Zero-Trust Security</b>
                <small className="block text-[9.5px] font-bold text-[#7c3aed]">ISO 27001 Governed</small>
                <div className="mt-0.5 flex items-center gap-1 text-[8.5px] font-semibold text-emerald-600">
                  <span className="size-1 rounded-full bg-emerald-500" />
                  <span>24/7 Threat Protection Active</span>
                </div>
              </div>
            </div>

            {/* ========================================================
                AUTONOMOUS 3D FLOATING GLASS SCULPTURE (MUSEMIND STYLE)
               ======================================================== */}
            <div
              className="relative w-full max-w-[520px] h-[400px] sm:h-[440px] md:h-[480px] flex items-center justify-center"
            >
              {/* 3D Stackable Glass Architecture (Pure Spline Physics Replica) */}
              <StackableGlassVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
