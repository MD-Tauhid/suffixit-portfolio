import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link className="lg" href="/">
      <Image src={site.logo} alt="Suffix IT" {...site.logoSize} priority={priority} sizes="175px" />
    </Link>
  );
}
