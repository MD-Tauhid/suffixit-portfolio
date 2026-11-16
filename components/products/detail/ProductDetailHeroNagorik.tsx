"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/products";
import type { ProductMediaConfig } from "../productDataMap";

export default function ProductDetailHeroNagorik({
  product,
  mediaConfig,
}: {
  product: Product;
  mediaConfig: ProductMediaConfig;
}) {
  return (
    <section className="relative overflow-hidden !pt-20 !pb-16 md:!pt-28 md:!pb-20 bg-gradient-to-b from-[#f0f7ff] via-white to-slate-50/50 border-b border-sky-100">
      {/* Subtle ambient light */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[500px] rounded-full bg-gradient-to-br from-sky-200/40 via-blue-100/30 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Left Column */}
          <div>
            {/* Green Pastel Pill Tag */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-[#dcfce7] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#166534]">
              <span>{product.category || "Enterprise Software Platform"}</span>
            </div>

            {/* Monolithic Title */}
            <h1 className="!m-0 text-[clamp(34px,4.4vw,62px)] font-black leading-[1.08] tracking-[-0.03em] text-[#0f172a]">
              {product.name}
              <br />
              <span className="text-[#0072bc]">
                for Enterprise Workforce.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 mb-8 max-w-[530px] text-base sm:text-[17px] leading-relaxed text-[#334155]">
              {product.summary}
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0072bc] hover:bg-[#005a96] text-white px-7 py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-[#0072bc]/25 transition-all cursor-pointer"
              >
                <span>Request Platform Demo</span>
                <ArrowUpRight size={15} />
              </Link>

              <a
                href="#consultation-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#facc15] hover:bg-[#eab308] text-[#0f172a] px-7 py-3.5 text-xs sm:text-sm font-extrabold shadow-sm transition-all cursor-pointer"
              >
                <span>Schedule Walkthrough</span>
                <Sparkles size={14} className="text-[#0f172a]" />
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Photo Frame with Badges */}
          <div className="relative">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[24px] border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-200/50">
              <div className="relative size-full overflow-hidden rounded-[18px]">
                <Image
                  src={mediaConfig.heroImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Top Right Floating Badge */}
                <div className="absolute top-3.5 right-3.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 px-3.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{mediaConfig.releaseBadge}</span>
                </div>

                {/* Bottom Left Floating Badge */}
                <div className="absolute bottom-3.5 left-3.5 rounded-xl bg-[#0f172a]/90 backdrop-blur-md border border-white/20 px-4 py-2 text-white shadow-lg">
                  <div className="text-[10px] font-semibold text-sky-300">Enterprise Verified</div>
                  <div className="text-xs font-bold text-white">ZKTeco &amp; BEFTN Sync</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
