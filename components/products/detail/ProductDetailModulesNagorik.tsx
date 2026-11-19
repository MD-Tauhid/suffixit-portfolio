"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Star, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";
import type { ProductModule } from "@/lib/product-content";

interface ModuleVisual {
  badge: string;
  card1Image: string;
  card1Caption: string;
  card2Image: string;
  card2Role: string;
  card3Image: string;
  card3Stat: string;
}

const moduleVisuals: Record<number, ModuleVisual> = {
  0: {
    badge: "100% Tax & PF Configurable",
    card1Image: "/assets/products/product-payroll-system-hero-3d.jpg",
    card1Caption: "Automated Tax Slabs & Salary Engine",
    card2Image: "/assets/about/executive-architect.jpg",
    card2Role: "Compensation & Benefits Lead",
    card3Image: "/assets/services/bento-code-review-qa.jpg",
    card3Stat: "Sub-Second Rule Parsing",
  },
  1: {
    badge: "Multi-Branch & Shift Slabs",
    card1Image: "/assets/products/flagship-hcm.jpg",
    card1Caption: "Departmental Org Chart & Hierarchy",
    card2Image: "/assets/about/portrait-web.jpg",
    card2Role: "Branch Operations Manager",
    card3Image: "/assets/services/service-dedicated-teams-collaboration.jpg",
    card3Stat: "64 Districts Synced",
  },
  2: {
    badge: "1-Click Batch Salary Advice",
    card1Image: "/assets/products/card-payroll-system.jpg",
    card1Caption: "Instant Automated Payslips Generation",
    card2Image: "/assets/about/portrait-support.jpg",
    card2Role: "Payroll Disbursement Specialist",
    card3Image: "/assets/products/product-payroll-system-architecture.jpg",
    card3Stat: "5,000+ Workers / Minute",
  },
  3: {
    badge: "BEFTN, NPSB & General Ledger",
    card1Image: "/assets/products/flagship-erp.jpg",
    card1Caption: "Two-Way ERP & GL Reconciliation",
    card2Image: "/assets/about/portrait-cloud.jpg",
    card2Role: "Treasury Integration Architect",
    card3Image: "/assets/services/bento-ip-ownership.jpg",
    card3Stat: "60+ Scheduled Banks",
  },
  4: {
    badge: "Tamper-Proof Audit Trail",
    card1Image: "/assets/services/bento-architect-access.jpg",
    card1Caption: "Immutable Master Data Change Logs",
    card2Image: "/assets/about/portrait-mobile.jpg",
    card2Role: "Statutory Compliance Auditor",
    card3Image: "/assets/services/core-it-ot-security.jpg",
    card3Stat: "100% Traceability",
  },
  5: {
    badge: "Biometric Hardware Integration",
    card1Image: "/assets/products/flagship-field-force.jpg",
    card1Caption: "ZKTeco Timeclock & Overtime Telemetry",
    card2Image: "/assets/about/workspace-placeholder.jpg",
    card2Role: "Time & Attendance Supervisor",
    card3Image: "/assets/services/delivery-phase-2.jpg",
    card3Stat: "Real-Time Punch Sync",
  },
};

