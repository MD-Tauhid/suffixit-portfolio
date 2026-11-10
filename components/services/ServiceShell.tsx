import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceMotion from "./ServiceMotion";
import "@/app/services/service.css";
import { serviceContainer, serviceHeading } from "./service-styles";
export { serviceContainer, serviceHeading, serviceButton } from "./service-styles";

export function ServiceCTA({ title = "Let's build your next chapter.", text = "Tell us about the work behind your business. We'll help you explore a practical way forward." }: { title?: string; text?: string }) {
  return <section className="!py-16 md:!py-24"><div className={serviceContainer}><div className="relative isolate overflow-hidden rounded-[28px] bg-[var(--br)] p-7 text-white md:p-14" data-service-reveal><div className="pointer-events-none absolute -right-24 -top-32 -z-10 size-[500px] rounded-full border-[70px] border-solid border-white/10" aria-hidden="true" /><div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end"><h2 className={serviceHeading}>{title}</h2><div><p className="mb-7 max-w-[420px] text-sm leading-[1.85] text-white/85">{text}</p><Link href="/contact" className="inline-flex min-h-12 items-center gap-8 rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-[var(--br)]">Discuss your project<ArrowUpRight size={18} /></Link></div></div></div></div></section>;
}
export default function ServiceShell({ children }: { children: ReactNode }) {
  return <><a href="#main" className="skip">Skip to content</a><Header /><ServiceMotion><main id="main" className="service-page overflow-clip bg-white text-[var(--ink)]">{children}</main></ServiceMotion><Footer /></>;
}
