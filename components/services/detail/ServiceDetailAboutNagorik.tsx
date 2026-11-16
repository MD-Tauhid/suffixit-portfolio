"use client";

import React from "react";
import Image from "next/image";
import { TrendingUp, ShoppingBag, Zap, CheckCircle2 } from "lucide-react";
import type { Service } from "@/lib/services";
import type { ServiceMediaConfig } from "../serviceDataMap";

export default function ServiceDetailAboutNagorik({
  service,
  mediaConfig,
}: {
  service: Service;
  mediaConfig: ServiceMediaConfig;
}) {
  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="relative mb-14 flex items-end justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              What is {service.name}?
            </h2>
            <p className="mt-3 text-base text-[#475569] leading-relaxed">
              Transforming conventional online stores into high-conversion digital flagships engineered for speed, reliability, and enterprise scale.
            </p>
          </div>

          {/* Watermark Icon */}
          <div className="hidden lg:block opacity-10 text-slate-800 pointer-events-none -mr-4">
            <ShoppingBag size={110} />
          </div>
        </div>

        {/* Split 2-Column: Left Photo, Right Soft Yellow Accent Card */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: Studio/Engineering Stage Photo */}
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[26px] border border-slate-200/90 bg-sky-50 shadow-xl">
            <Image
              src={mediaConfig.spotlightImage || "/assets/services/service-ecommerce-conversion-architecture.jpg"}
              alt={`${service.name} engineering stage`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            {/* Bottom-left pill badge */}
            <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-slate-800 shadow-md backdrop-blur-md border border-white/40 flex items-center gap-2">
              <Zap size={14} className="text-[#0072bc]" />
              <span>Headless Architecture &amp; PWA Ready</span>
            </div>
          </div>

          {/* Right: Soft Yellow Pastel Card matching screenshot */}
          <div className="rounded-[26px] border border-[#fef08a] bg-[#fef9c3] p-8 sm:p-12 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/30 px-3 py-1 text-xs font-bold text-amber-900 mb-4">
                <span>Tailored Architecture</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight leading-snug">
                Engineered for High-Concurrency Sales, Instant Checkouts, and Infinite Extensibility.
              </h3>

              <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                Whether you need a bespoke Next.js storefront, a scalable Shopify Plus replatforming, or deep multi-warehouse ERP synchronization, Suffix IT constructs resilient e-commerce systems that maintain peak speed even during million-visitor campaign drops.
              </p>
            </div>

            <div className="mt-8 space-y-3 pt-6 border-t border-amber-200/60">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                <span>Sub-second page transitions &amp; Google Core Web Vitals optimization</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                <span>Multi-gateway payment routing with failover (bKash, Nagad, Cards)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                <span>Real-time inventory synchronization across physical stores and warehouses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
