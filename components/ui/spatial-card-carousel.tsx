"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(" ");
}

export interface SpatialCardItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  renderContent?: () => React.ReactNode;
}

export type SpatialCarouselTheme = "auto" | "light" | "dark";

export interface SpatialCardCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items?: SpatialCardItem[];
  theme?: SpatialCarouselTheme;
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  paused?: boolean;
  enableWheel?: boolean;
  initialIndex?: number;
  onActiveChange?: (index: number, item: SpatialCardItem) => void;
  onCardClick?: (item: SpatialCardItem, index: number) => void;
  ariaLabel?: string;
}

interface OrbitalSlot {
  xPct: number;
  yPct: number;
  zPx: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  opacity: number;
  zIndex: number;
  blur: number;
}

const ORBITAL_SLOTS: OrbitalSlot[] = [
  // Slot 0: Hero focal center (z: 0 for razor-sharp 1:1 rendering)
  {
    xPct: 0,
    yPct: 0,
    zPx: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    opacity: 1,
    zIndex: 40,
    blur: 0,
  },
  // Slot 1: Upper-left mid-ground
  {
    xPct: -68,
    yPct: -42,
    zPx: -80,
    scale: 0.42,
    rotateX: 7,
    rotateY: 15,
    rotateZ: -4,
    opacity: 0.94,
    zIndex: 24,
    blur: 0,
  },
  // Slot 2: Lower-left satellite
  {
    xPct: -60,
    yPct: 46,
    zPx: -60,
    scale: 0.44,
    rotateX: -6,
    rotateY: 13,
    rotateZ: 4,
    opacity: 0.96,
    zIndex: 28,
    blur: 0,
  },
  // Slot 3: Mid-right satellite
  {
    xPct: 74,
    yPct: 8,
    zPx: -95,
    scale: 0.42,
    rotateX: 4,
    rotateY: -16,
    rotateZ: 3,
    opacity: 0.92,
    zIndex: 22,
    blur: 0,
  },
  // Slot 4: Upper-right satellite
  {
    xPct: 68,
    yPct: -44,
    zPx: -140,
    scale: 0.36,
    rotateX: 9,
    rotateY: -14,
    rotateZ: 5,
    opacity: 0.88,
    zIndex: 18,
    blur: 0.25,
  },
  // Slot 5: Far-left middle
  {
    xPct: -82,
    yPct: 6,
    zPx: -180,
    scale: 0.34,
    rotateX: -5,
    rotateY: 20,
    rotateZ: -5,
    opacity: 0.82,
    zIndex: 14,
    blur: 0.4,
  },
  // Slot 6: Lower-right satellite
  {
    xPct: 60,
    yPct: 48,
    zPx: -115,
    scale: 0.38,
    rotateX: -7,
    rotateY: -13,
    rotateZ: -3,
    opacity: 0.9,
    zIndex: 20,
    blur: 0.2,
  },
  // Slot 7: Deep upper-center-left
  {
    xPct: -20,
    yPct: -54,
    zPx: -240,
    scale: 0.28,
    rotateX: 11,
    rotateY: 8,
    rotateZ: -2,
    opacity: 0.72,
    zIndex: 10,
    blur: 0.7,
  },
  // Slot 8: Deep lower-center
  {
    xPct: 15,
    yPct: 54,
    zPx: -220,
    scale: 0.28,
    rotateX: -9,
    rotateY: -8,
    rotateZ: 3,
    opacity: 0.75,
    zIndex: 12,
    blur: 0.55,
  },
  // Slot 9: Deep right-back
  {
    xPct: 80,
    yPct: -16,
    zPx: -270,
    scale: 0.26,
    rotateX: 6,
    rotateY: -20,
    rotateZ: 7,
    opacity: 0.68,
    zIndex: 8,
    blur: 0.85,
  },
];

