"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Code2, Users, Clock, CheckCircle2 } from "lucide-react";

export default function ServiceDetailValueBentoNagorik() {
  return (
    <section className="relative !py-20 md:!py-28 bg-[#f8fbff] border-b border-sky-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>The Suffix IT Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Why Choose Suffix IT
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            A transparent engineering partner committed to clean architectures, rigorous QA, and dependable long-term delivery.
          </p>
        </div>

        {/* 5-Block Bento Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Block 1: Wide Horizontal Photo Card (spans 2 cols on desktop) */}
          <div className="md:col-span-2 relative aspect-[16/9] md:aspect-auto md:min-h-[290px] overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-2 shadow-sm">
            <div className="relative size-full overflow-hidden rounded-[20px] bg-slate-900">
              <Image
                src="/assets/services/service-dedicated-teams-collaboration.jpg"
                alt="Suffix IT Engineering Collaboration"
                fill
                className="object-cover opacity-85"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md mb-2">
                    <Users size={12} />
                    <span>In-House Engineering Pods</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Senior Engineers Working Directly for Your Vision
                  </h3>
                </div>
                <div className="rounded-xl bg-[#0072bc] px-4 py-2 text-xs font-bold text-white shadow-md">
                  Zero Outsourcing
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Soft Yellow Card Top-Right */}
          <div className="rounded-[28px] border border-[#fef08a] bg-[#fef9c3] p-8 shadow-sm flex flex-col justify-between">
            <div className="size-11 rounded-2xl bg-amber-400/30 text-amber-900 flex items-center justify-center font-bold mb-5">
              <Code2 size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                Rigorous Senior Code Reviews &amp; QA
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                Every commit passes automated CI/CD checks, Jest unit tests, and dual peer reviews prior to staging release.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-200 text-xs font-bold text-amber-900">
              Production-Grade Standards
            </div>
          </div>

          {/* Block 3: Soft Sky Blue Card Bottom-Left */}
          <div className="rounded-[28px] border border-[#bae6fd] bg-[#e0f2fe] p-8 shadow-sm flex flex-col justify-between">
            <div className="size-11 rounded-2xl bg-sky-200 text-sky-900 flex items-center justify-center font-bold mb-5">
              <Users size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                Direct Principal Architect Access
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                Direct communication through dedicated Slack/Teams channels with lead engineers—no non-technical middlemen.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-sky-200 text-xs font-bold text-sky-900">
              Transparent Communication
            </div>
          </div>

          {/* Block 4: Soft Purple Card Bottom-Middle */}
          <div className="rounded-[28px] border border-[#ddd6fe] bg-[#ede9fe] p-8 shadow-sm flex flex-col justify-between">
            <div className="size-11 rounded-2xl bg-purple-200 text-purple-900 flex items-center justify-center font-bold mb-5">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                2-Week Agile Sprints &amp; Demos
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                Structured delivery cycles with sprint plannings, live staging preview links, and predictable delivery dates.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-200 text-xs font-bold text-purple-900">
              Continuous Progress
            </div>
          </div>

          {/* Block 5: Soft Rose Card Bottom-Right */}
          <div className="rounded-[28px] border border-[#fecdd3] bg-[#ffe4e6] p-8 shadow-sm flex flex-col justify-between">
            <div className="size-11 rounded-2xl bg-rose-200 text-rose-900 flex items-center justify-center font-bold mb-5">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                100% IP &amp; Source Code Ownership
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                Complete intellectual property handover. All Git repositories, Docker files, and design assets are strictly yours.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-200 text-xs font-bold text-rose-900">
              Zero Vendor Lock-In
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
