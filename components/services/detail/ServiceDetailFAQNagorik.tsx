"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight, HelpCircle, PhoneCall } from "lucide-react";
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
    <section className="relative !py-20 md:!py-28 bg-[#f8fbff] border-b border-sky-100">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
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
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
          {/* Left Column: Advisor Card */}
          <div className="sticky top-28 rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm">
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
              Have a custom architecture question?
            </h3>
            <p className="mt-2 text-sm text-[#475569] leading-relaxed">
              Speak directly with our principal solutions architect to evaluate technical feasibility, database sizing, and migration schedules.
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
          </div>
        </div>
      </div>
    </section>
  );
}
