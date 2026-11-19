"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SuffixGlassReveal } from "./liquid-glass-logo-reveal";

interface SwarmRebuildRevealProps {
  onComplete: () => void;
  autoPlay?: boolean;
}

// Multi-agent collaborative cursors resembling Swarm Rebuild / Figma multiplayer
const SWARM_AGENTS = [
  {
    name: "Ashik · Architect",
    role: "System Design",
    color: "#0072bc",
    x: "15%",
    y: "22%",
    delay: "0.1s",
  },
  {
    name: "Sarah · UI/UX Lead",
    role: "Typography & Layout",
    color: "#ec4899",
    x: "32%",
    y: "42%",
    delay: "0.25s",
  },
  {
    name: "Tariq · Core Engine",
    role: "Terminal & Logic",
    color: "#10b981",
    x: "68%",
    y: "48%",
    delay: "0.35s",
  },
  {
    name: "DevOps · Cloud Deploy",
    role: "Telemetry & SLA",
    color: "#f59e0b",
    x: "82%",
    y: "24%",
    delay: "0.45s",
  },
];

// Target bounding boxes being constructed by the swarm agents
const BOUNDING_BOXES = [
  {
    id: "nav-box",
    label: "Header Navigation · [1280 × 64]",
    color: "#0072bc",
    top: "20px",
    left: "5%",
    width: "90%",
    height: "64px",
    delay: "0.15s",
  },
  {
    id: "hero-copy",
    label: "Headline Typography · [640 × 380]",
    color: "#ec4899",
    top: "140px",
    left: "6%",
    width: "44%",
    height: "380px",
    delay: "0.25s",
  },
  {
    id: "tech-cockpit",
    label: "Suffix Technology Cockpit · [560 × 440]",
    color: "#10b981",
    top: "140px",
    left: "53%",
    width: "41%",
    height: "440px",
    delay: "0.35s",
  },
  {
    id: "cta-group",
    label: "Action Triggers · [380 × 56]",
    color: "#f59e0b",
    top: "540px",
    left: "6%",
    width: "34%",
    height: "64px",
    delay: "0.45s",
  },
];

