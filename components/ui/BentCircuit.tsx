"use client";

import React from "react";
import { motion } from "motion/react";
import useMotionPreference from "./useMotionPreference";

const routes = [
  "M0 52 H310 Q328 52 340 65 L392 117 Q404 130 422 130 H800 Q818 130 830 117 L887 60 Q899 47 917 47 H1200",
  "M130 100 H242 Q260 100 272 113 L312 153 Q324 166 342 166 H544",
  "M596 190 H712 Q730 190 742 177 L780 139 Q792 126 810 126 H950",
];

export default function BentCircuit({ className = "" }: { className?: string }) {
  const reduced = useMotionPreference();
  return (
    <svg
      className={`bent-circuit pointer-events-none select-none text-[#0072bc]/25 ${className}`}
      viewBox="0 0 1200 210"
      fill="none"
      aria-hidden="true"
    >
      {routes.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={index ? 2 : 2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 2.2, delay: reduced ? 0 : index * 0.2, ease: "easeOut" }}
        />
      ))}
      {[
        [18, 52],
        [296, 80],
        [552, 166],
        [906, 72],
        [972, 126],
        [1178, 47],
      ].map(([cx, cy], i) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="5" fill="#0072bc" fillOpacity="0.4" />
          <circle cx={cx} cy={cy} r="2.5" fill="#38bdf8" />
        </g>
      ))}
    </svg>
  );
}
