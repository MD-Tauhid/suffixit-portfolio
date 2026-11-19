"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import type { Service } from "@/lib/services";
import { getServiceMedia } from "./serviceDataMap";

interface ServiceRelatedGridProps {
  services: Service[];
}

export default function ServiceRelatedGrid({ services }: ServiceRelatedGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((item, idx) => {
        const media = getServiceMedia(item.slug);

        return (
          <Link
            key={item.slug}
            href={`/services/${item.slug}`}
            className="group relative overflow-hidden rounded-[26px] bg-white border border-slate-200/70 p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,114,188,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(0,114,188,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Image Preview Thumbnail with Aspect */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#07162c] mb-5">
              <Image
                src={media.heroImage}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Category pill */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-[10.5px] font-mono font-bold text-sky-300 border border-white/20">
                <Sparkles size={10} />
                <span>{media.categoryTag}</span>
              </div>
            </div>

            {/* Middle: Title & Summary */}
            <div>
              <div className="text-[11px] font-mono font-bold text-[#0072bc] uppercase tracking-wider mb-1">
                Practice // 0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-[#062033] tracking-tight group-hover:text-[#0072bc] transition-colors leading-snug">
                {item.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#17162a]/70 line-clamp-2 font-normal">
                {item.summary}
              </p>
            </div>

            {/* Bottom: Action CTA */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0072bc]">
              <span>Explore Practice Specifications</span>
              <span className="grid size-7 place-items-center rounded-full bg-sky-50 text-[#0072bc] group-hover:bg-[#0072bc] group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
