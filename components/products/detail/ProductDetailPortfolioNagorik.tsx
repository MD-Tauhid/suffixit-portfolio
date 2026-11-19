"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";
import { servicePalette } from "@/lib/service-palette";

interface PortfolioCardItem {
  bg: string;
  surfaceHex: string;
  border: string;
  accent: string;
  accentColor: string;
  pill: string;
  tag: string;
  title: string;
  desc: string;
  stat1: { val: string; label: string };
  stat2: { val: string; label: string };
  stat3?: { val: string; label: string };
  image: string;
}

function PortfolioStackedCard({
  card,
  index,
  total,
  containerProgress,
}: {
  card: PortfolioCardItem;
  index: number;
  total: number;
  containerProgress: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Stacking scale threshold: each card gently contracts towards the top when subsequent cards arrive
  const startRange = index / total;
  const endRange = Math.min(1, (index + 1) / total);
  const targetScale = 1 - (total - index - 1) * 0.03; // e.g. Card 0 -> 0.91, Card 1 -> 0.94, Card 2 -> 0.97, Card 3 -> 1.0

  const cardScale = useTransform(
    containerProgress,
    [startRange, endRange, 1],
    [1, (1 + targetScale) / 2, targetScale]
  );

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{
        top: `calc(85px + ${index * 42}px)`,
        zIndex: index + 1,
        marginBottom: index === total - 1 ? "40px" : "120px",
      }}
    >
      <motion.div
        style={{ scale: cardScale, transformOrigin: "top center" }}
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className={`relative origin-top overflow-hidden rounded-[28px] sm:rounded-[34px] border ${card.border} ${card.bg} p-6 sm:p-9 lg:p-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_28px_70px_-12px_rgba(15,23,42,0.22)]`}
      >
        {/* Top Accent Gradient Bar matching How We Work cards */}
        <div
          className="absolute top-0 left-0 right-0 h-[4px]"
          style={{
            background: `linear-gradient(90deg, ${card.accentColor}, #38bdf8, #818cf8)`,
          }}
        />

        {/* Top Tab Bar (Always visible in the stack) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-black/10">
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-xs ${card.pill}`}
            >
              {card.tag || `Case 0${index + 1}`}
            </span>
            <h3 className={`text-lg sm:text-2xl lg:text-[24px] font-black tracking-tight ${card.accent}`}>
              {card.title}
            </h3>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700/80">Enterprise Case Study</span>
            <span className="size-6 rounded-full bg-white/70 flex items-center justify-center text-slate-800 shadow-2xs">
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>

        {/* Main Card Content */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left Narrative */}
          <div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl">
              {card.desc}
            </p>

            {/* Stats Metrics Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5 border-t border-black/10">
              <div>
                <div className={`text-2xl sm:text-3xl font-black ${card.accent}`}>
                  {card.stat1.val}
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-0.5">
                  {card.stat1.label}
                </div>
              </div>
              <div>
                <div className={`text-2xl sm:text-3xl font-black ${card.accent}`}>
                  {card.stat2.val}
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-0.5">
                  {card.stat2.label}
                </div>
              </div>
              {card.stat3 && (
                <div className="col-span-2 sm:col-span-1">
                  <div className={`text-2xl sm:text-3xl font-black ${card.accent}`}>
                    {card.stat3.val}
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-0.5">
                    {card.stat3.label}
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0072bc] text-white hover:bg-[#005a96] px-6 py-3 text-xs sm:text-sm font-bold shadow-md shadow-[#0072bc]/25 transition-all cursor-pointer"
              >
                <span>Review Architecture</span>
                <ArrowUpRight size={15} />
              </Link>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Live in Production</span>
              </div>
            </div>
          </div>

          {/* Right Device Visual */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-md group/img">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover transition-transform duration-700 group-hover/img:scale-105"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductDetailPortfolioNagorik({
  product,
}: {
  product: Product;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cards: PortfolioCardItem[] = [
    {
      bg: "bg-[#e8f3fc]",
      surfaceHex: servicePalette.blue,
      border: "border-[#bae6fd]",
      accent: "text-[#0072bc]",
      accentColor: "#0072bc",
      pill: "bg-white text-[#0072bc] border border-[#0072bc]/20",
      tag: "RMG & Manufacturing",
      title: "PredictaPay – Multi-Shift RMG & Manufacturing",
      desc: "Automated biometric shift reconciliations, overtime calculations, and NBR tax withholdings for 5,000+ factory workers across 6 staggered shifts.",
      stat1: { val: "5,000+", label: "Workers Synced" },
      stat2: { val: "-42%", label: "Cycle Time Drop" },
      stat3: { val: "100%", label: "Biometric Auto-Sync" },
      image: "/assets/products/flagship-field-force.jpg",
    },
    {
      bg: "bg-[#ede8fa]",
      surfaceHex: servicePalette.lavender,
      border: "border-[#ddd6fe]",
      accent: "text-[#7c3aed]",
      accentColor: "#7c3aed",
      pill: "bg-white text-[#7c3aed] border border-[#7c3aed]/20",
      tag: "Banking & Fintech",
      title: "BankDisburse – Commercial Bank & Telco Scale",
      desc: "High-throughput BEFTN and NPSB clearing engine generating 1-click encrypted salary advice files for distributed corporate branches.",
      stat1: { val: "10,000+", label: "Active Profiles" },
      stat2: { val: "Sub-Minute", label: "GL Posting" },
      stat3: { val: "60+", label: "Scheduled Banks" },
      image: "/assets/products/flagship-erp.jpg",
    },
    {
      bg: "bg-[#def2eb]",
      surfaceHex: servicePalette.mint,
      border: "border-[#99f6e4]",
      accent: "text-[#0d9488]",
      accentColor: "#0d9488",
      pill: "bg-white text-[#0d9488] border border-[#0d9488]/20",
      tag: "Hospital & Healthcare",
      title: "CarePayroll – Multi-Specialty Hospital Network",
      desc: "Complex on-call consultant fees, multi-tier doctor allowances, and night-shift premiums reconciled with zero mathematical discrepancies.",
      stat1: { val: "1,200+", label: "Medical Staff" },
      stat2: { val: "99.99%", label: "Ledger Precision" },
      stat3: { val: "0 Error", label: "Statutory Deductions" },
      image: "/assets/products/flagship-hcm.jpg",
    },
    {
      bg: "bg-[#def0fb]",
      surfaceHex: servicePalette.sky,
      border: "border-[#bae6fd]",
      accent: "text-[#0284c7]",
      accentColor: "#0284c7",
      pill: "bg-white text-[#0284c7] border border-[#0284c7]/20",
      tag: "Retail & Multi-Outlet",
      title: "RetailLedger – National Retail Chain Suite",
      desc: "Synchronizes 120+ retail store outlet cashiers with central corporate accounts, automating provident fund ledgers and annual tax deduction certificates.",
      stat1: { val: "120+", label: "Outlets Connected" },
      stat2: { val: "100%", label: "NBR Form 108A" },
      stat3: { val: "Real-Time", label: "Store-to-HQ Sync" },
      image: "/assets/products/flagship-smart-pos.jpg",
    },
  ];

  return (
    <section ref={containerRef} className="relative !py-20 md:!py-28 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>Enterprise Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Our {product.name} Portfolio
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569]">
            Real-world enterprise rollouts demonstrating speed, scale, and compliance.
          </p>
        </motion.div>

        {/* Sticky Stacking Cards Container with Scroll-Morphing Deck */}
        <div className="relative pt-2 pb-16">
          {cards.map((c, i) => (
            <PortfolioStackedCard
              key={c.title}
              card={c}
              index={i}
              total={cards.length}
              containerProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
