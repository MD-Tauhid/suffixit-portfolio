import { faqs } from "@/lib/content";
import SectionHeader from "./SectionHeader";

/** Native <details>: keyboard accessible, no JavaScript, answers stay in the HTML. */
export default function Faq() {
  return (
    <section id="faq" style={{ paddingTop: 0 }}>
      <div className="w">
        <SectionHeader eyebrow="FAQ">
          Questions, <em>answered</em>
        </SectionHeader>
        <div className="faq rv">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
