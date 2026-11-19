import Image from "next/image";
import { Check } from "lucide-react";
import type { ServiceMediaConfig } from "./serviceDataMap";
import design from "./DetailPage.module.css";

type Props = { outcome: string; introduction: string; benefits: string[]; mediaConfig: ServiceMediaConfig };

export default function ServiceFeatureSpotlight({ outcome, introduction, benefits, mediaConfig }: Props) {
  return <div className={design.overview}>
    <div className={design.overviewPhoto} data-service-reveal>
      <Image src={mediaConfig.spotlightImage} alt="Illustrative view of collaboration and technical delivery" fill sizes="(max-width: 639px) 100vw, 50vw" />
    </div>
    <div className={design.overviewCopy} data-service-stagger>
      <span className={design.eyebrow}>A closer look</span>
      <h2 className={design.heading}>{outcome}</h2>
      <p className={design.body}>{introduction}</p>
      <ul className={design.benefits}>{benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul>
    </div>
  </div>;
}
