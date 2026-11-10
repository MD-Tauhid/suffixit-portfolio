import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import ServiceShell, { ServiceCTA, serviceButton, serviceContainer, serviceHeading } from "@/components/services/ServiceShell";
import ProductExplorer, { ProductSpotlight } from "@/components/products/ProductExplorer";
import { servicePalette } from "@/lib/service-palette";

export const metadata: Metadata = { title: "Software Products | Suffix IT", description: "Explore Field Force Management, Rupantar HCM, ERP, POS, e-commerce and other ready-made software from Suffix IT.", alternates: { canonical: "/products" } };
export default function ProductsPage() {
  return <ServiceShell>
    <section className="!pb-16 !pt-24 md:!pb-20 md:!pt-28" style={{ backgroundColor: servicePalette.blue }}><div className={serviceContainer}><div className="mx-auto mb-12 max-w-[850px] text-center" data-service-stagger><p className="mb-5 text-xs font-semibold text-[var(--br)]">Ready-made software products</p><h1 className="!m-0 text-[clamp(43px,6.4vw,84px)] font-semibold leading-[1.06] tracking-[-3px]">Built for business.<br />Ready to work.</h1><p className="mx-auto mb-8 mt-7 max-w-[580px] text-[15px] leading-[1.85] text-[#17162a]/[.65]">Bring everyday operations together with software for your people, customers and teams in the field. Explore the Suffix IT product suite.</p><a href="#product-library" className={serviceButton}>Find your software<ArrowDown size={17} /></a></div><div data-service-reveal><ProductSpotlight /></div></div></section>
    <ProductExplorer />
    <section className="!py-20 md:!py-24" style={{ backgroundColor: servicePalette.mint }}><div className={serviceContainer}><div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20"><div data-service-stagger><p className="mb-5 text-xs font-semibold text-[var(--br)]">A product is only the beginning</p><h2 className={serviceHeading}>A better fit.<br />A clearer way forward.</h2></div><div data-service-stagger><p className="mb-7 text-sm leading-[1.9] text-[#17162a]/[.65]">Start with a product conversation. We help you understand the relevant features, review your requirements and plan the next steps for your team.</p><ul className="mb-8 grid list-none gap-4 p-0">{["A walkthrough around your use case", "Configuration and integration discussions", "Training and support requirements"].map(item => <li key={item} className="flex items-center gap-3 text-[13px]"><Check size={16} className="text-[var(--br)]" />{item}</li>)}</ul><Link href="/contact" className={serviceButton}>Request a product walkthrough<ArrowUpRight size={17} /></Link></div></div></div></section>
    <ServiceCTA title="Your next business system starts with a conversation." />
  </ServiceShell>;
}
