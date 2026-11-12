"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { extendedServicesList, ServiceItem } from "./servicesData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type PracticeFilter = "all" | "cloud-infra" | "software-apps" | "enterprise-systems";

interface FilterTab {
  key: PracticeFilter;
  label: string;
  count: number;
}

const filterTabs: FilterTab[] = [
  { key: "all", label: "All 9 Disciplines", count: 9 },
  { key: "cloud-infra", label: "Cloud & Infrastructure", count: 3 },
  { key: "software-apps", label: "Digital Commerce & Platforms", count: 3 },
  { key: "enterprise-systems", label: "Enterprise Systems & Telecom", count: 3 },
];

/**
 * Tailored vibrant 3D sphere gradients matching the reference image's glassmorphism style
 */
function getSpheresConfig(index: string) {
  switch (index) {
    case "06": // Domain, DNS & Cloud Hosting
      return {
        sphere1: "linear-gradient(135deg, #0072bc, #38bdf8)",
        sphere2: "linear-gradient(90deg, #0284c7, #38bdf8)",
      };
    case "07": // Web & Headless E-Commerce (Exact Orange-Magenta from Image)
      return {
        sphere1: "linear-gradient(135deg, #ff8c00, #ff0080)",
        sphere2: "linear-gradient(90deg, #ff8c00, #ff0080)",
      };
    case "08": // IT Infrastructure & Networking
      return {
        sphere1: "linear-gradient(135deg, #2563eb, #00c6ff)",
        sphere2: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
      };
    case "09": // Carrier-Grade Bulk SMS & OTP
      return {
        sphere1: "linear-gradient(135deg, #7c3aed, #ff0080)",
        sphere2: "linear-gradient(90deg, #6d28d9, #ec4899)",
      };
    case "10": // Consultancy & System Integration
      return {
        sphere1: "linear-gradient(135deg, #0072bc, #00f2fe)",
        sphere2: "linear-gradient(90deg, #0284c7, #38bdf8)",
      };
    case "11": // Hospital Management System (HMS)
      return {
        sphere1: "linear-gradient(135deg, #059669, #38bdf8)",
        sphere2: "linear-gradient(90deg, #10b981, #06b6d4)",
      };
    case "12": // Learning Management System (LMS) (Orange-Magenta from Image)
      return {
        sphere1: "linear-gradient(135deg, #ff8c00, #ff0080)",
        sphere2: "linear-gradient(90deg, #f59e0b, #ef4444)",
      };
    case "13": // Infrastructure Power & Cooling
      return {
        sphere1: "linear-gradient(135deg, #0284c7, #38bdf8)",
        sphere2: "linear-gradient(90deg, #0369a1, #0ea5e9)",
      };
    case "14": // Suffix Video Conferencing
      return {
        sphere1: "linear-gradient(135deg, #4f46e5, #00f2fe)",
        sphere2: "linear-gradient(90deg, #6366f1, #38bdf8)",
      };
    default:
      return {
        sphere1: "linear-gradient(135deg, #ff8c00, #ff0080)",
        sphere2: "linear-gradient(90deg, #ff8c00, #ff0080)",
      };
  }
}

/**
 * 3D Interactive Tilt Card Component
 * Faithfully adapts the tilt & cursor-following specular glare dynamics from TiltCard (admit-one-ticket)
 * Tilts in 3D perspective during hover and smoothly straightens on mouse leave.
 * Preserves the pristine frosted glass aesthetic without introducing ticket shader colors.
 */
interface TiltGlassCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  scale?: number;
  glare?: number;
  className?: string;
}

