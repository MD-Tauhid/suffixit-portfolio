"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Matter from "matter-js";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  ChevronUp,
  Code2,
  Database,
  Globe,
  GraduationCap,
  Layers,
  MessageSquare,
  RotateCcw,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";

export interface PillServiceData {
  id: string;
  slug: string;
  index: string;
  name: string;
  categoryLabel: string;
  icon: typeof Code2;
  gradient: string;
}

// Exactly 14 Suffix IT Services requested by user
export const all14Practices: PillServiceData[] = [
  {
    id: "custom-applications",
    slug: "custom-software",
    index: "01",
    name: "Custom Software",
    categoryLabel: "Software",
    icon: Code2,
    gradient: "from-[#0072bc] to-[#38bdf8]",
  },
  {
    id: "web-ecommerce",
    slug: "web-ecommerce",
    index: "02",
    name: "Web & E-commerce",
    categoryLabel: "Commerce",
    icon: Globe,
    gradient: "from-[#0284c7] to-[#38bdf8]",
  },
  {
    id: "mobile-apps",
    slug: "mobile-apps",
    index: "03",
    name: "Mobile Apps",
    categoryLabel: "Mobile",
    icon: Smartphone,
    gradient: "from-[#0284c7] to-[#06b6d4]",
  },
  {
    id: "domain-hosting",
    slug: "cloud-hosting",
    index: "04",
    name: "Cloud & Hosting",
    categoryLabel: "Hosting",
    icon: Globe,
    gradient: "from-[#2563eb] to-[#60a5fa]",
  },
  {
    id: "storage-backup",
    slug: "storage-backup",
    index: "05",
    name: "Storage & Backup",
    categoryLabel: "Storage",
    icon: Database,
    gradient: "from-[#0369a1] to-[#0ea5e9]",
  },
  {
    id: "erp-consulting",
    slug: "erp-consulting",
    index: "06",
    name: "ERP Consulting",
    categoryLabel: "ERP Core",
    icon: Layers,
    gradient: "from-[#059669] to-[#10b981]",
  },
  {
    id: "it-ot-security",
    slug: "it-ot-security",
    index: "07",
    name: "IT & OT Security",
    categoryLabel: "Security",
    icon: ShieldCheck,
    gradient: "from-[#7c3aed] to-[#a855f7]",
  },
  {
    id: "it-infrastructure",
    slug: "it-infrastructure",
    index: "08",
    name: "IT Infrastructure",
    categoryLabel: "Networks",
    icon: Server,
    gradient: "from-[#1d4ed8] to-[#3b82f6]",
  },
  {
    id: "bulk-sms",
    slug: "bulk-sms",
    index: "09",
    name: "Bulk SMS",
    categoryLabel: "Telecom",
    icon: MessageSquare,
    gradient: "from-[#ea580c] to-[#f97316]",
  },
  {
    id: "consultancy-system-integrator",
    slug: "system-integration",
    index: "10",
    name: "System Integration",
    categoryLabel: "Integration",
    icon: Layers,
    gradient: "from-[#047857] to-[#34d399]",
  },
  {
    id: "hospital-management",
    slug: "hospital-management",
    index: "11",
    name: "Hospital Management",
    categoryLabel: "Healthcare",
    icon: Building2,
    gradient: "from-[#e11d48] to-[#f43f5e]",
  },
  {
    id: "learning-management",
    slug: "learning-management",
    index: "12",
    name: "Learning Management",
    categoryLabel: "EdTech",
    icon: GraduationCap,
    gradient: "from-[#8b5cf6] to-[#c084fc]",
  },
  {
    id: "power-cooling",
    slug: "power-cooling",
    index: "13",
    name: "Power & Cooling",
    categoryLabel: "Facilities",
    icon: Zap,
    gradient: "from-[#d97706] to-[#f59e0b]",
  },
  {
    id: "video-conferencing",
    slug: "video-conferencing",
    index: "14",
    name: "Video Conferencing",
    categoryLabel: "WebRTC",
    icon: Video,
    gradient: "from-[#0284c7] to-[#38bdf8]",
  },
];

