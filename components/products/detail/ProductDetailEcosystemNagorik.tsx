"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, DollarSign, Clock, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailEcosystemNagorik({
  product,
}: {
  product: Product;
}) {
  const [activeTab, setActiveTab] = useState<"hr" | "finance">("hr");

  const hrItems = [
    {
      title: "Biometric Attendance & Shift Rostering",
      desc: "Direct TCP/IP sync with ZKTeco devices, late-in and early-out auto penalties, and multi-shift factory rotations.",
    },
    {
      title: "Configurable Salary Components",
      desc: "Customize Basic, House Rent, Medical, Conveyance, Overtime 2x formulas, and festival bonuses.",
    },
    {
      title: "Employee Leave & Self-Service Portal",
      desc: "Web and mobile portal for staff to view attendance, request leave, and download digital payslips.",
    },
    {
      title: "Lifecycle & Revision History",
      desc: "Complete chronological archive of employee promotions, increment letters, transfers, and separations.",
    },
    {
      title: "Automated Policy Approval Chains",
      desc: "Multi-tier approval workflows routing overtime authorizations from supervisors to department heads.",
    },
  ];

  const financeItems = [
    {
      title: "1-Click BEFTN / NPSB Bank Advice",
      desc: "Export salary disbursement routing files accepted by all 60+ scheduled commercial banks in Bangladesh.",
    },
    {
      title: "Statutory NBR Tax Engine & Form 108A",
      desc: "Automated tax slab calculations with female/male thresholds, investment tax credits, and annual return summaries.",
    },
    {
      title: "Provident Fund & Gratuity Trust Ledgers",
      desc: "Manage employee & employer PF contributions, loan disbursements, and compound interest accrual schedules.",
    },
    {
      title: "Double-Entry General Ledger Sync",
      desc: "Auto-post salary expense, tax withholding liabilities, and cash disbursement vouchers into Rupantar ERP.",
    },
    {
      title: "Immutable Change & Audit Logs",
      desc: "Every manual salary adjustment or bonus edit logs user ID, timestamp, and previous vs new values.",
    },
  ];

  const currentItems = activeTab === "hr" ? hrItems : financeItems;

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Our {product.name} Ecosystem
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            The Future of Business Runs on Automated Precision. Select perspective to review tailored workflows.
          </p>

          {/* Perspective Switcher */}
          <div className="mt-8 inline-flex items-center rounded-full bg-slate-100 p-1.5 border border-slate-200">
            <button
              onClick={() => setActiveTab("hr")}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "hr"
                  ? "bg-[#0072bc] text-white shadow-md shadow-[#0072bc]/25"
                  : "text-slate-600 hover:text-[#0072bc]"
              }`}
            >
              <Users size={15} />
              <span>HR &amp; Operations Perspective</span>
            </button>
            <button
              onClick={() => setActiveTab("finance")}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "finance"
                  ? "bg-[#0072bc] text-white shadow-md shadow-[#0072bc]/25"
                  : "text-slate-600 hover:text-[#0072bc]"
              }`}
            >
              <DollarSign size={15} />
              <span>Finance &amp; Auditor Perspective</span>
            </button>
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: 5 Items */}
          <div className="space-y-4">
            {currentItems.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-5 hover:border-[#0072bc]/40 hover:bg-white transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-slate-200/70 text-xs font-black text-slate-700">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-[#0f172a]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed pl-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Editorial Photo */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-slate-200/90 shadow-xl">
            <Image
              src="/assets/about/culture-placeholder.jpg"
              alt="Business collaboration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
