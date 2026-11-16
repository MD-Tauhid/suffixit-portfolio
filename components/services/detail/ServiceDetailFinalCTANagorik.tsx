"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import type { Service } from "@/lib/services";

export default function ServiceDetailFinalCTANagorik({
  service,
}: {
  service: Service;
}) {
  return (
    <section className="relative !py-20 md:!py-28 bg-[#f8fafc] border-b border-slate-200/70 overflow-hidden">
      {/* Background ambient accents */}
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 size-[400px] rounded-full bg-sky-200/20 blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/4 size-[400px] rounded-full bg-amber-100/20 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] border border-slate-200 bg-white p-8 sm:p-12 lg:p-16 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/70 px-3.5 py-1 text-xs font-bold text-amber-800 mb-5">
                <Sparkles size={14} className="text-amber-600" />
                <span>Next-Generation Digital Flagships</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.1]">
                Ready to Scale Your{" "}
                <span className="text-[#0072bc]">{service.name}</span>?
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#334155] leading-relaxed max-w-xl">
                Eliminate checkout friction, automate multi-warehouse inventory, and guarantee sub-second page loads with Bangladesh&apos;s leading enterprise software team.
              </p>

              {/* Checkpoints */}
              <div className="mt-6 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Zero-downtime database and SEO-preserved migration</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Real-time MFS &amp; credit card gateway fallback routing</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Dedicated enterprise SLA with 24/7 mission-critical support</span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0072bc] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#005a96] shadow-lg shadow-[#0072bc]/25"
                >
                  <span>Schedule Architectural Review</span>
                  <ArrowUpRight size={17} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#facc15] px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-[#eab308] shadow-md shadow-amber-300/20"
                >
                  <Zap size={16} className="text-slate-900" />
                  <span>Talk to Solutions Team</span>
                </Link>
              </div>
            </div>

            {/* Right Media Collage */}
            <div className="relative">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 shadow-xl">
                <Image
                  src="/assets/services/service-dedicated-teams-collaboration.jpg"
                  alt="Suffix IT Team Collaboration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 backdrop-blur-md shadow-lg border border-white/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Enterprise Quality
                      </div>
                      <div className="text-sm font-black text-slate-900">
                        Zero Downtime Rollout
                      </div>
                    </div>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold border border-emerald-200">
                      <ShieldCheck size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Top Mini Card */}
              <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg border border-slate-100">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#0072bc]/10 text-[#0072bc]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500">Live Client Trust</div>
                  <div className="text-xs font-bold text-slate-900">50+ Enterprise Platforms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
