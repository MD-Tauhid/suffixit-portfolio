import type { Metadata } from "next";
import ServiceShell, { ServiceCTA } from "@/components/services/ServiceShell";
import ProductHero from "@/components/products/ProductHero";
import ProductStickyShowcase from "@/components/products/ProductStickyShowcase";
import ProductExplorer from "@/components/products/ProductExplorer";
import EnterpriseCustomizationBento from "@/components/products/EnterpriseCustomizationBento";

export const metadata: Metadata = {
  title: "Enterprise Software Products & Suite | Suffix IT",
  description:
    "Explore Rupantar ERP, Field Force Management (FFMS), Rupantar HCM, Smart POS, E-commerce, and the complete Suffix IT software product suite.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <ServiceShell>
      {/* 1. Dynamic Editorial Hero Section with WebGL Glass Stage */}
      <ProductHero />

      {/* 2. Signature Sticky Steps Showcase (4 Flagship Systems with 3D Renders & Live Telemetry) */}
      <ProductStickyShowcase />

      {/* 3. Comprehensive Product Library with 3D Visual Cards, Instant Search and Category Filtering */}
      <ProductExplorer />

      {/* 4. Enterprise Customization & Systems Integration Bento Matrix */}
      <EnterpriseCustomizationBento />

      {/* 5. Direct Action CTA */}
      <ServiceCTA
        title="Ready to elevate your business operations with Suffix IT software?"
      />
    </ServiceShell>
  );
}