export default function SwarmRebuildReveal({
  onComplete,
  autoPlay = true,
}: SwarmRebuildRevealProps) {
  // Phase 1: Logo Center (0s - 1.4s)
  // Phase 2: Swarm Rebuild Multi-agent Construction (1.4s - 3.2s)
  // Phase 3: Complete & Handover
  const [phase, setPhase] = useState<"logo" | "swarm" | "complete">("logo");
  const [skipRequested, setSkipRequested] = useState(false);

  useEffect(() => {
    if (!autoPlay) {
      onComplete();
      return;
    }

    // Transition 1: Logo presentation -> Swarm Rebuild
    const t1 = setTimeout(() => {
      console.log("[SwarmRebuild] Phase -> SWARM");
      setPhase("swarm");
    }, 1200);

    // Transition 2: Swarm complete -> Handover to live Hero
    const t2 = setTimeout(() => {
      console.log("[SwarmRebuild] Phase -> COMPLETE");
      setPhase("complete");
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [autoPlay, onComplete]);

  const handleSkip = () => {
    setSkipRequested(true);
    setPhase("complete");
    onComplete();
  };

  if (phase === "complete" || skipRequested) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[99999] bg-[#f8fcff] flex items-center justify-center overflow-hidden select-none"
      aria-label="Suffix IT Swarm Rebuild Intro"
    >
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(#0072bc18_1px,transparent_1px)] [background-size:28px_28px] opacity-80"
        aria-hidden="true"
      />

      {/* Top Status Bar & Skip Trigger */}
      <div className="absolute top-5 inset-x-6 flex items-center justify-between z-50">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-sky-200 shadow-sm backdrop-blur-md text-xs font-medium text-slate-700">
          <span className="size-2 rounded-full bg-[#0072bc] animate-ping" />
          <span className="font-semibold text-[#0072bc]">
            {phase === "logo" ? "Suffix IT Core Initializing..." : "Swarm Rebuild · Assembling Homepage"}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-mono text-[11px]">v4.6.0-stable</span>
        </div>

        <button
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 hover:bg-white text-slate-600 hover:text-[#0072bc] border border-slate-200 hover:border-sky-300 shadow-sm transition-all text-xs font-semibold cursor-pointer"
        >
          Skip Intro <span>⏭</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. CENTER LOGO PRESENTATION (Matching /about Page Spec)     */}
      {/* ========================================================= */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center transition-all duration-700 ${phase === "swarm"
            ? "scale-75 opacity-0 blur-md pointer-events-none -translate-y-12"
            : "scale-100 opacity-100 blur-0"
          }`}
      >
        {/* Soft Ambient Radial Glow Behind Logo Card */}
        <div
          className="pointer-events-none absolute size-[400px] sm:size-[460px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.45)_0%,rgba(0,114,188,0.28)_45%,transparent_70%)] blur-3xl opacity-90 transition-all duration-700"
          aria-hidden="true"
        />

        {/* Orbiting Tech Ring with Dashes */}
        <div
          className="pointer-events-none absolute size-[380px] sm:size-[430px] rounded-full border border-[#0072bc]/35 border-dashed animate-[spin_60s_linear_infinite]"
          aria-hidden="true"
        />

        {/* The Exact Glass Card Structure from app/about/page.tsx:L76-92 */}
        <div className="relative flex items-center justify-center size-[320px] sm:size-[360px] md:size-[380px] rounded-3xl p-4 bg-white/85 backdrop-blur-2xl border border-sky-200/90 shadow-[0_24px_60px_-15px_rgba(0,114,188,0.28)] overflow-hidden">

          {/* Prominent High-Res S-Logo visible IMMEDIATELY */}
          <div className="absolute inset-8 flex items-center justify-center z-20 pointer-events-none">
            <Image
              src="/assets/about/s-logo.png"
              alt="Suffix IT Mark"
              width={260}
              height={260}
              priority
              className="object-contain drop-shadow-[0_14px_24px_rgba(0,114,188,0.3)] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* WebGL2 Liquid Glass Interactive Reveal Layer */}
          <SuffixGlassReveal
            className="size-full rounded-2xl cursor-pointer relative z-10 opacity-70"
            background="#e8f3fc"
            look="light"
            logo="/assets/about/s-logo.png"
            logoColor="#0072bc"
            originalColors={false}
            tileSize={360}
            tuning={{
              startZoom: 2.3,
              dispersion: 1.85,
              colorBleed: 1.35,
              corner: 4.8,
              specular: 1.25,
              sheen: 1.1,
            }}
          />
        </div>

        {/* Brand Caption Underneath */}
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#073b60]">
            Suffix IT Solutions
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500 tracking-wide">
            Ultimate solutions. Engineering enterprise systems.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SWARM REBUILD AGENT CURSORS & BOUNDING WIREFRAMES       */}
      {/* ========================================================= */}
      {phase === "swarm" && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {/* Smart Alignment Guide Lines (Figma/Swarm Style) */}
          <div className="absolute top-[84px] inset-x-0 h-[1px] bg-red-400/50 border-t border-dashed border-red-500/80" />
          <div className="absolute top-[140px] inset-x-0 h-[1px] bg-sky-400/50 border-t border-dashed border-sky-500/80" />
          <div className="absolute top-[520px] inset-x-0 h-[1px] bg-pink-400/50 border-t border-dashed border-pink-500/80" />
          <div className="absolute left-[6%] inset-y-0 w-[1px] bg-sky-400/50 border-l border-dashed border-sky-500/80" />
          <div className="absolute left-[53%] inset-y-0 w-[1px] bg-emerald-400/50 border-l border-dashed border-emerald-500/80" />

          {/* Bounding Boxes drawn by the Swarm */}
          {BOUNDING_BOXES.map((box) => (
            <div
              key={box.id}
              className="absolute rounded-xl border-2 border-dashed shadow-sm transition-all duration-500"
              style={{
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height,
                borderColor: box.color,
                backgroundColor: `${box.color}0c`,
                transitionDelay: box.delay,
              }}
            >
              {/* Dimension Tag */}
              <div
                className="absolute -top-3.5 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-md flex items-center gap-1.5"
                style={{ backgroundColor: box.color }}
              >
                <span>{box.label}</span>
              </div>
            </div>
          ))}

          {/* Collaborative Multiplayer Cursors */}
          {SWARM_AGENTS.map((agent) => (
            <div
              key={agent.name}
              className="absolute flex items-start gap-1.5 transition-all duration-700 ease-out drop-shadow-lg"
              style={{
                left: agent.x,
                top: agent.y,
                transitionDelay: agent.delay,
              }}
            >
              {/* Custom SVG Figma-Style Cursor Pointer */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="drop-shadow-md"
              >
                <path
                  d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                  fill={agent.color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Cursor Name Tag */}
              <div
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-white shadow-lg whitespace-nowrap flex items-center gap-1.5"
                style={{ backgroundColor: agent.color }}
              >
                <span>{agent.name}</span>
                <span className="opacity-80 text-[9px] font-normal font-mono">({agent.role})</span>
              </div>
            </div>
          ))}

          {/* Live System Construction Banner */}
          <div className="absolute bottom-8 inset-x-0 flex justify-center">
            <div className="px-6 py-2.5 rounded-full bg-white/95 border border-sky-300 shadow-xl backdrop-blur-md flex items-center gap-3">
              <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#073b60]">
                Swarm Engine: Constructing Homepage Blueprint (100% Ready)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
