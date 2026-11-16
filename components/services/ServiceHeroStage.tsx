import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ServiceMediaConfig } from "./serviceDataMap";
import design from "./DetailPage.module.css";

export default function ServiceHeroStage({ serviceName, mediaConfig }: { serviceName: string; mediaConfig: ServiceMediaConfig }) {
  const isTeam = serviceName.toLowerCase().includes("dedicated");
  return <div className={design.heroStage}>
    <div className={design.heroPhoto} data-service-float>
      <Image src={mediaConfig.heroImage} alt={isTeam ? "Illustrative photograph of software engineers collaborating in a bright studio" : `${serviceName} illustration`} fill priority sizes="(max-width: 639px) 100vw, 50vw" />
    </div>
    <div className={design.heroNote}>
      <span>{isTeam ? "Built around your project" : "From requirements to delivery"}</span>
      <strong>{isTeam ? <>Your goals.<br />One connected team.</> : <>Your business.<br />A considered solution.</>}</strong>
    </div>
    <span className={design.heroCorner} aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.5} /></span>
  </div>;
}
