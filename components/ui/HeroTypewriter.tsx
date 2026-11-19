"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface HeroTypewriterProps {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

const DEFAULT_WORDS = [
  "power your business.",
  "scale your enterprise.",
  "automate your operations.",
  "accelerate your growth.",
  "streamline your finances.",
];

export default function HeroTypewriter({
  words = DEFAULT_WORDS,
  typingSpeed = 75,
  deletingSpeed = 38,
  pauseDuration = 2200,
  className = "",
  cursorClassName = "",
}: HeroTypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]); // Start with full word for SSR / instant paint
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let timeoutId: NodeJS.Timeout;

    const currentTargetWord = words[currentWordIndex];

    if (isPaused) {
      // Pause at fully typed word before starting to erase
      timeoutId = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting) {
      // Erasing characters one by one
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentTargetWord.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, brief pause then start typing next word
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 320);
      }
    } else {
      // Typing characters forward
      if (displayText.length < currentTargetWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentTargetWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Completed typing word, trigger pause
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, isPaused, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span
      className={`inline align-baseline ${className}`}
      aria-label={words.join(", ")}
    >
      <span className="bg-gradient-to-r from-[#0072bc] via-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">
        {displayText}
      </span>
      {/* Blinking Cyan Cursor */}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.82, ease: "linear" }}
        className={`inline-block w-[3px] sm:w-[3.5px] lg:w-[4px] h-[0.82em] bg-gradient-to-b from-[#38bdf8] to-[#0072bc] ml-1.5 align-middle rounded-full shadow-[0_0_10px_rgba(56,189,248,0.9)] ${cursorClassName}`}
        aria-hidden="true"
      />
    </span>
  );
}
