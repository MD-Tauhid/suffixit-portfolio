"use client";

import { useState } from "react";
import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { Check, Plus } from "lucide-react";
import type { Service } from "@/lib/services";
import type { ServiceMediaConfig } from "./serviceDataMap";
import design from "./DetailPage.module.css";

export default function ServiceCapabilitiesInteractive({ service, mediaConfig }: { service: Service; mediaConfig: ServiceMediaConfig }) {
  const [active, setActive] = useState("capability-0");
  const activeIndex = Number(active.replace("capability-", ""));
  const capability = service.capabilities[activeIndex];
  const image = mediaConfig.capabilityImages[activeIndex % mediaConfig.capabilityImages.length] || mediaConfig.heroImage;

  return <div className={design.explorer}>
    <Accordion.Root type="single" value={active} onValueChange={setActive}>
      {service.capabilities.map((item, index) => <Accordion.Item key={item.title} value={`capability-${index}`} className={design.capabilityItem}>
        <Accordion.Header><Accordion.Trigger className={design.capabilityTrigger}><span>{item.title}</span><Plus aria-hidden="true" /></Accordion.Trigger></Accordion.Header>
        <Accordion.Content className={design.accordionContent}>
          <div className={design.capabilityBody}>
            <p>{item.text}</p>
            <ul className={design.deliverables}>{item.deliverables.map((deliverable) => <li key={deliverable}><Check size={11} aria-hidden="true" />{deliverable}</li>)}</ul>
          </div>
        </Accordion.Content>
      </Accordion.Item>)}
    </Accordion.Root>
    <div className={design.preview}>
      <div key={image} className={`${design.previewPhoto} ${design.previewEnter}`}>
        <Image src={image} alt={`Illustrative visual for ${capability.title.toLowerCase()}`} fill sizes="(max-width: 639px) 100vw, 50vw" />
      </div>
      <div className={design.previewCaption}><h3>{capability.title}</h3><span>{String(activeIndex + 1).padStart(2, "0")} / {String(service.capabilities.length).padStart(2, "0")}</span></div>
      <p className={design.previewText}>{capability.text}</p>
    </div>
  </div>;
}