function TiltGlassCard({
  children,
  maxTilt = 8.5,
  scale = 1.022,
  glare = 0.28,
  className = "",
}: TiltGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1200px) rotateX(${-(dy * 2) * maxTilt}deg) rotateY(${dx * 2 * maxTilt}deg) scale(${scale})`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(45% 55% at ${(dx + 0.5) * 100}% ${(dy + 0.5) * 100}%, rgba(255,255,255,${glare}) 0%, rgba(255,255,255,0) 70%)`;
      }
    },
    [maxTilt, scale, glare]
  );

  const onLeave = useCallback(() => {
    setHovering(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
    if (glareRef.current) {
      glareRef.current.style.background = "transparent";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setHovering(true)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative w-full h-full will-change-transform ${className}`}
      style={{
        transition: hovering ? "none" : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {glare > 0 && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[26px]"
          style={{
            transition: hovering ? "none" : "background 420ms ease-out",
          }}
        />
      )}
    </div>
  );
}

export default function ServicesSpecializedPractices() {
  const trackRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<PracticeFilter>("all");

  const filteredServices = useMemo(() => {
    if (activeFilter === "all") return extendedServicesList;
    return extendedServicesList.filter((svc) => svc.category === activeFilter);
  }, [activeFilter]);

  // Refresh ScrollTrigger when filter changes to update layout heights
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (portalRef.current) {
          portalRef.current.style.clipPath = "none";
        }
        if (contentRef.current) {
          contentRef.current.style.transform = "none";
          contentRef.current.style.opacity = "1";
        }
        return;
      }

      // Initial state: centered circle aperture (0% radius at viewport center 50% 50vh)
      gsap.set(portalRef.current, { clipPath: "circle(0% at 50% 50vh)" });
      gsap.set(contentRef.current, { scale: 0.94, opacity: 0.85 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "+=100%", // Pin for 1 viewport height while the circle blooms open
          pin: true,
          pinSpacing: true,
          scrub: 0.3,
          onLeave: () => {
            // Once fully open, remove clipPath completely so all cards scroll naturally with zero clipping overhead
            if (portalRef.current) portalRef.current.style.clipPath = "none";
          },
          onEnterBack: () => {
            // Re-apply circle mask when scrolling backwards into the pinned aperture
            if (portalRef.current) portalRef.current.style.clipPath = "circle(150% at 50% 50vh)";
          },
        },
      });

      // Expand portal outwards from exact viewport center as user scrolls
      tl.to(portalRef.current, {
        clipPath: "circle(50% at 50% 50vh)",
        ease: "power1.out",
        duration: 0.45,
      })
        .to(
          portalRef.current,
          {
            clipPath: "circle(150% at 50% 50vh)",
            ease: "power2.out",
            duration: 0.55,
          },
          ">"
        )
        .to(
          contentRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 0.55,
          },
          "<"
        );
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="specialized-practices"
      ref={trackRef}
      className="relative w-full bg-[#f5f6f6]"
      style={{
        background: "radial-gradient(circle at 50% 50%, #0072bc 0%, #04162a 100%)",
      }}
    >
      {/* Atmospheric Soft Light Bloom */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 size-[650px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 size-[550px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Circular Reveal Layer */}
      <div
        ref={portalRef}
        className="relative z-10 w-full bg-[#e8edf2] will-change-[clip-path] py-14 sm:py-18 lg:py-20"
      >
        {/* Inner Content Container */}
        <div
          ref={contentRef}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 will-change-transform"
        >
          {/* Section Header */}
          <div className="mb-8 lg:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#cbd9e7] pb-6 shrink-0">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="size-2 rounded-full bg-[#0072bc] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.16em] text-[#0072bc] uppercase block">
                  SPECIALIZED DISCIPLINES &amp; ENTERPRISE INFRASTRUCTURE (06 – 14)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-black text-slate-900 tracking-tight">
                Architectural Capabilities{" "}
                <span className="font-serif italic font-normal text-[#0072bc]">
                  Engineered for Scale
                </span>
              </h2>
            </div>

            {/* Total Count Badge */}
            <div className="shrink-0 flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-slate-600 bg-white/80 backdrop-blur-xs border border-white/90 px-3.5 py-1.5 shadow-2xs rounded-xl">
                Showing {filteredServices.length} of {extendedServicesList.length} Specialized Practices
              </span>
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="mb-8 lg:mb-10 flex flex-wrap items-center gap-2 shrink-0">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer rounded-xl ${isActive
                    ? "bg-[#0072bc] text-white shadow-md shadow-[#0072bc]/25"
                    : "bg-white/70 backdrop-blur-xs text-slate-700 border border-white/80 hover:border-[#0072bc]/50 hover:bg-white"
                    }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`font-mono text-[10.5px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
                      }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3-Column Luxury Glass Cards Grid - Standard document flow, no inner scroll */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filteredServices.map((service) => {
              const { sphere1, sphere2 } = getSpheresConfig(service.index);

              return (
                <TiltGlassCard
                  key={service.id}
                  maxTilt={9}
                  scale={1.025}
                  glare={0.28}
                  className="group relative isolate flex flex-col"
                >
                  {/* ─── 3D Sphere 1: Top-Right Vibrant Gradient Orb ─── */}
                  <div
                    className="pointer-events-none absolute size-[150px] sm:size-[170px] rounded-full z-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      top: "-16px",
                      right: "-16px",
                      backgroundImage: sphere1,
                      border: "2px solid rgba(255, 255, 255, 0.75)",
                      boxShadow: "inset 10px 0px 22px #ffffff, 0 14px 34px rgba(0, 0, 0, 0.16)",
                      animation: "ani 24s ease-in-out infinite",
                    }}
                    aria-hidden="true"
                  />

                  {/* ─── 3D Sphere 2: Bottom-Left Smaller Gradient Orb ─── */}
                  <div
                    className="pointer-events-none absolute size-[90px] sm:size-[105px] rounded-full z-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      bottom: "-16px",
                      left: "-16px",
                      backgroundImage: sphere2,
                      border: "2px solid rgba(255, 255, 255, 0.75)",
                      boxShadow: "inset 8px 0px 16px #ffffff, 0 10px 26px rgba(0, 0, 0, 0.12)",
                    }}
                    aria-hidden="true"
                  />

                  {/* ─── Frosted Glassmorphic Tall Card Container ─── */}
                  <div className="relative z-10 w-full min-h-[460px] sm:min-h-[490px] overflow-hidden flex flex-1 flex-col justify-between rounded-[24px] p-6 sm:p-7 backdrop-blur-[18px] bg-white/40 dark:bg-slate-900/40 border border-white/75 shadow-[inset_2px_1px_6px_rgba(255,255,255,0.7),0_20px_50px_-10px_rgba(0,0,0,0.09)] transition-shadow duration-300 group-hover:border-white/95 group-hover:shadow-[inset_2px_1px_8px_rgba(255,255,255,0.95),0_28px_60px_-10px_rgba(0,114,188,0.22)]">
                    {/* Sweeping Diagonal Shine Reflection (shine keyframe) */}
                    <div
                      className="pointer-events-none absolute w-[170%] h-8 -rotate-45 blur-[16px] bg-white/80 z-20"
                      style={{ animation: "shine 9s ease-in-out infinite" }}
                      aria-hidden="true"
                    />

                    <div>
                      {/* Top Telemetry & Index Row */}
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/50">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 border border-white/60 bg-black/65 px-2.5 py-0.5 font-mono text-[11px] font-bold text-white backdrop-blur-md rounded-full">
                            <span className="text-[#38bdf8]">#{service.index}</span>
                            <span className="text-white/40">/</span>
                            <span>14</span>
                          </span>
                          <span className="border border-white/70 bg-white/60 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#062033] backdrop-blur-xs rounded-full">
                            {service.categoryLabel}
                          </span>
                        </div>

                        {/* Metric Badge */}
                        <span className="border border-emerald-500/40 bg-emerald-50/80 px-2.5 py-0.5 font-mono text-[11px] font-extrabold text-emerald-700 backdrop-blur-xs rounded-full shadow-2xs">
                          {service.metric.value}
                        </span>
                      </div>

                      {/* Title: Styled boldly like SAMPLE TEXT in user's image */}
                      <h3 className="text-xl sm:text-[22px] font-black uppercase tracking-tight leading-[1.15] text-[#111827] mt-4 group-hover:text-[#0072bc] transition-colors">
                        {service.name}
                      </h3>

                      {/* Description Narrative */}
                      <p className="mt-3 text-xs sm:text-[13px] text-[#374151] leading-[1.68] font-normal">
                        {service.summary}
                      </p>

                      {/* Capabilities 4-Pill Checklist Grid */}
                      <div className="mt-4 grid grid-cols-2 gap-1.5">
                        {service.capabilities.map((cap) => (
                          <div
                            key={cap}
                            className="flex items-center gap-1.5 border border-white/80 bg-white/70 backdrop-blur-xs px-2.5 py-1.5 text-[10.5px] font-semibold text-slate-800 rounded-xl shadow-2xs truncate"
                          >
                            <CheckCircle2 size={12} className="text-[#0072bc] shrink-0" />
                            <span className="truncate">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Action Links (Anchored at Bottom of Tall Card) */}
                    <div className="mt-6 flex items-center justify-between border-t border-white/50 pt-3.5">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0072bc] hover:text-[#005a96] transition-colors"
                      >
                        <span>Explore Architecture</span>
                        <ArrowUpRight size={14} />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0072bc] transition-colors"
                      >
                        <span>Scoping</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </TiltGlassCard>
              );
            })}
          </div>

          {/* Bottom Trust Banner inside Portal */}
          <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/80 bg-white/60 backdrop-blur-md px-6 py-4 shadow-[inset_2px_1px_6px_rgba(255,255,255,0.7),0_10px_25px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3.5">
              <span className="grid size-10 place-items-center rounded-xl bg-white/80 text-[#0072bc] border border-white/90 shadow-2xs">
                <Sparkles size={18} />
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#062033]">
                  Need a customized hybrid deployment across multiple practices?
                </h4>
                <p className="text-xs text-slate-600">
                  Our enterprise architects conduct technical discovery sprints to blueprint tailored solutions.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#0072bc] hover:bg-[#005a96] text-white px-5 py-2.5 text-xs font-bold shadow-md transition-all hover:shadow-lg"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
