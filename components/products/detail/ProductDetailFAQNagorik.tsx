"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight, HelpCircle, PhoneCall } from "lucide-react";
import type { Product } from "@/lib/products";

interface FAQItem {
  q: string;
  a: string;
}

export default function ProductDetailFAQNagorik({
  product,
  questions,
}: {
  product: Product;
  questions: FAQItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const defaultQuestions: FAQItem[] = [
    {
      q: `What modules and workflows are included in ${product.name}?`,
      a: `The platform core includes employee master profiles, biometric clock reconciliation, multi-tier shift rostering, statutory tax deduction engine (NBR compliant), Provident Fund & gratuity ledgers, and direct electronic bank advice generation. During setup, our implementation engineers tailor formulas, permissions, and system workflows to match your exact business rules.`,
    },
    {
      q: "Can we migrate our existing historical data from Excel or other legacy software?",
      a: "Yes. Suffix IT provides full turnkey data migration. We sanitize, validate, and import your existing master employee profiles, attendance records, financial ledgers, and historical documents without operational downtime.",
    },
    {
      q: "Does this integrate with our biometric timeclocks and electronic bank portals?",
      a: "Absolutely. We support native TCP/IP direct sync with ZKTeco, Realtime, Virdi, and RFID devices. For payroll disbursement, our automated engine generates BEFTN / NPSB-compliant files for City Bank, EBL, BRAC Bank, Dutch-Bangla, and all 60+ scheduled banks in Bangladesh.",
    },
    {
      q: "How are statutory taxes, Provident Fund (PF), and NBR regulations maintained?",
      a: "The statutory calculation engine is automatically updated whenever the National Board of Revenue (NBR) publishes revised fiscal tax slabs or exemptions. It calculates monthly TDS withholdings, year-end Form 108A summaries, and individual employee tax deduction certificates automatically.",
    },
    {
      q: "How does pricing and software deployment work?",
      a: "We offer both Cloud Managed SaaS (monthly or annual subscription with zero server maintenance) and On-Premise Enterprise Licenses (perpetual license deployed inside your corporate server room). Contact our solution specialists for an itemized proposal.",
    },
    {
      q: "What level of enterprise SLA and post-deployment support is included?",
      a: "Every deployment includes guaranteed SLA response windows, dedicated account managers, regular patch updates, on-site training for HR and finance operators, and 24/7 mission-critical emergency helpline access.",
    },
    {
      q: "Is multi-branch and multi-shift factory operation supported?",
      a: "Yes. The platform supports unlimited branches, multi-tier organizational hierarchies, and round-the-clock rotating shifts with automated night allowance and overtime calculations.",
    },
  ];

  const items = questions && questions.length > 0 ? questions : defaultQuestions;

  return (
    <section className="relative !py-20 md:!py-28 bg-[#f8fafc] border-b border-slate-200/70">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/60 px-3 py-1 text-xs font-semibold text-slate-700 mb-3">
            <HelpCircle size={14} className="text-[#0072bc]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[#475569] max-w-xl">
            Everything you need to know about deployment timelines, hardware integration, statutory compliance, and enterprise SLAs.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
          {/* Left Column: Advisor Card */}
          <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="relative mb-5 h-48 w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src="/assets/about/portrait-engineering.jpg"
                alt="Product Specialist"
                fill
                className="object-cover object-top"
              />
              <div className="absolute top-3 left-3 rounded-md bg-[#facc15] px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-sm">
                Direct Consultation
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#0f172a]">
              Still have specific questions?
            </h3>
            <p className="mt-2 text-sm text-[#475569] leading-relaxed">
              Speak directly with our enterprise solutions architect to discuss your company&apos;s custom payroll formulas, biometric timeclocks, or ERP integrations.
            </p>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#facc15] px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-[#eab308] shadow-sm"
              >
                <PhoneCall size={16} />
                <span>Schedule a Strategy Call</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="space-y-3.5">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#0072bc]/40 bg-sky-50/25 shadow-sm"
                      : "border-slate-200/80 bg-white/70 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-[17px] font-bold text-[#0f172a]">
                      {item.q}
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-[#0072bc] text-white shadow-sm shadow-[#0072bc]/25"
                          : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-[#0072bc]"
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-[#334155] border-t border-slate-100/80">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
