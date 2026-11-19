"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export interface ProductNotchedCardProps {
  product: Product;
  surface?: string;
  className?: string;
  priority?: boolean;
}

const DISC = 48; // arrow disc diameter in px
const BLOCK = 64; // notch block in px
const FILLET = 20; // fillet curve radius in px

export function ProductNotchedCard({
  product,
  surface = "#ffffff",
  className,
  priority = false,
}: ProductNotchedCardProps) {
  // Tone palette accents
  const toneBadge = {
    blue: "bg-[#e8f3fc] text-[#0072bc] border-[#0072bc]/25",
    mint: "bg-[#def2eb] text-[#0f766e] border-[#0f766e]/25",
    lavender: "bg-[#ede8fa] text-[#6d28d9] border-[#6d28d9]/25",
    sky: "bg-[#def0fb] text-[#0284c7] border-[#0284c7]/25",
  }[product.tone] || "bg-[#e8f3fc] text-[#0072bc] border-[#0072bc]/25";

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col rounded-[26px] border border-[#0072bc]/15 bg-white p-4 shadow-[0_10px_30px_-10px_rgba(0,114,188,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0072bc]/40 hover:shadow-[0_20px_45px_-12px_rgba(0,114,188,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0072bc]",
        className
      )}
    >
      {/* 1. Cover Photo with Bottom-Right Concentric Filleted Notch */}
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          {/* Subtle image overlay for depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15"
          />

          {/* Top Pill Badge */}
          {product.badge && (
            <div className="pointer-events-none absolute inset-x-0 top-2.5 flex justify-center px-2">
              <span className="rounded-full border border-white/40 bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-xs backdrop-blur-md">
                {product.badge}
              </span>
            </div>
          )}
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
          className="absolute bottom-0 right-0 flex items-center justify-center rounded-full border border-[#0072bc]/25 bg-[#f0f7ff] text-[#0072bc] shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:border-transparent group-hover:bg-[#0072bc] group-hover:text-white group-hover:shadow-[0_6px_16px_rgba(0,114,188,0.35)]"
          style={{ width: DISC, height: DISC }}
        >
          <ArrowUpRight className="size-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      {/* 2. Card Content & Telemetry */}
      <div className="mt-3.5 flex flex-1 flex-col justify-between">
        <div>
          {/* Category & Version Row */}
          <div className="flex items-center justify-between gap-1.5">
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                toneBadge
              )}
            >
              {product.category}
            </span>
            {product.version && (
              <span className="text-[10px] font-medium text-[#17162a]/55">
                {product.version}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="mt-1.5 text-base sm:text-lg font-bold tracking-tight text-[#17162a] transition-colors duration-200 group-hover:text-[#0072bc]">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="mt-1 text-xs leading-relaxed text-[#17162a]/70 line-clamp-2">
            {product.summary}
          </p>
        </div>

        {/* Bottom Feature Tags & Highlight Metric */}
        <div className="mt-3 space-y-2 pt-2.5 border-t border-slate-100">
          {product.highlightMetric && (
            <div className="flex items-center justify-between rounded-xl bg-[#f5f9fe] border border-[#0072bc]/10 px-2.5 py-1 text-xs">
              <span className="flex items-center gap-1.5 text-[#17162a]/65 font-medium text-[11px]">
                <Sparkles size={11} className="text-[#0072bc]" />
                {product.highlightMetric.label}
              </span>
              <strong className="font-bold text-[#0072bc] text-xs">
                {product.highlightMetric.value}
              </strong>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <ul className="flex flex-wrap gap-1" aria-label="Key features">
              {product.features.slice(0, 2).map((feat, idx) => (
                <li
                  key={idx}
                  className="rounded-md bg-slate-100/80 px-1.5 py-0.5 text-[9px] font-medium text-slate-600 transition-colors group-hover:bg-[#f0f7ff] group-hover:text-[#0072bc] line-clamp-1"
                >
                  {feat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductNotchedCard;
