"use client";

import { useEffect, useRef } from "react";

const CODE = `// suffix.config.js
const solution = {
  client: "your business",
  build: ["ERP", "HCM", "Mobile", "Web"],
  team: "Suffix IT",
};

await deploy(solution);
// ✓ live in production`;

/** Same tiny syntax highlighter as the original: comments, strings, keywords, the deploy() call. */
const highlight = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(
      /(\/\/.*)|("[^"]*"?)|\b(const|await)\b|\b(deploy)\b/g,
      (_m, c?: string, q?: string, k?: string, f?: string) =>
        c ? `<span class="c">${c}</span>` : q ? `<span class="s">${q}</span>` : k ? `<span class="k">${k}</span>` : `<span class="f">${f}</span>`,
    );

/** Types the hero code, then holds, then restarts. Writes to the DOM directly (no React re-render per keystroke). */
export default function CodeTyper() {
  const pre = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = pre.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.innerHTML = highlight(CODE);
      return;
    }
    let i = 0;
    let hold = 0;
    const id = setInterval(() => {
      if (i >= CODE.length) {
        if (++hold > 70) {
          i = 0;
          hold = 0;
        }
      } else i++;
      el.innerHTML = highlight(CODE.slice(0, i)) + '<span class="cr"></span>';
    }, 42);
    return () => clearInterval(id);
  }, []);

  return <pre id="code" ref={pre} />;
}
