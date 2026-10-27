import SectionHeader from "./SectionHeader";
import FieldForceDemo from "./FieldForceDemo";
import { featureHeading } from "@/lib/content";

export default function FieldForce() {
  const [a, b, c] = featureHeading.title;
  return (
    <section className="ff" id="fieldforce">
      <div className="w">
        <SectionHeader eyebrow={featureHeading.eyebrow} text={featureHeading.text}>
          {a}<em>{b}</em>{c}
        </SectionHeader>
        <FieldForceDemo />
      </div>
    </section>
  );
}
