import { products } from "@/lib/content";
import SectionHeader from "./SectionHeader";
import CardItem from "./CardGrid";

export default function Products() {
  return (
    <section id="products">
      <div className="w">
        <SectionHeader eyebrow="Our products" text="Launch faster with products we built, run and support ourselves.">
          Ready-made software, <em>proven</em> in the field
        </SectionHeader>
        <div className="pg3">
          {products.map((c) => <CardItem key={c.title} card={c} variant="product" />)}
        </div>
      </div>
    </section>
  );
}
