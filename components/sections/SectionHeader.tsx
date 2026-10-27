import type { ReactNode } from "react";

export default function SectionHeader({ eyebrow, children, text }: { eyebrow: string; children: ReactNode; text?: string }) {
  return (
    <div className="sh rv">
      <span className="ey">{eyebrow}</span>
      <h2>{children}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
