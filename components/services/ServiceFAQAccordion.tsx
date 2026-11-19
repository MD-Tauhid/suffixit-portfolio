"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import design from "./DetailPage.module.css";

export default function ServiceFAQAccordion({ questions }: { questions: { q: string; a: string }[] }) {
  return <Accordion.Root type="single" collapsible defaultValue="question-0">
    {questions.map((item, index) => <Accordion.Item key={item.q} value={`question-${index}`} className={design.faqItem}>
      <Accordion.Header><Accordion.Trigger className={design.faqTrigger}><span>{item.q}</span><Plus aria-hidden="true" /></Accordion.Trigger></Accordion.Header>
      <Accordion.Content className={design.accordionContent}><p className={design.faqAnswer}>{item.a}</p></Accordion.Content>
    </Accordion.Item>)}
  </Accordion.Root>;
}
