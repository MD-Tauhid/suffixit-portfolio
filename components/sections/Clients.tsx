import Image from "next/image";
import SectionHeader from "./SectionHeader";
import Icon from "@/components/ui/Icon";
import { Marquee } from "@/components/ui/marquee";
import { clientRow1, clientRow2, ClientItem } from "@/lib/clients";

function ClientCard({ client }: { client: ClientItem }) {
  return (
    <div
      className="tech-marquee-box group"
      title={client.name}
    >
      <Image
        src={client.logo}
        alt={client.alt}
        width={140}
        height={60}
        className="tech-marquee-logo"
      />
    </div>
  );
}

export default function Clients() {
  return (
    <section className="clients-section" id="clients">
      {/* Ambient soft glow */}
      <div className="clients-ambient-glow" aria-hidden="true" />

      <div className="w">
        <SectionHeader
          eyebrow="Our clients"
          text="From government ministries to market-defining enterprises, leading teams across Bangladesh rely on Suffix IT's software every single day."
        >
          Trusted by <em>leading organizations</em> across Bangladesh
        </SectionHeader>

        {/* High-credibility Trust Stats Badges */}
        <div className="client-trust-badges rv">
          <div className="trust-pill">
            <span className="trust-pill-icon">
              <Icon name="landmark" size={14} />
            </span>
            <span><strong>10+</strong> Government &amp; Public Entities</span>
          </div>
          <div className="trust-pill">
            <span className="trust-pill-icon">
              <Icon name="building-2" size={14} />
            </span>
            <span><strong>40+</strong> Industrial &amp; Corporate Giants</span>
          </div>
          <div className="trust-pill">
            <span className="trust-pill-icon">
              <Icon name="shield-check" size={14} />
            </span>
            <span><strong>100%</strong> Enterprise Reliability</span>
          </div>
          <div className="trust-pill">
            <span className="trust-pill-icon">
              <Icon name="handshake" size={14} />
            </span>
            <span><strong>99%</strong> Client Retention Rate</span>
          </div>
        </div>
      </div>

      {/* Dual-Direction Infinite Logo Marquee matching screenshot */}
      <div className="tech-marquee-wrapper rv" aria-label="Logos of organizations that use Suffix IT software">
        {/* Row 1 - Left to Right flow */}
        <Marquee speed={32} pauseOnHover direction="left" className="tech-marquee-lane">
          {clientRow1.map((client, idx) => (
            <ClientCard key={`row1-${client.name}-${idx}`} client={client} />
          ))}
        </Marquee>

        {/* Row 2 - Right to Left flow */}
        <Marquee speed={35} pauseOnHover direction="right" className="tech-marquee-lane">
          {clientRow2.map((client, idx) => (
            <ClientCard key={`row2-${client.name}-${idx}`} client={client} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
