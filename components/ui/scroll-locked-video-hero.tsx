"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Icon from "@/components/ui/Icon";

// ─────────────────────────────────────────────────────────────
// Suffix IT — Continuous Direction-Driven Video Hero Engine (V4)
// ─────────────────────────────────────────────────────────────
// Key Features:
// 1. Natural Active Scroll Driving:
//    - User scrolls DOWN -> Video plays FORWARD.
//    - User scrolls UP -> Video plays in REVERSE from that exact frame.
//    - User stops scrolling -> Video PAUSES instantly at that exact frame.
// 2. Smart Scroll Velocity Detection (3 Intelligent Modes):
//    - Normal (Shavabik): 1.0x playback speed
//    - Fast: 1.3x playback speed
//    - More Fast (Turbo): 1.6x playback speed (Maximum limit)
// 3. Ultra-Smooth LERP Acceleration & Deceleration:
//    - Speeds transition smoothly between 1.0x <-> 1.3x <-> 1.6x without robotic jumps.
//    - Eases up as scroll accelerates, eases down as scroll slows.
// 4. Dual-Engine 60fps GPU Hardware Acceleration:
//    - Forward video + Reverse video for 0-lag hardware playback in both directions.
// 5. Seamless Page Unlock:
//    - End of video unlocks body lock into #stats without trapping.
// ─────────────────────────────────────────────────────────────

export interface ChapterData {
  id: number;
  startTime: number;
  endTime: number;
  label: string;
  badge: string;
}

const VIDEO_DURATION = 12.041667;

const CHAPTERS: ChapterData[] = [
  { id: 0, startTime: 0.0, endTime: 3.5, label: "01 Overview", badge: "Technology Partner" },
  { id: 1, startTime: 3.5, endTime: 7.0, label: "02 Enterprise ERP", badge: "Core Architecture" },
  { id: 2, startTime: 7.0, endTime: 10.2, label: "03 Field & Mobile", badge: "Live Telemetry" },
  { id: 3, startTime: 10.2, endTime: 12.05, label: "04 Launch Suite", badge: "Enterprise Scale" },
];

export interface MetroHeroProps {
  videoSrc?: string;
  reverseVideoSrc?: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_VIDEO = "/assets/video/hero-video.mp4";
const DEFAULT_REVERSE_VIDEO = "/assets/video/hero-video-reverse.mp4";
const DEFAULT_POSTER = "/assets/video/hero-poster.jpg";
const SANS = "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif)";

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

