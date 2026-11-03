"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface EngagementModel {
  num: string;
  name: string;
  subtitle: string;
  description: string;
  tags?: string[];
  clipId: string;
  image: string;
  accentColor: string;
  href: string;
}

const engagementModels: EngagementModel[] = [
  {
    num: "01",
    name: "Ready-made Products",
    subtitle: "Turnkey Enterprise Platforms",
    description: "License proven solutions like Field Force (FFMS), Rupantar HCM and ERP to go live immediately with zero R&D delays.",
    tags: ["Field Force", "Rupantar ERP", "Smart POS"],
    clipId: "clip-original",
    image: "/assets/models/products.jpg",
    accentColor: "#0068B5",
    href: "#products",
  },
  {
    num: "02",
    name: "Custom Development",
    subtitle: "Tailored Web, Mobile & Cloud",
    description: "Architecting bespoke digital platforms, mission-critical portals, and mobile apps engineered around your exact operational workflows.",
    tags: ["Web Platforms", "Mobile Apps", "Custom APIs"],
    clipId: "clip-hexagons",
    image: "/assets/models/custom.jpg",
    accentColor: "#0068B5",
    href: "#services",
  },
  {
    num: "03",
    name: "Dedicated Team",
    subtitle: "Senior Engineering Squads",
    description: "Extend your engineering capacity with dedicated Suffix software developers, UI/UX designers, and QA specialists working as your in-house team.",
    tags: ["Full-Stack Devs", "UI/UX Designers", "QA Specialists"],
    clipId: "clip-pixels",
    image: "/assets/models/team.jpg",
    accentColor: "#0068B5",
    href: "#contact",
  },
  {
    num: "04",
    name: "Hosting & Support",
    subtitle: "24/7 Cloud Operations & SLA",
    description: "Enterprise AWS cloud hosting, automated disaster recovery backups, security hardening, and proactive round-the-clock maintenance handled for you.",
    tags: ["Cloud Infra", "Automated Backups", "24/7 SLA"],
    clipId: "clip-quad",
    image: "/assets/models/hosting.jpg",
    accentColor: "#0068B5",
    href: "#contact",
  },
];

