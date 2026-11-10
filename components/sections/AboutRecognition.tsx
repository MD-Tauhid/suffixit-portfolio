import Image from "next/image";
import { recognition } from "@/lib/about";
import styles from "@/app/about/about.styles";

const standardDetails = [
  "Consistent processes, quality management and continual improvement.",
  "A framework for managing information security and related risks.",
  "A structured approach to delivering and improving IT services.",
];
const connections = [
  { name: "BASIS", image: "/assets/img/basis.png", description: "Software & IT industry" },
  { name: "BACCO", image: "/assets/img/bacco.png", description: "Contact center & outsourcing" },
  { name: "Cisco", image: "/assets/img/cisco.png", description: "Networking technology" },
  { name: "Fortinet", image: "/assets/img/fortinet.png", description: "Cybersecurity technology" },
  { name: "Sophos", image: "/assets/img/sophos.png", description: "Cybersecurity technology" },
];

export default function AboutRecognition() {
  return (
    <section id="recognition" className="bg-[#f2f8fd]" aria-labelledby="recognition-title">
      <div className={styles.container}>
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20" data-about-reveal="heading">
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-[#0072bc]"><span className="size-1.5 rounded-full bg-[#0072bc]" />Standards &amp; industry connections</span>
            <h2 id="recognition-title" className="mt-5 text-[clamp(34px,4vw,56px)] font-medium leading-[1.1] tracking-[-1.7px] text-[#102a3b]">Quality, security<br />and service.</h2>
          </div>
          <p className="max-w-[395px] text-sm leading-[1.85] text-[#5b7286]">Explore the management standards and industry connections featured by Suffix IT, bringing quality, information security and IT service management into focus.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4" data-about-stagger>
          {[
            ...recognition.map((item, index) => ({ name: item.title, image: item.image, category: "Management standard", description: item.description, detail: standardDetails[index], iso: true })),
            ...connections.map((item) => ({ ...item, category: item.name === "BASIS" || item.name === "BACCO" ? "Industry organisation" : "Technology", detail: "", iso: false })),
          ].map((item) => (
            <div key={item.name} className="h-[300px] md:h-[325px]">
              <article className="group/logo relative isolate flex size-full flex-col items-center rounded-[20px] border border-solid border-[#dceaf5] bg-white px-4 py-6 text-center transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#75bcec] motion-safe:[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1.5 md:px-6 md:py-7">
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 rounded-[20px] bg-[linear-gradient(155deg,#e8f6ff,white_65%)] opacity-0 shadow-[0_18px_38px_-18px_rgba(0,114,188,.35)] transition-opacity duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:opacity-100" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-7 top-0 h-[3px] origin-center scale-x-0 rounded-full bg-[#0072bc] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:scale-x-100" />
                <div className="mb-5 flex h-[92px] w-full max-w-[148px] shrink-0 items-center justify-center rounded-[14px] bg-[#07517f] px-4 py-3 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:-translate-y-1">
                  <Image src={item.image} alt={item.name} width={125} height={76} className={item.iso ? "size-[70px] object-contain" : "h-auto max-h-[54px] w-auto max-w-full object-contain"} />
                </div>
                <span className="text-[9px] font-medium leading-[1.5] text-[#0072bc] md:text-[10px]">{item.category}</span>
                <h3 className="mt-2 text-[19px] font-semibold leading-[1.25] tracking-[-.4px] text-[#102a3b] md:text-[23px]">{item.name}</h3>
                <p className="mt-2 text-[11px] font-medium leading-[1.65] text-[#436780] md:text-[13px]">{item.description}</p>
                {item.detail && <p className="mt-3 hidden max-w-[225px] text-[11px] leading-[1.75] text-[#60778a] md:block">{item.detail}</p>}
                <span aria-hidden="true" className="mt-auto pt-4"><span className="block h-0.5 w-5 rounded-full bg-[#b9daef] transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:bg-[#0072bc]" /></span>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

