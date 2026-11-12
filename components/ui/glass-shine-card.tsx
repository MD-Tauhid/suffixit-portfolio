import { cn } from "@/lib/utils";
import React from "react";

export interface GlassShineCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  orb1Gradient?: string;
  orb2Gradient?: string;
}

/**
 * Reusable Glass Shine Card matching the exact 3D sphere + frosted glass design
 */
export const GlassShineCard: React.FC<GlassShineCardProps> = ({
  children,
  className,
  orb1Gradient = "linear-gradient(135deg, #ff8c00, #ff0080)",
  orb2Gradient = "linear-gradient(90deg, #ff8c00, #ff0080)",
  ...props
}) => {
  return (
    <div className="relative isolate flex items-center justify-center p-4 sm:p-6 w-full overflow-visible">
      {/* 3D Sphere 1: Top-Right Orange/Magenta Gradient Orb */}
      <div
        className="pointer-events-none absolute size-[140px] sm:size-[160px] rounded-full z-0"
        style={{
          top: "8%",
          right: "8%",
          backgroundImage: orb1Gradient,
          border: "2px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "inset 10px 0px 22px #ffffff, 0 10px 30px rgba(255, 0, 128, 0.3)",
          animation: "ani 24s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* 3D Sphere 2: Bottom-Left Smaller Gradient Orb */}
      <div
        className="pointer-events-none absolute size-[80px] sm:size-[90px] rounded-full z-0"
        style={{
          bottom: "10%",
          left: "10%",
          backgroundImage: orb2Gradient,
          border: "2px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "inset 8px 0px 16px #ffffff, 0 8px 24px rgba(255, 140, 0, 0.25)",
        }}
        aria-hidden="true"
      />

      {/* Frosted Glass Card Container */}
      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-[22px] p-6 sm:p-7 backdrop-blur-[16px]",
          "bg-white/35 dark:bg-slate-900/40",
          "border border-white/65",
          "shadow-[inset_2px_1px_6px_rgba(255,255,255,0.55),0_18px_45px_-10px_rgba(0,0,0,0.08)]",
          "transition-all duration-300 hover:border-white/90 hover:shadow-[inset_2px_1px_8px_rgba(255,255,255,0.8),0_24px_55px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {/* Sweeping Diagonal Shine Reflection (shine keyframe) */}
        <div
          className="pointer-events-none absolute w-[170%] h-7 -rotate-45 blur-[16px] bg-white/80 z-20"
          style={{ animation: "shine 9s ease infinite" }}
          aria-hidden="true"
        />

        {children}
      </div>
    </div>
  );
};

/**
 * SampleCard: Exact 1-to-1 match of the user's uploaded visual reference image
 */
export const SampleCard: React.FC = () => {
  return (
    <div className="relative isolate flex items-center justify-center p-8 w-full max-w-sm mx-auto">
      {/* 3D Sphere 1: Top-Right Orange-Magenta Orb */}
      <div
        className="pointer-events-none absolute size-[150px] sm:size-[170px] rounded-full z-0"
        style={{
          top: "8%",
          right: "10%",
          backgroundImage: "linear-gradient(135deg, #ff8c00, #ff0080)",
          border: "2px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "inset 10px 0px 22px #ffffff, 0 12px 32px rgba(255, 0, 128, 0.35)",
          animation: "ani 24s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* 3D Sphere 2: Bottom-Left Orange-Magenta Orb */}
      <div
        className="pointer-events-none absolute size-[85px] sm:size-[95px] rounded-full z-0"
        style={{
          bottom: "10%",
          left: "12%",
          backgroundImage: "linear-gradient(90deg, #ff8c00, #ff0080)",
          border: "2px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "inset 8px 0px 16px #ffffff, 0 8px 24px rgba(255, 140, 0, 0.25)",
        }}
        aria-hidden="true"
      />

      {/* Frosted Glass Card Container */}
      <div className="relative z-10 w-[240px] sm:w-[270px] min-h-[330px] overflow-hidden rounded-[24px] p-6 sm:p-7 backdrop-blur-[16px] bg-white/30 border border-white/60 shadow-[inset_2px_1px_6px_rgba(255,255,255,0.45),0_18px_45px_rgba(0,0,0,0.07)]">
        {/* Diagonal Shine Reflection */}
        <div
          className="pointer-events-none absolute w-[170%] h-6 -rotate-45 blur-[18px] bg-white/80 z-20"
          style={{ animation: "shine 9s ease infinite" }}
          aria-hidden="true"
        />

        {/* Big Bold Headline: SAMPLE TEXT */}
        <p className="font-black text-3xl sm:text-[36px] tracking-tight uppercase leading-[1.05] text-[#111827]">
          SAMPLE <br /> TEXT
        </p>

        <div className="h-4" />

        {/* Description */}
        <p className="text-[13px] sm:text-sm text-[#374151] leading-[1.65] font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id
          dictum augue, id viverra.
        </p>
      </div>
    </div>
  );
};

export default SampleCard;
