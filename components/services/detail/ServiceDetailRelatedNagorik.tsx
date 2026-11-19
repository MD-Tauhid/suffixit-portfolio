"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import type { Service } from "@/lib/services";
import ServiceRelatedGrid from "../ServiceRelatedGrid";

export default function ServiceDetailRelatedNagorik({
  services,
}: {
  services: Service[];
}) {
  return (
    <section className="sec-trans-section relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header - Side Sweep Entry */}
        <motion.div
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="trans-related-header mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3">
              <Sparkles size={12} className="text-[#0072bc]" />
              <span>Integrated Practices</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
              Expertise That Connects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl">
              Cross-disciplinary software, mobile, and cloud practices that integrate with your digital ecosystem.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0072bc] bg-sky-50 hover:bg-sky-100 px-5 py-2.5 rounded-full border border-sky-200 transition-colors"
          >
            <span>Explore All 14 Practices</span>
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>

        {/* Related Services Grid - Side Sweep Entry */}
        <motion.div
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="trans-related-grid"
        >
          <ServiceRelatedGrid services={services} />
        </motion.div>
      </div>
    </section>
  );
}
