"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Mail, Check, Copy, Sparkles, UserCheck, Clock } from "lucide-react";
import { site } from "@/lib/site";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    image: "/assets/images/executive-tanvir.jpg",
    availability: "Available for Scoping Calls",
  },
  {
    id: "exec-2",
    name: "Kazi Rafsanul Haque",
    role: "Lead Solution Architect",
    phone: site.phone,
    phoneHref: site.phoneHref,
    email: "info@suffixit.com",
    image: "/assets/images/executive-rafsanul.jpg",
    availability: "Architecture & Tech Consult",
  },
];

export default function SalesTeamLeadership() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Snappy, responsive entrance as soon as it enters viewport (top 85%)
      gsap.fromTo(
        ".exec-card-left",
        {
          opacity: 0,
          x: -45,
          scale: 0.98,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".exec-card-right",
        {
          opacity: 0,
          x: 45,
          scale: 0.98,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Snappy image curtain reveal
      gsap.fromTo(
        ".exec-portrait-container",
        {
          clipPath: "inset(0% 100% 0% 0% round 16px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          duration: 0.65,
          ease: "power2.inOut",
          delay: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      // Clean zoom settling
      gsap.fromTo(
        ".exec-portrait-img",
        { scale: 1.12 },
        {
          scale: 1.0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.18,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      // Quick sheen highlight sweep
      gsap.fromTo(
        ".exec-shimmer-sweep",
        { x: "-100%", opacity: 0 },
        {
          x: "160%",
          opacity: 0.7,
          duration: 0.75,
          ease: "power2.inOut",
          delay: 0.28,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full mt-12 md:mt-16 overflow-hidden py-4">
      {/* Header */}
      <div className="text-left mb-7 max-w-4xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-[11px] font-bold tracking-widest text-[#0068B5] uppercase mb-2.5 shadow-2xs">
          <UserCheck className="size-3.5 text-[#0068B5]" />
          <span>Direct Leadership Channel</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Speak Directly With Our Sales &amp; Architecture Leadership
        </h3>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl leading-relaxed">
          Connect directly with our engineering and business heads for urgent enterprise RFPs, system audits, and technical demonstrations.
        </p>
      </div>

      {/* Cards Grid: Perfectly Proportioned */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 max-w-5xl">
        {executives.map((exec, idx) => {
          const isLeft = idx === 0;
          return (
            <div
              key={exec.id}
              className={`exec-card ${
                isLeft ? "exec-card-left" : "exec-card-right"
              } group relative flex flex-col sm:flex-row items-center sm:items-stretch gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white via-white to-sky-50/30 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,104,181,0.06),0_2px_6px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-sky-300 hover:shadow-[0_16px_36px_-10px_rgba(0,104,181,0.18)] hover:-translate-y-0.5 will-change-transform`}
            >
              {/* Top ambient hover accent line */}
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#0068B5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

              {/* Portrait thumbnail */}
              <div className="exec-portrait-container relative w-32 h-36 sm:w-36 sm:h-auto min-h-[148px] rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/90 shadow-xs ring-1 ring-slate-900/5 group-hover:ring-2 group-hover:ring-[#0068B5]/30 transition-all">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 128px, 144px"
                  className="exec-portrait-img object-cover transition-transform duration-500 group-hover:scale-106"
                />
                <div className="exec-shimmer-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />

                <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md text-[9px] font-bold text-white tracking-wider uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              {/* Information & Quick Actions */}
              <div className="flex-1 min-w-0 flex flex-col justify-between w-full text-left">
                <div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#0068B5] transition-colors truncate">
                    {exec.name}
                  </h4>
                  <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-md bg-sky-50 border border-sky-200/60 text-[#0068B5] text-[11px] font-bold uppercase tracking-wider">
                    {exec.role}
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{exec.availability}</span>
                  </p>
                </div>

                {/* Contact actions */}
                <div className="space-y-2 mt-3.5">
                  {/* Phone / WhatsApp */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50/90 border border-slate-200/70 transition-all hover:bg-white hover:border-sky-300 hover:shadow-2xs">
                    <a
                      href={exec.phoneHref}
                      className="flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#0068B5] truncate flex-1"
                    >
                      <div className="size-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Phone className="size-3.5 text-emerald-600" />
                      </div>
                      <span className="truncate">{exec.phone}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(exec.phone.replace(/\s+/g, ""), `${exec.id}-phone`)}
                      className="inline-flex items-center justify-center h-7 px-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#0068B5] hover:border-[#0068B5] shrink-0 transition-all shadow-2xs cursor-pointer active:scale-95"
                      title="Copy Phone Number"
                    >
                      {copiedId === `${exec.id}-phone` ? (
                        <span className="text-[10px] font-bold text-emerald-600">Copied!</span>
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </button>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50/90 border border-slate-200/70 transition-all hover:bg-white hover:border-sky-300 hover:shadow-2xs">
                    <a
                      href={`mailto:${exec.email}`}
                      className="flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#0068B5] truncate flex-1"
                    >
                      <div className="size-6 rounded-lg bg-sky-100 text-[#0068B5] flex items-center justify-center shrink-0">
                        <Mail className="size-3.5 text-[#0068B5]" />
                      </div>
                      <span className="truncate">{exec.email}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(exec.email, `${exec.id}-email`)}
                      className="inline-flex items-center justify-center h-7 px-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#0068B5] hover:border-[#0068B5] shrink-0 transition-all shadow-2xs cursor-pointer active:scale-95"
                      title="Copy Email"
                    >
                      {copiedId === `${exec.id}-email` ? (
                        <span className="text-[10px] font-bold text-emerald-600">Copied!</span>
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
