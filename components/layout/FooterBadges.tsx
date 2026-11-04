import React from "react";

interface BadgeItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

// ─────────────────────────────────────────────────────────────
// Suffix IT — Footer Accreditations & Strategic Partners
// Perfectly balanced optical scale across all rows
// ─────────────────────────────────────────────────────────────

// Group 1: International ISO Standards (3 badges) - Identical 82px x 82px
const isoRow: BadgeItem[] = [
  {
    src: "/assets/img/iso-9001.png",
    alt: "ISO 9001:2015",
    width: 70,
    height: 70,
    className: "img-cer1",
  },
  {
    src: "/assets/img/iso-27001.png",
    alt: "ISO 27001:2022",
    width: 70,
    height: 70,
    className: "img-cer2",
  },
  {
    src: "/assets/img/iso-20000.png",
    alt: "ISO 20000-1:2018",
    width: 65,
    height: 70,
    className: "img-iso20000",
  },
];

// Group 2: Industry Associations (2 badges) - Uniform 38px height
const assocRow: BadgeItem[] = [
  {
    src: "/assets/img/basis.png",
    alt: "BASIS - Bangladesh Association of Software and Information Services",
    width: 100,
    height: 38,
    className: "img-basis",
  },
  {
    src: "/assets/img/bacco.png",
    alt: "BACCO - Bangladesh Association of Contact Center & Outsourcing",
    width: 140,
    height: 50,
    className: "img-bacco",
  },
];

// Group 3: Cybersecurity & Technology Partners (3 badges)
// Normalized for optical balance so Cisco, Fortinet, and Sophos all look equally prominent
const partnerRow: BadgeItem[] = [
  {
    src: "/assets/img/cisco.png",
    alt: "Cisco",
    width: 99,
    height: 50,
    className: "img-cisco",
  },
  {
    src: "/assets/img/fortinet.png",
    alt: "Fortinet",
    width: 99,
    height: 60,
    className: "img-fort",
  },
  {
    src: "/assets/img/sophos.png",
    alt: "Sophos",
    width: 148,
    height: 24,
    className: "img-sophos",
  },
];

export default function FooterBadges() {
  return (
    <div className="cert-wrapper">
      {/* Row 1: ISO Standards (3 items - Identical 82px) */}
      <div className="iso-grid grid-3">
        {isoRow.map((item) => (
          <div key={item.alt} className="iso-item" style={{ height: "84px" }}>
            <img
              src={item.src}
              alt={item.alt}
              className={`ft-badge-img ${item.className || ""}`}
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                maxWidth: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* Row 2: BASIS & BACCO (2 items - Uniform 38px height) */}
      <div className="iso-grid grid-2">
        {assocRow.map((item) => (
          <div key={item.alt} className="iso-item" style={{ height: "46px" }}>
            <img
              src={item.src}
              alt={item.alt}
              className={`ft-badge-img ${item.className || ""}`}
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                maxWidth: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* Row 3: Cisco, Fortinet, Sophos (3 items - Equal optical visual mass) */}
      <div
        className="iso-grid grid-3 mt-2"
        style={{
          gridTemplateColumns: "1fr 0.85fr 1.45fr",
        }}
      >
        {partnerRow.map((item) => (
          <div key={item.alt} className="iso-item" style={{ height: "50px" }}>
            <img
              src={item.src}
              alt={item.alt}
              className={`ft-badge-img ${item.className || ""}`}
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
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
