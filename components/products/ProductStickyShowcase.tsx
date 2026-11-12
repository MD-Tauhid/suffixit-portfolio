"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { serviceContainer } from "@/components/services/service-styles";
import { cn } from "@/lib/utils";

export type FlagshipProduct = {
  id: string;
  step: string;
  name: string;
  slug: string;
  category: string;
  badge: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  features: string[];
  tone: "mint" | "blue" | "lavender" | "sky";
  image: string;
  architecture: {
    stack: string;
    throughput: string;
    security: string;
    database: string;
  };
};

const flagshipProducts: FlagshipProduct[] = [
  {
    id: "showcase-erp",
    step: "01",
    name: "Rupantar ERP",
    slug: "rupantar-erp",
    category: "ERP & Operations",
    badge: "Core Enterprise Backbone",
    subtitle: "Unified supply chain, multi-warehouse inventory & VAT accounting.",
    description:
      "Eliminate operational disconnects between your sales, warehouses, and finance. Rupantar ERP provides automated double-entry accounting, real-time stock reordering, multi-branch procurement, and NBR-compliant tax reconciliation in one auditable ecosystem.",
    metrics: [
      { label: "Inventory Accuracy", value: "99.98%" },
      { label: "Reconciliation", value: "3x Faster" },
      { label: "Multi-Warehouse", value: "Unlimited" },
    ],
    features: [
      "Real-time stock ledger & automated reorder levels",
      "NBR-compliant automated VAT & tax calculation",
      "Multi-currency financial general ledger & balance sheet",
      "Granular role-based permissions & audit trail",
    ],
    tone: "mint",
    image: "/assets/products/flagship-erp.jpg",
    architecture: {
      stack: "Next.js 16 + Node.js Microservices",
      throughput: "10,000+ Transactions / Sec Sub-second GL",
      security: "NBR VAT Audit Certified & ISO 27001",
      database: "PostgreSQL Multi-AZ Cluster",
    },
  },
  {
    id: "showcase-field-force",
    step: "02",
    name: "Field Force Management (FFMS)",
    slug: "field-force",
    category: "Field & Mobility",
    badge: "GPS Telemetry & Offline Orders",
    subtitle: "Real-time field telemetry, geofenced beats & instant order booking.",
    description:
      "Arm your field representatives, merchandisers, and delivery fleet with an offline-first mobile app. Track daily beat compliance with live GPS breadcrumbs, prevent attendance fraud with geofencing, and capture retail store orders with zero network latency.",
    metrics: [
      { label: "Daily Field Visits", value: "100k+" },
      { label: "Offline Sync", value: "0 Data Loss" },
      { label: "Order Booking", value: "< 20 Sec" },
    ],
    features: [
      "Live GPS agent tracking & route deviation alerts",
      "Offline SQLite local storage with smart background sync",
      "Geofenced biometric & photo verification on check-in",
      "Real-time target vs. achievement leaderboard",
    ],
    tone: "blue",
    image: "/assets/products/flagship-field-force.jpg",
    architecture: {
      stack: "Flutter Native Engine + Go Gateway",
      throughput: "100k+ Realtime Breadcrumbs & Beats",
      security: "Geofenced Biometric SHA-256 Protection",
      database: "Local SQLite DB + Cloud SQL Master",
    },
  },
  {
    id: "showcase-rupantar-hcm",
    step: "03",
    name: "Rupantar HCM & Payroll",
    slug: "rupantar-hcm",
    category: "Human Capital",
    badge: "Workforce & Compliance Engine",
    subtitle: "Biometric hardware sync, statutory tax engine & 1-click payslips.",
    description:
      "Simplify human resource management across multi-shift factories, corporate offices, and distributed teams. Direct integration with biometric timeclocks, customizable leave workflows, automated tax deductions, and provident fund interest calculations.",
    metrics: [
      { label: "Payroll Processing", value: "1-Click" },
      { label: "Biometric Sync", value: "Real-time" },
      { label: "Statutory Tax", value: "100% Auto" },
    ],
    features: [
      "Direct ZKTeco & IP biometric timeclock hardware sync",
      "Configurable salary structures (Basic, Allowances, PF, Tax)",
      "Employee self-service portal for leave & payslips",
      "BEFTN / NPSB compliant automated bank advice export",
    ],
    tone: "lavender",
    image: "/assets/products/flagship-hcm.jpg",
    architecture: {
      stack: "NestJS Core Framework + React Portal",
      throughput: "1-Click 5,000+ Employee Pay Slip Calculations",
      security: "Encrypted PII Storage & Role-Based ACL",
      database: "Encrypted PostgreSQL with Audit Log",
    },
  },
  {
    id: "showcase-smart-pos",
    step: "04",
    name: "Smart POS & Retail Suite",
    slug: "smart-pos",
    category: "Retail & Commerce",
    badge: "High-Throughput Counter Billing",
    subtitle: "Lightning-fast barcode checkout, split tender & multi-branch sync.",
    description:
      "Engineered for high-volume retail counters, supermarkets, and fashion chains. Features an ultra-responsive keyboard & touch interface, instant barcode lookups, split tender support (Cash, bKash, Card), thermal receipt printing, and daily shift cash reconciliations.",
    metrics: [
      { label: "Barcode Lookup", value: "< 50ms" },
      { label: "Split Tender", value: "Supported" },
      { label: "Offline Mode", value: "Continuous" },
    ],
    features: [
      "Instant barcode scan with touch-optimized counter UI",
      "Split payment acceptance (Cash, Cards, bKash, Wallets)",
      "Multi-store live stock sync with low-inventory warnings",
      "End-of-day cashier shift closure & Z-report printing",
    ],
    tone: "sky",
    image: "/assets/products/flagship-smart-pos.jpg",
    architecture: {
      stack: "Desktop Electron + High-Speed WebSocket Gateway",
      throughput: "Sub-50ms Local Barcode Lookups & Offline Caching",
      security: "Hardware Token Encryption & Shift Reconciliation",
      database: "IndexedDB Cache + Multi-Store Cloud DB",
    },
  },
];

