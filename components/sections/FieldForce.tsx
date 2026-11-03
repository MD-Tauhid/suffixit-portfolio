import SectionHeader from "./SectionHeader";
import FieldForceDemo from "./FieldForceDemo";
import { featureHeading } from "@/lib/content";

export default function FieldForce() {
  const [a, b, c] = featureHeading.title;
  return (
    <section className="ff py-7 md:py-14 lg:py-16 relative overflow-x-hidden" id="fieldforce">
      <div className="w max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={featureHeading.eyebrow} text={featureHeading.text}>
          {a}<em>{b}</em>{c}
        </SectionHeader>
        <FieldForceDemo />
      </div>
    </section>
  );
}
