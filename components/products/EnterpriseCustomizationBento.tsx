"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Globe2,
  Layers,
  Lock,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import { servicePalette } from "@/lib/service-palette";
import { serviceButton, serviceContainer, serviceHeading } from "@/components/services/service-styles";

export default function EnterpriseCustomizationBento() {
  return (
    <section
      className="relative overflow-hidden !py-20 md:!py-28"
      style={{ backgroundColor: servicePalette.mint }}
    >
      {/* Background Decorative Rings */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-[500px] rounded-full border-[60px] border-white/40 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 size-[400px] rounded-full bg-white/30 blur-3xl"
        aria-hidden="true"
      />

      <div className={serviceContainer}>
        {/* Section Header */}
        <div className="mb-14 max-w-[820px]" data-service-stagger>
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-emerald-800/20 bg-white/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md">
            <Workflow size={14} />
            <span>Tailored Enterprise Configuration & Systems Integration</span>
          </div>
          <h2 className={serviceHeading}>
            A ready product is only
            <br />
            <span className="text-emerald-800">the starting foundation.</span>
          </h2>
          <p className="mt-4 text-sm leading-[1.85] text-[#17162a]/75 md:text-[15px]">
            Every business carries unique approval hierarchies, ledger structures, and field operational
            rules. Suffix IT software is architected with modular REST and gRPC APIs to seamlessly bridge
            with your existing legacy databases, enterprise ERPs, or proprietary hardware peripherals.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Bento Card 1: API Gateway & Microservices (Spans 2 columns on lg) */}
          <div
            className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-solid border-emerald-900/10 bg-white/95 p-7 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl sm:p-9 lg:col-span-2"
            data-service-stagger
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <Terminal size={13} />
                  <span>Modular API Gateway v2</span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-100/70 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 font-mono">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LATENCY &lt; 12ms
                </span>
              </div>

              <h3 className="mt-5 text-[24px] font-bold tracking-tight text-[#17162a] sm:text-[28px]">
                High-Concurrency API Mesh & Middleware
              </h3>
              <p className="mt-2 text-xs leading-[1.85] text-[#17162a]/75 sm:text-[13px]">
                Connect Suffix IT platforms to third-party ERPs (SAP, Oracle, Odoo), custom web portals,
                and CRM applications with secured webhook triggers and double-entry validation.
              </p>

              {/* Simulated API Console Mesh */}
              <div className="my-6 overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#0f172a] p-4 text-[11px] font-mono text-emerald-400 shadow-inner">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2.5 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-rose-500" />
                    <span className="size-2 rounded-full bg-amber-500" />
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="ml-1 text-gray-300">suffix-gateway.mesh.internal</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">200 OK • TLS 1.3</span>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-gray-300">
                    <span className="text-blue-400">POST /api/v2/inventory/sync</span>
                    <span className="text-emerald-400">Tejgaon Hub → 42,000 units verified</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span className="text-purple-400">GET /api/v2/telemetry/gps-beat</span>
                    <span className="text-emerald-400">Agent #804 • Geofence Locked (24m)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span className="text-amber-400">POST /api/v2/payroll/beftn-advice</span>
                    <span className="text-emerald-400">NBR Formatted • ৳ 14.8M Scheduled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Microservice Highlights */}
            <div className="grid grid-cols-3 gap-3 border-t border-emerald-900/10 pt-5 text-center">
              <div>
                <div className="text-base font-black text-emerald-700 sm:text-lg">99.99%</div>
                <div className="text-[10px] text-[#17162a]/60">Uptime SLA</div>
              </div>
              <div>
                <div className="text-base font-black text-emerald-700 sm:text-lg">AES-256</div>
                <div className="text-[10px] text-[#17162a]/60">Data Encryption</div>
              </div>
              <div>
                <div className="text-base font-black text-emerald-700 sm:text-lg">Zero-Loss</div>
                <div className="text-[10px] text-[#17162a]/60">Offline Sync</div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Legacy Migration & Database Connectors */}
          <div
            className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-solid border-emerald-900/10 bg-white/95 p-7 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl sm:p-8"
            data-service-stagger
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[var(--br)]">
                <Database size={13} />
                <span>Zero-Downtime Migration</span>
              </div>

              <h3 className="mt-5 text-[22px] font-bold tracking-tight text-[#17162a]">
                Legacy DB & ERP Bridge
              </h3>
              <p className="mt-2 text-xs leading-[1.8] text-[#17162a]/70">
                Seamless data migration from legacy SQL Server, Oracle, MySQL, or FoxPro systems with
                automated schema reconciliation.
              </p>

              <div className="my-5 flex flex-wrap gap-2">
                {["PostgreSQL", "MSSQL", "Oracle", "MySQL", "Cloud SQL", "SQLite"].map((db) => (
                  <span
                    key={db}
                    className="rounded-lg border border-gray-200 bg-[#f8fbfe] px-2.5 py-1 text-[11px] font-mono font-medium text-[#17162a]/80"
                  >
                    {db}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 text-xs text-[#17162a]/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Dual-write validation during transition</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Automated checksum balance audits</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-emerald-50/70 p-3 text-[11px] text-emerald-800">
              <span className="font-bold">Guaranteed Continuity:</span> Operations continue uninterrupted
              throughout rollout.
            </div>
          </div>

          {/* Bento Card 3: Custom Hardware & IoT Bridges */}
          <div
            className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-solid border-emerald-900/10 bg-white/95 p-7 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl sm:p-8"
            data-service-stagger
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
                <Cpu size={13} />
                <span>Hardware & Peripherals</span>
              </div>

              <h3 className="mt-5 text-[22px] font-bold tracking-tight text-[#17162a]">
                Biometric & POS Hardware Integration
              </h3>
              <p className="mt-2 text-xs leading-[1.8] text-[#17162a]/70">
                Plug-and-play drivers and network bridges for real-world devices across retail stores,
                factories, and distributed depots.
              </p>

              <div className="mt-5 space-y-2.5 text-xs text-[#17162a]/80">
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-2.5">
                  <span className="font-semibold">ZKTeco Biometric Timeclocks</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">IP Ready</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-2.5">
                  <span className="font-semibold">Honeywell & Datalogic Scanners</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">&lt; 50ms</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-2.5">
                  <span className="font-semibold">ESC/POS Thermal Receipt Printers</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">Auto-Cut</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-2.5">
                  <span className="font-semibold">Modbus RTU & Substation Sensors</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">SCADA</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-[11px] text-[#17162a]/60">
              <span>Hardware-agnostic architecture</span>
              <ShieldCheck size={14} className="text-emerald-600" />
            </div>
          </div>

          {/* Bento Card 4: Enterprise Walkthrough & Architectural Advisory (Spans 2 cols on lg) */}
          <div
            className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-solid border-emerald-900/10 bg-white/95 p-7 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl sm:p-9 lg:col-span-2"
            data-service-stagger
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                  <Clock size={13} />
                  <span>45-Minute Discovery Session</span>
                </div>
                <span className="rounded-full bg-emerald-100/70 px-3 py-1 text-[11px] font-semibold text-emerald-800">
                  ISO 27001 Governed Architecture
                </span>
              </div>

              <h3 className="mt-5 text-[24px] font-bold tracking-tight text-[#17162a] sm:text-[28px]">
                Schedule an Enterprise Architectural Walkthrough
              </h3>
              <p className="mt-2 text-xs leading-[1.85] text-[#17162a]/75 sm:text-[13px]">
                Meet directly with our senior software architects to review your current tech infrastructure,
                estimate migration feasibility, and map custom product workflows.
              </p>

              {/* Walkthrough Pillars Checklist */}
              <div className="my-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Tailored approval hierarchy mapping",
                  "Legacy database migration feasibility",
                  "Dedicated on-premise or multi-AZ cloud hosting",
                  "Statutory tax (NBR) and audit compliance",
                  "Hardware peripheral gateway configuration",
                  "24/7 Enterprise SLA & engineering support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-[#17162a]/85">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={11} strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-900/10 pt-5">
              <div className="text-xs text-[#17162a]/70">
                <span className="font-bold text-[#17162a]">NDA-ready:</span> Full confidentiality guaranteed
                prior to technical discovery.
              </div>
              <Link
                href="/contact"
                className={`${serviceButton} shadow-md`}
              >
                <span>Schedule Enterprise Walkthrough</span>
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

