"use client";

import { useEffect, useRef, useState } from "react";
import { dashboardViews, featureTabs, phoneScreens } from "@/lib/fieldforce";

const TAB_ICONS = [
  { label: "Track", paths: ["M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"], circle: true },
  { label: "Attendance", paths: ["M8 3v4M16 3v4M8.5 13l2.5 2.5 4.5-5"], rect: true },
  { label: "Orders", paths: ["M5 8h14l-1 12H6z", "M9 8a3 3 0 0 1 6 0"] },
  { label: "Insights", paths: ["M5 20V10M12 20V4M19 20v-7"] },
];

/**
 * Interactive Field Force showcase: feature tabs drive the web dashboard, the phone screen,
 * the tab bar and the floating status pill. Auto-advances every 5.2s, restarting on click.
 * The mock screens are static HTML strings from lib/fieldforce.ts (placeholder sample data).
 */
export default function FieldForceDemo() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setActive((i) => (i + 1) % featureTabs.length), 5200);
    return () => clearTimeout(id);
  }, [active]);

  // Live "working time" counter on the attendance screen.
  useEffect(() => {
    let seconds = 24138;
    const id = setInterval(() => {
      seconds++;
      const el = root.current?.querySelector("#wt");
      if (el) el.textContent = [(seconds / 3600) | 0, (seconds / 60) % 60 | 0, seconds % 60].map((x) => String(x).padStart(2, "0")).join(":");
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ffl" ref={root}>
      <div className="rv l">
        <div className="tabs" id="tabs" style={{ marginTop: 0 }}>
          {featureTabs.map(([title, text], i) => (
            <button type="button" key={title} className={`tb${i === active ? " on" : ""}`} aria-pressed={i === active} onClick={() => setActive(i)}>
              <b>{title}</b>
              <span>{text}</span>
            </button>
          ))}
        </div>
        <a className="btn p" style={{ marginTop: 26 }} href="#contact">Request FFMS demo →</a>
      </div>

      <div className="fxs rv rr" aria-hidden="true">
        <div className="fxw">
          <div className="bar"><i></i><i></i><i></i><span>ffms.suffixit.com</span></div>
          <div className="bd" id="dvs">
            {dashboardViews.map((html, i) => (
              <div key={i} className={`dv${i === active ? " on" : ""}`} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>
        </div>
        {/* key restarts the pill's CSS animation whenever the tab changes */}
        <div className="fxk" id="pill" key={active}><s></s><span>{featureTabs[active][2]}</span></div>
        <div className="fxp">
          <div className="in">
            <div className="isl"></div>
            <div className="sbar"><span>9:41</span><span>5G ▮▮▮ 82%</span></div>
            <div id="scs">
              {phoneScreens.map((html, i) => (
                <div key={i} className={`scn s${i + 1}${i === active ? " on" : ""}`} dangerouslySetInnerHTML={{ __html: html }} />
              ))}
            </div>
            <div className="tbar" id="tbr">
              {TAB_ICONS.map((t, i) => (
                <span key={t.label} className={i === active ? "a" : undefined}>
                  <svg viewBox="0 0 24 24">
                    {t.rect && <rect x="4" y="5" width="16" height="15" rx="3" />}
                    {t.paths.map((d) => <path key={d} d={d} />)}
                    {t.circle && <circle cx="12" cy="10" r="2.5" />}
                  </svg>
                  {t.label}
                </span>
              ))}
            </div>
            <div className="hi"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
