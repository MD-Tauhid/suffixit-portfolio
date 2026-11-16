import React from "react";
import { Users, Cpu, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ProductDetailTeamNagorik({
  productName,
}: {
  productName: string;
}) {
  return (
    <section className="relative !py-20 md:!py-28 bg-[#f8fbff] text-slate-900 border-b border-sky-100 overflow-hidden">
      {/* Subtle ambient light */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 size-[400px] rounded-full bg-sky-200/30 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Users size={13} className="text-[#0072bc]" />
            <span>Dedicated Engineering &amp; Advisory Teams</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
            Meet the Team Behind Our Delivery
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#475569]">
            Specialists across business logic, systems integration, and enterprise software engineering.
          </p>
        </div>

        {/* 2 Large Clean White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-[24px] border border-slate-200/90 bg-white p-8 shadow-sm hover:shadow-xl hover:shadow-sky-100/60 hover:border-[#0072bc]/40 transition-all">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-[#0072bc] border border-sky-200 mb-5">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
              Expert Software Architects &amp; Integration Engineers
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
              Specialized in high-throughput enterprise engines, hardware device interfacing, and robust multi-branch database replication. We ensure your platforms withstand high-concurrency peak demands with zero downtime.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">Biometric Protocol Engineering</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">BEFTN Bank Integration</span>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200/90 bg-white p-8 shadow-sm hover:shadow-xl hover:shadow-sky-100/60 hover:border-[#0072bc]/40 transition-all">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 mb-5">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
              Business Analysts &amp; Statutory Compliance Advisors
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
              Our consultants deeply understand Bangladesh labor laws, NBR tax schedules, provident fund governance, and auditable accounting standards—translating complex compliance requirements directly into software rules.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">NBR 2024-25 Tax Slabs</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Labor Law Audit Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
