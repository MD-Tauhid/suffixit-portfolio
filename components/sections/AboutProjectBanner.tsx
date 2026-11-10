import Link from "next/link";
import { ArrowUpRight, Cloud, Headphones, Layers3 } from "lucide-react";
import styles from "@/app/about/about.styles";

/** Brand-blue curved bands are vector shapes, so the background stays sharp at every size. */
export default function AboutProjectBanner() {
  return <section id="start-a-project" className={styles.closing} aria-labelledby="project-banner-title">
    <div className={styles.container}>
      <div className={styles.projectBanner}>
        <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 1240 440" preserveAspectRatio="none" aria-hidden="true">
          <rect width="1240" height="440" fill="#0066aa" />
          <path d="M650 0H1240V440H0V375C295 390 488 261 650 0Z" fill="#0879be" />
          <path d="M820 0H1240V440H270C535 383 690 237 820 0Z" fill="#198bc9" />
          <path d="M1010 0H1240V440H555C776 341 881 146 1010 0Z" fill="#329fd7" />
          <path d="M1240 20V440H848C963 266 1083 105 1240 20Z" fill="#60b8e3" />
          <path d="M1240 177V440H1076C1122 319 1171 245 1240 177Z" fill="#8bcff0" />
        </svg>
        <div className={styles.projectBannerCopy} data-about-reveal="heading">
          <span>Let’s talk about your next project</span>
          <h2 id="project-banner-title">Technology that fits<br />your business.</h2>
          <p>Whether you need ready-made software, a custom application or support for your IT systems, we’ll help you explore the right approach.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/contact" className={styles.projectBannerButton}>Discuss your project <ArrowUpRight size={18} /></Link>
            <Link href="/#products" className={styles.projectBannerLink}>Explore our products <ArrowUpRight size={16} /></Link>
          </div>
        </div>
        <div className={styles.projectBannerVisual} data-about-reveal="image" aria-label="Software, infrastructure and support expertise">
          <div className="absolute inset-x-3 bottom-[-14px] top-8 rotate-[5deg] rounded-2xl border border-solid border-white/30 bg-white/20" aria-hidden="true" />
          <div className="relative rounded-2xl border border-solid border-white/80 bg-white p-5 shadow-[0_20px_55px_-20px_rgba(0,45,85,.5)] sm:p-6">
            <div className="mb-5 flex items-center justify-between border-0 border-b border-solid border-[#e0edf7] pb-4">
              <span className="text-sm font-extrabold tracking-[-.5px] text-[#0072bc]">Suffix IT</span>
              <span className="text-[10px] text-[#5e798e]">Your technology partner</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f3fc] text-[#0072bc]"><Layers3 size={19} /></span><div><p className="text-xs font-semibold text-[#18364e]">Business software</p><p className="mt-1 text-[10px] leading-relaxed text-[#5e798e]">ERP, HR, payroll & field force</p></div></div>
              <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f3fc] text-[#0072bc]"><Cloud size={19} /></span><div><p className="text-xs font-semibold text-[#18364e]">Cloud & infrastructure</p><p className="mt-1 text-[10px] leading-relaxed text-[#5e798e]">Hosting, networks & data protection</p></div></div>
              <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f3fc] text-[#0072bc]"><Headphones size={19} /></span><div><p className="text-xs font-semibold text-[#18364e]">Ongoing support</p><p className="mt-1 text-[10px] leading-relaxed text-[#5e798e]">Maintenance, upgrades & assistance</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
