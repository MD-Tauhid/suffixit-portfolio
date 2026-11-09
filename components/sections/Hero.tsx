import CodeTyper from "@/components/animations/CodeTyper";
import HeroOrb from "./HeroOrb";
import Icon from "@/components/ui/Icon";
import MetroHero from "@/components/ui/scroll-locked-video-hero";

/* ─────────────────────────────────────────────────────────────
   1. 4TH COMMIT CLASSIC HERO (Commit f383f92)
   - Original interactive coding hero with live CodeTyper
   - HeroOrb animated ambient orb
   - Live telemetry badges (Deployed to production, Performance, Suffix App)
   ───────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="w hg">
        <div>
          <span className="tag"><s aria-hidden="true"></s>Software company · Dhaka, Bangladesh</span>
          <h1>We build software solutions that <em>power your business.</em></h1>
          <p className="lead">
            Suffix IT is a software and ICT solution company. We design, develop and support ERP, HR &amp; payroll,
            e-commerce, mobile apps and custom software for organizations in Bangladesh and beyond.
          </p>
          <div className="cta">
            <a className="btn p" href="#contact">Get a free consultation →</a>
            <a className="btn g" href="#products">Explore solutions</a>
          </div>
          <div className="chips">
            <span><Icon name="settings" size={14} /> Custom software</span>
            <span><Icon name="layers" size={14} /> Ready products</span>
            <span><Icon name="cloud" size={14} /> Hosting &amp; support</span>
          </div>
        </div>
        <div className="sc" aria-hidden="true">
          <HeroOrb />
          <div className="ed">
            <div className="bar"><i></i><i></i><i></i><span>suffix.config.js</span></div>
            <CodeTyper />
          </div>
          <div className="fc c1">
            <div className="ok">✓</div>
            <div><b>Deployed to production</b><small>v2.4.1 · just now</small><div className="pg"><i></i></div></div>
          </div>
          <div className="fc c2">
            <b>Performance</b><small>Last 7 days</small>
            <div className="cb">
              {[0, -0.4, -0.8, -1.2, -1.6, -2].map((d) => <i key={d} style={{ animationDelay: `${d}s` }}></i>)}
            </div>
          </div>
          <div className="c3 fc" style={{ padding: 7 }}>
            <div className="ps">
              <b>Suffix App</b>
              <div className="pr"><i></i><u></u></div>
              <div className="pr"><i style={{ background: "var(--green)" }}></i><u></u></div>
              <div className="pr"><i style={{ background: "var(--vio)" }}></i><u></u></div>
              <div className="pb">Continue</div>
            </div>
          </div>
          <span className="kc k1">ERP</span><span className="kc k2">Cloud</span><span className="kc k3">HCM</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. VIDEO HERO SECTION (60fps Scroll-Locked Scrub Hero)
   - Dual-video scrub engine with aesthetic bypass (2.42s - 4.70s)
   ───────────────────────────────────────────────────────────── */
export function VideoHero() {
  return (
    <section id="hero-video" className="relative w-full overflow-hidden p-0 m-0" style={{ padding: 0, margin: 0 }}>
      <MetroHero
        videoSrc="/assets/video/hero4.mp4"
        reverseVideoSrc="/assets/video/hero4-reverse.mp4"
        poster="/assets/video/hero4-poster.jpg"
        scrubDistance={1400}
      />
    </section>
  );
}

