"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Users,
  ChevronRight,
  Zap,
  Lock,
} from "lucide-react";
import type { Service } from "@/lib/services";
import type { ServiceMediaConfig } from "../serviceDataMap";

const DISC = 44;

const serviceTitles: Record<string, string> = {
  "web-ecommerce": "Web & E-Commerce Engineering",
  "mobile-apps": "Enterprise Mobile App Development",
  "custom-software": "Custom Software Engineering",
  "dedicated-teams": "Dedicated Engineering Teams",
  "iot-solutions": "Industrial IoT & Connected Solutions",
  "cloud-hosting": "Cloud Infrastructure & Managed Hosting",
  "hospital-management": "Hospital Management Systems",
  "learning-management": "Learning Management Systems",
  "video-conferencing": "Suffix Video Conferencing",
  "system-integration": "Consultancy & System Integration",
  "power-cooling": "Infrastructure Power & Cooling",
  "bulk-sms": "Enterprise Bulk SMS Gateway",
  "it-infrastructure": "IT Infrastructure Solutions",
  "it-ot-security": "IT & OT Cybersecurity Solutions",
  "industrial-energy-monitoring": "Industrial Energy Monitoring",
};

export default function ServiceDetailHeroNagorik({
  service,
  mediaConfig,
}: {
  service: Service;
  mediaConfig: ServiceMediaConfig;
}) {
  const displayTitle = serviceTitles[service.slug] || `${service.name} Services`;
  const containerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 3D Perspective Tilt on Mouse Move
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 6, y: x * 8 });

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(45% 55% at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
    if (glareRef.current) {
      glareRef.current.style.background = "transparent";
    }
  }, []);

  return (
    <section className="sec-trans-section relative overflow-hidden !pt-3 !pb-4 sm:!pt-4 sm:!pb-5 md:!pt-4 md:!pb-6 bg-gradient-to-b from-[#f0f7ff] via-white to-slate-50/50 border-b border-sky-100/80">
      {/* ─────────────────────────────────────────────────────────────
          1. AMBIENT BACKGROUND GLOWS & GRID
          ───────────────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0, 114, 188, 0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -top-40 right-10 size-[550px] rounded-full bg-gradient-to-br from-sky-300/30 via-blue-100/30 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 size-[500px] rounded-full bg-gradient-to-tr from-[#0072bc]/10 via-sky-100/20 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Integrated Top Console: Breadcrumb Left, Category Tag Right */}
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500"
          >
            <Link href="/" className="hover:text-[#0072bc] transition-colors">
              Home
            </Link>
            <ChevronRight size={11} className="text-slate-400" />
            <Link
              href="/services"
              className="hover:text-[#0072bc] transition-colors"
            >
              Services
            </Link>
            <ChevronRight size={11} className="text-slate-400" />
            <span aria-current="page" className="text-[#0072bc] font-bold">
              {service.name}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-sky-200/90 px-3 py-0.5 text-[10.5px] font-bold shadow-2xs backdrop-blur-md">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0072bc] opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#0072bc]" />
            </span>
            <span className="text-slate-900 font-extrabold uppercase tracking-wider">
              {mediaConfig.categoryTag || "ENTERPRISE SOLUTIONS"}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-[#0072bc] font-semibold">
              Dedicated Squad
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. TWO-COLUMN HERO GRID (Typography Left, Living Glass Bento Right)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_1.18fr] lg:gap-10">
          {/* Left Column: Authoritative Service Typography & CTAs - Enters from Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Monolithic Title clearly stating Service + Purpose */}
            <h1 className="!m-0 text-[clamp(24px,3vw,40px)] font-black leading-[1.08] tracking-[-0.035em] text-[#0f172a]">
              {displayTitle}
              <span className="block mt-1 bg-gradient-to-r from-[#0072bc] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
                {service.headline[0]} {service.headline[1]}
              </span>
            </h1>

            {/* Authoritative Subtitle */}
            <p className="mt-2 mb-3 max-w-[490px] text-xs sm:text-[13.5px] leading-relaxed text-[#334155] font-normal">
              {service.summary} Engineered by senior specialists with guaranteed enterprise SLAs and 100% intellectual property ownership.
            </p>

            {/* Tech Stack Tag Cloud */}
            <div className="mb-4 flex flex-wrap gap-1.5 max-w-[490px]">
              {(mediaConfig.techStack?.length
                ? mediaConfig.techStack
                : ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"]
              ).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sky-100 bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-slate-700 shadow-2xs backdrop-blur-xs"
                >
                  <span className="size-1 rounded-full bg-[#0072bc]" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>

            {/* Dual Action Buttons (Zero Yellow - 100% Royal Blue Luxury) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0072bc] to-[#0284c7] hover:from-[#005a96] hover:to-[#0072bc] text-white px-5 py-2.5 text-xs sm:text-[13px] font-bold shadow-md shadow-[#0072bc]/25 hover:shadow-lg hover:shadow-[#0072bc]/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <a
                href="#tech"
                className="group inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#0072bc] border border-slate-200/90 hover:border-[#0072bc]/30 px-5 py-2.5 text-xs sm:text-[13px] font-bold shadow-2xs hover:shadow-sm hover:-translate-y-0.5 backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <Sparkles
                  size={13}
                  className="text-[#0072bc] transition-transform duration-300 group-hover:rotate-12"
                />
                <span>Explore Architecture</span>
              </a>
            </div>

            {/* Key Trust Indicators Bar */}
            <div className="mt-3.5 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-600 pt-2.5 border-t border-slate-200/70">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>Senior Full-Stack Engineers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#0072bc] shrink-0" />
                <span>Enterprise SLA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>100% Code IP Rights</span>
              </div>
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              Right Column: CONCEPT 2 - THE LIVING GLASS BENTO CONTROL GRID
              (4 Interconnected Live Bento Glass Widgets + Animated Spheres) - Enters from Right
              ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            {/* ─── 3D Sphere 1: Top-Right Gradient Orb ─── */}
            <div
              className="pointer-events-none absolute size-[135px] sm:size-[155px] rounded-full z-0 transition-transform duration-700"
              style={{
                top: "-16px",
                right: "-12px",
                backgroundImage: "linear-gradient(135deg, #0072bc, #38bdf8)",
                border: "2px solid rgba(255, 255, 255, 0.75)",
                boxShadow:
                  "inset 10px 0px 22px #ffffff, 0 16px 36px rgba(0, 114, 188, 0.28)",
                animation: "ani 24s ease-in-out infinite",
              }}
              aria-hidden="true"
            />

            {/* ─── 3D Sphere 2: Bottom-Left Smaller Gradient Orb ─── */}
            <div
              className="pointer-events-none absolute size-[85px] sm:size-[100px] rounded-full z-0 transition-transform duration-700"
              style={{
                bottom: "-12px",
                left: "-12px",
                backgroundImage: "linear-gradient(90deg, #0284c7, #38bdf8)",
                border: "2px solid rgba(255, 255, 255, 0.75)",
                boxShadow:
                  "inset 8px 0px 16px #ffffff, 0 12px 28px rgba(0, 114, 188, 0.22)",
                animation: "ani 20s ease-in-out infinite reverse",
              }}
              aria-hidden="true"
            />

            {/* 3D Perspective Tilt Bento Container */}
            <div
              ref={containerRef}
              onPointerEnter={() => setIsHovering(true)}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="relative z-10 w-full transition-transform duration-500 ease-out"
              style={{
                perspective: "1200px",
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Dynamic Glare Overlay */}
              <div
                ref={glareRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30 rounded-[24px]"
                style={{
                  transition: isHovering ? "none" : "background 420ms ease-out",
                }}
              />

              {/* 4-Card Interconnected Bento Control Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 relative">
                {/* ─── BENTO CARD 1: CORE ARCHITECTURE VISUAL (Full-Width Top) ─── */}
                <div className="sm:col-span-3 relative overflow-hidden rounded-[20px] p-2 sm:p-2.5 bg-white/75 backdrop-blur-xl border border-white/90 shadow-[inset_2px_1px_6px_rgba(255,255,255,0.7),0_18px_45px_-10px_rgba(0,114,188,0.16)] group">
                  {/* Sweeping Diagonal Shine Reflection */}
                  <div
                    className="pointer-events-none absolute w-[170%] h-7 -rotate-45 blur-[16px] bg-white/80 z-20"
                    style={{ animation: "shine 9s ease-in-out infinite" }}
                    aria-hidden="true"
                  />

                  {/* Architecture Image Stage */}
                  <div className="relative aspect-[16/8.8] w-full overflow-hidden rounded-[16px] bg-slate-900 border border-slate-200/80 shadow-inner">
                    <Image
                      src={mediaConfig.heroImage}
                      alt={`${service.name} architecture and engineering`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Gradient Overlay for Text Contrast */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/20"
                    />

                    {/* Top Row Badges */}
                    <div className="absolute inset-x-2.5 top-2.5 flex items-center justify-between z-10 pointer-events-none">
                      <span className="rounded-full border border-white/35 bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-md">
                        {mediaConfig.categoryTag || `${service.name} Engine`}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/90 border border-emerald-400 px-2.5 py-0.5 text-[9.5px] font-bold text-white shadow-sm backdrop-blur-md">
                        <span className="size-1.5 rounded-full bg-white animate-pulse" />
                        <span>99.98% SLA Active</span>
                      </span>
                    </div>

                    {/* Bottom Row Badges */}
                    <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between z-10">
                      <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-slate-900 shadow-sm backdrop-blur-md">
                        <span className="size-1.5 animate-ping rounded-full bg-emerald-500" />
                        <span>PRODUCTION READY</span>
                      </span>

                      {/* Nested Action Disc */}
                      <Link
                        href="/contact"
                        aria-label={`Request proposal for ${service.name}`}
                        className="group/disc flex items-center justify-center rounded-full bg-[#0072bc] text-white shadow-[0_8px_25px_rgba(0,114,188,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#005a96] cursor-pointer"
                        style={{ width: DISC, height: DISC }}
                      >
                        <ArrowUpRight className="size-4 text-white transition-transform duration-300 group-hover/disc:-translate-y-0.5 group-hover/disc:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ─── BENTO CARD 2: REAL-TIME PIPELINE & LATENCY ─── */}
                <div className="relative overflow-hidden rounded-[18px] p-3 bg-white/70 backdrop-blur-xl border border-white/85 shadow-[inset_1px_1px_4px_rgba(255,255,255,0.8),0_10px_25px_rgba(0,114,188,0.06)] hover:bg-white/90 hover:border-white transition-all group/bento">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="size-5 rounded-md bg-[#0072bc]/10 flex items-center justify-center">
                        <Activity size={12} className="text-[#0072bc]" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        Pipeline
                      </span>
                    </div>
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="mt-2">
                    <div className="text-base sm:text-lg font-black text-[#0f172a] tracking-tight">
                      {mediaConfig.metrics?.[0]?.value || "< 15ms"}
                    </div>
                    <div className="text-[10.5px] font-bold text-[#0072bc] mt-0.5">
                      {mediaConfig.metrics?.[0]?.label || "Query Latency"}
                    </div>
                    <p className="mt-0.5 text-[9.5px] text-slate-500 leading-tight">
                      {mediaConfig.metrics?.[0]?.sublabel || "Sub-second execution"}
                    </p>
                  </div>
                </div>

                {/* ─── BENTO CARD 3: SECURITY & COMPLIANCE FORTRESS ─── */}
                <div className="relative overflow-hidden rounded-[18px] p-3 bg-white/70 backdrop-blur-xl border border-white/85 shadow-[inset_1px_1px_4px_rgba(255,255,255,0.8),0_10px_25px_rgba(0,114,188,0.06)] hover:bg-white/90 hover:border-white transition-all group/bento">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="size-5 rounded-md bg-emerald-500/10 flex items-center justify-center">
                        <ShieldCheck size={12} className="text-emerald-600" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        Security
                      </span>
                    </div>
                    <Lock size={10} className="text-emerald-600" />
                  </div>
                  <div className="mt-2">
                    <div className="text-base sm:text-lg font-black text-[#0f172a] tracking-tight">
                      {mediaConfig.metrics?.[1]?.value || "99.99%"}
                    </div>
                    <div className="text-[10.5px] font-bold text-emerald-700 mt-0.5">
                      {mediaConfig.metrics?.[1]?.label || "Enterprise SLA"}
                    </div>
                    <p className="mt-0.5 text-[9.5px] text-slate-500 leading-tight">
                      {mediaConfig.metrics?.[1]?.sublabel || "ISO 27001 Standards"}
                    </p>
                  </div>
                </div>

                {/* ─── BENTO CARD 4: DEDICATED SQUAD VELOCITY ─── */}
                <div className="relative overflow-hidden rounded-[18px] p-3 bg-white/70 backdrop-blur-xl border border-white/85 shadow-[inset_1px_1px_4px_rgba(255,255,255,0.8),0_10px_25px_rgba(0,114,188,0.06)] hover:bg-white/90 hover:border-white transition-all group/bento">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="size-5 rounded-md bg-sky-500/10 flex items-center justify-center">
                        <Users size={12} className="text-sky-600" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        Squad
                      </span>
                    </div>
                    <Zap size={10} className="text-sky-500" />
                  </div>
                  <div className="mt-2">
                    <div className="text-base sm:text-lg font-black text-[#0f172a] tracking-tight">
                      {mediaConfig.metrics?.[3]?.value || "100%"}
                    </div>
                    <div className="text-[10.5px] font-bold text-sky-700 mt-0.5">
                      {mediaConfig.metrics?.[3]?.label || "Code IP Rights"}
                    </div>
                    <p className="mt-0.5 text-[9.5px] text-slate-500 leading-tight">
                      {mediaConfig.metrics?.[3]?.sublabel || "Zero lock-in & full Git"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
