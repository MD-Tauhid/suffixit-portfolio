"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { motion } from "motion/react";

/**
 * 3D Interactive Tilt Card Component
 * Tilts in 3D perspective during hover with a cursor-following specular glare beam.
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
  maxTilt = 8,
  scale = 1.02,
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

export default function ServiceDetailEngagementNagorik() {
  const models = [
    {
      index: "01",
      badge: "FULL TEAM",
      metric: "100% Dedicated",
      title: "Dedicated E-Commerce Pod",
      desc: "An autonomous, senior-led squad comprising a technical project manager, front-end lead, backend engineer, and dedicated QA tester assigned exclusively to your brand.",
      sphere1: "linear-gradient(135deg, #0072bc, #38bdf8)",
      sphere2: "linear-gradient(90deg, #0284c7, #38bdf8)",
      capabilities: [
        "100% Dedicated Allocation",
        "Direct Daily Standups",
        "Seamless Scale Up/Down",
        "Full Git & Jira Access",
      ],
    },
    {
      index: "02",
      badge: "TEAM EXTENSION",
      metric: "5-Day Onboarding",
      title: "Staff Augmentation",
      desc: "Instantly inject pre-vetted senior Next.js, Shopify Plus, or backend specialists directly into your existing engineering hierarchy to clear backlog items fast.",
      sphere1: "linear-gradient(135deg, #7c3aed, #ec4899)",
      sphere2: "linear-gradient(90deg, #6d28d9, #f43f5e)",
      capabilities: [
        "5-Day Rapid Deploy",
        "Pre-Vetted Senior Devs",
        "Native Repo Workflows",
        "Time & Material Billing",
      ],
    },
    {
      index: "03",
      badge: "TURNKEY BUILD",
      metric: "Fixed Milestones",
      title: "Fixed-Scope Flagship Build",
      desc: "Complete end-to-end platform delivery from technical architecture blueprint to Figma design system, backend engineering, testing, and production deployment.",
      sphere1: "linear-gradient(135deg, #f59e0b, #ef4444)",
      sphere2: "linear-gradient(90deg, #f97316, #fbbf24)",
      capabilities: [
        "Guaranteed Milestones",
        "Itemized Clear Pricing",
        "60-Day Post-Launch SLA",
        "100% Source Code Ownership",
      ],
    },
    {
      index: "04",
      badge: "CONTINUOUS GROWTH",
      metric: "24/7 SLA Support",
      title: "SLA & Conversion Retainer",
      desc: "Ongoing post-deployment partnership focusing on continuous conversion rate optimization (CRO), A/B testing, quarterly security audits, and 24/7 uptime monitoring.",
      sphere1: "linear-gradient(135deg, #059669, #38bdf8)",
      sphere2: "linear-gradient(90deg, #10b981, #06b6d4)",
      capabilities: [
        "1-Hour Critical SLA",
        "Continuous CRO & Audits",
        "Monthly Sprint Cycles",
        "24/7 Uptime Guardian",
      ],
    },
  ];

  return (
    <section className="sec-trans-section relative !py-24 md:!py-32 bg-gradient-to-b from-[#f8fbff] via-[#edf5fc] to-[#f8fbff] border-b border-sky-100 overflow-hidden">
      {/* Soft Ambient Background Orbs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 size-[550px] rounded-full bg-sky-200/30 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 size-[500px] rounded-full bg-blue-200/25 blur-[130px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="trans-engage-header mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/80 backdrop-blur-xs px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3.5 shadow-xs">
            <Sparkles size={13} className="text-[#0072bc]" />
            <span>Collaboration Freedom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            How It Works: 4 Flexible{" "}
            <span className="text-[#0072bc]">Engagement Models</span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Tailored engagement structures that fit your development lifecycle, organizational budget, and time-to-market demands.
          </p>
        </motion.div>

        {/* 4 Luxury Glassmorphic Cards Grid (Center-Outwards 4-Wing Spread) */}
        <div className="trans-engage-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6.5 items-stretch">
          {models.map((m, idx) => {
            const spreadInitial =
              idx === 0
                ? { opacity: 0, x: 80, scale: 0.92 }
                : idx === 3
                ? { opacity: 0, x: -80, scale: 0.92 }
                : { opacity: 0, y: 30, scale: 0.88 };

            return (
              <motion.div
                key={m.title}
                initial={spreadInitial}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx === 0 || idx === 3 ? 0.08 : 0,
                }}
                className="flex flex-col"
              >
                <TiltGlassCard
                  maxTilt={8}
                  scale={1.02}
                  glare={0.25}
                  className="group relative isolate flex flex-col h-full"
                >
              {/* ─── 3D Sphere 1: Top-Right Gradient Orb ─── */}
              <div
                className="pointer-events-none absolute size-[135px] sm:size-[150px] rounded-full z-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  top: "-14px",
                  right: "-14px",
                  backgroundImage: m.sphere1,
                  border: "2px solid rgba(255, 255, 255, 0.75)",
                  boxShadow: "inset 10px 0px 22px #ffffff, 0 14px 34px rgba(0, 0, 0, 0.16)",
                  animation: "ani 24s ease-in-out infinite",
                }}
                aria-hidden="true"
              />

              {/* ─── 3D Sphere 2: Bottom-Left Smaller Gradient Orb ─── */}
              <div
                className="pointer-events-none absolute size-[85px] sm:size-[95px] rounded-full z-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                  bottom: "-14px",
                  left: "-14px",
                  backgroundImage: m.sphere2,
                  border: "2px solid rgba(255, 255, 255, 0.75)",
                  boxShadow: "inset 8px 0px 16px #ffffff, 0 10px 26px rgba(0, 0, 0, 0.12)",
                }}
                aria-hidden="true"
              />

              {/* ─── Frosted Glassmorphic Tall Card Container ─── */}
              <div className="relative z-10 w-full min-h-[470px] overflow-hidden flex flex-1 flex-col justify-between rounded-[24px] p-6 sm:p-6.5 backdrop-blur-[18px] bg-white/45 border border-white/80 shadow-[inset_2px_1px_6px_rgba(255,255,255,0.7),0_20px_50px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:border-white/95 group-hover:bg-white/60 group-hover:shadow-[inset_2px_1px_8px_rgba(255,255,255,0.95),0_28px_60px_-10px_rgba(0,114,188,0.2)]">
                {/* Sweeping Diagonal Shine Reflection */}
                <div
                  className="pointer-events-none absolute w-[170%] h-8 -rotate-45 blur-[16px] bg-white/80 z-20"
                  style={{ animation: "shine 9s ease-in-out infinite" }}
                  aria-hidden="true"
                />

                <div>
                  {/* Top Telemetry & Index Row */}
                  <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-white/60">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 border border-white/60 bg-black/70 px-2 py-0.5 font-mono text-[10.5px] font-bold text-white backdrop-blur-md rounded-full">
                        <span className="text-[#38bdf8]">#{m.index}</span>
                        <span className="text-white/40">/</span>
                        <span>04</span>
                      </span>
                      <span className="border border-white/70 bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#062033] backdrop-blur-xs rounded-full">
                        {m.badge}
                      </span>
                    </div>

                    {/* Metric Badge */}
                    <span className="border border-emerald-500/40 bg-emerald-50/90 px-2 py-0.5 font-mono text-[10.5px] font-extrabold text-emerald-700 backdrop-blur-xs rounded-full shadow-2xs">
                      {m.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-[19px] font-black uppercase tracking-tight leading-[1.2] text-[#0f172a] mt-4 group-hover:text-[#0072bc] transition-colors">
                    {m.title}
                  </h3>

                  {/* Description Narrative */}
                  <p className="mt-3 text-xs sm:text-[13px] text-[#475569] leading-[1.65] font-normal">
                    {m.desc}
                  </p>

                  {/* Capabilities 2x2 Pill Grid */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {m.capabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-center gap-1.5 border border-white/80 bg-white/75 backdrop-blur-xs px-2.5 py-1.5 text-[10.5px] font-semibold text-slate-800 rounded-xl shadow-2xs truncate"
                        title={cap}
                      >
                        <CheckCircle2 size={12} className="text-[#0072bc] shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Action Links (Anchored at Bottom) */}
                <div className="mt-6 flex items-center justify-between border-t border-white/60 pt-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0072bc] hover:text-[#005a96] transition-colors"
                  >
                    <span>Explore Architecture</span>
                    <ArrowUpRight size={13} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0072bc] transition-colors"
                  >
                    <span>Scoping</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </TiltGlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Dual CTA Buttons */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0072bc] to-[#005a96] hover:from-[#005a96] hover:to-[#004877] text-white px-7 py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-[#0072bc]/25 hover:shadow-xl hover:shadow-[#0072bc]/35 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Request Custom Proposal</span>
            <ArrowUpRight size={15} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-200/90 hover:bg-sky-50 text-[#0f172a] px-7 py-3.5 text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Schedule Discovery Call</span>
            <ArrowUpRight size={15} className="text-[#0072bc]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
