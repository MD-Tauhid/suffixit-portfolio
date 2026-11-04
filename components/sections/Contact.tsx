"use client";

import { useState, useRef, useEffect } from "react";
import { site } from "@/lib/site";
import SalesTeamLeadership from "./SalesTeamLeadership";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Sparkles,
  Check,
  Copy,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [dhakaTime, setDhakaTime] = useState<string>("");

  // Live Dhaka Clock (Asia/Dhaka GMT+6)
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
      } catch {
        const now = new Date();
        setDhakaTime(now.toLocaleTimeString("en-US", { hour12: true }));
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cursor spotlight tracker (Footer TextHoverEffect inspired)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleCopyPhone = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(site.phone.replace(/\s+/g, ""));
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(site.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="contact" className="relative py-3 md:py-20 lg:py-5 overflow-x-hidden">
      <div className="w max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Seamless Unified Container with Interactive Spotlight Border Glow */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={(e) => {
            setIsHovered(true);
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect();
              setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos(null);
          }}
          className="relative overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] bg-[#F8FAFC] border border-slate-200/90 shadow-[0_24px_70px_-15px_rgba(15,23,42,0.06)] p-7 sm:p-10 lg:p-16 transition-all duration-300 rv-zoom"
        >
          {/* Interactive Cursor Spotlight Border Glow (Matches Footer SUFFIX IT Stroke Glow) */}
          {mousePos && (
            <>
              {/* Sharp Laser Stroke Border */}
              <div
                className="pointer-events-none absolute -inset-[1.5px] rounded-[inherit] transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, #3cb4f0 0%, #0068B5 45%, transparent 75%)`,
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1.5px",
                  zIndex: 20,
                }}
              />

              {/* Soft Blurred Glow Layer (feGaussianBlur equivalent) */}
              <div
                className="pointer-events-none absolute -inset-[2px] rounded-[inherit] blur-[3px] transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 0.85 : 0,
                  background: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, #3cb4f0 0%, #0072bc 40%, transparent 70%)`,
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "2.5px",
                  zIndex: 19,
                }}
              />

              {/* Ambient Surface Spotlight Glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `radial-gradient(340px circle at ${mousePos.x}px ${mousePos.y}px, rgba(60, 180, 240, 0.08) 0%, rgba(0, 104, 181, 0.03) 50%, transparent 80%)`,
                  zIndex: 1,
                }}
              />
            </>
          )}

          {/* Subtle Ambient Radial Glows (Sky-Blue & Mint-Green) */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(0, 104, 181, 0.08) 50%, transparent 75%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-[440px] w-[440px] rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, rgba(16, 185, 129, 0.06) 50%, transparent 75%)",
            }}
          />
          <div
            className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 h-80 w-80 rounded-full opacity-35 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(224, 242, 254, 0.9) 0%, transparent 70%)",
            }}
          />

          {/* Architectural Watermark: Subtle Dot-Grid Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Architectural Watermark: Silver Orbital Rings SVG */}
          <svg
            className="pointer-events-none absolute -right-24 -bottom-32 w-[520px] h-[520px] lg:w-[680px] lg:h-[680px] text-slate-300/40 select-none"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer dashed orbital ring */}
            <circle
              cx="300"
              cy="300"
              r="260"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.5"
            />
            {/* Main orbital ring */}
            <circle
              cx="300"
              cy="300"
              r="200"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.75"
            />
            {/* Elliptical tilted orbits */}
            <ellipse
              cx="300"
              cy="300"
              rx="270"
              ry="110"
              transform="rotate(-28 300 300)"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.45"
            />
            <ellipse
              cx="300"
              cy="300"
              rx="210"
              ry="85"
              transform="rotate(35 300 300)"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="3 5"
              opacity="0.4"
            />
            {/* Inner rings */}
            <circle
              cx="300"
              cy="300"
              r="130"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.65"
            />
            <circle
              cx="300"
              cy="300"
              r="70"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2 4"
              opacity="0.5"
            />
            {/* Architectural nodes */}
            <circle cx="500" cy="300" r="4.5" fill="#0068B5" opacity="0.6" />
            <circle cx="170" cy="170" r="3.5" fill="#10B981" opacity="0.55" />
            <circle cx="390" cy="440" r="3.5" fill="#94A3B8" opacity="0.5" />
          </svg>

          {/* 2-Column Responsive Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left rv-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-sky-50/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#0068B5] shadow-xs backdrop-blur-sm mb-5">
                <Sparkles className="h-3.5 w-3.5 text-[#0068B5] animate-pulse" />
                <span>Free Architecture & Consultation</span>
              </div>

              {/* Hero-Matched Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-[1.18] max-w-xl">
                Let&apos;s build something{" "}
                <em className="font-serif italic font-normal text-[#0068B5]">
                  together.
                </em>
              </h2>

              {/* Description */}
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
                Tell us what you need. Our solution architects will analyze your
                requirements and deliver a tailored technical architecture,
                accurate scoping, and a live demo.
              </p>

              {/* Trust / SLA Badges */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  24h Scoping SLA
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Strict NDA Protected
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs">
                  <Clock className="h-3.5 w-3.5 text-[#0068B5]" />
                  Fixed-Price or Dedicated
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  className="group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(135deg, #0068B5 0%, #0284c7 100%)",
                    boxShadow: "0 12px 28px -6px rgba(0, 104, 181, 0.45)",
                  }}
                  href={`mailto:${site.email}?subject=Project%20Consultation%20Request%20—%20Suffix%20IT`}
                >
                  <span>Get Free Consultancy</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:bg-slate-50 hover:border-slate-400"
                  href={site.phoneHref}
                >
                  <Phone className="h-4 w-4 text-emerald-600" />
                  <span>Quick Call</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Contact Dock */}
            <div className="lg:col-span-5 rv-right">
              <div
                className="relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.95)",
                  boxShadow:
                    "0 20px 48px -12px rgba(15, 23, 42, 0.08), 0 2px 10px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 1)",
                }}
              >
                {/* Header: Suffix IT Limited & Live Dhaka Clock + HQ Open Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0068B5]">
                      Head Office
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      Suffix IT Limited
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Live Dhaka Clock (GMT+6) */}
                    <div
                      className="inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50/70 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-xs"
                      title="Current Local Time in Dhaka, Bangladesh (GMT+6)"
                    >
                      <Clock className="h-3 w-3 text-[#0068B5]" />
                      <span className="font-mono text-[11px] font-semibold tracking-tight text-slate-800">
                        {dhakaTime || "--:--:--"}
                      </span>
                      <span className="rounded bg-sky-200/60 px-1 py-0.2 text-[9px] font-bold text-[#0068B5]">
                        GMT+6
                      </span>
                    </div>

                    {/* Live HQ Open Badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-xs">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                      </span>
                      <span>HQ Open</span>
                    </div>
                  </div>
                </div>

                {/* Info Items */}
                <div className="mt-5 space-y-3.5">
                  {/* Address Item: Live Dhaka Campus Card with Stylized Mini-Map Background */}
                  <div className="group/map relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-4 sm:p-5 transition-all duration-300 hover:border-[#0068B5]/60 hover:shadow-md hover:bg-white">
                    {/* Stylized Mini-Map Background Vector */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 transition-opacity duration-300 group-hover/map:opacity-60 select-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-sky-50/50" />
                      <svg
                        className="absolute right-0 bottom-0 w-[240px] h-[130px] text-slate-300/80"
                        viewBox="0 0 240 130"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Street grid */}
                        <path d="M 0 25 L 240 25" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                        <path d="M 0 60 L 240 60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                        <path d="M 0 95 L 240 95" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
                        <path d="M 35 0 L 35 130" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                        <path d="M 85 0 L 85 130" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.5" />
                        <path d="M 155 0 L 155 130" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                        <path d="M 205 0 L 205 130" stroke="currentColor" strokeWidth="1" opacity="0.5" />

                        {/* Main Arterial Road (Progoti Sharoni highway) */}
                        <path
                          d="M -10 120 C 50 100, 110 65, 175 25 L 250 -10"
                          stroke="#0068B5"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          opacity="0.3"
                        />
                        <path
                          d="M -10 120 C 50 100, 110 65, 175 25 L 250 -10"
                          stroke="#3cb4f0"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeDasharray="4 4"
                          opacity="0.75"
                        />

                        {/* Secondary Gulshan Avenue curve */}
                        <path
                          d="M 15 0 C 40 50, 105 70, 240 110"
                          stroke="#64748B"
                          strokeWidth="2"
                          opacity="0.25"
                        />

                        {/* Water body curve (Gulshan / Badda Lake) */}
                        <path
                          d="M 0 85 Q 40 95, 65 130"
                          stroke="#0284c7"
                          strokeWidth="5"
                          strokeLinecap="round"
                          opacity="0.16"
                        />

                        {/* Rupayan Millennium Square beacon */}
                        <circle cx="120" cy="55" r="14" fill="#0068B5" fillOpacity="0.08" />
                        <circle cx="120" cy="55" r="8" stroke="#0068B5" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                        <circle cx="120" cy="55" r="3" fill="#0068B5" />
                        <circle cx="120" cy="55" r="5" stroke="#3cb4f0" strokeWidth="1" className="animate-ping opacity-60" />
                      </svg>
                    </div>

                    {/* Foreground Content */}
                    <div className="relative z-10 flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-white/95 text-[#0068B5] shadow-xs">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Dhaka Campus
                          </span>
                          <a
                            href="https://maps.google.com/?q=Rupayan+Millennium+Square+Progoti+Sharoni+Dhaka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0068B5] hover:underline"
                          >
                            <span>Map</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                          Cha-70, 70/A, Rupayan Millennium Square (9A), Progoti
                          Sharoni, North Badda, Gulshan, Dhaka-1212
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Item with Hover Glow & Click Copied Tooltip */}
                  <div
                    onClick={() => handleCopyPhone()}
                    className="group relative rounded-2xl border border-slate-200/80 bg-white/70 p-4 transition-all duration-200 hover:border-[#0068B5] hover:shadow-[0_0_20px_rgba(0,104,181,0.14)] hover:bg-white cursor-pointer"
                  >
                    {/* Floating Animated Copied Tooltip */}
                    {copiedPhone && (
                      <div className="absolute -top-3 right-4 z-30 flex items-center gap-1 rounded-full bg-[#0068B5] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-md animate-bounce">
                        <Check className="h-3 w-3 text-white" />
                        <span>Copied!</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-600 shadow-xs transition-colors group-hover:border-emerald-200">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                          Call & WhatsApp
                        </span>
                        <span className="text-sm sm:text-base font-bold text-slate-900 transition-colors group-hover:text-[#0068B5]">
                          {site.phone}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPhone}
                        title="Copy Phone Number"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-xs transition-all group-hover:border-[#0068B5] group-hover:text-[#0068B5]"
                      >
                        {copiedPhone ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Email Item with Hover Glow & Click Copied Tooltip */}
                  <div
                    onClick={() => handleCopyEmail()}
                    className="group relative rounded-2xl border border-slate-200/80 bg-white/70 p-4 transition-all duration-200 hover:border-[#0068B5] hover:shadow-[0_0_20px_rgba(0,104,181,0.14)] hover:bg-white cursor-pointer"
                  >
                    {/* Floating Animated Copied Tooltip */}
                    {copiedEmail && (
                      <div className="absolute -top-3 right-4 z-30 flex items-center gap-1 rounded-full bg-[#0068B5] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-md animate-bounce">
                        <Check className="h-3 w-3 text-white" />
                        <span>Copied!</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-[#0068B5] shadow-xs transition-colors group-hover:border-blue-200">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                          Enterprise Email
                        </span>
                        <span className="text-sm sm:text-base font-bold text-slate-900 transition-colors group-hover:text-[#0068B5]">
                          {site.email}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        title="Copy Email Address"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-xs transition-all group-hover:border-[#0068B5] group-hover:text-[#0068B5]"
                      >
                        {copiedEmail ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

        {/* Speak Directly With Our Sales & Architecture Leadership */}
        <SalesTeamLeadership />
      </div>
    </section>
  );
}
