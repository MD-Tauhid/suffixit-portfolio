import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailPortfolioNagorik({
  product,
}: {
  product: Product;
}) {
  const cards = [
    {
      bg: "bg-[#e0f2fe] border-[#bae6fd]",
      accent: "text-sky-900",
      pill: "bg-white text-sky-800",
      title: "PredictaPay – Multi-Shift RMG & Manufacturing",
      desc: "Automated biometric shift reconciliations, overtime calculations, and NBR tax withholdings for 5,000+ factory workers across 6 staggered shifts.",
      stat1: { val: "5,000+", label: "Workers Synced" },
      stat2: { val: "-42%", label: "Cycle Time Drop" },
      image: "/assets/products/flagship-field-force.jpg",
    },
    {
      bg: "bg-[#ede9fe] border-[#ddd6fe]",
      accent: "text-purple-900",
      pill: "bg-white text-purple-800",
      title: "BankDisburse – Commercial Bank & Telco Scale",
      desc: "High-throughput BEFTN and NPSB clearing engine generating 1-click encrypted salary advice files for distributed corporate branches.",
      stat1: { val: "10,000+", label: "Active Profiles" },
      stat2: { val: "Sub-Minute", label: "GL Posting" },
      image: "/assets/products/flagship-erp.jpg",
    },
    {
      bg: "bg-[#ffe4e6] border-[#fecdd3]",
      accent: "text-rose-900",
      pill: "bg-white text-rose-800",
      title: "CarePayroll – Multi-Specialty Hospital Network",
      desc: "Complex on-call consultant fees, multi-tier doctor allowances, and night-shift premiums reconciled with zero mathematical discrepancies.",
      stat1: { val: "1,200+", label: "Medical Staff" },
      stat2: { val: "99.99%", label: "Ledger Precision" },
      image: "/assets/products/flagship-hcm.jpg",
    },
    {
      bg: "bg-[#fef9c3] border-[#fef08a]",
      accent: "text-amber-950",
      pill: "bg-white text-amber-900",
      title: "RetailLedger – National Retail Chain Suite",
      desc: "Synchronizes 120+ retail store outlet cashiers with central corporate accounts, automating provident fund ledgers and annual tax deduction certificates.",
      stat1: { val: "120+", label: "Outlets Connected" },
      stat2: { val: "100%", label: "NBR Form 108A" },
      image: "/assets/products/flagship-smart-pos.jpg",
    },
  ];

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Our {product.name} Portfolio
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569]">
            Real-world enterprise rollouts demonstrating speed, scale, and compliance.
          </p>
        </div>

        {/* 4 Stacked Pastel Cards */}
        <div className="space-y-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`rounded-[26px] border ${c.bg} p-6 sm:p-10 shadow-sm transition-all hover:shadow-md`}
            >
              <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                {/* Left Narrative */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-xs ${c.pill}`}>
                      Enterprise Case Study
                    </span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${c.accent}`}>
                    {c.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl">
                    {c.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-8 pt-5 border-t border-black/10">
                    <div>
                      <div className={`text-xl sm:text-2xl font-black ${c.accent}`}>
                        {c.stat1.val}
                      </div>
                      <div className="text-[11px] font-medium text-slate-600">
                        {c.stat1.label}
                      </div>
                    </div>
                    <div>
                      <div className={`text-xl sm:text-2xl font-black ${c.accent}`}>
                        {c.stat2.val}
                      </div>
                      <div className="text-[11px] font-medium text-slate-600">
                        {c.stat2.label}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-[#0072bc] text-white hover:bg-[#005a96] px-5 py-2.5 text-xs font-bold shadow-md shadow-[#0072bc]/25 transition-all"
                    >
                      <span>Review Architecture</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Right Device Visual */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-md">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
