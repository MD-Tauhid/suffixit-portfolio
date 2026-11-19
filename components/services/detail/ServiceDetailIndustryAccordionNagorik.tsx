"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Zap,
  HeartPulse,
  Cpu,
  Hotel,
  Building2,
  CreditCard,
  Rocket,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

interface IndustryItem {
  icon: typeof ShoppingBag;
  title: string;
  desc: string;
  tags: string[];
  gradientFrom: string;
  gradientTo: string;
  href: string;
}

export default function ServiceDetailIndustryAccordionNagorik() {
  const industries: IndustryItem[] = [
    {
      icon: ShoppingBag,
      title: "Retail & Fashion Flagships",
      desc: "Editorial lookbooks, real-time store inventory sync, 1-click MFS checkouts, and seamless in-store returns.",
      tags: ["Omnichannel", "POS Sync"],
      gradientFrom: "#0284c7",
      gradientTo: "#0072bc",
      href: "/contact",
    },
    {
      icon: Zap,
      title: "Quick-Commerce & Grocery",
      desc: "High-frequency reordering, hyper-local dark store routing, dynamic delivery slots, and automated rider dispatches.",
      tags: ["Dark Stores", "Sub-Second Cart"],
      gradientFrom: "#10b981",
      gradientTo: "#059669",
      href: "/contact",
    },
    {
      icon: HeartPulse,
      title: "Health, Wellness & Pharma",
      desc: "Prescription verification gates, temperature-sensitive inventory tracking, and secure doctor consultation portals.",
      tags: ["Regulated", "Prescription Gate"],
      gradientFrom: "#8b5cf6",
      gradientTo: "#6366f1",
      href: "/contact",
    },
    {
      icon: Cpu,
      title: "Electronics & B2B Wholesale",
      desc: "Multi-tier wholesale discount rules, credit line checks, automated quotation generators, and BEFTN invoice clearance.",
      tags: ["Tiered Pricing", "Net-Terms"],
      gradientFrom: "#f59e0b",
      gradientTo: "#ea580c",
      href: "/contact",
    },
    {
      icon: Hotel,
      title: "Hospitality & Booking",
      desc: "Dynamic calendar room reservation engines, front-desk POS synchronization, and multi-currency guest checkouts.",
      tags: ["Room Inventory", "Instant Booking"],
      gradientFrom: "#ec4899",
      gradientTo: "#8b5cf6",
      href: "/contact",
    },
    {
      icon: Building2,
      title: "Enterprise Multi-Branch",
      desc: "Centrally synchronized branch billing, automated stock replenishment alerts, and multi-tier procurement authorizations.",
      tags: ["Rupantar ERP", "Warehouse API"],
      gradientFrom: "#06b6d4",
      gradientTo: "#0284c7",
      href: "/contact",
    },
    {
      icon: CreditCard,
      title: "FinTech & Payment Scale",
      desc: "High-throughput micro-transaction routing, carrier-grade bill settlements, and automated multi-bank reconciliations.",
      tags: ["bKash / Nagad", "BEFTN Auto"],
      gradientFrom: "#3b82f6",
      gradientTo: "#4f46e5",
      href: "/contact",
    },
    {
      icon: Rocket,
      title: "Direct-to-Consumer (D2C)",
      desc: "Headless Next.js storefronts, personalized recommendation carousels, automated abandoned cart recovery, and SMS OTP.",
      tags: ["Sub-Second PWA", "Loyalty Points"],
      gradientFrom: "#f97316",
      gradientTo: "#e11d48",
      href: "/contact",
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-28 relative bg-[#f8fbfe] overflow-hidden scroll-mt-20 border-b border-sky-100">
      {/* Ambient soft background glow matching home page */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#0072bc]/5 to-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header matching requested copy */}
        <div className="mb-14 md:mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3.5 shadow-xs">
            <Building2 size={13} className="text-[#0072bc]" />
            <span>Vertical Domain Expertise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Industries We Scale Businesses In
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto">
            Architected to respect sector-specific regulations, buyer psychological triggers, and supply-chain realities.
          </p>
        </div>

        {/* ========================================================
            SKEWED GRADIENT GLASS CARD SHOWCASE GRID (HOME PAGE STYLE)
            Features:
            - 15-degree skewed vibrant gradient backdrops
            - Soft 28px glowing colorful aura
            - Floating glossy glass blob animation on hover
            - Backdrop-blur white frosted card with soft border lighting
            - Tailored gradient palettes for each industry
           ======================================================== */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 md:py-8"
          style={{
            rowGap: "clamp(48px, 5.5vw, 68px)",
            columnGap: "clamp(24px, 2.5vw, 36px)",
          }}
        >
          {industries.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="group relative w-full min-h-[415px] transition-all duration-500"
              >
                {/* Skewed gradient panel 1 (Sharp Base) */}
                <span
                  className="absolute top-0 left-[35px] w-1/2 h-full rounded-2xl transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] pointer-events-none"
                  style={{
                    background: `linear-gradient(315deg, ${item.gradientFrom}, ${item.gradientTo})`,
                  }}
                />

                {/* Skewed gradient panel 2 (Glowing Atmosphere Blur) */}
                <span
                  className="absolute top-0 left-[35px] w-1/2 h-full rounded-2xl transform skew-x-[15deg] blur-[28px] opacity-40 transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] group-hover:opacity-70 pointer-events-none"
                  style={{
                    background: `linear-gradient(315deg, ${item.gradientFrom}, ${item.gradientTo})`,
                  }}
                />

                {/* Animated Floating Glossy Glass Blobs on Hover */}
                <span className="pointer-events-none absolute inset-0 z-10">
                  <span className="absolute top-0 left-0 w-0 h-0 rounded-2xl opacity-0 bg-white/85 backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-white transition-all duration-300 animate-blob group-hover:top-[-26px] group-hover:left-[18px] group-hover:w-[65px] group-hover:h-[65px] group-hover:opacity-100" />
                  <span className="absolute bottom-0 right-0 w-0 h-0 rounded-2xl opacity-0 bg-white/85 backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-white transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-26px] group-hover:right-[18px] group-hover:w-[65px] group-hover:h-[65px] group-hover:opacity-100" />
                </span>

                {/* Frosted Glass Content Card (Light Luxury) */}
                <div className="relative z-20 h-full p-6 sm:p-7 bg-white/90 backdrop-blur-[16px] border border-white/80 rounded-2xl text-[#17162a] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-500 group-hover:translate-x-[-10px] group-hover:-translate-y-2 group-hover:border-white group-hover:bg-white/95 group-hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.12)]">
                  <div>
                    {/* Top: Icon + Tags */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                        }}
                      >
                        <IconComponent size={22} />
                      </div>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f0f6fd] text-[#0072bc] border border-[#d2e4f7]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#17162a] mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-[#515978] text-sm leading-relaxed mb-6 font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Action CTA */}
                  <div className="pt-4 border-t border-[#f0f4f9] flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#0072bc] bg-[#f0f6fd] hover:bg-[#0072bc] hover:text-white px-4 py-2 rounded-xl border border-[#d2e4f7] transition-all duration-300 shadow-sm group-hover:shadow-md cursor-pointer"
                    >
                      <span>Explore Solutions</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                    <span className="text-[11px] text-[#838fa6] font-semibold">Enterprise ready</span>
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
