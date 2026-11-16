import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle, ShieldCheck } from "lucide-react";

export default function ProductDetailCTA({
  productName,
  tagline,
}: {
  productName: string;
  tagline?: string;
}) {
  return (
    <section className="relative overflow-hidden !py-20 md:!py-28 bg-gradient-to-r from-[#0072bc] via-[#0284c7] to-[#005a96] text-white">
      {/* Ambient background rings */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-[500px] rounded-full border-[60px] border-white/10 blur-xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 size-[400px] rounded-full bg-white/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-md mb-6">
          <Sparkles size={13} className="text-sky-200" />
          <span>Interactive Product Experience</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          See {productName} in action with your company&apos;s real workflows.
        </h2>

        <p className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          {tagline || "Bring your attendance policies, salary slabs, and integration questions. Our product specialists will prepare a customized sandbox environment."}
        </p>

        {/* Confidence tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-white/90">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-300" />
            <span>Interactive Live Sandbox</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-300" />
            <span>Zero-Disruption Data Migration</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-300" />
            <span>Local 24/7 SLA Support</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-between gap-3 min-h-[52px] px-8 py-3.5 rounded-full bg-white text-[#0072bc] hover:bg-sky-50 font-extrabold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            <span>Request a Tailored Demo</span>
            <span className="size-7 rounded-full bg-[#0072bc]/10 flex items-center justify-center text-[#0072bc]">
              <ArrowUpRight size={17} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
