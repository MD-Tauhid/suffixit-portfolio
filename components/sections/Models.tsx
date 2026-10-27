import { models } from "@/lib/content";
import SectionHeader from "./SectionHeader";

export default function Models() {
  return (
    <section>
      <div className="w">
        <SectionHeader eyebrow="Ways to work with us" text="Pick the engagement that matches your stage and budget.">
          Four models, <em>one</em> trusted partner
        </SectionHeader>
        <div className="col">
          {models.map((m) => (
            <div className="cl rv" style={{ background: m.bg }} key={m.n}>
              <div>
                <b aria-hidden="true">{m.n}</b>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
              <a href="#contact">Explore now →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
