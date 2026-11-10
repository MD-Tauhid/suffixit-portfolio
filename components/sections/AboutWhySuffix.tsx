import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, Focus, Headphones, Layers3, MapPin, MessagesSquare } from "lucide-react";
import { strengths } from "@/lib/about";
import styles from "@/app/about/about.styles";

const details = [
  { category: "Engineering", icon: Code2, tone: "bg-[#063c60]", href: "/#services", link: "Explore our expertise" },
  { category: "Your business, first", icon: Focus, tone: "bg-[#0072bc]", href: "/#products", link: "Explore our products" },
  { category: "A clear way forward", icon: MessagesSquare, tone: "bg-[#07517f]", href: "/contact", link: "Discuss your requirements" },
  { category: "Beyond delivery", icon: Headphones, tone: "bg-[#08557e]", href: "/contact", link: "Talk about support" },
  { category: "Connected technology", icon: Layers3, tone: "bg-[#07517f]", href: "/#services", link: "Discover our services" },
  { category: "Local roots. Wider outlook.", icon: MapPin, tone: "bg-[#063c60]", href: "/contact", link: "Meet your technology partner" },
];

// Fixed, scattered placements keep the layout stable across server and client renders.
const cardImages: Record<number, string> = {
  0: "/assets/services/custom-software.jpg",
  2: "/assets/about/design-placeholder.jpg",
  4: "/assets/services/cloud-hosting.jpg",
};

export default function AboutWhySuffix() {
  return (
    <section id="why-suffix" className="bg-[#f7faff]" aria-labelledby="why-suffix-title">
      <div className={styles.container}>
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16" data-about-reveal="heading">
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-[#0072bc]"><span className="size-1.5 rounded-full bg-[#0072bc]" />Why Suffix IT</span>
            <h2 id="why-suffix-title" className="mt-5 max-w-[700px] text-[clamp(32px,4vw,56px)] font-medium leading-[1.1] tracking-[-1.7px] text-[#102a3b]">Built on expertise.<br />Driven by your needs.</h2>
          </div>
          <p className="max-w-[420px] text-sm leading-[1.85] text-[#5b7286]">Software that fits your operations. Expertise across the systems you depend on. A team that stays involved as your business grows.</p>
        </div>
        <div className="grid overflow-hidden rounded-[4px] sm:grid-cols-2 lg:grid-cols-3" data-about-stagger>
          {strengths.map((item, index) => {
            const detail = details[index];
            const Icon = detail.icon;
            return (
              <article key={item.title} className={`group relative isolate flex min-h-[340px] flex-col overflow-hidden p-7 text-white md:min-h-[370px] md:p-9 xl:p-10 ${detail.tone}`}>
                {cardImages[index] && <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
                  <Image src={cardImages[index]} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,48,80,.72)_0%,rgba(4,40,68,.84)_50%,rgba(3,32,55,.94)_100%)]" />
                </div>}
                <div className="mb-10 flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-[11px] font-medium leading-relaxed text-[#e0f2ff]"><span className="size-1 shrink-0 rounded-full bg-[#8ed9ff]" />{detail.category}</span>
                  <Icon size={23} strokeWidth={1.3} className="shrink-0 text-white/50 transition-colors duration-200 group-hover:text-[#8ed9ff]" aria-hidden="true" />
                </div>
                <h3 className="max-w-[310px] text-[25px] font-semibold leading-[1.23] tracking-[-.6px] xl:text-[28px]">{item.title}</h3>
                <p className="mb-8 mt-5 max-w-[340px] text-[13px] leading-[1.85] text-[#e0eff9]">{item.text}</p>
                <Link href={detail.href} className="mt-auto inline-flex min-h-10 w-fit items-center gap-3 text-[13px] font-medium text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8ed9ff]">
                  {detail.link}<ArrowUpRight size={17} className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
