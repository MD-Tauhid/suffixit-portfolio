import Image from "next/image";

const badges = [
  {
    src: "/assets/img/iso-9001.png",
    alt: "ISO 9001:2015",
    width: 130,
    height: 70,
    className: "badge-iso1",
  },
  {
    src: "/assets/img/iso-27001.png",
    alt: "ISO 27001:2022",
    width: 130,
    height: 70,
    className: "badge-iso2",
  },
  {
    src: "/assets/img/basis.png",
    alt: "BASIS",
    width: 160,
    height: 65,
    className: "badge-basis",
  },
  {
    src: "/assets/img/bacco.png",
    alt: "BACCO",
    width: 160,
    height: 65,
    className: "badge-bacco",
  },
  {
    src: "/assets/img/cisco.png",
    alt: "CISCO",
    width: 140,
    height: 60,
    className: "badge-cisco",
  },
  {
    src: "/assets/img/fortinet.png",
    alt: "FORTINET",
    width: 140,
    height: 60,
    className: "badge-fortinet",
  },
];

export default function FooterBadges() {
  return (
    <div className="ft-badges-grid">
      {badges.map((badge) => (
        <div key={badge.alt} className="ft-badge-item">
          <Image
            src={badge.src}
            alt={badge.alt}
            width={badge.width}
            height={badge.height}
            className={`ft-badge-img ${badge.className}`}
            style={{ objectFit: "contain", height: "auto", maxWidth: "100%" }}
          />
        </div>
      ))}
    </div>
  );
}
