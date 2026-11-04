"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SalesTeamLeadership from "@/components/sections/SalesTeamLeadership";
import { site } from "@/lib/site";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sun,
  Moon,
  Building2,
  Award,
  Globe2,
  ChevronDown,
  Lock,
} from "lucide-react";
import Image from "next/image";
import gsap from "gsap";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dhakaTime, setDhakaTime] = useState("");
  const [isDayTime, setIsDayTime] = useState(true);

  // Animation Refs
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const slaContainerRef = useRef<HTMLDivElement>(null);
  const architectCardRef = useRef<HTMLDivElement>(null);
  const architectImgRef = useRef<HTMLDivElement>(null);

  const formCardRef = useRef<HTMLDivElement>(null);
  const officeCardRef = useRef<HTMLDivElement>(null);

  // Live Dhaka Local Time (Asia/Dhaka GMT+6)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setDhakaTime(formatted);

        const dhakaHour = parseInt(
          new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Dhaka",
            hour: "numeric",
            hour12: false,
          }).format(now),
          10
        );
        setIsDayTime(dhakaHour >= 6 && dhakaHour < 18);
      } catch {
        const now = new Date();
        setDhakaTime(now.toLocaleTimeString("en-US", { hour12: true }));
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Automatic Arrival / Entrance Animation Sequence on Page Load
  useEffect(() => {
    if (!pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Ambient Background Shapes & Badges
      tl.fromTo(
        ".ambient-shape",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: "power2.out" },
        0
      );

      // 2. Left Eyebrow Badge (Spring pop)
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: -25, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.8)" },
          0.1
        );
      }

      // 3. Main Heading reveal with crisp kinetic slide-up (Zero text blur)
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { y: 38, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
          0.15
        );
      }

      // 4. Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0.25
        );
      }

      // 5. SLA items stagger
      tl.fromTo(
        ".sla-item",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        0.35
      );

      // 6. Lead Architect Card Glide
      if (architectCardRef.current) {
        tl.fromTo(
          architectCardRef.current,
          { x: -45, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 0.75, ease: "power3.out" },
          0.45
        );
      }

      // 7. Lead Architect Image Reveal (Zoom-out)
      if (architectImgRef.current) {
        tl.fromTo(
          architectImgRef.current,
          { scale: 1.3, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" },
          0.5
        );
      }

      // 8. Right Form Card (Smooth glide entry from right)
      if (formCardRef.current) {
        tl.fromTo(
          formCardRef.current,
          { x: 45, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" },
          0.2
        );
      }

      // 9. Form Input Elements Cascade
      tl.fromTo(
        ".form-element",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" },
        0.4
      );

      // 10. Office Showcase & Map Card
      if (officeCardRef.current) {
        tl.fromTo(
          officeCardRef.current,
          { y: 45, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
          0.75
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <Header />
      <main
        ref={pageContainerRef}
        id="main"
        className="relative min-h-screen bg-[#F8FAFC] pt-28 pb-20 overflow-x-hidden"
      >
        {/* ========================================================
            MODERN AMBIENT GEOMETRIC SHAPES & LIGHTING SYSTEM
           ======================================================== */}
        {/* 1. Tech Dot Grid Texture */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(#0068B5 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* 2. Top-Center Radiant Ocean-Blue Aura */}
        <div
          className="ambient-shape pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-45 select-none blur-3xl z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0, 104, 181, 0.22) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 75%)",
          }}
        />

        {/* 3. Bottom-Right Mint & Cyan Ambient Glow */}
        <div
          className="ambient-shape pointer-events-none absolute bottom-1/4 right-[-10%] w-[600px] h-[600px] opacity-35 select-none blur-3xl z-0 animate-float-reverse"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(0, 104, 181, 0.08) 50%, transparent 75%)",
          }}
        />

        {/* 4. Large Silver-Sky Orbital Decorative Rings */}
        <div className="ambient-shape pointer-events-none absolute -top-24 -left-24 w-[650px] h-[650px] rounded-full border border-sky-400/15 border-dashed animate-orbit-spin z-0" />
        <div className="ambient-shape pointer-events-none absolute top-12 left-12 w-[420px] h-[420px] rounded-full border border-sky-500/10 z-0" />

        {/* 5. Floating Interactive Tech Badges (Modern Shapes) */}
        <div className="ambient-shape pointer-events-none absolute top-40 right-10 hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-md animate-float-slow z-0">
          <Zap className="size-3.5 text-amber-500" />
          <span className="text-[11px] font-bold text-slate-700">⚡ 2h Rapid Response SLA</span>
        </div>

        <div className="ambient-shape pointer-events-none absolute top-96 left-8 hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-md animate-float-reverse z-0">
          <ShieldCheck className="size-3.5 text-emerald-600" />
          <span className="text-[11px] font-bold text-slate-700">🛡️ Strict NDA Protection</span>
        </div>

        <div className="w max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ========================================================
              SECTION 1: SPLIT HERO + TAILORED CONSULTATION FORM
             ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16 md:mb-24">
            {/* Left Column: Heading, Subtitle & Lead Architect Profile */}
            <div ref={leftColRef} className="lg:col-span-5 text-left pt-2">
              <div
                ref={badgeRef}
                className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-sky-50/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#0068B5] shadow-xs mb-4"
              >
                <Sparkles className="size-3.5 text-[#0068B5]" />
                <span>Enterprise Inquiries</span>
              </div>

              <h1
                ref={headingRef}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]"
              >
                Let&apos;s start the{" "}
                <span className="font-serif italic font-normal text-[#0068B5]">
                  dialogue now!
                </span>
              </h1>

              <p
                ref={subtitleRef}
                className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal"
              >
                Whether you need ready-made software like Field Force and ERP or custom enterprise development, our Dhaka engineering team is ready to analyze your requirements and deliver a detailed scoping blueprint within 24 hours.
              </p>

              {/* SLA Highlights with clean entrance */}
              <div ref={slaContainerRef} className="mt-6 space-y-2.5">
                <div className="sla-item flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <div className="size-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
                    <Zap className="size-3.5" />
                  </div>
                  <span>24-Hour Technical &amp; Commercial Scoping SLA</span>
                </div>
                <div className="sla-item flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <div className="size-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
                    <ShieldCheck className="size-3.5" />
                  </div>
                  <span>Strict NDA Protection &amp; Complete IP Ownership</span>
                </div>
                <div className="sla-item flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <div className="size-6 rounded-lg bg-sky-50 text-[#0068B5] flex items-center justify-center shrink-0 border border-sky-200/60">
                    <Clock className="size-3.5" />
                  </div>
                  <span>Flexible Fixed-Price or Dedicated Engineering Squad</span>
                </div>
              </div>

              {/* Featured Lead Architect Mini-Profile Card with Animated Reveal */}
              <div
                ref={architectCardRef}
                className="group mt-8 p-5 sm:p-5.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_30px_rgba(0,104,181,0.06)] hover:border-[#0068B5] hover:shadow-[0_0_28px_rgba(0,104,181,0.22),inset_0_0_12px_rgba(0,104,181,0.05)] transition-all duration-300 flex items-center gap-4"
              >
                {/* Avatar with Smooth Zoom/De-blur Reveal */}
                <div
                  ref={architectImgRef}
                  className="relative size-14 sm:size-16 rounded-full overflow-hidden shrink-0 ring-4 ring-[#0068B5]/20 group-hover:ring-[#0068B5]/40 transition-all shadow-xs"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
                    alt="Lead Architect"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0068B5]">
                      On-Duty Architect
                    </span>
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0068B5] transition-colors truncate">
                    Engr. Tanvir Morshed
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    Directly reviews your RFP with senior architects.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: High-End Enterprise Form Card */}
            <div className="lg:col-span-7">
              <div
                ref={formCardRef}
                className="rounded-[30px] sm:rounded-[36px] bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,104,181,0.12),0_4px_16px_rgba(15,23,42,0.04)] p-7 sm:p-10 text-left transition-all duration-300 hover:border-slate-300 relative overflow-hidden"
              >
                {/* Top Luxury Gradient Accent Bar */}
                <div className="absolute top-0 inset-x-0 h-[3.5px] bg-gradient-to-r from-[#0068B5] via-[#38BDF8] to-[#0068B5]" />

                {/* Subtle Ambient Background Corner Light */}
                <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-bl from-sky-400/15 via-transparent to-transparent rounded-full blur-2xl" />

                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="inline-flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-2 ring-4 ring-emerald-100">
                      <CheckCircle2 className="size-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Message Received!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out to Suffix IT. Our solutions architect will review your project requirements and connect back within 2 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Form Header with SLA Badge */}
                    <div className="form-element flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          Project Inquiry &amp; Consultation
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          Fill in your details below and we will prepare a tailored demonstration.
                        </p>
                      </div>
                      <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold text-emerald-700 tracking-wide shrink-0">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        &lt; 2h Response SLA
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="form-element">
                        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-1.5">
                          Full Name <span className="text-[#0068B5] font-black">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rafiqul Islam"
                          className="w-full h-12 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-[#0068B5] focus:ring-4 focus:ring-[#0068B5]/12 focus:shadow-[0_0_0_1px_#0068B5] focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Work Email */}
                      <div className="form-element">
                        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-1.5">
                          Work Email <span className="text-[#0068B5] font-black">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="w-full h-12 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-[#0068B5] focus:ring-4 focus:ring-[#0068B5]/12 focus:shadow-[0_0_0_1px_#0068B5] focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Mobile / WhatsApp */}
                      <div className="form-element">
                        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-1.5">
                          Mobile / WhatsApp <span className="text-[#0068B5] font-black">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+880 1700 000000"
                          className="w-full h-12 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-[#0068B5] focus:ring-4 focus:ring-[#0068B5]/12 focus:shadow-[0_0_0_1px_#0068B5] focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Project Type */}
                      <div className="form-element">
                        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-1.5">
                          Project Type <span className="text-[#0068B5] font-black">*</span>
                        </label>
                        <div className="relative group">
                          <select
                            required
                            className="w-full h-12 rounded-xl border border-slate-200 bg-[#F8FAFC] pl-4 pr-10 text-sm font-medium text-slate-900 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-[#0068B5] focus:ring-4 focus:ring-[#0068B5]/12 focus:shadow-[0_0_0_1px_#0068B5] focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                          >
                            <option value="ERP">Enterprise ERP &amp; Rupantar HCM</option>
                            <option value="FieldForce">Field Force Management (FFMS)</option>
                            <option value="CustomSoftware">Custom Software &amp; Web Platform</option>
                            <option value="MobileApp">Mobile App (iOS / Android)</option>
                            <option value="Consultation">Architecture &amp; Cloud Consultation</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-[#0068B5] group-focus-within:rotate-180 transition-all duration-200" />
                        </div>
                      </div>
                    </div>

                    {/* Estimated Budget */}
                    <div className="form-element">
                      <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-1.5">
                        Estimated Budget
                      </label>
                      <div className="relative group">
                        <select
                          className="w-full h-12 rounded-xl border border-slate-200 bg-[#F8FAFC] pl-4 pr-10 text-sm font-medium text-slate-900 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-[#0068B5] focus:ring-4 focus:ring-[#0068B5]/12 focus:shadow-[0_0_0_1px_#0068B5] focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="under5k">BDT 100K – 500K (Standard License / Ready App)</option>
                          <option value="5k-15k">BDT 500K – 1.5M (Mid Enterprise / Custom Module)</option>
                          <option value="15k-50k">BDT 1.5M – 5M+ (Large Scale Multi-Branch ERP)</option>
                          <option value="retainer">Monthly Dedicated Engineering Team</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-[#0068B5] group-focus-within:rotate-180 transition-all duration-200" />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="form-element">
                      <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase mb-1.5">
                        Project Details &amp; Operational Needs <span className="text-[#0068B5] font-black">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your organization, current workflow bottlenecks, user count, and target go-live date..."
                        className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm font-sans font-medium text-slate-900 placeholder:text-slate-400 hover:border-slate-300 hover:bg-slate-50 focus:bg-white focus:border-[#0068B5] focus:ring-4 focus:ring-[#0068B5]/12 focus:shadow-[0_0_0_1px_#0068B5] focus:outline-none transition-all duration-200 resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Button & Security Micro-bar */}
                    <div className="form-element pt-2 space-y-3">
                      <button
                        type="submit"
                        className="group w-full h-[52px] inline-flex items-center justify-center gap-2.5 rounded-xl px-6 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#0068B5]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#0068B5]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, #0068B5 0%, #005FA3 50%, #004477 100%)",
                        }}
                      >
                        <span>Send Project Inquiry</span>
                        <ArrowRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>

                      {/* Micro Security & Trust Assurance */}
                      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-1 text-[11px] font-medium text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <ShieldCheck className="size-3.5 text-emerald-600" />
                          Strict NDA Protected
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Lock className="size-3 text-[#0068B5]" />
                          100% Confidential
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5 text-sky-600" />
                          24h Technical Scoping SLA
                        </span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================
              SECTION 2: DIRECT SALES & LEADERSHIP TEAM CARDS
             ======================================================== */}
          <div className="mb-16 md:mb-24">
            <SalesTeamLeadership />
          </div>

          {/* ========================================================
              SECTION 3: OFFICE SHOWCASE, LIVE DHAKA TIMEZONE & MAP
             ======================================================== */}
          <div
            ref={officeCardRef}
            className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.06)] overflow-hidden transition-all duration-300 hover:border-slate-300"
          >
            {/* Live Location Bar */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-2xl bg-white border border-sky-100 flex items-center justify-center text-[#0068B5] shadow-xs">
                  <Building2 className="size-6 text-[#0068B5]" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0068B5]">
                    Global Headquarters
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Suffix IT Limited · Dhaka Campus
                  </h3>
                </div>
              </div>

              {/* Live Dhaka Clock (GMT+6) */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                  {isDayTime ? (
                    <Sun className="size-3.5 text-amber-500 animate-spin-slow" />
                  ) : (
                    <Moon className="size-3.5 text-[#0068B5]" />
                  )}
                  <span className="font-mono text-xs font-bold text-slate-800">
                    {dhakaTime || "--:--:--"}
                  </span>
                  <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-[#0068B5]">
                    Dhaka (GMT+6)
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700">
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>HQ Open</span>
                </div>
              </div>
            </div>

            {/* Address & Direct Details Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left border-b border-slate-100 bg-white">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Campus Address
                </span>
                <p className="mt-1.5 text-sm font-medium text-slate-700 leading-relaxed">
                  Cha-70, 70/A, Rupayan Millennium Square (9A), Progoti Sharoni, North Badda, Gulshan, Dhaka-1212.
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Direct Telephone
                </span>
                <p className="mt-1.5 text-sm font-bold text-slate-900">
                  <a href={site.phoneHref} className="hover:text-[#0068B5] transition-colors">
                    {site.phone}
                  </a>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  General queries &amp; enterprise support
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Official Communication
                </span>
                <p className="mt-1.5 text-sm font-bold text-slate-900">
                  <a href={`mailto:${site.email}`} className="hover:text-[#0068B5] transition-colors">
                    {site.email}
                  </a>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  RFP &amp; enterprise proposals
                </p>
              </div>
            </div>

            {/* Embedded Stylized Interactive Google Map */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-100">
              <iframe
                title="Suffix IT Limited Headquarters"
                src="https://maps.google.com/maps?q=Rupayan+Millennium+Square+Progoti+Sharoni+Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
