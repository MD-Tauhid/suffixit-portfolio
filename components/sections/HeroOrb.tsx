export default function HeroOrb() {
  return (
    <svg className="orb" aria-hidden="true" viewBox="0 0 500 500"><defs><linearGradient id="og" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0072bc"/><stop offset="1" stopColor="#3cc3f0"/></linearGradient></defs>
<circle cx="250" cy="250" r="226" fill="none" stroke="url(#og)" strokeWidth="1.5" strokeDasharray="3 9" opacity=".6"/><circle cx="250" cy="250" r="172" fill="none" stroke="url(#og)" strokeWidth="1.5" opacity=".22"/>
<g className="spin"><circle cx="250" cy="24" r="7" fill="#0072bc"/><circle cx="476" cy="250" r="5" fill="#3cc3f0"/></g><g className="spin r"><circle cx="250" cy="78" r="5" fill="#8b6cf0"/><circle cx="78" cy="250" r="6" fill="#1fb88a"/></g></svg>
  );
}
