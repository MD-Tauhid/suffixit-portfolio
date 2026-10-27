"use client";

import React, { useRef, useState, useEffect } from "react";

interface TextHoverEffectProps {
  text?: string;
  className?: string;
}

export function TextHoverEffect({
  text = "SUFFIX IT",
  className = "",
}: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor !== null) {
      const rect = svgRef.current.getBoundingClientRect();
      const cx = ((cursor.x - rect.left) / rect.width) * 100;
      const cy = ((cursor.y - rect.top) / rect.height) * 100;
      setMaskPosition({
        cx: `${Math.max(0, Math.min(100, cx))}%`,
        cy: `${Math.max(0, Math.min(100, cy))}%`,
      });
    }
  }, [cursor]);

  return (
    <div
      className={`ft-hover-container ${className}`}
      onMouseEnter={(e) => {
        setHovered(true);
        setCursor({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => {
        setHovered(false);
        setCursor(null);
      }}
      onMouseMove={(e) => {
        setCursor({ x: e.clientX, y: e.clientY });
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 360 75"
        xmlns="http://www.w3.org/2000/svg"
        className="ft-hover-svg select-none"
      >
        <defs>
          {/* Soft, subtle glow filter (refined, not harsh) */}
          <filter id="ftSubtleGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Cursor-following radial mask */}
          <radialGradient
            id="ftSpotlightMask"
            gradientUnits="userSpaceOnUse"
            r="18%"
            cx={maskPosition.cx}
            cy={maskPosition.cy}
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <mask id="ftTextMask">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#ftSpotlightMask)" />
          </mask>
        </defs>

        {/* Base layer: Subtle, quiet outline visible across entire text */}
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="0.6"
          fill="transparent"
          className="ft-svg-base-text"
        >
          {text}
        </text>

        {/* Interactive layer: ONLY where the mouse is, stroke lights up in cyan with a gentle, soft glow */}
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="#3cb4f0"
          strokeWidth="0.85"
          fill="transparent"
          filter="url(#ftSubtleGlow)"
          mask="url(#ftTextMask)"
          className="ft-svg-spotlight-text"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease-out",
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}

export default TextHoverEffect;
