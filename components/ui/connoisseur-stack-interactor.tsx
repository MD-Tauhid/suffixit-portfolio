'use client';

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface MenuItem {
  num: string;
  name: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  clipId: string;
  image: string;
  accentColor?: string;
  href?: string;
}

const defaultItems: MenuItem[] = [
  {
    num: "01",
    name: "Ready-made Products",
    subtitle: "Turnkey Enterprise Platforms",
    description: "License proven solutions like Field Force (FFMS), Rupantar HCM and ERP to go live immediately with zero R&D delays.",
    tags: ["Field Force", "Rupantar ERP", "Smart POS"],
    clipId: "clip-original", // Modular SaaS Dashboard Grid
    image: "/assets/models/products.jpg",
    accentColor: "#0072bc",
    href: "#products",
  },
  {
    num: "02",
    name: "Custom Development",
    subtitle: "Tailored Web, Mobile & Cloud",
    description: "Architecting bespoke digital platforms, mission-critical portals, and mobile apps engineered around your exact operational workflows.",
    tags: ["Web Platforms", "Mobile Apps", "Custom APIs"],
    clipId: "clip-hexagons", // Bento Architecture Grid
    image: "/assets/models/custom.jpg",
    accentColor: "#7c3aed",
    href: "#services",
  },
  {
    num: "03",
    name: "Dedicated Team",
    subtitle: "Senior Engineering Squads",
    description: "Extend your engineering capacity with dedicated Suffix software developers, UI/UX designers, and QA specialists working as your in-house team.",
    tags: ["Full-Stack Devs", "UI/UX Designers", "QA Specialists"],
    clipId: "clip-pixels", // 3x3 Squad Matrix
    image: "/assets/models/team.jpg",
    accentColor: "#0d9488",
    href: "#contact",
  },
  {
    num: "04",
    name: "Hosting & Support",
    subtitle: "24/7 Cloud Operations & SLA",
    description: "Enterprise AWS cloud hosting, automated disaster recovery backups, security hardening, and proactive round-the-clock maintenance handled for you.",
    tags: ["Cloud Infra", "Automated Backups", "24/7 SLA"],
    clipId: "clip-quad", // Cloud Server Quadrants
    image: "/assets/models/hosting.jpg",
    accentColor: "#d97706",
    href: "#contact",
  },
];

