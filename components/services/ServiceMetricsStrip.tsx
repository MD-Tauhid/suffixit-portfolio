"use client";

import React from "react";
import { TrendingUp, ShieldCheck, Zap, Activity } from "lucide-react";
import type { ServiceMetric } from "./serviceDataMap";

interface ServiceMetricsStripProps {
  metrics: ServiceMetric[];
}

const icons = [TrendingUp, ShieldCheck, Zap, Activity];

export default function ServiceMetricsStrip({ metrics }: ServiceMetricsStripProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {metrics.map((m, i) => {
          const IconComp = icons[i % icons.length];
          return (
            <div
              key={m.label}
              className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md p-4 sm:p-5 border border-white/90 shadow-[0_4px_20px_-4px_rgba(0,114,188,0.08)] hover:shadow-[0_12px_28px_-6px_rgba(0,114,188,0.18)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0072bc] via-[#38bdf8] to-[#6366f1] opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Metric // 0{i + 1}
                </span>
                <span className="grid size-6 place-items-center rounded-lg bg-sky-50 text-[#0072bc] group-hover:bg-[#0072bc] group-hover:text-white transition-colors">
                  <IconComp size={12} />
                </span>
              </div>

              {/* Big Prominent Number */}
              <div className="text-2xl sm:text-3xl font-black text-[#062033] tracking-tight group-hover:text-[#0072bc] transition-colors">
                {m.value}
              </div>

              {/* Metric Label */}
              <div className="mt-1 text-xs font-bold text-[#17162a]">
                {m.label}
              </div>

              {/* Supporting context */}
              <p className="mt-1 text-[11px] leading-snug text-slate-500 font-normal">
                {m.sublabel}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
