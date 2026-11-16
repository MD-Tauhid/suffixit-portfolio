import React from "react";
import Link from "next/link";
import {
  Zap,
  CreditCard,
  Gauge,
  Boxes,
  Palette,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import type { Service } from "@/lib/services";

export default function ServiceDetailWhyChooseNagorik({
  service,
}: {
  service: Service;
}) {
  const cards = [
    {
      icon: Gauge,
      color: "text-[#0072bc] bg-sky-50 border-sky-200/80",
      title: "Sub-Second Performance & 95+ Core Web Vitals",
      desc: "Optimized server-side rendering, instant edge caching, and zero layout shift ensure customers never abandon slow loading product grids.",
    },
    {
      icon: CreditCard,
      color: "text-purple-600 bg-purple-50 border-purple-200/80",
      title: "Multi-MFS & Instant Gateway Cascades",
      desc: "Seamlessly route transactions across bKash, Nagad, Visa, Mastercard, and international gateways with automatic payment failover.",
    },
    {
      icon: Zap,
      color: "text-amber-600 bg-amber-50 border-amber-200/80",
      title: "Flash Sale Concurrency & Auto-Scaling",
      desc: "Architected to absorb tens of thousands of simultaneous shoppers during seasonal campaigns and discount drops without latency spikes.",
    },
    {
      icon: Boxes,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200/80",
      title: "Real-Time POS & Warehouse ERP Sync",
      desc: "Single-source-of-truth stock synchronization connecting brick-and-mortar store registers, central hubs, and online carts.",
    },
    {
      icon: Palette,
      color: "text-rose-600 bg-rose-50 border-rose-200/80",
      title: "Conversion-Driven UI/UX Design Systems",
      desc: "Frictionless 1-click checkout funnels, dynamic micro-animations, and sticky mobile purchase journeys engineered to maximize conversion rates.",
    },
    {
      icon: ShieldCheck,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200/80",
      title: "Bank-Grade PCI-DSS & Data Encryption",
      desc: "End-to-end tokenization, encrypted customer transactions, automated fraud alerts, and continuous vulnerability patch cycles.",
    },
  ];

  return (
    <section className="relative overflow-hidden !py-24 md:!py-32 bg-gradient-to-b from-[#f0f7ff] via-white to-[#f8fbff] text-slate-900 border-b border-sky-100">
      {/* Background ambient accents */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[600px] rounded-full bg-gradient-to-br from-[#0072bc]/15 via-sky-200/20 to-transparent blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-blue-100/30 blur-[100px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>Enterprise Scale &amp; Performance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Why Leading Brands Choose Suffix IT
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
            Eliminating technical roadblocks to deliver scalable digital flagships that convert traffic into loyal, repeating buyers.
          </p>
        </div>

        {/* 6 Cards Grid in Theme Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="rounded-[24px] border border-slate-200/90 bg-white p-7 shadow-sm hover:shadow-xl hover:shadow-sky-100/60 hover:border-[#0072bc]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`flex size-11 items-center justify-center rounded-2xl border ${c.color} mb-5 transition-transform group-hover:scale-105`}>
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-bold text-[#0f172a] tracking-tight">
                    {c.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-[13.5px] text-[#475569] leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0072bc]">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Production Tested</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Button */}
        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0072bc] hover:bg-[#005a96] text-white px-8 py-4 text-sm font-bold shadow-md shadow-[#0072bc]/25 transition-all cursor-pointer"
          >
            <span>Discuss Your E-Commerce Roadmap</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