const DISC = 52; // arrow disc diameter in px
const BLOCK = 68; // notch block in px
const FILLET = 22; // fillet curve radius in px

export default function ProductStickyShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalSteps = flagshipProducts.length;

  // Scroll spy: Detects which left-side text block is currently in the reading focal zone
  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const focalY = window.innerHeight * 0.42; // Reading focal line (around 42% of viewport)
        let closestIndex = 0;
        let minDistance = Infinity;

        blockRefs.current.forEach((el, index) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const blockCenter = rect.top + rect.height / 2;
          const distance = Math.abs(blockCenter - focalY);

          if (rect.top <= focalY && rect.bottom >= focalY) {
            closestIndex = index;
            minDistance = 0;
          } else if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        setActiveStep((prev) => (prev !== closestIndex ? closestIndex : prev));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll to selected product text block
  const scrollToProduct = useCallback((index: number) => {
    const el = blockRefs.current[index];
    if (!el) return;
    const navOffset = 130; // accounts for site header + sticky tabs
    const elRect = el.getBoundingClientRect();
    const targetY = window.scrollY + elRect.top - navOffset;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  const keyframesStyle = `
    @keyframes cardGlanceIn {
      0% {
        opacity: 0.25;
        transform: translateY(22px) scale(0.97);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `;

  return (
    <section
      id="flagship-showcase"
      className="relative w-full border-t border-[#0072bc]/10 !py-16 md:!py-24"
      style={{ backgroundColor: "#f9fbfe" }}
      aria-label="Interactive Platform Showcase"
    >
      <style>{keyframesStyle}</style>

      {/* Ambient Atmospheric Glows */}
      <div
        className="pointer-events-none absolute -left-20 top-1/4 size-[550px] rounded-full bg-gradient-to-tr from-[#0072bc]/10 via-[#00c2ff]/8 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 size-[500px] rounded-full bg-[#0072bc]/6 blur-3xl"
        aria-hidden="true"
      />

      <div className={serviceContainer}>
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#0072bc]/15 bg-white px-3 py-1 text-xs font-semibold text-[var(--br)] shadow-xs">
              <Sparkles size={13} />
              <span>Interactive Platform Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#17162a]">
              Four flagship pillars.{" "}
              <span className="text-[var(--br)]">One cohesive operations core.</span>
            </h2>
          </div>

          <p className="max-w-[440px] text-xs sm:text-sm leading-relaxed text-[#17162a]/70">
            Scroll down to explore each platform in detail. As each system glides into focus on the left, the interactive notched preview seamlessly updates beside it.
          </p>
        </div>

        {/* Sticky Interactive Step Tabs */}
        <div className="sticky top-20 z-20 mb-10 flex flex-wrap items-center justify-between gap-2.5 rounded-full border border-[#0072bc]/15 bg-white/90 p-1.5 shadow-sm backdrop-blur-md">
          <div className="flex flex-1 flex-wrap items-center gap-1 sm:gap-2">
            {flagshipProducts.map((prod, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => scrollToProduct(index)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300",
                    isActive
                      ? "bg-[var(--br)] text-white shadow-xs shadow-[#0072bc]/25"
                      : "text-[#17162a]/70 hover:bg-[#0072bc]/[0.06] hover:text-[#17162a]"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4.5 items-center justify-center rounded-full text-[10px] font-bold",
                      isActive ? "bg-white/20 text-white" : "bg-[#0072bc]/10 text-[var(--br)]"
                    )}
                  >
                    {prod.step}
                  </span>
                  <span className="truncate max-w-[130px] sm:max-w-none">{prod.name}</span>
                </button>
              );
            })}
          </div>

          {/* Stepper HUD Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-2 pr-2">
            <span className="text-[11px] font-mono text-[#17162a]/60">
              0{activeStep + 1} / 04
            </span>

            <button
              type="button"
              onClick={() => scrollToProduct(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              aria-label="Previous platform"
              className="flex size-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-2xs hover:border-[var(--br)] hover:text-[var(--br)] disabled:opacity-40"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              type="button"
              onClick={() => scrollToProduct(Math.min(totalSteps - 1, activeStep + 1))}
              disabled={activeStep === totalSteps - 1}
              aria-label="Next platform"
              className="flex size-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-2xs hover:border-[var(--br)] hover:text-[var(--br)] disabled:opacity-40"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Scrollytelling Stage: Left side text scrolls naturally, Right side card stays sticky! */}
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Left Column: 4 Distinct Product Narrative Blocks scrolling naturally */}
          <div className="flex flex-col space-y-16 lg:space-y-24 pb-12 lg:pb-24">
            {flagshipProducts.map((prod, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={prod.id}
                  id={prod.id}
                  ref={(el) => {
                    blockRefs.current[index] = el;
                  }}
                  className={cn(
                    "flex flex-col justify-center min-h-[65vh] lg:min-h-[78vh] py-8 lg:py-16 transition-all duration-500",
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-35 hover:opacity-75 scale-[0.98]"
                  )}
                >
                  {/* Category & Step Header */}
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex size-6.5 items-center justify-center rounded-full text-[11px] font-black text-white shadow-xs transition-colors",
                        isActive ? "bg-[var(--br)]" : "bg-slate-400"
                      )}
                    >
                      {prod.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--br)]">
                      {prod.category}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="rounded-full bg-[#0072bc]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--br)]">
                      {prod.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#17162a]">
                    {prod.name}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base font-semibold text-[var(--br)]">
                    {prod.subtitle}
                  </p>

                  {/* Full Description */}
                  <p className="mt-3 text-sm leading-relaxed text-[#17162a]/75 md:text-[15px]">
                    {prod.description}
                  </p>

                  {/* Mobile-Only Card Embed: Visible on small screens where sticky column is hidden */}
                  <div className="my-6 lg:hidden">
                    <FlagshipNotchedCard product={prod} />
                  </div>

                  {/* 3 Highlight Metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-2.5 rounded-2xl bg-white border border-[#0072bc]/10 p-3 shadow-2xs">
                    {prod.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-base sm:text-xl font-black text-[var(--br)]">
                          {m.value}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-medium text-[#17162a]/60">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 list-none p-0">
                    {prod.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs sm:text-[13px] text-[#17162a]/85"
                      >
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <Check size={11} strokeWidth={2.5} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="group inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[var(--br)] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#005a96]"
                    >
                      <span>Explore Full Specifications</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#0072bc]/20 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#17162a] shadow-2xs transition-colors hover:border-[var(--br)] hover:text-[var(--br)]"
                    >
                      <span>Schedule a Live Demo</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Pinned Showcase Card spanning full height of the section */}
          <div className="hidden lg:block relative h-full">
            <div
              className="sticky top-28 lg:top-36 z-10 w-full"
              style={{ position: "sticky", top: "8.5rem" }}
            >
              {/* Dynamic Aura Glow behind card matching product tone */}
              <div
                className={cn(
                  "pointer-events-none absolute -inset-6 rounded-[36px] blur-3xl transition-all duration-700 opacity-60",
                  flagshipProducts[activeStep].tone === "mint" && "bg-emerald-200/50",
                  flagshipProducts[activeStep].tone === "blue" && "bg-sky-200/50",
                  flagshipProducts[activeStep].tone === "lavender" && "bg-purple-200/50",
                  flagshipProducts[activeStep].tone === "sky" && "bg-cyan-200/50"
                )}
                aria-hidden="true"
              />

              {/* Active Notched Preview Card with Smooth Entrance Transition */}
              <div
                key={`sticky-card-${activeStep}`}
                className="relative w-full"
                style={{
                  animation: "cardGlanceIn 450ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                <FlagshipNotchedCard product={flagshipProducts[activeStep]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------------------------------
// Signature Notched Flagship Card Component
// -------------------------------------------------------------------------------------------------
function FlagshipNotchedCard({ product }: { product: FlagshipProduct }) {
  const surface = "#ffffff";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-[28px] border border-[#0072bc]/15 bg-white p-4 sm:p-5 shadow-[0_12px_40px_-12px_rgba(0,114,188,0.14)] transition-all duration-300 hover:border-[#0072bc]/40 hover:shadow-[0_22px_50px_-12px_rgba(0,114,188,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0072bc]"
    >
      {/* 1. Cover Photo with Bottom-Right Concentric Filleted Notch */}
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 550px"
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Subtle gradient overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15"
          />

          {/* Top Center Pill Badge */}
          <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center px-3">
            <span className="rounded-full border border-white/40 bg-black/45 px-3 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-md">
              {product.badge}
            </span>
          </div>

          {/* Bottom Left Live Engine Pill */}
          <div className="pointer-events-none absolute bottom-3 left-3">
            <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[9px] font-bold text-[var(--br)] shadow-sm backdrop-blur-md">
              <span className="size-1.5 animate-ping rounded-full bg-emerald-500" />
              PRODUCTION READY
            </span>
          </div>
        </div>

        {/* The Notch: painted in surface color (#ffffff) to carve the bottom-right corner */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: BLOCK,
            height: BLOCK,
            borderTopLeftRadius: BLOCK - DISC / 2,
            background: surface,
          }}
        />

        {/* The Notch Fillets: smoothly curves the cover edges into the notch cut */}
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`,
            }}
          />
        ))}

        {/* Nested Arrow Disc */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 flex items-center justify-center rounded-full border border-[#0072bc]/25 bg-[#f0f7ff] text-[#0072bc] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-transparent group-hover:bg-[#0072bc] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(0,114,188,0.35)]"
          style={{ width: DISC, height: DISC }}
        >
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      {/* 2. Card Content & Specifications */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          {/* Category & Version/Stack Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full border border-[#0072bc]/20 bg-[#e8f3fc] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0072bc]">
              {product.category}
            </span>
            <span className="text-[10px] font-medium text-[#17162a]/55">
              {product.architecture.stack.split("+")[0].trim()}
            </span>
          </div>

          {/* Product Title */}
          <h4 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-[#17162a] transition-colors duration-200 group-hover:text-[#0072bc]">
            {product.name}
          </h4>

          {/* Subtitle / Summary */}
          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#17162a]/70 line-clamp-2">
            {product.subtitle}
          </p>
        </div>

        {/* Telemetry Metric Chip & Feature Tags */}
        <div className="mt-3.5 space-y-2.5 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between rounded-xl bg-[#f5f9fe] border border-[#0072bc]/10 px-3 py-1.5 text-xs">
            <span className="flex items-center gap-1.5 text-[#17162a]/65 font-medium text-[11px]">
              <Sparkles size={11} className="text-[#0072bc]" />
              {product.metrics[0].label}
            </span>
            <strong className="font-bold text-[#0072bc] text-xs">
              {product.metrics[0].value}
            </strong>
          </div>

          {/* Feature Tags */}
          <ul className="flex flex-wrap gap-1.5" aria-label="Key features">
            {product.features.slice(0, 3).map((feat, idx) => (
              <li
                key={idx}
                className="rounded-md bg-slate-100/80 px-2 py-0.5 text-[9px] font-medium text-slate-600 transition-colors group-hover:bg-[#f0f7ff] group-hover:text-[#0072bc]"
              >
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
