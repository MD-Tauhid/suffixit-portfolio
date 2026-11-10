import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Check, Layers3, Plus } from "lucide-react";
import { getProduct, productDetails } from "@/lib/products";
import { getProductContent } from "@/lib/product-content";
import { servicePalette } from "@/lib/service-palette";
import ServiceShell, { ServiceCTA, serviceButton, serviceContainer, serviceHeading } from "@/components/services/ServiceShell";
import ServiceVisual from "@/components/services/ServiceVisual";

export const dynamicParams = false;
export function generateStaticParams() { return productDetails.map(product => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name + " | Suffix IT", description: product.summary, alternates: { canonical: "/products/" + product.slug }, openGraph: { title: product.name + " | Suffix IT", description: product.summary, url: "/products/" + product.slug } };
}
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = getProduct(slug);
  if (!product) notFound();
  const detail = getProductContent(product);
  const related = [...productDetails.filter(item => item.slug !== slug && item.category === product.category), ...productDetails.filter(item => item.category !== product.category)].slice(0, 3);
  const questions = [
    { q: "What does " + product.name + " cover?", a: "The key areas include " + detail.modules.map(item => item.title.toLowerCase()).join(", ") + ". Discuss the modules and configuration relevant to your business with our team." },
    { q: "Can we see the product before making a decision?", a: "Contact our team to request a product walkthrough around your use case. Bring your workflows, questions and any integration requirements." },
    { q: "Can it fit our existing systems and processes?", a: "We review your current tools, data and workflows before confirming configuration or integration options. Scope and suitability are agreed with you." },
    { q: "How do we discuss pricing and implementation?", a: "The product, required modules, configuration, integrations and support needs inform the proposal. Contact us for a discussion of your requirements." },
  ];
  return <ServiceShell>
    <section className="!pb-16 !pt-24 md:!pb-20 md:!pt-28" style={{ backgroundColor: servicePalette[product.tone] }} data-service-hero>
      <div className={serviceContainer}>
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-3 text-[11px] text-[#17162a]/[.55]"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span aria-current="page" className="text-[var(--br)]">{product.name}</span></nav>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div data-service-stagger>
            <span className="mb-6 inline-flex rounded-full bg-white/70 px-4 py-2 text-[10px] font-semibold text-[var(--br)]">{product.category}</span>
            <h1 className="!m-0 text-[clamp(42px,5.4vw,72px)] font-semibold leading-[1.08] tracking-[-2.5px]">{product.name}</h1>
            <p className="mb-7 mt-6 max-w-[520px] text-[15px] leading-[1.9] text-[#17162a]/[.65]">{product.summary}</p>
            <ul className="mb-8 grid list-none gap-3 p-0">{product.features.map(feature => <li key={feature} className="flex items-center gap-3 text-xs"><Check size={16} className="shrink-0 text-[var(--br)]" />{feature}</li>)}</ul>
            <div className="flex flex-wrap items-center gap-6"><Link href="/contact" className={serviceButton}>Request a product demo<ArrowUpRight size={17} /></Link><a href="#product-features" className="inline-flex items-center gap-3 text-xs font-semibold">Explore features<ArrowDown size={16} /></a></div>
          </div>
          <div data-service-reveal><ServiceVisual kind={product.kind} tone={product.tone === "blue" ? "sky" : "blue"} /></div>
        </div>
      </div>
    </section>

    <section className="!py-20 md:!py-24"><div className={serviceContainer}><div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20" data-service-stagger><div><p className="mb-5 text-xs font-semibold text-[var(--br)]">A closer look at {product.name}</p><h2 className={serviceHeading}>{detail.lead}</h2></div><p className="max-w-[440px] text-sm leading-[1.9] text-[#17162a]/[.65]">Start with the work your team needs to do. Explore the product capabilities below, then talk to us about the modules, setup and support that fit your organisation.</p></div></div></section>

    <section id="product-features" className="!py-20 md:!py-24" style={{ backgroundColor: servicePalette.blue }}><div className={serviceContainer}>
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" data-service-reveal><h2 className={serviceHeading}>The details<br />that do the work.</h2><p className="max-w-[360px] text-sm leading-[1.85] text-[#17162a]/[.65]">Explore the key capabilities of {product.name}.</p></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-service-stagger>{detail.modules.map(module => <article key={module.title} className="group rounded-[22px] border border-solid border-[#0072bc]/10 bg-white p-7 transition-colors duration-200 hover:border-[#0072bc]/40"><span className="flex size-11 items-center justify-center rounded-[13px] bg-[#e8f3fc] text-[var(--br)]"><Layers3 size={21} strokeWidth={1.5} /></span><h3 className="mt-6 text-[23px] font-semibold leading-[1.25] tracking-[-.6px]">{module.title}</h3><p className="mt-4 text-[13px] leading-[1.9] text-[#17162a]/[.65]">{module.text}</p></article>)}</div>
    </div></section>

    <section className="!py-20 md:!py-24"><div className={serviceContainer}><div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end" data-service-stagger><h2 className={serviceHeading}>Built for the people<br />behind your operations.</h2><p className="max-w-[395px] text-sm leading-[1.85] text-[#17162a]/[.65] lg:ml-auto">Review the product with the teams who will use it. Their day-to-day requirements help shape the right setup.</p></div><div className="grid gap-4 md:grid-cols-3" data-service-stagger>{detail.audience.map((audience, index) => <div key={audience} className="flex min-h-[130px] items-center justify-between gap-5 rounded-[20px] p-7" style={{ backgroundColor: servicePalette[(["blue", "lavender", "mint"] as const)[index % 3]] }}><h3 className="text-xl font-semibold leading-[1.3] tracking-[-.5px]">{audience}</h3><Check size={21} className="shrink-0 text-[var(--br)]" /></div>)}</div></div></section>

    <section className="!py-20 md:!py-24" style={{ backgroundColor: servicePalette.mint }}><div className={serviceContainer}><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div data-service-stagger><p className="mb-5 text-xs font-semibold text-[var(--br)]">Before you get started</p><h2 className={serviceHeading}>Your questions.<br />A clearer next step.</h2><Link href="/contact" className="mt-7 inline-flex items-center gap-3 text-xs font-semibold text-[var(--br)]">Talk about {product.name}<ArrowUpRight size={16} /></Link></div><div data-service-stagger>{questions.map(item => <details key={item.q} className="border-0 border-b border-solid border-[#0072bc]/20 py-5 first:pt-0"><summary className="flex min-h-12 cursor-pointer items-center justify-between gap-5 text-[17px] font-semibold leading-[1.5]"><span>{item.q}</span><Plus size={19} className="shrink-0 text-[var(--br)] transition-transform duration-200" /></summary><p className="pb-2 pt-4 text-sm leading-[1.9] text-[#17162a]/[.65]">{item.a}</p></details>)}</div></div></div></section>

    <section className="!pb-5 !pt-20"><div className={serviceContainer}><div className="mb-8 flex flex-wrap items-end justify-between gap-5" data-service-reveal><h2 className="text-[30px] font-semibold leading-tight tracking-[-1px]">More ways to move forward.</h2><Link href="/products" className="inline-flex items-center gap-3 text-xs font-semibold text-[var(--br)]">All products<ArrowUpRight size={16} /></Link></div><div className="grid gap-4 md:grid-cols-3" data-service-stagger>{related.map(item => <Link href={"/products/" + item.slug} key={item.slug} className="group flex min-h-[180px] flex-col rounded-[20px] p-7" style={{ backgroundColor: servicePalette[item.tone] }}><span className="text-[10px] text-[var(--br)]">{item.category}</span><h3 className="mt-4 text-[23px] font-semibold leading-tight tracking-[-.5px]">{item.name}</h3><span className="mt-auto flex items-center justify-between pt-6 text-xs font-semibold text-[var(--br)]">Product details<ArrowUpRight size={18} className="transition-transform duration-200 motion-safe:group-hover:translate-x-1" /></span></Link>)}</div></div></section>
    <ServiceCTA title={"See " + product.name + " in context."} text="Bring your workflows and questions. Request a walkthrough and explore how the product could fit your business." />
  </ServiceShell>;
}
