import { stats } from "@/lib/content";

/** Numbers start at 0 and count up when scrolled into view (see PageEffects). */
export default function Stats() {
  return (
    <section id="stats" className="w">
      <div className="strip rv-zoom rv-stagger">
        {stats.map((s, idx) => (
          <div key={s.label} className={`rv-up stagger-${idx + 1}`}>
            <b data-c={s.value} data-n={s.suffix}>0</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
