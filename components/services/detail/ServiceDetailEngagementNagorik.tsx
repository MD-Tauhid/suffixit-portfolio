"use client";

import React from "react";
import Link from "next/link";
import { Users, Code, Zap, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ServiceDetailEngagementNagorik() {
  const models = [
    {
      icon: Users,
      badge: "Full Team",
      bg: "bg-sky-50 text-[#0072bc] border-sky-200",
      title: "Dedicated E-Commerce Pod",
      desc: "An autonomous, senior-led squad comprising a technical project manager, front-end lead, backend engineer, and dedicated QA tester assigned exclusively to your brand.",
      points: [
        "100% dedicated allocation",
        "Direct daily standups & sprint reviews",
        "Seamless scale-up or scale-down",
      ],
    },
    {
      icon: Code,
      badge: "Team Extension",
      bg: "bg-purple-50 text-purple-600 border-purple-200",
      title: "Staff Augmentation",
      desc: "Instantly inject pre-vetted senior Next.js, Shopify Plus, or backend specialists directly into your existing engineering hierarchy to clear backlog items fast.",
      points: [
        "Plug-and-play onboarding within 5 business days",
        "Works within your Git repositories & Jira",
        "Time & Material transparent billing",
      ],
    },
    {
      icon: Zap,
      badge: "Turnkey",
      bg: "bg-amber-50 text-amber-600 border-amber-200",
      title: "Fixed-Scope Flagship Build",
      desc: "Complete end-to-end platform delivery from technical architecture blueprint to Figma design system, backend engineering, testing, and production deployment.",
      points: [
        "Guaranteed delivery milestone schedules",
        "Clear upfront itemized pricing",
        "Complete 60-day post-launch warranty",
      ],
    },
    {
      icon: Clock,
      badge: "Continuous Growth",
      bg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      title: "SLA & Conversion Retainer",
      desc: "Ongoing post-deployment partnership focusing on continuous conversion rate optimization (CRO), A/B testing, quarterly security audits, and 24/7 uptime monitoring.",
      points: [
        "Guaranteed 1-hour critical emergency response",
        "Continuous performance & SEO audits",
        "Monthly feature enhancement sprints",
      ],
    },
  ];

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3">
            <Zap size={12} className="text-[#0072bc]" />
            <span>Collaboration Freedom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            How It Works: 4 Flexible Engagement Models
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            Tailored engagement structures that fit your development lifecycle, organizational budget, and time-to-market demands.
          </p>
        </div>

        {/* 4 Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="rounded-[24px] border border-slate-200/90 bg-white p-7 shadow-sm hover:shadow-xl hover:shadow-sky-100/60 hover:border-[#0072bc]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex size-11 items-center justify-center rounded-2xl border ${m.bg}`}>
                      <Icon size={20} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f172a] tracking-tight mb-2.5">
                    {m.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-6">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {m.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dual CTA Buttons */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0072bc] hover:bg-[#005a96] text-white px-7 py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-[#0072bc]/25 transition-all cursor-pointer"
          >
            <span>Request Custom Proposal</span>
            <ArrowUpRight size={15} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#facc15] hover:bg-[#eab308] text-slate-950 px-7 py-3.5 text-xs sm:text-sm font-extrabold shadow-sm transition-all cursor-pointer"
          >
            <span>Schedule Discovery Call</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