interface AntigravityPillFieldProps {
  onSelectService?: (slug: string) => void;
  showMore?: boolean;
  onToggleShowMore?: () => void;
}

export default function AntigravityPillField({
  onSelectService,
  showMore = false,
  onToggleShowMore,
}: AntigravityPillFieldProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const leftWallRef = useRef<Matter.Body | null>(null);
  const draggedBodyRef = useRef<Matter.Body | null>(null);
  const hasDroppedRef = useRef<boolean>(false);
  const [hasDropped, setHasDropped] = useState(false);
  const [isZeroG, setIsZeroG] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  // Elastic rubber band SVG elements (60 FPS direct DOM manipulation)
  const elasticSvgRef = useRef<SVGSVGElement>(null);
  const elasticLineRef = useRef<SVGLineElement>(null);
  const elasticAnchorRef = useRef<SVGCircleElement>(null);
  const elasticPillRef = useRef<SVGCircleElement>(null);

  // Initialize and spawn physics simulation 100% matched to arenaRef coordinates
  const spawnPhysics = () => {
    const arena = arenaRef.current;
    if (!arena) return;

    const width = arena.clientWidth;
    const height = arena.clientHeight;
    if (width <= 0 || height <= 0) return;

    // Clean up existing runner and engine
    if (runnerRef.current && engineRef.current) {
      Matter.Runner.stop(runnerRef.current);
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
    }

    // 1. Create Engine
    const engine = Matter.Engine.create({
      gravity: {
        x: 0,
        y: isZeroG ? 0.04 : 0.82,
        scale: 0.001,
      },
    });
    engineRef.current = engine;

    // 2. Arena Boundaries (Floor, Left Wall, Right Wall)
    // NOTE: Ceiling is set at -500 so it NEVER blocks pills from spawning above!
    const thickness = 60;
    const floor = Matter.Bodies.rectangle(width / 2, height + thickness / 2 - 4, width * 2, thickness, {
      isStatic: true,
      restitution: 0.45,
      friction: 0.25,
    });

    const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 4, {
      isStatic: true,
      restitution: 0.45,
      friction: 0.2,
    });
    leftWallRef.current = leftWall;

    const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 4, {
      isStatic: true,
      restitution: 0.45,
      friction: 0.2,
    });

    const ceiling = Matter.Bodies.rectangle(width / 2, -500, width * 2, thickness, {
      isStatic: true,
      restitution: 0.4,
      friction: 0.2,
    });

    Matter.World.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    // 3. Spawn Rigid Bodies for ALL 14 Pills INSIDE the arena boundaries
    const bodies: Matter.Body[] = [];

    pillsRef.current.forEach((el, i) => {
      if (!el) return;

      const pillW = Math.max(el.offsetWidth, 115);
      const pillH = Math.max(el.offsetHeight, 32);

      // Stagger spawn positions evenly across arena width [15, width - 15]
      const col = i % 4;
      const row = Math.floor(i / 4);
      const availableW = Math.max(width - pillW - 20, 60);
      const spawnX = Math.min(
        Math.max(12 + (col * availableW) / 3 + (Math.random() - 0.5) * 15, pillW / 2 + 5),
        width - pillW / 2 - 5
      );
      // Gentle staggered vertical fall so all 14 drop smoothly without jamming
      const spawnY = -20 - row * 50 - (i % 3) * 25 - Math.random() * 20;
      const initialAngle = (Math.random() - 0.5) * 0.35;

      const body = Matter.Bodies.rectangle(spawnX, spawnY, pillW, pillH, {
        chamfer: { radius: pillH / 2 },
        restitution: 0.48, // Bouncy natural collision
        friction: 0.2,
        frictionAir: isZeroG ? 0.03 : 0.012,
        density: 0.002,
        angle: initialAngle,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.8,
        y: Math.random() * 2 + 1.2,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);

      bodies.push(body);
    });

    bodiesRef.current = bodies;
    Matter.World.add(engine.world, bodies);

    // 4. Mouse and Touch Interaction
    const mouse = Matter.Mouse.create(arena);
    try {
      const mouseObj = mouse as unknown as { mousewheel?: (e: Event) => void };
      if (mouseObj.mousewheel) {
        mouse.element.removeEventListener("wheel", mouseObj.mousewheel as EventListener);
      }
    } catch {
      // ignore
    }

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.24,
        damping: 0.08,
        render: { visible: false },
      },
    });

    Matter.World.add(engine.world, mouseConstraint);

    // Allow window-level tracking when mouse is dragged OUTSIDE the arena to the left
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (draggedBodyRef.current && arenaRef.current) {
        const rect = arenaRef.current.getBoundingClientRect();
        mouse.position.x = e.clientX - rect.left;
        mouse.position.y = e.clientY - rect.top;
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (draggedBodyRef.current && arenaRef.current && e.touches[0]) {
        const rect = arenaRef.current.getBoundingClientRect();
        mouse.position.x = e.touches[0].clientX - rect.left;
        mouse.position.y = e.touches[0].clientY - rect.top;
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    window.addEventListener("touchmove", handleWindowTouchMove, { passive: true });

    // Handle Drag Start
    Matter.Events.on(mouseConstraint, "startdrag", (event: unknown) => {
      const e = event as { body: Matter.Body };
      if (e && e.body) {
        draggedBodyRef.current = e.body;
        const idx = bodies.indexOf(e.body);
        if (idx !== -1) setDraggedIdx(idx);

        // Turn left wall into sensor while dragging so user can pull pill to the left!
        if (leftWallRef.current) {
          leftWallRef.current.isSensor = true;
        }
      }
    });

    // Handle Drag End with ELASTIC SNAP-BACK
    Matter.Events.on(mouseConstraint, "enddrag", () => {
      const body = draggedBodyRef.current;
      if (body) {
        const currentW = arena.clientWidth;
        const currentH = arena.clientHeight;

        // If user pulled pill outside arena to the left (x < 15): SLINGSHOT SNAP-BACK!
        if (body.position.x < 15) {
          const targetHomeX = currentW * 0.45 + (Math.random() - 0.5) * 60;
          const targetHomeY = currentH * 0.65;
          const dx = targetHomeX - body.position.x;
          const dy = targetHomeY - body.position.y;

          // Apply high-velocity slingshot snap impulse
          Matter.Body.setVelocity(body, {
            x: Math.min(Math.max(dx * 0.22, 12), 35),
            y: dy * 0.14 - 3,
          });
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.35);
        }
      }

      draggedBodyRef.current = null;
      setDraggedIdx(null);

      // Hide elastic cord immediately
      if (elasticSvgRef.current) {
        elasticSvgRef.current.style.display = "none";
      }
    });

    // 5. 60 FPS Engine Runner & DOM Transform Loop
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    Matter.Events.on(engine, "afterUpdate", () => {
      const currentW = arena.clientWidth;
      const currentH = arena.clientHeight;

      // Spring restore non-dragged bodies if outside arena
      bodies.forEach((b) => {
        if (b === draggedBodyRef.current) return;

        // If a pill was released outside on the left, pull it back vigorously
        if (b.position.x < 15) {
          const targetX = currentW * 0.45;
          const forceX = (targetX - b.position.x) * 0.0028;
          Matter.Body.applyForce(b, b.position, { x: forceX, y: -0.0005 });
        }
      });

      // Re-enable left wall once all bodies are back inside
      if (leftWallRef.current && !draggedBodyRef.current) {
        const allInside = bodies.every((b) => b.position.x >= 10);
        if (allInside) {
          leftWallRef.current.isSensor = false;
        }
      }

      // Update pill DOM element positions
      bodies.forEach((b, i) => {
        const domEl = pillsRef.current[i];
        if (!domEl) return;

        const w = domEl.offsetWidth || 120;
        const h = domEl.offsetHeight || 32;
        const posX = b.position.x - w / 2;
        const posY = b.position.y - h / 2;

        domEl.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0) rotate(${b.angle.toFixed(4)}rad)`;
      });

      // Update Elastic Rubber Band SVG when dragging outside arena to the left
      const dragged = draggedBodyRef.current;
      if (dragged && elasticSvgRef.current && elasticLineRef.current) {
        if (dragged.position.x < 10) {
          const anchorX = 15;
          const anchorY = currentH * 0.65;

          elasticSvgRef.current.style.display = "block";
          elasticLineRef.current.setAttribute("x1", anchorX.toFixed(1));
          elasticLineRef.current.setAttribute("y1", anchorY.toFixed(1));
          elasticLineRef.current.setAttribute("x2", dragged.position.x.toFixed(1));
          elasticLineRef.current.setAttribute("y2", dragged.position.y.toFixed(1));

          // Dynamic thickness and tension
          const dist = Math.hypot(dragged.position.x - anchorX, dragged.position.y - anchorY);
          const strokeWidth = Math.max(1.5, 4.5 - dist * 0.006);
          elasticLineRef.current.setAttribute("stroke-width", strokeWidth.toFixed(1));

          if (elasticAnchorRef.current) {
            elasticAnchorRef.current.setAttribute("cx", anchorX.toFixed(1));
            elasticAnchorRef.current.setAttribute("cy", anchorY.toFixed(1));
          }
          if (elasticPillRef.current) {
            elasticPillRef.current.setAttribute("cx", dragged.position.x.toFixed(1));
            elasticPillRef.current.setAttribute("cy", dragged.position.y.toFixed(1));
          }
        } else {
          elasticSvgRef.current.style.display = "none";
        }
      } else if (elasticSvgRef.current) {
        elasticSvgRef.current.style.display = "none";
      }
    });

    setHasDropped(true);
  };

  // 1. Separate Unmount Cleanup: ONLY cleans up when the component actually unmounts
  useEffect(() => {
    return () => {
      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, []);

  // 2. Exact Scroll Trigger: Drops when the TOP position of this section reaches the CENTER of the display
  useEffect(() => {
    if (hasDroppedRef.current) return;

    const handleScroll = () => {
      if (hasDroppedRef.current) return;

      const banner = bannerRef.current;
      if (!banner) return;

      const rect = banner.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // User's exact requirement:
      // "achroll kore jokhon ei section er top position display er center a ashbe tokhon pill gulo automaticali drop hobe"
      // Display center = viewportHeight * 0.5 (with gentle 0.52 buffer)
      if (rect.top <= viewportHeight * 0.52 && rect.bottom > 100) {
        hasDroppedRef.current = true;
        setHasDropped(true);
        window.removeEventListener("scroll", handleScroll);

        // Small requestAnimationFrame to ensure layout measurement before dropping
        requestAnimationFrame(() => {
          setTimeout(() => {
            spawnPhysics();
          }, 60);
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Also check immediately in case user reloads while already at or past the center
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (hasDroppedRef.current) {
        spawnPhysics();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle Zero-G Float Mode
  const toggleZeroG = () => {
    setIsZeroG((prev) => {
      const next = !prev;
      if (engineRef.current) {
        engineRef.current.gravity.y = next ? 0.04 : 0.82;
        bodiesRef.current.forEach((b) => {
          b.frictionAir = next ? 0.03 : 0.012;
          if (next) {
            Matter.Body.applyForce(b, b.position, {
              x: (Math.random() - 0.5) * 0.003,
              y: -0.005 - Math.random() * 0.004,
            });
          }
        });
      }
      return next;
    });
  };

  // Re-drop pills on demand
  const handleReDrop = () => {
    hasDroppedRef.current = true;
    setHasDropped(true);
    spawnPhysics();
  };

  return (
    <div
      ref={bannerRef}
      className="relative w-full overflow-hidden rounded-[24px] lg:rounded-[32px] p-6 sm:p-8 lg:p-12 shadow-[0_24px_50px_-12px_rgba(0,114,188,0.45)] border border-white/25 select-none bg-gradient-to-r from-[#006cb7] via-[#0080d8] to-[#005e9e]"
      style={{ touchAction: "none" }}
    >
      {/* ─────────────────────────────────────────────────────────────────────────────
          1. ELEGANT SILKY CURVED SVG WAVES BACKGROUND (Matching User's Reference Image)
         ───────────────────────────────────────────────────────────────────────────── */}
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.42" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#004e82" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="waveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.32" />
            <stop offset="65%" stopColor="#0284c7" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.38" />
          </linearGradient>

          <linearGradient id="waveGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M-50,520 C220,480 340,310 680,250 C980,190 1100,230 1260,140 L1260,550 L-50,550 Z"
          fill="url(#waveGrad1)"
        />
        <path
          d="M-50,260 C250,140 540,370 860,230 C1060,140 1160,190 1280,90 L1280,550 L-50,550 Z"
          fill="url(#waveGrad2)"
        />
        <path
          d="M0,0 C380,110 700,250 1260,170 L1260,0 L0,0 Z"
          fill="url(#waveGrad3)"
        />
      </svg>

      {/* Atmospheric Soft Light Bloom */}
      <div
        className="pointer-events-none absolute -top-32 right-1/4 size-[550px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.28)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-10 size-[450px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────────────────────
          2. TOP-RIGHT CONTROLS (Zero-G & Re-drop)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleZeroG}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-tight shadow-md transition-all backdrop-blur-md cursor-pointer ${
            isZeroG
              ? "bg-emerald-500 text-white shadow-emerald-500/40 ring-2 ring-emerald-300"
              : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
          }`}
          title="Toggle Zero-Gravity Float Mode"
        >
          <Sparkles size={12} className={isZeroG ? "animate-spin" : ""} />
          <span>{isZeroG ? "Zero-G: ON" : "Zero-G"}</span>
        </button>

        <button
          type="button"
          onClick={handleReDrop}
          className="flex items-center gap-1.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 px-3 py-1 text-xs font-bold text-white shadow-md transition-all backdrop-blur-md cursor-pointer"
          title="Re-drop all 14 pills from above"
        >
          <RotateCcw size={12} />
          <span>Re-drop</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          3. MAIN CONTENT GRID: EDITORIAL ON LEFT, SEAMLESS PILL ARENA ON RIGHT
         ───────────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center min-h-[380px] sm:min-h-[420px] lg:min-h-[400px]">
        {/* ─── LEFT COLUMN: AUTHORITATIVE EDITORIAL (Inspired by Image 2) ─── */}
        <div className="flex flex-col gap-3.5 text-center lg:text-left pr-0 lg:pr-4">
          {/* Small Top Eyebrow Tag */}
          <div className="flex items-center justify-center lg:justify-start">
            <span className="text-xs sm:text-[13px] font-semibold text-sky-100 tracking-wide opacity-95">
              Let&apos;s talk about your next project
            </span>
          </div>

          {/* Big Bold Headline */}
          <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-[1.12] tracking-[-0.03em] text-white">
            Technology that fits{" "}
            <span className="block text-white">your business.</span>
          </h3>

          {/* Clear, Authoritative Narrative Description */}
          <p className="text-sm sm:text-[15px] leading-[1.6] text-white/90 font-normal max-w-[460px]">
            Whether you need ready-made software, a custom enterprise application, or full-scale support for your IT and cloud systems, we engineer dependable solutions built for mission-critical scale.
          </p>

          {/* High-Converting Action Buttons: Clean, Authoritative Actions (No manual expand button) */}
          <div className="mt-2.5 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Link
              href="/contact"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-white hover:bg-sky-50 text-[#0072bc] px-6 sm:px-7 py-2.5 text-xs sm:text-sm font-extrabold shadow-[0_10px_24px_-4px_rgba(0,35,80,0.25)] hover:shadow-[0_14px_30px_-4px_rgba(0,35,80,0.35)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 cursor-pointer pointer-events-auto"
            >
              <span>Discuss your project</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="#specialized-practices"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/60 bg-white/10 hover:bg-white/20 px-5 sm:px-6 py-2.5 text-xs sm:text-[13px] font-bold text-white shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 cursor-pointer pointer-events-auto"
            >
              <span>Explore 9 Specialized Practices</span>
              <span className="text-sky-200 font-mono text-sm">↓</span>
            </a>
          </div>

          {/* Slingshot Micro Hint */}
          <div className="mt-1 flex items-center justify-center lg:justify-start gap-2 text-[11px] font-semibold text-sky-100/85">
            <span className="grid size-4 place-items-center rounded-full bg-white/20 text-xs text-white">✦</span>
            <span>Drag any pill over the text &amp; release to test the elastic slingshot!</span>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: 100% SEAMLESS TRANSPARENT RIGID BODY PILL ARENA ─── */}
        {/* Notice: overflow-visible allows dragging out to the left; NO separate box/border! */}
        <div
          ref={arenaRef}
          className="relative size-full min-h-[350px] sm:min-h-[390px] lg:min-h-[400px] overflow-visible bg-transparent select-none"
        >
          {/* Elastic Rubber Band SVG (Renders when pill is dragged to the left) */}
          <svg
            ref={elasticSvgRef}
            className="pointer-events-none absolute inset-0 size-full z-30 overflow-visible"
            style={{ display: "none" }}
            aria-hidden="true"
          >
            <line
              ref={elasticLineRef}
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeDasharray="6 3"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle ref={elasticAnchorRef} cx="0" cy="0" r="4.5" fill="#38bdf8" />
            <circle ref={elasticPillRef} cx="0" cy="0" r="5.5" fill="#ffffff" />
          </svg>

          {/* Initial loading fallback */}
          {!hasDropped && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50 font-mono tracking-wider">
              INITIALIZING RIGID CAPABILITIES...
            </div>
          )}

          {/* ALL 14 Physics Rigid Body Pills (Slightly more compact size, perfectly proportioned) */}
          <ul aria-label="14 Practice Capabilities" className="relative size-full list-none m-0 p-0 overflow-visible">
            {all14Practices.map((practice, i) => {
              const IconComponent = practice.icon;
              const isHeld = draggedIdx === i;

              return (
                <li
                  key={practice.id}
                  ref={(el) => {
                    pillsRef.current[i] = el;
                  }}
                  data-held={isHeld ? "true" : undefined}
                  className={`pointer-events-auto absolute top-0 left-0 flex w-fit cursor-grab touch-none items-center whitespace-nowrap will-change-transform active:cursor-grabbing transition-shadow gap-2 rounded-full bg-white/95 backdrop-blur-md py-1.5 pr-3 pl-2 border border-white/85 select-none ${
                    isHeld
                      ? "z-50 scale-110 shadow-[0_16px_30px_rgba(0,114,188,0.38),0_0_0_2px_#38bdf8]"
                      : "shadow-[0_4px_14px_rgba(0,35,80,0.13),0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-md hover:scale-105"
                  }`}
                  style={{
                    transformOrigin: "center center",
                    opacity: hasDropped ? 1 : 0,
                  }}
                >
                  {/* Colored Circular Icon Badge */}
                  <span
                    className={`grid size-5 sm:size-5.5 shrink-0 place-items-center rounded-full text-white shadow-xs bg-gradient-to-tr ${practice.gradient}`}
                  >
                    <IconComponent size={11} className="text-white" />
                  </span>

                  {/* Clean, Punchy Service Name */}
                  <span className="font-sans text-[11.5px] sm:text-xs font-bold text-[#062033] tracking-tight">
                    {practice.name}
                  </span>

                  {/* Sleek Index Badge */}
                  <span className="font-mono text-[8.5px] font-extrabold text-slate-400 bg-slate-100/90 px-1.5 py-0.5 rounded-full border border-slate-200/50">
                    #{practice.index}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
