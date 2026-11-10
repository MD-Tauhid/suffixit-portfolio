import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CircleDot, Globe2, MoveUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutMotion from "@/components/animations/AboutMotion";
import AboutValues from "@/components/sections/AboutValues";
import AboutWhySuffix from "@/components/sections/AboutWhySuffix";
import AboutRecognition from "@/components/sections/AboutRecognition";
import AboutProjectBanner from "@/components/sections/AboutProjectBanner";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { about, practices } from "@/lib/about";
import { site } from "@/lib/site";
import styles from "./about.styles";
import "./about.motion.css";

export const metadata: Metadata = {
  title: "About Us | Suffix IT Limited",
  description: "Discover Suffix IT Limited: a Dhaka-based software and ICT company delivering custom applications, ERP, HR, field force, cloud, infrastructure and IoT solutions since 2017.",
  alternates: { canonical: "/about" },
  openGraph: { title: "Software expertise. Business understanding. | Suffix IT", description: "Meet the people behind Suffix IT’s software products, custom development and ICT services.", url: "/about" },
};

const statement = "We build software and ICT solutions around the way your business works.";

function Photo({ src, label, className = "", priority = false }: { src: string; label: string; className?: string; priority?: boolean }) {
  return <figure className={`${styles.photo} ${className}`}>
    <Image src={src} alt={`${label} — illustrative photograph`} fill priority={priority} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 80vw, 1100px" data-about-parallax />
    <figcaption>{label}</figcaption>
  </figure>;
}

