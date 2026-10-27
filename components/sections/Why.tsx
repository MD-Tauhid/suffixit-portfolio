import { whyPoints } from "@/lib/content";
import WhyIllustration from "./WhyIllustration";

export default function Why() {
  return (
    <section id="why">
      <div className="w wg">
        <div className="rv">
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
        <div className="rv"><WhyIllustration /></div>
      </div>
    </section>
  );
}
