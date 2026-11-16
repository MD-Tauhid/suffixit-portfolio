import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailStepsNagorik({
  product,
}: {
  product: Product;
}) {
  const steps = [
    {
      num: "01",
      title: "Data Audit & Master Profile Ingestion",
      desc: "We extract and sanitize your existing employee records, department structures, salary history, and bank account details from Excel or legacy systems.",
    },
    {
      num: "02",
      title: "Formula Configuration & Hardware Sync",
      desc: "Our engineers configure allowances, overtime 2x multipliers, tax slabs, and connect directly with on-premise ZKTeco biometric timeclocks.",
    },
    {
      num: "03",
      title: "Parallel Shadow Run & Verification",
      desc: "We run a shadow pay cycle alongside your current payroll to reconcile every single taka, verify bank advice files, and confirm audit trails.",
    },
    {
      num: "04",
      title: "Live Production Launch & Handover",
      desc: "Your team begins executing 1-click monthly pay runs, dispatching SMS/email payslips, and exporting BEFTN clearing advice with ongoing SLA support.",
    },
  ];

  return (
    <section className="relative !py-20 md:!py-28 bg-[#f8fafc] border-b border-slate-200/70">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            4 Steps to Deploy Your {product.name}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569]">
            A clear, predictable rollout blueprint from data assessment to live electronic bank disbursement.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: 4 Steps */}
          <div>
            <div className="space-y-6">
              {steps.map((st) => (
                <div key={st.num} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sm font-black text-[#0072bc] shadow-xs">
                    {st.num}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#0f172a]">
                      {st.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0072bc] hover:bg-[#005a96] text-white px-7 py-3 text-xs sm:text-sm font-bold shadow-md shadow-[#0072bc]/25 transition-all cursor-pointer"
              >
                <span>Schedule Your Deployment</span>
                <span className="text-amber-300">👋</span>
              </Link>
            </div>
          </div>

          {/* Right: 3-Box Collage with Yellow/Pink Pastel Backgrounds */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-amber-100 p-2 border border-amber-200 shadow-md">
              <div className="relative size-full overflow-hidden rounded-xl">
                <Image
                  src="/assets/about/portrait-support.jpg"
                  alt="Customer support"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-rose-100 p-2 border border-rose-200 shadow-md">
                <div className="relative size-full overflow-hidden rounded-xl">
                  <Image
                    src="/assets/about/portrait-cloud.jpg"
                    alt="Cloud infrastructure"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-center">
                <div className="text-2xl font-black text-[#0072bc]">99.99%</div>
                <div className="text-xs font-bold text-slate-700 mt-1">Disbursement Accuracy</div>
                <div className="text-[11px] text-slate-500">Zero spreadsheet errors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
