"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Play, X, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailVideoTeaserNagorik({
  product,
}: {
  product: Product;
}) {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.93, 1, 0.96]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [30, 0, -20]);

  return (
    <section
      ref={sectionRef}
      className="relative !py-20 md:!py-24 bg-white border-b border-slate-100 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>Executive Production Walkthrough</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            {product.name} at a Glance
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl mx-auto">
            See how we bring together biometric timeclocks, tax calculation, and electronic bank advice into one cohesive platform.
          </p>
        </motion.div>

        {/* Widescreen Video Card: Center Outwards Expansion ("makhkhan theke 2 dike choriye jabe") */}
        <motion.div
          style={{ scale: cardScale, y: cardY }}
          initial={{ opacity: 0, scaleX: 0.76, scaleY: 0.9 }}
          whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 relative origin-center aspect-[21/9] w-full overflow-hidden rounded-[30px] border border-sky-200/80 bg-gradient-to-br from-[#004e82] via-[#0072bc] to-sky-600 shadow-2xl shadow-sky-900/15 group cursor-pointer will-change-transform"
          onClick={() => setOpen(true)}
        >
          <Image
            src="/assets/services/services-hero-cinematic.jpg"
            alt="Video Teaser"
            fill
            className="object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1240px) 100vw, 1240px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#00385f]/80 via-[#0072bc]/20 to-transparent flex flex-col items-center justify-center">
            <div className="flex size-16 sm:size-20 items-center justify-center rounded-full bg-white text-[#0072bc] shadow-2xl transition-transform duration-300 group-hover:scale-115">
              <Play size={28} className="ml-1 fill-current text-[#0072bc]" />
            </div>
            <div className="mt-4 text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-sm">
              Click to watch the complete platform walkthrough
            </div>
          </div>
        </motion.div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 p-3 border border-white/20">
            <button
              onClick={() => setOpen(false)}
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
