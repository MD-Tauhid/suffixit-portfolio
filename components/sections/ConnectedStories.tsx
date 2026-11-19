"use client";

import React from "react";
import SectionHeader from "./SectionHeader";
import { CalendlyCarousel, type CarouselItem } from "@/components/ui/connected-carousel";
import { SUFFIX_STORIES_DATA } from "@/components/ui/demo";

interface ConnectedStoriesSectionProps {
  items?: CarouselItem[];
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
}

export default function ConnectedStoriesSection({
  items = SUFFIX_STORIES_DATA,
  autoPlayInterval = 6000,
  pauseOnHover = true,
}: ConnectedStoriesSectionProps) {
  return (
    <section id="stories" className="relative py-16 sm:py-20 lg:py-24 bg-[#fafcfe] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[350px] bg-gradient-to-tr from-[#0072bc]/6 via-[#38bdf8]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[300px] bg-gradient-to-tl from-[#7c3aed]/5 via-[#059669]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="CLIENT STORIES"
            text="Real operational impact delivered for enterprise leaders across manufacturing, telecom, retail, and logistics."
          >
            Software that <em>transforms</em> how organizations operate
          </SectionHeader>
        </div>

        {/* Connected Calendly-Style Interactive Carousel */}
        <div className="w-full">
          <CalendlyCarousel
            items={items}
            autoPlayInterval={autoPlayInterval}
            pauseOnHover={pauseOnHover}
          />
        </div>
      </div>
    </section>
  );
}
