"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";
import type { ProductMediaConfig } from "../productDataMap";

export default function ProductDetailPillarsNagorik({
  product,
  mediaConfig,
}: {
  product: Product;
  mediaConfig: ProductMediaConfig;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax offsets: Right UI floats at a distinct speed
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.94, 1, 0.98]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -ny * 8, y: nx * 10 });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const pillars = [
    {
      title: "End-to-End Payroll & Attendance Automation",
      desc: "Connect ZKTeco biometric timeclocks directly to automated deduction and overtime rule matrices.",
      highlight: "ZKTeco Native Direct Sync",
    },
    {
      title: "Statutory Tax Engine & NBR Compliance",
      desc: "Automated TDS calculations based on latest NBR fiscal year tax slabs, rebates, and employee declarations.",
      highlight: "100% Tax Slabs Automated",
    },
    {
      title: "1-Click BEFTN & Multi-Bank Electronic Advice",
      desc: "Generate standard clearing files matching City Bank, EBL, BRAC, Dutch-Bangla, and all 60+ scheduled banks.",
      highlight: "All 60+ Scheduled Banks",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative !py-20 md:!py-28 bg-[#f8fafc] border-b border-slate-200/70 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left Column: Enters from Left Side (2-side pinch entry) */}
          <motion.div
            initial={{ opacity: 0, x: -85 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-2xs">
                <Sparkles size={12} className="text-[#0072bc]" />
                <span>Engineered Core Value</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.12]">
                Smarter Decisions.
                <br />
                Automated Operations.
                <br />
                <span className="text-[#0072bc]">Measurable Growth.</span>
              </h2>

              <p className="mt-5 text-base text-[#475569] leading-relaxed max-w-xl">
                Scalable workforce infrastructure designed to handle complex departmental structures, shift rotations, and bank disbursements with zero spreadsheet formulas.
              </p>
            </div>

            {/* Checklist Cards with Sequential Spring Elevation */}
            <div className="mt-8 space-y-4">
              {pillars.map((p, idx) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -25, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group relative flex items-start justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-shadow hover:shadow-md hover:border-sky-300"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0f172a] group-hover:text-[#0072bc] transition-colors">
                        {p.title}
                      </div>
                      <div className="text-xs text-[#64748b] mt-1 leading-relaxed">
                        {p.desc}
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex shrink-0 items-center rounded-full bg-slate-50 border border-slate-200/80 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                    {p.highlight}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Enters from Right Side (2-side pinch entry) */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            initial={{ opacity: 0, x: 85, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative [perspective:1200px]"
          >
            <div
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="relative aspect-[16/11] w-full overflow-hidden rounded-[26px] border border-slate-200/90 bg-white p-2.5 shadow-2xl shadow-sky-950/15 transition-transform duration-200 ease-out will-change-transform group cursor-pointer"
            >
              <div className="relative size-full overflow-hidden rounded-[18px] bg-slate-900">
                <Image
                  src={mediaConfig.architectureImage || mediaConfig.heroImage}
                  alt={`${product.name} dashboard`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-slate-950/75 border border-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Production Dashboard</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
