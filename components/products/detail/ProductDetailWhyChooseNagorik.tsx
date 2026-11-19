"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Calculator,
  FileCheck2,
  Building2,
  Lock,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

interface ProductFlipCardProps {
  index?: number;
  icon: React.ReactNode;
  iconBg: string;
  border: string;
  bg: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  backImage: string;
  backTag: string;
  backTitle: string;
  backSub: string;
  statusTag: string;
}

function ProductWhyFlipCard({
  index = 0,
  icon,
  iconBg,
  border,
  bg,
  title,
  desc,
  tag,
  tagColor,
  backImage,
  backTag,
  backTitle,
  backSub,
  statusTag,
}: ProductFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Center outwards dispersion ("makhkhan theke 2 dike choriye jabe")
  // Column 1 (center) pops in first, Column 0 spreads left, Column 2 spreads right
  const colIndex = index % 3;
  const initialAnim =
    colIndex === 0
      ? { opacity: 0, x: 75, scale: 0.92 }
      : colIndex === 2
      ? { opacity: 0, x: -75, scale: 0.92 }
      : { opacity: 0, y: 30, scale: 0.88 };

  const animDelay = colIndex === 1 ? 0.05 : 0.14;

  return (
    <motion.div
      initial={initialAnim}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: animDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative min-h-[340px] sm:min-h-[360px] [perspective:1000px] cursor-pointer select-none will-change-transform"
      onClick={() => setIsFlipped((prev) => !prev)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative size-full rounded-[26px] transition-transform duration-700 [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* FRONT SIDE (Pastel Aesthetic Card) */}
        <div
          className={cn(
            "absolute inset-0 size-full rounded-[26px] border p-6 sm:p-7 shadow-xs flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(0deg)] transition-all",
            border,
            bg
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className={cn("size-11 rounded-2xl flex items-center justify-center font-bold shadow-xs", iconBg)}>
              {icon}
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold text-slate-500 shadow-2xs backdrop-blur-xs border border-white/60">
              <RotateCw size={10} className="text-[#0072bc]" />
              <span>Hover to Flip</span>
            </span>
          </div>

          <div>
            <h3 className="text-lg sm:text-[19px] font-bold text-[#0f172a] tracking-tight leading-snug">
              {title}
            </h3>
            <p className="mt-2.5 text-xs sm:text-[13px] text-[#475569] leading-relaxed">
              {desc}
            </p>
          </div>

          <div className={cn("pt-3.5 border-t text-xs font-bold flex items-center justify-between", tagColor)}>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              <span>{tag}</span>
            </div>
            <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* BACK SIDE (Photorealistic 3D Image Revealed on Flip) */}
        <div className="absolute inset-0 size-full rounded-[26px] overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] border border-slate-200/90 bg-slate-950 shadow-xl">
          <Image
            src={backImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/30" />

          <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/20">
                {backTag}
              </span>
              <span className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <RotateCw size={12} />
              </span>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                {backTitle}
              </h4>
              <p className="mt-1.5 text-xs text-slate-200 leading-relaxed">
                {backSub}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-[10.5px] font-bold text-white border border-white/15">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{statusTag}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductDetailWhyChooseNagorik({
  product,
}: {
  product: Product;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const cards: ProductFlipCardProps[] = [
    {
      icon: <Calculator size={20} />,
      iconBg: "bg-sky-100 text-[#0072bc]",
      border: "border-sky-200",
      bg: "bg-[#f0f9ff]",
      title: "Zero-Error Formula Engine",
      desc: "Handles complex gross-to-net math, tiered attendance deductions, and custom bonus allowances with 100% mathematical precision.",
      tag: "Zero Formula Errors",
      tagColor: "border-sky-200 text-[#0072bc]",
      backImage: "/assets/products/hex-erp.jpg",
      backTag: "Gross-to-Net Engine",
      backTitle: "Sub-Second Batch Payroll Computation",
      backSub: "Computes 10,000+ employee records, shift overtime multipliers, and statutory tax deductions in 1.2 seconds.",
      statusTag: "99.99% Calculation SLA",
    },
    {
      icon: <FileCheck2 size={20} />,
      iconBg: "bg-purple-100 text-purple-700",
      border: "border-purple-200",
      bg: "bg-[#faf5ff]",
      title: "Automated NBR Tax Compliance",
      desc: "Up-to-date with latest fiscal tax slabs, investment rebate credits, and automated generation of withholding Form 108A certificates.",
      tag: "NBR Form 108A Ready",
      tagColor: "border-purple-200 text-purple-700",
      backImage: "/assets/products/hex-hcm.jpg",
      backTag: "Statutory Fiscal Rules",
      backTitle: "Automated Withholding Slabs",
      backSub: "Dynamically applies NBR tax rebate schedules, fiscal investment exemptions, and individual employee tax deduction certificates.",
      statusTag: "100% Tax Compliant",
    },
    {
      icon: <Building2 size={20} />,
      iconBg: "bg-amber-100 text-amber-800",
      border: "border-amber-200",
      bg: "bg-[#fffbeb]",
      title: "1-Click Multi-Bank BEFTN / NPSB",
      desc: "Direct electronic bank advice formats compatible with all 60+ scheduled commercial banks in Bangladesh with zero manual data entry.",
      tag: "All 60+ Scheduled Banks",
      tagColor: "border-amber-200 text-amber-800",
      backImage: "/assets/products/hex-pos.jpg",
      backTag: "Automated Disbursement",
      backTitle: "Encrypted BEFTN / NPSB Pipelines",
      backSub: "Pre-validated advice files for City Bank, EBL, BRAC Bank, Dutch-Bangla, Sonali, and standard scheduled banks.",
      statusTag: "Zero Lost Disbursements",
    },
    {
      icon: <Lock size={20} />,
      iconBg: "bg-blue-100 text-blue-700",
      border: "border-blue-200",
      bg: "bg-[#eff6ff]",
      title: "Bank-Grade AES-256 Data Security",
      desc: "All employee compensation, personal tax files, and bank account numbers are encrypted with AES-256 at rest and TLS 1.3 in transit.",
      tag: "ISO 27001 & SOC-2 Ready",
      tagColor: "border-blue-200 text-blue-700",
      backImage: "/assets/products/hex-cloud.jpg",
      backTag: "Zero-Trust Architecture",
      backTitle: "Cryptographic Data Protection",
      backSub: "Role-based ACL controls, immutable audit trails, and multi-tenant isolation guarding enterprise salary records 24/7.",
      statusTag: "Bank-Grade Encryption",
    },
    {
      icon: <Cpu size={20} />,
      iconBg: "bg-emerald-100 text-emerald-800",
      border: "border-emerald-200",
      bg: "bg-[#f0fdf4]",
      title: "Real-Time ZKTeco Biometric Sync",
      desc: "Automated TCP/IP telemetry polling across dozens of branch timeclocks, eliminating attendance proxy fraud and shift sync lag.",
      tag: "Live Hardware Polling",
      tagColor: "border-emerald-200 text-emerald-800",
      backImage: "/assets/products/hex-ffms.jpg",
      backTag: "Biometric Hardware Hub",
      backTitle: "Zero-Proxy Timeclock Ingestion",
      backSub: "TCP/IP direct listener pulls device punches from unlimited factory gates, retail outlets, and corporate headquarters without delays.",
      statusTag: "< 50ms Push Latency",
    },
    {
      icon: <Layers size={20} />,
      iconBg: "bg-indigo-100 text-indigo-800",
      border: "border-indigo-200",
      bg: "bg-[#eef2ff]",
      title: "Direct General Ledger ERP Sync",
      desc: "Auto-creates double-entry accounting journals in Rupantar ERP or your existing ERP suite with cost-center level granularity.",
      tag: "Automatic Ledger Posting",
      tagColor: "border-indigo-200 text-indigo-800",
      backImage: "/assets/products/flagship-erp.jpg",
      backTag: "Two-Way ERP Integration",
      backTitle: "Automated Journal Reconciliation",
      backSub: "Auto-generates double-entry salary expense vouchers, tax liability accounts, and bank transfer journals with zero human re-typing.",
      statusTag: "99.98% Ledger Accuracy",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden !py-24 md:!py-32 bg-gradient-to-b from-[#f0f7ff] via-white to-[#f8fbff] text-slate-900 border-b border-sky-100"
    >
      {/* Background ambient accents with Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -top-40 right-10 size-[600px] rounded-full bg-gradient-to-br from-[#0072bc]/15 via-sky-200/20 to-transparent blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-blue-100/30 blur-[100px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>Results-Focused &amp; Growth-Driven Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Why Choose Suffix {product.name}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
            Engineered to remove friction between human resources, finance controllers, and external tax auditors.
          </p>
        </motion.div>

        {/* 6 3D Flip Cards Grid with Dramatic Cascade */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <ProductWhyFlipCard key={c.title} {...c} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
