"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface TestimonialItem {
  id: string;
  headline: string;
  review: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  initials: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: "1",
    headline: "Superb Telemetry & Reliability",
    review:
      "Suffix IT's Field Force and billing automation solved our cross-division monitoring overnight. Uptime has remained at 99.9% across every quarter with zero data discrepancies.",
    name: "Kazi Anowarul Rafique",
    role: "Head of Operations",
    company: "New Generation Telecom Ltd.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    initials: "KR",
  },
  {
    id: "2",
    headline: "Enterprise-Grade Scalability",
    review:
      "Their architectural leadership delivered our custom ERP module ahead of schedule. The team understands high concurrency, localized taxation, and multi-branch inventory.",
    name: "Md. Ashif Imran Rana",
    role: "Chief Technical Officer",
    company: "Fair Technology",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initials: "AR",
  },
  {
    id: "3",
    headline: "Great Flexibility & Support",
    review:
      "The transition to Rupantar HCM streamlined our factory payroll of 3,500+ staff. The local engineering team in Dhaka is exceptionally proactive and responsive.",
    name: "Tanvir Ahmed",
    role: "General Manager",
    company: "GPH Ispat",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    initials: "TA",
  },
  {
    id: "4",
    headline: "Intuitive & Reliable Workflows",
    review:
      "Suffix IT delivered a customized Provident Fund and HR suite that gave our employees transparent self-service access on mobile. Flawless execution throughout.",
    name: "Farhana Yasmin",
    role: "Head of HR & Governance",
    company: "Avery Dennison BD",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    initials: "FY",
  },
  {
    id: "5",
    headline: "Mission-Critical Precision",
    review:
      "Deploying enterprise digital solutions across public utilities requires strict security compliance and zero downtime. Suffix IT proved to be a dependable tech partner.",
    name: "Engr. Mahmudur Rahman",
    role: "Project Director",
    company: "WASA Modernization",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    initials: "MR",
  },
  {
    id: "6",
    headline: "Fast Delivery & Clean Code",
    review:
      "From initial sprint planning to production launch, Suffix IT engineering was exemplary. Their solution architecture and API integration standards are world-class.",
    name: "Shahriar Kabir",
    role: "VP of Technology",
    company: "Apex Footwear",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    initials: "SK",
  },
  {
    id: "7",
    headline: "Unmatched Mobile UX",
    review:
      "Our field sales representatives adopted the FFMS mobile application on day one with zero training friction. GPS precision and offline order sync are flawless.",
    name: "Zubair Al-Mamun",
    role: "Head of Supply Chain",
    company: "Petrobangla Distribution",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    initials: "ZM",
  },
  {
    id: "8",
    headline: "Proactive 24/7 SLA",
    review:
      "Whenever we expand new retail counters or deploy critical database updates, Suffix IT's DevOps and support engineers stand by with immediate resolution.",
    name: "Nazmus Sakib",
    role: "Director of IT Infrastructure",
    company: "GAZI Networks",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=80",
    initials: "NS",
  },
];

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div
      className="group relative w-[320px] sm:w-[360px] md:w-[380px] min-h-[275px] sm:min-h-[295px] flex flex-col justify-between shrink-0 rounded-[24px] bg-white/95 backdrop-blur-md p-6 sm:p-7 transition-all duration-300 border border-slate-200/90 shadow-[0_12px_32px_rgba(0,104,181,0.07)] hover:border-[#0068B5] hover:shadow-[0_0_32px_rgba(0,104,181,0.25),inset_0_0_15px_rgba(0,104,181,0.05)] hover:-translate-y-1 hover:z-40 cursor-pointer select-none"
      style={{
        borderRadius: "24px",
      }}
    >
      {/* Top glowing accent line on hover */}
      <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#0068B5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

      {/* Top Content: Quote, Category Tag, Headline, Review */}
      <div>
        {/* Quote Icon & Category Tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl font-serif font-black text-[#0068B5] leading-none select-none">
            &ldquo;
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0068B5] border border-sky-200/70">
            Client Review
          </span>
        </div>

        {/* Bold Review Headline */}
        <h4 className="text-[15px] sm:text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0068B5] transition-colors line-clamp-1">
          {item.headline}
        </h4>

        {/* Review Body */}
        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
          {item.review}
        </p>
      </div>

      {/* Author Footer - fully preserved with bottom clearance and rounded-b protection */}
      <div className="flex items-center gap-3 pt-4 mt-3 border-t border-slate-100">
        <Avatar className="h-9 w-9 ring-2 ring-[#0068B5]/20 shrink-0">
          <AvatarImage src={item.avatar} alt={item.name} />
          <AvatarFallback className="bg-sky-100 text-[#0068B5] text-xs font-bold">
            {item.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.name}</p>
          <p className="text-[11px] font-medium text-[#0068B5] truncate">
            {item.role} · <span className="text-slate-500">{item.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials3DSection() {
  // Exactly 3 Rows with controlled z-index so top rows float over bottom rows
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);
  const row3 = [testimonials[2], testimonials[3], testimonials[6], testimonials[7]];

  return (
    <section id="testimonials" className="relative py-2 md:py-3 lg:py-4 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F6FC] to-[#F8FAFC]">
      {/* Background Giant Watermark Outlined Text "SUFFIX IT" */}
      <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center overflow-hidden opacity-90 select-none z-0">
        <span
          className="text-[80px] sm:text-[120px] lg:text-[160px] font-black tracking-tighter text-transparent leading-none"
          style={{
            WebkitTextStroke: "1.5px rgba(0, 104, 181, 0.12)",
          }}
        >
          SUFFIX IT
        </span>
      </div>

      {/* Centered Section Header Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 mb-3 sm:mb-4 text-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-sky-200/90 bg-sky-50/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#0068B5] shadow-xs backdrop-blur-sm mb-3.5">
          <span>Client Testimonials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-tight">
          Trusted by <span className="text-[#0068B5] font-serif italic font-normal">market leaders</span> across Bangladesh
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-normal">
          Hear how enterprise directors, CTOs, and operational leaders accelerate their digital infrastructure with Suffix IT.
        </p>
      </div>

      {/* 3D Isometric Slanted Stage - FULL BLEED / EDGE-TO-EDGE DISPLAY (70% Height) */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="relative h-[430px] sm:h-[470px] lg:h-[650px] w-full overflow-hidden border-y border-slate-200/70 bg-gradient-to-r from-[#F8FAFC]/50 via-white/80 to-[#F8FAFC]/50 shadow-[inset_0_2px_12px_rgba(0,104,181,0.03)] [perspective:1200px]">

          {/* Subtle Isometric Dot-Grid Background inside full-width container */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35 z-0"
            style={{
              backgroundImage: "radial-gradient(#0068B5 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Central Soft Radial Light Glow (Light Theme) */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(0, 104, 181, 0.09) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 75%)",
            }}
          />

          {/* Subtle Side & Edge Fade Overlays (Kept delicate so cards are never masked) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-6 sm:h-8 bg-gradient-to-b from-[#F8FAFC]/80 via-[#F8FAFC]/20 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 sm:h-8 bg-gradient-to-t from-[#F8FAFC]/80 via-[#F8FAFC]/20 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 lg:w-56 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 lg:w-56 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-20" />

          {/* 3D Tilted Plane with 3 Continuous Alternating Moving Rows */}
          <div
            className="absolute -inset-x-28 sm:-inset-x-40 inset-y-0 flex flex-col justify-center gap-[20px] pointer-events-auto"
            style={{
              transform: "rotateX(12deg) rotateZ(-9deg) skewX(3deg) scale(1.02)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Row 1 - Marquee Left (Higher z-index so bottom rounded corners overlap Row 2 visibly) */}
            <div className="relative z-30 w-full py-0.5">
              <Marquee speed={36} pauseOnHover repeat={4} className="gap-6 sm:gap-7 py-2">
                {row1.map((item, idx) => (
                  <TestimonialCard key={`r1-${item.id}-${idx}`} item={item} />
                ))}
              </Marquee>
            </div>

            {/* Row 2 - Marquee Right (Reverse Direction) (z-20 so bottom rounded corners overlap Row 3 visibly) */}
            <div className="relative z-20 w-full py-0.5">
              <Marquee reverse speed={42} pauseOnHover repeat={4} className="gap-6 sm:gap-7 py-2">
                {row2.map((item, idx) => (
                  <TestimonialCard key={`r2-${item.id}-${idx}`} item={item} />
                ))}
              </Marquee>
            </div>

            {/* Row 3 - Marquee Left (z-10, bottom corners floating freely with clear margin) */}
            <div className="relative z-10 w-full py-0.5">
              <Marquee speed={38} pauseOnHover repeat={4} className="gap-6 sm:gap-7 py-2">
                {row3.map((item, idx) => (
                  <TestimonialCard key={`r3-${item.id}-${idx}`} item={item} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials3DSection;

