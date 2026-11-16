"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Sparkles, Send } from "lucide-react";

export default function ServiceDetailLeadFormNagorik({
  serviceName,
}: {
  serviceName: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="lead-form" className="relative !py-24 md:!py-32 bg-gradient-to-br from-[#004e82] via-[#0072bc] to-[#0284c7] text-white overflow-hidden scroll-mt-12 border-b border-sky-400/30">
      {/* Radiant ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-40 right-10 size-[600px] rounded-full bg-white/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-10 size-[500px] rounded-full bg-[#facc15]/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#facc15] text-slate-950 px-3.5 py-1 text-xs font-black tracking-wider uppercase mb-5 shadow-sm">
              <Sparkles size={13} className="text-slate-950 fill-current" />
              <span>Book a Strategy Call</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Have an Idea?
              <br />
              <span className="text-[#facc15]">Let&apos;s Make it Happen.</span>
            </h2>

            <p className="mt-4 text-base text-white/90 leading-relaxed max-w-lg">
              Senior-Led Consultations. We analyze your store architecture, transaction velocity, and warehouse integrations to formulate an executable technical blueprint.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white/95">
                <CheckCircle2 size={16} className="text-[#facc15] shrink-0" />
                <span>Tailored Solutions for Your Specific Business Model</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white/95">
                <CheckCircle2 size={16} className="text-[#facc15] shrink-0" />
                <span>End-to-End Ownership, Implementation &amp; Transparency</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white/95">
                <CheckCircle2 size={16} className="text-[#facc15] shrink-0" />
                <span>Proven Production Track Record with Global &amp; Local Clients</span>
              </div>
            </div>

            {/* Advisor Profile */}
            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/25 bg-white/15 p-4 backdrop-blur-md max-w-md shadow-lg shadow-sky-950/20">
              <div className="relative size-12 overflow-hidden rounded-full border-2 border-[#facc15] shrink-0 bg-white/20">
                <Image
                  src="/assets/about/portrait-engineering.jpg"
                  alt="Enterprise Lead"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Md. Ashik Siddike</div>
                <div className="text-xs text-[#facc15] font-bold">VP International Solutions</div>
                <div className="text-[11px] text-white/80">solutions@suffixit.com • Dhaka, Bangladesh</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Lead Form Card */}
          <div className="rounded-[28px] bg-white p-7 sm:p-10 text-slate-900 shadow-2xl">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Consultation Requested!</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Our Senior Solutions Architect will review your specifications and contact you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0072bc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Lifestyle Ltd."
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0072bc] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0072bc] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1..."
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0072bc] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Project Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder={`Tell us about your ${serviceName} goals, current tech stack, and timeline...`}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0072bc] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#facc15] hover:bg-[#eab308] text-slate-950 font-extrabold py-3.5 text-xs sm:text-sm shadow-md shadow-amber-900/20 transition-all cursor-pointer"
                >
                  <span>Request Technical Proposal</span>
                  <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
