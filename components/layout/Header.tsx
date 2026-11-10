"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Chevron from "./Chevron";
import Icon from "@/components/ui/Icon";
import { ArrowRight } from "lucide-react";
import { mobileMenu } from "@/lib/content";

export interface MegaMenuItem {
  icon: string;
  title: string;
  subtitle: string;
  href: string;
}

const servicesMegaColumns: MegaMenuItem[][] = [
  [
    { icon: "code", title: "Custom Software", subtitle: "Tailored architecture & delivery", href: "#services" },
    { icon: "globe", title: "Web & E-commerce", subtitle: "Conversion-focused web stores", href: "#services" },
    { icon: "smartphone", title: "Mobile Apps", subtitle: "Native iOS & Android experiences", href: "#services" },
  ],
  [
    { icon: "cpu", title: "IoT Solutions", subtitle: "Smart telemetry & hardware sync", href: "#services" },
    { icon: "cloud", title: "Cloud & Hosting", subtitle: "Enterprise SLA cloud infrastructure", href: "#services" },
    { icon: "database", title: "Storage & Backup", subtitle: "Disaster recovery & data safety", href: "#services" },
  ],
  [
    { icon: "target", title: "ERP Consulting", subtitle: "Migration & system audit strategy", href: "#services" },
    { icon: "megaphone", title: "SEO & Growth", subtitle: "Organic discovery & rankings", href: "#services" },
    { icon: "handshake", title: "Dedicated Teams", subtitle: "Skilled engineers & 24/7 operations", href: "#models" },
  ],
];

const productsMegaColumns: MegaMenuItem[][] = [
  [
    { icon: "compass", title: "Field Force (FFMS)", subtitle: "Live GPS & order tracking", href: "#fieldforce" },
    { icon: "users", title: "Rupantar HCM", subtitle: "Payroll, attendance & portal", href: "#products" },
    { icon: "layers", title: "Rupantar ERP", subtitle: "Multi-branch resource planning", href: "#products" },
  ],
  [
    { icon: "landmark", title: "Provident Fund", subtitle: "Transparent PF audit & payouts", href: "#products" },
    { icon: "shopping-cart", title: "Suffix E-commerce", subtitle: "Headless store with payments", href: "#products" },
    { icon: "receipt", title: "Smart POS & Billing", subtitle: "Rapid barcode checkout & stock", href: "#products" },
  ],
  [
    { icon: "hotel", title: "Hotel Booking", subtitle: "Guest reservations & room status", href: "#products" },
    { icon: "radio-tower", title: "Interconnect Billing", subtitle: "High-volume telecom CDR rating", href: "#products" },
    { icon: "message-square", title: "Bulk SMS & Meeting", subtitle: "Omnichannel customer messaging", href: "#products" },
  ],
];

function MegaMenu({ label, columns }: { label: string; columns: MegaMenuItem[][] }) {
  return (
    <div className="dd mega-menu pointer-events-none group-hover/nav:pointer-events-auto">
      <div className="w-[860px] max-w-4xl rounded-2xl bg-white/95 backdrop-blur-xl p-6 lg:p-8 shadow-[0_20px_60px_-15px_rgba(0,104,181,0.15)] border border-slate-200/80">
        {/* Header Label */}
        <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-6 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[11px] font-normal text-[#0068B5] tracking-normal normal-case">
            Suffix IT Enterprise Suite
          </span>
        </div>

        {/* 3-Column Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:divide-x md:divide-slate-200/70 text-left">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className={colIdx > 0 ? "md:pl-6 space-y-1" : "space-y-1"}>
              {col.map((item) => (
                <a
                  key={item.title}
                  href={`/${item.href}`}
                  className="group flex items-start gap-3.5 py-3 rounded-xl transition-colors hover:bg-slate-50/80 px-2.5 border-b border-slate-100 last:border-b-0 cursor-pointer"
                >
                  {/* Left Icon */}
                  <div className="size-9 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-[#0068B5]/10 group-hover:text-[#0068B5] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                    <Icon name={item.icon} size={17} />
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[15px] font-semibold text-slate-900 group-hover:text-[#0068B5] transition-colors">
                      <span className="truncate">{item.title}</span>
                      <ArrowRight className="size-3.5 text-slate-400 group-hover:text-[#0068B5] transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Client component for the top navigation bar & mobile menu toggle. */
export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header>
        <div className="w nav">
          <Logo priority />
          <nav aria-label="Primary">
            <ul className="nv">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li className="group/nav relative">
                <Link href="/#services">Services <Chevron /></Link>
                <MegaMenu label="SERVICES & SOLUTIONS" columns={servicesMegaColumns} />
              </li>
              <li className="group/nav relative">
                <Link href="/#products">Products <Chevron /></Link>
                <MegaMenu label="READY-MADE SOFTWARE PRODUCTS" columns={productsMegaColumns} />
              </li>
              <li><Link href="/#clients">Clients</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
          <div style={{ display: "flex", gap: 10 }}>
            <Link className="btn p hd-cta" href="/contact">Contact Us</Link>
            <button
              type="button"
              className="hb"
              id="hb"
              aria-expanded={open}
              aria-controls="mn"
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true">
                <Icon name={open ? "x" : "menu"} size={22} />
              </span>
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>
      <div className={`mnav${open ? " open" : ""}`} id="mn" role="navigation" aria-label="Mobile">
        {mobileMenu.map((l) => (
          <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
      </div>
    </>
  );
}
