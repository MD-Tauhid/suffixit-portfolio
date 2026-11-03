"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
  badge?: string;
  ctaText?: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};

    // Dynamic fr weight based on item count for optimal balance
    const activeWeight = items.length >= 8 ? (isDesktop ? "3.8fr" : "3.5fr") : "4.5fr";

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? activeWeight : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? activeWeight : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-7xl gap-2 sm:gap-2.5",
        "grid",
        items.length >= 8 ? "h-[780px] md:h-[560px] lg:h-[580px]" : "h-[620px] md:h-[520px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <li
            key={item.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-[#070e1c] text-card-foreground shadow-lg transition-all duration-500",
              "md:min-w-[58px] lg:min-w-[68px]",
              "min-h-0 min-w-0 select-none",
              isActive
                ? "ring-2 ring-[#0072bc] shadow-[0_20px_50px_rgba(0,114,188,0.35)]"
                : "hover:border-white/60 hover:shadow-xl"
            )}
            onMouseEnter={() => handleInteraction(index)}
            onFocus={() => handleInteraction(index)}
            onClick={() => handleInteraction(index)}
            tabIndex={0}
            data-active={isActive}
          >
            {/* Background Image with adaptive brightness */}
            <img
              src={item.imgSrc}
              alt={item.title}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
                isActive
                  ? "scale-105 filter-none brightness-90"
                  : "scale-115 grayscale contrast-125 brightness-45 group-hover:brightness-60"
              )}
            />

            {/* High-Contrast Gradient Scrim Overlays */}
            {/* 1. Base Dark Wash */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500 pointer-events-none",
                isActive
                  ? "bg-gradient-to-t from-black/85 via-black/40 to-transparent"
                  : "bg-black/65 group-hover:bg-black/50"
              )}
            />

            {/* 2. Side vignette for active card readability */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent transition-opacity duration-500 pointer-events-none",
                isActive ? "opacity-100" : "opacity-0"
              )}
            />

            {/* =========================================================
                DESKTOP INACTIVE COLLAPSED CARD: PROMINENT VERTICAL TITLE
                (Reads top-to-bottom with 100% crisp contrast & icon)
               ========================================================= */}
            <div
              className={cn(
                "absolute inset-0 hidden md:flex flex-col items-center justify-between py-6 px-1 pointer-events-none transition-all duration-300",
                isActive ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
              )}
            >
              {/* Top Icon Badge in Frosted Glass */}
              <div className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-md shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#0072bc]">
                {item.icon}
              </div>

              {/* TALL, BOLD VERTICAL TITLE (Writing-mode top to bottom) */}
              <div className="flex-1 flex items-center justify-center overflow-hidden my-4 py-2">
                <span
                  className="inline-block text-white font-black tracking-[0.24em] text-sm lg:text-[15px] xl:text-base uppercase whitespace-nowrap select-none drop-shadow-[0_2px_12px_rgba(0,0,0,1)] transition-all duration-300 group-hover:text-[#38bdf8] group-hover:scale-105"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {item.title}
                </span>
              </div>

              {/* Bottom Index Badge */}
              <div className="w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-[11px] font-mono font-extrabold text-white/90 shrink-0">
                0{index + 1}
              </div>
            </div>

            {/* =========================================================
                MOBILE INACTIVE HORIZONTAL HEADER
               ========================================================= */}
            <div
              className={cn(
                "absolute inset-0 md:hidden flex items-center justify-between px-4 pointer-events-none transition-opacity duration-300",
                isActive ? "opacity-0" : "opacity-100"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[10px] font-mono font-bold text-white/90">
                  {index + 1}
                </span>
                <span className="text-sm font-extrabold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                  {item.title}
                </span>
              </div>
              <span className="text-white/80 shrink-0">{item.icon}</span>
            </div>

            {/* =========================================================
                ACTIVE EXPANDED CONTENT ARTICLE (High-Legibility Glassmorphism Panel)
               ========================================================= */}
            <article
              className={cn(
                "absolute inset-0 flex flex-col justify-end p-3 sm:p-5 lg:p-6 transition-all duration-500 z-20",
                isActive
                  ? "opacity-100 pointer-events-auto translate-y-0"
                  : "opacity-0 pointer-events-none translate-y-4"
              )}
            >
              {/* Refined Glassmorphism Panel with High-Contrast Opacity */}
              <div
                className="mt-auto w-full rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col gap-3"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8, 14, 28, 0.88) 0%, rgba(4, 9, 20, 0.96) 100%)",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  boxShadow:
                    "0 20px 50px -10px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.22)",
                }}
              >
                {/* Active Icon & Category Badge */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-md shrink-0">
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full bg-[#0072bc] text-white border border-[#38bdf8]/40 shadow-sm tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Main Title */}
                <h3 className="text-white font-extrabold text-2xl lg:text-3xl tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {item.title}
                </h3>

                {/* Description - Ultra Crisp & Readable */}
                <p className="text-slate-100 text-xs sm:text-sm leading-relaxed font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-3">
                  {item.description}
                </p>

                {/* Action Button */}
                <div className="pt-1">
                  <a
                    href={item.linkHref || "#contact"}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-[#0072bc] hover:text-white transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>{item.ctaText || "Explore Service"}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
