"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import type { Service } from "@/lib/services";
import type { ServiceMediaConfig } from "../serviceDataMap";

export default function ServiceDetailHeroNagorik({
  service,
  mediaConfig,
}: {
  service: Service;
  mediaConfig: ServiceMediaConfig;
}) {
  return (
    <section className="relative overflow-hidden !pt-20 !pb-16 md:!pt-28 md:!pb-20 bg-gradient-to-b from-[#f0f7ff] via-white to-slate-50/50 border-b border-sky-100">
      {/* Ambient background light */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[550px] rounded-full bg-gradient-to-br from-sky-200/40 via-blue-100/30 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Left Column */}
          <div>
            {/* Green Pastel Pill Tag matching screenshot */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-[#dcfce7] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#166534]">
              <span>{mediaConfig.categoryTag || "Specialized Practice"}</span>
            </div>

            {/* Monolithic Title */}
            <h1 className="!m-0 text-[clamp(34px,4.4vw,62px)] font-black leading-[1.08] tracking-[-0.03em] text-[#0f172a]">
              {service.headline[0]}
              <br />
              <span className="text-[#0072bc]">
                {service.headline[1]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 mb-8 max-w-[530px] text-base sm:text-[17px] leading-relaxed text-[#334155]">
              {service.summary}
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0072bc] hover:bg-[#005a96] text-white px-7 py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-[#0072bc]/25 transition-all cursor-pointer"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight size={15} />
              </Link>

              <a
                href="#talent-matrix"
                className="inline-flex items-center gap-2 rounded-full bg-[#facc15] hover:bg-[#eab308] text-[#0f172a] px-7 py-3.5 text-xs sm:text-sm font-extrabold shadow-sm transition-all cursor-pointer"
              >
                <span>Explore Tech Stack</span>
                <Sparkles size={14} className="text-[#0f172a]" />
              </a>
            </div>

            {/* Key trust indicators */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-500 pt-6 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Senior Full-Stack Engineers</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Enterprise SLA Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Zero-Lockin IP Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Multi-Photo Collage with Badges */}
          <div className="relative">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[26px] border border-slate-200/90 bg-white p-2 shadow-2xl shadow-sky-900/10">
              <div className="relative size-full overflow-hidden rounded-[20px] bg-sky-50">
                <Image
                  src={mediaConfig.heroImage}
                  alt={service.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
              </div>

              {/* Floating Purple Metric Badge matching screenshot */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-4 text-white shadow-xl">
                <div className="text-xl sm:text-2xl font-black">99.98%</div>
                <div className="text-[11px] font-semibold text-purple-200">
                  Uptime &amp; Gateway SLA
                </div>
              </div>

              {/* Floating Top Right White Badge */}
              <div className="absolute -top-3 -right-3 rounded-xl bg-white px-4 py-2 shadow-lg border border-slate-200/80 flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">High-Concurrency Scale</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
