"use client";

import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import Icon from "@/components/ui/Icon";

export default function Products() {
  const [activeFilter, setActiveFilter] = useState<"all" | "enterprise" | "retail" | "specialized">("all");

  return (
    <section id="products" className="py-12 md:py-16 relative overflow-hidden bg-[#fafcfe]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#0072bc]/5 via-[#7c3aed]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-7 text-center max-w-2xl mx-auto">
          <SectionHeader
            eyebrow="Our products"
            text="Launch faster with battle-tested enterprise software we build, run and support ourselves."
          >
            Ready-made software, <em>proven</em> in the field
          </SectionHeader>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8">
          {[
            { id: "all", label: "All Products (9)" },
            { id: "enterprise", label: "Enterprise & ERP" },
            { id: "retail", label: "Field & Retail" },
            { id: "specialized", label: "Specialized & Comms" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-[#0072bc] text-white shadow-sm shadow-[#0072bc]/25 scale-105"
                  : "bg-white text-[#515978] border border-[#e1edf9] hover:border-[#0072bc]/40 hover:text-[#0072bc]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================
            SLEEK COMPACT 12-COLUMN BENTO GRID
            Row 1: 8 cols (FFMS Wide) + 4 cols (Rupantar HCM)
            Row 2: 4 cols (Smart POS) + 8 cols (Rupantar ERP Wide)
            Row 3: 4 cols (E-com) + 4 cols (PF) + 4 cols (Telecom)
            Row 4: 6 cols (Hotel) + 6 cols (Bulk SMS & Meeting)
           ======================================================== */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12"
          style={{
            rowGap: "20px",
            columnGap: "20px",
          }}
        >
          {/* ======================================================
              ROW 1, CARD 1: Field Force Management (FFMS) - 8 COLS
             ====================================================== */}
          {(activeFilter === "all" || activeFilter === "retail") && (
            <div className="lg:col-span-8 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-[#cfe2f7] bg-white/95 shadow-[0_4px_20px_rgba(0,114,188,0.06)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#0072bc]/40 hover:-translate-y-1">
              {/* Soft Ambient Radial Mesh + Masked Blueprint Grid */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(0, 114, 188, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 114, 188, 0.08) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 90%)",
                  WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 90%)",
                }}
              />
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-gradient-to-br from-[#0072bc]/10 to-[#38bdf8]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row gap-5 items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0072bc] text-white flex items-center justify-center shadow-sm">
                      <Icon name="map-pin" size={18} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Live GPS Telemetry
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#17162a] mb-1.5">
                    Field Force Management (FFMS)
                  </h3>
                  <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                    Real-time GPS tracking, biometric mobile attendance, instant order booking, and beat route analytics for your field force.
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {["Live Tracking", "Offline App", "Order Booking", "Beat Route Plans"].map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#f0f7fe] text-[#0072bc] border border-[#d2e4f7]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Interactive Telemetry Widget */}
                <div className="w-full md:w-60 bg-[#f8fbfe] border border-[#d2e4f7] rounded-xl p-3.5 shadow-inner flex flex-col gap-2.5 shrink-0">
                  <div className="flex items-center justify-between border-b border-[#e1edf9] pb-1.5">
                    <span className="text-[10px] font-bold text-[#17162a]">Active Telemetry</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-700">
                      99.2% GPS
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-black text-[#0072bc]">1,420 Reps Online</div>
                    <div className="text-[10px] text-[#515978]">Live tracking across 64 districts</div>
                  </div>
                  <div className="w-full bg-[#e1edf9] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0072bc] h-full w-[88%]" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-[#838fa6]">
                    <span>Orders: 8.4k Synced</span>
                    <span>Battery: 94%</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-4 border-t border-[#eaf2fb] flex items-center justify-between">
                <a
                  href="#fieldforce"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#0072bc] text-white hover:bg-[#005c99] transition-all shadow-sm group-hover:translate-x-1"
                >
                  <span>Request Live Demo</span>
                  <span>→</span>
                </a>
                <span className="text-[11px] text-[#838fa6] font-medium">Web &amp; Mobile App</span>
              </div>
            </div>
          )}

          {/* ======================================================
              ROW 1, CARD 2: Rupantar HCM - 4 COLS
             ====================================================== */}
          {(activeFilter === "all" || activeFilter === "enterprise") && (
            <div className="lg:col-span-4 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-[#e4d7fc] bg-white/95 shadow-[0_4px_20px_rgba(124,58,237,0.06)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#7c3aed]/40 hover:-translate-y-1">
              {/* Soft Ambient Mesh Glow + Micro-Dots */}
              <div
                className="absolute inset-0 pointer-events-none opacity-35"
                style={{
                  backgroundImage: "radial-gradient(rgba(124, 58, 237, 0.2) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                }}
              />
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-[#7c3aed]/10 to-[#a855f7]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#7c3aed] text-white flex items-center justify-center shadow-sm">
                    <Icon name="users" size={18} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/25 uppercase tracking-wider">
                    Enterprise HR
                  </span>
                </div>

                <h3 className="text-lg font-extrabold tracking-tight text-[#17162a] mb-1.5">
                  Rupantar HCM
                </h3>
                <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                  Employee lifecycle, biometric attendance integration, automated payroll, and mobile self-service.
                </p>

                <div className="p-2.5 rounded-xl bg-[#faf7fe] border border-[#ede5fc] flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[11px] font-bold text-[#17162a]">Biometric Sync</div>
                    <div className="text-[10px] text-[#7c3aed] font-semibold">09:00 AM · Ontime</div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700">
                    Auto Payroll
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["Payroll Engine", "Biometric Sync", "Tax Calculation"].map((t) => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f6f9fc] text-[#515978] border border-[#e5edf5]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-4 border-t border-[#f3ecfc] flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#f7f4fe] text-[#7c3aed] border border-[#e5d8fd] hover:bg-[#7c3aed] hover:text-white transition-all shadow-sm"
                >
                  <span>Request Demo</span>
                  <span>→</span>
                </a>
                <span className="text-[11px] text-[#838fa6] font-medium">Self-Service Portal</span>
              </div>
            </div>
          )}

          {/* ======================================================
              ROW 2, CARD 3: Smart POS & Billing - 4 COLS
             ====================================================== */}
          {(activeFilter === "all" || activeFilter === "retail") && (
            <div className="lg:col-span-4 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-[#faecd8] bg-white/95 shadow-[0_4px_20px_rgba(217,119,6,0.06)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#d97706]/40 hover:-translate-y-1">
              {/* Soft Amber Ambient Glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-[#d97706]/10 to-[#fbbf24]/10 rounded-full blur-2xl pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "radial-gradient(rgba(217, 119, 6, 0.2) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#d97706] text-white flex items-center justify-center shadow-sm">
                    <Icon name="receipt" size={18} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/25 uppercase tracking-wider">
                    Retail &amp; POS
                  </span>
                </div>

                <h3 className="text-lg font-extrabold tracking-tight text-[#17162a] mb-1.5">
                  Smart POS &amp; Billing
                </h3>
                <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                  Rapid barcode checkout with instant thermal receipt printing and daily multi-counter revenue reconciliation.
                </p>

                <div className="p-2.5 rounded-xl bg-[#fffbf5] border border-[#f5e4cc] flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[11px] font-bold text-[#17162a]">Barcode Scanner</div>
                    <div className="text-[10px] text-[#6a6980]">Receipt #2049</div>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800">
                    0.3s Checkout
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["Fast Barcode", "Thermal Printing", "Daily Ledger"].map((t) => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f6f9fc] text-[#515978] border border-[#e5edf5]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-4 border-t border-[#faeedc] flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#fff9f0] text-[#d97706] border border-[#fae5c7] hover:bg-[#d97706] hover:text-white transition-all shadow-sm"
                >
                  <span>Request Demo</span>
                  <span>→</span>
                </a>
                <span className="text-[11px] text-[#838fa6] font-medium">Offline Ready</span>
              </div>
            </div>
          )}

          {/* ======================================================
              ROW 2, CARD 4: Rupantar ERP Suite - 8 COLS WIDE
              (NEW LUXURY AMBIENT BACKGROUND & BALANCED DASHBOARD PREVIEW)
             ====================================================== */}
          {(activeFilter === "all" || activeFilter === "enterprise") && (
            <div className="lg:col-span-8 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-[#e4d7fc] bg-white/95 shadow-[0_4px_20px_rgba(124,58,237,0.06)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#7c3aed]/40 hover:-translate-y-1">
              {/* 
                PREMIUM REFINED BACKGROUND:
                - Soft violet-indigo dual ambient mesh glow
                - Delicate 18px square technical grid with soft vignette fade
                - Eliminates the harsh diamond/harlequin wallpaper completely
              */}
              <div className="absolute -top-16 -left-16 w-56 h-56 bg-gradient-to-br from-[#7c3aed]/12 via-[#6366f1]/8 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-tl from-[#a855f7]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-35"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(124, 58, 237, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 58, 237, 0.08) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 95%)",
                  WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 95%)",
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row gap-5 items-start justify-between">
                {/* Left Info Column */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#7c3aed] text-white flex items-center justify-center shadow-sm">
                      <Icon name="layers" size={18} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/25 uppercase tracking-wider">
                      Enterprise ERP
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0072bc]/10 text-[#0072bc] border border-[#0072bc]/25 uppercase tracking-wider">
                      Multi-Branch
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#17162a] mb-1.5">
                    Rupantar ERP Suite
                  </h3>
                  <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                    End-to-end supply chain, multi-warehouse inventory, procurement workflows, automated invoicing, and compliant accounting.
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {["Multi-Warehouse", "Sales & Billing", "Procurement", "Accounting Ledger"].map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#f8f5fe] text-[#7c3aed] border border-[#e4d7fc]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Rich Multi-Branch Ledger Widget (Fills Space Elegantly) */}
                <div className="w-full md:w-64 bg-[#fbf9fe] border border-[#e4d7fc] rounded-xl p-3.5 shadow-inner flex flex-col gap-2.5 shrink-0">
                  <div className="flex items-center justify-between border-b border-[#ede5fc] pb-1.5">
                    <span className="text-[10px] font-bold text-[#17162a]">Warehouse Stock Sync</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#7c3aed]/15 text-[#7c3aed]">
                      Live Sync
                    </span>
                  </div>

                  {/* 3 Active Hub Cards */}
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="p-1.5 rounded-lg bg-white border border-[#ede5fc]">
                      <div className="text-[9px] text-[#6a6980]">Dhaka HQ</div>
                      <div className="text-[11px] font-bold text-[#17162a]">4.8k SKU</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-[#ede5fc]">
                      <div className="text-[9px] text-[#6a6980]">CTG Port</div>
                      <div className="text-[11px] font-bold text-[#7c3aed]">2.4k SKU</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-[#ede5fc]">
                      <div className="text-[9px] text-[#6a6980]">Bogura Hub</div>
                      <div className="text-[11px] font-bold text-[#17162a]">1.1k SKU</div>
                    </div>
                  </div>

                  <div className="w-full bg-[#ede5fc] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#7c3aed] to-[#6366f1] h-full w-[92%]" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-[#838fa6]">
                    <span>GL Check: Pass ✓</span>
                    <span>NBR VAT: Ready</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-4 border-t border-[#f0e8fc] flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-all shadow-sm group-hover:translate-x-1"
                >
                  <span>Request ERP Demo</span>
                  <span>→</span>
                </a>
                <span className="text-[11px] text-[#838fa6] font-medium">Modular Architecture</span>
              </div>
            </div>
          )}

          {/* ======================================================
              ROW 3, CARD 5: Suffix E-commerce - 4 COLS
             ====================================================== */}
          {(activeFilter === "all" || activeFilter === "retail") && (
            <div className="lg:col-span-4 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-[#d6f5e8] bg-white/95 shadow-[0_4px_20px_rgba(5,150,105,0.06)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#059669]/40 hover:-translate-y-1">
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-[#059669]/10 to-[#10b981]/10 rounded-full blur-2xl pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "radial-gradient(rgba(5, 150, 105, 0.2) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#059669] text-white flex items-center justify-center shadow-sm">
                    <Icon name="shopping-cart" size={18} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#059669]/10 text-[#059669] border border-[#059669]/25 uppercase tracking-wider">
                    Digital Commerce
                  </span>
                </div>

                <h3 className="text-lg font-extrabold tracking-tight text-[#17162a] mb-1.5">
                  Suffix E-commerce
                </h3>
                <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                  Scalable online storefront with multi-currency cart, payment gateways, and automated order dispatch.
                </p>

                <div className="p-2.5 rounded-xl bg-[#f4fcf8] border border-[#cbeee0] flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold text-[#059669]">bKash / Nagad / Visa</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700">
                    Auto Dispatch
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["Payment Gateways", "Multi-Currency", "Stock Sync"].map((t) => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f6f9fc] text-[#515978] border border-[#e5edf5]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-4 border-t border-[#eaf7f0] flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#f2fbf7] text-[#059669] border border-[#c8f0e0] hover:bg-[#059669] hover:text-white transition-all shadow-sm"
                >
                  <span>Explore Store</span>
                  <span>→</span>
                </a>
                <span className="text-[11px] text-[#838fa6] font-medium">Cart &amp; Order Sync</span>
              </div>
            </div>
          )}

          {/* ======================================================
              ROW 3, CARD 6: Suffix Provident Fund - 4 COLS
             ====================================================== */}
          {(activeFilter === "all" || activeFilter === "enterprise") && (
            <div className="lg:col-span-4 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-[#d2e4f7] bg-white/95 shadow-[0_4px_20px_rgba(3,105,161,0.06)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#0369a1]/40 hover:-translate-y-1">
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-[#0369a1]/10 to-[#0284c7]/10 rounded-full blur-2xl pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(3, 105, 161, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(3, 105, 161, 0.08) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 90%)",
                  WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 90%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0369a1] text-white flex items-center justify-center shadow-sm">
                    <Icon name="landmark" size={18} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0369a1]/10 text-[#0369a1] border border-[#0369a1]/25 uppercase tracking-wider">
                    Financial Trust
                  </span>
                </div>

                <h3 className="text-lg font-extrabold tracking-tight text-[#17162a] mb-1.5">
                  Suffix Provident Fund
                </h3>
                <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                  Transparent member ledgers, automated interest compounding, loan approvals, and statutory audit compliance.
                </p>

                <div className="p-2.5 rounded-xl bg-[#f0f8fd] border border-[#cee6f9] flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[11px] font-bold text-[#17162a]">Member Ledgers</div>
                    <div className="text-[10px] text-[#0369a1] font-semibold">Auto Compounding</div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-800">
                    Audit Ready
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["Member Portal", "Loan Approvals", "Statutory Reports"].map((t) => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f6f9fc] text-[#515978] border border-[#e5edf5]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-4 border-t border-[#edf5fc] flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#f0f8fd] text-[#0369a1] border border-[#cee6f9] hover:bg-[#0369a1] hover:text-white transition-all shadow-sm"
                >
                  <span>Request Demo</span>
                  <span>→</span>
                </a>
                <span className="text-[11px] text-[#838fa6] font-medium">Audit Ready</span>
              </div>
            </div>
          )}

          {/* ======================================================
              ROW 3, CARD 7: Telecom Interconnect Billing - 4 COLS
             ====================================================== */}
          {(activeFilter === "all" || activeFilter === "specialized") && (
            <div className="lg:col-span-4 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-[#cfeaf9] bg-white/95 shadow-[0_4px_20px_rgba(8,145,178,0.06)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#0891b2]/40 hover:-translate-y-1">
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-[#0891b2]/10 to-[#0284c7]/10 rounded-full blur-2xl pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "radial-gradient(rgba(8, 145, 178, 0.2) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0891b2] text-white flex items-center justify-center shadow-sm">
                    <Icon name="radio-tower" size={18} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0891b2]/10 text-[#0891b2] border border-[#0891b2]/25 uppercase tracking-wider">
                    Telco Scale
                  </span>
                </div>

                <h3 className="text-lg font-extrabold tracking-tight text-[#17162a] mb-1.5">
                  Interconnect Billing
                </h3>
                <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                  High-performance CDR rating engine handling billions of records, voice and SMS traffic, and carrier settlements.
                </p>

                <div className="p-2.5 rounded-xl bg-[#f0faff] border border-[#cbebfb] flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[11px] font-bold text-[#17162a]">Billions of CDRs</div>
                    <div className="text-[10px] text-[#0891b2] font-semibold">High-Throughput</div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-800">
                    Carrier Settle
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["CDR Engine", "Carrier Invoicing", "Telco Rating"].map((t) => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f6f9fc] text-[#515978] border border-[#e5edf5]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-4 border-t border-[#edf8fd] flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#f0faff] text-[#0891b2] border border-[#cbebfb] hover:bg-[#0891b2] hover:text-white transition-all shadow-sm"
                >
                  <span>Request Demo</span>
                  <span>→</span>
                </a>
                <span className="text-[11px] text-[#838fa6] font-medium">Telco Grade</span>
              </div>
            </div>
          )}

          {/* ======================================================
              ROW 4, CARD 8: Hotel Booking System - 6 COLS WIDE
             ====================================================== */}
          {(activeFilter === "all" || activeFilter === "specialized") && (
            <div className="lg:col-span-6 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-[#fedfd2] bg-white/95 shadow-[0_4px_20px_rgba(234,88,12,0.06)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#ea580c]/40 hover:-translate-y-1">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#ea580c]/10 to-[#f97316]/10 rounded-full blur-2xl pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "radial-gradient(rgba(234, 88, 12, 0.2) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                }}
              />

              <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shadow-sm">
                      <Icon name="hotel" size={18} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/25 uppercase tracking-wider">
                      Hospitality
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold tracking-tight text-[#17162a] mb-1.5">
                    Hotel Booking System
                  </h3>
                  <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                    Interactive room reservation calendar, front-desk check-in/out workflows, and restaurant POS billing.
                  </p>
                </div>

                <div className="w-full sm:w-44 bg-[#fff6f0] border border-[#fedccb] rounded-xl p-2.5 flex flex-col gap-1 shrink-0 self-center">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#17162a]">
                    <span>Occupancy</span>
                    <span className="text-[#ea580c]">92% Full</span>
                  </div>
                  <div className="text-[11px] font-extrabold text-[#ea580c]">Room Calendar POS</div>
                  <div className="text-[9px] text-[#515978]">Housekeeping &amp; Bill Sync</div>
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-4 border-t border-[#fdf2ec] flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#fff6f0] text-[#ea580c] border border-[#fedccb] hover:bg-[#ea580c] hover:text-white transition-all shadow-sm"
                >
                  <span>Request Demo</span>
                  <span>→</span>
                </a>
                <span className="text-[11px] text-[#838fa6] font-medium">Room Calendar</span>
              </div>
            </div>
          )}

          {/* ======================================================
              ROW 4, CARD 9: Bulk SMS & Web Meeting - 6 COLS WIDE
             ====================================================== */}
          {(activeFilter === "all" || activeFilter === "specialized") && (
            <div className="lg:col-span-6 group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-[#c4efdc] bg-white/95 shadow-[0_4px_20px_rgba(22,163,74,0.06)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#16a34a]/40 hover:-translate-y-1">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#16a34a]/10 to-[#10b981]/10 rounded-full blur-2xl pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "radial-gradient(rgba(22, 163, 74, 0.2) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 90%)",
                }}
              />

              <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#16a34a] text-white flex items-center justify-center shadow-sm">
                      <Icon name="message-square" size={18} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/25 uppercase tracking-wider">
                      Comms &amp; Video
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold tracking-tight text-[#17162a] mb-1.5">
                    Bulk SMS &amp; Web Meeting
                  </h3>
                  <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                    Telecom SMS gateway API for transactional OTPs and campaigns, paired with WebRTC HD video conference rooms.
                  </p>
                </div>

                <div className="w-full sm:w-44 bg-[#f0fbf4] border border-[#c3edd3] rounded-xl p-2.5 flex flex-col gap-1 shrink-0 self-center">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#17162a]">
                    <span>SMS Gateway</span>
                    <span className="text-[#16a34a]">99.9% OTP</span>
                  </div>
                  <div className="text-[11px] font-extrabold text-[#16a34a]">WebRTC Rooms</div>
                  <div className="text-[9px] text-[#515978]">End-to-End Encrypted</div>
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-4 border-t border-[#eaf7f0] flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#f0fbf4] text-[#16a34a] border border-[#c3edd3] hover:bg-[#16a34a] hover:text-white transition-all shadow-sm"
                >
                  <span>Request Demo</span>
                  <span>→</span>
                </a>
                <span className="text-[11px] text-[#838fa6] font-medium">High-Speed OTP</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
