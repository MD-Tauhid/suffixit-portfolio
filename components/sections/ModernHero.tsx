"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Box, Cpu, Globe2, Layers3, Radio } from "lucide-react";
import ShapeGrid from "@/components/ui/ShapeGrid";
import HeroCurves from "@/components/ui/HeroCurves";
import SwarmRebuildReveal from "@/components/ui/SwarmRebuildReveal";
import { SuffixGlassReveal } from "@/components/ui/liquid-glass-logo-reveal";
import useMotionPreference from "@/components/ui/useMotionPreference";
import styles from "./ModernHero.module.css";

const solutions = [
  { label: "Enterprise software", detail: "Built around your business", href: "/products", Icon: Layers3 },
  { label: "Web & mobile", detail: "Connected experiences", href: "/services", Icon: Globe2 },
  { label: "IoT & infrastructure", detail: "Intelligence in every connection", href: "/services", Icon: Cpu },
];

export default function ModernHero() {
  const [ready, setReady] = useState(false);
  const reduced = useMotionPreference();
  const tile = useRef<HTMLDivElement>(null);
  const reflection = useRef<HTMLDivElement>(null);
  const complete = useCallback(() => setReady(true), []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!ready || reduced || event.pointerType !== "mouse" || !tile.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tile.current.style.transform = `rotateX(${-y * 20}deg) rotateY(${x * 24}deg)`;
    if (reflection.current) {
      reflection.current.style.transform = `translate(${x * 40}%, ${y * 40}%)`;
      reflection.current.style.opacity = "0.6";
    }
  };

  const resetTilt = () => {
    if (tile.current) tile.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (reflection.current) reflection.current.style.opacity = "0";
  };

  return (
    <section id="hero" className={styles.hero} data-ready={ready} aria-labelledby="home-hero-title" onPointerMove={handlePointerMove} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
      {!ready && <SwarmRebuildReveal onComplete={complete} />}
      <div className={styles.background} aria-hidden="true">
        <div className={styles.grid}>
          {ready && !reduced && <ShapeGrid shape="square" direction="diagonal" lineColor="#b8daf2" hoverColor="#0072bc" cellSize={34} speed={0.16} glow={0.2} fade={0.8} intro={false} />}
        </div>
        {ready && <HeroCurves />}
      </div>

      <div className={styles.container}>
        <div className={styles.topline}>
          <span><span className={styles.statusDot} /> Your ambition. Our engineering.</span>
          <span className={styles.location}>Dhaka, Bangladesh <span>↗</span> Built for the world</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <h1 id="home-hero-title" className={styles.title}>
              <span className={styles.titleLine}><span>Technology</span></span>
              <span className={styles.titleLine}><span>that moves</span></span>
              <span className={`${styles.titleLine} ${styles.serif}`}><span>business forward.</span></span>
            </h1>
            <p className={styles.description}>From the software you run on to the systems you grow with. We bring your people, operations and possibilities together.</p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.primary}>Let’s build what’s next <span><ArrowUpRight size={20} /></span></Link>
              <Link href="/products" className={styles.secondary}>Explore our solutions <ArrowUpRight size={17} /></Link>
            </div>
            <div className={styles.signature}><span className={styles.signatureLine} /> Software. Infrastructure. Possibility.</div>
          </div>

          <div className={styles.visual}>
            <div className={styles.orbit} aria-hidden="true"><i /><i /><i /></div>
            <div className={styles.orbitLight} aria-hidden="true" />
            <div className={styles.core}>
              <div ref={tile} className={styles.tiltTile}>
                <div className={styles.coreGlass}>
                  {ready && <SuffixGlassReveal className={styles.glassLogo} logo="/assets/about/s-logo.png" background="#e8f3fc" originalColors={false} tileSize={350} time={2.2} tuning={{ startZoom: 1.1, dispersion: 1.65, corner: 4.8, sheen: 0.8 }} />}
                  <div ref={reflection} className={styles.reflection} aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className={styles.coreCaption}><span>Suffix IT</span><small>One partner. Every connection.</small></div>
            <span className={`${styles.satellite} ${styles.satelliteOne}`} aria-hidden="true"><Box size={25} strokeWidth={1.4} /></span>
            <span className={`${styles.satellite} ${styles.satelliteTwo}`} aria-hidden="true"><Radio size={24} strokeWidth={1.4} /></span>
            <span className={`${styles.satellite} ${styles.satelliteThree}`} aria-hidden="true"><Layers3 size={23} strokeWidth={1.4} /></span>
            <div className={styles.visualNote}><span /> Ideas connected.<br />Possibilities multiplied.</div>
          </div>
        </div>

        <div className={styles.bottom}>
          <a className={styles.scroll} href="#home-solutions" aria-label="Discover our expertise"><ArrowDown size={18} /><span>Discover what’s possible</span></a>
          <div id="home-solutions" className={styles.solutions}>
            {solutions.map(({ label, detail, href, Icon }) => <Link href={href} key={label} className={styles.solution}><Icon size={21} strokeWidth={1.5} /><span><strong>{label}</strong><small>{detail}</small></span><ArrowUpRight size={16} /></Link>)}
          </div>
        </div>
      </div>
    </section>
  );
}
