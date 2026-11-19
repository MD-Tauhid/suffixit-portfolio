"use client";

import React from "react";
import { Cpu, Sparkles } from "lucide-react";

export default function ServiceDetailTechStackNagorik() {
  const line1 = [
    "Next.js 15",
    "React",
    "TypeScript",
    "Shopify Plus",
    "Magento 2",
    "GraphQL",
    "TailwindCSS",
    "Node.js",
    "Python",
    "AWS Cloud",
    "Headless Architecture",
  ];

  const line2 = [
    "Laravel",
    "PostgreSQL",
    "Redis Caching",
    "Docker",
    "Stripe Elements",
    "bKash Merchant API",
    "Nagad Gateway",
    "SSLCommerz",
    "Kafka Pipelines",
    "Cloudflare Edge",
    "Elasticsearch",
  ];

  // Duplicate arrays to guarantee infinite mathematical loop with translateX(-50%)
  const marquee1 = [...line1, ...line1];
  const marquee2 = [...line2, ...line2];

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 text-center mb-14">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3.5 shadow-xs">
          <Cpu size={13} className="text-[#0072bc]" />
          <span>Technology Expertise</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
          Specialized in Diverse Technologies
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
          From polished headless front-ends to resilient payment gateways and distributed microservices—we engineer with battle-tested enterprise stacks.
        </p>
      </div>

      {/* Infinite Horizontal Sliding Marquee Track with Edge Fades */}
      <div className="relative w-full overflow-hidden space-y-4 py-2">
        {/* Left & Right Soft Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

        {/* Marquee Row 1 (Leftward) */}
        <div className="overflow-hidden">
          <div className="animate-marquee gap-3 sm:gap-4 flex">
            {marquee1.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/90 hover:bg-[#0072bc] hover:text-white hover:border-[#0072bc] transition-all px-6 py-3 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs hover:shadow-md hover:-translate-y-0.5 cursor-default shrink-0"
              >
                <span className="size-1.5 rounded-full bg-[#0072bc] group-hover:bg-white" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 (Rightward) */}
        <div className="overflow-hidden pt-2">
          <div className="animate-marquee-reverse gap-3 sm:gap-4 flex">
            {marquee2.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/90 hover:bg-[#0072bc] hover:text-white hover:border-[#0072bc] transition-all px-6 py-3 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs hover:shadow-md hover:-translate-y-0.5 cursor-default shrink-0"
              >
                <span className="size-1.5 rounded-full bg-amber-500" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