  // Active time & chapter state
  const [currentTime, setCurrentTime] = useState(0.01);
  const [activeSide, setActiveSide] = useState<"fwd" | "rev">("fwd");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMode, setSpeedMode] = useState<SpeedMode>("normal");

  // Mutable refs for zero-latency event loop
  const currentTimeRef = useRef(0.01);
  const activeSideRef = useRef<"fwd" | "rev">("fwd");
  const isPlayingRef = useRef(false);
  const isLockedRef = useRef(true);
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafTrackerRef = useRef<number | null>(null);
  const programmaticTargetRef = useRef<number | null>(null);

  // Velocity tracking & smoothing refs
  const lastScrollTimeRef = useRef(0);
  const currentVelocityRef = useRef(0);
  const targetSpeedRef = useRef(1.0);
  const currentPlaybackSpeedRef = useRef(1.0);

  // Sync ref with state
  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  // Determine current active chapter index (0, 1, 2, or 3)
  const activeChapter = CHAPTERS.findIndex(
    (ch) => currentTime >= ch.startTime && currentTime < ch.endTime
  );
  const currentChapterIndex = activeChapter === -1 ? (currentTime >= 10.2 ? 3 : 0) : activeChapter;

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
    b.left = "0";
    b.right = "0";
    b.width = "100%";
    b.height = "100%";
    b.overscrollBehavior = "none";
  }, []);

  // Smooth scroll to next section (#stats or following element)
  const scrollToNextSection = useCallback(() => {
    releaseLock();
    const statsEl = document.getElementById("stats");
    if (statsEl) {
      statsEl.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const heroEl = document.getElementById("hero");
    if (heroEl?.nextElementSibling) {
      (heroEl.nextElementSibling as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  }, [releaseLock]);

  // Start continuous RAF sync loop to update UI state and smooth playbackRate
  const startRafTracker = useCallback(() => {
    if (rafTrackerRef.current !== null) return;

    const track = () => {
      const vFwd = videoFwdRef.current;
      const vRev = videoRevRef.current;

      // ─────────────────────────────────────────────────────────
      // SMOOTH LERP INTERPOLATION FOR PLAYBACK SPEED
      // Smoothly glides between 1.0x <-> 1.3x <-> 1.6x without robotic jumps
      // ─────────────────────────────────────────────────────────
      const lerpFactor = 0.08;
      currentPlaybackSpeedRef.current +=
        (targetSpeedRef.current - currentPlaybackSpeedRef.current) * lerpFactor;

      const smoothSpeed = Math.min(1.6, Math.max(1.0, currentPlaybackSpeedRef.current));

      if (vFwd && !vFwd.paused) {
        try {
          vFwd.playbackRate = smoothSpeed;
        } catch {}
      }
      if (vRev && !vRev.paused) {
        try {
          vRev.playbackRate = smoothSpeed;
        } catch {}
      }

      // Calculate forward normalized timestamp
      let calculatedFwdTime = currentTimeRef.current;

      if (activeSideRef.current === "fwd" && vFwd) {
        calculatedFwdTime = Math.min(VIDEO_DURATION, Math.max(0.01, vFwd.currentTime));
      } else if (activeSideRef.current === "rev" && vRev) {
        calculatedFwdTime = Math.min(
          VIDEO_DURATION,
          Math.max(0.01, VIDEO_DURATION - vRev.currentTime)
        );
      }

      currentTimeRef.current = calculatedFwdTime;
      setCurrentTime(calculatedFwdTime);

      // Handle programmatic target seek (if user clicked a chapter button)
      if (programmaticTargetRef.current !== null) {
        const target = programmaticTargetRef.current;
        const diff = Math.abs(calculatedFwdTime - target);
        if (diff <= 0.08) {
          programmaticTargetRef.current = null;
          pauseAll();
        }
      }

      // Check boundary limits
      if (calculatedFwdTime >= VIDEO_DURATION - 0.1) {
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
  }, [releaseLock]);

  // Pause all video playback immediately
  const pauseAll = useCallback(() => {
    const vFwd = videoFwdRef.current;
    const vRev = videoRevRef.current;

    if (vFwd && !vFwd.paused) vFwd.pause();
    if (vRev && !vRev.paused) vRev.pause();

    isPlayingRef.current = false;
    setIsPlaying(false);

    // Reset speed target to normal
    targetSpeedRef.current = 1.0;
    currentPlaybackSpeedRef.current = 1.0;
    currentVelocityRef.current = 0;
    setSpeedMode("normal");

    if (rafTrackerRef.current !== null) {
      cancelAnimationFrame(rafTrackerRef.current);
      rafTrackerRef.current = null;
    }

    // Sync opposite video position so it is ready for instant reversal
    const current = currentTimeRef.current;
    if (activeSideRef.current === "fwd" && vRev) {
      try {
        vRev.currentTime = Math.max(0.01, Math.min(VIDEO_DURATION, VIDEO_DURATION - current));
      } catch {}
    } else if (activeSideRef.current === "rev" && vFwd) {
      try {
        vFwd.currentTime = Math.max(0.01, Math.min(VIDEO_DURATION, current));
      } catch {}
    }
  }, []);

  // Play forward
  const playForward = useCallback(() => {
    const vFwd = videoFwdRef.current;
    const vRev = videoRevRef.current;
    if (!vFwd) return;

    if (currentTimeRef.current >= VIDEO_DURATION - 0.15) {
      releaseLock();
      return;
    }

    if (activeSideRef.current === "rev") {
      if (vRev && !vRev.paused) vRev.pause();
      const current = currentTimeRef.current;
      try {
        vFwd.currentTime = Math.max(0.01, Math.min(VIDEO_DURATION, current));
      } catch {}
      activeSideRef.current = "fwd";
      setActiveSide("fwd");
    }

    if (vFwd.paused) {
      vFwd.muted = true;
      const p = vFwd.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    }

    isPlayingRef.current = true;
    setIsPlaying(true);
    startRafTracker();
  }, [releaseLock, startRafTracker]);

  // Play in reverse
  const playReverse = useCallback(() => {
    const vFwd = videoFwdRef.current;
    const vRev = videoRevRef.current;

    if (currentTimeRef.current <= 0.05) {
      return;
    }

    if (vRev && vRev.readyState >= 1) {
      if (activeSideRef.current === "fwd") {
        if (vFwd && !vFwd.paused) vFwd.pause();
        const current = currentTimeRef.current;
        try {
          vRev.currentTime = Math.max(0.01, Math.min(VIDEO_DURATION, VIDEO_DURATION - current));
        } catch {}
        activeSideRef.current = "rev";
        setActiveSide("rev");
      }

      if (vRev.paused) {
        vRev.muted = true;
        const p = vRev.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      }

      isPlayingRef.current = true;
      setIsPlaying(true);
      startRafTracker();
    } else if (vFwd) {
      vFwd.pause();
      if (!vFwd.seeking) {
        try {
          vFwd.currentTime = Math.max(0.01, vFwd.currentTime - 0.08);
          currentTimeRef.current = vFwd.currentTime;
          setCurrentTime(vFwd.currentTime);
        } catch {}
      }
    }
  }, [startRafTracker]);

  // Scroll active driver with 3 intelligent speed modes and 130ms pause detection
  const handleScrollDrive = useCallback(
    (direction: "down" | "up", absDelta: number) => {
      // 1. End of video check
      if (direction === "down" && currentTimeRef.current >= VIDEO_DURATION - 0.2) {
        releaseLock();
        return;
      }

      // 2. Velocity Calculation: Measure scroll speed
      const now = performance.now();
      const dt = Math.max(10, now - (lastScrollTimeRef.current || now - 30));
      lastScrollTimeRef.current = now;

      const instVelocity = absDelta / dt;
      // Exponential moving average for velocity stability
      currentVelocityRef.current = currentVelocityRef.current * 0.4 + instVelocity * 0.6;
      const v = currentVelocityRef.current;

      // ─────────────────────────────────────────────────────────
      // 3 SPEED MODES:
      // Mode 1: Normal (1.0x) - Slow/gentle scroll
      // Mode 2: Fast (1.3x)   - Moderate/medium scroll
      // Mode 3: More Fast (1.6x) - Rapid/fast flick scroll (Max speed)
      // ─────────────────────────────────────────────────────────
      if (v >= 3.8) {
        targetSpeedRef.current = 1.6;
        setSpeedMode("more-fast");
      } else if (v >= 1.6) {
        targetSpeedRef.current = 1.3;
        setSpeedMode("fast");
      } else {
        targetSpeedRef.current = 1.0;
        setSpeedMode("normal");
      }

      // 3. Playback Direction
      if (direction === "down") {
        playForward();
      } else {
        playReverse();
      }

      // 4. Pause Detection: Stop video 130ms after user stops scrolling
      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }

      scrollStopTimerRef.current = setTimeout(() => {
        pauseAll();
        scrollStopTimerRef.current = null;
      }, 130);
    },
    [playForward, playReverse, pauseAll, releaseLock]
  );

  // Click handler to navigate to a specific chapter smoothly
  const navigateToChapter = useCallback(
    (chapterIndex: number) => {
      const targetChapter = CHAPTERS[chapterIndex];
      if (!targetChapter) return;

      const targetTime = targetChapter.startTime + 0.1;
      programmaticTargetRef.current = targetTime;
      targetSpeedRef.current = 1.3; // Chapter jumps play at smooth 1.3x speed

      if (targetTime > currentTimeRef.current) {
        playForward();
      } else {
        playReverse();
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
          vFwd.currentTime = 0.01;
        } catch {}
      }
      if (vRev && vRev.currentTime === 0) {
        try {
          vRev.currentTime = VIDEO_DURATION - 0.01;
        } catch {}
      }
    };

    vFwd.addEventListener("loadedmetadata", initTime);
    vFwd.addEventListener("loadeddata", initTime);
    if (vRev) {
      vRev.addEventListener("loadedmetadata", initTime);
    }

    if (vFwd.readyState >= 1) {
      initTime();
    } else {
      try {
        vFwd.currentTime = 0.01;
      } catch {}
    }

    // Lock page on initial load if at top of page
    if (window.scrollY <= 10) {
      engageLock();
    }

    // Mouse wheel listener with velocity detection
    const onWheel = (e: WheelEvent) => {
      const absDelta = Math.abs(e.deltaY);

      // Case 1: Video is at the end and user scrolls DOWN -> Release lock
      if (currentTimeRef.current >= VIDEO_DURATION - 0.25 && e.deltaY > 0) {
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

      if (currentTimeRef.current >= VIDEO_DURATION - 0.25 && totalDelta > 10) {
        releaseLock();
        return;
      }

      if (!isLockedRef.current) {
        if (window.scrollY <= 5 && totalDelta < -15) {
          engageLock();
          handleScrollDrive("up", stepDelta * 2);
          if (e.cancelable) e.preventDefault();
        }
        return;
      }

      if (Math.abs(totalDelta) > 6) {
        touchStartY = currentY;
        handleScrollDrive(totalDelta > 0 ? "down" : "up", stepDelta * 2);
        if (e.cancelable) e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      pauseAll();
    };

    // Keyboard navigation (Arrow keys & Escape)
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isLockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        handleScrollDrive("down", 40);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handleScrollDrive("up", 40);
      } else if (e.key === "Escape" || e.key === "End") {
        e.preventDefault();
        scrollToNextSection();
      } else if (e.key === "Home") {
        e.preventDefault();
        navigateToChapter(0);
      }
    };

    const onKeyUp = () => {
      pauseAll();
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
  }, [engageLock, releaseLock, handleScrollDrive, pauseAll, scrollToNextSection, navigateToChapter]);

  // Calculate overall video progress percentage (0 to 100%)
  const progressPercent = Math.min(100, Math.max(0, (currentTime / VIDEO_DURATION) * 100));

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "calc(100dvh - 68px)",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#d8e4ea",
        touchAction: "none",
        ...style,
      }}
    >
      {/* ========================================================
          DUAL HARDWARE-ACCELERATED VIDEO ENGINES (60 FPS)
          100% natural lighting, no dark muddy overlay
         ======================================================== */}

      {/* Forward Video */}
      <video
        ref={videoFwdRef}
        src={videoSrc}
        poster={poster}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 pointer-events-none ${
          activeSide === "fwd" ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        style={{
          transformOrigin: "center center",
          touchAction: "none",
        }}
      />

      {/* Reverse Video (Native 60fps backward playback) */}
      <video
        ref={videoRevRef}
        src={reverseVideoSrc}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 pointer-events-none ${
          activeSide === "rev" ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        style={{
          transformOrigin: "center center",
          touchAction: "none",
        }}
      />

      {/* Subtle top/bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#d8e4ea]/30 to-transparent z-15" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1e36]/15 to-transparent z-15" />

      {/* ========================================================
          HUD CONTENT LAYERS
          Strictly positioned on Left & Right. Center is 100% reserved
          for the 3D rotating analytics hologram.
         ======================================================== */}

      {/* --------------------------------------------------------
          CHAPTER 0: OVERVIEW (Positioned Left HUD)
          Visible from 0.0s to 3.5s
         -------------------------------------------------------- */}
      <div
        className={`absolute top-6 sm:top-12 left-4 sm:left-10 lg:left-16 max-w-lg z-20 transition-all duration-500 ease-out ${
          currentChapterIndex === 0
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-10 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-[#dce9f6] p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,114,188,0.14)]">
          <div className="flex items-center gap-2 mb-3.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#0072bc]/10 text-[#0072bc] border border-[#0072bc]/25 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#0072bc] animate-ping" />
              Dhaka, Bangladesh · Global Standards
            </span>
          </div>

          <h1
            style={{ fontFamily: SANS }}
            className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#17162a] tracking-tight leading-[1.12] mb-3.5"
          >
            We build software solutions that{" "}
            <span className="text-[#0072bc]">power your business.</span>
          </h1>

          <p className="text-[#4a5568] text-xs sm:text-sm leading-relaxed mb-6 font-medium">
            Suffix IT designs, engineers and deploys high-concurrency ERP, Rupantar HCM, Field Force and custom digital systems tailored to your unique workflow.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigateToChapter(1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0072bc] hover:bg-[#005c99] shadow-lg shadow-[#0072bc]/25 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Explore Ecosystem</span>
              <span>→</span>
            </button>
            <div className="flex items-center gap-2 text-[11px] text-[#515978] font-bold">
              <span className={`w-2 h-2 rounded-full transition-colors ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-[#9db1c7]"}`} />
              <span>{isPlaying ? "Playing with scroll..." : "Scroll down to play"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------
          CHAPTER 1: ENTERPRISE ERP (Positioned Left HUD)
          Visible from 3.5s to 7.0s
         -------------------------------------------------------- */}
      <div
        className={`absolute top-6 sm:top-12 left-4 sm:left-10 lg:left-16 max-w-md z-20 transition-all duration-500 ease-out ${
          currentChapterIndex === 1
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-10 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-[#dce9f6] p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,114,188,0.14)]">
          <div className="flex items-center justify-between gap-3 mb-3.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/25 uppercase tracking-wider">
              Core Architecture
            </span>
            <span className="text-xs font-bold text-[#8a99ad]">Phase 02 / 04</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17162a] tracking-tight mb-2.5">
            Rupantar ERP Suite
          </h2>

          <p className="text-[#515978] text-xs sm:text-sm leading-relaxed mb-4">
            End-to-end multi-warehouse inventory, procurement workflows, automated invoicing, and statutory financial accounting.
          </p>

          <div className="space-y-2 mb-5">
            {[
              "Multi-Branch Stock Synchronization",
              "Automated General Ledger & VAT",
              "Role-based Approval Hierarchy",
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
            <a
              href="#products"
              className="text-xs font-bold text-[#0072bc] hover:underline flex items-center gap-1"
            >
              Learn about ERP →
            </a>
            <button
              type="button"
              onClick={() => navigateToChapter(2)}
              className="text-xs font-bold text-[#515978] hover:text-[#0072bc] cursor-pointer"
            >
              Next: Field &amp; Mobile ↓
            </button>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------
          CHAPTER 2: FIELD FORCE & HCM (Positioned Right HUD)
          Visible from 7.0s to 10.2s
         -------------------------------------------------------- */}
      <div
        className={`absolute top-6 sm:top-12 right-4 sm:right-10 lg:right-16 max-w-md z-20 transition-all duration-500 ease-out ${
          currentChapterIndex === 2
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-10 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-[#dce9f6] p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,114,188,0.14)]">
          <div className="flex items-center justify-between gap-3 mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/10 text-emerald-700 border border-emerald-500/25">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Field Telemetry
            </span>
            <span className="text-xs font-bold text-[#8a99ad]">Phase 03 / 04</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17162a] tracking-tight mb-2.5">
            Field Force (FFMS) &amp; HCM
          </h2>

          <p className="text-[#515978] text-xs sm:text-sm leading-relaxed mb-4">
            Empower your entire sales army and HR in real-time. Offline-capable mobile apps connected directly to executive live dashboards.
          </p>

          {/* Telemetry Badge Widget */}
          <div className="p-3.5 rounded-2xl bg-[#f0f7fe] border border-[#d6e7f8] mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#17162a]">Active Field Agents</div>
              <div className="text-[11px] text-[#0072bc] font-semibold">1,420 Reps Online</div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800">
              99.2% GPS Accuracy
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#ebf2fa]">
            <a
              href="#fieldforce"
              className="text-xs font-bold text-[#0072bc] hover:underline flex items-center gap-1"
            >
              See Field Force Demo →
            </a>
            <button
              type="button"
              onClick={() => navigateToChapter(3)}
              className="text-xs font-bold text-[#515978] hover:text-[#0072bc] cursor-pointer"
            >
              Next: Launch Suite ↓
            </button>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------
          CHAPTER 3: COMPLETE SUITE & CALL-TO-ACTION (Positioned Left HUD)
          Visible from 10.2s to 12.05s
         -------------------------------------------------------- */}
      <div
        className={`absolute top-6 sm:top-10 left-4 sm:left-10 lg:left-16 max-w-lg z-20 transition-all duration-500 ease-out ${
          currentChapterIndex === 3
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-10 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-[#dce9f6] p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(0,114,188,0.15)]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#0072bc]/10 text-[#0072bc] border border-[#0072bc]/25 uppercase tracking-wider">
              Ready to Accelerate
            </span>
            <span className="text-xs font-bold text-emerald-600">✓ System Configured</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17162a] tracking-tight leading-tight mb-3">
            Engineered for scale, <span className="text-[#0072bc]">built to lead.</span>
          </h2>

          <p className="text-[#515978] text-xs sm:text-sm leading-relaxed mb-5 font-normal">
            Whether you need ready-made software like Field Force and ERP or custom cloud platforms built from scratch, Suffix IT is your long-term technology partner.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0072bc] hover:bg-[#005c99] shadow-lg shadow-[#0072bc]/30 transition-all hover:scale-105"
            >
              <span>Get Free Consultation</span>
              <span>→</span>
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#0072bc] bg-[#f0f6fd] hover:bg-[#e1effc] border border-[#cfe2f7] transition-all hover:scale-105"
            >
              <span>Explore Products</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#ebf2fa] text-xs text-[#515978] font-bold">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f8fbfe] border border-[#e1edf9]">
              <Icon name="settings" size={13} className="text-[#0072bc]" /> Custom Dev
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f8fbfe] border border-[#e1edf9]">
              <Icon name="layers" size={13} className="text-[#0072bc]" /> Ready Products
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f8fbfe] border border-[#e1edf9]">
              <Icon name="cloud" size={13} className="text-[#0072bc]" /> Managed Support
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          BOTTOM INTERACTIVE TIMELINE / SCRUBBER HUD
         ======================================================== */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        {/* Progress Bar Line */}
        <div className="w-56 sm:w-72 h-1 bg-white/60 backdrop-blur-md rounded-full overflow-hidden shadow-sm">
          <div
            className="h-full bg-gradient-to-r from-[#0072bc] to-[#3cb4f0] transition-[width] duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Floating Capsule Bar with Dynamic Speed Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 bg-white/90 backdrop-blur-md px-3 sm:px-5 py-2 rounded-full border border-white/95 shadow-[0_8px_30px_rgba(0,114,188,0.14)]">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => navigateToChapter(idx)}
              className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                currentChapterIndex === idx
                  ? "bg-[#0072bc] text-white shadow-md shadow-[#0072bc]/25 scale-105"
                  : "text-[#515978] hover:text-[#0072bc] hover:bg-white/70"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  currentChapterIndex === idx ? "bg-white" : "bg-[#9db1c7] group-hover:bg-[#0072bc]"
                }`}
              />
              <span className="hidden sm:inline">{ch.label}</span>
              <span className="sm:hidden">{idx + 1}</span>
            </button>
          ))}

          <div className="h-4 w-[1px] bg-[#d2e4f7] mx-1" />

          {/* Dynamic Velocity Badge (Normal / Fast / More Fast) */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono transition-all duration-300 bg-[#f0f6fd] border border-[#d2e4f7]">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                speedMode === "more-fast"
                  ? "bg-amber-500 animate-ping"
                  : speedMode === "fast"
                  ? "bg-[#0072bc] animate-pulse"
                  : "bg-emerald-500"
              }`}
            />
            <span
              className={`transition-colors duration-300 ${
                speedMode === "more-fast"
                  ? "text-amber-700 font-extrabold"
                  : speedMode === "fast"
                  ? "text-[#0072bc] font-bold"
                  : "text-emerald-700 font-semibold"
              }`}
            >
              {speedMode === "more-fast" ? "1.6x Fast" : speedMode === "fast" ? "1.3x Fast" : "1.0x Normal"}
            </span>
          </div>

          {/* Scroll down to continue prompt */}
          <button
            type="button"
            onClick={scrollToNextSection}
            className="flex items-center gap-1 text-xs font-extrabold text-[#0072bc] hover:underline pl-1 cursor-pointer"
          >
            <span>Continue ↓</span>
          </button>
        </div>
      </div>

      {/* Top-Right Direct Skip Shortcut */}
      <button
        type="button"
        onClick={scrollToNextSection}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-40 bg-white/85 hover:bg-white backdrop-blur-md border border-[#cde0f5] text-[#0072bc] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-extrabold cursor-pointer shadow-sm hover:shadow-md transition-all"
      >
        Skip intro ↓
      </button>
    </div>
  );
}
