"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Cpu, Zap, Activity } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Suffix IT — Next-Gen Interactive Hero & Milestone Video Engine
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// 📍 USER CONFIGURABLE: PROCESSOR DOCKING & FLOAT (Lines 16 - 30)
// You can adjust the exact position, scale, and float amplitude:
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// 📍 USER CONFIGURABLE: PROCESSOR MANUAL POSITION & SIZE (Lines 16 - 38)
// এখান থেকে আপনি প্রসেসরের Height, Width, Scale এবং Position সহজেই পরিবর্তন করতে পারবেন:
// ─────────────────────────────────────────────────────────────
export const PROCESSOR_CONFIG = {
  // ১. পেডেস্টালের ওপর ডক হওয়ার পজিশন ও সাইজ:
  top: "60%",        // Line 22: পেডেস্টালের ওপর সেন্টারিং (আপনার পারফেক্ট পজিশন)
  left: "50%",       // Line 23: ডানে-বামে সেন্টারিং
  offsetY: "-38px",  // Line 24: সূক্ষ্ম পিক্সেল অফসেট Y (টপ ডায়মন্ড স্টেজে পারফেক্ট ফিট)
  offsetX: "0px",    // Line 25: সূক্ষ্ম পিক্সেল অফসেট X
  scale: 1.0,        // Line 26: ডকিং সাইজ স্কেল

  // ২. পেডেস্টালে ফ্লোটিং নড়াচড়া (Breathing/Hover on Pedestal):
  dockedFloatingPx: 8,            // Line 29: পেডেস্টালের ওপর কতটুকু উপরে-নিচে নড়াচড়া করবে (+-8px)
  dockedFloatingDurationSec: 3.0, // Line 30: পেডেস্টালে ভাসার স্পিড (সেকেন্ড)

  // ৩. প্রসেসরের সরাসরি প্রস্থ ও উচ্চতা (Height & Width):
  width: "clamp(420px, 46vw, 760px)",   // Line 33: প্রস্থ
  height: "clamp(420px, 46vw, 760px)",  // Line 34: উচ্চতা

  // ৪. শুরুতে হিরো স্টেটের পজিশন ও সাইজ (Compact & Balanced):
  heroTop: "50%",    // Line 37: হিরো স্টেটে প্রসেসরের টপ পজিশন
  heroLeft: "70%",   // Line 38: হিরো স্টেটে প্রসেসরের লেফট পজিশন
  heroScale: 0.68,   // Line 39: হিরো স্টেটে কমপ্যাক্ট আধুনিক সাইজ (স্ক্রোলে বড় হয়ে পেডেস্টালে বসবে)
  floatingPx: 10,    // Line 40: হিরো স্টেটে ফ্লোটিং এমপ্লিটিউড (+-10px)
  floatingDurationSec: 3.5, // Line 41: হিরো স্টেটে ভাসার স্পিড
};

export const PROCESSOR_DOCK_CONFIG = {
  dockedTop: PROCESSOR_CONFIG.top,
  dockedLeft: PROCESSOR_CONFIG.left,
  dockedOffsetY: PROCESSOR_CONFIG.offsetY,
  dockedOffsetX: PROCESSOR_CONFIG.offsetX,
  dockedScale: PROCESSOR_CONFIG.scale,
  floatingAmplitudePx: PROCESSOR_CONFIG.floatingPx,
  floatingDurationSec: PROCESSOR_CONFIG.floatingDurationSec,
};

// ─────────────────────────────────────────────────────────────
// 📍 USER CONFIGURABLE: VIDEO TIMESTAMPS (Lines 34 - 40)
// ─────────────────────────────────────────────────────────────
export const VIDEO_DURATION = 8.125;

export const VIDEO_TIMESTAMPS: number[] = [
  0.0,   // Timestamp 1 (Milestone 0): Microchip on base
  2.0,   // Timestamp 2 (Milestone 1): Optical green cables elevate
  7.6,   // Timestamp 3 (Milestone 2): Suffix IT digital tree & ecosystem blossom
];

export interface MilestoneCard {
  id: number;
  timestamp: number;
  label: string;
  badge: string;
}

