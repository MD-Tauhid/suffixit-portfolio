import { whyPoints } from "@/lib/content";
import WhyIllustration from "./WhyIllustration";

export default function Why() {
  return (
    <section id="why" className="py-14 md:py-20 lg:py-24 relative overflow-x-hidden">
      <div className="w max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 wg">
        <div className="rv-left">
          <span className="ey">Why Suffix IT</span>
          <h2>One partner for <em>software, hosting</em> and support.</h2>
          <p style={{ color: "var(--mute)", marginTop: 14, fontSize: 17 }}>
            We are an ICT solution provider that covers the whole journey, from the first idea to a live product and the support that keeps it running.
          </p>
          <ul className="ck">
            {whyPoints.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <a className="btn p" href="#contact">Talk to an expert →</a>
        </div>
        <div className="rv-right"><WhyIllustration /></div>
      </div>
    </section>
  );
}
