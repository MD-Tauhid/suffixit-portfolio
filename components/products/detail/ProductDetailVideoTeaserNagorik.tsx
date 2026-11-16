"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailVideoTeaserNagorik({
  product,
}: {
  product: Product;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative !py-20 md:!py-24 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
          {product.name} at a Glance
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl mx-auto">
          See how we bring together biometric timeclocks, tax calculation, and electronic bank advice into one cohesive platform.
        </p>

        {/* Widescreen Video Card */}
        <div className="mt-10 relative aspect-[21/9] w-full overflow-hidden rounded-[26px] border border-sky-200/80 bg-gradient-to-br from-[#004e82] via-[#0072bc] to-sky-600 shadow-xl shadow-sky-900/10 group cursor-pointer"
             onClick={() => setOpen(true)}>
          <Image
            src="/assets/services/services-hero-cinematic.jpg"
            alt="Video Teaser"
            fill
            className="object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1240px) 100vw, 1240px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#00385f]/80 via-[#0072bc]/20 to-transparent flex flex-col items-center justify-center">
            <div className="flex size-16 sm:size-20 items-center justify-center rounded-full bg-white text-[#0072bc] shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play size={28} className="ml-1 fill-current text-[#0072bc]" />
            </div>
            <div className="mt-4 text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-sm">
              Click to watch the complete platform walkthrough
            </div>
          </div>
        </div>
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
