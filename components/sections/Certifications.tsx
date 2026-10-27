import { certifications } from "@/lib/content";
import Icon from "@/components/ui/Icon";

export default function Certifications() {
  return (
    <section id="trust" className="cert-section">
      <div className="w">
        <div className="cert-container rv">
          <div className="cert-header">
            <span className="ey">RECOGNITION &amp; TRUST</span>
            <h2>Certifications, Memberships &amp; Partnerships</h2>
          </div>
          <div className="cg">
            {certifications.map((group) => (
              <div key={group.heading} className="cert-col">
                <h4 className="cert-group-title">{group.heading}</h4>
                <div className="bg3">
                  {group.items.map(([icon, name, note]) => (
                    <div className="bd2" key={name}>
                      <div className="cert-icon-wrap" aria-hidden="true">
                        <Icon name={icon} size={20} />
                      </div>
                      <div className="cert-text-wrap">
                        <b>{name}</b>
                        <small>{note}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
