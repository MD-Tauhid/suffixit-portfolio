import Logo from "./Logo";
import { certifications, footerColumns, socials } from "@/lib/content";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="w">
        <div className="cert rv">
          <span className="ey">Recognition &amp; trust</span>
          <h3>Certifications, Memberships &amp; Partnerships</h3>
          <div className="cg">
            {certifications.map((group) => (
              <div key={group.heading}>
                <h4>{group.heading}</h4>
                <div className="bg3">
                  {group.items.map(([icon, name, note]) => (
                    <div className="bd2" key={name}>
                      <i aria-hidden="true">{icon}</i>
                      <div><b>{name}</b><small>{note}</small></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fg2">
          <div>
            <Logo />
            <p className="fl" style={{ marginTop: 16, maxWidth: 300 }}>
              ICT solution provider, website and software development firm serving clients in Bangladesh and around the world.
            </p>
            <div className="so">
              {socials.map((s) => (
                <a key={s.label} href={s.href}>
                  <span aria-hidden="true">{s.glyph}</span>
                  <span className="sr-only">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="t">{col.title}</h4>
              {col.links.map((l) => (
                <a className="fl" key={l.label} href={l.href}>{l.label}</a>
              ))}
            </div>
          ))}
          <div>
            <h4 className="t">Reach us</h4>
            <p className="fl">{site.address}</p>
            <p className="fl">{site.phone}</p>
            <p className="fl">{site.email}</p>
          </div>
        </div>
        <div className="cp">
          <span>© 2017–2026 Suffix IT Limited. All rights reserved.</span>
          <a href="#">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
