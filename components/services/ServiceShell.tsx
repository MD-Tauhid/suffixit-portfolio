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
  return (
    <section className="!py-16 md:!py-24">
      <div className={serviceContainer}>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-r from-[#005a96] via-[#0072bc] to-[#0284c7] p-8 text-white md:p-14 shadow-[0_25px_60px_-15px_rgba(0,114,188,0.35)]" data-service-reveal>
          <div className="pointer-events-none absolute -right-24 -top-32 -z-10 size-[500px] rounded-full border-[70px] border-solid border-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 -z-10 size-[350px] rounded-full bg-white/5 blur-3xl" aria-hidden="true" />
          <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Technical Architecture Scoping · Fast 24h Response</span>
              </div>
              <h2 className={serviceHeading}>{title}</h2>
              <p className="mt-4 max-w-[500px] text-sm sm:text-base leading-[1.8] text-white/90">{text}</p>
            </div>
            <div className="flex flex-col sm:items-end justify-center gap-4">
              <Link href="/contact" className="group inline-flex min-h-[52px] items-center justify-between gap-6 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold text-[#0072bc] shadow-lg transition-all duration-300 hover:bg-[#f0f7fe] hover:shadow-xl hover:scale-[1.02] cursor-pointer">
                <span>Discuss your project with architects</span>
                <span className="grid size-7 place-items-center rounded-full bg-[#0072bc]/10 text-[#0072bc] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
              <div className="flex items-center gap-4 text-xs font-medium text-white/80">
                <span>Direct Hotline: <b className="text-white">+880 1713-456789</b></span>
                <span>•</span>
                <span>Dhaka HQ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function ServiceShell({ children }: { children: ReactNode }) {
  return <><a href="#main" className="skip">Skip to content</a><Header /><ServiceMotion><main id="main" className="service-page bg-white text-[var(--ink)]">{children}</main></ServiceMotion><Footer /></>;
}