export default function ProductDetailModulesNagorik({
  product,
  modules,
}: {
  product: Product;
  modules: ProductModule[];
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeVisual = moduleVisuals[activeIndex % 6] || moduleVisuals[0];

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-bold text-amber-800 mb-3 shadow-2xs">
            <Star size={12} className="fill-amber-500 text-amber-500" />
            <span>End-to-End Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Our {product.name} Modules
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569]">
            The details that do the work. Tailored to your corporate payroll structures and branch hierarchy.
          </p>
        </div>

        {/* 2-Column Split: Dynamic Interlocking Collage Left, Accordion Right (2 Sides Entry) */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:gap-16">
          {/* Left Column: Slides in from Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -95, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-28 select-none"
          >
            <div className="relative w-full max-w-[520px] mx-auto min-h-[460px] sm:min-h-[490px] flex flex-col justify-center">
              {/* Background Ambient Organic Shapes */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-5 left-12 sm:left-20 size-20 sm:size-24 rounded-tl-[44px] rounded-tr-[16px] rounded-br-[44px] rounded-bl-[44px] bg-[#bae6fd]/60 -z-10 blur-xs transition-transform duration-700 rotate-12"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 left-6 size-20 rounded-full border-2 border-dashed border-[#0072bc]/25 -z-10 animate-spin-slow"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full bg-gradient-to-tr from-sky-100/50 via-blue-50/20 to-transparent rounded-full blur-3xl -z-20"
              />

              {/* Card 1: Top Right Main Feature Screen */}
              <div className="relative ml-auto w-[72%] sm:w-[68%] aspect-[16/11] z-10 transition-transform duration-300 hover:scale-[1.01]">
                <div className="relative size-full overflow-hidden rounded-[26px] border-2 border-white bg-slate-900 shadow-[0_16px_40px_-10px_rgba(0,114,188,0.2)]">
                  <AnimatePresence>
                    <motion.div
                      key={`c1-${activeIndex}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 size-full"
                    >
                      <Image
                        src={activeVisual.card1Image}
                        alt={activeVisual.card1Caption}
                        fill
                        className="object-cover"
                        sizes="420px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/15" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Top Pill Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <AnimatePresence>
                      <motion.span
                        key={`badge-${activeIndex}`}
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-[#0072bc] shadow-md border border-sky-100 backdrop-blur-md"
                      >
                        <span className="size-1.5 rounded-full bg-[#0072bc] animate-ping" />
                        <span>{activeVisual.badge}</span>
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-white">
                    <AnimatePresence>
                      <motion.span
                        key={`cap-${activeIndex}`}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-[11px] font-bold text-white tracking-wide truncate"
                      >
                        {activeVisual.card1Caption}
                      </motion.span>
                    </AnimatePresence>
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  </div>
                </div>
              </div>

              {/* Card 2: Left Overlapping Vertical Operator Card */}
              <div className="absolute left-0 sm:left-1 top-[22%] w-[48%] sm:w-[46%] aspect-[4/5] z-20 transition-transform duration-300 hover:scale-[1.01]">
                <div className="relative size-full overflow-hidden rounded-[26px] border-3 border-white bg-slate-900 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)]">
                  <AnimatePresence>
                    <motion.div
                      key={`c2-${activeIndex}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 size-full"
                    >
                      <Image
                        src={activeVisual.card2Image}
                        alt={activeVisual.card2Role}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Holographic Verification Badge */}
                  <div className="absolute top-3 right-3 z-20 size-8 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-sm">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  </div>

                  {/* Bottom Role Info */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 text-white">
                    <div className="text-[10px] uppercase tracking-wider text-sky-300 font-extrabold">
                      Active Role
                    </div>
                    <AnimatePresence>
                      <motion.div
                        key={`role-${activeIndex}`}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-xs font-bold text-white truncate leading-tight mt-0.5"
                      >
                        {activeVisual.card2Role}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Card 3: Bottom Right Collaboration & Telemetry Card */}
              <div className="relative ml-auto -mt-6 sm:-mt-8 w-[64%] sm:w-[60%] aspect-[16/10] z-30 transition-transform duration-300 hover:scale-[1.01]">
                <div className="relative size-full overflow-hidden rounded-[24px] border-3 border-white bg-slate-900 shadow-[0_18px_45px_-12px_rgba(0,114,188,0.22)]">
                  <AnimatePresence>
                    <motion.div
                      key={`c3-${activeIndex}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 size-full"
                    >
                      <Image
                        src={activeVisual.card3Image}
                        alt={activeVisual.card3Stat}
                        fill
                        className="object-cover"
                        sizes="350px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/15" />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex items-center justify-between text-white">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-300 font-bold">
                        Live Telemetry
                      </div>
                      <AnimatePresence>
                        <motion.div
                          key={`stat-${activeIndex}`}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-xs sm:text-[13px] font-black text-white"
                        >
                          {activeVisual.card3Stat}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <span className="rounded-md bg-[#0072bc] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Slides in from Right Side (2 Sides Entry) */}
          <motion.div
            initial={{ opacity: 0, x: 95 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3.5"
          >
            {modules.map((m, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={m.title}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "border-[#0072bc]/50 bg-[#f0f7ff] shadow-md shadow-[#0072bc]/10"
                      : "border-slate-200/80 bg-white hover:border-[#0072bc]/30 hover:bg-slate-50/50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex size-8 items-center justify-center rounded-full text-xs font-black transition-all ${
                          isActive
                            ? "bg-[#0072bc] text-white shadow-sm shadow-[#0072bc]/30 scale-105"
                            : "bg-sky-50 border border-sky-200/80 text-[#0072bc]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className={`text-base sm:text-lg font-bold leading-snug transition-colors ${
                          isActive ? "text-[#0072bc]" : "text-[#0f172a]"
                        }`}
                      >
                        {m.title}
                      </span>
                    </div>

                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-all ${
                        isActive
                          ? "bg-[#0072bc] text-white rotate-180"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isActive ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  {/* Accordion Expandable Text */}
                  {isActive && (
                    <div className="px-5 pb-6 pt-1 sm:px-6">
                      <div className="pl-11.5 border-l-2 border-[#0072bc]/30">
                        <p className="text-sm text-[#475569] leading-relaxed">
                          {m.text}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            <span>Turnkey Module</span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0072bc]">
                            <span>Explore Workflow Specs</span>
                            <ArrowUpRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
