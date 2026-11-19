import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Check } from "lucide-react";
import type { Product } from "@/lib/products";

export default function ProductRelatedDeck({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="relative !py-20 md:!py-24 bg-[#f8fbfe] border-b border-slate-100">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0072bc] mb-2">
              <span className="size-2 rounded-full bg-[#0072bc]" />
              <span>Interconnected Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#062033] tracking-tight">
              More products from Suffix IT.
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0072bc] bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-full border border-sky-200 transition-colors"
          >
            <span>Explore All 12 Turnkey Platforms</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex flex-col justify-between rounded-[24px] border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:border-[#0072bc]/40 hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-bold text-[#0072bc] uppercase tracking-wider">
                    {p.category}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#0072bc] transition-colors">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#062033] group-hover:text-[#0072bc] transition-colors tracking-tight">
                  {p.name}
                </h3>

                <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-[#17162a]/70 line-clamp-3">
                  {p.summary}
                </p>

                <div className="mt-5 space-y-1.5 pt-4 border-t border-slate-100">
                  {p.features.slice(0, 2).map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-[11px] text-slate-600">
                      <Check size={13} className="shrink-0 text-emerald-600" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0072bc]">
                <span>View Platform Specs</span>
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
