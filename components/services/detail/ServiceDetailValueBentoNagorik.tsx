"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Code2, Users, Clock, RotateCw, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FlipBentoCardProps {
  icon: React.ReactNode;
  iconBg: string;
  border: string;
  bg: string;
  title: string;
  summary: string;
  tag: string;
  tagColor: string;
  backImage: string;
  backTag: string;
  backSub: string;
}

function FlipBentoCard({
  icon,
  iconBg,
  border,
  bg,
  title,
  summary,
  tag,
  tagColor,
  backImage,
  backTag,
  backSub,
}: FlipBentoCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative min-h-[320px] sm:min-h-[340px] [perspective:1000px] cursor-pointer select-none"
      onClick={() => setIsFlipped((prev) => !prev)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative size-full rounded-[28px] transition-transform duration-700 [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* FRONT SIDE (Pastel Aesthetic Card) */}
        <div
          className={cn(
            "absolute inset-0 size-full rounded-[28px] border p-7 sm:p-8 shadow-xs flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(0deg)]",
            border,
            bg
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className={cn("size-11 rounded-2xl flex items-center justify-center font-bold shadow-xs", iconBg)}>
              {icon}
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-slate-500 shadow-2xs backdrop-blur-xs border border-white/50">
              <RotateCw size={10} className="text-slate-600" />
              Hover to Flip
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
              {title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {summary}
            </p>
          </div>

          <div className={cn("pt-3 border-t text-xs font-bold flex items-center justify-between", tagColor)}>
            <span>{tag}</span>
            <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* BACK SIDE (Photorealistic 3D Image Revealed on Flip) */}
        <div className="absolute inset-0 size-full rounded-[28px] overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] border border-slate-200/90 bg-slate-950 shadow-xl">
          <Image
            src={backImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-slate-950/30" />

          <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/20">
                {backTag}
              </span>
              <span className="size-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <RotateCw size={13} />
              </span>
            </div>

            <div>
              <h4 className="text-lg font-black text-white tracking-tight leading-snug">
                {title}
              </h4>
              <p className="mt-1.5 text-xs text-slate-200 leading-relaxed">
                {backSub}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/15">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {tag}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailValueBentoNagorik() {
  return (
    <section className="sec-trans-section relative !py-20 md:!py-28 bg-[#f8fbff] border-b border-sky-100 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="trans-value-header mb-14 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1 text-xs font-bold text-[#0072bc] mb-3 shadow-xs">
            <Sparkles size={12} className="text-[#0072bc]" />
            <span>The Suffix IT Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
            Why Choose Suffix IT
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569]">
            A transparent engineering partner committed to clean architectures, rigorous QA, and dependable long-term delivery.
          </p>
        </motion.div>

        {/* 5-Block Bento Grid matching screenshot with 3D Flip Effects */}
        <div className="trans-value-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Block 1: Wide Horizontal Photo Card (spans 2 cols on desktop) - Enters from Left */}
          <motion.div
            initial={{ opacity: 0, x: -85, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="trans-value-hero md:col-span-2 relative min-h-[320px] sm:min-h-[340px] overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-2 shadow-sm group"
          >
            <div className="relative size-full overflow-hidden rounded-[20px] bg-slate-900 min-h-[300px]">
              <Image
                src="/assets/services/service-dedicated-teams-collaboration.jpg"
                alt="Suffix IT Engineering Collaboration"
                fill
                className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md mb-2.5 border border-white/20">
                    <Users size={13} />
                    <span>In-House Engineering Pods</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-tight text-white leading-snug">
                    Senior Engineers Working Directly for Your Vision
                  </h3>
                </div>
                <div className="rounded-xl bg-[#0072bc] px-4 py-2 text-xs font-bold text-white shadow-md">
                  Zero Outsourcing
                </div>
              </div>
            </div>
          </motion.div>

          {/* Block 2: Soft Yellow Card Top-Right (Flippable) - Enters from Right */}
          <motion.div
            initial={{ opacity: 0, x: 85, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="flex flex-col"
          >
            <FlipBentoCard
              icon={<Code2 size={22} />}
              iconBg="bg-amber-400/30 text-amber-900"
              border="border-[#fef08a]"
              bg="bg-[#fef9c3]"
              title="Rigorous Senior Code Reviews & QA"
              summary="Every commit passes automated CI/CD checks, Jest unit tests, and dual peer reviews prior to staging release."
              tag="Production-Grade Standards"
              tagColor="border-amber-200 text-amber-900"
              backImage="/assets/services/bento-code-review-qa.jpg"
              backTag="CI/CD & Code Quality"
              backSub="Automated linting, SonarQube quality gates, and 99%+ test pass rates before production commit."
            />
          </motion.div>

          {/* Block 3: Soft Sky Blue Card Bottom-Left (Flippable) - Spreads Out to Left */}
          <motion.div
            initial={{ opacity: 0, x: 75, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col"
          >
            <FlipBentoCard
              icon={<Users size={22} />}
              iconBg="bg-sky-200 text-sky-900"
              border="border-[#bae6fd]"
              bg="bg-[#e0f2fe]"
              title="Direct Principal Architect Access"
              summary="Direct communication through dedicated Slack/Teams channels with lead engineers—no non-technical middlemen."
              tag="Transparent Communication"
              tagColor="border-sky-200 text-sky-900"
              backImage="/assets/services/bento-architect-access.jpg"
              backTag="100% Direct Git & Slack"
              backSub="Direct daily interaction with tech leads and system architects for immediate technical decisions."
            />
          </motion.div>

          {/* Block 4: Soft Purple Card Bottom-Middle (Flippable) - Blooms Up from Center */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.86 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <FlipBentoCard
              icon={<Clock size={22} />}
              iconBg="bg-purple-200 text-purple-900"
              border="border-[#ddd6fe]"
              bg="bg-[#ede9fe]"
              title="2-Week Agile Sprints & Demos"
              summary="Structured delivery cycles with sprint plannings, live staging preview links, and predictable delivery dates."
              tag="Continuous Progress"
              tagColor="border-purple-200 text-purple-900"
              backImage="/assets/services/bento-agile-sprints.jpg"
              backTag="Fortnightly Releases"
              backSub="Tangible staging builds, velocity tracking, and sprint reviews every 14 days with zero surprises."
            />
          </motion.div>

          {/* Block 5: Soft Rose Card Bottom-Right (Flippable) - Spreads Out to Right */}
          <motion.div
            initial={{ opacity: 0, x: -75, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col"
          >
            <FlipBentoCard
              icon={<ShieldCheck size={22} />}
              iconBg="bg-rose-200 text-rose-900"
              border="border-[#fecdd3]"
              bg="bg-[#ffe4e6]"
              title="100% IP & Source Code Ownership"
              summary="Complete intellectual property handover. All Git repositories, Docker files, and design assets are strictly yours."
              tag="Zero Vendor Lock-In"
              tagColor="border-rose-200 text-rose-900"
              backImage="/assets/services/bento-ip-ownership.jpg"
              backTag="Full Code Ownership"
              backSub="Complete source code repositories, CI/CD secrets, cloud configs, and patents belong entirely to you."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
