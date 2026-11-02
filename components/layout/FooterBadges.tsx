import React from "react";

interface BadgeItem {
  src: string;
  alt: string;
  targetWidth: number;
  className?: string;
}

// ─────────────────────────────────────────────────────────────
// Suffix IT — Footer Accreditations & Strategic Partners
// ─────────────────────────────────────────────────────────────
// The user requirement:
// 1. Uniform Width: All logos in each group have the same width.
// 2. Natural Height: "height ja hobe hok width er ratio onujaiyi" -> height: auto.
// 3. Balanced Positioning: Perfectly centered in responsive 3-2-3 grid columns.
// ─────────────────────────────────────────────────────────────

// Group 1: International ISO Standards (3 badges) - Same Width: 76px
const isoRow: BadgeItem[] = [
  {
    src: "/assets/img/iso-9001.png",
    alt: "ISO 9001:2015",
    targetWidth: 76,
    className: "img-cer1",
  },
  {
    src: "/assets/img/iso-27001.png",
    alt: "ISO 27001:2022",
    targetWidth: 76,
    className: "img-cer2",
  },
  {
    src: "/assets/img/iso-20000.png",
    alt: "ISO 20000-1:2018",
    targetWidth: 76,
    className: "img-iso20000",
  },
];

// Group 2: Industry Associations (2 badges) - Same Width: 130px
const assocRow: BadgeItem[] = [
  {
    src: "/assets/img/basis.png",
    alt: "BASIS - Bangladesh Association of Software and Information Services",
    targetWidth: 130,
    className: "img-basis",
  },
  {
    src: "/assets/img/bacco.png",
    alt: "BACCO - Bangladesh Association of Contact Center & Outsourcing",
    targetWidth: 130,
    className: "img-bacco",
  },
];

// Group 3: Cybersecurity & Technology Partners (3 badges) - Same Width: 86px
const partnerRow: BadgeItem[] = [
  {
    src: "/assets/img/cisco.png",
    alt: "Cisco",
    targetWidth: 86,
    className: "img-cisco",
  },
  {
    src: "/assets/img/fortinet.png",
    alt: "Fortinet",
    targetWidth: 80,
    className: "img-fort",
  },
  {
    src: "/assets/img/sophos.png",
    alt: "Sophos",
    targetWidth: 88,
    className: "img-sophos",
  },
];

export default function FooterBadges() {
  return (
    <div className="cert-wrapper">
      {/* Row 1: ISO Standards (3 items - Identical 76px Width) */}
      <div className="iso-grid grid-3">
        {isoRow.map((item) => (
          <div key={item.alt} className="iso-item">
            <img
              src={item.src}
              alt={item.alt}
              className={`ft-badge-img ${item.className || ""}`}
              style={{
                width: `${item.targetWidth}px`,
                height: "auto",
                maxWidth: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* Row 2: BASIS & BACCO (2 items - Identical 130px Width) */}
      <div className="iso-grid grid-2">
        {assocRow.map((item) => (
          <div key={item.alt} className="iso-item">
            <img
              src={item.src}
              alt={item.alt}
              className={`ft-badge-img ${item.className || ""}`}
              style={{
                width: `${item.targetWidth}px`,
                height: "auto",
                maxWidth: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* Row 3: Cisco, Fortinet, Sophos (3 items - Balanced ~86px Width) */}
      <div className="iso-grid grid-3">
        {partnerRow.map((item) => (
          <div key={item.alt} className="iso-item">
            <img
              src={item.src}
              alt={item.alt}
              className={`ft-badge-img ${item.className || ""}`}
              style={{
                width: `${item.targetWidth}px`,
                height: "auto",
                maxWidth: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
