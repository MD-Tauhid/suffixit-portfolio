"use client";

import React, { useState } from "react";
import { Plus, Minus, ArrowUpRight, HelpCircle } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  q: string;
  a: string;
}

export default function ProductFAQSection({
  questions,
  productName,
}: {
  questions: FAQItem[];
  productName: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0072bc] mb-2.5">
              <span className="size-2 rounded-full bg-[#0072bc]" />
              <span>Questions &amp; Clarity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#062033] tracking-tight leading-[1.15]">
              Everything you need to know.
              <br />
              <span className="bg-gradient-to-r from-[#0072bc] to-[#38bdf8] bg-clip-text text-transparent">
                Before getting started.
              </span>
            </h2>
            <p className="mt-4 text-sm text-[#17162a]/70 leading-relaxed max-w-md">
              Need technical answers regarding biometric timeclock compatibility, legacy Excel data migration, or NBR tax regulations?
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 px-5 py-2.5 text-xs font-bold text-[#0072bc] transition-colors"
            >
              <span>Speak with a Product Engineer</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Right Column: Accordion */}
          <div className="space-y-4">
            {questions.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "border-[#0072bc]/40 bg-sky-50/20 shadow-sm"
                      : "border-slate-200/80 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#062033] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-transform ${
                        isOpen
                          ? "bg-[#0072bc] text-white rotate-180"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-[#17162a]/75 leading-relaxed border-t border-slate-100/60 mt-1">
                      <p className="pt-3">{faq.a}</p>
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
