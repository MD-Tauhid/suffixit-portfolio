import PaperPlane from "./PaperPlane";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" style={{ paddingTop: 0 }}>
      <div className="w ct">
        <div className="fin rv">
          <h2>Let&apos;s build something <em style={{ color: "#7cc7f7" }}>remarkable</em> together.</h2>
          <p>Tell us what you need. We will reply with a clear plan and a live demo.</p>
          <a className="btn p" href={`mailto:${site.email}`}>Get free consultancy →</a>
          <PaperPlane />
        </div>
        <div className="off rv">
          <small>Head office</small>
          <p><b>{site.name}</b>{site.address}</p>
          <p><b>Call us</b><a href={site.phoneHref}>{site.phone}</a></p>
          <p><b>Email</b><a href={`mailto:${site.email}`}>{site.email}</a></p>
        </div>
      </div>
    </section>
  );
}
