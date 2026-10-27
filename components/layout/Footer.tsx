import Icon from "@/components/ui/Icon";
import FooterBadges from "./FooterBadges";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="ft-exact">
      {/* Interactive cursor-following spotlight "SUFFIX IT" stroke watermark */}
      <div className="ft-watermark-wrap" aria-hidden="true">
        <TextHoverEffect text="SUFFIX IT" />
      </div>

      <div className="w ft-container">
        <div className="ft-main-grid">
          {/* Column 1: Brand Info */}
          <div className="ft-col ft-col-brand">
            <a href="#" className="ft-brand-header">
              <img
                src="/assets/img/Suffix-Logo-Dark.png"
                alt="Suffix IT ultimate solutions"
                width={185}
                height={68}
                className="ft-logo-dark"
                style={{ objectFit: "contain", height: "auto", maxWidth: "185px" }}
              />
            </a>

            <p className="ft-brand-text">
              We maintain strategic partnerships with multiple organizations in Bangladesh and worldwide, working together to deliver high-quality solutions and long-term value.
            </p>

            <div className="ft-social-row">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-sq"
                aria-label="Facebook"
              >
                <Icon name="facebook" size={17} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-sq"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size={17} />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Us */}
          <div className="ft-col ft-col-contact">
            <h4 className="ft-title">CONTACT US</h4>
            <div className="ft-contact-list">
              <div className="ft-contact-row">
                <div className="ft-icon-box">
                  <Icon name="map-pin" size={19} />
                </div>
                <div className="ft-contact-text">
                  Cha-70,70/A, Rupayan Millennium Square (9A), Progoti Sharoni, North Badda, Gulshan, Dhaka-1212.
                </div>
              </div>

              <div className="ft-contact-row">
                <div className="ft-icon-box">
                  <Icon name="mail" size={18} />
                </div>
                <a href={`mailto:${site.email}`} className="ft-contact-link">
                  {site.email}
                </a>
              </div>

              <div className="ft-contact-row">
                <div className="ft-icon-box">
                  <Icon name="phone" size={18} />
                </div>
                <a href={site.phoneHref} className="ft-contact-link">
                  {site.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="ft-col ft-col-links">
            <h4 className="ft-title">QUICK LINKS</h4>
            <ul className="ft-quick-links">
              <li><a href="#why">About Us</a></li>
              <li><a href="#contact">Career</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Certifications & Partners Badges */}
          <div className="ft-col ft-col-badges">
            <FooterBadges />
          </div>
        </div>

        {/* Bottom Bar: Copyright & Floating Circular Back to Top */}
        <div className="ft-bottom-bar">
          <p className="ft-copyright">
            &copy; 2026 All Rights Reserved by{" "}
            <a href="#" className="ft-cr-link">
              Suffix IT Limited
            </a>
          </p>

          <a href="#" className="ft-scroll-top" aria-label="Back to top">
            <Icon name="arrow-up" size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
