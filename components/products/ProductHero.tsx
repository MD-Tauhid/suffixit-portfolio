"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Database,
  Layers,
  Navigation,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { servicePalette } from "@/lib/service-palette";
import { serviceButton, serviceContainer } from "@/components/services/service-styles";
import ProductGlassStageVisual from "./ProductGlassStageVisual";

const flagshipChips = [
  { label: "Rupantar ERP", anchor: "#showcase-erp", tag: "Operations & Accounting" },
  { label: "Field Force (FFMS)", anchor: "#showcase-field-force", tag: "GPS & Telemetry" },
  { label: "Rupantar HCM", anchor: "#showcase-rupantar-hcm", tag: "People & Payroll" },
  { label: "Smart POS", anchor: "#showcase-smart-pos", tag: "Retail Checkout" },
];

const highlights = [
  { value: "12+", label: "Turnkey Products", sub: "Modular & API-ready", icon: Layers },
  { value: "100k+", label: "Field Visits / Day", sub: "Offline-first sync", icon: Navigation },
  { value: "99.98%", label: "Inventory Accuracy", sub: "Multi-warehouse GL", icon: Database },
  { value: "< 50ms", label: "Barcode Checkout", sub: "Instant POS response", icon: Zap },
];

export default function ProductHero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative overflow-hidden border-b border-[#0072bc]/[.08] !pt-20 !pb-14 md:!pt-24 md:!pb-18"
      style={{ backgroundColor: servicePalette.blue }}
    >
      {/* Background Ambient Accents */}
      <div
        className="pointer-events-none absolute -right-20 -top-24 size-[500px] rounded-full border-[60px] border-white/50 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 size-[420px] rounded-full bg-white/40 blur-3xl"
        aria-hidden="true"
      />

      <div className={serviceContainer}>
        {/* Main 2-Column Split: Editorial Left, Interactive 3D Glass Stage Right */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="w-full lg:w-[54%] text-center lg:text-left">
            {/* Top Eyebrow Tag */}
            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-[#0072bc]/[.15] bg-white/90 px-4 py-1.5 shadow-[0_2px_12px_rgba(0,114,188,0.06)] backdrop-blur-md mx-auto lg:mx-0">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--br)] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--br)]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--br)]">
                Suffix IT Software Suite
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-[11px] font-medium text-[#17162a]/70">
                Awwwards-Grade Architecture
              </span>
            </div>

            {/* Hero Headline - Editorial Typography */}
            <h1 className="text-[clamp(34px,4.6vw,70px)] font-extrabold leading-[1.08] tracking-[-2px] text-[#17162a]">
              Software products.
              <br />
              <span className="font-light italic text-[var(--br)]">
                Engineered for enterprise scale.
              </span>
            </h1>

            <p className="mt-5 max-w-[580px] text-[15px] leading-[1.8] text-[#17162a]/75 md:text-[16px] mx-auto lg:mx-0">
              Eliminate operational friction with production-tested business systems. From multi-warehouse
              ERP accounting and real-time GPS field force tracking to statutory HR payroll and retail POS—ready
              to deploy and customize.
            </p>

            {/* Floating Flagship Quick-Jump Chips */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#17162a]/60">
                Flagship Platforms:
              </span>
              {flagshipChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => scrollTo(chip.anchor)}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#0072bc]/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#17162a]/80 shadow-sm transition-all duration-200 hover:border-[var(--br)] hover:bg-[var(--br)] hover:text-white"
                >
                  <span>{chip.label}</span>
                  <span className="text-[9px] opacity-60 group-hover:opacity-90">({chip.tag})</span>
                </button>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                type="button"
                onClick={() => scrollTo("#flagship-showcase")}
                className={serviceButton}
              >
                Explore Flagship Suite
                <ArrowDown size={17} className="transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("#product-library")}
                className="group inline-flex min-h-[52px] items-center gap-3 rounded-full border border-[#0072bc]/20 bg-white/80 px-6 py-3 text-[13px] font-semibold text-[#17162a] shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-[var(--br)] hover:bg-white"
              >
                <span>Browse All 12 Products</span>
                <ArrowUpRight size={17} className="text-[var(--br)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Frosted Liquid Glass Product Suite Visual */}
          <div className="w-full lg:w-[46%] flex items-center justify-center">
            <ProductGlassStageVisual />
          </div>
        </div>

        {/* Highlights / Performance Credentials Bar */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 md:mt-16 md:gap-5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-[24px] border border-solid border-[#0072bc]/15 bg-white/95 p-4 shadow-[0_10px_30px_-15px_rgba(0,114,188,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--br)]/40 hover:shadow-[0_16px_36px_-15px_rgba(0,114,188,0.22)] sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[26px] font-black tracking-tight text-[var(--br)] md:text-[32px]">
                    {item.value}
                  </div>
                  <div className="flex size-8 items-center justify-center rounded-xl bg-[#0072bc]/10 text-[var(--br)] transition-colors group-hover:bg-[var(--br)] group-hover:text-white">
                    <Icon size={16} />
                  </div>
                </div>
                <div className="mt-2 text-xs font-bold text-[#17162a]">{item.label}</div>
                <div className="text-[11px] text-[#17162a]/60">{item.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
