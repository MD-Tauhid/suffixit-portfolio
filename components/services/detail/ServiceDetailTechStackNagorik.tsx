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
  ];

  const line2 = [
    "Laravel",
    "PostgreSQL",
    "Redis Caching",
    "Docker",
    "AWS Cloud",
    "Stripe",
    "bKash API",
    "Nagad Gateway",
    "SSLCommerz",
    "Kafka",
  ];

  const line3 = [
    "WooCommerce",
    "Algolia Search",
    "Kubernetes",
    "Cloudflare Edge",
    "Framer Motion",
    "Jest / Playwright",
    "Headless Commerce",
    "Elasticsearch",
  ];

  return (
    <section className="relative !py-20 md:!py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3">
          <Cpu size={12} className="text-[#0072bc]" />
          <span>Technology Expertise</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
          Specialized in Diverse Technologies
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
          From polished headless front-ends to resilient payment gateways and distributed microservices—we engineer with battle-tested stacks.
        </p>
      </div>

      {/* 3 Scrolling / Overflow Rows */}
      <div className="space-y-4 max-w-6xl mx-auto px-4">
        {/* Row 1 */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {line1.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200 bg-slate-50/80 hover:bg-[#0072bc] hover:text-white hover:border-[#0072bc] transition-all px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs hover:shadow-md hover:-translate-y-0.5 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {line2.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200 bg-slate-50/80 hover:bg-[#0072bc] hover:text-white hover:border-[#0072bc] transition-all px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs hover:shadow-md hover:-translate-y-0.5 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {line3.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200 bg-slate-50/80 hover:bg-[#0072bc] hover:text-white hover:border-[#0072bc] transition-all px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs hover:shadow-md hover:-translate-y-0.5 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