export const MILESTONES: MilestoneCard[] = [
  { id: 0, timestamp: VIDEO_TIMESTAMPS[0], label: "01 Foundation", badge: "Technology Partner" },
  { id: 1, timestamp: VIDEO_TIMESTAMPS[1], label: "02 Enterprise Core", badge: "Integrated Platforms" },
  { id: 2, timestamp: VIDEO_TIMESTAMPS[2], label: "03 Suffix IT Scale", badge: "Enterprise Growth" },
];

export interface MetroHeroProps {
  videoSrc?: string;
  reverseVideoSrc?: string;
  poster?: string;
  scrubDistance?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_VIDEO = "/assets/video/hero4.mp4";
const DEFAULT_REVERSE_VIDEO = "/assets/video/hero4-reverse.mp4";
const DEFAULT_POSTER = "/assets/images/hero-pedestal.jpg";
const SANS = "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif)";

export type HeroStage = "hero-intro" | "docked" | "video";

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  reverseVideoSrc = DEFAULT_REVERSE_VIDEO,
  poster = DEFAULT_POSTER,
  className,
  style,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoFwdRef = useRef<HTMLVideoElement>(null);
  const videoRevRef = useRef<HTMLVideoElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  // 3-Stage Experience State:
  // 1. "hero-intro": Modern tech hero with floating processor
  // 2. "docked": Processor docks perfectly onto the pedestal center
  // 3. "video": Seamlessly transitions to the 60fps milestone snap video
  const [heroStage, setHeroStage] = useState<HeroStage>("hero-intro");
  const heroStageRef = useRef<HeroStage>("hero-intro");

