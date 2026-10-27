import { industries } from "@/lib/content";
import SectionHeader from "./SectionHeader";
import CardItem from "./CardGrid";

export default function Industries() {
  return (
    <section className="alt" id="industries">
      <div className="w">
        <SectionHeader eyebrow="Industries" text="Find the Suffix product that fits the way your industry works.">
          Solutions for every <em>kind of business</em>
        </SectionHeader>
        <div className="ind">
          {industries.map((c) => <CardItem key={c.title} card={c} variant="industry" />)}
        </div>
      </div>
    </section>
  );
}
