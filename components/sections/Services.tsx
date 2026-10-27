import { services } from "@/lib/content";
import SectionHeader from "./SectionHeader";
import CardItem from "./CardGrid";

export default function Services() {
  return (
    <section id="services">
      <div className="w">
        <SectionHeader eyebrow="Services">
          Everything to <em>build and run</em> your digital business
        </SectionHeader>
        <div className="pg3">
          {services.map((c) => <CardItem key={c.title} card={c} variant="service" />)}
        </div>
      </div>
    </section>
  );
}
