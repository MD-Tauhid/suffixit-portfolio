"use client";

import React, { useEffect, useState, useRef } from "react";
import SectionHeader from "./SectionHeader";
import Icon from "@/components/ui/Icon";

const industries = [
  {
    icon: "store",
    title: "Retail & Distribution",
    desc: "Manage outlets, inventory tracking, orders and field sales teams with real-time mobile sync.",
    tags: ["Field Force", "POS"],
    gradientFrom: "#0284c7",
    gradientTo: "#0072bc",
    href: "#fieldforce",
  },
  {
    icon: "building-2",
    title: "Enterprise",
    desc: "End-to-end HR lifecycle, biometric payroll, automated finance, and multi-branch operations.",
    tags: ["Rupantar HCM", "ERP"],
    gradientFrom: "#8b5cf6",
    gradientTo: "#6366f1",
    href: "#products",
  },
  {
    icon: "hotel",
    title: "Hospitality",
    desc: "Interactive room inventory, online reservations, front-desk check-in, and guest workflows.",
    tags: ["Hotel Booking"],
    gradientFrom: "#f59e0b",
    gradientTo: "#ea580c",
    href: "#products",
  },
  {
    icon: "radio-tower",
    title: "Telecom",
    desc: "Carrier-grade CDR rating engine, interconnect voice & SMS settlements at telco scale.",
    tags: ["Interconnect Billing"],
    gradientFrom: "#06b6d4",
    gradientTo: "#0284c7",
    href: "#products",
  },
  {
    icon: "shopping-bag",
    title: "E-commerce",
    desc: "High-converting online storefront with multi-currency cart, payment gateways & stock sync.",
    tags: ["E-commerce", "Hosting"],
    gradientFrom: "#10b981",
    gradientTo: "#059669",
    href: "#products",
  },
  {
    icon: "coins",
    title: "Finance & HR",
    desc: "Statutory provident fund ledgers, interest accrual, loan approvals and statutory audit ready.",
    tags: ["Suffix PF", "Payroll"],
    gradientFrom: "#3b82f6",
    gradientTo: "#4f46e5",
    href: "#products",
  },
  {
    icon: "megaphone",
    title: "Marketing & Comms",
    desc: "High-throughput transactional SMS gateway paired with WebRTC team conference rooms.",
    tags: ["Bulk SMS", "Web Meeting"],
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
    href: "#products",
  },
  {
    icon: "rocket",
    title: "Startups & SMEs",
    desc: "Rapid MVPs, custom web platforms and mobile apps built to scale with your business traction.",
    tags: ["Custom Software", "Mobile"],
    gradientFrom: "#f97316",
    gradientTo: "#e11d48",
    href: "#services",
  },
];

/* ─────────────────────────────────────────────────────────────
   SHARED CONTENT COMPONENT: Renders Header + 8 Luxury Skewed Cards
   ───────────────────────────────────────────────────────────── */
