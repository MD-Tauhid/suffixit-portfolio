"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Star, CheckCircle2 } from "lucide-react";
import type { Product } from "@/lib/products";
import type { ProductModule } from "@/lib/product-content";

export default function ProductDetailModulesNagorik({
  product,
  modules,
}: {
  product: Product;
  modules: ProductModule[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800 mb-3">
            <Star size={12} className="fill-amber-500 text-amber-500" />
            <span>End-to-End Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Our {product.name} Modules
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569]">
            The details that do the work. Tailored to your corporate payroll structures and branch hierarchy.
          </p>
        </div>

        {/* 2-Column Split: 4-Photo Collage Left, Accordion Right */}
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left: 4 Photo Collage */}
          <div className="grid grid-cols-2 gap-4 sticky top-28">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src="/assets/about/workspace-placeholder.jpg"
                alt="Workspace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200 mt-6">
              <Image
                src="/assets/about/portrait-engineering.jpg"
                alt="Engineering"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200 -mt-6">
              <Image
                src="/assets/about/collaboration-placeholder.jpg"
                alt="Collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src="/assets/about/design-placeholder.jpg"
                alt="Design"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Right: Vertical Modules Accordion */}
          <div className="space-y-3.5">
            {modules.map((m, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={m.title}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "border-[#0072bc]/40 bg-sky-50/20 shadow-sm"
                      : "border-slate-200/80 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-sky-50 border border-sky-200/80 text-xs font-black text-[#0072bc]">
                        0{idx + 1}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-[#0f172a] leading-snug">
                        {m.title}
                      </span>
                    </div>

                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-all ${
                        isOpen
                          ? "bg-[#0072bc] text-white shadow-sm shadow-[#0072bc]/25 rotate-180"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-100 mt-1 pl-15">
                      <p className="pt-3">{m.text}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 size={14} />
                        <span>Production Ready Module</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
