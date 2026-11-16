"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Database,
  Lock,
  Server,
  Terminal,
  Workflow,
  Zap,
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
    <section className="relative overflow-hidden !py-24 md:!py-32 bg-[#061424] text-white">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[600px] rounded-full bg-gradient-to-br from-[#0072bc]/25 via-[#38bdf8]/15 to-transparent blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-emerald-500/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-3.5 py-1 text-xs font-bold text-sky-300 shadow-sm backdrop-blur-md mb-4">
            <Terminal size={13} className="text-sky-400" />
            <span>Enterprise Customization Framework</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]">
            Turnkey software platforms.
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-[#38bdf8] to-emerald-400 bg-clip-text text-transparent">
              Tailored to your exact business rules.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-[17px] text-slate-300/80 leading-relaxed max-w-2xl">
            No two enterprise organizations operate identically. We adapt our software platforms to integrate with your existing ERP, biometric hardware, and statutory accounting workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-[22px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md hover:bg-white/[0.07] hover:border-sky-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-400/20">
                      {p.tech}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-[13px] text-slate-300/75 leading-relaxed">
                    {p.lead}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 size={13} />
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Strip */}
        <div className="mt-14 rounded-[24px] border border-white/10 bg-white/[0.03] p-7 sm:p-9 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Need custom ERP or API adaptation?
            </div>
            <div className="text-xl font-bold text-white mt-1">
              Discuss your company&apos;s workflows with our principal architects.
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0072bc] hover:bg-sky-50 px-6 py-3 text-xs sm:text-sm font-bold shadow-lg transition-all"
          >
            <span>Request System Architecture Consultation</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
