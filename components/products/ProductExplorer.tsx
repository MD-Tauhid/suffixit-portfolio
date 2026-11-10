"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Layers3, Search } from "lucide-react";
import { productDetails } from "@/lib/products";
import { servicePalette } from "@/lib/service-palette";
import ServiceVisual from "@/components/services/ServiceVisual";
import { serviceButton, serviceContainer, serviceHeading } from "@/components/services/service-styles";

export function ProductSpotlight() {
  const [active, setActive] = useState(0);
  const product = productDetails[active];
  return <div className="overflow-hidden rounded-[28px] bg-white" style={{ border: "1px solid var(--br)" }}>
    <div className="flex flex-wrap gap-2 border-0 border-b border-solid border-[#0072bc]/[.10] p-4 sm:gap-3 sm:px-7 sm:py-5" role="group" aria-label="Choose a product preview">
      {productDetails.slice(0, 3).map((item, index) => <button key={item.slug} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={`min-h-11 rounded-full px-4 py-2 text-[11px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--br)] sm:text-xs ${active === index ? "bg-[var(--br)] text-white" : "text-[#17162a]/[.65] hover:bg-[#0072bc]/[.05]"}`}>{item.name}</button>)}
    </div>
    <div className="grid items-center lg:grid-cols-[.75fr_1.25fr]">
      <div className="p-7 sm:p-10 lg:p-12" aria-live="polite"><span className="text-xs font-semibold text-[var(--br)]">{product.category}</span><h2 className="mt-5 text-[32px] font-semibold leading-[1.12] tracking-[-1px] md:text-[42px]">{product.name}</h2><p className="mt-5 text-sm leading-[1.85] text-[#17162a]/[.65]">{product.summary}</p><ul className="my-6 grid list-none gap-3 p-0">{product.features.map(feature => <li key={feature} className="flex items-center gap-3 text-xs"><Check size={15} className="text-[var(--br)]" />{feature}</li>)}</ul><Link href={"/products/" + product.slug} className={serviceButton}>View product details<ArrowUpRight size={17} /></Link></div>
      <div key={product.slug} className="service-preview-enter p-4 sm:p-6 lg:pl-0"><ServiceVisual kind={product.kind} tone={product.tone} /></div>
    </div>
  </div>;
}

export default function ProductExplorer() {
  const [category, setCategory] = useState("All products");
  const [query, setQuery] = useState("");
  const filtered = productDetails.filter(product => (category === "All products" || product.category === category) && (product.name + " " + product.summary).toLowerCase().includes(query.toLowerCase()));
  return <section id="product-library" className="!py-20 md:!py-28"><div className={serviceContainer}>
    <div className="mb-10 grid gap-5 lg:grid-cols-2 lg:items-end" data-service-stagger><div><p className="mb-4 text-xs font-semibold text-[var(--br)]">Our product library</p><h2 className={serviceHeading}>Find the right fit<br />for your business.</h2></div><p className="max-w-[380px] text-sm leading-[1.85] text-[#17162a]/[.65] lg:ml-auto">Explore ready-made software across people, operations, retail and communication. Talk to our team about suitability and configuration.</p></div>
    <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products">{["All products", "ERP & people", "Field & retail", "Communication", "Connected systems"].map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={`min-h-11 rounded-full border border-solid px-4 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--br)] ${category === item ? "border-[var(--br)] bg-[var(--br)] text-white" : "border-[#0072bc]/[.15] bg-white text-[#17162a]/[.65] hover:border-[var(--br)]"}`}>{item}</button>)}</div>
      <label className="flex min-h-11 items-center gap-3 rounded-full border border-solid border-[#0072bc]/[.20] px-4 py-2"><Search size={16} className="shrink-0 text-[var(--br)]" /><span className="sr-only">Search products</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search products" className="min-w-0 border-0 bg-transparent text-xs text-[var(--ink)] outline-none placeholder:text-[#17162a]/[.50]" /></label>
    </div>
    <p className="mb-5 text-[11px] text-[#17162a]/[.55]" aria-live="polite">{filtered.length} products</p>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map(product => <article id={product.slug} key={product.slug} className="group flex flex-col overflow-hidden rounded-[24px] border border-solid border-[#0072bc]/[.10] bg-white">
      <div className="relative flex h-[185px] items-center justify-center overflow-hidden" style={{ backgroundColor: servicePalette[product.tone] }} aria-hidden="true"><div className="absolute -right-9 -top-10 size-40 rounded-full border-[28px] border-solid border-white/40" /><div className="relative w-[190px] -rotate-[5deg] rounded-xl border border-solid border-[#0072bc]/[.10] bg-white p-4 shadow-[0_14px_35px_-20px_rgba(0,114,188,.3)] transition-transform duration-200 motion-safe:group-hover:rotate-0"><div className="flex items-center gap-2 text-[9px] font-semibold text-[var(--br)]"><Layers3 size={13} />{product.name}</div><div className="mt-4 flex items-end gap-1.5">{[30, 48, 40, 60, 55, 72, 65].map((height, i) => <span key={i} className="flex-1 rounded-t bg-[#0072bc]/[.30]" style={{ height: height * .6 }} />)}</div><div className="mt-3 h-1.5 w-3/4 rounded bg-[#0072bc]/[.10]" /></div></div>
      <div className="flex flex-1 flex-col p-6 md:p-7"><span className="text-[10px] font-semibold text-[var(--br)]">{product.category}</span><h3 className="mt-3 text-[23px] font-semibold leading-tight tracking-[-.7px]">{product.name}</h3><p className="mt-4 text-[13px] leading-[1.85] text-[#17162a]/[.65]">{product.summary}</p><ul className="my-6 grid list-none gap-3 p-0">{product.features.map(feature => <li key={feature} className="flex items-center gap-2 text-[11px]"><Check size={13} className="text-[var(--br)]" />{feature}</li>)}</ul><Link href={"/products/" + product.slug} className="mt-auto flex min-h-11 items-center justify-between border-0 border-t border-solid border-[#0072bc]/[.10] pt-4 text-xs font-semibold text-[var(--br)]">View product details<ArrowUpRight size={17} /></Link></div>
    </article>)}</div>
    {filtered.length === 0 && <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: servicePalette.blue }}><p className="text-xl font-semibold">No products match that search.</p><p className="mt-3 text-sm text-[#17162a]/[.65]">Try another term or browse all products.</p><button type="button" aria-label="Reset product filters" onClick={() => { setCategory("All products"); setQuery(""); }} className="mt-5 min-h-11 text-sm font-semibold text-[var(--br)]">Reset filters</button></div>}
  </div></section>;
}