export const ConnoisseurStackInteractor = ({
  items = defaultItems,
  className,
}: {
  items?: MenuItem[];
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const activeItem = items[activeIndex] || items[0];
  const activeAccent = activeItem?.accentColor || "#0072bc";

  const createLoop = (index: number) => {
    const item = items[index];
    if (!item) return;
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();

    if (imageRef.current) imageRef.current.setAttribute("href", item.image);
    if (mainGroupRef.current) mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);

    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // 1. IN (Springy Expo Out)
    tl.to(selector, {
      scale: 1,
      duration: 0.85,
      stagger: { amount: 0.35, from: "random" },
      ease: "expo.out",
    })
      // 2. IDLE (Subtle Breathing Pulse)
      .to(selector, {
        scale: 1.04,
        duration: 1.6,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        stagger: { amount: 0.2, from: "center" },
      })
      // 3. OUT (Clean Expo In)
      .to(selector, {
        scale: 0,
        duration: 0.55,
        stagger: { amount: 0.25, from: "edges" },
        ease: "expo.in",
      });

    masterTl.current = tl;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(0);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col lg:flex-row items-center justify-between w-full py-6 md:py-12 gap-8 md:gap-14 overflow-visible",
        className
      )}
    >
      {/* LEFT SIDE: INTERACTIVE ENGAGEMENT MENU CARDS */}
      <div className="z-20 w-full lg:w-[52%]">
        <nav>
          <ul className="flex flex-col gap-4 md:gap-4.5">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              const accent = item.accentColor || "#0072bc";

              return (
                <li
                  key={item.num}
                  onMouseEnter={() => handleItemHover(index)}
                  onClick={() => handleItemHover(index)}
                  className={cn(
                    "group cursor-pointer p-4.5 sm:p-5 md:p-5.5 rounded-2xl transition-all duration-300 border relative overflow-hidden",
                    isActive
                      ? "bg-white/95 shadow-[0_16px_40px_-12px_rgba(0,60,140,0.12)] border-white translate-x-2"
                      : "bg-white/50 border-white/60 hover:bg-white/80 hover:translate-x-1"
                  )}
                  style={{
                    boxShadow: isActive
                      ? `0 16px 40px -12px ${accent}25, 0 2px 8px rgba(0,0,0,0.02)`
                      : undefined,
                  }}
                >
                  {/* Left accent indicator strip on active card */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl"
                      style={{ backgroundColor: accent }}
                    />
                  )}

                  <div className="flex items-start gap-4 sm:gap-5 pl-1">
                    {/* Number Badge */}
                    <span
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight transition-all duration-300 mt-0.5"
                      style={{
                        color: isActive ? accent : "#9aa5b8",
                        transform: isActive ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      {item.num}
                    </span>

                    {/* Content */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3
                            className={cn(
                              "text-xl sm:text-2xl font-extrabold tracking-tight transition-colors duration-300",
                              isActive
                                ? "text-[#17162a]"
                                : "text-[#47516b] group-hover:text-[#17162a]"
                            )}
                          >
                            {item.name}
                          </h3>
                          {item.subtitle && (
                            <span
                              className="text-xs font-semibold uppercase tracking-wider block mt-0.5"
                              style={{ color: isActive ? accent : "#838fa6" }}
                            >
                              {item.subtitle}
                            </span>
                          )}
                        </div>

                        {item.href && (
                          <a
                            href={item.href}
                            className={cn(
                              "text-xs sm:text-sm font-bold items-center gap-1.5 transition-all hidden sm:inline-flex px-3 py-1.5 rounded-full border shadow-sm flex-shrink-0",
                              isActive
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2 pointer-events-none"
                            )}
                            style={{
                              color: accent,
                              backgroundColor: `${accent}12`,
                              borderColor: `${accent}30`,
                            }}
                          >
                            Explore →
                          </a>
                        )}
                      </div>

                      {item.description && (
                        <p
                          className={cn(
                            "text-sm mt-2 transition-all duration-300 leading-relaxed font-normal",
                            isActive
                              ? "text-[#515978] opacity-100 max-h-24"
                              : "text-[#7a869e] opacity-80 line-clamp-1 group-hover:opacity-100"
                          )}
                        >
                          {item.description}
                        </p>
                      )}

                      {/* Pill Tags */}
                      {isActive && item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-2.5 border-t border-[#edf2f8]">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#f4f7fb] text-[#47516b] border border-[#e2eaf4]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* RIGHT SIDE: GSAP ANIMATED IT-SPECIFIC SVG SHAPES SHOWCASE */}
      <div className="relative w-full lg:w-[48%] flex justify-center items-center">
        {/* Dynamic Ambient Glow matching the active model's accent color */}
        <div
          className="absolute w-[85%] h-[85%] blur-3xl rounded-full pointer-events-none transition-all duration-700 opacity-40"
          style={{
            background: `radial-gradient(circle, ${activeAccent}50 0%, transparent 70%)`,
          }}
        />

        <svg
          viewBox="0 0 500 500"
          className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[490px] h-auto z-10 drop-shadow-[0_24px_45px_rgba(0,50,120,0.16)]"
        >
          <defs>
            {/* Shape 01: Modern SaaS Dashboard Window (Ready-made Products) - Replaced old burger shape */}
            <clipPath id="clip-original">
              {/* App Navbar Header */}
              <rect className="path" x="25" y="25" width="450" height="65" rx="16" />
              {/* Main App Viewport */}
              <rect className="path" x="25" y="105" width="285" height="245" rx="18" />
              {/* Right Top KPI Card */}
              <rect className="path" x="325" y="105" width="150" height="115" rx="16" />
              {/* Right Bottom Analytics Card */}
              <rect className="path" x="325" y="235" width="150" height="115" rx="16" />
              {/* Bottom Data & Action Ribbon */}
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

            {/* Shape 04: Cloud Infrastructure Quadrants & Core Hub (Managed Hosting & Support) */}
            <clipPath id="clip-quad">
              <rect className="path" x="25" y="25" width="215" height="215" rx="30" />
              <rect className="path" x="260" y="25" width="215" height="215" rx="30" />
              <rect className="path" x="25" y="260" width="215" height="215" rx="30" />
              <rect className="path" x="260" y="260" width="215" height="215" rx="30" />
              <rect className="path" x="215" y="215" width="70" height="70" rx="20" />
            </clipPath>
          </defs>

          <g ref={mainGroupRef} clipPath={`url(#${items[0]?.clipId || "clip-original"})`}>
            <image
              ref={imageRef}
              href={items[0]?.image}
              width="500"
              height="500"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export const Component = ConnoisseurStackInteractor;
export default ConnoisseurStackInteractor;
