import React from "react";
import type { ProductMetric } from "./productDataMap";

export default function ProductTelemetryStrip({ metrics }: { metrics: ProductMetric[] }) {
  return (
    <section className="relative border-y border-[#0072bc]/10 bg-white py-6">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {metrics.map((m, idx) => (
            <div
              key={m.label}
              className={`flex flex-col ${idx !== 0 ? "pt-4 md:pt-0 md:pl-8" : ""}`}
            >
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#062033]">
                  {m.value}
                </span>
                <span className="size-1.5 rounded-full bg-[#0072bc]" />
              </div>
              <span className="mt-1 text-xs sm:text-sm font-bold text-[#0072bc]">
                {m.label}
              </span>
              <span className="mt-0.5 text-[11px] text-[#17162a]/60 leading-tight">
                {m.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
