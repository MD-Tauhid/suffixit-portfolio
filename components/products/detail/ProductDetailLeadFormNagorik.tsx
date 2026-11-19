"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, CheckCircle2, Sparkles, Send } from "lucide-react";

export default function ProductDetailLeadFormNagorik({
  productName,
}: {
  productName: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    details: "",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const formY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [40, 0, -25]);
  const formScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.95, 1, 0.98]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="consultation-form"
      ref={sectionRef}
      className="relative !py-24 md:!py-32 bg-[#f8fbff] text-[#0f172a] overflow-hidden scroll-mt-12 border-b border-sky-100"
    >
      {/* Radiant ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 right-10 size-[600px] rounded-full bg-gradient-to-br from-sky-200/40 via-blue-100/20 to-transparent blur-[130px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-gradient-to-tr from-sky-100/50 to-transparent blur-[120px] -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
          {/* Left Column: Enters from Left Side (2-side pinch entry) */}
          <motion.div
            initial={{ opacity: 0, x: -85 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-sky-200/80 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-5 shadow-xs">
              <Sparkles size={13} className="text-[#0072bc]" />
              <span>Book a Free Consultation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.12]">
              Have an Idea?
              <br />
              <span className="text-[#0072bc]">Let&apos;s Make it Happen.</span>
            </h2>

            <p className="mt-4 text-base text-[#475569] leading-relaxed max-w-lg">
              Strategic, Senior-Led Engagements. We analyze your company&apos;s existing software, data sources, and workforce requirements to design the optimal rollout.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 size={16} className="text-[#0072bc] shrink-0" />
                <span>Tailored Solutions for Your Specific Business Structure</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 size={16} className="text-[#0072bc] shrink-0" />
                <span>End-to-End Ownership, Implementation &amp; Transparency</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 size={16} className="text-[#0072bc] shrink-0" />
                <span>Proven Production Track Record with Global &amp; Local Clients</span>
              </div>
            </div>

            {/* Advisor Profile */}
            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-sky-100 bg-white p-4 max-w-md shadow-[0_10px_30px_-10px_rgba(0,114,188,0.08)]">
              <div className="relative size-13 overflow-hidden rounded-full ring-2 ring-sky-100 shrink-0 bg-slate-100 shadow-sm">
                <Image
                  src="/assets/about/executive-consultant.jpg"
                  alt="Enterprise Lead"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0f172a]">Md. Ashik Siddike</div>
                <div className="text-xs text-[#0072bc] font-bold">VP International Solutions</div>
                <div className="text-[11px] text-slate-400 font-medium">solutions@suffixit.com • Dhaka, Bangladesh</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Enters from Right Side (2-side pinch entry) */}
          <motion.div
            style={{ y: formY, scale: formScale }}
            initial={{ opacity: 0, x: 85, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] sm:rounded-[34px] bg-white p-7 sm:p-10 text-slate-900 border border-sky-100 shadow-[0_20px_60px_-15px_rgba(0,114,188,0.16)] relative overflow-hidden will-change-transform"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0072bc] via-[#0ea5e9] to-[#38bdf8]" />
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Consultation Requested!</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Our Senior Enterprise Architect will review your requirements and reach out within 24 business hours.
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
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-slate-200 bg-[#f8fbff] px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0072bc] focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
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
                    placeholder="Your Company"
                    className="w-full rounded-xl border border-slate-200 bg-[#f8fbff] px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0072bc] focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full rounded-xl border border-slate-200 bg-[#f8fbff] px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0072bc] focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
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
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full rounded-xl border border-slate-200 bg-[#f8fbff] px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0072bc] focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Project Scope &amp; Workforce Scale
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder={`Tell us about your ${productName} requirements, employee count, or current software challenges...`}
                    className="w-full rounded-xl border border-slate-200 bg-[#f8fbff] px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0072bc] focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0072bc] to-[#0ea5e9] hover:from-[#005a96] hover:to-[#0284c7] py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#0072bc]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>Request Strategy Session</span>
                  <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
