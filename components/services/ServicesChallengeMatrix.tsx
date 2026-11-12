"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Globe,
  Server,
  Cpu,
  Building2,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { servicePalette } from "@/lib/service-palette";
import { serviceContainer, serviceButton } from "./service-styles";

interface ChallengeItem {
  id: string;
  index: string;
  category: string;
  icon: typeof Layers;
  iconColor: string;
  iconBg: string;
  challengeTitle: string;
  symptom: string;
  solutionTitle: string;
  solutionText: string;
  outcomeMetric: string;
  outcomeLabel: string;
  techTags: string[];
  targetServiceHref: string;
}

const challengeMatrix: ChallengeItem[] = [
  {
    id: "siloed-operations",
    index: "01",
    category: "ERP & Finance",
    icon: Layers,
    iconColor: "#7c3aed",
    iconBg: "bg-[#f4effc]",
    challengeTitle: "Fragmented Multi-Branch Data & Siloed Spreadsheets",
    symptom:
      "Different branches and warehouses use disconnected tools; manual reconciliation takes days and causes frequent stockout discrepancies.",
    solutionTitle: "Central Rupantar ERP & Multi-Branch Ledger",
    solutionText:
      "Unified real-time stock sync across all branches, automated 3-way procurement matching, and compliant double-entry general ledger accounts.",
    outcomeMetric: "Zero Error",
    outcomeLabel: "Multi-branch ledger reconciliation",
    techTags: ["NBR VAT 9.1", "Mushak 6.3", "Double-Entry Ledger", "Central Stock Sync"],
    targetServiceHref: "/services/erp-consulting",
  },
  {
    id: "sluggish-commerce",
    index: "02",
    category: "Digital Sales",
    icon: Globe,
    iconColor: "#0072bc",
    iconBg: "bg-[#eaf4fd]",
    challengeTitle: "Sluggish Mobile Checkout & High Abandonment Rates",
    symptom:
      "Legacy monolithic web storefronts take 3+ seconds to load on mobile, leaking qualified customers at the payment gateway.",
    solutionTitle: "Headless Next.js & 60fps Native Flutter Apps",
    solutionText:
      "Sub-second product search, instant bKash/Nagad/Card gateway integration, and butter-smooth 60fps native checkout flows.",
    outcomeMetric: "< 28ms",
    outcomeLabel: "p99 API search latency",
    techTags: ["Headless Next.js", "Flutter Mobile", "bKash / Nagad", "Instant Cart"],
    targetServiceHref: "/services/web-ecommerce",
  },
  {
    id: "unplanned-downtime",
    index: "03",
    category: "Cloud Infra",
    icon: Server,
    iconColor: "#0284c7",
    iconBg: "bg-[#eaf5fc]",
    challengeTitle: "Costly Server Outages During Critical Traffic Surges",
    symptom:
      "Shared hosting crashes under sudden campaign peaks, causing direct revenue loss, reputation damage, and manual panic restarts.",
    solutionTitle: "Multi-AZ Kubernetes Orchestration & SSD Cloud",
    solutionText:
      "Auto-scaling cluster nodes, automated multi-region failover, 24/7 hardware monitoring, and AES-256 snapshot recovery.",
    outcomeMetric: "99.98%",
    outcomeLabel: "Verified SLA uptime guarantee",
    techTags: ["Kubernetes v1.30", "Multi-AZ Failover", "Tier-III SSD", "DDoS Mitigation"],
    targetServiceHref: "/services/cloud-hosting",
  },
  {
    id: "iot-blindspots",
    index: "04",
    category: "IoT & OT",
    icon: Cpu,
    iconColor: "#059669",
    iconBg: "bg-[#eafaf1]",
    challengeTitle: "Unmonitored Industrial Assets & Equipment Breakdowns",
    symptom:
      "Factory transformers, power lines, and field logistics fleets lack real-time telemetry, risking costly burnouts and fuel loss.",
    solutionTitle: "Industrial IoT Telemetry & SCADA OT Security",
    solutionText:
      "Encrypted MQTT-TLS gateways, remote transformer health sensors, automated thermal alarms, and offline SQLite sync.",
    outcomeMetric: "1,200+",
    outcomeLabel: "Active field units monitored",
    techTags: ["MQTT-TLS Gateway", "Thermal Telemetry", "Offline SQLite", "GPS Geofencing"],
    targetServiceHref: "/services/iot-solutions",
  },
  {
    id: "hospital-bottlenecks",
    index: "05",
    category: "Healthcare",
    icon: Building2,
    iconColor: "#0072bc",
    iconBg: "bg-[#eaf4fd]",
    challengeTitle: "Paper-Heavy Hospital Records & Pharmacy Stock Leaks",
    symptom:
      "Long OPD patient queues, missing diagnostic histories, and unverified medication dispensing across clinic counters.",
    solutionTitle: "Integrated Hospital Operating Suite (HMS)",
    solutionText:
      "Connected electronic medical health records (EMR), real-time pharmacy inventory sync, diagnostic lab automation, and instant billing.",
    outcomeMetric: "100%",
    outcomeLabel: "Patient diagnostic traceability",
    techTags: ["OPD / IPD Registry", "Pharmacy Stock Sync", "Diagnostic Lab", "Insurance Claims"],
    targetServiceHref: "/services/hospital-management",
  },
  {
    id: "tax-compliance",
    index: "06",
    category: "Compliance",
    icon: ShieldCheck,
    iconColor: "#7c3aed",
    iconBg: "bg-[#f4effc]",
    challengeTitle: "Manual Statutory Tax Filing & VAT Audit Penalties",
    symptom:
      "Calculating Mushak 6.3 invoices by hand exposes finance teams to costly statutory fines and prolonged NBR audit scrutiny.",
    solutionTitle: "Automated NBR VAT 9.1 & Mushak Reconciliation",
    solutionText:
      "One-click Mushak 6.3 generation, automated sales and purchase VAT reconciliation, and certified statutory audit exports.",
    outcomeMetric: "100% Tax",
    outcomeLabel: "Statutory NBR compliance verified",
    techTags: ["NBR VAT 9.1", "Mushak 6.3 Auto", "Audit Trail", "Financial Ledger"],
    targetServiceHref: "/services/erp-consulting",
  },
];

