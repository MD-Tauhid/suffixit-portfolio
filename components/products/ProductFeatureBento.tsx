"use client";

import React, { useState } from "react";
import {
  Layers,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  FileSpreadsheet,
} from "lucide-react";
import type { ProductModule } from "@/lib/product-content";

const moduleIcons = [Cpu, Database, ShieldCheck, Zap, Activity, FileSpreadsheet];

export default function ProductFeatureBento({
  productName,
  lead,
  modules,
}: {
  productName: string;
  lead: string;
  modules: ProductModule[];
}) {
  const [activeModule, setActiveModule] = useState(0);

  return (
    <section id="product-modules" className="relative !py-20 md:!py-28 bg-[#f8fbfe] scroll-mt-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0072bc] mb-2.5">
              <span className="size-2 rounded-full bg-[#0072bc]" />
              <span>Modular Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062033] tracking-tight leading-[1.12]">
              The core engine modules.
              <br />
              <span className="bg-gradient-to-r from-[#0072bc] to-[#38bdf8] bg-clip-text text-transparent">
                Built for mission-critical workflows.
              </span>
            </h2>
          </div>
          <div>
            <p className="text-sm sm:text-base leading-relaxed text-[#17162a]/70">
              {lead || `Explore the integrated architecture of ${productName}. Every component is engineered to eliminate spreadsheets, reduce manual bottlenecks, and maintain an immutable audit trail.`}
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, idx) => {
            const Icon = moduleIcons[idx % moduleIcons.length];
            const isFeatured = idx === 0;

            return (
              <div
                key={mod.title}
                onMouseEnter={() => setActiveModule(idx)}
                className={`group relative flex flex-col justify-between rounded-[24px] border border-slate-200/80 bg-white p-7 sm:p-8 transition-all duration-300 hover:border-[#0072bc]/40 hover:shadow-xl hover:-translate-y-1 ${
                  isFeatured ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-sky-50/20 to-blue-50/30" : ""
                }`}
              >
                <div>
                  {/* Top Header with Icon & Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-100/70 text-[#0072bc] shadow-xs group-hover:bg-[#0072bc] group-hover:text-white transition-colors duration-300">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-extrabold text-slate-300 group-hover:text-[#0072bc] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#062033] tracking-tight group-hover:text-[#0072bc] transition-colors">
                    {mod.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3.5 text-sm sm:text-[14.5px] leading-relaxed text-[#17162a]/70">
                    {mod.text}
                  </p>
                </div>

                {/* Bottom capability tag */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle size={14} />
                    <span>Real-Time Production Sync</span>
                  </div>
                  <span className="text-[#0072bc] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
