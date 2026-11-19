"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform, useSpring, motion, MotionValue } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { serviceContainer } from "./service-styles";
import AntigravityPillField from "./AntigravityPillField";
import { coreServicesList, ServiceItem } from "./servicesData";

interface CorePracticeCardProps {
  i: number;
  totalCards: number;
  service: ServiceItem;
  progress: MotionValue<number>;
  targetScale: number;
  isLast?: boolean;
}

/**
 * High-performance 3D side-sliding stacked card
 * Enters horizontally from alternating sides as user scrolls,
 * docking with tactile precision onto the stack, 100% jitter-free.
 */
function CorePracticeStackCard({
  i,
  totalCards,
  service,
  progress,
  targetScale,
  isLast = false,
}: CorePracticeCardProps) {
  // ─── SILKY SMOOTH SIDE SLIDE MOTION (Zero jitter, decoupled from sticky) ───
  // Derive entrance progress directly from the parent's non-sticky scroll container
  const segment = 1 / (totalCards - 1); // ~0.25 per transition
  const startProgress = Math.max(0, (i - 1) * segment);
  const endProgress = Math.min(1, startProgress + segment * 0.88);

  const isOdd = i % 2 === 1;
  // Use numeric pixel translation: smooth, zero unit parsing, zero layout thrashing
  const initialX = i === 0 ? 0 : isOdd ? 200 : -200;

  // Raw scroll transform: Card 0 stays anchored; Cards 1..4 slide in smoothly and lock at 0
  const rawX = useTransform(
    progress,
    i === 0 ? [0, 1] : [startProgress, endProgress],
    [initialX, 0]
  );

  // useSpring filters out mouse-wheel stepped increments, ensuring 100% butter-smooth 60/120fps glide
  const smoothX = useSpring(rawX, {
    stiffness: 280,
    damping: 30,
    mass: 0.2,
  });

  // Subtle image zoom effect during arrival
  const imageScale = useTransform(
    progress,
    i === 0 ? [0, 0.25] : [startProgress, endProgress],
    [1.12, 1]
  );

  // Card scaling as subsequent cards stack on top of it
  const scale = useTransform(
    progress,
    [Math.max(0, (i - 0.5) * segment), 1],
    [1, targetScale]
  );

  const activeColor = service.color || "#e8f3fc";
  const activeAccent = service.accentColor || "#0072bc";

  return (
    <div
      className={`w-full overflow-hidden flex items-start justify-center sticky ${isLast ? "min-h-0 h-auto pb-8 md:pb-14" : "min-h-[105vh] md:min-h-screen"
        }`}
      style={{
        // Keep cards comfortably below the 80px navbar with responsive clearance
        top: `calc(clamp(88px, 11vh, 102px) + ${i * 14}px)`,
        zIndex: i + 10,
      }}
    >
      <motion.div
        style={{
          backgroundColor: activeColor,
          scale,
          x: smoothX,
          willChange: "transform",
        }}
        className="flex flex-col relative w-[92%] max-w-[1220px] 2xl:max-w-[1260px] h-auto min-h-[560px] lg:min-h-[580px] rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 origin-top border border-white shadow-[0_20px_50px_-15px_rgba(0,60,140,0.13),0_4px_16px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        {/* Top brand gradient accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[4px]"
          style={{
            background: `linear-gradient(90deg, ${activeAccent}, #3cb4f0, #5b8def)`,
          }}
        />

        {/* Ambient lighting inside card */}
        <div
          className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: activeAccent }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: activeAccent }}
        />

        {/* Card Header Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-b border-black/10 pb-2.5 sm:pb-3 mb-3 sm:mb-3.5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span
              className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-xs"
              style={{
                color: activeAccent,
                backgroundColor: "#ffffff",
                border: `1px solid ${activeAccent}35`,
              }}
            >
              PRACTICE #{service.index}
            </span>
            <span className="text-xs md:text-sm font-semibold text-[#515978]">
              {service.categoryLabel}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-[#17162a]">
            {service.name}
          </h2>
        </div>

        {/* 2-Column Split: Content Left, Seamless Image Right */}
        <div className="relative z-10 flex flex-col md:flex-row gap-5 md:gap-7 lg:gap-8 items-stretch flex-1">
          {/* Left Column: Details & Capabilities */}
          <div className="w-full md:w-[48%] flex flex-col justify-between gap-3 py-0.5">
            <div>
              <p className="text-[#515978] text-xs sm:text-sm leading-relaxed mb-2.5 sm:mb-3 font-normal">
                {service.summary}
              </p>

              {/* 4 Architecture Pillars with Checkmarks */}
              {service.items && service.items.length > 0 && (
                <ul className="space-y-1.5 mb-2.5 sm:mb-3">
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#17162a] bg-white p-2 rounded-xl border border-white shadow-[0_2px_8px_rgba(0,40,90,0.05)] transition-all duration-200 hover:translate-x-1"
                    >
                      <span
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 mt-0.5 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] flex-shrink-0 font-bold shadow-xs"
                        style={{
                          color: activeAccent,
                          backgroundColor: `${activeAccent}18`,
                          border: `1px solid ${activeAccent}30`,
                        }}
                      >
                        ✓
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[#17162a] text-xs sm:text-sm leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[11px] sm:text-xs text-[#6a6980] font-normal leading-tight mt-0.5 line-clamp-1 sm:line-clamp-2">
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Deliverable Output Bar */}
              {service.deliverable && (
                <div className="py-1.5 px-3 rounded-xl bg-white border border-black/5 flex items-center gap-2 text-xs text-[#515978] shadow-2xs">
                  <span
                    className="font-bold uppercase tracking-wider text-[10px]"
                    style={{ color: activeAccent }}
                  >
                    Output:
                  </span>
                  <span className="font-medium text-[#17162a] truncate">
                    {service.deliverable}
                  </span>
                </div>
              )}
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white px-4 sm:px-5 py-2.5 rounded-xl shadow-md transition-all group hover:scale-[1.02] cursor-pointer"
                style={{ backgroundColor: activeAccent }}
              >
                <span>Explore Architecture</span>
                <ArrowUpRight
                  size={14}
                  className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#17162a] bg-white hover:bg-slate-50 border border-black/10 px-3.5 sm:px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Request Technical Scoping</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Right Column: Seamless Blending Studio Image */}
          <div
            className="relative w-full md:w-[52%] min-h-[220px] sm:min-h-[260px] md:min-h-[360px] rounded-2xl md:rounded-3xl overflow-hidden self-stretch"
            style={{ backgroundColor: activeColor }}
          >
            {/* 1. Zooming Image Layer */}
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            {/* 2. Fixed Stationary Seamless Border & Inset Shadow (Matches image background 100%) */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl z-20"
              style={{
                border: `3px solid ${activeColor}`,
                boxShadow: `inset 0 0 35px 20px ${activeColor}`,
              }}
            />

            {/* 3. Floating HUD Glass Badges over Image */}
            <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
              <span className="font-mono text-xs font-black text-white bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/25 shadow-md">
                <span style={{ color: "#38bdf8" }}>#{service.index}</span>
                <span className="text-white/40"> / </span>
                <span>05</span>
              </span>
              <span className="text-[11px] font-bold text-slate-800 bg-white px-3 py-1 rounded-full border border-black/10 shadow-xs hidden sm:inline-block">
                {service.badge}
              </span>
            </div>

            <div className="absolute bottom-3.5 right-3.5 z-20">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-black text-emerald-800 bg-white px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-md">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{service.metric.value}</span>
                <span className="text-[10px] text-slate-500 font-sans font-semibold">
                  · {service.metric.label}
                </span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Main Services Showcase Section:
 * 1. 5 Core Flagship Practices Stacking Deck (cards glide in horizontally from alternating sides)
 * 2. Interactive Physics Antigravity Pill Field Sandbox
 */
export default function ServicesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const count = coreServicesList.length;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────────────
          1. 5 CORE FLAGSHIP PRACTICES: HORIZONTAL SIDE-SLIDING STACKING DECK
         ───────────────────────────────────────────────────────────────────────────── */}
      <section
        id="core-practices"
        className="relative w-full py-12 md:py-16 bg-[#f8fbfe] border-b border-[#e2edf6] overflow-x-clip"
      >
        <div className={serviceContainer}>
          {/* Top Bar: Section Title & Mission-Critical Eyebrow */}
          <div className="mb-8 lg:mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-[#e2edf6] pb-5">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="size-2 bg-[#0072bc] animate-pulse rounded-full" />
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0072bc]">
                  PRACTICE AREAS &amp; CAPABILITIES
                </span>
                <span className="text-slate-300">/</span>
                <span className="font-mono text-xs font-black text-[#062033]">
                  05 Flagship Practices
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#062033] tracking-[-0.03em] leading-tight">
                Different expertise.{" "}
                <em className="font-normal italic text-[#0072bc] [font-family:var(--font-serif),Georgia,serif]">
                  One connected approach.
                </em>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#specialized-practices"
                className="hidden md:inline-flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-[#0072bc] border border-sky-200/90 px-3.5 py-1.5 font-bold text-xs rounded-full transition-colors"
              >
                <span>Specialized Disciplines (06-14)</span>
                <ChevronDown size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* 5-Card Stacking Deck Container */}
        <div ref={containerRef} className="relative w-full">
          {coreServicesList.map((service, i) => {
            const targetScale = 1 - (count - 1 - i) * 0.025;
            return (
              <CorePracticeStackCard
                key={service.id}
                i={i}
                totalCards={count}
                isLast={i === count - 1}
                service={service}
                progress={scrollYProgress}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          2. INTERACTIVE ANTIGRAVITY PHYSICS PILL FIELD SANDBOX SECTION
         ───────────────────────────────────────────────────────────────────────────── */}
      <section
        id="pill-field"
        className="relative bg-[#f8fbfe] border-b border-[#e2edf6] py-10 md:py-14"
      >
        <div className={serviceContainer}>
          <AntigravityPillField />
        </div>
      </section>
    </>
  );
}
