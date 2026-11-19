"use client";

import React from "react";
import type { CarouselItem } from "@/components/ui/connected-carousel";
import { CalendlyCarousel } from "@/components/ui/connected-carousel";

export const SUFFIX_STORIES_DATA: CarouselItem[] = [
  {
    id: "field-force-ops",
    stat: "1,420+ Field Reps Online",
    quote:
      "Deploying Suffix FFMS synchronized real-time GPS orders across all 64 districts with zero offline sync errors.",
    author: "Tariqul Islam",
    role: "Head of Distribution Logistics at Apex National",
    defaultImage: "/assets/stories/story-field-force.jpg",
    selectedImage: "/assets/stories/story-field-force.jpg",
    alt: "Commercial logistics director analyzing field force operations and GPS telemetry",
  },
  {
    id: "enterprise-erp",
    stat: "99.8% On-Time Ledger Close",
    quote:
      "Rupantar ERP unified multi-warehouse inventory and statutory NBR VAT compliance across our 12 manufacturing plants.",
    author: "Farhana Ahmed",
    role: "Chief Financial Officer at Fair Group",
    defaultImage: "/assets/stories/story-enterprise-erp.jpg",
    selectedImage: "/assets/stories/story-enterprise-erp.jpg",
    alt: "Enterprise financial controller analyzing real-time ERP analytics",
  },
  {
    id: "smart-pos-retail",
    stat: "0.3s Barcode Checkout Speed",
    quote:
      "During festive flash crowds, Smart POS processed hundreds of parallel counters offline without a single second of downtime.",
    author: "Rahim Chowdhury",
    role: "VP of Retail Operations at Shwapno Retail Chain",
    defaultImage: "/assets/stories/story-smart-pos.jpg",
    selectedImage: "/assets/stories/story-smart-pos.jpg",
    alt: "Smart retail counter manager reviewing offline POS transactions",
  },
  {
    id: "hcm-workforce",
    stat: "3,500+ Staff Payroll in Minutes",
    quote:
      "Biometric attendance sync and automated tax slabs in Rupantar HCM cut monthly payroll processing time from 4 days to 2 hours.",
    author: "Nasrin Sultana",
    role: "Director of Human Resources at Standard Group",
    defaultImage: "/assets/stories/story-hcm-payroll.jpg",
    selectedImage: "/assets/stories/story-hcm-payroll.jpg",
    alt: "HR Director reviewing biometric workforce analytics in modern headquarters",
  },
  {
    id: "telecom-icx",
    stat: "50M+ Daily Telecom Records",
    quote:
      "The carrier-grade ICX billing engine handles immense CDR traffic spikes effortlessly with automated BTRC reconciliation.",
    author: "Tanvir Hasan",
    role: "Chief Technology Officer at Mother Telecom ICX",
    defaultImage: "/assets/stories/story-telecom-icx.jpg",
    selectedImage: "/assets/stories/story-telecom-icx.jpg",
    alt: "Telecom network engineer monitoring carrier billing infrastructure",
  },
];

export default function CarouselDemo() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-indigo-100/40 via-background to-orange-100/40 dark:from-background dark:via-background dark:to-background">
      <CalendlyCarousel
        items={SUFFIX_STORIES_DATA}
        autoPlayInterval={6000}
        pauseOnHover={false}
      />
    </main>
  );
}
