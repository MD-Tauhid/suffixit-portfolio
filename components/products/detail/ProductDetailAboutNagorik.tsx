"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Play, TrendingUp, CheckCircle2, X } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailAboutNagorik({
  product,
}: {
  product: Product;
}) {
  const [videoOpen, setVideoOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked cinematic scale & 3D tilt
  const stageScale = useTransform(scrollYProgress, [0.1, 0.45, 0.9], [0.93, 1, 0.98]);
  const stageY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [40, 0, -20]);
  const floatingCardY = useTransform(scrollYProgress, [0.15, 0.85], [30, -30]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-40, 50]);

  return (
    <section
      ref={sectionRef}
      className="relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Top Header with Staggered Viewport Reveal */}
        <div className="relative mb-14 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-[#0072bc] mb-3">
              <span>Platform Deep-Dive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
              About {product.name}
            </h2>
            <p className="mt-3 text-base text-[#475569] leading-relaxed">
              Empowering organizations to optimize workforce administration, eliminate payroll discrepancies, and make informed financial decisions with 100% statutory compliance.
            </p>
          </motion.div>

          {/* Watermark Icon with Parallax Drift */}
          <motion.div
            style={{ y: watermarkY }}
            className="hidden lg:block opacity-10 text-slate-800 pointer-events-none -mr-4 will-change-transform"
          >
            <TrendingUp size={120} />
          </motion.div>
        </div>

        {/* Big Widescreen Video / Visual Showcase Card with Dramatic Scroll-Morphing */}
        <motion.div
          style={{ scale: stageScale, y: stageY }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[21/9] sm:aspect-[21/8] w-full overflow-hidden rounded-[28px] border border-slate-200/90 bg-slate-900 shadow-2xl shadow-sky-950/10 will-change-transform"
        >
          <Image
            src="/assets/about/collaboration-placeholder.jpg"
            alt={`${product.name} operations stage`}
            fill
            className="object-cover opacity-75 transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1240px) 100vw, 1240px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />

          {/* Floating Action Overlay Card with Dynamic Scroll Parallax */}
          <motion.div
            style={{ y: floatingCardY }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-6 sm:left-12 -translate-y-1/2 max-w-sm rounded-2xl border border-white/30 bg-white/95 p-6 shadow-2xl backdrop-blur-md will-change-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setVideoOpen(true)}
                className="flex size-11 items-center justify-center rounded-full bg-gradient-to-r from-[#0072bc] to-[#0284c7] hover:from-[#005a96] hover:to-[#0072bc] text-white shadow-lg shadow-[#0072bc]/30 hover:scale-105 transition-all cursor-pointer"
                aria-label="Watch product overview"
              >
                <Play size={18} className="ml-0.5 fill-current text-white" />
              </button>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Interactive Preview
                </div>
                <div className="text-sm font-extrabold text-[#0f172a]">
                  See {product.name} in 60s
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Discover how our automated formula engine synchronizes attendance, calculates statutory taxes, and exports bank advice files in seconds.
            </p>

            <button
              onClick={() => setVideoOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0072bc] hover:bg-[#005a96] text-white px-4 py-2 text-xs font-bold shadow-sm shadow-[#0072bc]/20 transition-all cursor-pointer"
            >
              <span>Watch Platform Demo</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 p-4 border border-white/20">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-amber-400 text-sm font-bold flex items-center gap-1 cursor-pointer"
            >
              <X size={20} />
              <span>Close</span>
            </button>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <video
                src="/assets/video/hero-video.mp4"
                controls
                autoPlay
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
