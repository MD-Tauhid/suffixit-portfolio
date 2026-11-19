"use client";

import { ShieldCheck, Zap, Lock, Headset, CheckCircle2 } from "lucide-react";
import { serviceContainer, serviceHeading } from "./service-styles";

interface GuaranteePillar {
  icon: typeof ShieldCheck;
  iconBg: string;
  iconColor: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  points: string[];
}

const guarantees: GuaranteePillar[] = [
  {
    icon: Lock,
    iconBg: "bg-[#eaf4fd]",
    iconColor: "#0072bc",
    title: "100% IP & Source Code Ownership",
    tagline: "Zero Vendor Lock-in",
    description:
      "All custom software, microservices, database schemas, and documentation become 100% your legal intellectual property. Full GitHub/GitLab repository transfer upon milestone completion.",
    badge: "100% Code Handover",
    points: ["Complete Git repository transfer", "No hidden proprietary runtime fees", "Comprehensive architectural docs"],
  },
  {
    icon: Zap,
    iconBg: "bg-[#fef3c7]",
    iconColor: "#d97706",
    title: "Sub-Second Latency & 60 FPS",
    tagline: "Rigorous Performance Budgets",
    description:
      "Every web app, API endpoint, and mobile screen is built to strict performance budgets: p99 latency under 28ms, lighthouse scores 95+, and 60fps butter-smooth native mobile scrolling.",
    badge: "< 28ms API Target",
    points: ["Optimized relational indexes", "Distributed Redis/Valkey cache", "Butter-smooth 60fps mobile UI"],
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-[#eafaf1]",
    iconColor: "#059669",
    title: "ISO 27001 Security & Tax Compliance",
    tagline: "Bank-Grade Protection",
    description:
      "Engineered under strict ISO 27001 information security governance. Automatic statutory compliance with NBR VAT 9.1, Mushak 6.3 auto-reconciliation, and AES-256 at-rest encryption.",
    badge: "ISO 27001 Certified",
    points: ["Automated NBR VAT 9.1 filing", "AES-256 database encryption", "Routine penetration audits"],
  },
  {
    icon: Headset,
    iconBg: "bg-[#f4effc]",
    iconColor: "#7c3aed",
    title: "24/7/365 Dedicated SLA Support",
    tagline: "Direct Engineering Access",
    description:
      "Direct line to senior infrastructure and software engineers through private Slack/WhatsApp channels and enterprise ticketing. 15-minute emergency response time for critical production alerts.",
    badge: "15-Min Critical Response",
    points: ["Direct senior engineer channel", "Automated synthetic uptime alarms", "Regular preventative health audits"],
  },
];

export default function ServicesGuarantees() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbfdff] via-[#f5f9fc] to-white py-20 md:py-28 border-b border-[#e5eef7]">
      <div className={serviceContainer}>
        {/* Header */}
        <div className="max-w-[740px]">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>Enterprise Quality Commitments</span>
          </div>
          <h2 className={`${serviceHeading} text-[#062b43]`}>
            Engineered with absolute accountability &amp;{" "}
            <em className="font-serif italic font-normal text-[#0072bc]">
              guaranteed standards.
            </em>
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] leading-[1.8] text-[#55697d]">
            Enterprise technology projects cannot afford hidden dependencies or ambiguous deliverables. We bind every client engagement with transparent SLAs, complete source code transparency, and statutory compliance.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#dce8f5] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#0072bc] hover:shadow-[0_20px_40px_-15px_rgba(0,114,188,0.15)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#f0f5fa]">
                    <span className={`grid size-10 place-items-center rounded-xl ${item.iconBg}`}>
                      <Icon size={20} style={{ color: item.iconColor }} />
                    </span>
                    <span className="font-mono text-[10.5px] font-bold text-[#0072bc] bg-[#f0f7fe] px-2.5 py-0.5 rounded-full border border-[#dbeaf8]">
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#638096]">
                      {item.tagline}
                    </span>
                    <h3 className="mt-1 text-base font-extrabold text-[#062b43] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-[12.5px] leading-[1.7] text-[#55697d]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-2 border-t border-[#f0f5fa] pt-4">
                    {item.points.map((p, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#425d73]">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

