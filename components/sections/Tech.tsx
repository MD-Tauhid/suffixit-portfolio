import { tech } from "@/lib/content";
import SectionHeader from "./SectionHeader";

export default function Tech() {
  return (
    <section className="alt">
      <div className="w">
        <SectionHeader eyebrow="Tech we use">
          Modern stack, <em>reliable</em> delivery
        </SectionHeader>
        <div className="tech rv">
          {tech.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}
