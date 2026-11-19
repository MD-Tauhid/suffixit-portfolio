"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Plus, Minus, ArrowUpRight, HelpCircle, PhoneCall, ShieldCheck, Clock, CheckCircle2, BadgeCheck, Sparkles } from "lucide-react";
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
  const sectionRef = useRef<HTMLElement>(null);

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
    <section
      ref={sectionRef}
      className="relative !py-20 md:!py-28 bg-[#f8fafc] border-b border-slate-200/70 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/60 px-3.5 py-1 text-xs font-semibold text-slate-700 mb-3">
            <HelpCircle size={14} className="text-[#0072bc]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[#475569] max-w-xl">
            Everything you need to know about deployment timelines, hardware integration, statutory compliance, and enterprise SLAs.
          </p>
        </motion.div>

        {/* 2-Column Layout (2 Sides Entry) */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
          {/* Left Column: Enters from Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-28 rounded-3xl border border-sky-100 bg-white p-6 sm:p-7 shadow-[0_20px_50px_-12px_rgba(0,114,188,0.1)] relative overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0072bc] via-[#0ea5e9] to-[#38bdf8]" />

            {/* Executive Profile Header */}
            <div className="flex items-center gap-4">
              <div className="relative size-16 sm:size-18 rounded-2xl overflow-hidden ring-4 ring-sky-50 shadow-md shadow-sky-900/10 shrink-0 bg-slate-100">
                <Image
                  src="/assets/about/executive-consultant.jpg"
                  alt="Engr. Tanvir Morshed - Head of Technical Delivery"
                  fill
                  className="object-cover object-center"
                />
                {/* Live Online Badge */}
                <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-white shadow-xs">
                  <span className="size-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200 animate-pulse" />
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[10.5px] font-bold text-emerald-700 mb-1">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Call</span>
                </div>
                <h4 className="text-base font-bold text-[#0f172a] leading-snug flex items-center gap-1.5">
                  <span>Engr. Tanvir Morshed</span>
                  <BadgeCheck size={15} className="text-[#0072bc] shrink-0" />
                </h4>
                <p className="text-xs font-semibold text-[#0072bc]">
                  Head of Technical Delivery
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  Enterprise Software Specialist
                </p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-black text-[#0f172a] tracking-tight leading-snug">
                Still have specific questions?
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                Connect directly with our delivery team for a technical architecture review tailored to your enterprise.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <Clock size={13} className="text-[#0072bc]" />
                  <span>30-minute high-impact video call</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>Direct solution engineers, zero sales pressure</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6 pt-2">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-[#0072bc] to-[#005a96] hover:from-[#005a96] hover:to-[#004877] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0072bc]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#0072bc]/35 hover:-translate-y-0.5 group"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall size={16} className="text-white/90 group-hover:scale-110 transition-transform" />
                  <span>Schedule a Strategy Call</span>
                </div>
                <div className="flex size-7 items-center justify-center rounded-lg bg-white/15 text-white group-hover:bg-white group-hover:text-[#0072bc] transition-all">
                  <ArrowUpRight size={15} />
                </div>
              </Link>
              <p className="text-center mt-2.5 text-[11px] text-slate-400 font-medium">
                Direct calendar booking • No sales commitment
              </p>
            </div>
          </motion.div>

          {/* Right Column: Enters from Right Side (2 Sides Entry) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3.5"
          >
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#0072bc]/40 bg-sky-50/30 shadow-sm"
                      : "border-slate-200/80 bg-white/80 hover:border-slate-300 hover:bg-white"
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

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-[#334155] border-t border-slate-100/80">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
