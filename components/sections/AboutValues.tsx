"use client";

import { useState } from "react";
import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowUpRight, Plus } from "lucide-react";
import { about, values } from "@/lib/about";
import styles from "@/app/about/about.styles";

const scenes = [
  { image: about.images.collaboration, line: "The right solution starts with listening.", detail: "Your workflows and priorities shape the work ahead." },
  { image: about.images.detail, line: "Care in the details. Confidence in the result.", detail: "Design, development and testing with a clear purpose." },
  { image: about.images.hero, line: "New knowledge. Practical possibilities.", detail: "Exploring technology with real business needs in mind." },
  { image: about.images.culture, line: "Delivery is the start of a partnership.", detail: "Support and improvement as your business evolves." },
];

export default function AboutValues() {
  const [active, setActive] = useState("value-0");
  return <div className={styles.valuesExperience}>
    <div className={styles.valueScenes} data-about-reveal="image">
      {scenes.map((scene, index) => <div key={scene.image + index} className={styles.valueScene} data-active={active === `value-${index}`} aria-hidden={active !== `value-${index}`}>
        <Image src={scene.image} alt="Illustrative collaboration photograph" fill sizes="(max-width: 760px) 100vw, 50vw" />
        <div className={styles.sceneCaption}><span>{values[index].tag}</span><h3>{scene.line}</h3><p>{scene.detail}</p></div>
      </div>)}
      <span className={styles.sceneMark} aria-hidden="true"><ArrowUpRight /></span>
    </div>
    <Accordion.Root type="single" value={active} onValueChange={setActive} className={styles.valueList} data-about-stagger>
      {values.map((value, index) => <Accordion.Item key={value.title} value={`value-${index}`} className={styles.valueItem}>
        <Accordion.Header><Accordion.Trigger className={styles.valueTrigger}><span className={styles.valueDot} /><span>{value.title}</span><Plus size={22} /></Accordion.Trigger></Accordion.Header>
        <Accordion.Content className={styles.valueContent}><div className={styles.valueBody}><p>{value.text}</p><span>{value.tag}</span></div></Accordion.Content>
      </Accordion.Item>)}
    </Accordion.Root>
  </div>;
}
