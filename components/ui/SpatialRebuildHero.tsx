"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import Icon from "@/components/ui/Icon";
import ShapeGrid from "@/components/ui/ShapeGrid";
import HeroCurves from "@/components/ui/HeroCurves";
import BentCircuit from "@/components/ui/BentCircuit";
import HeroTypewriter from "@/components/ui/HeroTypewriter";
import {
  SpatialCardCarousel,
  type SpatialCardItem,
} from "@/components/ui/spatial-card-carousel";

/* ─────────────────────────────────────────────────────────────
   SUFFIX IT ENTERPRISE PRODUCTS (Light Theme with Dedicated Routes)
   10 items matching the 10 orbital slots (0 to 9) in 3D space
   ───────────────────────────────────────────────────────────── */
const SUFFIX_SOFTWARE_ITEMS: SpatialCardItem[] = [
  {
    id: "rupantar-erp",
    title: "Rupantar ERP",
    subtitle: "Enterprise Operations & Supply Chain",
    image: "/assets/products/product-erp-light.jpg",
    href: "/products/rupantar-erp",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-erp-light.jpg"
          alt="Rupantar ERP"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        {/* Top-left light theme badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-sky-500 animate-pulse" />
            Flagship ERP
          </span>
        </div>
        {/* Top-right click affordance */}
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        {/* Bottom light theme frosted scrim */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              Rupantar ERP
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            Enterprise Operations &amp; Supply Chain
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "field-force-gps",
    title: "Suffix Field Force",
    subtitle: "Live GPS Telemetry & Sales Tracking",
    image: "/assets/products/product-field-force-light.jpg",
    href: "/products/field-force",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-field-force-light.jpg"
          alt="Suffix Field Force"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Telemetry
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              Suffix Field Force
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            Real-Time GPS &amp; Sales Force Automation
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "hcm-payroll",
    title: "HCM & Payroll Suite",
    subtitle: "Automated Attendance, Tax & Salaries",
    image: "/assets/products/product-hcm-light.jpg",
    href: "/products/rupantar-hcm",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-hcm-light.jpg"
          alt="HCM & Payroll Suite"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-indigo-500 animate-pulse" />
            HR Tech
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              HCM &amp; Payroll Suite
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            Automated Attendance, Tax &amp; Salaries
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "smart-pos",
    title: "Smart Cloud POS",
    subtitle: "High-Speed Retail, Barcode & Billing",
    image: "/assets/products/product-pos-light.jpg",
    href: "/products/smart-pos",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-pos-light.jpg"
          alt="Smart Cloud POS"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
            Retail POS
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              Smart Cloud POS
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            High-Speed Multi-Store Retail Engine
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ecommerce-platform",
    title: "Headless E-Commerce",
    subtitle: "High-Volume B2B/B2C & Payment IPN",
    image: "/assets/products/product-ecommerce-light.jpg",
    href: "/products/ecommerce",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-ecommerce-light.jpg"
          alt="Headless E-Commerce"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-violet-500 animate-pulse" />
            Digital Commerce
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              Headless E-Commerce
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            bKash, Nagad, Cards &amp; Fast Logistics
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "provident-fund",
    title: "Suffix Provident Fund",
    subtitle: "Statutory Trust Accounting & Loans",
    image: "/assets/products/product-provident-fund-light.jpg",
    href: "/products/provident-fund",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-provident-fund-light.jpg"
          alt="Suffix Provident Fund"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-cyan-600 animate-pulse" />
            FinTech Trust
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-600 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              Suffix Provident Fund
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            Statutory Trust Accounting &amp; Ledger
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "icx-billing",
    title: "Telecom ICX Billing",
    subtitle: "High-Throughput Carrier CDR Engine",
    image: "/assets/products/product-icx-billing-light.jpg",
    href: "/products/interconnect-billing",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-icx-billing-light.jpg"
          alt="Telecom ICX Billing"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
            Telecom ICX
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              Telecom ICX Billing
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            50M+ Daily CDR Rating &amp; ANS Settlement
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "hotel-booking",
    title: "Hotel & Resort ERP",
    subtitle: "Centralized Reservation & Guest Folio",
    image: "/assets/products/product-hotel-booking-light.jpg",
    href: "/products/hotel-booking",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-hotel-booking-light.jpg"
          alt="Hotel & Resort ERP"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
            Hospitality
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              Hotel &amp; Resort ERP
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            Centralized Booking &amp; Housekeeping
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "sms-meeting",
    title: "Bulk SMS & HD Meeting",
    subtitle: "Enterprise Messaging & Video Meetings",
    image: "/assets/products/product-sms-meeting-light.jpg",
    href: "/products/bulk-sms-meeting",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-sms-meeting-light.jpg"
          alt="Bulk SMS & HD Meeting"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-purple-500 animate-pulse" />
            Unified Comms
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              Bulk SMS &amp; HD Meeting
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            High-Throughput SMS &amp; Video Meetings
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "cloud-infra",
    title: "Cloud Infrastructure",
    subtitle: "High-Availability Microservices & SLAs",
    image: "/assets/products/product-payroll-system-hero-3d.jpg",
    href: "/products/payroll-system",
    renderContent: () => (
      <div className="relative h-full w-full overflow-hidden bg-white group rounded-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/products/product-payroll-system-hero-3d.jpg"
          alt="Cloud Infrastructure"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-200/90 text-[#0072bc] text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" />
            Cloud Engine
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500 text-white text-[10px] font-bold shadow-xs">
            Open <ExternalLink size={10} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-slate-900 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1">
              Cloud Systems &amp; SLAs
            </div>
            <ArrowUpRight size={13} className="text-[#0072bc] shrink-0 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div className="text-[11px] font-medium text-slate-600 line-clamp-1 mt-0.5">
            99.99% Uptime High-Availability SLA
          </div>
        </div>
      </div>
    ),
  },
];

export default function SpatialRebuildHero() {
  const router = useRouter();

  // Hover state to pause 3D orbital autoplay immediately when mouse is over card area
  const [isCardAreaHovered, setIsCardAreaHovered] = useState(false);

  // Choreographed Reveal Lifecycle matching Flagship Hero
  const [stage, setStage] = useState<"loading" | "cascading" | "active">("loading");
  const [triggerWave, setTriggerWave] = useState(0);

  const startRevealSequence = useCallback(() => {
    setStage("loading");

    const tCascade = setTimeout(() => {
      setTriggerWave((prev) => prev + 1);
      setStage("cascading");
    }, 850);

    const tActive = setTimeout(() => {
      setStage("active");
    }, 1350);

    return () => {
      clearTimeout(tCascade);
      clearTimeout(tActive);
    };
  }, []);

  const handleQuickSkip = () => {
    if (stage === "loading") {
      setTriggerWave((prev) => prev + 1);
      setStage("cascading");
      setTimeout(() => setStage("active"), 300);
    }
  };

  useEffect(() => {
    const cleanup = startRevealSequence();
    return cleanup;
  }, [startRevealSequence]);

  const handleCardClick = useCallback(
    (item: SpatialCardItem) => {
      if (item.href) {
        router.push(item.href);
      }
    },
    [router]
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen lg:min-h-[640px] lg:h-[calc(100vh-64px)] lg:max-h-[860px] w-full overflow-x-clip lg:overflow-hidden bg-gradient-to-b from-[#f8fcff] via-[#f0f7fc] to-white border-b border-sky-100 flex items-center justify-center py-10 sm:py-12 lg:py-6 select-none"
    >
      {/* SVG CLIP-PATH DEFINITION FOR ROUNDED HEXAGON */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="rounded-hex-spatial-hero" clipPathUnits="objectBoundingBox">
            <path d="M 0.58 0.04 L 0.931 0.21 Q 1 0.25 1 0.33 L 1 0.67 Q 1 0.75 0.931 0.79 L 0.58 0.96 Q 0.5 1 0.42 0.96 L 0.069 0.79 Q 0 0.75 0 0.67 L 0 0.33 Q 0 0.25 0.069 0.21 L 0.42 0.04 Q 0.5 0 0.58 0.04 Z" />
          </clipPath>
        </defs>
      </svg>

      <style jsx>{`
        @keyframes shimmerSweep {
          0% {
            transform: translate(-100%, -100%) rotate(-45deg);
          }
          100% {
            transform: translate(100%, 100%) rotate(-45deg);
          }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND EFFECTS (ShapeGrid + HeroCurves + BentCircuit)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <ShapeGrid
          className="absolute inset-0 size-full opacity-70"
          shape="square"
          direction="diagonal"
          lineColor="#cfe6f8"
          hoverColor="#0072bc"
          hoverFillColor="#38bdf8"
          fillOpacity={0.16}
          cellSize={44}
          speed={0.35}
          glow={0.45}
          trail={0.65}
          radius={1.8}
          clickCascade={true}
          triggerWave={triggerWave}
          intro={false}
          fade={0.88}
        />

        <div
          className="absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-out"
          style={{ opacity: stage === "active" ? 1 : 0 }}
        >
          <HeroCurves />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ease-out"
          style={{ opacity: stage === "active" ? 0.75 : 0 }}
        >
          <BentCircuit className="w-full max-w-6xl h-auto" />
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] rounded-full bg-gradient-to-b from-sky-300/25 via-[#0072bc]/10 to-transparent blur-3xl -z-10 transition-opacity duration-1000 ease-out"
          style={{ opacity: stage === "active" ? 1 : 0 }}
          aria-hidden="true"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CINEMATIC LOADING SCENE
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {(stage === "loading" || stage === "cascading") && (
          <motion.div
            key="cinema-reveal"
            onClick={handleQuickSkip}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(12px)",
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-auto cursor-pointer overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 1, y: 0 }}
              animate={{
                scale: stage === "cascading" ? 1.06 : 1,
                opacity: stage === "cascading" ? 0.85 : 1,
                y: 0,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center justify-center"
            >
              <div
                className="pointer-events-none absolute size-[360px] sm:size-[440px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.52)_0%,rgba(0,114,188,0.28)_45%,transparent_70%)] blur-3xl opacity-95 animate-pulse"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute size-[310px] sm:size-[380px] rounded-full border border-[#0072bc]/35 border-dashed animate-[spin_60s_linear_infinite]"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute size-[330px] sm:size-[400px] rounded-full border border-sky-400/35 animate-ping"
                aria-hidden="true"
              />

              <div
                className="relative flex items-center justify-center select-none"
                style={{
                  width: "168px",
                  height: "194px",
                  filter:
                    "drop-shadow(0 24px 50px rgba(0, 114, 188, 0.38)) drop-shadow(0 4px 18px rgba(56, 189, 248, 0.48))",
                }}
              >
                <div
                  className="size-full p-[3px] transition-all duration-300"
                  style={{
                    clipPath: "url(#rounded-hex-spatial-hero)",
                    background: "linear-gradient(135deg, #0072bc 0%, #38bdf8 50%, #ffffff 100%)",
                  }}
                >
                  <div
                    className="relative size-full overflow-hidden bg-gradient-to-br from-[#f8fcff] via-[#e8f4fc] to-[#d8ebfa] flex items-center justify-center"
                    style={{
                      clipPath: "url(#rounded-hex-spatial-hero)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.32)_0%,rgba(0,114,188,0.12)_55%,transparent_80%)]"
                      aria-hidden="true"
                    />

                    <div className="relative z-20 flex items-center justify-center pointer-events-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/about/s-logo.png"
                        alt="Suffix IT"
                        width={96}
                        height={96}
                        className="object-contain drop-shadow-[0_10px_22px_rgba(0,114,188,0.38)] select-none"
                      />
                    </div>

                    <div
                      className="pointer-events-none absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/45 to-transparent -rotate-45 animate-[shimmerSweep_2.4s_infinite_linear] z-25"
                      aria-hidden="true"
                    />

                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/90 via-white/25 to-transparent z-30"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-5 flex flex-col items-center gap-1"
              >
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-sky-200/90 shadow-md text-[11px] font-black uppercase tracking-wider text-[#0072bc] backdrop-blur-md">
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>SUFFIX IT • SPATIAL 3D STAGE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 tracking-tight">
                  Architecting Enterprise Reality
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Horizon Light Sweep across Hero during reveal */}
      {stage === "active" && (
        <motion.div
          initial={{ left: "-20%", opacity: 0.7 }}
          animate={{ left: "120%", opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-sky-300/25 to-transparent skew-x-12 z-20"
          aria-hidden="true"
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. REVEALED HERO CONTENT (Awakened, Interactive & Prestigious)
          ───────────────────────────────────────────────────────────── */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-visible transition-opacity duration-700 ease-out ${
          stage === "active" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.18fr] items-center gap-6 lg:gap-8 overflow-visible">
          {/* Left Column: Monolithic Kinetic Typography & CTAs (Strictly relative z-30 so floating cards smoothly glide underneath) */}
          <div
            className={`relative z-30 pointer-events-auto text-left transition-all duration-700 ease-out ${
              stage === "active" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            {/* Live Eyebrow Tag */}
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-white/95 border border-sky-200/80 px-3.5 py-1 text-xs font-bold shadow-sm backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-slate-800 font-extrabold tracking-wide uppercase text-[11px]">
                Software Company
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[#0072bc] font-semibold text-[11px]">Dhaka, Bangladesh</span>
            </div>

            {/* Monolithic Kinetic Headline with Two-Line Reserved Runway Typewriter */}
            <h1 className="!m-0 text-[clamp(28px,3.3vw,48px)] font-black leading-[1.12] tracking-[-0.04em] text-[#0f172a]">
              We build software solutions that{" "}
              <span className="block mt-1 h-[2.35em] overflow-visible leading-[1.14]">
                <HeroTypewriter
                  words={[
                    "power your business.",
                    "scale your enterprise.",
                    "automate your operations.",
                    "accelerate your growth.",
                    "streamline your finances.",
                  ]}
                  typingSpeed={72}
                  deletingSpeed={36}
                  pauseDuration={2400}
                />
              </span>
            </h1>

            {/* Authoritative Subtitle */}
            <p className="mt-3.5 mb-5 text-sm sm:text-base leading-relaxed text-[#334155] max-w-[540px] font-normal">
              Suffix IT is a premier enterprise software and ICT solutions company. We architect, develop, and support
              high-concurrency ERP, automated HR &amp; payroll, fintech payment integrations, mobile applications, and
              cloud microservices for leading corporations in Bangladesh and beyond.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0072bc] to-[#0284c7] hover:from-[#005a96] hover:to-[#0072bc] text-white px-6 py-3 text-xs sm:text-sm font-bold shadow-lg shadow-[#0072bc]/25 hover:shadow-xl hover:shadow-[#0072bc]/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <span>Get a Free Consultation</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="#products"
                className="group inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#0072bc] border border-slate-200/90 hover:border-[#0072bc]/30 px-6 py-3 text-xs sm:text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <Sparkles
                  size={14}
                  className="text-[#0072bc] transition-transform duration-300 group-hover:rotate-12"
                />
                <span>Explore Solutions</span>
              </Link>
            </div>

            {/* Core Capabilities Chips */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs">
                <Icon name="settings" size={13} className="text-[#0072bc]" /> Custom Software
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs">
                <Icon name="layers" size={13} className="text-[#0072bc]" /> Ready Enterprise Products
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs">
                <Icon name="cloud" size={13} className="text-[#0072bc]" /> Cloud Hosting &amp; SLAs
              </span>
            </div>

            {/* Executive Proof Indicators */}
            <div className="mt-5 flex flex-wrap items-center gap-5 pt-4 border-t border-slate-200/70 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>100k+ Transactions/Sec</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#0072bc] shrink-0" />
                <span>ISO 27001 Security Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>99.99% Uptime SLA</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Spatial Orbital Cards (Strictly relative z-10, overflow-visible, zero clipping) */}
          <div
            onMouseEnter={() => setIsCardAreaHovered(true)}
            onMouseLeave={() => setIsCardAreaHovered(false)}
            onPointerEnter={() => setIsCardAreaHovered(true)}
            onPointerLeave={() => setIsCardAreaHovered(false)}
            className={`relative z-10 flex items-center justify-center w-full overflow-visible transition-all duration-700 ease-out delay-75 ${
              stage === "active" ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative w-full overflow-visible flex items-center justify-center">
              <SpatialCardCarousel
                items={SUFFIX_SOFTWARE_ITEMS}
                theme="light"
                autoPlay={true}
                paused={isCardAreaHovered}
                interval={2600}
                pauseOnHover={true}
                enableWheel={false}
                onCardClick={handleCardClick}
                ariaLabel="Suffix IT Spatial 3D Product Showcase"
                className="!bg-transparent !shadow-none !border-0 !h-[500px] sm:!h-[560px] lg:!h-[600px] w-full overflow-visible"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. REPLAY TRIGGER (Bottom-Right Floating Action)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-4 right-5 z-20">
        <button
          onClick={startRevealSequence}
          className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 hover:border-[#0072bc]/40 text-[11px] font-bold text-slate-600 hover:text-[#0072bc] shadow-xs hover:shadow-sm backdrop-blur-md transition-all cursor-pointer"
          title="Replay Reveal Animation"
        >
          <RefreshCw size={12} className="text-[#0072bc] transition-transform duration-500 group-hover:rotate-180" />
          <span>Replay Reveal</span>
        </button>
      </div>
    </section>
  );
}
