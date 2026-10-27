import { steps } from "@/lib/content";
import SectionHeader from "./SectionHeader";

export default function Process() {
  return (
    <section id="process" style={{ paddingTop: 0 }}>
      <div className="w">
        <SectionHeader eyebrow="How we work">
          From idea to <em>launch</em>, step by step
        </SectionHeader>
        <div className="steps">
          {steps.map((s) => (
            <div className="s rv" key={s.title}>
              <span className="si" aria-hidden="true">{s.icon}</span>
              <h3>{s.title}</h3>
              <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
