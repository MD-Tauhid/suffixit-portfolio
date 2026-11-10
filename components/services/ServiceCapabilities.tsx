"use client";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Check, Plus } from "lucide-react";
import type { Service } from "@/lib/services";
import ServiceVisual from "./ServiceVisual";

export default function ServiceCapabilities({ service }: { service: Service }) {
  const [active, setActive] = useState("capability-0");
  return <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
    <Accordion.Root type="single" value={active} onValueChange={setActive} data-service-stagger>
      {service.capabilities.map((capability, index) => <Accordion.Item key={capability.title} value={"capability-" + index} className="border-0 border-b border-solid border-[#0072bc]/[.15] py-5 first:pt-0">
        <Accordion.Header><Accordion.Trigger className="group flex min-h-12 w-full items-center justify-between gap-5 text-left text-[20px] font-semibold leading-[1.35] tracking-[-.5px] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--br)] md:text-[23px]"><span>{capability.title}</span><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0072bc]/[.05] text-[var(--br)]"><Plus size={17} className="transition-transform duration-200 group-data-[state=open]:rotate-45" /></span></Accordion.Trigger></Accordion.Header>
        <Accordion.Content className="service-accordion overflow-hidden"><div className="pb-2 pt-4"><p className="max-w-[470px] text-sm leading-[1.85] text-[#17162a]/[.65]">{capability.text}</p><ul className="mt-5 grid list-none gap-3 p-0">{capability.deliverables.map(item => <li key={item} className="flex items-center gap-3 text-xs"><Check size={15} className="text-[var(--br)]" />{item}</li>)}</ul></div></Accordion.Content>
      </Accordion.Item>)}
    </Accordion.Root>
    <div className="lg:sticky lg:top-28" data-service-reveal><ServiceVisual kind={service.kind} tone={service.tone} compact /><p className="mt-4 text-center text-[11px] text-[#17162a]/[.55]">An illustrative look at what we can build together.</p></div>
  </div>;
}
