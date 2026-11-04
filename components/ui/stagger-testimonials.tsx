"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export const testimonials = [
  {
    tempId: 0,
    testimonial: "My favorite solution in the market. We work 5x faster with Suffix IT.",
    by: "Alex, CEO at TechCorp",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 1,
    testimonial: "I'm confident our enterprise telemetry is safe with Suffix IT. Zero data discrepancies.",
    by: "Dan, CTO at SecureNet",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 2,
    testimonial: "The field sales app transformed our operations. Transparent order tracking across all regions.",
    by: "Stephanie, COO at InnovateCo",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 3,
    testimonial: "Suffix IT's ERP modules make financial planning seamless. Can't recommend them enough!",
    by: "Marie, CFO at FuturePlanning",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12. Their Dhaka engineering team is exceptionally proactive.",
    by: "Andre, Head of Engineering at Apex Systems",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 5,
    testimonial: "Transitioning to Rupantar HCM streamlined our factory payroll of 3,500+ staff effortlessly.",
    by: "Jeremy, Product Manager at TimeWise",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're on Suffix IT, we're never going back.",
    by: "Pam, Operations Director at BrandBuilders",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 7,
    testimonial: "I would be lost without Suffix IT's real-time analytics. The operational ROI is easily 100X.",
    by: "Daniel, Data Architect at AnalyticsPro",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 8,
    testimonial: "Their architectural leadership delivered our custom modules ahead of schedule. Truly the best.",
    by: "Fernando, Lead Architect at UserFirst",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 9,
    testimonial: "We switched 5 years ago and never looked back. 99.9% uptime quarter after quarter.",
    by: "Andy, DevOps Engineer at CloudMasters",
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 10,
    testimonial: "I've been searching for an enterprise partner like Suffix IT for YEARS. Outstanding work!",
    by: "Pete, Sales Director at RevenueRockets",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 11,
    testimonial: "It's so simple and intuitive, our field agents got up to speed on FFMS in 10 minutes flat.",
    by: "Marina, HR Lead at TalentForge",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 12,
    testimonial: "Suffix IT's 24/7 SLA and customer support is unparalleled. Always standing by whenever we deploy.",
    by: "Olivia, Customer Success Director at ClientCare",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 13,
    testimonial: "The efficiency gains across our distribution network since implementing Suffix IT are off the charts!",
    by: "Raj, Supply Chain Head at Streamline",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 14,
    testimonial: "Suffix IT revolutionized how we handle automated billing and ticketing. It's a game-changer!",
    by: "Lila, Workflow Specialist at ProcessPro",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 15,
    testimonial: "The scalability of their microservice architecture grows with our business seamlessly.",
    by: "Trevor, Growth Director at GrowthGurus",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 16,
    testimonial: "Continuous innovation and proactive feature releases keep us one step ahead of the curve.",
    by: "Naomi, Tech Lead at FutureTech",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 17,
    testimonial: "The ROI we've seen with Suffix IT is incredible. It has paid for itself multiple times over.",
    by: "Victor, Financial Controller at ProfitPeak",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 18,
    testimonial: "Their platform is robust, secure, and user-friendly. The perfect balance for enterprise.",
    by: "Yuki, VP Product at BalancedTech",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
  },
  {
    tempId: 19,
    testimonial: "We've evaluated many tech partners, but Suffix IT stands far ahead in engineering quality.",
    by: "Zoe, Managing Director at ReliableSystems",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardWidth: number;
  cardHeight: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardWidth,
  cardHeight,
}) => {
  const isCenter = position === 0;
  const absPos = Math.abs(position);

  // If card is too far from center, don't render to prevent clutter
  if (absPos > 4) return null;

  // Split "Name, Role at Company"
  const commaIdx = testimonial.by.indexOf(",");
  const authorName = commaIdx !== -1 ? testimonial.by.slice(0, commaIdx).trim() : testimonial.by;
  const authorRole = commaIdx !== -1 ? testimonial.by.slice(commaIdx + 1).trim() : "";

  // Dynamic Z-Index: Center is top, then immediate neighbors, then farther
  const zIndex = isCenter ? 30 : Math.max(1, 20 - absPos);

  // Smooth scale and opacity gradient
  const scale = isCenter ? 1.05 : Math.max(0.82, 1 - absPos * 0.07);
  const opacity = absPos > 3 ? 0 : absPos === 3 ? 0.35 : absPos === 2 ? 0.75 : 1;

  return (
    <div
      onClick={() => handleMove(position)}
      className="absolute left-1/2 top-1/2 cursor-pointer p-6 sm:p-8 transition-all duration-500 ease-out select-none rounded-[24px] sm:rounded-[28px] overflow-hidden"
      style={{
        width: cardWidth,
        height: cardHeight,
        zIndex,
        opacity,
        // Guaranteed inline background styling: Vibrant Royal Blue Gradient when focused, clean white when side
        background: isCenter
          ? "linear-gradient(145deg, #0068B5 0%, #005294 50%, #003666 100%)"
          : "#ffffff",
        backgroundColor: isCenter ? "#0068B5" : "#ffffff",
        color: isCenter ? "#ffffff" : "#0f172a",
        border: isCenter
          ? "2px solid rgba(255, 255, 255, 0.4)"
          : "2px solid #e2e8f0",
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardWidth * 0.75) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 14 : -10}px)
          scale(${scale})
          rotate(${isCenter ? 0 : position > 0 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0 25px 50px -10px rgba(0, 104, 181, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.25) inset"
          : "0 10px 30px -8px rgba(15, 23, 42, 0.08)",
      }}
    >
      {/* Center card ambient top light glare overlay */}
      {isCenter && (
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full blur-2xl"
          style={{ background: "rgba(255, 255, 255, 0.15)" }}
        />
      )}

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Top Row: 5 Gold Stars & Quote Icon */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  style={{
                    fill: isCenter ? "#fbbf24" : "#f59e0b",
                    color: isCenter ? "#fbbf24" : "#f59e0b",
                  }}
                  className="h-4 w-4"
                />
              ))}
            </div>
            <Quote
              style={{
                color: isCenter ? "rgba(255, 255, 255, 0.45)" : "#0068B5",
                opacity: 0.85,
              }}
              className="h-7 w-7"
            />
          </div>

          {/* Review Quote Body - High Contrast, Sharp & Elegant Typography */}
          <p
            style={{
              color: isCenter ? "#ffffff" : "#1e293b",
            }}
            className="text-[15px] sm:text-[17px] font-semibold leading-relaxed tracking-normal line-clamp-4"
          >
            "{testimonial.testimonial}"
          </p>
        </div>

        {/* Bottom Row: Client Avatar, Name & Role */}
        <div
          style={{
            borderColor: isCenter ? "rgba(255, 255, 255, 0.2)" : "#f1f5f9",
          }}
          className="flex items-center gap-3.5 pt-4 mt-auto border-t"
        >
          <img
            src={testimonial.imgSrc}
            alt={authorName}
            style={{
              boxShadow: isCenter
                ? "0 0 0 2px rgba(255, 255, 255, 0.7), 0 4px 10px rgba(0, 0, 0, 0.25)"
                : "0 0 0 2px rgba(0, 104, 181, 0.3), 0 2px 6px rgba(0, 0, 0, 0.08)",
            }}
            className="h-12 w-12 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4
              style={{
                color: isCenter ? "#ffffff" : "#0f172a",
              }}
              className="text-sm sm:text-base font-bold truncate tracking-tight"
            >
              {authorName}
            </h4>
            {authorRole && (
              <p
                style={{
                  color: isCenter ? "#bae6fd" : "#0068B5",
                }}
                className="text-xs sm:text-[13px] font-medium truncate mt-0.5"
              >
                {authorRole}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 380, height: 340 });
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = useCallback((steps: number) => {
    setTestimonialsList((prevList) => {
      const newList = [...prevList];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prevList;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prevList;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  }, []);

  // Auto-play: Slide to the next testimonial every 2.5 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      handleMove(1);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered, handleMove]);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setDimensions(
        matches ? { width: 380, height: 340 } : { width: 300, height: 305 }
      );
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className="relative w-full overflow-hidden bg-gradient-to-b from-sky-50/40 via-white/60 to-sky-50/40 py-6"
      style={{ height: 580 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardWidth={dimensions.width}
            cardHeight={dimensions.height}
          />
        );
      })}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-40">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center transition-all cursor-pointer shadow-md rounded-full",
            "bg-white border border-slate-200 text-slate-700 hover:bg-[#0068B5] hover:text-white hover:border-[#0068B5] active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068B5] focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center transition-all cursor-pointer shadow-md rounded-full",
            "bg-white border border-slate-200 text-slate-700 hover:bg-[#0068B5] hover:text-white hover:border-[#0068B5] active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068B5] focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export function StaggerTestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F6FC] to-[#F8FAFC]"
    >
      {/* Background Giant Watermark Outlined Text "SUFFIX IT" */}
      <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center overflow-hidden opacity-90 select-none z-0">
        <span
          className="text-[80px] sm:text-[120px] lg:text-[160px] font-black tracking-tighter text-transparent leading-none"
          style={{
            WebkitTextStroke: "1.5px rgba(0, 104, 181, 0.12)",
          }}
        >
          SUFFIX IT
        </span>
      </div>

      {/* Centered Section Header Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center rv-zoom">
        <div className="inline-flex items-center gap-1 rounded-full border border-sky-200/90 bg-sky-50/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#0068B5] shadow-xs backdrop-blur-sm mb-3.5">
          <span>Client Testimonials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-tight">
          Trusted by{" "}
          <span className="text-[#0068B5] font-serif italic font-normal">
            market leaders
          </span>{" "}
          across Bangladesh
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-normal">
          Hear how enterprise directors, CTOs, and operational leaders
          accelerate their digital infrastructure with Suffix IT.
        </p>
      </div>

      {/* Stagger Testimonials Interactive Carousel */}
      <div className="relative z-10 w-full">
        <StaggerTestimonials />
      </div>
    </section>
  );
}

export default StaggerTestimonials;
