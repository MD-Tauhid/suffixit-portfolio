"use client";

import React from "react";
import SectionHeader from "./SectionHeader";
import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";
import {
  Code2,
  Smartphone,
  Globe,
  Cpu,
  CloudCog,
  Database,
  Layers,
  Megaphone,
  Handshake,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
} from "lucide-react";

const allServices: CardItem[] = [
  {
    id: "custom-software",
    title: "Custom Software",
    badge: "Enterprise Architecture",
    description:
      "Bespoke business platforms, web applications, and scalable core engines engineered around your organization's precise operating workflows.",
    imgSrc: "/assets/services/custom-software.jpg",
    icon: <Code2 size={22} />,
    linkHref: "/services/custom-software",
    ctaText: "Explore service",
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    badge: "iOS & Android",
    description:
      "High-performance native and Flutter mobile apps with offline-first local SQLite sync, push notifications, and biometric authentication.",
    imgSrc: "/assets/services/mobile-apps.jpg",
    icon: <Smartphone size={22} />,
    linkHref: "/services/mobile-apps",
    ctaText: "Explore service",
  },
  {
    id: "web-ecommerce",
    title: "Web & E-Commerce",
    badge: "High-Conversion",
    description:
      "Blazing-fast digital storefronts, member portals, and headless commerce platforms with automated checkout and real-time inventory.",
    imgSrc: "/assets/services/web-ecommerce.jpg",
    icon: <Globe size={22} />,
    linkHref: "/services/web-ecommerce",
    ctaText: "Explore service",
  },
  {
    id: "iot-solutions",
    title: "IoT Solutions",
    badge: "Smart Telemetry",
    description:
      "Connected hardware sensors, GPS vehicle tracking telematics, and real-time operational telemetry streams directly into live dashboards.",
    imgSrc: "/assets/services/iot-solutions.jpg",
    icon: <Cpu size={22} />,
    linkHref: "/services/iot-solutions",
    ctaText: "Explore service",
  },
  {
    id: "cloud-hosting",
    title: "Hosting & Cloud",
    badge: "99.9% Uptime SLA",
    description:
      "Reliable enterprise domain registration, high-speed managed cloud hosting, automated SSL, AWS cloud infrastructure, and 24/7 server monitoring.",
    imgSrc: "/assets/services/cloud-hosting.jpg",
    icon: <CloudCog size={22} />,
    linkHref: "/services/cloud-hosting",
    ctaText: "Explore service",
  },
  {
    id: "storage-backup",
    title: "Storage & Backup",
    badge: "Disaster Recovery",
    description:
      "Keep enterprise databases safe, encrypted, and backed up with automated daily snapshots and rapid point-in-time recovery protocols.",
    imgSrc: "/assets/services/storage-backup.jpg",
    icon: <Database size={22} />,
    linkHref: "/services/storage-backup",
    ctaText: "Explore service",
  },
  {
    id: "erp-consulting",
    title: "ERP Consulting",
    badge: "Digital Transformation",
    description:
      "Expert guidance to select, configure, and scale ERP and HCM suites across your entire supply chain, accounting, and multi-branch operations.",
    imgSrc: "/assets/services/erp-consulting.jpg",
    icon: <Layers size={22} />,
    linkHref: "/services/erp-consulting",
    ctaText: "Explore service",
  },
  {
    id: "seo",
    title: "SEO",
    badge: "Organic Growth",
    description:
      "Data-driven technical SEO, search engine ranking, and conversion rate optimization that elevate your digital visibility.",
    imgSrc: "/assets/services/seo.jpg",
    icon: <Megaphone size={22} />,
    linkHref: "/services/seo",
    ctaText: "Explore service",
  },
  {
    id: "bpo-freelancing",
    title: "BPO & Staffing",
    badge: "Dedicated Tech Talent",
    description:
      "Extend your workforce with dedicated Suffix developers, QA specialists, and support engineers working seamlessly as part of your team.",
    imgSrc: "/assets/services/bpo-staffing.jpg",
    icon: <Handshake size={22} />,
    linkHref: "/services/dedicated-teams",
    ctaText: "Explore service",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-2 md:py-20 lg:py-24 relative bg-[#f7fafe] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-gradient-to-tr from-[#0072bc]/5 via-[#7c3aed]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Services"
            text="Hover or tap any card to explore our specialized engineering capabilities across all 9 practice areas."
          >
            Everything to <em>build and run</em> your digital business
          </SectionHeader>
        </div>

        {/* Interactive Expanding Cards Accordion (All 9 Services) */}
        <div className="flex justify-center rv-zoom">
          <ExpandingCards items={allServices} defaultActiveIndex={0} />
        </div>

        {/* Bottom Trust & Assurance Badges */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 rv-up rv-stagger gap-4 p-5 rounded-2xl bg-white border border-[#dce8f5] shadow-[0_8px_25px_rgba(0,114,188,0.06)]">
          <div className="flex items-center gap-3 rv-up stagger-1">
            <div className="w-10 h-10 rounded-xl bg-[#0072bc]/10 text-[#0072bc] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#17162a]">ISO 27001 Certified</div>
              <div className="text-[11px] text-[#6b7794]">Bank-grade security</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rv-up stagger-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#17162a]">99.9% Uptime SLA</div>
              <div className="text-[11px] text-[#6b7794]">Guaranteed availability</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rv-up stagger-3">
            <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center shrink-0">
              <Award size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#17162a]">100% IP Ownership</div>
              <div className="text-[11px] text-[#6b7794]">Complete code rights</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rv-up stagger-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#17162a]">Agile Sprints</div>
              <div className="text-[11px] text-[#6b7794]">Bi-weekly live releases</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
