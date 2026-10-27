import SectionHeader from "./SectionHeader";

export default function Clients() {
  return (
    <section className="alt" id="clients" style={{ padding: "80px 0 70px" }}>
      <div className="w">
        <SectionHeader eyebrow="Our clients" text="From government bodies to industry leaders, teams rely on Suffix IT software every day.">
          Trusted by <em>leading organizations</em> across Bangladesh
        </SectionHeader>
      </div>
      {/* Client logos are scrolling CSS backgrounds (three JPG strips), exactly as in the original. */}
      <div className="lrw rv" role="img" aria-label="Logos of organizations that use Suffix IT software">
        <div className="lr r1"></div>
        <div className="lr r2"></div>
        <div className="lr r3"></div>
      </div>
    </section>
  );
}
