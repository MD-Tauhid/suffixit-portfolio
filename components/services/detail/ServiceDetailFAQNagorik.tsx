"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight, HelpCircle, PhoneCall, ShieldCheck, Clock, CheckCircle2, BadgeCheck } from "lucide-react";
import { motion } from "motion/react";
import type { Service } from "@/lib/services";

export default function ServiceDetailFAQNagorik({
  service,
}: {
  service: Service;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const questions = [
    {
      q: "Can you migrate our existing store from WooCommerce or Magento without losing SEO rank or order history?",
      a: "Yes. We execute zero-downtime, SEO-preserved data migrations. We map all legacy URLs with strict 301 redirects, sanitize customer passwords via secure cryptographic salts, and import historical order ledgers, SKU variants, and loyalty credits seamlessly.",
    },
    {
      q: "How do you engineer for high-concurrency flash sales and traffic spikes?",
      a: "We deploy headless architectures leveraging Next.js static generation, edge caching across Cloudflare CDN, distributed Redis queue buffering for cart checkouts, and automated horizontal auto-scaling on AWS ECS/Kubernetes. This ensures sub-second response times even under 50,000+ simultaneous shoppers.",
    },
    {
      q: "Which payment gateways are supported natively, and how is failover handled?",
      a: "We support direct API integrations with bKash, Nagad, Rocket, Upay, SSLCommerz, Shurjopay, and global gateways like Stripe and PayPal. We configure automatic fallback routing—if one provider experiences an API timeout, the checkout instantly prompts the alternative channel to prevent abandoned baskets.",
    },
    {
      q: "Can your team synchronize inventory in real time with our physical store POS and ERP?",
      a: "Absolutely. We build event-driven webhook bridges and REST/gRPC connectors for Rupantar ERP, SAP, Oracle, Microsoft Dynamics, and custom POS systems. When an item is scanned and sold at an offline outlet, digital stock levels decrement within 200 milliseconds.",
    },
    {
      q: "Who owns the source code and intellectual property (IP)?",
      a: "You retain 100% ownership of all source code, design systems, Docker containers, database schemas, and intellectual property. All Git repositories and cloud configurations are transferred entirely to your organization upon milestone signoff.",
    },
    {
      q: "What post-launch warranties and SLA support do you provide?",
      a: "Every fixed-scope project includes a 60-day full warranty covering bug remediation and minor adjustments. We also offer ongoing monthly SLA retainers with guaranteed 1-hour emergency response windows, weekly backups, and quarterly penetration audits.",
    },
    {
      q: "How quickly can a dedicated e-commerce engineering squad deploy?",
      a: "For staff augmentation and dedicated engineering pods, our pre-vetted engineers can onboard into your Git repos and join daily standups within 5 to 7 business days.",
    },
  ];

  return (
    <section className="sec-trans-section relative !py-20 md:!py-28 bg-[#f8fbff] border-b border-sky-100">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="trans-faq-header mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-200 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <HelpCircle size={14} className="text-[#0072bc]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[#475569] max-w-xl">
            Everything you need to know about timelines, payment gateways, ERP integrations, and enterprise warranties.
          </p>
        </motion.div>

        {/* 2-Column Layout (Dual-Side Convergence Entry) */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
          {/* Left Column: Premium Executive Advisor Card - Enters from Left */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="trans-faq-left sticky top-28 rounded-3xl border border-sky-100 bg-white p-6 sm:p-7 shadow-[0_20px_50px_-12px_rgba(0,114,188,0.08)] relative overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0072bc] via-[#0ea5e9] to-[#38bdf8]" />

            {/* Executive Profile Header */}
            <div className="flex items-center gap-4">
              <div className="relative size-16 sm:size-18 rounded-2xl overflow-hidden ring-4 ring-sky-50 shadow-md shadow-sky-900/10 shrink-0 bg-slate-100">
                <Image
                  src="/assets/about/executive-architect.jpg"
                  alt="Engr. Kazi Rafsanul Haque - Lead Solutions Architect"
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
                  <span>Kazi Rafsanul Haque</span>
                  <BadgeCheck size={15} className="text-[#0072bc] shrink-0" />
                </h4>
                <p className="text-xs font-semibold text-[#0072bc]">
                  Lead Solutions Architect
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  12+ Yrs Enterprise Architecture
                </p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-black text-[#0f172a] tracking-tight leading-snug">
                Have a custom architecture question?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
                Speak directly with our principal solutions architect to evaluate technical feasibility, database sizing, and migration schedules.
              </p>
            </div>

            {/* Trust Highlights */}
            <div className="mt-4 rounded-2xl bg-[#f8fbff] border border-sky-100/70 p-3.5 space-y-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 size={15} className="text-[#0072bc] shrink-0" />
                <span>Direct engineer talk · Zero sales pressure</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <ShieldCheck size={15} className="text-[#0072bc] shrink-0" />
                <span>Strict NDA &amp; IP confidentiality guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <Clock size={15} className="text-[#0072bc] shrink-0" />
                <span>15-min discovery call · Same-day slots</span>
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
                  <span>Schedule Strategy Call</span>
                </div>
                <div className="flex size-7 items-center justify-center rounded-lg bg-white/15 text-white group-hover:bg-white group-hover:text-[#0072bc] transition-all">
                  <ArrowUpRight size={15} />
                </div>
              </Link>
              <p className="text-center mt-2.5 text-[11px] text-slate-400 font-medium">
                Direct calendar booking • No credit card needed
              </p>
            </div>
          </motion.div>

          {/* Right Column: FAQ Accordion - Enters from Right */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="trans-faq-accordion space-y-3.5"
          >
            {questions.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#0072bc]/40 bg-sky-50/25 shadow-sm"
                      : "border-slate-200/80 bg-white hover:border-slate-300"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
