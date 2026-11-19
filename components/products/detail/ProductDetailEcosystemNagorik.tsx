"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Users, DollarSign, Clock, ShieldCheck, FileText, CheckCircle2, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailEcosystemNagorik({
  product,
}: {
  product: Product;
}) {
  const [activeTab, setActiveTab] = useState<"hr" | "finance">("hr");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 0.5, 1], [35, 0, -35]);
  const photoScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.95, 1, 0.98]);

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
    <section
      ref={sectionRef}
      className="relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-2xs">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>Dual-Department Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Our {product.name} Ecosystem
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
            The Future of Business Runs on Automated Precision. Select perspective to review tailored workflows.
          </p>

          {/* Perspective Switcher */}
          <div className="mt-8 inline-flex items-center rounded-full bg-slate-100 p-1.5 border border-slate-200/90 shadow-inner">
            <button
              onClick={() => setActiveTab("hr")}
              className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === "hr"
                  ? "bg-[#0072bc] text-white shadow-md shadow-[#0072bc]/25"
                  : "text-slate-600 hover:text-[#0072bc]"
                }`}
            >
              <Users size={15} />
              <span>HR &amp; Operations Perspective</span>
            </button>
            <button
              onClick={() => setActiveTab("finance")}
              className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === "finance"
                  ? "bg-[#0072bc] text-white shadow-md shadow-[#0072bc]/25"
                  : "text-slate-600 hover:text-[#0072bc]"
                }`}
            >
              <DollarSign size={15} />
              <span>Finance &amp; Auditor Perspective</span>
            </button>
          </div>
        </motion.div>

        {/* 2-Column Content (2 Sides Entry) */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: 5 Items entering from Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -75 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 relative"
          >

            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3.5"
              >
                {currentItems.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: 4 }}
                    className="group rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-5 hover:border-[#0072bc]/40 hover:bg-white transition-all shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-slate-200/70 text-xs font-black text-slate-700 group-hover:bg-[#0072bc] group-hover:text-white transition-colors">
                        0{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-[#0f172a] group-hover:text-[#0072bc] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed pl-10">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Editorial Photo entering from Right Side */}
          <motion.div
            style={{ y: photoY, scale: photoScale }}
            initial={{ opacity: 0, x: 75, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[26px] border border-slate-200/90 shadow-2xl shadow-sky-950/15 will-change-transform"
          >
            <Image
              src="/assets/about/culture-placeholder.jpg"
              alt="Business collaboration"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-full bg-white/95 border border-white/40 px-3.5 py-1 text-xs font-bold text-slate-800 shadow-md backdrop-blur-md">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Cross-Departmental Synchronization</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
