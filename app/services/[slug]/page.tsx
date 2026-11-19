import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, serviceDetails } from "@/lib/services";
import ServiceShell from "@/components/services/ServiceShell";
import { getServiceMedia } from "@/components/services/serviceDataMap";

// Nagorik-style Service Detail Components matching reference layout
import ServiceDetailHeroNagorik from "@/components/services/detail/ServiceDetailHeroNagorik";
import ServiceDetailAboutNagorik from "@/components/services/detail/ServiceDetailAboutNagorik";
import ServiceDetailTalentMatrixNagorik from "@/components/services/detail/ServiceDetailTalentMatrixNagorik";
import ServiceDetailWhyChooseNagorik from "@/components/services/detail/ServiceDetailWhyChooseNagorik";
import ServiceDetailTestimonialsNagorik from "@/components/services/detail/ServiceDetailTestimonialsNagorik";
import ServiceDetailValueBentoNagorik from "@/components/services/detail/ServiceDetailValueBentoNagorik";
import Tech from "@/components/sections/Tech";
import ServiceDetailEngagementNagorik from "@/components/services/detail/ServiceDetailEngagementNagorik";
import ServiceDetailFAQNagorik from "@/components/services/detail/ServiceDetailFAQNagorik";
import ServiceDetailLeadFormNagorik from "@/components/services/detail/ServiceDetailLeadFormNagorik";
import ServiceDetailRelatedNagorik from "@/components/services/detail/ServiceDetailRelatedNagorik";
import ServiceDetailFinalCTANagorik from "@/components/services/detail/ServiceDetailFinalCTANagorik";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.name} | Suffix IT Limited`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | Suffix IT`,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const mediaConfig = getServiceMedia(slug);
  const related = serviceDetails.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <ServiceShell>
      {/* 1. HERO SECTION: Category tag, clear service title, dual buttons, signature notched card */}
      <ServiceDetailHeroNagorik service={service} mediaConfig={mediaConfig} />

      {/* 2. ABOUT SECTION: Watermark icon + photo + soft yellow accent value card */}
      <ServiceDetailAboutNagorik service={service} mediaConfig={mediaConfig} />

      {/* 3. TALENT & CAPABILITY MATRIX: Interactive role selector + dynamic tech stack preview card */}
      <ServiceDetailTalentMatrixNagorik service={service} />

      {/* 4. WHY CHOOSE SUFFIX IT: 6 glowing cards in Suffix IT theme palette */}
      <ServiceDetailWhyChooseNagorik service={service} />

      {/* 5. TESTIMONIALS & STATS BENTO: 4-card bento with reviews, 99.98% SLA card, ৳500M+ volume card */}
      <ServiceDetailTestimonialsNagorik />

      {/* 6. VALUE BENTO GRID: 5-block layout with collaboration photo, code reviews, direct architect access, 2-week sprints */}
      <ServiceDetailValueBentoNagorik />

      {/* 7. TECH WE USE: Modern stack dual marquee with colored tech logos (from Homepage) */}
      <Tech />

      {/* 8. 4 FLEXIBLE ENGAGEMENT MODELS: Dedicated Pod, Staff Augmentation, Turnkey, SLA Retainer */}
      <ServiceDetailEngagementNagorik />

      {/* 9. FREQUENTLY ASKED QUESTIONS: Advisor profile on left + expandable FAQ accordion on right */}
      <ServiceDetailFAQNagorik service={service} />

      {/* 10. STRATEGIC CONSULTATION LEAD FORM: Suffix IT brand gradient + clean white form card */}
      <ServiceDetailLeadFormNagorik serviceName={service.name} />

      {/* 11. EXPERTISE THAT CONNECTS: Related service practices */}
      <ServiceDetailRelatedNagorik services={related} />

      {/* 12. FINAL CTA BANNER: Clean light card with team photo collage, checklist points, and dual action buttons */}
      <ServiceDetailFinalCTANagorik service={service} />
    </ServiceShell>
  );
}