export default function AboutPage() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <ScrollProgress />
    <Header />
    <AboutMotion>
      <main id="main" className={styles.page}>
        <section className={styles.hero} aria-labelledby="about-title">
          <div className={styles.container}>
            <div className={styles.heroTop} data-about-intro><span className={styles.eyebrow}><i /> About Suffix IT</span><span className={styles.location}><Globe2 size={14} /> Dhaka, Bangladesh / Since 2017</span></div>
            <div className={styles.heroHeading}>
              <h1 id="about-title"><span className={styles.line}><span data-about-title>People. Purpose.</span></span><span className={styles.line}><em data-about-title>Practical technology.</em></span></h1>
              <div className={styles.heroAside} data-about-intro><span className={styles.heroAsterisk} data-about-orbit aria-hidden="true">✳</span><p>Software expertise.<br />Business understanding.<br />Long-term support.</p></div>
            </div>
            <div className={styles.heroBottom} data-about-intro><p>{about.summary}</p><a href="#our-story" className={styles.roundLink}><span>Discover our story</span><span className={styles.roundIcon}><ArrowDown size={20} /></span></a></div>
          </div>
          <div className={styles.heroStage} data-about-stage>
            <div className={styles.heroImageWrap}>
              <Image src={about.images.hero} alt="An illustrative photograph of people collaborating in a creative workspace" fill priority sizes="100vw" data-about-hero-image />
              <span className={styles.imageIndex}>People make it possible.</span><div className={styles.heroImageTitle}>People who understand.<br /><em>Technology that works.</em></div><a href="#culture" className={styles.posterLink}>Life at Suffix IT <ArrowUpRight size={20} /></a>
            </div>
            <div className={styles.originPanel}><span>Our beginning</span><strong>2017</strong><div className={styles.originLines} aria-hidden="true"><i /><i /><i /></div><p>Built in Bangladesh.<br />Looking beyond borders.</p><MoveUpRight size={24} /></div>
          </div>
          <div className={styles.container}>
            <div className="grid gap-3 py-7 md:grid-cols-3 md:gap-5 md:py-10" data-about-stagger>
              <div className="rounded-2xl bg-[#e8f3fc] p-5 md:p-6"><span className="text-[10px] font-semibold text-[var(--br)]">Our beginning</span><p className="mt-2 text-[24px] font-semibold tracking-[-.7px]">Building since 2017.</p></div>
              <div className="rounded-2xl bg-[#ede8fa] p-5 md:p-6"><span className="text-[10px] font-semibold text-[var(--br)]">Our focus</span><p className="mt-2 text-[24px] font-semibold tracking-[-.7px]">Software &amp; ICT.</p></div>
              <div className="rounded-2xl bg-[#def2eb] p-5 md:p-6"><span className="text-[10px] font-semibold text-[var(--br)]">Our home</span><p className="mt-2 text-[24px] font-semibold tracking-[-.7px]">Dhaka, Bangladesh.</p></div>
            </div>
            <p className={styles.photoNote}>Workspace imagery is illustrative. The Corporate Day group photograph below is from Suffix IT.</p>
          </div>
        </section>

        <section id="our-story" className={styles.story} aria-labelledby="story-title">
          <div className={styles.container}>
            <div className={styles.sectionTop}><span className={styles.eyebrow}>Our story</span><span className={styles.smallNote}>Software, infrastructure and ongoing support.</span></div>
            <h2 id="story-title" className={styles.statement} data-about-statement aria-label={statement}>{statement.split(" ").map((word, index) => <span key={index} data-about-word aria-hidden="true">{word} </span>)}</h2>
            <div className={styles.storyBottom}><div className={styles.storySignature} data-about-reveal><span className={styles.signatureMark}>S.</span><span>Understanding your needs.<br />Building what comes next.</span></div><div className={styles.storyCopy} data-about-reveal><p>{about.story}</p><Link href="/contact" className={styles.textLink}>Discuss your requirements <ArrowUpRight size={18} /></Link></div></div>
          </div>
        </section>

        <section id="culture" className={styles.culture} aria-labelledby="culture-title">
          <div className={styles.container}>
            <div className={styles.sectionTop} data-about-reveal><span className={styles.eyebrow}>Life at Suffix IT</span><span className={styles.smallNote}>Working together. Learning together.</span></div>
            <div className={styles.cultureHeading}><h2 className={styles.heading} id="culture-title" data-about-reveal="heading">Good solutions start<br /><em>with the right people.</em></h2><p data-about-reveal>Our work brings software, engineering and client support together. We value practical thinking, shared learning and a clear understanding of the people who use our solutions.</p></div>
            <figure className="mx-auto my-0 w-full max-w-[1080px] overflow-hidden rounded-xl bg-[#e4eef5]">
              <div className="relative aspect-[2032/1335] w-full sm:aspect-[2.1/1]">
                <Image src={about.images.team} alt="Suffix IT team together at Corporate Day, Sarah Resort, Gazipur, on 15 October 2022" fill sizes="(max-width: 760px) 100vw, 1080px" className="object-cover object-bottom" />
              </div>
              <figcaption className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
                <div><span className="block text-sm font-semibold text-[#102a3b]">Suffix IT Corporate Day</span><span className="mt-1 block text-[11px] leading-relaxed text-[#60778a]">15 October 2022 · Sarah Resort, Gazipur</span></div>
                <p className="text-[16px] font-medium leading-snug tracking-[-.4px] text-[#0072bc] md:text-[20px]">We dream big. We win together.</p>
              </figcaption>
            </figure>
            <div className={styles.purposeGrid} data-about-stagger><div className={styles.factCard}><span>Our experience</span><strong>Since <em>2017.</em></strong><p>Developing software and ICT solutions for businesses in Bangladesh and beyond.</p></div><article><span><CircleDot size={17} /> Our vision</span><p>{about.vision}</p></article><article><span><MoveUpRight size={17} /> Our mission</span><p>{about.mission}</p></article></div>
          </div>
        </section>

        <section id="values" className={styles.values} aria-labelledby="values-title"><div className={styles.container}><div className={styles.valuesHeading} data-about-reveal="heading"><div><span className={styles.eyebrow}>The principles behind our work</span><h2 className={styles.heading} id="values-title">How we think.<br />How we <em>deliver.</em></h2></div><p>Understand the need. Build with care.<br />Stay involved as the business grows.</p></div><AboutValues /></div></section>

        <AboutWhySuffix />

        <AboutRecognition />

        <section id="people" className={styles.people} aria-labelledby="people-title"><div className={styles.container}><div className={styles.peopleHeading} data-about-reveal="heading"><div><span className={styles.eyebrow}>Our people</span><h2 className={styles.heading} id="people-title">Different expertise.<br /><em>One team behind you.</em></h2></div><p>Our solutions draw on expertise across software development, digital commerce, mobile applications, infrastructure and connected technology.</p></div><div className={styles.peopleGrid} data-about-stagger>{practices.map((practice) => <article key={practice.title} className={styles.personCard}><div className={styles.portrait}><Image src={practice.image} alt={`Placeholder portrait for ${practice.name}; not an employee photograph`} fill sizes="(max-width: 760px) 45vw, 30vw" /><span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[40%] bg-gradient-to-t from-black/95 via-black/60 to-transparent" /><div className={styles.portraitCaption}><h3>{practice.name || "Employee name"}</h3></div></div><div className="mt-3 text-[13px] font-semibold leading-[1.4] text-[#102a3b] md:mt-4 md:text-[17px]">{practice.title}</div><p>{practice.description}</p></article>)}</div><div className={styles.teamFoot}><p>Employee names and photographs are placeholders until team details are provided.</p><Link href="/#services" className={styles.textLink}>Explore our expertise <ArrowUpRight size={17} /></Link></div></div></section>

        <section id="careers" className={styles.careers} aria-labelledby="careers-title"><div className={`${styles.container} ${styles.careerGrid}`}><div className={styles.careerVisual}><Photo src={about.images.culture} label="Your next chapter could start here." /><div className={styles.careerSeal} data-about-seal aria-hidden="true"><span>Learn together.</span><MoveUpRight /><span>Build together.</span></div></div><div className={styles.careerCopy} data-about-reveal="heading"><span className={styles.eyebrow}>Careers at Suffix IT</span><h2 className={styles.heading} id="careers-title">Build software.<br />Solve real problems.<br /><em>Grow with us.</em></h2><p>Put your technical skills and curiosity to work on business applications, digital experiences and ICT solutions. Explore career opportunities with Suffix IT.</p><a href="https://www.suffixit.com/career" className={styles.primaryLink} target="_blank" rel="noopener noreferrer">View career opportunities <span><ArrowUpRight size={20} /></span></a><a href={`mailto:${site.email}?subject=Career%20enquiry`} className={styles.careerEmail}>Send a career enquiry <ArrowUpRight size={15} /></a></div></div></section>

        <AboutProjectBanner />
      </main>
    </AboutMotion>
    <Footer />
  </>;
}
