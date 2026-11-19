"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Users, Cpu, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";

export default function ProductDetailTeamNagorik({
  productName,
}: {
  productName: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const card1Y = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [-15, 20]);

  return (
    <section
      ref={sectionRef}
      className="relative !py-20 md:!py-28 bg-[#f8fbff] text-slate-900 border-b border-sky-100 overflow-hidden"
    >
      {/* Subtle ambient light with Parallax */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 size-[400px] rounded-full bg-sky-200/30 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Users size={13} className="text-[#0072bc]" />
            <span>Dedicated Engineering &amp; Advisory Teams</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Meet the Team Behind Our Delivery
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569]">
            Specialists across business logic, systems integration, and enterprise software engineering.
          </p>
        </motion.div>

        {/* 2 Large Clean White Cards: Center Outwards Spread ("makhkhan theke 2 dike choriye jabe") */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Starts in center and pushes outward to the Left */}
          <motion.div
            style={{ y: card1Y }}
            initial={{ opacity: 0, x: 65, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="rounded-[26px] border border-slate-200/90 bg-white p-8 shadow-sm hover:shadow-2xl hover:shadow-sky-100/70 hover:border-[#0072bc]/40 transition-all will-change-transform"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-[#0072bc] border border-sky-200 mb-5">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
              Expert Software Architects &amp; Integration Engineers
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
              Specialized in high-throughput enterprise engines, hardware device interfacing, and robust multi-branch database replication. We ensure your platforms withstand high-concurrency peak demands with zero downtime.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">Biometric Protocol Engineering</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">BEFTN Bank Integration</span>
            </div>
          </motion.div>

          {/* Card 2: Starts in center and pushes outward to the Right */}
          <motion.div
            style={{ y: card2Y }}
            initial={{ opacity: 0, x: -65, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="rounded-[26px] border border-slate-200/90 bg-white p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-100/70 hover:border-emerald-500/40 transition-all will-change-transform"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 mb-5">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
              Business Analysts &amp; Statutory Compliance Advisors
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
              Our consultants deeply understand Bangladesh labor laws, NBR tax schedules, provident fund governance, and auditable accounting standards—translating complex compliance requirements directly into software rules.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">NBR 2024-25 Tax Slabs</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Labor Law Audit Ready</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
