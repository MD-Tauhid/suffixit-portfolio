import React from "react";
import SwarmRebuildHero from "@/components/ui/SwarmRebuildHero";
import MetroHero from "@/components/ui/scroll-locked-video-hero";
import SpatialRebuildHero from "@/components/ui/SpatialRebuildHero";
import ModernHero from "@/components/sections/ModernHero";

/* ─────────────────────────────────────────────────────────────
   1. NEXT-GEN FLAGSHIP HERO SECTION (Swarm Rebuild + ShapeGrid + 3D Cockpit)
   - 3D Liquid Glass S-Logo Entrance (matching About page)
   - Swarm Rebuild Multi-Agent Layout Construction
   - Canvas ShapeGrid + Frosted Glass HeroCurves + BentCircuit
   - Monumental Typography with Animated Punchlines
   - Interactive CodeTyper & 3D Live Telemetry Cockpit
   ───────────────────────────────────────────────────────────── */
export default function Hero() {
  return <SwarmRebuildHero />;
}

/* ─────────────────────────────────────────────────────────────
   2. SPATIAL HERO SECTION VARIANT (3D Orbital Card Carousel)
   - Monumental Typography with Live Typer
   - 3D Spatial Orbital Card Carousel with pointer parallax
   - Suffix IT Products in light theme
   - Auto-pause on hover, corner spotlight glow, soft depth shadow
   ───────────────────────────────────────────────────────────── */
export function SpatialHero() {
  return <SpatialRebuildHero />;
}

/* ─────────────────────────────────────────────────────────────
   3. VIDEO HERO SECTION (60fps Scroll-Locked Scrub Hero)
   - Dual-video scrub engine with aesthetic bypass (2.42s - 4.70s)
   ───────────────────────────────────────────────────────────── */
export function VideoHero() {
  return (
    <section id="hero-video" className="relative w-full overflow-hidden p-0 m-0" style={{ padding: 0, margin: 0 }}>
      <MetroHero
        videoSrc="/assets/video/hero4.mp4"
        reverseVideoSrc="/assets/video/hero4-reverse.mp4"
        poster="/assets/video/hero4-poster.jpg"
        scrubDistance={1400}
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. EDITORIAL HERO VARIANT (Minimalist Grid & Directional Tiles)
   ───────────────────────────────────────────────────────────── */
export function EditorialHero() {
  return <ModernHero />;
}
