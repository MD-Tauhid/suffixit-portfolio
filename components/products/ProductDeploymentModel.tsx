import React from "react";
import { Cloud, Server, Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ProductMediaConfig } from "./productDataMap";

export default function ProductDeploymentModel({
  mediaConfig,
  productName,
}: {
  mediaConfig: ProductMediaConfig;
  productName: string;
}) {
  return (
    <section className="relative !py-20 md:!py-28 bg-[#f4f8fb] border-b border-slate-200/60">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0072bc] mb-2.5">
            <span className="size-2 rounded-full bg-[#0072bc]" />
            <span>Infrastructure Freedom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062033] tracking-tight leading-[1.15]">
            Deploy where you want.
            <br />
            <span className="bg-gradient-to-r from-[#0072bc] to-[#38bdf8] bg-clip-text text-transparent">
              Cloud SaaS or On-Premise.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#17162a]/70 leading-relaxed">
            Choose the deployment architecture that conforms with your organization&apos;s data residency, IT governance, and budget requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Cloud Managed Option */}
          <div className="rounded-[26px] border border-slate-200/80 bg-white p-8 sm:p-10 shadow-md hover:border-[#0072bc]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-100/70 text-[#0072bc]">
                  <Cloud size={24} />
                </div>
                <span className="rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-[#0072bc]">
                  Zero Maintenance
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#062033] tracking-tight">
                Managed Cloud SaaS
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#17162a]/70 leading-relaxed">
                Instant turnkey access with all maintenance, backups, and statutory compliance updates handled by Suffix IT.
              </p>

              <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
                {mediaConfig.deploymentSpecs.cloud.map((spec) => (
                  <div key={spec} className="flex items-center gap-2.5 text-xs font-medium text-[#062033]">
                    <Check size={15} className="shrink-0 text-[#0072bc]" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 py-3 text-xs font-bold text-[#0072bc] transition-colors"
              >
                <span>Inquire About Cloud Plans</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* On-Premise Enterprise Option */}
          <div className="rounded-[26px] border border-slate-200/80 bg-white p-8 sm:p-10 shadow-md hover:border-[#0072bc]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
                  <Server size={24} />
                </div>
                <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700">
                  Perpetual Ownership
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#062033] tracking-tight">
                On-Premise Private Cloud
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#17162a]/70 leading-relaxed">
                Deploy inside your corporate data center with full database access, air-gapped security, and zero external dependency.
              </p>

              <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
                {mediaConfig.deploymentSpecs.onPremise.map((spec) => (
                  <div key={spec} className="flex items-center gap-2.5 text-xs font-medium text-[#062033]">
                    <Check size={15} className="shrink-0 text-emerald-600" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#062033] hover:bg-[#0072bc] text-white py-3 text-xs font-bold transition-colors"
              >
                <span>Request Enterprise On-Prem License</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
