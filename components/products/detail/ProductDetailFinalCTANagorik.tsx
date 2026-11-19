"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailFinalCTANagorik({
  product,
}: {
  product: Product;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bannerScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.93, 1, 0.98]);
  const bannerY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [35, 0, -25]);
  const photoY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative !py-20 md:!py-28 bg-[#f8fafc] border-b border-slate-200/70 overflow-hidden"
    >
      {/* Background ambient accents */}
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 size-[400px] rounded-full bg-sky-200/20 blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/4 size-[400px] rounded-full bg-amber-100/20 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale: bannerScale, y: bannerY }}
          initial={{ opacity: 0, scale: 0.88, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative origin-center rounded-[32px] border border-slate-200 bg-white p-8 sm:p-12 lg:p-16 shadow-2xl shadow-slate-200/50 overflow-hidden will-change-transform"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* Left Content: Spreads outward to Left */}
            <motion.div
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/70 px-3.5 py-1 text-xs font-bold text-amber-800 mb-5 shadow-2xs">
                <Sparkles size={14} className="text-amber-600" />
                <span>Next Generation Enterprise Software</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.1]">
                Ready to Experience{" "}
                <span className="text-[#0072bc]">{product.name}</span> in Action?
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#334155] leading-relaxed max-w-xl">
                Eliminate calculation discrepancies, automate complex shifts, and guarantee 100% NBR statutory compliance with Bangladesh&apos;s most dependable workforce platform.
              </p>

              {/* Checkpoints */}
              <div className="mt-6 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Turnkey data migration from legacy Excel or ERP</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Direct ZKTeco biometric sync &amp; BEFTN bank file advice</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Dedicated enterprise SLA with on-premise or cloud deployment</span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0072bc] to-[#0284c7] hover:from-[#005a96] hover:to-[#0072bc] px-7 py-4 text-sm font-bold text-white transition-all shadow-lg shadow-[#0072bc]/25 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Schedule Live Walkthrough</span>
                  <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-800 hover:text-[#0072bc] px-7 py-4 text-sm font-bold transition-all hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow hover:-translate-y-0.5"
                >
                  <Zap size={16} className="text-[#0072bc]" />
                  <span>Talk to Solutions Team</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Media Collage: Spreads outward to Right ("makhkhan theke 2 dike choriye jabe") */}
            <motion.div
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                style={{ y: photoY }}
                className="relative mx-auto aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[26px] border border-slate-200 bg-slate-100 shadow-2xl will-change-transform group"
              >
                <Image
                  src="/assets/services/service-dedicated-teams-collaboration.jpg"
                  alt="Suffix IT Team Collaboration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 backdrop-blur-md shadow-lg border border-white/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Enterprise Deployment
                      </div>
                      <div className="text-sm font-black text-slate-900">
                        Zero Downtime Implementation
                      </div>
                    </div>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold border border-emerald-200">
                      <ShieldCheck size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Top Mini Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -top-4 -left-4 hidden sm:flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl border border-slate-100"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#0072bc]/10 text-[#0072bc]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500">Live Client Trust</div>
                  <div className="text-xs font-bold text-slate-900">50+ Corporate Deploys</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
