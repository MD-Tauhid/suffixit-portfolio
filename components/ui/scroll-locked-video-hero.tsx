"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Cpu, Zap, Activity } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Suffix IT — Next-Gen Interactive Hero & Continuous Video Engine
// ─────────────────────────────────────────────────────────────
// Features:
// 1. Interactive 3-Stage Orchestration:
//    - Stage 0 ("hero-intro"): Executive tech hero with floating neural processor
//    - Stage 1 ("docked"): Smooth slide & docking of processor onto 3-tiered pedestal center
//    - Stage 2 ("video"): Continuous Direction-Driven Dual-Engine 60fps Video Playback
// 2. Continuous Direction-Driven Scrubbing (No rigid milestone locks):
//    - Scroll DOWN -> Plays forward continuously.
//    - Scroll UP -> Plays in reverse continuously from exact frame.
//    - Stop scrolling -> Pauses immediately at that exact frame without sluggish frame drops.
// 3. Dynamic Velocity Detection (3 High-Performance Speed Modes with LERP easing):
//    - Normal (1.5x) <-> Fast (2.4x) <-> Turbo (3.2x)
//    - Responsive scroll tuning: section finishes with only 5-6 comfortable scrolls
// 4. Glitch-Free Seamless Video Switcher:
//    - Math-paired frame alignment (8.083333 - t)
//    - Zero stale-frame flashes: opposite video only revealed after verified hardware seeked event
// 5. Dual Hardware-Accelerated Video Elements (Forward + Reverse for instant reverse)
// 6. Liquid Glass HUD cards & Timeline Capsule sync in real-time with physical playback
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// 📍 USER CONFIGURABLE: PROCESSOR MANUAL POSITION & SIZE (Lines 29 - 58)
// এখান থেকে আপনি প্রসেসরের Height, Width, Scale এবং Position সহজেই পরিবর্তন করতে পারবেন:
// ─────────────────────────────────────────────────────────────
export const PROCESSOR_CONFIG = {
  // ১. পেডেস্টালের ওপর ডক হওয়ার পজিশন ও সাইজ:
  top: "59%",        // পেডেস্টালের ওপর সেন্টারিং (আপনার পারফেক্ট পজিশন)
  left: "50%",       // ডানে-বামে সেন্টারিং
  offsetY: "-43px",  // সূক্ষ্ম পিক্সেল অফসেট Y (৫ পিক্সেল উঁচুতে সমন্বয়কৃত)
  offsetX: "0px",    // সূক্ষ্ম পিক্সেল অফসেট X
  scale: 1.0,        // ডকিং সাইজ স্কেল

  // ২. পেডেস্টালে ফ্লোটিং নড়াচড়া (Breathing/Hover on Pedestal):
  dockedFloatingPx: 8,            // পেডেস্টালের ওপর কতটুকু উপরে-নিচে নড়াচড়া করবে (+-8px)
  dockedFloatingDurationSec: 3.0, // পেডেস্টালে ভাসার স্পিড (সেকেন্ড)

  // ৩. প্রসেসরের সরাসরি প্রস্থ ও উচ্চতা (Height & Width):
  width: "clamp(420px, 46vw, 760px)",   // প্রস্থ
  height: "clamp(420px, 46vw, 760px)",  // উচ্চতা

  // ৪. শুরুতে হিরো স্টেটের পজিশন ও সাইজ (Compact & Balanced):
  heroTop: "50%",    // হিরো স্টেটে প্রসেসরের টপ পজিশন
  heroLeft: "70%",   // হিরো স্টেটে প্রসেসরের লেফট পজিশন
  heroScale: 0.68,   // হিরো স্টেটে কমপ্যাক্ট আধুনিক সাইজ (স্ক্রোলে বড় হয়ে পেডেস্টালে বসবে)
  floatingPx: 10,    // হিরো স্টেটে ফ্লোটিং এমপ্লিটিউড (+-10px)
  floatingDurationSec: 3.5, // হিরো স্টেটে ভাসার স্পিড
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
// 📍 VIDEO DURATION & CHAPTER TIMESTAMPS (Exact 195 Frames @ 24fps)
// ─────────────────────────────────────────────────────────────
export const VIDEO_DURATION = 8.083333; // 194 / 24 = 8.083333s (exact pairing constant)

// 📍 NO-STOP AESTHETIC DEADZONE (2.42s - 4.70s)
// Video will NEVER stop inside this range; it automatically glides through
export const BYPASS_DEADZONE = {
  start: 2.42,
  end: 4.70,
};

export const VIDEO_TIMESTAMPS: number[] = [
  0.0,   // Timestamp 1 (Chapter 0): Microchip on base (Docked / Foundation)
  2.0,   // Timestamp 2 (Chapter 1): Optical green cables elevate (Rupantar ERP & Field Force)
  4.70,  // Timestamp 3 (Chapter 2): Optical trunk & cloud telemetry (Cloud & High-Throughput Architecture)
  7.4,   // Timestamp 4 (Chapter 3): Suffix IT digital tree & ecosystem blossom (Engineered for scale)
];

export interface ChapterData {
  id: number;
  startTime: number;
  endTime: number;
  label: string;
  badge: string;
}

export const CHAPTERS: ChapterData[] = [
  { id: 0, startTime: 0.0, endTime: 2.0, label: "01 Foundation", badge: "Technology Partner" },
  { id: 1, startTime: 2.0, endTime: 4.70, label: "02 Enterprise Core", badge: "Integrated Platforms" },
  { id: 2, startTime: 4.70, endTime: 7.4, label: "03 Cloud Infrastructure", badge: "Cloud & Telemetry" },
  { id: 3, startTime: 7.4, endTime: 8.083333, label: "04 Suffix IT Scale", badge: "Enterprise Growth" },
];

export const MILESTONES = CHAPTERS.map((ch) => ({
  id: ch.id,
  timestamp: ch.startTime,
  label: ch.label,
  badge: ch.badge,
}));

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
const DEFAULT_POSTER = "/assets/video/hero4-poster.jpg";
const SANS = "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif)";

export type HeroStage = "hero-intro" | "docked" | "video";
export type SpeedMode = "normal" | "fast" | "more-fast";

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
  // 2. "docked": Processor docks onto pedestal center
  // 3. "video": Continuous direction-driven video engine
  const [heroStage, setHeroStage] = useState<HeroStage>("hero-intro");
  const heroStageRef = useRef<HeroStage>("hero-intro");

  // Continuous Playback State
  const [currentTime, setCurrentTime] = useState(0.001);
  const [activeSide, setActiveSide] = useState<"fwd" | "rev">("fwd");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMode, setSpeedMode] = useState<SpeedMode>("normal");

  // Zero-latency mutable refs
  const currentTimeRef = useRef(0.001);
  const activeSideRef = useRef<"fwd" | "rev">("fwd");
  const isPlayingRef = useRef(false);
  const isLockedRef = useRef(true);
  const isSeekingRef = useRef(false);
  const isUserActivelyScrollingRef = useRef(false);
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafTrackerRef = useRef<number | null>(null);
  const programmaticTargetRef = useRef<number | null>(null);

  // Velocity tracking & smoothing refs
  const lastScrollTimeRef = useRef(0);
  const currentVelocityRef = useRef(0);
  const targetSpeedRef = useRef(2.0);
  const currentPlaybackSpeedRef = useRef(2.0);

  // Keep refs in sync
  useEffect(() => {
    heroStageRef.current = heroStage;
  }, [heroStage]);

  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  useEffect(() => {
    activeSideRef.current = activeSide;
  }, [activeSide]);

  // Determine current active chapter index (0, 1, 2, or 3)
  const activeChapter = CHAPTERS.findIndex(
    (ch) => currentTime >= ch.startTime && currentTime < ch.endTime
  );
  const currentMilestone = activeChapter === -1 ? (currentTime >= 7.4 ? 3 : 0) : activeChapter;

  // Release page lock so normal document scrolling can occur
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

  // Engage body lock to keep hero pinned during walkthrough
  const engageLock = useCallback(() => {
    if (typeof document === "undefined") return;
    if (window.scrollY > 40) return;
    isLockedRef.current = true;
    const b = document.body.style;
    b.position = "fixed";
    b.top = "0px";
    b.left = "0px";
    b.right = "0px";
    b.width = "100%";
    b.height = "100%";
    b.overscrollBehavior = "none";
  }, []);

  // Smooth scroll to next section (#stats or following element)
  const scrollToNextSection = useCallback(() => {
    releaseLock();
    setTimeout(() => {
      const statsEl = document.getElementById("stats");
      if (statsEl) {
        statsEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
      const heroEl = document.getElementById("hero");
      if (heroEl?.nextElementSibling) {
        (heroEl.nextElementSibling as HTMLElement).scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
    }, 50);
  }, [releaseLock]);

  // Pause all video playback immediately
  const pauseAll = useCallback(() => {
    const vFwd = videoFwdRef.current;
    const vRev = videoRevRef.current;

    if (vFwd && !vFwd.paused) vFwd.pause();
    if (vRev && !vRev.paused) vRev.pause();

    isPlayingRef.current = false;
    setIsPlaying(false);

    // Reset speed target to base
    targetSpeedRef.current = 2.0;
    currentPlaybackSpeedRef.current = 2.0;
    currentVelocityRef.current = 0;
    setSpeedMode("normal");

    if (rafTrackerRef.current !== null) {
      cancelAnimationFrame(rafTrackerRef.current);
      rafTrackerRef.current = null;
    }

    // Pre-seek opposite video silently in background to exact math frame
    const current = currentTimeRef.current;
    if (activeSideRef.current === "fwd" && vRev) {
      try {
        const revTarget = Math.max(0.001, Math.min(VIDEO_DURATION, VIDEO_DURATION - current));
        vRev.currentTime = revTarget;
      } catch { }
    } else if (activeSideRef.current === "rev" && vFwd) {
      try {
        const fwdTarget = Math.max(0.001, Math.min(VIDEO_DURATION, current));
        vFwd.currentTime = fwdTarget;
      } catch { }
    }
  }, []);

  // Start continuous RAF sync loop to update UI state and smooth playbackRate
  const startRafTracker = useCallback(() => {
    if (rafTrackerRef.current !== null) return;

    const track = () => {
      const vFwd = videoFwdRef.current;
      const vRev = videoRevRef.current;

      // ─────────────────────────────────────────────────────────
      // SMOOTH LERP INTERPOLATION FOR PLAYBACK SPEED
      // Smoothly glides between 2.0x <-> 3.0x <-> 4.0x without robotic jumps
      // ─────────────────────────────────────────────────────────
      const lerpFactor = 0.15;
      currentPlaybackSpeedRef.current +=
        (targetSpeedRef.current - currentPlaybackSpeedRef.current) * lerpFactor;

      const smoothSpeed = Math.min(4.2, Math.max(1.5, currentPlaybackSpeedRef.current));

      if (vFwd && !vFwd.paused) {
        try {
          vFwd.playbackRate = smoothSpeed;
        } catch { }
      }
      if (vRev && !vRev.paused) {
        try {
          vRev.playbackRate = smoothSpeed;
        } catch { }
      }

      // Calculate forward normalized timestamp
      let calculatedFwdTime = currentTimeRef.current;

      if (activeSideRef.current === "fwd" && vFwd) {
        calculatedFwdTime = Math.min(VIDEO_DURATION, Math.max(0.001, vFwd.currentTime));
      } else if (activeSideRef.current === "rev" && vRev) {
        calculatedFwdTime = Math.min(
          VIDEO_DURATION,
          Math.max(0.001, VIDEO_DURATION - vRev.currentTime)
        );
      }

      currentTimeRef.current = calculatedFwdTime;
      setCurrentTime(calculatedFwdTime);

      if (progressLineRef.current) {
        const pct = Math.min(100, Math.max(0, (calculatedFwdTime / VIDEO_DURATION) * 100));
        progressLineRef.current.style.width = `${pct}%`;
      }

      // Handle programmatic target seek (chapter button click or deadzone auto-cruise)
      if (programmaticTargetRef.current !== null) {
        const target = programmaticTargetRef.current;
        const isFwd = activeSideRef.current === "fwd";
        const reached = isFwd
          ? calculatedFwdTime >= target - 0.04
          : calculatedFwdTime <= target + 0.04;

        if (reached) {
          programmaticTargetRef.current = null;
          // If user is NOT actively scrolling, settle smoothly at target
          if (!isUserActivelyScrollingRef.current) {
            pauseAll();
          }
        }
      }

      // Check boundary limits: video finished -> unlock page scroll
      if (calculatedFwdTime >= VIDEO_DURATION - 0.08) {
        if (vFwd && !vFwd.paused) vFwd.pause();
        if (vRev && !vRev.paused) vRev.pause();
        isPlayingRef.current = false;
        setIsPlaying(false);
        releaseLock();
      }

      if (isPlayingRef.current || programmaticTargetRef.current !== null) {
        rafTrackerRef.current = requestAnimationFrame(track);
      } else {
        rafTrackerRef.current = null;
      }
    };

    rafTrackerRef.current = requestAnimationFrame(track);
  }, [pauseAll, releaseLock]);

  // Play forward with verified glitch-free transition
  const playForward = useCallback(
    (speed: number = 2.0) => {
      const vFwd = videoFwdRef.current;
      const vRev = videoRevRef.current;
      if (!vFwd) return;

      if (currentTimeRef.current >= VIDEO_DURATION - 0.12) {
        releaseLock();
        return;
      }

      // If switching from reverse to forward:
      if (activeSideRef.current === "rev") {
        if (vRev && !vRev.paused) vRev.pause();
        const currentFwd = currentTimeRef.current;
        const targetFwd = Math.max(0.001, Math.min(VIDEO_DURATION, currentFwd));

        // Avoid showing un-seeked stale frame:
        if (Math.abs(vFwd.currentTime - targetFwd) > 0.06) {
          try {
            vFwd.currentTime = targetFwd;
          } catch { }

          const onFwdSeeked = () => {
            vFwd.removeEventListener("seeked", onFwdSeeked);
            activeSideRef.current = "fwd";
            setActiveSide("fwd");
            vFwd.muted = true;
            vFwd.playbackRate = speed;
            const p = vFwd.play();
            if (p !== undefined) p.catch(() => { });
            isPlayingRef.current = true;
            setIsPlaying(true);
            startRafTracker();
          };
          vFwd.addEventListener("seeked", onFwdSeeked, { once: true });
          return;
        } else {
          activeSideRef.current = "fwd";
          setActiveSide("fwd");
        }
      }

      vFwd.muted = true;
      vFwd.playbackRate = speed;
      if (vFwd.paused) {
        const p = vFwd.play();
        if (p !== undefined) p.catch(() => { });
      }

      isPlayingRef.current = true;
      setIsPlaying(true);
      startRafTracker();
    },
    [releaseLock, startRafTracker]
  );

  // Play in reverse with verified glitch-free transition
  const playReverse = useCallback(
    (speed: number = 2.0) => {
      const vFwd = videoFwdRef.current;
      const vRev = videoRevRef.current;

      if (currentTimeRef.current <= 0.06) {
        // Return back to docked stage smoothly
        pauseAll();
        setHeroStage("docked");
        return;
      }

      if (vRev && vRev.readyState >= 1) {
        // If switching from forward to reverse:
        if (activeSideRef.current === "fwd") {
          if (vFwd && !vFwd.paused) vFwd.pause();
          const currentFwd = currentTimeRef.current;
          const targetRev = Math.max(0.001, Math.min(VIDEO_DURATION, VIDEO_DURATION - currentFwd));

          // Avoid showing un-seeked stale frame:
          if (Math.abs(vRev.currentTime - targetRev) > 0.06) {
            try {
              vRev.currentTime = targetRev;
            } catch { }

            const onRevSeeked = () => {
              vRev.removeEventListener("seeked", onRevSeeked);
              activeSideRef.current = "rev";
              setActiveSide("rev");
              vRev.muted = true;
              vRev.playbackRate = speed;
              const p = vRev.play();
              if (p !== undefined) p.catch(() => { });
              isPlayingRef.current = true;
              setIsPlaying(true);
              startRafTracker();
            };
            vRev.addEventListener("seeked", onRevSeeked, { once: true });
            return;
          } else {
            activeSideRef.current = "rev";
            setActiveSide("rev");
          }
        }

        vRev.muted = true;
        vRev.playbackRate = speed;
        if (vRev.paused) {
          const p = vRev.play();
          if (p !== undefined) p.catch(() => { });
        }

        isPlayingRef.current = true;
        setIsPlaying(true);
        startRafTracker();
      } else if (vFwd) {
        vFwd.pause();
        if (!vFwd.seeking) {
          try {
            vFwd.currentTime = Math.max(0.001, vFwd.currentTime - 0.12);
            currentTimeRef.current = vFwd.currentTime;
            setCurrentTime(vFwd.currentTime);
          } catch { }
        }
      }
    },
    [pauseAll, startRafTracker]
  );

  // Stop input handler with Deadzone Bypass (2.42s - 4.70s)
  // If user stops scrolling inside [2.42, 4.70], video will NOT pause; it cruises through!
  const handleStopInput = useCallback(() => {
    isUserActivelyScrollingRef.current = false;
    const curr = currentTimeRef.current;

    // Check if inside the no-stop aesthetic deadzone [2.42, 4.70]
    if (curr >= BYPASS_DEADZONE.start && curr < BYPASS_DEADZONE.end) {
      if (activeSideRef.current === "fwd") {
        // Forward motion: Auto-cruise seamlessly to 4.70s
        programmaticTargetRef.current = BYPASS_DEADZONE.end;
        targetSpeedRef.current = 2.4;
        playForward(2.4);
      } else {
        // Reverse motion: Auto-cruise backward seamlessly to 2.42s
        programmaticTargetRef.current = BYPASS_DEADZONE.start;
        targetSpeedRef.current = 2.4;
        playReverse(2.4);
      }
      return;
    }

    pauseAll();
  }, [pauseAll, playForward, playReverse]);

  // Scroll active driver: fast completion with responsive velocity
  const handleScrollDrive = useCallback(
    (direction: "down" | "up", absDelta: number) => {
      isUserActivelyScrollingRef.current = true;
      programmaticTargetRef.current = null; // Manual scroll takes priority
      // 1. Stage handling: Intro -> Docked -> Video
      const stage = heroStageRef.current;

      if (stage === "hero-intro") {
        if (direction === "down") {
          setHeroStage("docked");
        }
        return;
      }

      if (stage === "docked") {
        if (direction === "down") {
          setHeroStage("video");
          playForward(2.0);
        } else {
          setHeroStage("hero-intro");
        }
        return;
      }

      // Stage === "video"
      // End of video check
      if (direction === "down" && currentTimeRef.current >= VIDEO_DURATION - 0.15) {
        releaseLock();
        return;
      }

      // Beginning of video check on reverse
      if (direction === "up" && currentTimeRef.current <= 0.06) {
        pauseAll();
        setHeroStage("docked");
        return;
      }

      // 2. Velocity Calculation: Measure scroll speed
      const now = performance.now();
      const dt = Math.max(10, now - (lastScrollTimeRef.current || now - 30));
      lastScrollTimeRef.current = now;

      const instVelocity = absDelta / dt;
      currentVelocityRef.current = currentVelocityRef.current * 0.35 + instVelocity * 0.65;
      const v = currentVelocityRef.current;

      // ─────────────────────────────────────────────────────────
      // BALANCED & CONTROLLED VIDEO SPEEDS:
      // Smooth, natural glide without abrupt leaps
      // Mode 1: Normal (1.5x) - Duration 280ms
      // Mode 2: Fast (2.2x)   - Duration 340ms
      // Mode 3: Turbo (2.8x)  - Duration 400ms
      // ─────────────────────────────────────────────────────────
      let playDuration = 280;
      if (v >= 2.8 || absDelta > 100) {
        targetSpeedRef.current = 2.8;
        setSpeedMode("more-fast");
        playDuration = 400;
      } else if (v >= 1.0 || absDelta > 45) {
        targetSpeedRef.current = 2.2;
        setSpeedMode("fast");
        playDuration = 340;
      } else {
        targetSpeedRef.current = 1.5;
        setSpeedMode("normal");
        playDuration = 280;
      }

      // 3. Playback Direction
      if (direction === "down") {
        playForward(targetSpeedRef.current);
      } else {
        playReverse(targetSpeedRef.current);
      }

      // 4. Pause Detection: Stop video once user stops active scrolling
      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }

      scrollStopTimerRef.current = setTimeout(() => {
        handleStopInput();
        scrollStopTimerRef.current = null;
      }, playDuration);
    },
    [playForward, playReverse, pauseAll, handleStopInput, releaseLock]
  );

  // Click handler to navigate to a specific chapter smoothly
  const navigateToChapter = useCallback(
    (chapterIndex: number) => {
      const targetChapter = CHAPTERS[chapterIndex];
      if (!targetChapter) return;

      const targetTime = targetChapter.startTime + 0.05;
      programmaticTargetRef.current = targetTime;
      targetSpeedRef.current = 2.6;

      if (heroStageRef.current !== "video") {
        setHeroStage("video");
      }

      if (targetTime > currentTimeRef.current) {
        playForward(2.6);
      } else {
        playReverse(2.6);
      }
    },
    [playForward, playReverse]
  );

  // Main Event Listeners
  useEffect(() => {
    const vFwd = videoFwdRef.current;
    const vRev = videoRevRef.current;
    const section = sectionRef.current;
    if (!vFwd || !section) return;

    vFwd.muted = true;
    vFwd.defaultMuted = true;
    if (vRev) {
      vRev.muted = true;
      vRev.defaultMuted = true;
    }

    const initTime = () => {
      if (vFwd.currentTime === 0) {
        try {
          vFwd.currentTime = 0.001;
        } catch { }
      }
      if (vRev && vRev.currentTime === 0) {
        try {
          // Pre-seek reverse video to match frame 0 (Foundation Pedestal)
          vRev.currentTime = VIDEO_DURATION - 0.001;
        } catch { }
      }
    };

    vFwd.addEventListener("loadedmetadata", initTime);
    vFwd.addEventListener("loadeddata", initTime);
    if (vRev) {
      vRev.addEventListener("loadedmetadata", initTime);
      vRev.addEventListener("loadeddata", initTime);
    }

    if (vFwd.readyState >= 1) {
      initTime();
    } else {
      try {
        vFwd.currentTime = 0.001;
      } catch { }
    }

    // Lock page on initial load if at top of page
    if (window.scrollY <= 10) {
      engageLock();
    }

    // Mouse wheel listener with velocity detection
    const onWheel = (e: WheelEvent) => {
      const absDelta = Math.abs(e.deltaY);

      // Case 1: Video is at the end and user scrolls DOWN -> Release lock
      if (currentTimeRef.current >= VIDEO_DURATION - 0.18 && e.deltaY > 0) {
        releaseLock();
        return;
      }

      // Case 2: Page is scrolled down and user scrolls back to the very top:
      if (!isLockedRef.current) {
        if (window.scrollY <= 5 && e.deltaY < -5) {
          engageLock();
          handleScrollDrive("up", absDelta);
          e.preventDefault();
        }
        return;
      }

      // Case 3: Pinned inside Hero: drive video continuously with speed detection
      if (absDelta > 2) {
        handleScrollDrive(e.deltaY > 0 ? "down" : "up", absDelta);
        e.preventDefault();
      }
    };

    // Touch gesture handlers for mobile
    let touchStartY = 0;
    let touchLastY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
      touchLastY = touchStartY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? touchStartY;
      const stepDelta = Math.abs(touchLastY - currentY);
      touchLastY = currentY;
      const totalDelta = touchStartY - currentY;

      if (currentTimeRef.current >= VIDEO_DURATION - 0.18 && totalDelta > 10) {
        releaseLock();
        return;
      }

      if (!isLockedRef.current) {
        if (window.scrollY <= 5 && totalDelta < -15) {
          engageLock();
          handleScrollDrive("up", stepDelta * 2.5);
          if (e.cancelable) e.preventDefault();
        }
        return;
      }

      if (Math.abs(totalDelta) > 5) {
        touchStartY = currentY;
        handleScrollDrive(totalDelta > 0 ? "down" : "up", stepDelta * 2.5);
        if (e.cancelable) e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      handleStopInput();
    };

    // Keyboard navigation (Arrow keys & Escape)
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isLockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        handleScrollDrive("down", 60);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handleScrollDrive("up", 60);
      } else if (e.key === "Escape" || e.key === "End") {
        e.preventDefault();
        scrollToNextSection();
      } else if (e.key === "Home") {
        e.preventDefault();
        navigateToChapter(0);
      }
    };

    const onKeyUp = () => {
      handleStopInput();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    section.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    section.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });

    const onHash = () => releaseLock();
    window.addEventListener("hashchange", onHash);

    return () => {
      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
        scrollStopTimerRef.current = null;
      }
      if (rafTrackerRef.current !== null) {
        cancelAnimationFrame(rafTrackerRef.current);
        rafTrackerRef.current = null;
      }
      vFwd.removeEventListener("loadedmetadata", initTime);
      vFwd.removeEventListener("loadeddata", initTime);
      if (vRev) {
        vRev.removeEventListener("loadedmetadata", initTime);
        vRev.removeEventListener("loadeddata", initTime);
      }
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      section.removeEventListener("touchstart", onTouchStart, true);
      section.removeEventListener("touchmove", onTouchMove, true);
      section.removeEventListener("touchend", onTouchEnd, true);
      window.removeEventListener("hashchange", onHash);
      releaseLock();
    };
  }, [engageLock, releaseLock, handleScrollDrive, handleStopInput, pauseAll, scrollToNextSection, navigateToChapter]);

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
        backgroundImage:
          heroStage === "hero-intro"
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
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${heroStage === "hero-intro" ? "opacity-100" : "opacity-0"
          }`}
        style={{
          backgroundImage: "radial-gradient(rgba(0, 114, 188, 0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ────────────────────────────────────────────────────────
          INTERACTIVE FLOATING & DOCKING PROCESSOR
          - Floats in Hero state
          - Slides and docks onto video pedestal center (top: 59%, offsetY: -43px)
          - Dissolves when switching to active video stage
         ──────────────────────────────────────────────────────── */}
      <div
        className={`absolute pointer-events-none z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroStage === "video" ? "opacity-0 pointer-events-none" : "opacity-100"
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
              // Docked state: centered on top of the 3-tiered pedestal
              top: PROCESSOR_CONFIG.top,
              left: PROCESSOR_CONFIG.left,
              transform: `translate(-50%, -50%) translate(${PROCESSOR_CONFIG.offsetX}, ${PROCESSOR_CONFIG.offsetY}) scale(${PROCESSOR_CONFIG.scale || 1.0})`,
            }
        }
      >
        <div
          className={`relative transition-transform duration-500 ${heroStage === "hero-intro"
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
            className={`transition-all duration-500 ${heroStage === "hero-intro"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 pointer-events-none"
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
                  <span className="text-[11px] font-extrabold text-slate-900 tracking-tight">
                    Core Architecture
                  </span>
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
                <span className="text-[11px] font-extrabold text-slate-900 tracking-tight block">
                  Rupantar ERP &amp; HCM
                </span>
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
            We engineer mission-critical ERP suites, Rupantar HCM, Field Force automation, and scalable
            cloud engines tailored precisely around your business workflows.
          </p>

          {/* Action Button & Scroll Prompt */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => handleScrollDrive("down", 60)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#0072bc] hover:bg-[#005c99] shadow-lg shadow-[#0072bc]/30 transition-all hover:scale-105 cursor-pointer active:scale-95"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScrollDrive("down", 60)}
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
          STAGE 2: DUAL HARDWARE-ACCELERATED VIDEO PLAYERS (60 FPS)
          - Ready underneath at frame 0.0s (No crossfade lag)
          - Smoothly reveals when transitioning to docked/video
         ──────────────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out ${heroStage === "hero-intro" ? "opacity-0 z-0" : "opacity-100 z-5"
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
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${activeSide === "fwd" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          style={{
            transform: "translate3d(0, 0, 0)",
            willChange: "transform, opacity",
            touchAction: "none",
          }}
        />

        {/* Reverse Video */}
        <video
          ref={videoRevRef}
          src={reverseVideoSrc}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${activeSide === "rev" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          style={{
            transform: "translate3d(0, 0, 0)",
            willChange: "transform, opacity",
            touchAction: "none",
          }}
        />
      </div>

      {/* Vignette Gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#d8e4ea]/30 to-transparent z-15" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1e36]/15 to-transparent z-15" />

      {/* ────────────────────────────────────────────────────────
          LIQUID GLASS DISTORTION SVG FILTER
         ──────────────────────────────────────────────────────── */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="17"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* ────────────────────────────────────────────────────────
          4 MILESTONE HUD CARDS (Visible in Docked & Video stages)
          - Dynamically slides in based on active playback time
          - Authentic Liquid Glassmorphism (distortion + blur + 0.28 translucent tint + dual inset bevel)
         ──────────────────────────────────────────────────────── */}
      {(heroStage === "video" || heroStage === "docked") && (
        <>
          {/* CARD 1: TIMESTAMP 1 (0.0s / Docked Pedestal Stage) - Slides in from outside LEFT */}
          <div
            className={`absolute top-4 sm:top-12 left-4 sm:left-10 lg:left-16 right-4 sm:right-auto max-w-lg z-20 transition-all duration-[850ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${heroStage === "docked" || currentMilestone === 0
                ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-x-[calc(100%+160px)] scale-95 pointer-events-none"
              }`}
          >
            {/* Liquid Glass Card */}
            <div
              className="group relative overflow-hidden p-6 sm:p-8 rounded-3xl cursor-default transition-all duration-700 hover:-translate-y-2 hover:scale-[1.012]"
              style={{
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 0 25px rgba(0, 114, 188, 0.12)",
                transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.2)",
              }}
            >
              {/* Glass Layer 1: Liquid Distortion & Backdrop Blur */}
              <div
                className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  filter: "url(#glass-distortion)",
                  isolation: "isolate",
                }}
              />

              {/* Glass Layer 2: Translucent Tint (28% white) */}
              <div
                className="absolute inset-0 z-10 rounded-3xl pointer-events-none"
                style={{ background: "rgba(255, 255, 255, 0.58)" }}
              />

              {/* Glass Layer 3: Dual Inset Specular Beveled Glass Rim */}
              <div
                className="absolute inset-0 z-20 rounded-3xl overflow-hidden pointer-events-none"
                style={{
                  boxShadow:
                    "inset 2px 2px 1.5px 0 rgba(255, 255, 255, 0.65), inset -1.5px -1.5px 1.5px 1px rgba(255, 255, 255, 0.45)",
                }}
              />

              {/* Dynamic light sheen sweep on hover */}
              <div className="pointer-events-none absolute -inset-y-full -inset-x-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out z-20" />

              {/* Content (Z-30) */}
              <div className="relative z-30">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/60 text-[#0072bc] border border-white/70 tracking-wide backdrop-blur-md shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#0072bc] animate-ping" />
                    Dhaka, Bangladesh · Global Standards
                  </span>
                </div>

                <h2
                  style={{ fontFamily: SANS }}
                  className="text-2xl sm:text-4xl lg:text-[42px] font-black text-[#0f172a] tracking-tight leading-[1.12] mb-3.5 group-hover:text-black transition-colors"
                >
                  We build software solutions that{" "}
                  <span className="text-[#0072bc]">power your business.</span>
                </h2>

                <p className="text-[#1e293b] text-xs sm:text-sm leading-relaxed mb-6 font-semibold">
                  Suffix IT designs, engineers, and deploys high-concurrency ERP, Rupantar HCM, Field Force,
                  and custom digital systems tailored to your unique workflow.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateToChapter(1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0072bc] hover:bg-[#005c99] shadow-lg shadow-[#0072bc]/30 transition-all hover:scale-105 cursor-pointer active:scale-95"
                  >
                    <span>Explore Platforms</span>
                    <span>→</span>
                  </button>
                  <div className="flex items-center gap-2 text-[11px] text-[#334155] font-bold">
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${isPlaying ? "bg-[#0072bc] animate-ping" : "bg-emerald-500"
                        }`}
                    />
                    <span>
                      {isPlaying
                        ? `Playing (${speedMode === "more-fast" ? "4.0x Turbo" : speedMode === "fast" ? "3.0x Fast" : "2.0x"})`
                        : heroStage === "docked"
                          ? "Scroll down to start video walkthrough ↓"
                          : "Scroll down to advance ↓"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: TIMESTAMP 2 (2.0s) - Slides in from outside RIGHT */}
          <div
            className={`absolute top-4 sm:top-12 right-4 sm:right-10 lg:right-16 left-4 sm:left-auto max-w-md z-20 transition-all duration-[850ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${heroStage === "video" && currentMilestone === 1
                ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-x-[calc(100%+160px)] scale-95 pointer-events-none"
              }`}
          >
            {/* Liquid Glass Card */}
            <div
              className="group relative overflow-hidden p-6 sm:p-7 rounded-3xl cursor-default transition-all duration-700 hover:-translate-y-2 hover:scale-[1.012]"
              style={{
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 0 25px rgba(124, 58, 237, 0.12)",
                transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.2)",
              }}
            >
              {/* Glass Layer 1: Liquid Distortion & Backdrop Blur */}
              <div
                className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  filter: "url(#glass-distortion)",
                  isolation: "isolate",
                }}
              />

              {/* Glass Layer 2: Translucent Tint */}
              <div
                className="absolute inset-0 z-10 rounded-3xl pointer-events-none"
                style={{ background: "rgba(255, 255, 255, 0.58)" }}
              />

              {/* Glass Layer 3: Dual Inset Specular Beveled Glass Rim */}
              <div
                className="absolute inset-0 z-20 rounded-3xl overflow-hidden pointer-events-none"
                style={{
                  boxShadow:
                    "inset 2px 2px 1.5px 0 rgba(255, 255, 255, 0.65), inset -1.5px -1.5px 1.5px 1px rgba(255, 255, 255, 0.45)",
                }}
              />

              {/* Dynamic light sheen sweep on hover */}
              <div className="pointer-events-none absolute -inset-y-full -inset-x-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out z-20" />

              {/* Content (Z-30) */}
              <div className="relative z-30">
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/60 text-[#7c3aed] border border-white/70 uppercase tracking-wider backdrop-blur-md shadow-xs">
                    Phase 02 · Integrated Platforms
                  </span>
                  <span className="text-xs font-bold text-[#334155]">Chapter 2 / 4</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mb-2.5 group-hover:text-black transition-colors">
                  Rupantar ERP &amp; Field Force Automation
                </h2>

                <p className="text-[#1e293b] text-xs sm:text-sm leading-relaxed mb-4 font-semibold">
                  Unified multi-warehouse stock synchronization, statutory financial accounting, and live
                  GPS field sales telemetry connecting teams directly to leadership.
                </p>

                <div className="space-y-2 mb-5">
                  {[
                    "Multi-Warehouse Inventory & Supply Chain",
                    "Automated VAT & General Ledger Accounting",
                    "Live Field Force Telemetry & Offline Sync",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-800 flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform">
                        ✓
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/60">
                  <button
                    type="button"
                    onClick={() => navigateToChapter(0)}
                    className="text-xs font-bold text-[#334155] hover:text-[#0072bc] cursor-pointer"
                  >
                    ↑ Back to Start
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToChapter(2)}
                    className="text-xs font-bold text-[#0072bc] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Next: Cloud &amp; Telemetry ↓
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: TIMESTAMP 3 (4.8s) - Slides in from outside BOTTOM-LEFT */}
          <div
            className={`absolute bottom-16 sm:bottom-20 left-4 sm:left-10 lg:left-16 right-4 sm:right-auto max-w-md z-20 transition-all duration-[850ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${heroStage === "video" && currentMilestone === 2
                ? "opacity-100 translate-x-0 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-x-[calc(100%+120px)] translate-y-[calc(100%+120px)] scale-95 pointer-events-none"
              }`}
          >
            {/* Liquid Glass Card */}
            <div
              className="group relative overflow-hidden p-6 sm:p-7 rounded-3xl cursor-default transition-all duration-700 hover:-translate-y-2 hover:scale-[1.012]"
              style={{
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 0 25px rgba(0, 114, 188, 0.12)",
                transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.2)",
              }}
            >
              {/* Glass Layer 1: Liquid Distortion & Backdrop Blur */}
              <div
                className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  filter: "url(#glass-distortion)",
                  isolation: "isolate",
                }}
              />

              {/* Glass Layer 2: Translucent Tint */}
              <div
                className="absolute inset-0 z-10 rounded-3xl pointer-events-none"
                style={{ background: "rgba(255, 255, 255, 0.58)" }}
              />

              {/* Glass Layer 3: Dual Inset Specular Beveled Glass Rim */}
              <div
                className="absolute inset-0 z-20 rounded-3xl overflow-hidden pointer-events-none"
                style={{
                  boxShadow:
                    "inset 2px 2px 1.5px 0 rgba(255, 255, 255, 0.65), inset -1.5px -1.5px 1.5px 1px rgba(255, 255, 255, 0.45)",
                }}
              />

              {/* Dynamic light sheen sweep on hover */}
              <div className="pointer-events-none absolute -inset-y-full -inset-x-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out z-20" />

              {/* Content (Z-30) */}
              <div className="relative z-30">
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/60 text-[#0072bc] border border-white/70 uppercase tracking-wider backdrop-blur-md shadow-xs">
                    Phase 03 · Cloud &amp; Telemetry
                  </span>
                  <span className="text-xs font-bold text-[#334155]">Chapter 3 / 4</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mb-2.5 group-hover:text-black transition-colors">
                  High-Throughput Cloud &amp; Telemetry Architecture
                </h2>

                <p className="text-[#1e293b] text-xs sm:text-sm leading-relaxed mb-4 font-semibold">
                  Scalable microservices, real-time data pipelines, and distributed event brokers engineered
                  for zero-latency synchronization under peak enterprise loads.
                </p>

                <div className="space-y-2 mb-5">
                  {[
                    "Event-Driven Microservices & Live Message Queues",
                    "Multi-Region Database Replication & Failover",
                    "24/7 Real-Time Telemetry & Proactive APM",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
                      <div className="w-4 h-4 rounded-full bg-[#0072bc]/20 text-[#0072bc] flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform">
                        ✓
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/60">
                  <button
                    type="button"
                    onClick={() => navigateToChapter(1)}
                    className="text-xs font-bold text-[#334155] hover:text-[#0072bc] cursor-pointer"
                  >
                    ↑ Back: ERP &amp; Field Force
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToChapter(3)}
                    className="text-xs font-bold text-[#0072bc] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Next: Scale &amp; Growth ↓
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 4: TIMESTAMP 4 (7.4s) - Slides in from outside TOP */}
          <div
            className={`absolute top-4 sm:top-10 left-4 sm:left-10 lg:left-16 right-4 sm:right-auto max-w-lg z-20 transition-all duration-[850ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${heroStage === "video" && currentMilestone === 3
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-y-[calc(100%+160px)] scale-95 pointer-events-none"
              }`}
          >
            {/* Liquid Glass Card */}
            <div
              className="group relative overflow-hidden p-6 sm:p-7 rounded-3xl cursor-default transition-all duration-700 hover:-translate-y-2 hover:scale-[1.012]"
              style={{
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 0 25px rgba(0, 114, 188, 0.15)",
                transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.2)",
              }}
            >
              {/* Glass Layer 1: Liquid Distortion & Backdrop Blur */}
              <div
                className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  filter: "url(#glass-distortion)",
                  isolation: "isolate",
                }}
              />

              {/* Glass Layer 2: Translucent Tint */}
              <div
                className="absolute inset-0 z-10 rounded-3xl pointer-events-none"
                style={{ background: "rgba(255, 255, 255, 0.58)" }}
              />

              {/* Glass Layer 3: Dual Inset Specular Beveled Glass Rim */}
              <div
                className="absolute inset-0 z-20 rounded-3xl overflow-hidden pointer-events-none"
                style={{
                  boxShadow:
                    "inset 2px 2px 1.5px 0 rgba(255, 255, 255, 0.65), inset -1.5px -1.5px 1.5px 1px rgba(255, 255, 255, 0.45)",
                }}
              />

              {/* Dynamic light sheen sweep on hover */}
              <div className="pointer-events-none absolute -inset-y-full -inset-x-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out z-20" />

              {/* Content (Z-30) */}
              <div className="relative z-30">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-white/60 text-[#0072bc] border border-white/70 uppercase tracking-wider backdrop-blur-md shadow-xs">
                    Phase 04 · Enterprise Scale
                  </span>
                  <span className="text-xs font-bold text-emerald-700">✓ Suffix IT Ecosystem</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f172a] tracking-tight leading-tight mb-3 group-hover:text-black transition-colors">
                  Engineered for scale, <span className="text-[#0072bc]">built to lead.</span>
                </h2>

                <p className="text-[#1e293b] text-xs sm:text-sm leading-relaxed mb-5 font-semibold">
                  Whether you need turnkey software platforms or bespoke cloud architecture, Suffix IT
                  empowers forward-thinking enterprises with proven 24/7 reliability.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      releaseLock();
                      const contactEl = document.getElementById("contact");
                      if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs sm:text-sm text-white bg-[#0072bc] hover:bg-[#005c99] shadow-lg shadow-[#0072bc]/30 transition-all hover:scale-105 cursor-pointer active:scale-95"
                  >
                    <span>Schedule Consultation</span>
                    <span>→</span>
                  </a>
                  <button
                    type="button"
                    onClick={scrollToNextSection}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-slate-700 hover:text-[#0072bc] bg-white/80 hover:bg-white border border-slate-200/80 backdrop-blur-md transition-all shadow-xs cursor-pointer"
                  >
                    <span>Explore Services</span>
                    <ChevronDown className="size-4 text-[#0072bc]" />
                  </button>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/60 text-[11px] font-bold text-[#334155]">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/60 border border-white/80 backdrop-blur-md shadow-xs group-hover:bg-white transition-colors">
                    <Icon name="settings" size={13} className="text-[#0072bc]" /> Custom Dev
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/60 border border-white/80 backdrop-blur-md shadow-xs group-hover:bg-white transition-colors">
                    <Icon name="layers" size={13} className="text-[#0072bc]" /> Ready Products
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/60 border border-white/80 backdrop-blur-md shadow-xs group-hover:bg-white transition-colors">
                    <Icon name="cloud" size={13} className="text-[#0072bc]" /> Managed Cloud
                  </span>
                </div>
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
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => navigateToChapter(ch.id)}
                  className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${(heroStage === "docked" && ch.id === 0) ||
                      (heroStage === "video" && currentMilestone === ch.id)
                      ? "bg-[#0072bc] text-white shadow-md shadow-[#0072bc]/25 scale-105"
                      : "text-[#515978] hover:text-[#0072bc] hover:bg-white/70"
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${(heroStage === "docked" && ch.id === 0) ||
                        (heroStage === "video" && currentMilestone === ch.id)
                        ? "bg-white"
                        : "bg-[#9db1c7] group-hover:bg-[#0072bc]"
                      }`}
                  />
                  <span className="hidden sm:inline">{ch.label}</span>
                  <span className="sm:hidden">{ch.id + 1}</span>
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
