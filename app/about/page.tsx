import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, CircleDot, Clock3, Globe2, Layers3, MoveUpRight, Plus, ShieldCheck, Users, Headphones } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutMotion from "@/components/animations/AboutMotion";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { about, practices, recognition, strengths, values } from "@/lib/about";
import { site } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us | Suffix IT Limited",
  description: "Meet Suffix IT: a Dhaka-based software and ICT company building business solutions since 2017. Discover our story, purpose, people and approach.",
  alternates: { canonical: "/about" },
  openGraph: { title: "People. Purpose. Possibility. | Suffix IT", description: "The people and purpose behind Suffix IT’s software and ICT solutions.", url: "/about" },
};

const strengthIcons = { people: Users, focus: CircleDot, clock: Clock3, support: Headphones, layers: Layers3, globe: Globe2 };

function Photo({ src, label, className = "", priority = false }: { src: string; label: string; className?: string; priority?: boolean }) {
  return <div className={`${styles.photo} ${className}`}>
    <Image src={src} alt={`${label} — illustrative placeholder`} fill priority={priority} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 70vw, 900px" data-about-parallax />
    <span className={styles.photoLabel}>{label} <span> / Image preview</span></span>
  </div>;
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
            <div className={styles.heroTop} data-about-intro><span className={styles.eyebrow}><span /> The people behind Suffix IT</span><span className={styles.location}>Dhaka, Bangladesh <Globe2 size={15} /></span></div>
            <div className={styles.heroHeading}>
              <h1 id="about-title"><span className={styles.line}><span data-about-title>People. Purpose.</span></span><span className={styles.line}><em data-about-title>Possibility.</em></span></h1>
              <div className={styles.orbit} data-about-orbit aria-hidden="true"><span /><span /><MoveUpRight /></div>
            </div>
            <div className={styles.heroBottom} data-about-intro><p>We bring people and technology together<br className={styles.desktopBreak} /> to move businesses forward.</p><a href="#our-story" className={styles.roundLink}><span>Get to know us</span><ArrowDown size={20} /></a></div>
            <div className={styles.heroCollage} data-about-intro>
              <Photo src={about.images.hero} label="Space to think. Room to build." className={styles.heroPhoto} priority />
              <div className={styles.heroSide}><div className={styles.sinceCard}><span>Our journey began in</span><strong>2017<span>↗</span></strong><p>Built in Bangladesh.<br />Looking beyond borders.</p><span className={styles.cornerMark} aria-hidden="true">S.</span></div><Photo src={about.images.collaboration} label="Better, together" className={styles.sidePhoto} /></div>
            </div>
            <div className={styles.photoNote}>A glimpse of the direction. Photography is illustrative and will be replaced with our own.</div>
          </div>
        </section>

        <section id="our-story" className={styles.story} aria-labelledby="story-title">
          <div className={styles.container}>
            <div className={styles.storyGrid}><div data-about-reveal><span className={styles.eyebrow}>Our story</span><h2 id="story-title">Good technology.<br /><em>Even better</em><br />possibilities.</h2></div><div className={styles.storyCopy} data-about-reveal><p>{about.story}</p><p>Our ambition is simple: turn ideas into useful solutions, and build relationships that last beyond a launch.</p><Link href="/contact" className={styles.whiteLink}>Let’s build something together <ArrowUpRight size={19} /></Link></div></div>
            <div className={styles.storyGallery} data-about-stagger><Photo src={about.images.detail} label="Ideas taking shape" /><Photo src={about.images.collaboration} label="Different minds. Shared goals." /><div className={styles.galleryQuote}><span aria-hidden="true">“</span><p>We dream big.<br />We win together.</p><small>The spirit of Suffix IT</small></div></div>
          </div>
        </section>

        <section id="culture" className={styles.culture} aria-labelledby="culture-title">
          <div className={styles.container}>
            <div className={styles.sectionTop} data-about-reveal><span className={styles.eyebrow}>Life at Suffix</span><span className={styles.smallNote}>Curiosity brings us together.</span></div>
            <h2 id="culture-title" className={styles.wideHeading} data-about-reveal>A shared ambition.<br /><em>A world of possibility.</em></h2>
            <div className={styles.cultureGrid}><Photo src={about.images.culture} label="People make the difference" className={styles.culturePhoto} /><div className={styles.cultureCopy} data-about-reveal><p>Behind every solution is a team of people who care about the work. Our mission connects client success with opportunities for our colleagues to learn, grow and contribute.</p><div className={styles.factGrid}><div><strong>2017</strong><span>Working in the software industry since</span></div><div><strong>24/7</strong><span>Support commitment, wherever work takes you</span></div></div><div className={styles.purpose}><span><CircleDot size={18} /> Our vision</span><p>{about.vision}</p></div><div className={styles.purpose}><span><MoveUpRight size={18} /> Our mission</span><p>{about.mission}</p></div></div></div>
          </div>
        </section>

        <section id="values" className={styles.values} aria-labelledby="values-title"><div className={`${styles.container} ${styles.valuesGrid}`}><div className={styles.stickyHeading} data-about-reveal><span className={styles.eyebrow}>What we stand for</span><h2 id="values-title">The way we think.<br />The way we <em>work.</em></h2><p>Principles that connect our people, our products and our partnerships.</p></div><div className={styles.valueList} data-about-stagger>{values.map((value, index) => <details key={value.title} className={styles.valueItem} open={index === 0}><summary><span className={styles.valueNumber}>0{index + 1}</span><h3>{value.title}</h3><Plus size={21} className={styles.valuePlus} /></summary><div className={styles.valueBody}><span>{value.tag}</span><p>{value.text}</p></div></details>)}</div></div></section>

        <section id="why-suffix" className={styles.strengths} aria-labelledby="strengths-title"><div className={styles.container}><div className={styles.strengthHeading} data-about-reveal><span className={styles.eyebrow}>Why Suffix IT</span><h2 id="strengths-title">More than a vendor.<br /><em>A partner in your progress.</em></h2><p>Technical expertise, a client-focused approach and the commitment to see things through.</p></div><div className={styles.strengthGrid} data-about-stagger>{strengths.map((item) => { const Icon = strengthIcons[item.icon as keyof typeof strengthIcons]; return <article key={item.title} className={styles.strengthItem}><Icon size={27} strokeWidth={1.4} /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></div></section>

        <section id="recognition" className={styles.recognition} aria-labelledby="recognition-title"><div className={styles.container}><div className={styles.recognitionTop} data-about-reveal><span className={styles.eyebrow}>Recognition & standards</span><ShieldCheck size={28} strokeWidth={1.3} /></div><h2 id="recognition-title" className={styles.recognitionTitle} data-about-reveal>Built on <em>trust.</em></h2><div className={styles.recognitionBottom}><p data-about-reveal>Quality, information security and service management. The standards represented on our company website.</p><div className={styles.certGrid} data-about-stagger>{recognition.map((item) => <article key={item.title} className={styles.cert}><Image src={item.image} alt={`${item.title} badge displayed on the Suffix IT website`} width={92} height={92} /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div><div className={styles.membership} data-about-reveal><span>Part of a wider community</span><Image src="/assets/img/basis.png" alt="BASIS" width={96} height={42} /><Image src="/assets/img/bacco.png" alt="BACCO" width={120} height={44} /><span className={styles.membershipText}>Connected to Bangladesh’s technology & outsourcing ecosystem.</span></div></div></section>

        <section id="people" className={styles.people} aria-labelledby="people-title"><div className={styles.container}><div className={styles.peopleHeading} data-about-reveal><div><span className={styles.eyebrow}>Our people</span><h2 id="people-title">Different strengths.<br /><em>One Suffix IT.</em></h2></div><p>From software to infrastructure, our work brings different disciplines together around one goal: a better solution for your business.</p></div><div className={styles.peopleGrid} data-about-stagger>{practices.map((practice, index) => <article key={practice.title} className={styles.personCard}><div className={`${styles.portrait} ${styles[practice.tone]}`}><span className={styles.practiceCode}>{practice.initials}</span><svg viewBox="0 0 300 300" aria-hidden="true" className={styles.silhouette}><circle cx="150" cy="112" r={index % 2 ? 44 : 48} /><path d="M42 310v-29c0-69 48-111 108-111s108 42 108 111v29" /></svg><span className={styles.portraitCaption}>Team portrait preview</span><ArrowUpRight size={20} /></div><h3>{practice.title}</h3><p>{practice.description}</p></article>)}</div><p className={styles.teamNote}>Our disciplines, at a glance. Individual team profiles and photographs will be added with our team’s details.</p></div></section>

        <section id="careers" className={styles.careers} aria-labelledby="careers-title"><div className={`${styles.container} ${styles.careerGrid}`}><div className={styles.careerVisual}><Photo src={about.images.collaboration} label="Make your next chapter count" /><div className={styles.careerSeal} aria-hidden="true"><span>Ideas welcome.</span><MoveUpRight /><span>People first.</span></div></div><div className={styles.careerCopy} data-about-reveal><span className={styles.eyebrow}>Build your next chapter</span><h2 id="careers-title">Good people.<br />Great possibilities.<br /><em>Come grow with us.</em></h2><p>Bring your enthusiasm for technology. Find room to learn, contribute and do work that makes a difference.</p><a href="https://www.suffixit.com/career" className={styles.primaryLink} target="_blank" rel="noopener noreferrer">Explore opportunities <ArrowUpRight size={19} /></a><a href={`mailto:${site.email}?subject=Career%20enquiry`} className={styles.careerEmail}>Start a conversation <ArrowUpRight size={16} /></a></div></div></section>

        <section className={styles.closing} aria-label="Work with Suffix IT"><div className={styles.container}><div data-about-reveal><span>Have a challenge in mind?</span><Link href="/contact">Let’s make it <em>possible.</em><ArrowUpRight /></Link></div><div className={styles.closingFoot}><span><Check size={16} /> Software. People. Long-term partnership.</span><span>Dhaka, Bangladesh</span></div></div></section>
      </main>
    </AboutMotion>
    <Footer />
  </>;
}
