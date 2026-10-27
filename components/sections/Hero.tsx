import CodeTyper from "@/components/animations/CodeTyper";
import HeroOrb from "./HeroOrb";

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
            <span>⚙️ Custom software</span><span>📦 Ready products</span><span>☁️ Hosting &amp; support</span>
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
