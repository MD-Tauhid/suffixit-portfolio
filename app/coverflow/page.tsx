"use client";

import React, { useState } from "react";
import { CoverFlow, CoverFlowItem } from "@/components/ui/cover-flow";

const PRODUCT_COVERS: CoverFlowItem[] = [
  {
    title: "Field Force Management (FFMS)",
    subtitle: "1,420 Reps Online • 99.2% GPS Geofence",
    src: "/assets/products/product-field-force-light.jpg",
  },
  {
    title: "Rupantar ERP Suite",
    subtitle: "Central Inventory Sync • NBR VAT 9.1",
    src: "/assets/products/product-erp-light.jpg",
  },
  {
    title: "Enterprise HCM & Payroll",
    subtitle: "12,500+ Employees • Biometric Sync",
    src: "/assets/products/product-hcm-light.jpg",
  },
  {
    title: "Smart Cloud POS & Retail",
    subtitle: "0.4s Offline Invoicing • Barcode Scanner",
    src: "/assets/products/product-pos-light.jpg",
  },
  {
    title: "Suffix E-commerce Platform",
    subtitle: "Sub-Second Page Load • Instant Checkout",
    src: "/assets/products/product-ecommerce-light.jpg",
  },
  {
    title: "Suffix Provident Fund (PF)",
    subtitle: "Statutory Accounting • Automated Ledger",
    src: "/assets/products/product-provident-fund-light.jpg",
  },
  {
    title: "Telecom Billing Engine (ICX)",
    subtitle: "50M+ Daily CDRs • BTRC Tariff Matrix",
    src: "/assets/products/product-icx-billing-light.jpg",
  },
  {
    title: "Hotel Booking & Property Management",
    subtitle: "Multi-OTA Channel Manager • 3D Room Engine",
    src: "/assets/products/product-hotel-booking-light.jpg",
  },
  {
    title: "Bulk SMS & Video Meeting",
    subtitle: "0.8s OTP Delivery • Encrypted WebRTC Video",
    src: "/assets/products/product-sms-meeting-light.jpg",
  },
];

export default function CoverFlowPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <main className="min-h-screen w-full bg-[#030712] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full">
            Apple-Grade 3D Cover Flow
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-3 tracking-tight">
            Our Ready-Made Products
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            Drag, scroll with mouse wheel, or use arrow keys to navigate
          </p>
        </div>

        <div className="w-full h-[520px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <CoverFlow
            items={PRODUCT_COVERS}
            index={selectedIndex}
            onIndexChange={setSelectedIndex}
            autoplay={true}
            interval={4}
            loop={true}
            stageColor="#000000"
            pageColor="#030712"
            accent="#38bdf8"
            captionColor="#ffffff"
            showReflection={true}
            showCaptions={true}
            sway={1}
            wheel={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400">
            Active: {PRODUCT_COVERS[selectedIndex]?.title}
          </span>
        </div>
      </div>
    </main>
  );
}
