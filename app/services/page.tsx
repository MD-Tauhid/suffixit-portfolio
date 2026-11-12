import type { Metadata } from "next";
import ServiceShell, { ServiceCTA } from "@/components/services/ServiceShell";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesShowcase from "@/components/services/ServicesShowcase";
import ServicesSpecializedPractices from "@/components/services/ServicesSpecializedPractices";

export const metadata: Metadata = {
  title: "Enterprise IT & Software Engineering Services | Suffix IT Limited",
  description:
    "Explore Suffix IT's 14 core enterprise practices: custom software, ERP consulting, cloud hosting, IoT telematics, mobile apps, and cybersecurity in Dhaka, Bangladesh.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <ServiceShell>
      {/* 1. Next-Gen 3D Holographic Operations Console Hero with Mouse Parallax */}
      <ServicesHero />

      {/* 2. Practice Areas & Capabilities: 5 Core Practices Showcase + Interactive Physics Pill Field */}
      <ServicesShowcase />

      {/* 3. Circular Reveal Portal: 9 Specialized Disciplines & Enterprise Infrastructure (06 – 14) */}
      <ServicesSpecializedPractices />

      {/* 4. Final Conversion CTA Card */}
      <ServiceCTA />
    </ServiceShell>
  );
}
