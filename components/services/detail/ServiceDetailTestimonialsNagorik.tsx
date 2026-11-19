"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Star, Quote, Sparkles, CheckCircle2 } from "lucide-react";

export default function ServiceDetailTestimonialsNagorik() {
  return (
    <section className="sec-trans-section relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="trans-test-header mb-14 max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>Proven Enterprise Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Trusted by Fast-Growing Brands &amp; Global Retailers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            Real feedback from enterprise founders, retail directors, and technology officers who scale their digital revenue with Suffix IT.
          </p>
        </motion.div>

        {/* 4-Card Bento Grid: Center Outwards Spread ("makhkhan theke 2 dike choriye jabe") */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Large Testimonial Card Left (Spreads to Left) */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="trans-test-left rounded-[28px] border border-slate-200/90 bg-[#f8fbff] p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            <Quote size={80} className="absolute -top-4 -right-4 text-sky-100 pointer-events-none" />

            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>

              <p className="text-base sm:text-lg font-medium text-[#0f172a] leading-relaxed">
                &ldquo;Suffix IT transformed our fragmented e-commerce setup into a unified headless flagship. During our Eid flash campaigns, we saw a 42% jump in mobile checkout completion with zero downtime.&rdquo;
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 pt-6 border-t border-slate-200/60">
              <div className="relative size-12 overflow-hidden rounded-full border border-sky-200 bg-slate-200">
                <Image
                  src="/assets/about/portrait-cloud.jpg"
                  alt="Client Director"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0f172a]">Rafiqul Islam</div>
                <div className="text-xs text-[#0072bc] font-semibold">Head of E-Commerce &amp; Digital Growth</div>
                <div className="text-[11px] text-slate-500">Apex Brands • Dhaka</div>
              </div>
            </div>
          </motion.div>

          {/* Middle Column: 2 Pastel Metric Cards (Center Bloom first) */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.88 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="trans-test-center flex flex-col gap-6 justify-between"
          >
            {/* Card 2: Soft Purple Pastel Metric Card */}
            <div className="rounded-[28px] border border-[#ddd6fe] bg-[#ede9fe] p-8 sm:p-9 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-2">
                  High-Concurrency Uptime
                </div>
                <div className="text-4xl sm:text-5xl font-black text-purple-950 tracking-tight">
                  99.98%
                </div>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-purple-900 leading-relaxed">
                Zero dropped orders or payment gateway timeouts during million-visitor national sales events.
              </p>
            </div>

            {/* Card 3: Soft Yellow Pastel Metric Card */}
            <div className="rounded-[28px] border border-[#fef08a] bg-[#fef9c3] p-8 sm:p-9 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  Processed Volume
                </div>
                <div className="text-4xl sm:text-5xl font-black text-amber-950 tracking-tight">
                  ৳500M+
                </div>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-amber-900 leading-relaxed">
                Annual digital merchandise volume securely routed, reconciled, and deposited through our payment architectures.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Second Testimonial Card Right (Spreads to Right) */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="trans-test-right rounded-[28px] border border-slate-200/90 bg-[#f8fbff] p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden"
          >
            <Quote size={80} className="absolute -top-4 -right-4 text-sky-100 pointer-events-none" />

            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>

              <p className="text-base sm:text-lg font-medium text-[#0f172a] leading-relaxed">
                &ldquo;Their team integrated our 80+ retail outlets directly with our online cart in real time. We eliminated stock discrepancies completely and now dispatch online orders within 2 hours.&rdquo;
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 pt-6 border-t border-slate-200/60">
              <div className="relative size-12 overflow-hidden rounded-full border border-sky-200 bg-slate-200">
                <Image
                  src="/assets/about/portrait-support.jpg"
                  alt="Retail Director"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0f172a]">Tariqul Hassan</div>
                <div className="text-xs text-[#0072bc] font-semibold">Chief Operating Officer</div>
                <div className="text-[11px] text-slate-500">Crossworld Retail Group</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}