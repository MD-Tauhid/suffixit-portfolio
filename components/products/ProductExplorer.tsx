"use client";

import * as React from "react";
import { Layers3 } from "lucide-react";
import { productDetails } from "@/lib/products";
import { serviceHeading } from "@/components/services/service-styles";
import ProductNotchedCard from "./ProductNotchedCard";

// 12 Products distributed across 4 columns (3 products per column)
const col1Products = [
  productDetails[2], // 1. Rupantar ERP (Core Enterprise)
  productDetails[4], // 5. Suffix E-Commerce Suite (Omnichannel Web)
  productDetails[8], // 9. Bulk SMS & Web Meeting (Omnichannel Comms)
];

const col2Products = [
  productDetails[0], // 2. Field Force Management (FFMS) (GPS Telemetry)
  productDetails[6], // 6. Hotel Booking System (Hospitality PMS)
  productDetails[9], // 10. Automated Payroll System (Salary & Tax)
];

const col3Products = [
  productDetails[1], // 3. Rupantar HCM & Payroll (Biometric & Tax)
  productDetails[3], // 7. Provident Fund System (Trust & Pension)
  productDetails[10], // 11. Rupantor Multi-Warehouse (Batch & Barcode)
];

const col4Products = [
  productDetails[5], // 4. Smart POS & Retail Billing (High-Speed Counter)
  productDetails[7], // 8. Interconnect Telecom Billing (CDR Rating)
  productDetails[11], // 12. Smart Transformer Monitoring (Industrial IoT)
];

export default function ProductExplorer() {
  return (
    <section
      id="product-library"
      className="relative overflow-hidden border-y border-[#0072bc]/10 !py-20 md:!py-28"
      style={{
        backgroundColor: "#f5f9fe",
        backgroundImage:
          "linear-gradient(180deg, #f7fafd 0%, #edf5fc 22%, #e5f1fa 50%, #eef6fd 78%, #edf7f5 100%)",
      }}
    >
      {/* Ambient Atmospheric Brand Glows */}
      <div
        className="pointer-events-none absolute -top-44 left-1/2 -translate-x-1/2 size-[920px] rounded-full bg-gradient-to-b from-[#0072bc]/12 via-[#00c2ff]/8 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-36 top-1/4 size-[620px] rounded-full bg-gradient-to-tr from-[#0072bc]/10 via-[#00c2ff]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-36 bottom-1/4 size-[650px] rounded-full bg-gradient-to-bl from-[#00c2ff]/10 via-[#0072bc]/8 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Subtle Technical Dot Matrix Mesh */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 114, 188, 0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-[calc(100%-32px)] max-w-[1380px] md:w-[calc(100%-64px)]">
        {/* Section Title & Narrative */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[#0072bc]/20 bg-white/90 px-3.5 py-1 text-xs font-semibold text-[var(--br)] shadow-xs backdrop-blur-md">
              <Layers3 size={14} />
              <span>Complete Product Portfolio</span>
            </div>
            <h2 className={serviceHeading}>
              Browse all 12 ready-made
              <br />
              <span className="text-[var(--br)]">software platforms.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:ml-auto lg:items-end">
            <p className="max-w-[480px] text-sm leading-[1.85] text-[#17162a]/75 lg:text-right">
              Every platform in the Suffix IT suite features production-grade web, mobile, and API
              foundations. Explore our 12 turnkey enterprise platforms arranged across operations, human capital, retail, and communications.
            </p>
          </div>
        </div>

        {/* Signature 4-Column Zigzag Staggered Wall: All 12 Products Permanently Displayed */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Baseline high */}
          <div className="flex flex-col gap-6">
            {col1Products.map((product) => (
              <ProductNotchedCard key={product.slug} product={product} />
            ))}
          </div>

          {/* Column 2: Staggered low (+96px on desktop for distinct zigzag wave) */}
          <div className="flex flex-col gap-6 pt-0 sm:pt-12 lg:pt-24">
            {col2Products.map((product) => (
              <ProductNotchedCard key={product.slug} product={product} />
            ))}
          </div>

          {/* Column 3: Elevated high (+20px on desktop) */}
          <div className="flex flex-col gap-6 pt-0 lg:pt-5">
            {col3Products.map((product) => (
              <ProductNotchedCard key={product.slug} product={product} />
            ))}
          </div>

          {/* Column 4: Staggered low (+112px on desktop for zigzag wave completion) */}
          <div className="flex flex-col gap-6 pt-0 sm:pt-12 lg:pt-28">
            {col4Products.map((product) => (
              <ProductNotchedCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
