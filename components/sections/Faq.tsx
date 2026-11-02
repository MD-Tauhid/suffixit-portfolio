import TextRevealFAQs, { type FAQItem } from "@/components/ui/text-reveal-faqs";
import { faqs } from "@/lib/content";

export default function Faq() {
  const formattedItems: FAQItem[] = faqs.map((f, i) => ({
    id: `faq-${i + 1}`,
    question: f.q,
    answer: f.a,
  }));

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-[#f8fbfe] overflow-hidden">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[450px] bg-gradient-to-br from-[#0072bc]/5 to-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none" />

      <TextRevealFAQs
        items={formattedItems}
        eyebrow="FAQ"
        title={<>Questions, <em>answered</em></>}
        description="Clear answers about Suffix IT products, custom architecture, pricing, and our long-term support model."
        supportText="Need more technical specifications or a custom NDA?"
        supportLinkText="Reach our solutions architect"
        supportLinkHref="#contact"
      />
    </section>
  );
}
