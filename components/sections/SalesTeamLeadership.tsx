"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Mail, Check, Copy, Sparkles, UserCheck } from "lucide-react";
import { site } from "@/lib/site";
import gsap from "gsap";

export interface ExecutiveContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  phoneHref: string;
  email: string;
  image: string;
  availability: string;
}

const executives: ExecutiveContact[] = [
  {
    id: "exec-1",
    name: "Engr. Tanvir Morshed",
    role: "Head of Business Development",
    phone: site.phone,
    phoneHref: site.phoneHref,
    email: "sales@suffixit.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    availability: "Available for Scoping Calls",
  },
  {
    id: "exec-2",
    name: "Kazi Rafsanul Haque",
    role: "Lead Solution Architect",
    phone: site.phone,
    phoneHref: site.phoneHref,
    email: "info@suffixit.com",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    availability: "Architecture & Tech Consult",
  },
];

export default function SalesTeamLeadership() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Staggered card entrance with image reveal
      gsap.fromTo(
        ".exec-card",
        {
          opacity: 0,
          y: 35,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: "power3.out",
          delay: 0.25,
        }
      );

      // Portrait Image zoom-out de-blur reveal
      gsap.fromTo(
        ".exec-portrait-img",
        {
          scale: 1.25,
          filter: "blur(8px)",
          opacity: 0.4,
        },
        {
          scale: 1.0,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: "power2.out",
          delay: 0.35,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full mt-10 md:mt-14">
      <div className="text-left mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-[11px] font-bold tracking-widest text-[#0068B5] uppercase mb-2">
          <UserCheck className="size-3.5 text-[#0068B5]" />
          <span>Direct Leadership Channel</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-1">
          Speak Directly With Our Sales &amp; Architecture Leadership
        </h3>
        <p className="text-sm text-slate-500 mt-1.5 max-w-xl leading-relaxed">
          Connect directly with our engineering and business heads for urgent enterprise RFPs, system audits, and technical demonstrations.
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {executives.map((exec) => (
          <div
            key={exec.id}
            className="exec-card group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_30px_rgba(0,104,181,0.05)] transition-all duration-300 hover:border-[#0068B5] hover:shadow-[0_0_28px_rgba(0,104,181,0.22),inset_0_0_12px_rgba(0,104,181,0.05)] hover:-translate-y-1"
          >
            {/* Top subtle hover accent line */}
            <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#0068B5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

            {/* Portrait thumbnail with animated reveal */}
            <div className="relative w-28 h-32 sm:w-32 sm:h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80 shadow-xs ring-2 ring-[#0068B5]/15 group-hover:ring-[#0068B5]/40 transition-all">
              <Image
                src={exec.image}
                alt={exec.name}
                fill
                unoptimized
                sizes="(max-width: 640px) 112px, 128px"
                className="exec-portrait-img object-cover transition-transform duration-700 group-hover:scale-108"
              />
              {/* Shimmer overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[9px] font-bold text-white tracking-wider uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>

            {/* Right Information */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#0068B5] transition-colors truncate">
                  {exec.name}
                </h4>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0068B5] mb-3">
                {exec.role}
              </p>

              {/* Contact actions */}
              <div className="space-y-2">
                {/* Phone / WhatsApp */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 transition-all group-hover:bg-sky-50/50 group-hover:border-sky-200/80">
                  <a
                    href={exec.phoneHref}
                    className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-[#0068B5] truncate"
                  >
                    <div className="size-6 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                      <Phone className="size-3.5 text-emerald-600" />
                    </div>
                    <span>{exec.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(exec.phone.replace(/\s+/g, ""), `${exec.id}-phone`)}
                    className="inline-flex items-center justify-center size-7 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#0068B5] hover:border-[#0068B5] shrink-0 transition-all shadow-2xs cursor-pointer active:scale-95"
                    title="Copy Phone Number"
                  >
                    {copiedId === `${exec.id}-phone` ? (
                      <span className="text-[10px] font-bold text-emerald-600 px-1">Copied!</span>
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 transition-all group-hover:bg-blue-50/50 group-hover:border-blue-200/80">
                  <a
                    href={`mailto:${exec.email}`}
                    className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-[#0068B5] truncate"
                  >
                    <div className="size-6 rounded-lg bg-sky-100/80 text-[#0068B5] flex items-center justify-center shrink-0">
                      <Mail className="size-3.5 text-[#0068B5]" />
                    </div>
                    <span className="truncate">{exec.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(exec.email, `${exec.id}-email`)}
                    className="inline-flex items-center justify-center size-7 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#0068B5] hover:border-[#0068B5] shrink-0 transition-all shadow-2xs cursor-pointer active:scale-95"
                    title="Copy Email"
                  >
                    {copiedId === `${exec.id}-email` ? (
                      <span className="text-[10px] font-bold text-emerald-600 px-1">Copied!</span>
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

