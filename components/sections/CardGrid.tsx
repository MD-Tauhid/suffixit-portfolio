import type { Card } from "@/lib/content";

/** Icon card used by Products, Industries and Services. `variant` picks the grid-specific details. */
export default function CardItem({ card, variant }: { card: Card; variant: "product" | "industry" | "service" }) {
  const cta = variant === "product" ? "Request demo" : variant === "service" ? "Learn more" : null;
  return (
    <div className={`cd rv${variant === "industry" ? "" : " z"}${card.core ? " core" : ""}`}>
      {card.core && <span className="badge">CORE</span>}
      <div className="ic" style={{ background: card.bg }} aria-hidden="true">{card.icon}</div>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      {card.tags && (
        <div className="tg">
          {card.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
      )}
      {cta && <a className="mr" href="#contact">{cta}</a>}
    </div>
  );
}
