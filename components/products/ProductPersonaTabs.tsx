"use client";

import React, { useState } from "react";
import { Users, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import type { ProductPersona } from "./productDataMap";

export default function ProductPersonaTabs({
  personas,
  productName,
}: {
  personas: ProductPersona[];
  productName: string;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const activePersona = personas[activeTab] || personas[0];

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0072bc] mb-2.5">
            <span className="size-2 rounded-full bg-[#0072bc]" />
            <span>Role-Based Value</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062033] tracking-tight leading-[1.15]">
            Built for the people
            <br />
            <span className="bg-gradient-to-r from-[#0072bc] to-[#38bdf8] bg-clip-text text-transparent">
              behind your operations.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#17162a]/70 leading-relaxed">
            Every department interacts with {productName} differently. See how each role benefits from automated precision.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {personas.map((persona, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={persona.role}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0072bc] text-white shadow-md shadow-[#0072bc]/25 scale-102"
                    : "bg-slate-100 hover:bg-slate-200 text-[#062033]"
                }`}
              >
                <span>{persona.role}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-white text-slate-500"
                  }`}
                >
                  {persona.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Persona Spotlight Card */}
        <div className="rounded-[28px] border border-sky-100 bg-gradient-to-br from-sky-50/50 via-white to-blue-50/30 p-8 sm:p-12 shadow-lg shadow-sky-900/5">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0072bc] shadow-xs border border-sky-100 mb-4">
                <Sparkles size={12} />
                <span>{activePersona.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062033] tracking-tight">
                {activePersona.role}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-[#17162a]/75 leading-relaxed">
                {activePersona.summary}
              </p>
            </div>

            <div className="space-y-3.5">
              {activePersona.points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xs"
                >
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[#0072bc]">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#062033] leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
