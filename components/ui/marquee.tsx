import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  direction?: "left" | "right" | "up" | "down";
  vertical?: boolean;
  speed?: number;
  reverse?: boolean;
  repeat?: number;
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  vertical = false,
  speed = 30,
  reverse = false,
  repeat = 4,
  className,
  ...props
}: MarqueeProps) {
  const isVertical = vertical || direction === "up" || direction === "down";
  const isReverse = reverse || direction === "right" || direction === "down";

  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 select-none",
        isVertical ? "flex-col" : "flex-row",
        className
      )}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around gap-4",
            isVertical
              ? "flex-col mb-4 animate-marquee-vertical"
              : "flex-row mr-4 animate-marquee",
            isReverse && (isVertical ? "animate-marquee-vertical-reverse" : "animate-marquee-reverse"),
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default Marquee;
