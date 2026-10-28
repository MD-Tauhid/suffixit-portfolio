import SectionHeader from "./SectionHeader";
import ConnoisseurStackInteractor from "@/components/ui/connoisseur-stack-interactor";

export default function Models() {
  return (
    <section id="models" className="py-12 md:py-20 relative overflow-hidden">
      <div className="w">
        <SectionHeader eyebrow="Ways to work with us" text="Pick the engagement that matches your stage and budget.">
          Four models, <em>one</em> trusted partner
        </SectionHeader>

        <ConnoisseurStackInteractor />
      </div>
    </section>
  );
}
