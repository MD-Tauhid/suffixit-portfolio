"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
} from "lucide-react";
import { productDetails, type Product } from "@/lib/products";
import ProductNotchedCard from "./ProductNotchedCard";
import { cn } from "@/lib/utils";

// 12 Products evenly distributed across 4 columns (3 products per column)
const col1Products = [
  productDetails[2], // 1. Rupantar ERP
  productDetails[5], // 5. Smart POS & Retail Billing
  productDetails[8], // 9. Bulk SMS & Web Meeting
];

const col2Products = [
  productDetails[0], // 2. Field Force Management (FFMS)
  productDetails[4], // 6. Suffix E-Commerce Suite
  productDetails[3], // 10. Provident Fund System
];

const col3Products = [
  productDetails[1], // 3. Rupantar HCM & Payroll
  productDetails[6], // 7. Hotel Booking System (PMS)
  productDetails[10], // 11. Rupantor Multi-Warehouse
];

const col4Products = [
  productDetails[7], // 4. Interconnect Telecom Billing
  productDetails[9], // 8. Automated Payroll System
  productDetails[11], // 12. Smart Transformer Monitoring
];

interface ProductNotchedWallProps {
  interval?: number; // seconds between auto-glide (default 2s)
  className?: string;
}

export default function ProductNotchedWall({
  interval = 2,
  className,
}: ProductNotchedWallProps) {
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardStepDistance, setCardStepDistance] = useState(440); // card height + 20px gap

  // Measure card height dynamically for pixel-perfect vertical translation
  useEffect(() => {
    if (!cardRef.current) return;
    const updateDistance = () => {
      if (cardRef.current) {
        // card offsetHeight + 20px gap (gap-5)
        setCardStepDistance(cardRef.current.offsetHeight + 20);
      }
    };
    updateDistance();
    const ro = new ResizeObserver(updateDistance);
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const totalCards = 3; // 3 unique products per column (3 rows = 12 products)

  // Advance by 1 row smoothly
  const nextStep = useCallback(() => {
    setIsTransitioning(true);
    setStep((prev) => prev + 1);
    setProgress(0);
  }, []);

  // Previous row manually
  const prevStep = useCallback(() => {
    setIsTransitioning(true);
    setStep((prev) => (prev > 0 ? prev - 1 : totalCards - 1));
    setProgress(0);
  }, [totalCards]);

  // When step reaches totalCards (3), reset seamlessly to 0 without animation jump
  useEffect(() => {
    if (step >= totalCards) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setStep(0);
      }, 760); // after the 750ms transition finishes
      return () => clearTimeout(resetTimer);
    }
  }, [step, totalCards]);

  // 2-Second Automatic Timer (DOES NOT PAUSE ON HOVER as requested)
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = interval * 1000;
    const tickMs = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += tickMs;
      const pct = Math.min(100, (elapsed / intervalMs) * 100);
      setProgress(pct);

      if (elapsed >= intervalMs) {
        elapsed = 0;
        nextStep();
      }
    }, tickMs);

    return () => clearInterval(timer);
  }, [isPlaying, interval, nextStep]);

  // Repeat products 3 times for seamless infinite vertical glide
  const col1List = [...col1Products, ...col1Products, ...col1Products];
  const col2List = [...col2Products, ...col2Products, ...col2Products];
  const col3List = [...col3Products, ...col3Products, ...col3Products];
  const col4List = [...col4Products, ...col4Products, ...col4Products];

  // Base translation offset for each column
  const translateY = step * cardStepDistance;

  return (
    <div
      className={cn("relative w-full select-none", className)}
      role="region"
      aria-label="Signature 4-Column 12-Product Wall"
    >
      {/* Ambient background glows tailored to Suffix IT brand palette */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-gradient-to-tr from-[#0072bc]/10 via-[#00c2ff]/8 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-20 size-[500px] rounded-full bg-[#0072bc]/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Main 4-Column Stage: Dynamic "uchu-nichu" stagger wave with ample 1060px height */}
      <div
        className="relative h-[960px] sm:h-[1020px] lg:h-[1060px] w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 1.5%, black 98.5%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 1.5%, black 98.5%, transparent 100%)",
        }}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Baseline high (+15px) */}
          <div
            className="flex flex-col gap-5"
            style={{
              transform: `translateY(${-translateY + 15}px)`,
              transition: isTransitioning
                ? "transform 750ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {col1List.map((product, idx) => (
              <div
                key={`c1-${product.slug}-${idx}`}
                ref={idx === 0 ? cardRef : undefined}
                className="w-full shrink-0"
              >
                <ProductNotchedCard product={product} priority={idx < 2} />
              </div>
            ))}
          </div>

          {/* Column 2: Staggered low (+135px for distinct uchu-nichu rhythm) */}
          <div
            className="hidden sm:flex flex-col gap-5"
            style={{
              transform: `translateY(${-translateY + 135}px)`,
              transition: isTransitioning
                ? "transform 750ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {col2List.map((product, idx) => (
              <div
                key={`c2-${product.slug}-${idx}`}
                className="w-full shrink-0"
              >
                <ProductNotchedCard product={product} priority={idx < 2} />
              </div>
            ))}
          </div>

          {/* Column 3: Elevated high (+30px) */}
          <div
            className="hidden lg:flex flex-col gap-5"
            style={{
              transform: `translateY(${-translateY + 30}px)`,
              transition: isTransitioning
                ? "transform 750ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {col3List.map((product, idx) => (
              <div
                key={`c3-${product.slug}-${idx}`}
                className="w-full shrink-0"
              >
                <ProductNotchedCard product={product} priority={idx < 2} />
              </div>
            ))}
          </div>

          {/* Column 4: Staggered low (+150px) */}
          <div
            className="hidden lg:flex flex-col gap-5"
            style={{
              transform: `translateY(${-translateY + 150}px)`,
              transition: isTransitioning
                ? "transform 750ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {col4List.map((product, idx) => (
              <div
                key={`c4-${product.slug}-${idx}`}
                className="w-full shrink-0"
              >
                <ProductNotchedCard product={product} priority={idx < 2} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating HUD Controls Bar: Live 2s Status, Row Counter & Manual Controls */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-2">
        {/* Status Indicator & 2-second Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[#0072bc]/20 bg-white/95 px-3.5 py-1.5 shadow-xs backdrop-blur-md">
            <span className="relative flex size-2.5">
              {!isPlaying ? (
                <span className="size-2.5 rounded-full bg-slate-400" />
              ) : (
                <>
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0072bc] opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#0072bc]" />
                </>
              )}
            </span>
            <span className="text-xs font-semibold text-[#17162a]">
              {isPlaying ? "2s Continuous Auto-Cycle" : "Cycle Paused"}
            </span>
            <span className="text-xs text-[#17162a]/40">•</span>
            <span className="text-xs text-[#17162a]/65">
              4 Staggered Columns • 2 Rows Visible (8 Platforms)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 sm:block">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-75",
                !isPlaying ? "bg-slate-300" : "bg-[#0072bc]"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Manual Interactive Stepping Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevStep}
            aria-label="Previous row"
            className="flex size-8 items-center justify-center rounded-full border border-[#0072bc]/20 bg-white text-[#17162a] shadow-xs transition-all hover:border-[#0072bc] hover:bg-[#f0f7ff] hover:text-[#0072bc]"
          >
            <ChevronUp size={15} />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "Freeze cycle" : "Resume 2s cycle"}
            className="flex h-8 items-center gap-1.5 rounded-full border border-[#0072bc]/20 bg-white px-3 text-xs font-semibold text-[#17162a] shadow-xs transition-all hover:border-[#0072bc] hover:bg-[#f0f7ff] hover:text-[#0072bc]"
          >
            {!isPlaying ? (
              <>
                <Play size={12} className="text-[#0072bc]" />
                <span>Resume (2s)</span>
              </>
            ) : (
              <>
                <Pause size={12} className="text-[#0072bc]" />
                <span>Freeze Rows</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={nextStep}
            aria-label="Next row"
            className="flex size-8 items-center justify-center rounded-full border border-[#0072bc]/20 bg-white text-[#17162a] shadow-xs transition-all hover:border-[#0072bc] hover:bg-[#f0f7ff] hover:text-[#0072bc]"
          >
            <ChevronDown size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
