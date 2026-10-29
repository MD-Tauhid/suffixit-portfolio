import { stats } from "@/lib/content";

/** Numbers start at 0 and count up when scrolled into view (see PageEffects). */
export default function Stats() {
  return (
    <section id="stats" className="w">
      <div className="strip rv">
        {stats.map((s) => (
          <div key={s.label}>
            <b data-c={s.value} data-n={s.suffix}>0</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
