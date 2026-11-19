import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, productDetails } from "@/lib/products";
import { getProductContent } from "@/lib/product-content";
import ServiceShell from "@/components/services/ServiceShell";
import { getProductMedia } from "@/components/products/productDataMap";

// Nagorik-style Product Detail Components matching reference layout
import ProductDetailHeroNagorik from "@/components/products/detail/ProductDetailHeroNagorik";
import ProductDetailAboutNagorik from "@/components/products/detail/ProductDetailAboutNagorik";
import ProductDetailPillarsNagorik from "@/components/products/detail/ProductDetailPillarsNagorik";
import ProductDetailEcosystemNagorik from "@/components/products/detail/ProductDetailEcosystemNagorik";
import ProductDetailWhyChooseNagorik from "@/components/products/detail/ProductDetailWhyChooseNagorik";
import ProductDetailModulesNagorik from "@/components/products/detail/ProductDetailModulesNagorik";
import ProductDetailStepsNagorik from "@/components/products/detail/ProductDetailStepsNagorik";
import ProductDetailVideoTeaserNagorik from "@/components/products/detail/ProductDetailVideoTeaserNagorik";
import ProductDetailPortfolioNagorik from "@/components/products/detail/ProductDetailPortfolioNagorik";
import ProductDetailLeadFormNagorik from "@/components/products/detail/ProductDetailLeadFormNagorik";
import ProductDetailTeamNagorik from "@/components/products/detail/ProductDetailTeamNagorik";
import ProductDetailFAQNagorik from "@/components/products/detail/ProductDetailFAQNagorik";
import ProductDetailFinalCTANagorik from "@/components/products/detail/ProductDetailFinalCTANagorik";

export const dynamicParams = false;

export function generateStaticParams() {
  return productDetails.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Suffix IT Software Suite`,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Suffix IT`,
      description: product.summary,
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const detail = getProductContent(product);
  const mediaConfig = getProductMedia(slug);

  const questions = [
    {
      q: `What modules and workflows are included in ${product.name}?`,
      a: `The platform core includes ${detail.modules
        .map((item) => item.title.toLowerCase())
        .join(
          ", "
        )}. During setup, our implementation engineers tailor formulas, permissions, and system workflows to match your exact business rules.`,
    },
    {
      q: "Can we migrate our existing historical data from Excel or other legacy software?",
      a: "Yes. Suffix IT provides full turnkey data migration. We sanitize, validate, and import your existing master employee profiles, attendance records, financial ledgers, and historical documents without operational downtime.",
    },
    {
      q: "Does this integrate with our biometric timeclocks and electronic bank portals?",
      a: "Absolutely. We support native TCP/IP direct sync with ZKTeco, Realtime, Virdi, and RFID devices. For payroll disbursement, our automated engine generates BEFTN / NPSB-compliant files for City Bank, EBL, BRAC Bank, Dutch-Bangla, and all 60+ scheduled banks in Bangladesh.",
    },
    {
      q: "How are statutory taxes, Provident Fund (PF), and NBR regulations maintained?",
      a: "The statutory calculation engine is automatically updated whenever the National Board of Revenue (NBR) publishes revised fiscal tax slabs or exemptions. It calculates monthly TDS withholdings, year-end Form 108A summaries, and individual employee tax deduction certificates automatically.",
    },
    {
      q: "How does pricing and software deployment work?",
      a: "We offer both Cloud Managed SaaS (monthly or annual subscription with zero server maintenance) and On-Premise Enterprise Licenses (perpetual license deployed inside your corporate server room). Contact our solution specialists for an itemized proposal.",
    },
    {
      q: "What level of enterprise SLA and post-deployment support is included?",
      a: "Every deployment includes guaranteed SLA response windows, dedicated account managers, regular patch updates, on-site training for HR and finance operators, and 24/7 mission-critical emergency helpline access.",
    },
    {
      q: "Is multi-branch and multi-shift factory operation supported?",
      a: "Yes. The platform supports unlimited branches, multi-tier organizational hierarchies, and round-the-clock rotating shifts with automated night allowance and overtime calculations.",
    },
  ];

  return (
    <ServiceShell>
      {/* 1. HERO SECTION: Green pill tag, bold title, dual buttons (dark + gold), editorial photo with floating badges */}
      <ProductDetailHeroNagorik product={product} mediaConfig={mediaConfig} />

      {/* 2. ABOUT SECTION: Watermark icon and video preview card with gold "Watch in 60s" button */}
      <ProductDetailAboutNagorik product={product} />

      {/* 3. SMARTER DECISIONS / 3 PILLARS: Checklist items & UI device render */}
      <ProductDetailPillarsNagorik product={product} mediaConfig={mediaConfig} />

      {/* 4. ECOSYSTEM PERSPECTIVE SWITCHER: Interactive HR vs Finance tabs + 5 workflow items + photo */}
      <ProductDetailEcosystemNagorik product={product} />

      {/* 5. HIGH-CONTRAST DARK SECTION: "Why Choose Suffix [Product]" with 6 colorful glowing cards */}
      <ProductDetailWhyChooseNagorik product={product} />

      {/* 6. CAPABILITIES & MODULES: Left 4-photo collage and right vertical accordion with active yellow star badge */}
      <ProductDetailModulesNagorik product={product} modules={detail.modules} />

      {/* 7. 4 STEPS TO DEPLOY: 01-04 numbered steps, bottom deployment button, and right 3-block pastel photo collage */}
      <ProductDetailStepsNagorik product={product} />

      {/* 8. WIDESCREEN VIDEO WALKTHROUGH TEASER: Centered play button modal */}
      <ProductDetailVideoTeaserNagorik product={product} />

      {/* 9. PORTFOLIO / CASE STUDIES: 4 large stacked horizontal cards with pastel backgrounds (Sky, Purple, Rose, Yellow) */}
      <ProductDetailPortfolioNagorik product={product} />

      {/* 10. DARK LEAD CONSULTATION CARD: Golden/amber radial glow, advisor profile on left, clean white form card on right */}
      <ProductDetailLeadFormNagorik productName={product.name} />

      {/* 11. DARK TEAM GOVERNANCE: 2 large structured cards for engineering and delivery excellence */}
      <ProductDetailTeamNagorik productName={product.name} />

      {/* 12. FREQUENTLY ASKED QUESTIONS: Advisor profile on left + expandable FAQ accordion on right */}
      <ProductDetailFAQNagorik product={product} questions={questions} />

      {/* 13. FINAL CTA BANNER: Clean light card with team photo collage, checklist points, and dual action buttons */}
      <ProductDetailFinalCTANagorik product={product} />
    </ServiceShell>
  );
}
