"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Sparkles, Layers, Cpu } from "lucide-react";
import type { Service } from "@/lib/services";

interface TalentRole {
  id: string;
  title: string;
  summary: string;
  skills: string[];
  deliverable: string;
}

export default function ServiceDetailTalentMatrixNagorik({
  service,
}: {
  service: Service;
}) {
  const roles: TalentRole[] = [
    {
      id: "headless-frontend",
      title: "Headless Front-End & Next.js Architects",
      summary: "Crafting sub-second digital storefronts with dynamic SSR/SSG rendering, micro-interactions, and 95+ Core Web Vitals performance.",
      skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "GraphQL", "Algolia Search"],
      deliverable: "Instant page transitions, zero layout shift, and fluid mobile checkout UX.",
    },
    {
      id: "high-throughput-backend",
      title: "High-Throughput E-Commerce Backend Engineers",
      summary: "Architecting fault-tolerant order ingestion pipelines, cart session management, and microservice APIs capable of handling 50,000+ simultaneous checkout requests.",
      skills: ["Node.js", "Go", "Redis", "PostgreSQL", "Kafka", "Docker", "REST / gRPC"],
      deliverable: "Zero crash flash-sales and robust distributed database sharding.",
    },
    {
      id: "payment-gateway",
      title: "Payment Gateway & FinTech Specialists",
      summary: "Integrating localized MFS and international payment routing with automatic fallback cascades, tokenized 1-click checkout, and instant reconciliation.",
      skills: ["bKash API", "Nagad Direct", "SSLCommerz", "Stripe Elements", "Mastercard/Visa", "Webhook Queues"],
      deliverable: "Zero lost payments, automated refund processing, and PCI-DSS compliance.",
    },
    {
      id: "omnichannel-erp",
      title: "Omnichannel ERP & Inventory Integrators",
      summary: "Bridging physical retail store POS systems, central warehouse stock, and digital marketplaces to guarantee single-source-of-truth inventory.",
      skills: ["Rupantar ERP", "SAP Connector", "Webhooks", "Barcode Sync", "RabbitMQ", "Automated Dispatches"],
      deliverable: "Live cross-channel inventory locking to eliminate overselling.",
    },
    {
      id: "cro-ux",
      title: "Conversion Rate Optimization (CRO) & UX Leads",
      summary: "Eliminating friction across product listing pages, search filters, and checkout stages to directly expand average order value (AOV) and conversion rates.",
      skills: ["A/B Testing", "Figma Design System", "Heatmap Analysis", "Funnel Tracking", "GA4 E-commerce", "Exit Intent"],
      deliverable: "Measurable 20% to 45% uplift in checkout completion rates.",
    },
    {
      id: "devops-reliability",
      title: "Cloud DevOps & Auto-Scaling Reliability Engineers",
      summary: "Deploying high-availability cloud infrastructure with CDN edge caching, proactive threat mitigation, and automated horizontal cluster scaling.",
      skills: ["AWS ECS / EKS", "Cloudflare Enterprise", "Terraform", "CI/CD Pipelines", "Datadog", "SSL Automation"],
      deliverable: "99.99% guaranteed uptime during peak marketing campaigns.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeRole = roles[activeIndex];

  return (
    <section id="talent-matrix" className="sec-trans-section relative !py-20 md:!py-28 bg-[#f8fbff] border-b border-sky-100 scroll-mt-12">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="trans-talent-header mb-14 max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>Specialized Engineering Talent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Who You Can Deploy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            Pre-vetted senior domain specialists ready to accelerate your e-commerce roadmap or embed seamlessly into your existing product sprint.
          </p>
        </motion.div>

        {/* 2-Column Layout (2 Sides Entry) */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 items-start">
          {/* Left Column: Interactive Role List (Enters from Left Side) */}
          <motion.div
            initial={{ opacity: 0, x: -85 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="trans-talent-pills space-y-3"
          >
            {roles.map((role, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? "bg-white border-[#0072bc] shadow-md shadow-sky-100/70"
                      : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors ${
                        isActive
                          ? "bg-[#0072bc] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0f172a]">
                        {role.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#64748b] line-clamp-1">
                        {role.summary}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className={`shrink-0 transition-transform ${
                      isActive ? "text-[#0072bc] translate-x-0.5 -translate-y-0.5" : "text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </motion.div>

          {/* Right Column: Dynamic Role Preview Card (Enters from Right Side) */}
          <motion.div
            initial={{ opacity: 0, x: 85 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="trans-talent-console sticky top-28 rounded-[28px] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xl shadow-sky-100/50"
          >
            <div className="inline-flex items-center gap-2 rounded-md bg-sky-50 border border-sky-100 px-3 py-1 text-xs font-bold text-[#0072bc] mb-4">
              <Cpu size={14} />
              <span>Domain Capability Profile</span>
            </div>

            <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">
              {activeRole.title}
            </h3>

            <p className="mt-3 text-sm text-[#475569] leading-relaxed">
              {activeRole.summary}
            </p>

            {/* Core Tech Stack Pill Tags */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Core Technologies &amp; Tooling
              </div>
              <div className="flex flex-wrap gap-2">
                {activeRole.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#0072bc] transition-colors border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Deliverable */}
            <div className="mt-6 rounded-2xl bg-[#f0f7ff] border border-sky-200/60 p-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#0072bc] mt-0.5 shrink-0" />
                <div className="text-xs font-semibold text-slate-800 leading-relaxed">
                  <span className="font-bold text-[#0072bc]">Verified Output: </span>
                  {activeRole.deliverable}
                </div>
              </div>
            </div>

            {/* Deploy Action */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0072bc] hover:bg-[#005a96] text-white px-6 py-3.5 text-sm font-bold shadow-md shadow-[#0072bc]/25 transition-all cursor-pointer"
              >
                <span>Deploy {activeRole.title.split("&")[0].trim()}</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
