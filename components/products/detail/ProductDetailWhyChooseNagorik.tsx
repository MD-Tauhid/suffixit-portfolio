import React from "react";
import {
  Calculator,
  FileCheck2,
  Building2,
  Lock,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailWhyChooseNagorik({
  product,
}: {
  product: Product;
}) {
  const cards = [
    {
      icon: Calculator,
      color: "text-[#0072bc] bg-sky-50 border-sky-200/80",
      title: "Zero-Error Formula Engine",
      desc: "Handles complex gross-to-net math, tiered attendance deductions, and custom bonuses with 100% mathematical precision.",
    },
    {
      icon: FileCheck2,
      color: "text-purple-600 bg-purple-50 border-purple-200/80",
      title: "Automated NBR Tax Compliance",
      desc: "Up-to-date with latest fiscal tax slabs, investment tax credits, and automated generation of withholding Form 108A.",
    },
    {
      icon: Building2,
      color: "text-amber-600 bg-amber-50 border-amber-200/80",
      title: "1-Click Multi-Bank BEFTN / NPSB",
      desc: "Direct electronic bank advice formats compatible with all 60+ scheduled commercial banks in Bangladesh.",
    },
    {
      icon: Lock,
      color: "text-blue-600 bg-blue-50 border-blue-200/80",
      title: "Bank-Grade AES-256 Data Security",
      desc: "All employee compensation, personal tax files, and bank accounts are encrypted with AES-256 at rest and TLS 1.3 in transit.",
    },
    {
      icon: Cpu,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200/80",
      title: "Real-Time ZKTeco Biometric Sync",
      desc: "Automated TCP/IP telemetry polling across dozens of branch timeclocks, eliminating attendance proxy fraud.",
    },
    {
      icon: Layers,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200/80",
      title: "Direct General Ledger ERP Sync",
      desc: "Auto-creates double-entry accounting journals in Rupantar ERP or your accounting suite with zero manual re-entry.",
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
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>Results-Focused &amp; Growth-Driven Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Why Choose Suffix {product.name}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
            Engineered to remove friction between human resources, finance controllers, and external tax auditors.
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
                  <span>Enterprise Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
