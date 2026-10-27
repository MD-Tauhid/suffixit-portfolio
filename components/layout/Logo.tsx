import Image from "next/image";
import { site } from "@/lib/site";

export default function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <a className="lg" href="#">
      <Image src={site.logo} alt="Suffix IT" {...site.logoSize} priority={priority} sizes="175px" />
    </a>
  );
}
