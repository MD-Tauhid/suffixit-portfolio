"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, TrendingUp, CheckCircle2, X } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductDetailAboutNagorik({
  product,
}: {
  product: Product;
}) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="relative mb-14 flex items-end justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              About {product.name}
            </h2>
            <p className="mt-3 text-base text-[#475569] leading-relaxed">
              Empowering organizations to optimize workforce administration, eliminate payroll discrepancies, and make informed financial decisions with 100% statutory compliance.
            </p>
          </div>

          {/* Watermark Icon */}
          <div className="hidden lg:block opacity-10 text-slate-800 pointer-events-none -mr-4">
            <TrendingUp size={110} />
          </div>
        </div>

        {/* Big Widescreen Video / Visual Showcase Card */}
        <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full overflow-hidden rounded-[26px] border border-sky-200/80 bg-gradient-to-br from-[#004e82] to-[#0072bc] shadow-xl">
          <Image
            src="/assets/about/collaboration-placeholder.jpg"
            alt={`${product.name} operations stage`}
            fill
            className="object-cover opacity-75 mix-blend-overlay"
            sizes="(max-width: 1240px) 100vw, 1240px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00385f]/85 via-[#0072bc]/40 to-transparent" />

          {/* Floating Action Overlay Card */}
          <div className="absolute top-1/2 left-6 sm:left-12 -translate-y-1/2 max-w-sm rounded-2xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setVideoOpen(true)}
                className="flex size-11 items-center justify-center rounded-full bg-[#facc15] hover:bg-[#eab308] text-[#0f172a] shadow-md transition-all cursor-pointer"
                aria-label="Watch product overview"
              >
                <Play size={18} className="ml-0.5 fill-current" />
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
          </div>
        </div>
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