export default function ServicesChallengeMatrix() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [maxScrollX, setMaxScrollX] = useState(0);

  const totalCards = challengeMatrix.length;

  // Horizontal Scroll Engine (Matching Home Page "Our Products" Style)
  const updateScroll = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight || 800;
    const trackWidth = track.scrollWidth;

    // Calculate maximum horizontal travel distance
    const maxTranslate = Math.max(0, trackWidth - viewportWidth + 64);
    setMaxScrollX(maxTranslate);

    const rect = container.getBoundingClientRect();
    const scrollableDistance = container.offsetHeight - viewportHeight;

    if (scrollableDistance <= 0) {
      setScrollProgress(0);
      setTranslateX(0);
      return;
    }

    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));

    setScrollProgress(progress);
    setTranslateX(progress * maxTranslate);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateScroll();
        rafId = null;
      });
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateScroll]);

  // Active card index
  const activeCardIndex = Math.min(
    totalCards - 1,
    Math.max(0, Math.round(scrollProgress * (totalCards - 1)))
  );

  // Jump to specific card smoothly
  const scrollToCard = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const containerTop = currentScrollY + rect.top;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const targetProgress = totalCards > 1 ? index / (totalCards - 1) : 0;
    const targetY = containerTop + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  // Natural scroll height: 400vh gives ~60vh per card for calm, natural, comfortable browsing
  const outerHeight = "400vh";

  return (
    <section
      id="challenges"
      ref={containerRef}
      className="relative"
      style={{
        backgroundColor: servicePalette.lavender,
        height: outerHeight,
      }}
    >
      {/* Sticky Viewport Container (Sticky top-0 h-screen, exactly like Home Page Our Products) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-6 lg:py-7">
        {/* Soft Background Ambient Glow */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/4 -z-10 size-[550px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-10 right-1/4 -z-10 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,114,188,0.1)_0%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        {/* ────────────────────────────────────────────────────────
            TOP BAR: HEADER, STEP PILLS & NAVIGATION CONTROLS
           ──────────────────────────────────────────────────────── */}
        <div className="w-full px-4 sm:px-8 lg:px-12 shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              {/* Eyebrow Badge */}
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/25 bg-white/80 px-3.5 py-1 text-xs font-bold text-[#7c3aed] backdrop-blur-xs">
                <span className="size-2 rounded-full bg-[#7c3aed] animate-pulse" />
                <span>Problem-To-Architecture Mapping</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#062b43] tracking-tight">
                Start with a challenge.{" "}
                <em className="font-serif italic font-normal text-[#0072bc]">
                  Find the right approach.
                </em>
              </h2>
            </div>

            {/* Step Pills & Prev/Next Arrows */}
            <div className="flex items-center gap-3">
              {/* Card Step Pills */}
              <div className="hidden sm:flex items-center gap-1.5 bg-white/80 p-1 rounded-full border border-white shadow-xs backdrop-blur-xs">
                {challengeMatrix.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                      activeCardIndex === idx
                        ? "bg-[#7c3aed] text-white shadow-xs"
                        : "text-[#5e5875] hover:text-[#7c3aed] hover:bg-white"
                    }`}
                  >
                    <span>{item.index}</span>
                  </button>
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous challenge"
                  disabled={activeCardIndex <= 0}
                  onClick={() => scrollToCard(activeCardIndex - 1)}
                  className="size-9 rounded-full border border-[#d8d0ee] bg-white text-[#062b43] flex items-center justify-center hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-xs"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next challenge"
                  disabled={activeCardIndex >= totalCards - 1}
                  onClick={() => scrollToCard(activeCardIndex + 1)}
                  className="size-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center hover:bg-[#6827d4] transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-xs"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            MIDDLE: HORIZONTAL SCROLL SHOWCASE TRACK
           ──────────────────────────────────────────────────────── */}
        <div className="w-full overflow-hidden my-auto py-2">
          <div
            ref={trackRef}
            className="flex gap-5 sm:gap-6 px-4 sm:px-8 lg:px-12 w-max transition-transform duration-75 ease-out will-change-transform"
            style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
          >
            {challengeMatrix.map((item, idx) => {
              const Icon = item.icon;
              const isCurrent = activeCardIndex === idx;

              return (
                <div
                  key={item.id}
                  className={`group relative flex flex-col justify-between w-[320px] sm:w-[380px] md:w-[420px] rounded-2xl border bg-white/95 p-6 sm:p-7 transition-all duration-300 backdrop-blur-md shrink-0 ${
                    isCurrent
                      ? "border-[#7c3aed] shadow-[0_25px_50px_-15px_rgba(124,58,237,0.22)] scale-[1.01]"
                      : "border-white/80 shadow-[0_15px_35px_-15px_rgba(124,58,237,0.1)] hover:border-[#7c3aed]/50 hover:shadow-lg"
                  }`}
                >
                  <div>
                    {/* Card Top Meta */}
                    <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#ede8fa]">
                      <div className="flex items-center gap-2.5">
                        <span className={`grid size-9 place-items-center rounded-xl ${item.iconBg} text-[#7c3aed] shadow-xs`}>
                          <Icon size={18} style={{ color: item.iconColor }} />
                        </span>
                        <div>
                          <span className="font-mono text-[10px] font-bold text-[#7c3aed] block">
                            CHALLENGE {item.index}
                          </span>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#062b43]">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shrink-0">
                        <AlertCircle size={11} />
                        <span>Pain Point</span>
                      </span>
                    </div>

                    {/* Challenge Title & Symptom */}
                    <div className="mt-4">
                      <h3 className="text-base sm:text-lg font-black text-[#062b43] leading-snug">
                        {item.challengeTitle}
                      </h3>
                      <p className="mt-2 text-xs sm:text-[13px] leading-[1.7] text-[#55697d]">
                        {item.symptom}
                      </p>
                    </div>

                    {/* Suffix IT Engineered Solution Box */}
                    <div className="mt-4 rounded-xl border border-[#dce8f5] bg-[#f8fbfe] p-3.5 sm:p-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0072bc]">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span>Suffix Solution:</span>
                        <span className="text-[#062b43] font-extrabold truncate">
                          {item.solutionTitle}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-[1.65] text-[#4d6375]">
                        {item.solutionText}
                      </p>
                    </div>

                    {/* Technology Tags */}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {item.techTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-[#e4def5] bg-[#fcfbfe] px-2 py-0.5 text-[10px] font-semibold text-[#5a4d79]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outcome Metric & Action Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-[#f0ecfc] pt-4">
                    <div>
                      <div className="font-mono text-base sm:text-lg font-black text-[#0072bc]">
                        {item.outcomeMetric}
                      </div>
                      <div className="text-[10px] font-medium text-[#73889b]">
                        {item.outcomeLabel}
                      </div>
                    </div>

                    <Link
                      href={item.targetServiceHref}
                      className="inline-flex items-center gap-1.5 bg-[#7c3aed] hover:bg-[#6827d4] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs transition-all duration-200 hover:scale-105"
                    >
                      <span>Explore</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            BOTTOM BAR: TIMELINE SCRUBBER, STATUS HINT & CTA
           ──────────────────────────────────────────────────────── */}
        <div className="w-full px-4 sm:px-8 lg:px-12 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#d8d0ee]/60 pt-3">
            {/* Scrubber Progress Bar */}
            <div className="flex items-center gap-3 w-full max-w-sm">
              <span className="font-mono text-xs font-bold text-[#5e5875]">
                {String(activeCardIndex + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
              </span>
              <div className="flex-1 h-1.5 bg-white/70 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#7c3aed] to-[#0072bc] transition-[width] duration-75 rounded-full"
                  style={{ width: `${Math.max(12, scrollProgress * 100)}%` }}
                />
              </div>
            </div>

            {/* Scroll Status Hint */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#5e5875]">
              {scrollProgress >= 0.98 ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300 animate-pulse">
                  <span>Completed</span>
                  <span>↓ Scroll down to continue</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[#7c3aed] bg-white/80 px-3 py-1 rounded-full border border-[#d8d0ee]">
                  <span className="animate-pulse">⇄</span>
                  <span>Scroll down to slide challenges</span>
                </span>
              )}

              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#062b43] border border-[#d8d0ee] shadow-xs hover:border-[#7c3aed] hover:text-[#7c3aed] transition-colors"
              >
                <span>Talk to architects</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
