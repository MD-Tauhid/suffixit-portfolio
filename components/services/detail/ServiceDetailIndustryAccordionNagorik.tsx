"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Building2 } from "lucide-react";

interface IndustryItem {
  num: string;
  title: string;
  tag: string;
  desc: string;
  image: string;
}

export default function ServiceDetailIndustryAccordionNagorik() {
  const industries: IndustryItem[] = [
    {
      num: "01",
      title: "Retail & Fashion Flagships",
      tag: "Omnichannel Sync",
      desc: "Editorial lookbooks, real-time store inventory sync, 1-click MFS checkouts, and seamless in-store returns.",
      image: "/assets/products/flagship-smart-pos.jpg",
    },
    {
      num: "02",
      title: "Quick-Commerce & Grocery Delivery",
      tag: "Sub-Second Ingestion",
      desc: "High-frequency reordering, hyper-local dark store routing, dynamic delivery slots, and automated rider dispatches.",
      image: "/assets/products/flagship-field-force.jpg",
    },
    {
      num: "03",
      title: "Health, Wellness & Pharma",
      tag: "Regulated Compliance",
      desc: "Prescription verification gates, temperature-sensitive inventory tracking, and secure doctor consultation portals.",
      image: "/assets/about/culture-placeholder.jpg",
    },
    {
      num: "04",
      title: "Electronics & B2B Wholesale",
      tag: "Tiered Pricing & Net-Terms",
      desc: "Multi-tier wholesale discount rules, credit line checks, automated quotation generators, and BEFTN invoice clearance.",
      image: "/assets/about/workspace-placeholder.jpg",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative !py-20 md:!py-28 bg-[#f8fbff] border-b border-sky-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Building2 size={12} className="text-[#0072bc]" />
            <span>Vertical Domain Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Industries We Scale Businesses In
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            Architected to respect sector-specific regulations, buyer psychological triggers, and supply-chain realities.
          </p>
        </div>

        {/* Horizontal Expanding Accordion Cards matching screenshot */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[460px]">
          {industries.map((ind, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={ind.num}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative overflow-hidden rounded-[26px] border border-slate-200 transition-all duration-500 cursor-pointer min-h-[300px] lg:min-h-0 ${
                  isActive
                    ? "lg:flex-[2.5] shadow-xl shadow-sky-950/15"
                    : "lg:flex-[1] opacity-90 hover:opacity-100"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={ind.image}
                  alt={ind.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-black text-amber-300">
                      {ind.num}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur-md">
                      {ind.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2">
                      {ind.title}
                    </h3>

                    {isActive && (
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md animate-fadeIn">
                        {ind.desc}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-300">
                      <span>Explore Domain Architecture</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
