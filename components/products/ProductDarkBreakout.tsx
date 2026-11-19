"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldAlert,
  Lock,
  History,
  HardDriveDownload,
  Server,
  Cpu,
  ArrowUpRight,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import type { ProductMediaConfig } from "./productDataMap";

export default function ProductDarkBreakout({
  productName,
  mediaConfig,
}: {
  productName: string;
  mediaConfig: ProductMediaConfig;
}) {
  const securityPillars = [
    {
      icon: Lock,
      title: "Bank-Grade Cryptography",
      description:
        "All employee compensation records, tax files, and bank accounts are encrypted with AES-256 at rest and TLS 1.3 in transit.",
      badge: "AES-256 / TLS 1.3",
    },
    {
      icon: History,
      title: "Immutable Change Ledgers",
      description:
        "Every single salary adjustment, overtime revision, and tax concession logs user ID, IP address, and previous vs new value.",
      badge: "Zero Tampering",
    },
    {
      icon: Server,
      title: "Multi-Branch Concurrency",
      description:
        "Engineered for distributed enterprises. Process attendance, shifts, and disbursements across 50+ regional hubs simultaneously.",
      badge: "< 50ms Latency",
    },
    {
      icon: HardDriveDownload,
      title: "Zero-Downtime Disaster Recovery",
      description:
        "Automated hourly geo-replicated backups with rapid point-in-time recovery to guarantee zero loss of financial transaction history.",
      badge: "99.99% Uptime",
    },
  ];

  return (
    <section className="relative overflow-hidden !py-24 md:!py-32 bg-[#061424] text-white">
      {/* High-tech luminous ambient gradients */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[600px] rounded-full bg-gradient-to-br from-[#0072bc]/25 via-[#38bdf8]/15 to-transparent blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-emerald-500/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-3.5 py-1 text-xs font-bold text-sky-300 shadow-sm backdrop-blur-md mb-4">
            <Terminal size={13} className="text-sky-400" />
            <span>High-Assurance Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]">
            Why enterprise financial leaders
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-[#38bdf8] to-emerald-400 bg-clip-text text-transparent">
              run on Suffix IT platforms.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-[17px] text-slate-300/80 leading-relaxed max-w-2xl">
            Financial calculations and employee data demand bulletproof integrity. Our architecture eliminates data tampering, automates NBR tax reconciliation, and delivers sub-second execution at scale.
          </p>
        </div>

        {/* 2-Column Architectural Showcase */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1.1fr] lg:gap-16">
          {/* Left: 3D Architectural Blueprint Graphic */}
          <div className="relative group">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[24px] border border-sky-500/30 bg-slate-900/90 shadow-[0_20px_60px_-15px_rgba(0,114,188,0.35)] backdrop-blur-md">
              <Image
                src={mediaConfig.architectureImage}
                alt={`${productName} architecture diagram`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061424] via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Bottom live status HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/80 p-3 text-xs backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-emerald-400">SOC-2 READY PROTOCOL</span>
                </div>
                <div className="text-slate-400 font-mono">ENCRYPTED SHARDING</div>
              </div>
            </div>
          </div>

          {/* Right: 4 Security & Resiliency Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.07] hover:border-sky-400/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      <Icon size={18} />
                    </div>
                    <span className="rounded-full bg-sky-950/70 border border-sky-500/30 px-2.5 py-0.5 text-[10px] font-bold text-sky-300">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-300/75">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hardware & Bank Gateway Connectors Strip */}
        <div className="mt-16 rounded-[22px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Ecosystem Interoperability
              </div>
              <div className="text-lg font-bold text-white mt-1">
                Plug into your existing hardware &amp; financial institutions
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {mediaConfig.hardwareIntegrations.map((hw) => (
                <span
                  key={hw}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/20 bg-sky-950/60 px-3.5 py-1.5 text-xs font-semibold text-sky-200"
                >
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>{hw}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
