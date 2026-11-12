"use client";

import * as React from "react";
import { AssistantWall } from "@/components/ui/assistant-wall";
import { GlassReveal21st, SuffixGlassReveal } from "@/components/ui/liquid-glass-logo-reveal";

/** Assistant Wall filling the preview. */
export function AssistantWallDemo() {
  return (
    <main className="relative h-screen min-h-[340px] w-full overflow-hidden" style={{ backgroundColor: "#0d062d" }}>
      <AssistantWall style={{ width: "100%", height: "100%" }} />
    </main>
  );
}

export function GlassReveal21stDemo() {
  return <GlassReveal21st className="h-svh min-h-[420px] w-full" />;
}

export function SuffixGlassRevealDemo() {
  return <SuffixGlassReveal className="h-svh min-h-[420px] w-full" />;
}

export default AssistantWallDemo;