function getOrbitalSlot(offset: number, total: number): OrbitalSlot {
  if (offset === 0) return ORBITAL_SLOTS[0];
  if (offset < ORBITAL_SLOTS.length) return ORBITAL_SLOTS[offset];

  const angle = (offset / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2;
  return {
    xPct: Math.cos(angle) * 102,
    yPct: Math.sin(angle) * 54,
    zPx: -240,
    scale: 0.28,
    rotateX: 6,
    rotateY: Math.cos(angle) * -18,
    rotateZ: Math.sin(angle) * 5,
    opacity: 0.7,
    zIndex: 6,
    blur: 0.75,
  };
}

function createDefaultItems(uid: string): SpatialCardItem[] {
  return [
    {
      id: "silhouette-profile",
      title: "Monochrome Profile",
      subtitle: "Identity Study 01",
      renderContent: () => (
        <div className="relative h-full w-full overflow-hidden bg-[#C4C4C6]">
          <svg
            viewBox="0 0 320 400"
            className="h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={`${uid}-sil-bg`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#D2D2D4" />
                <stop offset="100%" stopColor="#B5B5B8" />
              </linearGradient>
            </defs>
            <rect width="320" height="400" fill={`url(#${uid}-sil-bg)`} />
            <path
              d="M92 400 L92 315 C92 285 110 268 118 248 C114 236 104 222 100 202 C92 175 94 142 108 116 C122 90 150 74 182 76 C210 78 232 95 240 120 C244 134 242 146 248 156 C255 168 264 176 262 184 C260 190 251 193 251 199 C251 204 257 207 256 213 C255 218 249 221 249 226 C249 233 255 240 250 249 C244 259 226 263 212 264 C205 278 206 296 220 318 L254 400 Z"
              fill="#0A0A0B"
            />
            <path
              d="M196 105 C216 112 226 132 222 152"
              stroke="#262628"
              strokeWidth="2"
              fill="none"
              opacity="0.45"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "acid-dot-cluster",
      title: "Organic Pulse Grid",
      subtitle: "System Pattern",
      renderContent: () => (
        <div className="relative flex h-full w-full items-center justify-center bg-[#D4F742] p-6">
          <svg
            viewBox="0 0 240 240"
            className="h-3/4 w-3/4"
            aria-hidden="true"
          >
            <circle cx="88" cy="74" r="14" fill="#10120B" />
            <circle cx="156" cy="86" r="24" fill="#10120B" />
            <circle cx="52" cy="116" r="9" fill="#10120B" />
            <circle cx="102" cy="126" r="14" fill="#10120B" />
            <circle cx="144" cy="144" r="14" fill="#10120B" />
            <circle cx="64" cy="166" r="15" fill="#10120B" />
            <circle cx="114" cy="176" r="9" fill="#10120B" />
            <circle cx="186" cy="136" r="8" fill="#10120B" />
          </svg>
        </div>
      ),
    },
    {
      id: "neon-hood-editorial",
      title: "Translucent Outerwear",
      subtitle: "Lookbook 02",
      renderContent: () => (
        <div className="relative h-full w-full overflow-hidden bg-[#D9D9D7]">
          <svg
            viewBox="0 0 320 400"
            className="h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={`${uid}-hood`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#E5FA70" />
                <stop offset="55%" stopColor="#CBEF48" />
                <stop offset="100%" stopColor="#A9CE36" />
              </linearGradient>
            </defs>
            <rect width="320" height="400" fill="#DCDCD9" />
            <path
              d="M65 400 L82 246 C86 212 104 190 112 162 C110 118 128 84 162 82 C196 80 218 112 216 158 C224 188 242 212 248 248 L266 400 Z"
              fill={`url(#${uid}-hood)`}
              stroke="#B6DA36"
              strokeWidth="2"
            />
            <ellipse cx="164" cy="154" rx="34" ry="44" fill="#DFC0AA" />
            <path
              d="M128 150 C128 112 198 112 198 150 C190 134 140 134 128 150 Z"
              fill="#19191B"
            />
            <rect x="134" y="138" width="58" height="12" fill="#19191B" />
            <path
              d="M144 160 Q150 157 156 160 M170 160 Q176 157 182 160"
              stroke="#241C18"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M156 178 Q164 182 172 178"
              stroke="#8C594B"
              strokeWidth="2.5"
              fill="none"
            />
            <g transform="translate(186, 266)" fill="#181B12">
              <circle cx="8" cy="6" r="3" />
              <circle cx="20" cy="8" r="4.5" />
              <circle cx="2" cy="16" r="2.2" />
              <circle cx="13" cy="18" r="3" />
              <circle cx="23" cy="21" r="2.5" />
              <circle cx="8" cy="27" r="3.2" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      id: "dot-matrix-emblem",
      title: "Beacon Glyph",
      subtitle: "Mark Architecture",
      renderContent: () => (
        <div className="relative flex h-full w-full items-center justify-center bg-[#0A0A0B]">
          <svg
            viewBox="0 0 240 300"
            className="h-3/4 w-3/4"
            aria-hidden="true"
          >
            {Array.from({ length: 14 }).map((_, idx) => {
              const angle = (idx / 14) * Math.PI * 2;
              const cx = 120 + Math.cos(angle) * 44;
              const cy = 96 + Math.sin(angle) * 44;
              return (
                <circle key={idx} cx={cx} cy={cy} r="5.5" fill="#F4F4F5" />
              );
            })}
            {[154, 174, 194, 214, 234].map((y) => (
              <circle key={y} cx="120" cy={y} r="5.5" fill="#F4F4F5" />
            ))}
            {[82, 101, 139, 158].map((x) => (
              <circle key={x} cx={x} cy="194" r="5.5" fill="#F4F4F5" />
            ))}
          </svg>
        </div>
      ),
    },
    {
      id: "audience-pills",
      title: "Generation X & Wellness",
      subtitle: "Segment Tags",
      renderContent: () => (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-3.5 overflow-hidden bg-[#1D2216] p-6">
          <svg
            viewBox="0 0 320 400"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
            aria-hidden="true"
          >
            <path
              d="M0 120 C90 80 180 190 320 130 L320 400 L0 400 Z"
              fill="#2A3120"
            />
            <path
              d="M0 240 C110 190 210 290 320 220 L320 400 L0 400 Z"
              fill="#14180F"
            />
          </svg>
          {["Generation X", "Wellness"].map((label) => (
            <div
              key={label}
              className="relative z-10 flex w-full max-w-[205px] items-center gap-3 rounded-full border border-white/10 bg-[#2C3124]/85 px-3 py-2 shadow-lg backdrop-blur-md"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4F742]">
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 fill-[#14170E]"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="4.5" r="1.8" />
                  <circle cx="10" cy="15.5" r="1.8" />
                  <circle cx="4.5" cy="10" r="1.8" />
                  <circle cx="15.5" cy="10" r="1.8" />
                </svg>
              </span>
              <span className="text-[13px] font-medium tracking-tight text-white/95">
                {label}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "parasail-lightbox",
      title: "Parasail Signbox",
      subtitle: "Spatial Wayfinding",
      renderContent: () => (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0E0F10] p-4">
          <div className="relative flex w-[88%] -rotate-3 items-center justify-between rounded-sm bg-white px-4 py-4 shadow-[0_0_50px_rgba(255,255,255,0.28)]">
            <span className="font-sans text-[22px] font-semibold tracking-[-0.04em] text-[#0E0F10]">
              parasail
            </span>
            <svg
              viewBox="0 0 36 36"
              className="h-6 w-6 fill-[#0E0F10]"
              aria-hidden="true"
            >
              <circle cx="10" cy="8" r="3" />
              <circle cx="22" cy="10" r="4.5" />
              <circle cx="6" cy="18" r="2.2" />
              <circle cx="16" cy="20" r="3" />
              <circle cx="26" cy="22" r="2.5" />
              <circle cx="11" cy="28" r="3" />
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: "halftone-globe-desk",
      title: "Global Studio",
      subtitle: "Parasail Workspace",
      renderContent: () => (
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#D0F444] via-[#B4DA35] to-[#87A826] p-5">
          <div className="flex items-center gap-1.5 text-[#11140B]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <circle cx="6" cy="6" r="2.2" />
              <circle cx="15" cy="7" r="3" />
              <circle cx="10" cy="14" r="2.2" />
              <circle cx="18" cy="15" r="2" />
              <circle cx="7" cy="20" r="2" />
            </svg>
            <span className="text-[16px] font-semibold tracking-[-0.03em]">
              parasail
            </span>
          </div>
          <svg
            viewBox="0 0 240 240"
            className="pointer-events-none absolute -right-8 top-12 h-56 w-56 opacity-40"
            aria-hidden="true"
          >
            <circle
              cx="120"
              cy="120"
              r="98"
              fill="none"
              stroke="#12160A"
              strokeWidth="2"
              strokeDasharray="3 6"
            />
            <circle
              cx="120"
              cy="120"
              r="72"
              fill="none"
              stroke="#12160A"
              strokeWidth="3"
              strokeDasharray="2 7"
            />
            <ellipse
              cx="120"
              cy="120"
              rx="42"
              ry="96"
              fill="none"
              stroke="#12160A"
              strokeWidth="2"
              strokeDasharray="3 5"
            />
          </svg>
          <svg
            viewBox="0 0 260 110"
            className="relative z-10 w-full"
            aria-hidden="true"
          >
            <rect x="96" y="24" width="66" height="42" rx="3" fill="#0F120A" />
            <rect x="124" y="66" width="10" height="14" fill="#0F120A" />
            <rect x="52" y="80" width="156" height="7" rx="1" fill="#0F120A" />
            <rect x="64" y="87" width="6" height="23" fill="#0F120A" />
            <rect x="190" y="87" width="6" height="23" fill="#0F120A" />
          </svg>
        </div>
      ),
    },
    {
      id: "digital-meets-personal",
      title: "Where Digital Meets Personal",
      subtitle: "Editorial Poster",
      renderContent: () => (
        <div className="flex h-full w-full items-center justify-center bg-[#B6B7BA] p-4">
          <div className="flex h-full w-full flex-col justify-between bg-[#F7F7F7] p-4 text-[#141416] shadow-inner">
            <p className="text-[15px] font-medium leading-[1.15] tracking-[-0.02em]">
              Where digital
              <br />
              meets personal
            </p>
            <svg
              viewBox="0 0 120 120"
              className="mx-auto h-28 w-28"
              aria-hidden="true"
            >
              <circle cx="60" cy="58" r="42" fill="#E4E4E7" />
              <path d="M36 96 C38 72 82 72 84 96" fill="#1F1F23" />
              <circle cx="60" cy="48" r="20" fill="#2A2A2E" />
              <path
                d="M50 52 Q60 62 70 52"
                stroke="#F7F7F7"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
            <div className="flex items-center justify-center gap-1 text-[10px] font-semibold tracking-tight text-[#27272A]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#18181B]" />
              parasail
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "dotted-vessel",
      title: "Dotted Vessel",
      subtitle: "Commerce Icon",
      renderContent: () => (
        <div className="flex h-full w-full items-center justify-center bg-[#101012] p-6">
          <svg
            viewBox="0 0 200 240"
            className="h-3/4 w-3/4"
            aria-hidden="true"
          >
            <path
              d="M65 88 L65 66 C65 48 135 48 135 66 L135 88"
              fill="none"
              stroke="#E4E4E7"
              strokeWidth="5"
              strokeDasharray="2 9"
              strokeLinecap="round"
            />
            <polygon
              points="46,90 154,90 140,188 60,188"
              fill="none"
              stroke="#FAFAFA"
              strokeWidth="5.5"
              strokeDasharray="2 10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "diamond-matrix",
      title: "Diamond Lattice",
      subtitle: "Geometric Matrix",
      renderContent: () => (
        <div className="flex h-full w-full items-center justify-center bg-[#111113] p-6">
          <svg
            viewBox="0 0 200 200"
            className="h-3/4 w-3/4"
            aria-hidden="true"
          >
            {[-2, -1, 0, 1, 2].map((row) =>
              [-2, -1, 0, 1, 2]
                .filter((col) => Math.abs(row) + Math.abs(col) <= 2)
                .map((col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={100 + col * 24}
                    cy={100 + row * 24}
                    r={Math.abs(row) + Math.abs(col) === 0 ? 5.5 : 3.5}
                    fill="#F4F4F5"
                    opacity={Math.abs(row) + Math.abs(col) === 2 ? 0.65 : 1}
                  />
                ))
            )}
          </svg>
        </div>
      ),
    },
  ];
}

const ORBITAL_SPRING = {
  type: "spring" as const,
  stiffness: 118,
  damping: 25,
  mass: 1.02,
};

interface SpotlightCardWrapperProps {
  children: React.ReactNode;
  isHero: boolean;
  className?: string;
}

function SpotlightCardWrapper({
  children,
  isHero,
  className,
}: SpotlightCardWrapperProps) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      className={cn(
        "relative h-full w-full rounded-[16px] p-[1.5px] transition-all duration-300",
        isHero
          ? "shadow-[0_22px_48px_-10px_rgba(0,114,188,0.24),0_10px_22px_-6px_rgba(15,23,42,0.12)]"
          : "shadow-[0_14px_30px_-8px_rgba(0,114,188,0.16),0_6px_14px_-4px_rgba(15,23,42,0.08)]",
        className
      )}
      style={{
        background: isHovered
          ? `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 114, 188, 0.95), rgba(56, 189, 248, 0.75), rgba(186, 230, 253, 0.3) 65%, rgba(226, 232, 240, 0.85) 100%)`
          : "rgba(226, 232, 240, 0.85)",
      }}
    >
      {/* Corner Spotlight Glow bleed around borders */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-[2px] rounded-[18px] opacity-75 blur-[3px] transition-opacity duration-200"
          style={{
            background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 114, 188, 0.7), rgba(56, 189, 248, 0.45), transparent 75%)`,
          }}
        />
      )}

      {/* Inner card content with smooth corners */}
      <div className="relative h-full w-full rounded-[14.5px] bg-white overflow-hidden z-10">
        {children}
      </div>
    </div>
  );
}

const SpatialCardCarousel = React.forwardRef<
  HTMLDivElement,
  SpatialCardCarouselProps
>(
  (
    {
      items: propItems,
      theme = "auto",
      autoPlay = true,
      interval = 2400,
      pauseOnHover = true,
      paused = false,
      enableWheel = false,
      initialIndex = 0,
      onActiveChange,
      onCardClick,
      ariaLabel = "3D spatial card showcase",
      className,
      ...rest
    },
    ref
  ) => {
    const uid = useId().replace(/:/g, "");
    const shouldReduceMotion = useReducedMotion();
    const defaultItems = useMemo(() => createDefaultItems(uid), [uid]);
    const items =
      propItems && propItems.length > 0 ? propItems : defaultItems;
    const total = items.length;

    const safeInitial = ((initialIndex % total) + total) % total;
    const [activeIndex, setActiveIndex] = useState<number>(safeInitial);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [interactionTick, setInteractionTick] = useState<number>(0);

    const isEffectivelyPaused = Boolean(paused) || (pauseOnHover && isHovered);

    const stageRef = useRef<HTMLDivElement | null>(null);
    const wheelAccumulatorRef = useRef<number>(0);
    const wheelLockRef = useRef<number>(0);
    const dragStartRef = useRef<{ x: number; y: number } | null>(null);
    const didDragRef = useRef<boolean>(false);
    const hasMountedRef = useRef<boolean>(false);

    // Zero-rerender GPU-accelerated pointer parallax
    const rawPointerX = useMotionValue(0);
    const rawPointerY = useMotionValue(0);
    const smoothTiltY = useSpring(rawPointerX, { stiffness: 120, damping: 24 });
    const smoothTiltX = useSpring(rawPointerY, { stiffness: 120, damping: 24 });
    const stageRotateY = useTransform(smoothTiltY, [-0.5, 0.5], [-6, 6]);
    const stageRotateX = useTransform(smoothTiltX, [-0.5, 0.5], [5, -5]);

    useEffect(() => {
      setActiveIndex(((initialIndex % total) + total) % total);
    }, [initialIndex, total]);

    useEffect(() => {
      if (!hasMountedRef.current) {
        hasMountedRef.current = true;
        return;
      }
      onActiveChange?.(activeIndex, items[activeIndex]);
    }, [activeIndex, items, onActiveChange]);

    const selectIndex = useCallback(
      (nextIdx: number) => {
        const normalized = ((nextIdx % total) + total) % total;
        setActiveIndex(normalized);
        setInteractionTick((t) => t + 1);
      },
      [total]
    );

    const stepBy = useCallback(
      (delta: number) => {
        setActiveIndex((prev) => (((prev + delta) % total) + total) % total);
        setInteractionTick((t) => t + 1);
      },
      [total]
    );

    // Smooth autoplay timer (pauses instantly on hover or manual drag)
    useEffect(() => {
      if (!autoPlay || total <= 1) return;
      if (isEffectivelyPaused) return;

      const clampedInterval = Math.max(900, interval);
      const timer = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % total);
      }, clampedInterval);

      return () => window.clearInterval(timer);
    }, [autoPlay, interval, isEffectivelyPaused, interactionTick, total]);

    // Optional native wheel listener - strictly disabled by default so mouse scrolling page works naturally
    useEffect(() => {
      if (!enableWheel) return;
      const el = stageRef.current;
      if (!el || total <= 1) return;

      const onWheel = (e: WheelEvent) => {
        const dominantDelta =
          Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (Math.abs(dominantDelta) < 2) return;

        e.preventDefault();

        const now = performance.now();
        if (now - wheelLockRef.current < 260) return;

        wheelAccumulatorRef.current += dominantDelta;
        if (Math.abs(wheelAccumulatorRef.current) >= 36) {
          const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
          wheelAccumulatorRef.current = 0;
          wheelLockRef.current = now;
          stepBy(direction);
        }
      };

      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }, [enableWheel, stepBy, total]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      didDragRef.current = false;
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragStartRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        if (Math.hypot(dx, dy) > 8) {
          didDragRef.current = true;
        }
      }

      if (shouldReduceMotion || !stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      rawPointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawPointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      dragStartRef.current = null;

      const primaryDelta = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
      if (Math.abs(primaryDelta) >= 36) {
        stepBy(primaryDelta < 0 ? 1 : -1);
      }
    };

    const handlePointerCancel = () => {
      dragStartRef.current = null;
      didDragRef.current = false;
    };

    const handlePointerLeave = () => {
      setIsHovered(false);
      dragStartRef.current = null;
      rawPointerX.set(0);
      rawPointerY.set(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        stepBy(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        stepBy(-1);
      }
    };

    const stageThemeClass =
      theme === "dark"
        ? "bg-[#0B0B0C] text-white"
        : theme === "light"
          ? "bg-[#FFFFFF] text-[#111113]"
          : "bg-[#FFFFFF] text-[#111113] dark:bg-[#0B0B0C] dark:text-white";

    const cardThemeClass =
      theme === "dark"
        ? "border-white/10 shadow-[0_26px_70px_-14px_rgba(0,0,0,0.85)]"
        : theme === "light"
          ? "border-slate-200/90 shadow-[0_24px_60px_-12px_rgba(0,114,188,0.20)]"
          : "border-slate-200/90 shadow-[0_24px_60px_-12px_rgba(0,114,188,0.20)] dark:border-white/10 dark:shadow-[0_26px_70px_-14px_rgba(0,0,0,0.85)]";

    const heroRingClass =
      theme === "dark"
        ? "ring-1 ring-white/15"
        : theme === "light"
          ? "ring-1 ring-black/5"
          : "ring-1 ring-black/5 dark:ring-white/15";

    const activeItem = items[activeIndex];

    return (
      <div
        ref={(node) => {
          stageRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseOver={() => {
          if (!isHovered) setIsHovered(true);
        }}
        onPointerEnter={() => setIsHovered(true)}
        onPointerOver={() => {
          if (!isHovered) setIsHovered(true);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        onMouseLeave={handlePointerLeave}
        className={cn(
          "relative flex h-[560px] w-full touch-pan-y cursor-grab select-none items-center justify-center overflow-visible transition-colors duration-700 active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0072bc] focus-visible:ring-offset-2 sm:h-[680px]",
          stageThemeClass,
          className
        )}
        style={{ perspective: "1500px" }}
        {...rest}
      >
        <div className="sr-only" aria-live="polite">
          {`Showing ${activeItem?.title || "item"} (${activeIndex + 1} of ${total})`}
        </div>

        {/* 3D Orbital Stage with GPU-accelerated pointer tilt */}
        <motion.div
          className="relative flex h-full w-full items-center justify-center overflow-visible"
          style={{
            transformStyle: "preserve-3d",
            rotateX: shouldReduceMotion ? 0 : stageRotateX,
            rotateY: shouldReduceMotion ? 0 : stageRotateY,
          }}
        >
          {items.map((item, idx) => {
            const offset = (idx - activeIndex + total) % total;
            const isHero = offset === 0;
            const slot = getOrbitalSlot(offset, total);

            return (
              <motion.button
                key={item.id}
                type="button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseOver={() => {
                  if (!isHovered) setIsHovered(true);
                }}
                onClick={() => {
                  if (didDragRef.current) return;
                  if (onCardClick) {
                    onCardClick(item, idx);
                    return;
                  }
                  if (item.href && typeof window !== "undefined") {
                    window.location.href = item.href;
                    return;
                  }
                  if (isHero) {
                    stepBy(1);
                  } else {
                    selectIndex(idx);
                  }
                }}
                aria-label={
                  isHero
                    ? `${item.title} (active, click to open details)`
                    : `Focus ${item.title}`
                }
                aria-current={isHero ? "true" : undefined}
                initial={false}
                animate={
                  shouldReduceMotion
                    ? {
                        x: `${slot.xPct}%`,
                        y: `${slot.yPct}%`,
                        scale: slot.scale,
                        opacity: isHero ? 1 : slot.opacity * 0.85,
                      }
                    : {
                        x: `${slot.xPct}%`,
                        y: `${slot.yPct}%`,
                        z: slot.zPx,
                        scale: slot.scale,
                        rotateX: slot.rotateX,
                        rotateY: slot.rotateY,
                        rotateZ: slot.rotateZ,
                        opacity: slot.opacity,
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.25 }
                    : {
                        x: ORBITAL_SPRING,
                        y: ORBITAL_SPRING,
                        z: ORBITAL_SPRING,
                        scale: ORBITAL_SPRING,
                        rotateX: ORBITAL_SPRING,
                        rotateY: ORBITAL_SPRING,
                        rotateZ: ORBITAL_SPRING,
                        opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      }
                }
                whileHover={
                  !isHero && !shouldReduceMotion
                    ? {
                        scale: slot.scale * 1.08,
                        opacity: 1,
                        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                      }
                    : undefined
                }
                style={{
                  zIndex: slot.zIndex,
                  filter:
                    !shouldReduceMotion && slot.blur > 0
                      ? `blur(${slot.blur}px)`
                      : undefined,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
                className={cn(
                  "group absolute aspect-[4/5] w-[210px] cursor-pointer overflow-visible text-left transition-shadow duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0072bc] focus-visible:ring-offset-2 sm:w-[270px] md:w-[300px]"
                )}
              >
                {/* Isolated ambient float so orbital spring transitions never stutter */}
                <motion.div
                  className="h-full w-full"
                  animate={
                    shouldReduceMotion || isHero
                      ? { y: 0 }
                      : {
                          y: [0, idx % 2 === 0 ? -5 : 5, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion || isHero
                      ? { duration: 0.4, ease: "easeOut" }
                      : {
                          duration: 5 + (idx % 3) * 0.9,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                >
                  <SpotlightCardWrapper isHero={isHero}>
                    {item.renderContent ? (
                      item.renderContent()
                    ) : item.image ? (
                      <img
                        src={item.image}
                        alt={item.imageAlt ?? item.title}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col justify-end bg-neutral-100 p-5 text-neutral-900 dark:bg-neutral-900 dark:text-white">
                        <span className="text-sm font-medium">{item.title}</span>
                        {item.subtitle && (
                          <span className="text-xs text-neutral-500 dark:text-white/60">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    )}
                  </SpotlightCardWrapper>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    );
  }
);

SpatialCardCarousel.displayName = "SpatialCardCarousel";

export {
  SpatialCardCarousel,
  SpatialCardCarousel as component,
  SpatialCardCarousel as Component,
};
export default SpatialCardCarousel;