  // Video Milestone state
  const [currentMilestone, setCurrentMilestone] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeSide, setActiveSide] = useState<"fwd" | "rev">("fwd");

  const currentMilestoneRef = useRef<number>(0);
  const targetMilestoneRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const isLockedRef = useRef<boolean>(true);
  const rafIdRef = useRef<number | null>(null);
  const lastScrollTriggerTimeRef = useRef<number>(0);

  // Sync refs
  useEffect(() => {
    currentMilestoneRef.current = currentMilestone;
  }, [currentMilestone]);

  useEffect(() => {
    heroStageRef.current = heroStage;
  }, [heroStage]);

  // Release lock for normal document scrolling
  const releaseLock = useCallback(() => {
    if (typeof document === "undefined") return;
    isLockedRef.current = false;
    const b = document.body.style;
    if (b.position === "fixed") {
      b.position = "";
      b.top = "";
      b.left = "";
      b.right = "";
      b.width = "";
      b.height = "";
      b.overscrollBehavior = "";
    }
  }, []);

  // Engage body lock inside hero section
  const engageLock = useCallback(() => {
    if (typeof document === "undefined") return;
    isLockedRef.current = true;
    const b = document.body.style;
    if (b.position !== "fixed") {
      b.position = "fixed";
      b.top = "0px";
      b.left = "0px";
      b.right = "0px";
      b.width = "100%";
      b.height = "100%";
      b.overscrollBehavior = "none";
    }
  }, []);

  const scrollToNextSection = useCallback(() => {
    releaseLock();
    setTimeout(() => {
      const stats = document.getElementById("stats");
      if (stats) {
        stats.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
    }, 50);
  }, [releaseLock]);

  const stopAll = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (videoFwdRef.current && !videoFwdRef.current.paused) videoFwdRef.current.pause();
    if (videoRevRef.current && !videoRevRef.current.paused) videoRevRef.current.pause();
    isTransitioningRef.current = false;
    setIsTransitioning(false);
  }, []);

  // ─────────────────────────────────────────────────────────
  // Video Milestone Transit Loop (0 React re-renders)
  // ─────────────────────────────────────────────────────────
  const transitionToMilestone = useCallback(
    (targetIndex: number) => {
      const vFwd = videoFwdRef.current;
      const vRev = videoRevRef.current;
      if (!vFwd) return;

      const clampedTarget = Math.max(0, Math.min(VIDEO_TIMESTAMPS.length - 1, targetIndex));
      targetMilestoneRef.current = clampedTarget;
      const targetTime = VIDEO_TIMESTAMPS[clampedTarget];
      const fromMilestone = currentMilestoneRef.current;

      if (clampedTarget === fromMilestone && !isTransitioningRef.current) return;

      const isForward = clampedTarget > fromMilestone;
      stopAll();

      isTransitioningRef.current = true;
      setIsTransitioning(true);

      currentMilestoneRef.current = clampedTarget;
      setCurrentMilestone(clampedTarget);

      if (isForward) {
        setActiveSide("fwd");
        if (vRev && !vRev.paused) vRev.pause();

        vFwd.playbackRate = 1.05;
        const playPromise = vFwd.play();
        if (playPromise) playPromise.catch(() => { });

        let hasDecelerated = false;

        const stepFwd = () => {
          if (!vFwd) return;
          const curr = vFwd.currentTime;

          if (progressLineRef.current) {
            const pct = Math.min(100, Math.max(0, (curr / VIDEO_DURATION) * 100));
            progressLineRef.current.style.width = `${pct}%`;
          }

          const remaining = targetTime - curr;

          if (!hasDecelerated && remaining <= 0.35 && remaining > 0.05) {
            vFwd.playbackRate = 0.65;
            hasDecelerated = true;
          }

          if (curr >= targetTime - 0.04 || remaining <= 0) {
            vFwd.pause();
            vFwd.currentTime = targetTime;
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${Math.min(100, (targetTime / VIDEO_DURATION) * 100)}%`;
            }
            if (vRev) {
              vRev.currentTime = Math.max(0.001, Math.min(VIDEO_DURATION, VIDEO_DURATION - targetTime));
            }
            isTransitioningRef.current = false;
            setIsTransitioning(false);
            return;
          }

          rafIdRef.current = requestAnimationFrame(stepFwd);
        };
        rafIdRef.current = requestAnimationFrame(stepFwd);
      } else {
        const currFwd = vFwd.currentTime;
        if (vRev && vRev.readyState >= 1) {
          setActiveSide("rev");
          if (vFwd && !vFwd.paused) vFwd.pause();

          const revTargetTime = Math.max(0.001, VIDEO_DURATION - targetTime);
          const startRevTime = Math.max(0.001, VIDEO_DURATION - currFwd);
          vRev.currentTime = startRevTime;
          vRev.playbackRate = 1.05;

          const playPromise = vRev.play();
          if (playPromise) playPromise.catch(() => { });

          let hasDecelerated = false;

          const stepRev = () => {
            if (!vRev) return;
            const revCurr = vRev.currentTime;
            const equivFwd = Math.max(0, VIDEO_DURATION - revCurr);

            if (progressLineRef.current) {
              const pct = Math.min(100, Math.max(0, (equivFwd / VIDEO_DURATION) * 100));
              progressLineRef.current.style.width = `${pct}%`;
            }

            const remaining = revTargetTime - revCurr;

            if (!hasDecelerated && remaining <= 0.35 && remaining > 0.05) {
              vRev.playbackRate = 0.65;
              hasDecelerated = true;
            }

            if (revCurr >= revTargetTime - 0.04 || remaining <= 0) {
              vRev.pause();
              vRev.currentTime = revTargetTime;
              vFwd.currentTime = targetTime;
              setActiveSide("fwd");
              if (progressLineRef.current) {
                progressLineRef.current.style.width = `${Math.min(100, (targetTime / VIDEO_DURATION) * 100)}%`;
              }
              isTransitioningRef.current = false;
              setIsTransitioning(false);
              return;
            }

            rafIdRef.current = requestAnimationFrame(stepRev);
          };
          rafIdRef.current = requestAnimationFrame(stepRev);
        } else {
          vFwd.pause();
          vFwd.currentTime = targetTime;
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${Math.min(100, (targetTime / VIDEO_DURATION) * 100)}%`;
          }
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        }
      }
    },
    [stopAll]
  );

  // ─────────────────────────────────────────────────────────
  // Master Scroll State Machine (Intro -> Docked -> Video)
  // ─────────────────────────────────────────────────────────
  const handleScrollGesture = useCallback(
    (direction: "down" | "up") => {
      const now = performance.now();
      if (now - lastScrollTriggerTimeRef.current < 450) return;
      lastScrollTriggerTimeRef.current = now;

      const stage = heroStageRef.current;
      const milestone = currentMilestoneRef.current;

      if (direction === "down") {
        if (stage === "hero-intro") {
          // 1. First scroll down: Dock the processor onto the pedestal
          setHeroStage("docked");
        } else if (stage === "docked") {
          // 2. Second scroll down: Switch to video and play to Milestone 1
          setHeroStage("video");
          transitionToMilestone(1);
        } else if (stage === "video") {
          // 3. Inside video: advance to next milestone or exit to #stats
          if (milestone < VIDEO_TIMESTAMPS.length - 1) {
            transitionToMilestone(milestone + 1);
          } else {
            scrollToNextSection();
          }
        }
      } else {
        // Reverse scroll
        if (stage === "video") {
          if (milestone > 1) {
            transitionToMilestone(milestone - 1);
          } else if (milestone === 1) {
            transitionToMilestone(0);
            setTimeout(() => setHeroStage("docked"), 300);
          } else {
            setHeroStage("docked");
          }
        } else if (stage === "docked") {
          // Return from docked to initial interactive Hero
          setHeroStage("hero-intro");
        }
      }
    },
    [transitionToMilestone, scrollToNextSection]
  );

  // Set up locked scroll listeners
  useEffect(() => {
    const vFwd = videoFwdRef.current;
    const vRev = videoRevRef.current;
    const section = sectionRef.current;
    if (!vFwd || !section) return;

    const init = () => {
      vFwd.currentTime = Math.max(0.001, VIDEO_TIMESTAMPS[0]);
      if (vRev) vRev.currentTime = Math.max(0.001, VIDEO_DURATION - VIDEO_TIMESTAMPS[0]);
    };

    vFwd.addEventListener("loadedmetadata", init);
    if (vFwd.readyState >= 1) init();

    if (window.scrollY <= 10) {
      engageLock();
    }

    const onWheel = (e: WheelEvent) => {
      const absDelta = Math.abs(e.deltaY);
      const isDown = e.deltaY > 0;

      // When at the very end of video and scrolling down, release page lock
      if (
        heroStageRef.current === "video" &&
        currentMilestoneRef.current >= VIDEO_TIMESTAMPS.length - 1 &&
        isDown
      ) {
        releaseLock();
        return;
      }

      if (!isLockedRef.current) {
        if (window.scrollY <= 5 && !isDown) {
          engageLock();
          handleScrollGesture("up");
          e.preventDefault();
        }
        return;
      }

      if (absDelta > 15) {
        handleScrollGesture(isDown ? "down" : "up");
        e.preventDefault();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? touchStartY;
      const totalDelta = touchStartY - currentY;
      const isDown = totalDelta > 0;

      if (
        heroStageRef.current === "video" &&
        currentMilestoneRef.current >= VIDEO_TIMESTAMPS.length - 1 &&
        isDown
      ) {
        releaseLock();
        return;
      }

      if (!isLockedRef.current) return;

      if (Math.abs(totalDelta) > 35) {
        touchStartY = currentY;
        handleScrollGesture(isDown ? "down" : "up");
        if (e.cancelable) e.preventDefault();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isLockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "ArrowRight") {
        e.preventDefault();
        handleScrollGesture("down");
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handleScrollGesture("up");
      } else if (e.key === "Escape" || e.key === "End") {
        e.preventDefault();
        scrollToNextSection();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      stopAll();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      releaseLock();
    };
  }, [engageLock, releaseLock, handleScrollGesture, scrollToNextSection, stopAll]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "calc(100dvh - 68px)",
        width: "100%",
        overflow: "hidden",
        backgroundColor: heroStage === "hero-intro" ? "#f4f8fb" : "#d8e4ea",
        backgroundImage: heroStage === "hero-intro"
          ? "radial-gradient(circle at 72% 50%, rgba(56, 189, 248, 0.16) 0%, rgba(0, 114, 188, 0.06) 40%, rgba(244, 248, 251, 0) 70%), radial-gradient(circle at 10% 20%, rgba(0, 114, 188, 0.04) 0%, transparent 40%)"
          : undefined,
        touchAction: "none",
        ...style,
      }}
    >
      <style jsx>{`
        @keyframes gentleFloatHero {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-${PROCESSOR_CONFIG.floatingPx}px) rotate(0.4deg);
          }
        }
        @keyframes gentleFloatDocked {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-${PROCESSOR_CONFIG.dockedFloatingPx}px);
          }
        }
        .animate-processor-float-hero {
          animation: gentleFloatHero ${PROCESSOR_CONFIG.floatingDurationSec}s ease-in-out infinite;
        }
        .animate-processor-float-docked {
          animation: gentleFloatDocked ${PROCESSOR_CONFIG.dockedFloatingDurationSec}s ease-in-out infinite;
        }
      `}</style>

      {/* Tech Grid Backdrop Pattern for Initial Hero Stage */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          heroStage === "hero-intro" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: "radial-gradient(rgba(0, 114, 188, 0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ────────────────────────────────────────────────────────
          BASE PEDESTAL BACKGROUND LAYER (Reveals ONLY when Docked)
         ──────────────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out z-5 ${
          heroStage === "docked" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/assets/images/hero-pedestal.jpg"
          alt="Suffix IT Pedestal Stage"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#d8e4ea]/20 via-transparent to-[#d8e4ea]/30" />
      </div>

      {/* ────────────────────────────────────────────────────────
          INTERACTIVE FLOATING & DOCKING PROCESSOR
         ──────────────────────────────────────────────────────── */}
      <div
        className={`absolute pointer-events-none z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          heroStage === "video" ? "opacity-0 scale-95" : "opacity-100"
        }`}
        style={
          heroStage === "hero-intro"
            ? {
                // Initial Hero state: compact, balanced right position with ambient float
                top: PROCESSOR_CONFIG.heroTop,
                left: PROCESSOR_CONFIG.heroLeft,
                transform: `translate(-50%, -50%) scale(${PROCESSOR_CONFIG.heroScale || 0.68})`,
              }
            : {
                // Docked state: centered on top of the 3-tiered pedestal (user-calibrated 60%, -38px)
                top: PROCESSOR_CONFIG.top,
                left: PROCESSOR_CONFIG.left,
                transform: `translate(-50%, -50%) translate(${PROCESSOR_CONFIG.offsetX}, ${PROCESSOR_CONFIG.offsetY}) scale(${PROCESSOR_CONFIG.scale || 1.0})`,
                opacity: 1,
              }
        }
      >
        <div
          className={`relative transition-transform duration-500 ${
            heroStage === "hero-intro"
              ? "animate-processor-float-hero"
              : heroStage === "docked"
                ? "animate-processor-float-docked"
                : ""
          }`}
        >
          {/* Ambient Sapphire Glow */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-[#0072bc]/35 via-[#38bdf8]/25 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Tech Orbital Ring in Hero State */}
          {heroStage === "hero-intro" && (
            <div className="absolute -inset-12 rounded-full border border-[#0072bc]/15 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none" />
          )}

          {/* Transparent Processor PNG (Configurable Width & Height) */}
          <div
            className="relative drop-shadow-[0_25px_60px_rgba(0,114,188,0.3)]"
            style={{
              width: PROCESSOR_CONFIG.width,
              height: PROCESSOR_CONFIG.height,
            }}
          >
            <Image
              src="/assets/images/hero-processor.png"
              alt="Suffix IT Neural Architecture Processor"
              fill
              priority
              unoptimized
              className="object-contain"
            />
          </div>

          {/* Floating Telemetry Enterprise Widgets (Visible in Intro Hero) */}
          <div
            className={`transition-all duration-500 ${
              heroStage === "hero-intro" ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
            }`}
          >
            {/* Top-Left Telemetry Card */}
            <div className="hidden lg:flex absolute -top-8 -left-20 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_12px_32px_rgba(0,114,188,0.14)]">
              <div className="w-8 h-8 rounded-xl bg-[#0072bc]/10 text-[#0072bc] flex items-center justify-center">
                <Cpu className="size-4" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-extrabold text-slate-900 tracking-tight">Core Architecture</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">100k+ TPS Concurrency</span>
              </div>
            </div>

            {/* Bottom-Right Telemetry Card */}
            <div className="hidden lg:flex absolute -bottom-8 -right-16 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_12px_32px_rgba(0,114,188,0.14)]">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Zap className="size-4" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-extrabold text-slate-900 tracking-tight block">Rupantar ERP &amp; HCM</span>
                <span className="text-[10px] font-semibold text-slate-500">Real-Time Sync Engine</span>
              </div>
            </div>

            {/* Middle-Left SLA Pill Badge */}
            <div className="hidden xl:flex absolute top-1/2 -left-24 -translate-y-1/2 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-sm text-[11px] font-bold text-slate-700">
              <ShieldCheck className="size-3.5 text-[#0072bc]" />
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          STAGE 0: WORLD-CLASS ENTERPRISE HERO CONTENT
         ──────────────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto transition-all duration-600 ease-out pointer-events-none ${heroStage === "hero-intro"
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
      >
        <div className="max-w-xl lg:max-w-2xl text-left pointer-events-auto">
          {/* Executive Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/95 text-xs font-extrabold text-[#0072bc] shadow-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-[#0072bc] animate-ping" />
            <span>Dhaka, Bangladesh · Global Enterprise Engineering</span>
          </div>

          {/* Main Hero Headline */}
          <h1
            style={{ fontFamily: SANS }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#17162a] tracking-tight leading-[1.08] mb-5 drop-shadow-xs"
          >
            Architecting <span className="text-[#0072bc]">High-Concurrency</span> Enterprise Platforms.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-7 font-medium max-w-xl">
            We engineer mission-critical ERP suites, Rupantar HCM, Field Force automation, and scalable cloud engines tailored precisely around your business workflows.
          </p>

          {/* Action Button & Scroll Prompt */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => handleScrollGesture("down")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#0072bc] hover:bg-[#005c99] shadow-lg shadow-[#0072bc]/30 transition-all hover:scale-105 cursor-pointer active:scale-95"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScrollGesture("down")}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-slate-700 hover:text-[#0072bc] bg-white/80 hover:bg-white border border-slate-200/80 backdrop-blur-md transition-all shadow-xs cursor-pointer"
            >
              <span>Scroll to Begin Video</span>
              <ChevronDown className="size-4 animate-bounce text-[#0072bc]" />
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-300/60 text-xs font-bold text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/70 backdrop-blur-xs border border-white">
              <ShieldCheck className="size-3.5 text-[#0072bc]" /> 99.9% Core SLA
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/70 backdrop-blur-xs border border-white">
              <Zap className="size-3.5 text-amber-500" /> High-Concurrency Architecture
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/70 backdrop-blur-xs border border-white">
              <Activity className="size-3.5 text-emerald-600" /> 24/7 Managed Cloud
            </span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          STAGE 2: DUAL HARDWARE-ACCELERATED VIDEO PLAYERS
         ──────────────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${heroStage === "video" ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
      >
        {/* Forward Video */}
        <video
          ref={videoFwdRef}
          src={videoSrc}
          poster={poster}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 pointer-events-none ${activeSide === "fwd" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          style={{ transform: "translate3d(0, 0, 0)", willChange: "transform, opacity", touchAction: "none" }}
        />

        {/* Reverse Video */}
        <video
          ref={videoRevRef}
          src={reverseVideoSrc}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 pointer-events-none ${activeSide === "rev" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          style={{ transform: "translate3d(0, 0, 0)", willChange: "transform, opacity", touchAction: "none" }}
        />
      </div>

      {/* Vignette Gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#d8e4ea]/30 to-transparent z-15" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1e36]/15 to-transparent z-15" />

      {/* ────────────────────────────────────────────────────────
          3 MILESTONE HUD CARDS (Visible in Docked & Video stages)
         ──────────────────────────────────────────────────────── */}
      {(heroStage === "video" || heroStage === "docked") && (
        <>
          {/* CARD 1: TIMESTAMP 1 (0.0s / Docked Pedestal Stage) */}
          <div
            className={`absolute top-6 sm:top-12 left-4 sm:left-10 lg:left-16 max-w-lg z-20 transition-all duration-500 ease-out ${heroStage === "docked" || currentMilestone === 0
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-10 pointer-events-none"
              }`}
          >
            <div className="bg-white/95 backdrop-blur-md border border-[#dce9f6] p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,114,188,0.14)]">
              <div className="flex items-center gap-2 mb-3.5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#0072bc]/10 text-[#0072bc] border border-[#0072bc]/25 tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#0072bc] animate-ping" />
                  Dhaka, Bangladesh · Global Standards
                </span>
              </div>

              <h2
                style={{ fontFamily: SANS }}
                className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#17162a] tracking-tight leading-[1.12] mb-3.5"
              >
                We build software solutions that{" "}
                <span className="text-[#0072bc]">power your business.</span>
              </h2>

              <p className="text-[#4a5568] text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                Suffix IT designs, engineers, and deploys high-concurrency ERP, Rupantar HCM, Field Force, and custom digital systems tailored to your unique workflow.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setHeroStage("video");
                    transitionToMilestone(1);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0072bc] hover:bg-[#005c99] shadow-lg shadow-[#0072bc]/25 transition-all hover:scale-105 cursor-pointer"
                >
                  <span>Explore Platforms</span>
                  <span>→</span>
                </button>
                <div className="flex items-center gap-2 text-[11px] text-[#515978] font-bold">
                  <span className={`w-2 h-2 rounded-full transition-colors ${isTransitioning ? "bg-[#0072bc] animate-ping" : "bg-emerald-500"}`} />
                  <span>
                    {isTransitioning
                      ? "Travelling..."
                      : heroStage === "docked"
                        ? "Scroll down to start video walkthrough ↓"
                        : "Scroll down to advance ↓"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: TIMESTAMP 2 (2.0s) */}
          <div
            className={`absolute top-6 sm:top-12 left-4 sm:left-10 lg:left-16 max-w-md z-20 transition-all duration-500 ease-out ${heroStage === "video" && currentMilestone === 1
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-10 pointer-events-none"
              }`}
          >
            <div className="bg-white/95 backdrop-blur-md border border-[#dce9f6] p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,114,188,0.14)]">
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/25 uppercase tracking-wider">
                  Phase 02 · Integrated Platforms
                </span>
                <span className="text-xs font-bold text-[#8a99ad]">Milestone 2 / 3</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17162a] tracking-tight mb-2.5">
                Rupantar ERP &amp; Field Force Automation
              </h2>

              <p className="text-[#515978] text-xs sm:text-sm leading-relaxed mb-4">
                Unified multi-warehouse stock synchronization, statutory financial accounting, and live GPS field sales telemetry connecting teams directly to leadership.
              </p>

              <div className="space-y-2 mb-5">
                {[
                  "Multi-Warehouse Inventory & Supply Chain",
                  "Automated VAT & General Ledger Accounting",
                  "Live Field Force Telemetry & Offline Sync",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs font-bold text-[#17162a]">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#ebf2fa]">
                <button
                  type="button"
                  onClick={() => {
                    transitionToMilestone(0);
                    setTimeout(() => setHeroStage("docked"), 300);
                  }}
                  className="text-xs font-bold text-[#515978] hover:text-[#0072bc] cursor-pointer"
                >
                  ↑ Back to Start
                </button>
                <button
                  type="button"
                  onClick={() => transitionToMilestone(2)}
                  className="text-xs font-bold text-[#0072bc] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Next: Scale &amp; Growth ↓
                </button>
              </div>
            </div>
          </div>

          {/* CARD 3: TIMESTAMP 3 (7.6s) */}
          <div
            className={`absolute top-6 sm:top-10 left-4 sm:left-10 lg:left-16 max-w-lg z-20 transition-all duration-500 ease-out ${heroStage === "video" && currentMilestone === 2
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-10 pointer-events-none"
              }`}
          >
            <div className="bg-white/95 backdrop-blur-md border border-[#dce9f6] p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,114,188,0.15)]">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#0072bc]/10 text-[#0072bc] border border-[#0072bc]/25 uppercase tracking-wider">
                  Phase 03 · Enterprise Scale
                </span>
                <span className="text-xs font-bold text-emerald-600">✓ Suffix IT Blossom</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17162a] tracking-tight leading-tight mb-3">
                Engineered for scale, <span className="text-[#0072bc]">built to lead.</span>
              </h2>

              <p className="text-[#515978] text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                Whether you need turnkey software platforms or bespoke cloud architecture, Suffix IT empowers forward-thinking enterprises with proven 24/7 reliability.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0072bc] hover:bg-[#005c99] shadow-lg shadow-[#0072bc]/30 transition-all hover:scale-105"
                >
                  <span>Get Free Consultation</span>
                  <span>→</span>
                </a>
                <button
                  type="button"
                  onClick={scrollToNextSection}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#0072bc] bg-[#f0f6fd] hover:bg-[#e1effc] border border-[#cfe2f7] transition-all hover:scale-105 cursor-pointer"
                >
                  <span>Continue to Site ↓</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#ebf2fa] text-xs text-[#515978] font-bold">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f8fbfe] border border-[#e1edf9]">
                  <Icon name="settings" size={13} className="text-[#0072bc]" /> Custom Dev
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f8fbfe] border border-[#e1edf9]">
                  <Icon name="layers" size={13} className="text-[#0072bc]" /> Ready Products
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f8fbfe] border border-[#e1edf9]">
                  <Icon name="cloud" size={13} className="text-[#0072bc]" /> Managed Cloud
                </span>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────
              BOTTOM TIMELINE CAPSULE HUD
             ──────────────────────────────────────────────────────── */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
            <div className="w-56 sm:w-72 h-1 bg-white/60 backdrop-blur-md rounded-full overflow-hidden shadow-sm">
              <div
                ref={progressLineRef}
                className="h-full bg-gradient-to-r from-[#0072bc] to-[#3cb4f0] will-change-[width]"
                style={{ width: "0%" }}
              />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5 bg-white/95 backdrop-blur-md px-3 sm:px-5 py-2 rounded-full border border-white/95 shadow-[0_8px_30px_rgba(0,114,188,0.14)]">
              {MILESTONES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    if (heroStage === "docked") {
                      if (m.id === 0) return;
                      setHeroStage("video");
                      transitionToMilestone(m.id);
                    } else {
                      if (m.id === 0) {
                        transitionToMilestone(0);
                        setTimeout(() => setHeroStage("docked"), 300);
                      } else {
                        transitionToMilestone(m.id);
                      }
                    }
                  }}
                  className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    (heroStage === "docked" && m.id === 0) ||
                    (heroStage === "video" && currentMilestone === m.id)
                      ? "bg-[#0072bc] text-white shadow-md shadow-[#0072bc]/25 scale-105"
                      : "text-[#515978] hover:text-[#0072bc] hover:bg-white/70"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      (heroStage === "docked" && m.id === 0) ||
                      (heroStage === "video" && currentMilestone === m.id)
                        ? "bg-white"
                        : "bg-[#9db1c7] group-hover:bg-[#0072bc]"
                    }`}
                  />
                  <span className="hidden sm:inline">{m.label}</span>
                  <span className="sm:hidden">{m.id + 1}</span>
                </button>
              ))}

              <div className="h-4 w-[1px] bg-[#d2e4f7] mx-1" />

              <button
                type="button"
                onClick={scrollToNextSection}
                className="flex items-center gap-1 text-xs font-extrabold text-[#0072bc] hover:underline pl-1 cursor-pointer"
              >
                <span>Continue ↓</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Top-Right Direct Skip Shortcut */}
      <button
        type="button"
        onClick={scrollToNextSection}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-40 bg-white/85 hover:bg-white backdrop-blur-md border border-[#cde0f5] text-[#0072bc] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-extrabold cursor-pointer shadow-sm hover:shadow-md transition-all"
      >
        Skip intro ↓
      </button>

      {/* Bottom-Right Enterprise Badge */}
      <div className="hidden md:flex absolute bottom-5 right-6 z-30 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#dce9f6] shadow-sm text-[11px] font-semibold text-[#515978]">
        <span className="w-2 h-2 rounded-full bg-[#0072bc]" />
        <span>Suffix IT · Enterprise Digital Solutions</span>
      </div>
    </div>
  );
}
