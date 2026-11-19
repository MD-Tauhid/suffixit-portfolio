"use client";

import * as React from "react";
import { CoverFlow } from "@/components/ui/cover-flow";

/** Cover Flow autoplaying through its built-in covers. Drag, scroll or use the arrow keys. */
export default function CoverFlowDemo() {
  return (
    <main className="relative h-screen min-h-[340px] w-full overflow-hidden" style={{ backgroundColor: "#f5f5f5" }}>
      <CoverFlow autoplay style={{ width: "100%", height: "100%" }} />
    </main>
  );
}