function IndustriesContent() {
  return (
    <>
      {/* Ambient soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#0072bc]/5 to-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 md:mb-16 text-center max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Industries"
            text="Find the Suffix product that fits the way your industry works."
          >
            Solutions for every <em>kind of business</em>
          </SectionHeader>
        </div>

        {/* ========================================================
            SKEWED GRADIENT GLASS CARD SHOWCASE GRID (LIGHT LUXURY)
           ======================================================== */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 md:py-8 rv-stagger"
          style={{
            rowGap: "clamp(48px, 5.5vw, 68px)",
            columnGap: "clamp(24px, 2.5vw, 36px)",
          }}
        >
          {industries.map((item, index) => (
            <div
              key={item.title}
              className={`group relative w-full min-h-[415px] transition-all duration-500 rv-up stagger-${(index % 4) + 1}`}
            >
              {/* Skewed gradient panel 1 (Sharp Base) */}
              <span
                className="absolute top-0 left-[35px] w-1/2 h-full rounded-2xl transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] pointer-events-none"
                style={{
                  background: `linear-gradient(315deg, ${item.gradientFrom}, ${item.gradientTo})`,
                }}
              />

              {/* Skewed gradient panel 2 (Glowing Atmosphere Blur) */}
              <span
                className="absolute top-0 left-[35px] w-1/2 h-full rounded-2xl transform skew-x-[15deg] blur-[28px] opacity-40 transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] group-hover:opacity-70 pointer-events-none"
                style={{
                  background: `linear-gradient(315deg, ${item.gradientFrom}, ${item.gradientTo})`,
                }}
              />

              {/* Animated Floating Glossy Glass Blobs */}
              <span className="pointer-events-none absolute inset-0 z-10">
                <span className="absolute top-0 left-0 w-0 h-0 rounded-2xl opacity-0 bg-white/85 backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-white transition-all duration-300 animate-blob group-hover:top-[-26px] group-hover:left-[18px] group-hover:w-[65px] group-hover:h-[65px] group-hover:opacity-100" />
                <span className="absolute bottom-0 right-0 w-0 h-0 rounded-2xl opacity-0 bg-white/85 backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-white transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-26px] group-hover:right-[18px] group-hover:w-[65px] group-hover:h-[65px] group-hover:opacity-100" />
              </span>

              {/* Frosted Glass Content Card (Light Luxury) */}
              <div className="relative z-20 h-full p-6 sm:p-7 bg-white/90 backdrop-blur-[16px] border border-white/80 rounded-2xl text-[#17162a] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-500 group-hover:translate-x-[-10px] group-hover:-translate-y-2 group-hover:border-white group-hover:bg-white/95 group-hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.12)]">
                <div>
                  {/* Top: Icon + Tags */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                      }}
                    >
                      <Icon name={item.icon} size={22} />
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f0f6fd] text-[#0072bc] border border-[#d2e4f7]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#17162a] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[#515978] text-sm leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-4 border-t border-[#f0f4f9] flex items-center justify-between">
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0072bc] bg-[#f0f6fd] hover:bg-[#0072bc] hover:text-white px-4 py-2 rounded-xl border border-[#d2e4f7] transition-all duration-300 shadow-sm group-hover:shadow-md"
                  >
                    <span>Explore Solutions</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <span className="text-[11px] text-[#838fa6] font-semibold">Enterprise ready</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Industries() {
  const [expandRatio, setExpandRatio] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [windowH, setWindowH] = useState<number>(900);

  const isAutoSnappingDownRef = useRef<boolean>(false);
  const isAutoSnappingUpRef = useRef<boolean>(false);
  const lastScrollYRef = useRef<number>(0);

  // Click-to-complete handler: if user clicks the expanding card during transition,
  // immediately smoothly zoom to 100% full screen (or collapse back if small)
  const handleCompleteZoom = () => {
    const productsEl = document.getElementById("products");
    if (!productsEl) return;
    const currentWinH = window.innerHeight || 800;
    const scrollableDistance = productsEl.offsetHeight - currentWinH;
    const pRect = productsEl.getBoundingClientRect();
    const containerTop = pRect.top + window.scrollY;

    const targetY =
      expandRatio >= 0.40
        ? containerTop + scrollableDistance
        : containerTop + scrollableDistance * (0.70 - 0.002);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };



  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const productsEl = document.getElementById("products");
        if (!productsEl) {
          rafId = null;
          return;
        }

        const pRect = productsEl.getBoundingClientRect();
        const currentWinH = window.innerHeight || 800;
        setWindowH(currentWinH);

        const scrollableDistance = productsEl.offsetHeight - currentWinH;
        if (scrollableDistance <= 0) {
          rafId = null;
          return;
        }

        const currentScroll = -pRect.top;
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollYRef.current;
        const isScrollingUp = currentScrollY < lastScrollYRef.current;
        lastScrollYRef.current = currentScrollY;

        // Reset the opposing auto-snap trigger if user reverses direction
        if (isScrollingUp) {
          isAutoSnappingDownRef.current = false;
        }
        if (isScrollingDown) {
          isAutoSnappingUpRef.current = false;
        }

        // Unclamped raw scroll progress through Products section
        const rawProgress = currentScroll / scrollableDistance;

        // Start right-side card expansion once Products horizontal scroll finishes (at ~0.70)
        // Expands smoothly until 0.985 where it reaches 100% full screen
        const START_EXPAND = 0.70;
        const END_EXPAND = 0.985;

        if (rawProgress >= START_EXPAND && rawProgress <= END_EXPAND) {
          const ratio = (rawProgress - START_EXPAND) / (END_EXPAND - START_EXPAND);
          const clamped = Math.max(0, Math.min(1, ratio));
          setExpandRatio(clamped);
          setIsTransitioning(true);

          const containerTop = pRect.top + currentScrollY;

          // SMART AUTO-COMPLETION - FORWARD / DOWNWARD (60% Threshold):
          // When zoom reaches >= 60% (clamped >= 0.60) while scrolling down,
          // smoothly auto-glide the remaining distance to 100% full screen so the user doesn't have to keep scrolling!
          if (isScrollingDown && clamped >= 0.60 && clamped < 0.96 && !isAutoSnappingDownRef.current) {
            isAutoSnappingDownRef.current = true;
            isAutoSnappingUpRef.current = false;
            const targetY = containerTop + scrollableDistance;

            window.scrollTo({
              top: targetY,
              behavior: "smooth",
            });
          }

          // SMART AUTO-COMPLETION - REVERSE / UPWARD (60% Shrink / <= 0.58 Threshold):
          // When scrolling up and card shrinks down to <= 60% (clamped <= 0.58),
          // smoothly auto-glide the remaining distance back to Products Card 9!
          if (isScrollingUp && clamped <= 0.58 && clamped > 0.05 && !isAutoSnappingUpRef.current) {
            isAutoSnappingUpRef.current = true;
            isAutoSnappingDownRef.current = false;
            const targetY = containerTop + scrollableDistance * (START_EXPAND - 0.002);

            window.scrollTo({
              top: targetY,
              behavior: "smooth",
            });
          }
        } else if (rawProgress < START_EXPAND) {
          setExpandRatio(0);
          setIsTransitioning(false);
          isAutoSnappingDownRef.current = false;
          isAutoSnappingUpRef.current = false;
        } else {
          // rawProgress > END_EXPAND: expansion completed!
          // Seamlessly hide transition overlay and activate the real, scrollable #industries section
          setExpandRatio(1);
          setIsTransitioning(false);
          isAutoSnappingDownRef.current = false;
          isAutoSnappingUpRef.current = false;
        }

        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Smooth cubic easing curve for organic right-side zoom expansion
  const t = Math.pow(expandRatio, 0.92);

  // Fade-in when appearing (0.0 -> 0.18) and fade-out when shrinking (0.18 -> 0.0)
  // Ensures soft organic emergence from Products Card 9 without any abrupt appearance or disappearance
  const fadeRatio = Math.min(1, Math.max(0, expandRatio / 0.18));
  const cardOpacity = Math.pow(fadeRatio, 1.25);

  // Exact vertical centering matching Our Products track:
  const baseCardH = Math.min(500, Math.max(440, windowH * 0.58));
  const initialTop = Math.max(120, Math.round((windowH - baseCardH) / 2));
  const initialBottom = Math.max(80, windowH - initialTop - baseCardH);

  // Right-side card geometry:
  // Starts docked on the right side at Card 10's position (width ~ 410px, height ~ 480px, rounded-3xl)
  // Sweeps leftward and expands top/bottom to take over the entire display
  const topPx = Math.round((1 - t) * initialTop);
  const bottomPx = Math.round((1 - t) * initialBottom);
  const rightPx = Math.round((1 - t) * 48); // 48px -> 0px
  const leftPct = (1 - t) * 68; // 68% -> 0% (starts width ~ 410px on desktop)
  const radius = Math.round((1 - t) * 24); // 24px (rounded-3xl) down to 0px

  // Multi-layered luxury drop shadow during expansion
  const shadowAlpha = 0.35 * (1 - t);
  const boxShadow =
    t < 0.99
      ? `0 25px 70px -10px rgba(0, 114, 188, ${shadowAlpha}), -15px 0 35px -8px rgba(0, 114, 188, ${0.3 * (1 - t)}), 0 0 0 1.5px rgba(0, 114, 188, ${0.35 * (1 - t)})`
      : "none";

  // Content scale: scales smoothly from card-scale (0.42) to full screen (1.00) together with the card
  const contentScale = 0.42 + 0.58 * t;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. RIGHT-SIDE CARD-TO-VIEWPORT ZOOM EXPANSION PORTAL
          Starts at Card position on the right side
          Grows from the right across the display
          Everything inside (header, cards, images) scales from small to big together
          ───────────────────────────────────────────────────────────── */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-40 overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* Zooming Card: Starts on right side, expands to full display */}
          <div
            onClick={handleCompleteZoom}
            title="Click to expand to full screen"
            className="absolute bg-[#f8fbfe] overflow-hidden will-change-[left,top,bottom,right,opacity] pointer-events-auto cursor-pointer transition-opacity duration-150 ease-out"
            style={{
              left: `${leftPct}%`,
              right: `${rightPx}px`,
              top: `${topPx}px`,
              bottom: `${bottomPx}px`,
              borderRadius: `${radius}px`,
              opacity: cardOpacity,
              boxShadow,
            }}
          >
            {/* Ambient luxury indicator badge when in card form on right */}
            {expandRatio < 0.60 && (
              <div
                className="absolute top-5 left-5 z-50 transition-opacity duration-200 pointer-events-none"
                style={{ opacity: Math.max(0, 1 - expandRatio * 1.7) }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#0072bc]/40 shadow-lg backdrop-blur-md">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0072bc] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#0072bc]" />
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0072bc]">
                    {expandRatio >= 0.35 ? "Auto-expanding to full screen ➔" : "Click or scroll to expand ➔"}
                  </span>
                </div>
              </div>
            )}

            {/* Inner Content: Anchored at right with synchronized zoom expansion from small to big */}
            <div
              className="w-screen h-screen absolute right-0 flex flex-col justify-start"
              style={{
                top: `-${topPx}px`,
                transform: `scale(${contentScale})`,
                transformOrigin: "right 48%",
                willChange: "transform",
              }}
            >
              <div className="py-10 sm:py-12 md:py-14 lg:py-16 relative w-full h-full [&_.rv]:!opacity-100 [&_.rv]:!transform-none [&_.rv-up]:!opacity-100 [&_.rv-up]:!transform-none">
                <IndustriesContent />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. NORMAL IN-FLOW INDUSTRIES SECTION
          Takes over seamlessly once expansion finishes (rawProgress > 0.985)
          Permits natural downward vertical scrolling through all 8 cards
          ───────────────────────────────────────────────────────────── */}
      <section
        id="industries"
        className={`py-10 sm:py-12 md:py-14 lg:py-16 relative z-20 -mt-[100vh] bg-[#f8fbfe] overflow-hidden scroll-mt-20 ${isTransitioning ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <IndustriesContent />
      </section>
    </>
  );
}
