"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Zap,
  CreditCard,
  Gauge,
  Boxes,
  Palette,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services";

interface FlipCardProps {
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

function WhyFlipCard({
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
}: FlipCardProps) {
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
            <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold text-slate-500 shadow-2xs backdrop-blur-xs border border-white/60">
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

export default function ServiceDetailWhyChooseNagorik({
  service,
}: {
  service: Service;
}) {
  const cards: FlipCardProps[] = [
    {
      icon: <Gauge size={20} />,
      iconBg: "bg-sky-100 text-[#0072bc]",
      border: "border-sky-200",
      bg: "bg-[#f0f9ff]",
      title: "Sub-Second Performance & 95+ Core Web Vitals",
      desc: "Optimized server-side rendering, instant edge caching, and zero layout shift ensure customers never abandon slow loading product grids.",
      tag: "95+ Core Web Vitals",
      tagColor: "border-sky-200 text-[#0072bc]",
      backImage: "/assets/services/why-core-web-vitals.jpg",
      backTag: "Next.js SSR & Edge CDN",
      backTitle: "Sub-Second Response Guarantee",
      backSub: "Edge nodes across Cloudflare, compressed Brotli pipelines, and zero Cumulative Layout Shift (CLS).",
      statusTag: "99+ Lighthouse Score",
    },
    {
      icon: <CreditCard size={20} />,
      iconBg: "bg-purple-100 text-purple-700",
      border: "border-purple-200",
      bg: "bg-[#faf5ff]",
      title: "Multi-MFS & Instant Gateway Cascades",
      desc: "Seamlessly route transactions across bKash, Nagad, Visa, Mastercard, and international gateways with automatic payment failover.",
      tag: "Zero Lost Checkouts",
      tagColor: "border-purple-200 text-purple-700",
      backImage: "/assets/services/why-payment-gateways.jpg",
      backTag: "Smart Payment Routing",
      backTitle: "Automated Gateway Cascades",
      backSub: "Tokenized checkouts with automatic fallback. If a provider times out, failover routes seamlessly in <800ms.",
      statusTag: "99.9% Transaction Success",
    },
    {
      icon: <Zap size={20} />,
      iconBg: "bg-amber-100 text-amber-800",
      border: "border-amber-200",
      bg: "bg-[#fffbeb]",
      title: "Flash Sale Concurrency & Auto-Scaling",
      desc: "Architected to absorb tens of thousands of simultaneous shoppers during seasonal campaigns and discount drops without latency spikes.",
      tag: "50,000+ Concurrent Carts",
      tagColor: "border-amber-200 text-amber-800",
      backImage: "/assets/services/why-flash-sale-scaling.jpg",
      backTag: "Elastic Pod Clusters",
      backTitle: "Zero-Crash Flash Campaigns",
      backSub: "Distributed Redis queues and auto-scaling Kubernetes worker pods absorb massive midnight spikes.",
      statusTag: "0ms Queue Stalling",
    },
    {
      icon: <Boxes size={20} />,
      iconBg: "bg-emerald-100 text-emerald-800",
      border: "border-emerald-200",
      bg: "bg-[#f0fdf4]",
      title: "Real-Time POS & Warehouse ERP Sync",
      desc: "Single-source-of-truth stock synchronization connecting brick-and-mortar store registers, central hubs, and online carts.",
      tag: "Real-Time Stock Decrement",
      tagColor: "border-emerald-200 text-emerald-800",
      backImage: "/assets/services/why-pos-erp-sync.jpg",
      backTag: "Rupantar ERP & POS Link",
      backTitle: "Omnichannel Inventory Lock",
      backSub: "Event-driven webhook bridges synchronize store register scans with online inventory within 200 milliseconds.",
      statusTag: "200ms Webhook Sync",
    },
    {
      icon: <Palette size={20} />,
      iconBg: "bg-rose-100 text-rose-800",
      border: "border-rose-200",
      bg: "bg-[#fff1f2]",
      title: "Conversion-Driven UI/UX Design Systems",
      desc: "Frictionless 1-click checkout funnels, dynamic micro-animations, and sticky mobile purchase journeys engineered to maximize conversion rates.",
      tag: "+42% Mobile Conversion Lift",
      tagColor: "border-rose-200 text-rose-800",
      backImage: "/assets/services/why-conversion-ux.jpg",
      backTag: "Award-Winning UX Systems",
      backTitle: "Frictionless Checkout Funnels",
      backSub: "Sticky mobile CTA bars, thumb-friendly product carousels, and 1-tap checkout to eliminate basket abandonment.",
      statusTag: "+38% Average Order Value",
    },
    {
      icon: <ShieldCheck size={20} />,
      iconBg: "bg-indigo-100 text-indigo-800",
      border: "border-indigo-200",
      bg: "bg-[#eef2ff]",
      title: "Bank-Grade PCI-DSS & Data Encryption",
      desc: "End-to-end tokenization, encrypted customer transactions, automated fraud alerts, and continuous vulnerability patch cycles.",
      tag: "PCI-DSS & SOC-2 Ready",
      tagColor: "border-indigo-200 text-indigo-800",
      backImage: "/assets/services/why-pci-dss-security.jpg",
      backTag: "Bank-Grade Vaults",
      backTitle: "Zero-Trust Encryption",
      backSub: "End-to-end cryptographic hashing, TLS 1.3 tokenized payment flows, automated intrusion prevention, and regular audits.",
      statusTag: "100% Data Sovereignty",
    },
  ];

  return (
    <section className="sec-trans-section relative overflow-hidden !py-24 md:!py-32 bg-gradient-to-b from-[#f0f7ff] via-white to-[#f8fbff] text-slate-900 border-b border-sky-100">
      {/* Background ambient accents */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[600px] rounded-full bg-gradient-to-br from-[#0072bc]/15 via-sky-200/20 to-transparent blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-blue-100/30 blur-[100px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="trans-why-header mb-16 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>Enterprise Scale &amp; Performance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Why Leading Brands Choose Suffix IT
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
            Eliminating technical roadblocks to deliver scalable digital flagships that convert traffic into loyal, repeating buyers.
          </p>
        </motion.div>

        {/* 6 Flippable Cards Grid: Center Outwards Spread ("makhkhan theke 2 dike choriye jabe") */}
        <div className="trans-why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <WhyFlipCard key={c.title} {...c} index={idx} />
          ))}
        </div>

        {/* Bottom Callout Button */}
        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0072bc] to-[#005a96] hover:from-[#005a96] hover:to-[#004877] text-white px-8 py-4 text-sm font-bold shadow-lg shadow-[#0072bc]/25 hover:shadow-xl hover:shadow-[#0072bc]/35 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Discuss Your E-Commerce Roadmap</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
