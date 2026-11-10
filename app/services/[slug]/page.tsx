import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";
import { getService, serviceDetails } from "@/lib/services";
import { servicePalette } from "@/lib/service-palette";
import ServiceShell, { ServiceCTA, serviceButton, serviceContainer, serviceHeading } from "@/components/services/ServiceShell";
import ServiceVisual from "@/components/services/ServiceVisual";
import ServiceCapabilities from "@/components/services/ServiceCapabilities";

export const dynamicParams = false;
export function generateStaticParams() { return serviceDetails.map(service => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = getService(slug);
  if (!service) return {};
  return { title: service.name + " | Suffix IT", description: service.summary, alternates: { canonical: "/services/" + service.slug }, openGraph: { title: service.name + " | Suffix IT", description: service.summary, url: "/services/" + service.slug } };
}
const stages = [
  { title: "Understand the work", text: "We discuss your goals, users, current systems and the constraints that matter.", deliverable: "Shared requirements & scope", tone: "blue" },
  { title: "Shape the solution", text: "We review the proposed approach with you before committing to implementation.", deliverable: "A reviewed solution plan", tone: "lavender" },
  { title: "Build & validate", text: "The agreed work moves forward with practical reviews, feedback and testing.", deliverable: "Implementation & validation", tone: "mint" },
  { title: "Launch & stay involved", text: "We prepare the handover, discuss training and agree the support you need next.", deliverable: "Handover & support plan", tone: "sky" },
] as const;

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = getService(slug);
  if (!service) notFound();
  const related = serviceDetails.filter(item => item.slug !== slug).slice(0, 3);
  return <ServiceShell>
    <section className="!pb-14 !pt-24 md:!pb-20 md:!pt-28" data-service-hero>
      <div className={serviceContainer}>
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-3 text-[11px] text-[#17162a]/[.55]"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span aria-current="page" className="text-[var(--br)]">{service.name}</span></nav>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div data-service-stagger>
            <p className="mb-5 text-xs font-semibold text-[var(--br)]">{service.name}</p>
            <h1 className="!m-0 text-[clamp(40px,5vw,70px)] font-semibold leading-[1.07] tracking-[-2.5px]">{service.headline[0]}<br />{service.headline[1]}</h1>
            <p className="mb-8 mt-7 max-w-[520px] text-[15px] leading-[1.85] text-[#17162a]/[.65]">{service.summary}</p>
            <div className="flex flex-wrap items-center gap-6"><Link href="/contact" className={serviceButton}>Let&apos;s talk {service.name.toLowerCase()}<ArrowUpRight size={18} /></Link><a href="#capabilities" className="inline-flex items-center gap-3 text-xs font-semibold">Explore the service<ArrowDown size={16} className="text-[var(--br)]" /></a></div>
          </div>
          <div data-service-reveal><ServiceVisual kind={service.kind} tone={service.tone} /></div>
        </div>
      </div>
    </section>
    <div className={serviceContainer}><div className="flex flex-wrap items-center justify-between gap-5 border-0 border-y border-solid border-[#0072bc]/[.10] py-6 text-xs text-[#17162a]/[.60]"><span>Software &amp; ICT expertise</span><span>Building since 2017</span><span>Dhaka, Bangladesh</span><span className="hidden text-[var(--br)] md:inline">Built around your business.</span></div></div>
    <section className="!py-20 md:!py-28"><div className={serviceContainer}><div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
      <div data-service-reveal><ServiceVisual kind={service.kind} tone={service.tone === "mint" ? "blue" : "mint"} compact /></div>
      <div data-service-stagger><p className="mb-5 text-xs font-semibold text-[var(--br)]">The right fit matters</p><h2 className={serviceHeading}>{service.outcome}</h2><p className="mb-7 mt-6 text-sm leading-[1.9] text-[#17162a]/[.65]">{service.introduction}</p><ul className="grid list-none gap-4 p-0">{service.benefits.map(benefit => <li key={benefit} className="flex items-start gap-3 text-[13px]"><Check size={17} className="mt-0.5 shrink-0 text-[var(--br)]" />{benefit}</li>)}</ul></div>
    </div></div></section>
    <section id="capabilities" className="!py-20 md:!py-28" style={{ backgroundColor: servicePalette.blue }}><div className={serviceContainer}>
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20" data-service-stagger><h2 className={serviceHeading}>What we can<br />make possible.</h2><p className="max-w-[410px] text-sm leading-[1.85] text-[#17162a]/[.65]">Explore the areas of {service.name.toLowerCase()} we can help with. The right combination starts with understanding your requirements.</p></div>
      <ServiceCapabilities service={service} />
    </div></section>
    <section className="!py-20 md:!py-28"><div className={serviceContainer}>
      <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20" data-service-stagger><div><p className="mb-4 text-xs font-semibold text-[var(--br)]">From first conversation to next steps</p><h2 className={serviceHeading}>A clear process.<br />A shared direction.</h2></div><p className="max-w-[400px] text-sm leading-[1.85] text-[#17162a]/[.65]">Know what happens next. We bring you into the decisions that shape the work, with a scope and delivery approach agreed together.</p></div>
      <div className="space-y-5">{stages.map((stage, index) => <div key={stage.title} data-service-process className="relative lg:sticky" style={{ top: 96 + index * 14, zIndex: index + 1 }}><article className="grid gap-7 rounded-[24px] p-7 md:grid-cols-[80px_1.2fr_1fr] md:items-center md:gap-10 md:p-10 lg:min-h-[260px]" style={{ backgroundColor: servicePalette[stage.tone] }}><span className="text-[48px] font-medium leading-none tracking-[-2px] text-[#0072bc]/[.45]">0{index + 1}</span><div><h3 className="text-[26px] font-semibold leading-tight tracking-[-.7px] md:text-[32px]">{stage.title}</h3><p className="mt-4 max-w-[450px] text-sm leading-[1.85] text-[#17162a]/[.65]">{stage.text}</p></div><div className="rounded-2xl bg-white/70 p-6"><span className="text-[10px] font-semibold text-[var(--br)]">What moves us forward</span><p className="mt-3 text-[18px] font-medium leading-snug">{stage.deliverable}</p><div className="mt-5 flex items-center gap-2 text-[10px] text-[#17162a]/[.60]"><Check size={13} className="text-[var(--br)]" />Reviewed together</div></div></article></div>)}</div>
    </div></section>
    <section className="!py-20 md:!py-28" style={{ backgroundColor: servicePalette.sky }}><div className={serviceContainer}><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div data-service-stagger><p className="mb-5 text-xs font-semibold text-[var(--br)]">A little clarity before we begin</p><h2 className={serviceHeading}>Good questions.<br />Clear answers.</h2><Link href="/contact" className="mt-7 inline-flex items-center gap-4 text-xs font-semibold text-[var(--br)]">Ask us something else<ArrowUpRight size={16} /></Link></div><div data-service-stagger>{[...service.questions, { q: "What happens after we get in touch?", a: "We discuss your goals and requirements, identify the information we need, and outline a suitable scope and next steps. A proposal follows once there is enough detail." }].map(item => <details key={item.q} className="group border-0 border-b border-solid border-[#0072bc]/[.20] py-5 first:pt-0"><summary className="flex min-h-12 cursor-pointer items-center justify-between gap-6 text-[17px] font-semibold leading-[1.5]"><span>{item.q}</span><Plus size={19} className="shrink-0 text-[var(--br)] transition-transform duration-200" /></summary><p className="max-w-[590px] pb-2 pt-4 text-sm leading-[1.9] text-[#17162a]/[.65]">{item.a}</p></details>)}</div></div></div></section>
    <section className="!pb-6 !pt-20"><div className={serviceContainer}><div className="mb-8 flex flex-wrap items-end justify-between gap-6" data-service-reveal><h2 className="text-[30px] font-semibold leading-tight tracking-[-1px]">Expertise that connects.</h2><Link href="/services" className="inline-flex items-center gap-3 text-xs font-semibold text-[var(--br)]">All services<ArrowUpRight size={16} /></Link></div><div className="grid gap-4 md:grid-cols-3" data-service-stagger>{related.map((item, index) => <Link key={item.slug} href={"/services/" + item.slug} className="group flex min-h-[150px] flex-col justify-between rounded-[20px] p-6" style={{ backgroundColor: servicePalette[(["blue", "lavender", "mint"] as const)[index]] }}><span className="text-[10px] text-[var(--br)]">Explore the service</span><span className="flex items-center justify-between gap-4 text-xl font-semibold">{item.name}<ArrowUpRight size={22} className="transition-transform duration-200 motion-safe:group-hover:translate-x-1" /></span></Link>)}</div></div></section>
    <ServiceCTA title={"Let's talk " + service.name.toLowerCase() + "."} text="Bring your requirements, questions and ideas. We'll help you understand the options and the next step." />
  </ServiceShell>;
}
