"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Database,
  Server,
  Terminal,
  Workflow,
} from "lucide-react";

export default function EnterpriseCustomizationBento() {
  const pillars = [
    {
      icon: Workflow,
      title: "Custom Business Logic & Slabs",
      lead: "We tailor approval hierarchies, multi-currency ledgers, and NBR statutory tax calculations around your exact SOPs.",
      tech: "Configurable Rule Engines",
    },
    {
      icon: Cpu,
      title: "Direct Hardware Interfacing",
      lead: "Native TCP/IP and serial device drivers for ZKTeco biometric timeclocks, ESC/POS thermal printers, and barcode scanners.",
      tech: "Sub-50ms Hardware Drivers",
    },
    {
      icon: Database,
      title: "Bank & ERP Gateways",
      lead: "Seamless electronic disbursement via BEFTN/NPSB across all 60+ scheduled banks, with two-way sync to SAP, Oracle, or Tally.",
      tech: "Automated General Ledger Sync",
    },
    {
      icon: Server,
      title: "Deployment Sovereignty",
      lead: "Choose between fully managed Cloud SaaS or air-gapped On-Premise installation inside your corporate DMZ with 100% data ownership.",
      tech: "Private Cloud & Air-Gapped",
    },
  ];

  return (
    <section className="relative overflow-hidden !py-20 md:!py-28 bg-[#f8fbff] border-t border-b border-sky-100/80 text-[#0f172a]">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[600px] rounded-full bg-gradient-to-br from-sky-200/40 via-blue-100/25 to-transparent blur-[120px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-blue-100/30 blur-[100px] -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0072bc]/20 bg-[#eef7ff] px-3.5 py-1 text-xs font-bold text-[#0072bc] shadow-xs mb-4">
            <Terminal size={13} className="text-[#0072bc]" />
            <span>Enterprise Customization Framework</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0f172a] leading-[1.12]">
            Turnkey software platforms.
            <br />
            <span className="text-[#0072bc]">
              Tailored to your exact business rules.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-[17px] text-[#475569] leading-relaxed max-w-2xl">
            No two enterprise organizations operate identically. We adapt our software platforms to integrate with your existing ERP, biometric hardware, and statutory accounting workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-[24px] border border-slate-200/90 bg-white p-7 shadow-[0_4px_20px_-4px_rgba(0,35,75,0.05)] hover:shadow-[0_16px_35px_-8px_rgba(0,114,188,0.14)] hover:border-[#0072bc]/35 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-[#eef7ff] text-[#0072bc] border border-sky-200/70 group-hover:bg-[#0072bc] group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-[#0072bc] bg-[#f0f7ff] px-2.5 py-0.5 rounded-full border border-sky-200/60 font-semibold">
                      {p.tech}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f172a] tracking-tight group-hover:text-[#0072bc] transition-colors">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                    {p.lead}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    <span>Production Ready</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-400 group-hover:text-[#0072bc] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Strip */}
        <div className="mt-14 rounded-[24px] border border-sky-200/80 bg-gradient-to-r from-[#f0f7ff] via-white to-sky-50/50 p-7 sm:p-9 shadow-[0_12px_35px_-8px_rgba(0,114,188,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0072bc]">
              Need custom ERP or API adaptation?
            </div>
            <div className="text-xl font-bold text-[#0f172a] mt-1">
              Discuss your company&apos;s workflows with our principal architects.
            </div>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Fast technical scoping, direct engineering alignment, and transparent feasibility review within 24 hours.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0072bc] text-white hover:bg-[#005a96] px-7 py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-[#0072bc]/25 transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Request Architecture Consultation</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
