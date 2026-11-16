import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import type { Product } from "@/lib/products";
import type { ProductMediaConfig } from "../productDataMap";

export default function ProductDetailPillarsNagorik({
  product,
  mediaConfig,
}: {
  product: Product;
  mediaConfig: ProductMediaConfig;
}) {
  return (
    <section className="relative !py-20 md:!py-28 bg-[#f8fafc] border-b border-slate-200/70">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left Column: 3 Pillars */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15]">
              Smarter Decisions.
              <br />
              Automated Operations.
              <br />
              <span className="text-[#0072bc]">Measurable Growth.</span>
            </h2>

            <p className="mt-5 text-base text-[#475569] leading-relaxed max-w-xl">
              Scalable workforce infrastructure designed to handle complex departmental structures, shift rotations, and bank disbursements with zero spreadsheet formulas.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <CheckCircle2 size={20} className="shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#0f172a]">
                    End-to-End Payroll &amp; Attendance Automation
                  </div>
                  <div className="text-xs text-[#64748b] mt-0.5">
                    Connect ZKTeco biometric timeclocks directly to automated deduction and overtime rule matrices.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <CheckCircle2 size={20} className="shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#0f172a]">
                    Statutory Tax Engine &amp; NBR Compliance
                  </div>
                  <div className="text-xs text-[#64748b] mt-0.5">
                    Automated TDS calculations based on latest NBR fiscal year tax slabs, rebates, and employee declarations.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <CheckCircle2 size={20} className="shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#0f172a]">
                    1-Click BEFTN &amp; Multi-Bank Electronic Advice
                  </div>
                  <div className="text-xs text-[#64748b] mt-0.5">
                    Generate standard clearing files matching City Bank, EBL, BRAC, Dutch-Bangla, and all 60+ scheduled banks.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-tech UI Visual */}
          <div className="relative">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[22px] border border-slate-200/90 bg-white p-2 shadow-2xl shadow-slate-300/60">
              <div className="relative size-full overflow-hidden rounded-[16px] bg-sky-50">
                <Image
                  src={mediaConfig.architectureImage || mediaConfig.heroImage}
                  alt={`${product.name} dashboard`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
