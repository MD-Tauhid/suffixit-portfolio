"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, CheckCircle2, Sparkles, Workflow } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailStepsNagorik({
  product,
}: {
  product: Product;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax shifts between the two collage photo columns
  const col1Y = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-25, 30]);

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
    <section
      ref={sectionRef}
      className="relative !py-20 md:!py-28 bg-[#f8fafc] border-b border-slate-200/70 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-2xs">
            <Workflow size={12} className="text-[#0072bc]" />
            <span>Turnkey Implementation Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            4 Steps to Deploy Your {product.name}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569]">
            A clear, predictable rollout blueprint from data assessment to live electronic bank disbursement.
          </p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: 4 Steps sliding in from Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Animated Connecting Vertical Line */}
            <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#0072bc] via-sky-300 to-transparent -z-10" />

            <div className="space-y-6">
              {steps.map((st, idx) => (
                <motion.div
                  key={st.num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-colors hover:border-slate-200 hover:bg-white hover:shadow-xs"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-sky-200 text-sm font-black text-[#0072bc] shadow-sm group-hover:scale-110 group-hover:bg-[#0072bc] group-hover:text-white transition-all">
                    {st.num}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#0f172a] group-hover:text-[#0072bc] transition-colors">
                      {st.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0072bc] to-[#0284c7] hover:from-[#005a96] hover:to-[#0072bc] text-white px-7 py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-[#0072bc]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Schedule Your Deployment</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: 3-Box Collage with Interactive Parallax Shift */}
          <div className="grid grid-cols-2 gap-4 select-none">
            {/* Column 1 with Upward Parallax */}
            <motion.div
              style={{ y: col1Y }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-amber-100 p-2 border border-amber-200/90 shadow-xl shadow-amber-900/10 will-change-transform group hover:scale-[1.02] transition-transform"
            >
              <div className="relative size-full overflow-hidden rounded-2xl bg-amber-50">
                <Image
                  src="/assets/about/portrait-support.jpg"
                  alt="Customer support"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
                <div className="absolute bottom-3 left-3 right-3 z-10 rounded-xl bg-slate-950/75 border border-white/20 p-2.5 text-white backdrop-blur-md">
                  <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">Dedicated Lead</div>
                  <div className="text-xs font-bold truncate">Deployment Engineer</div>
                </div>
              </div>
            </motion.div>

            {/* Column 2 with Downward Parallax Offset */}
            <motion.div
              style={{ y: col2Y }}
              className="flex flex-col gap-4 will-change-transform"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square w-full overflow-hidden rounded-3xl bg-rose-100 p-2 border border-rose-200/90 shadow-xl shadow-rose-900/10 group hover:scale-[1.02] transition-transform"
              >
                <div className="relative size-full overflow-hidden rounded-2xl bg-rose-50">
                  <Image
                    src="/assets/about/portrait-cloud.jpg"
                    alt="Cloud infrastructure"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 30vw"
                  />
                  <div className="absolute top-3 right-3 z-10 size-7 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={15} />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-200/50 flex flex-col justify-center"
              >
                <div className="text-3xl font-black text-[#0072bc]">99.99%</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Disbursement Accuracy</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Automated statutory calculation</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