export default function Models() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to '02 Custom Development'
  const trackRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  // SVG Shapes Morph Loop
  const createLoop = (index: number) => {
    const item = engagementModels[index];
    if (!item) return;
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();

    if (imageRef.current) imageRef.current.setAttribute("href", item.image);
    if (mainGroupRef.current) mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);

    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // 1. IN
    tl.to(selector, {
      scale: 1,
      duration: 0.85,
      stagger: { amount: 0.35, from: "random" },
      ease: "expo.out",
    })
      // 2. IDLE
      .to(selector, {
        scale: 1.04,
        duration: 1.6,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        stagger: { amount: 0.2, from: "center" },
      })
      // 3. OUT
      .to(selector, {
        scale: 0,
        duration: 0.55,
        stagger: { amount: 0.25, from: "edges" },
        ease: "expo.in",
      });

    masterTl.current = tl;
  };

  const handleItemClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(1);

      // Check if mobile (< 768px)
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (portalRef.current) {
          portalRef.current.style.clipPath = "circle(150% at 50% 50%)";
        }
        if (contentRef.current) {
          contentRef.current.style.transform = "scale(1)";
        }
        return;
      }

      // Initial state for desktop circular portal reveal
      gsap.set(portalRef.current, { clipPath: "circle(10% at 50% 92%)" });
      gsap.set(contentRef.current, { scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          pin: false, // Prevents scroll sticking & DOM wrapper bugs
        },
      });

      // Step 1 (0% to 45%): Expand portal to 45%
      tl.to(portalRef.current, {
        clipPath: "circle(45% at 50% 52%)",
        ease: "power1.inOut",
        duration: 0.45,
      })
        // Step 2 (45% to 100%): Full circular burst to 150% and scale to 1
        .to(
          portalRef.current,
          {
            clipPath: "circle(150% at 50% 50%)",
            ease: "power2.out",
            duration: 0.55,
          },
          ">"
        )
        .to(
          contentRef.current,
          {
            scale: 1,
            ease: "power2.out",
            duration: 0.55,
          },
          "<"
        );
    }, trackRef);

    return () => {
      if (masterTl.current) masterTl.current.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section id="models" ref={trackRef} className="relative w-full md:h-[175vh] p-0 bg-[#6584a3]">
      {/* Sticky Viewport Stage (Native CSS sticky - No GSAP pin) */}
      <div
        className="relative md:sticky md:top-0 h-auto md:h-dvh w-full overflow-hidden flex items-center justify-center py-2 md:py-0"
        style={{
          background: "radial-gradient(circle at 50% 80%, #0068B5 0%, #03152E 100%)",
        }}
      >
        {/* Circular Reveal Layer */}
        <div
          ref={portalRef}
          className="relative z-10 w-full h-full flex items-center justify-center bg-[#e2edf7] will-change-[clip-path]"
        >
          {/* Inner Content Container - Viewport Fitted, Balanced & Slightly More Spacious */}
          <div
            ref={contentRef}
            className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6 flex flex-col justify-center h-full max-h-[890px]"
          >
            {/* Compact Section Header */}
            <div className="mb-6 lg:mb-7 text-center shrink-0">
              <span className="text-xs font-bold tracking-[0.16em] text-[#0068B5] uppercase mb-1.5 block">
                WAYS TO WORK WITH US
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-black text-slate-900 tracking-tight">
                Four models, <span className="font-serif italic font-normal text-[#0068B5]">one</span> trusted partner
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
                Pick the engagement that matches your stage and budget.
              </p>
            </div>

            {/* 2-Column Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Left Column: 4 Suffix IT Engagement Cards */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                {engagementModels.map((item, index) => {
                  const isActive = activeIndex === index;

                  if (isActive) {
                    return (
                      <div
                        key={item.num}
                        onClick={() => handleItemClick(index)}
                        className="py-4 px-5 rounded-2xl bg-white border-l-4 border-l-[#0068B5] border border-slate-200/90 shadow-[0_10px_30px_rgba(0,104,181,0.08)] transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-xl font-black text-[#0068B5] mt-0.5 shrink-0">
                            {item.num}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                                {item.name}
                              </h3>
                              <span className="text-[11px] tracking-wider uppercase font-bold text-[#0068B5] shrink-0">
                                {item.subtitle}
                              </span>
                            </div>
                            <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                              {item.description}
                            </p>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2.5">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Inactive Card
                  return (
                    <div
                      key={item.num}
                      onClick={() => handleItemClick(index)}
                      onMouseEnter={() => handleItemClick(index)}
                      className="py-3 sm:py-3.5 px-5 rounded-2xl bg-white/85 border border-slate-200/80 transition-all cursor-pointer hover:bg-white hover:border-[#0068B5]/40 hover:shadow-xs"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-slate-400 shrink-0">
                          {item.num}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                              {item.name}
                            </h3>
                            <span className="text-[11px] tracking-wider uppercase font-semibold text-slate-400 shrink-0">
                              {item.subtitle}
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: 3D Isometric Illustration Wrapper */}
              <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
                <div className="relative max-h-[360px] xl:max-h-[410px] w-full max-w-[410px] aspect-square flex items-center justify-center">
                  {/* Dynamic Ambient Glow */}
                  <div
                    className="absolute w-[85%] h-[85%] blur-3xl rounded-full pointer-events-none transition-all duration-700 opacity-30"
                    style={{
                      background: "radial-gradient(circle, #0068B5 0%, transparent 70%)",
                    }}
                  />

                  <svg
                    viewBox="0 0 500 500"
                    className="w-full h-full object-contain z-10 drop-shadow-[0_20px_35px_rgba(0,104,181,0.14)]"
                  >
                    <defs>
                      {/* Shape 01: Modern SaaS Dashboard Window (Ready-made Products) */}
                      <clipPath id="clip-original">
                        <rect className="path" x="25" y="25" width="450" height="65" rx="16" />
                        <rect className="path" x="25" y="105" width="285" height="245" rx="18" />
                        <rect className="path" x="325" y="105" width="150" height="115" rx="16" />
                        <rect className="path" x="325" y="235" width="150" height="115" rx="16" />
                        <rect className="path" x="25" y="365" width="450" height="110" rx="18" />
                      </clipPath>

                      {/* Shape 02: Bento Grid Architecture (Custom Development) */}
                      <clipPath id="clip-hexagons">
                        <rect className="path" x="25" y="25" width="215" height="265" rx="20" />
                        <rect className="path" x="255" y="25" width="220" height="125" rx="18" />
                        <rect className="path" x="255" y="165" width="102" height="160" rx="16" />
                        <rect className="path" x="372" y="165" width="103" height="160" rx="16" />
                        <rect className="path" x="25" y="305" width="215" height="170" rx="20" />
                        <rect className="path" x="255" y="340" width="220" height="135" rx="18" />
                      </clipPath>

                      {/* Shape 03: 3x3 Microservices & Squad Matrix (Dedicated Team) */}
                      <clipPath id="clip-pixels">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <rect
                            key={i}
                            className="path"
                            x={(i % 3) * 155 + 25}
                            y={Math.floor(i / 3) * 155 + 25}
                            width="140"
                            height="140"
                            rx="22"
                          />
                        ))}
                      </clipPath>

                      {/* Shape 04: Cloud Infrastructure Quadrants & Core Hub (Hosting & Support) */}
                      <clipPath id="clip-quad">
                        <rect className="path" x="25" y="25" width="215" height="215" rx="30" />
                        <rect className="path" x="260" y="25" width="215" height="215" rx="30" />
                        <rect className="path" x="25" y="260" width="215" height="215" rx="30" />
                        <rect className="path" x="260" y="260" width="215" height="215" rx="30" />
                        <rect className="path" x="215" y="215" width="70" height="70" rx="20" />
                      </clipPath>
                    </defs>

                    <g ref={mainGroupRef} clipPath={`url(#${engagementModels[activeIndex]?.clipId || "clip-hexagons"})`}>
                      <image
                        ref={imageRef}
                        href={engagementModels[activeIndex]?.image}
                        width="500"
                        height="500"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
