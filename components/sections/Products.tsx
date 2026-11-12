"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import SectionHeader from "./SectionHeader";
import Icon from "@/components/ui/Icon";

type FilterCategory = "all" | "enterprise" | "retail" | "specialized";

interface ProductItem {
  id: string;
  category: "enterprise" | "retail" | "specialized";
  title: string;
  badge: string;
  statusBadge: string;
  versionBadge?: string;
  icon: string;
  themeColor: string;
  lightBg: string;
  borderColor: string;
  textColor: string;
  description: string;
  telemetry: React.ReactNode;
  checklist: string[];
  techTags: string[];
  actionLabel: string;
  actionHref: string;
  footerNote: string;
}

export default function Products() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [maxScrollX, setMaxScrollX] = useState(0);

  // ─────────────────────────────────────────────────────────────
  // 9 BATTLE-TESTED ENTERPRISE PRODUCTS
  // ─────────────────────────────────────────────────────────────
  const allProducts: ProductItem[] = useMemo(
    () => [
      // 1. FFMS
      {
        id: "ffms",
        category: "retail",
        title: "Field Force Management (FFMS)",
        badge: "Field Operations",
        statusBadge: "Live GPS Telemetry",
        versionBadge: "v4.2 Mobile Engine",
        icon: "map-pin",
        themeColor: "#0072bc",
        lightBg: "#f0f7fe",
        borderColor: "#cfe2f7",
        textColor: "#0072bc",
        description:
          "Complete field operations suite: real-time GPS tracking across all 64 districts, offline-first mobile order booking, beat plan adherence, and distributor stock sync.",
        telemetry: (
          <div className="w-full bg-[#f8fbfe] border border-[#cfe2f7] rounded-xl p-3 shadow-sm mb-3">
            <div className="flex items-center justify-between border-b border-[#e1edf9] pb-1.5 mb-1.5">
              <span className="text-[11px] font-bold text-[#17162a]">Live Network Hub</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700">
                Active Sync
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-1.5">
              <div className="text-base font-black text-[#0072bc]">1,420 Reps Online</div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                99.2% GPS
              </span>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold text-[#838fa6] mb-1">
                <span>Daily Beat Target</span>
                <span className="text-[#0072bc]">88% Done</span>
              </div>
              <div className="w-full bg-[#e1edf9] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0072bc] h-full w-[88%] rounded-full" />
              </div>
            </div>
          </div>
        ),
        checklist: [
          "99.2% GPS geofencing & beat adherence",
          "Full offline mode with SQLite local auto-sync",
          "Instant DSR order booking & receipt printing",
        ],
        techTags: ["Flutter Mobile", "Offline SQLite", "Geofencing", "DSR Booking"],
        actionLabel: "View Product Details",
        actionHref: "/products/field-force",
        footerNote: "Web + Android & iOS",
      },

      // 2. Rupantar ERP Suite
      {
        id: "erp",
        category: "enterprise",
        title: "Rupantar ERP Suite",
        badge: "Enterprise ERP",
        statusBadge: "NBR VAT 9.1",
        versionBadge: "Multi-Branch",
        icon: "layers",
        themeColor: "#7c3aed",
        lightBg: "#fbf9fe",
        borderColor: "#e4d7fc",
        textColor: "#7c3aed",
        description:
          "Unified enterprise resource planning: multi-warehouse inventory stock tracking, purchase procurement approvals, automated sales invoicing, and compliant double-entry general ledger.",
        telemetry: (
          <div className="w-full bg-[#fbf9fe] border border-[#e4d7fc] rounded-xl p-3 shadow-sm mb-3">
            <div className="flex items-center justify-between border-b border-[#ede5fc] pb-1.5 mb-1.5">
              <span className="text-[11px] font-bold text-[#17162a]">Warehouse Stock Sync</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-bold">
                Live Central
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center mb-1.5">
              <div className="p-1 rounded-md bg-white border border-[#ede5fc]">
                <div className="text-[9px] text-[#6a6980]">Dhaka HQ</div>
                <div className="text-xs font-bold text-[#17162a]">4.8k SKU</div>
              </div>
              <div className="p-1 rounded-md bg-white border border-[#ede5fc]">
                <div className="text-[9px] text-[#6a6980]">CTG Port</div>
                <div className="text-xs font-bold text-[#7c3aed]">2.4k SKU</div>
              </div>
              <div className="p-1 rounded-md bg-white border border-[#ede5fc]">
                <div className="text-[9px] text-[#6a6980]">Bogura</div>
                <div className="text-xs font-bold text-[#17162a]">1.1k SKU</div>
              </div>
            </div>
            <div className="text-[10px] text-emerald-600 font-bold">
              ✓ Audit Ledger: Balanced &amp; Closed
            </div>
          </div>
        ),
        checklist: [
          "Real-time central inventory across all branches",
          "Procurement PO creation & 3-way matching",
          "Automated NBR compliant VAT & Tax invoicing",
        ],
        techTags: ["Multi-Warehouse", "Sales & Billing", "Procurement PO", "General Ledger"],
        actionLabel: "View Product Details",
        actionHref: "/products/rupantar-erp",
        footerNote: "Modular Cloud Suite",
      },

      // 3. Rupantar HCM & Payroll
      {
        id: "hcm",
        category: "enterprise",
        title: "Rupantar HCM & Payroll",
        badge: "Enterprise HR",
        statusBadge: "100% Tax Compliant",
        versionBadge: "Self-Service",
        icon: "users",
        themeColor: "#7c3aed",
        lightBg: "#fbf9fe",
        borderColor: "#e4d7fc",
        textColor: "#7c3aed",
        description:
          "End-to-end employee lifecycle, biometric attendance machines integration, automated statutory payroll, and employee self-service mobile app.",
        telemetry: (
          <div className="w-full bg-[#fbf9fe] border border-[#e9ddfc] rounded-xl p-3 shadow-sm mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#17162a]">Payroll Disbursed</span>
              <span className="text-[10px] text-[#7c3aed] font-bold">BEFTN Ready</span>
            </div>
            <div className="text-base font-black text-[#7c3aed]">3,250 Employees</div>
            <div className="text-[10px] text-[#838fa6] mt-0.5">
              Auto statutory tax slabs &amp; PF deduction
            </div>
          </div>
        ),
        checklist: [
          "Biometric device sync (ZKTeco/Hikvision)",
          "Provident fund & tax slab calculation",
          "Leave approval & shift roaster workflows",
        ],
        techTags: ["Biometric Sync", "BEFTN Bank", "Tax Slabs", "Employee Portal"],
        actionLabel: "View Product Details",
        actionHref: "/products/rupantar-hcm",
        footerNote: "Self-Service Portal",
      },

      // 4. Smart POS & Billing
      {
        id: "pos",
        category: "retail",
        title: "Smart POS & Billing",
        badge: "Retail & Outlet",
        statusBadge: "0.3s Scan",
        versionBadge: "Multi-Counter",
        icon: "receipt",
        themeColor: "#d97706",
        lightBg: "#fffbf5",
        borderColor: "#faecd8",
        textColor: "#d97706",
        description:
          "Rapid barcode checkout, thermal receipt printing, offline sale preservation, and multi-counter cash drawer reconciliation.",
        telemetry: (
          <div className="w-full bg-[#fffbf5] border border-[#f5e4cc] rounded-xl p-3 shadow-sm mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#17162a]">Multi-Counter Ready</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 font-bold">
                0.3s Checkout
              </span>
            </div>
            <div className="text-[11px] text-[#838fa6]">
              Thermal printers, Barcode scanners &amp; MFS split
            </div>
          </div>
        ),
        checklist: [
          "Works offline during internet cuts",
          "Instant daily shift end & cash auditing",
          "Touch-screen & barcode terminal ready",
        ],
        techTags: ["Thermal Print", "Daily Ledger", "Touch POS", "Cash Drawer"],
        actionLabel: "View Product Details",
        actionHref: "/products/smart-pos",
        footerNote: "Retail Hardware Ready",
      },

      // 5. Suffix E-commerce
      {
        id: "ecom",
        category: "retail",
        title: "Suffix E-commerce",
        badge: "Digital Commerce",
        statusBadge: "Instant IPN",
        versionBadge: "Headless Fast",
        icon: "shopping-cart",
        themeColor: "#059669",
        lightBg: "#f4fcf8",
        borderColor: "#d6f5e8",
        textColor: "#059669",
        description:
          "High-converting digital storefront, multi-currency cart, payment gateways integration, and automated courier API dispatch.",
        telemetry: (
          <div className="w-full bg-[#f4fcf8] border border-[#cbeee0] rounded-xl p-3 shadow-sm mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#059669]">Payment Gateway Hub</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700">
                Live IPN
              </span>
            </div>
            <div className="text-xs font-bold text-[#17162a]">bKash, Nagad, Visa, MC</div>
            <div className="text-[10px] text-[#838fa6] mt-0.5">
              Steadfast / Pathao / RedX Courier APIs
            </div>
          </div>
        ),
        checklist: [
          "Headless high-speed Next.js storefront",
          "Real-time warehouse stock reservation",
          "Abandoned cart recovery & automated SMS",
        ],
        techTags: ["Next.js Fast", "Courier API", "Multi-Currency", "Stock Sync"],
        actionLabel: "View Product Details",
        actionHref: "/products/ecommerce",
        footerNote: "Headless Cloud Ready",
      },

      // 6. Suffix Provident Fund
      {
        id: "pf",
        category: "enterprise",
        title: "Suffix Provident Fund",
        badge: "Financial Trust",
        statusBadge: "Audit Ready",
        versionBadge: "Statutory",
        icon: "landmark",
        themeColor: "#0369a1",
        lightBg: "#f0f8fd",
        borderColor: "#d2e4f7",
        textColor: "#0369a1",
        description:
          "Statutory provident fund accounting: member ledgers, automated monthly interest accrual, loan against PF, and annual audit reports.",
        telemetry: (
          <div className="w-full bg-[#f0f8fd] border border-[#cee6f9] rounded-xl p-3 shadow-sm mb-3">
            <div className="text-xs font-bold text-[#0369a1]">Auto Interest Compounding</div>
            <div className="text-[10px] text-[#838fa6] mt-0.5">
              Government NBR / Financial rule compliant
            </div>
          </div>
        ),
        checklist: [
          "Individual employee online ledger statements",
          "Configurable interest rates & profit sharing",
          "Loan application & installment deduction",
        ],
        techTags: ["Member Portal", "Loan Engine", "Statutory Audit", "Profit Sharing"],
        actionLabel: "View Product Details",
        actionHref: "/products/provident-fund",
        footerNote: "Statutory Ready",
      },

      // 7. Interconnect Billing (ICX)
      {
        id: "icx",
        category: "specialized",
        title: "Interconnect Billing (ICX)",
        badge: "Telco Scale",
        statusBadge: "Carrier Grade",
        versionBadge: "50M+ CDRs",
        icon: "radio-tower",
        themeColor: "#0891b2",
        lightBg: "#f0faff",
        borderColor: "#cfeaf9",
        textColor: "#0891b2",
        description:
          "Carrier-grade CDR rating engine handling millions of concurrent calls, SMS settlements, interconnect tariffs, and regulatory invoices.",
        telemetry: (
          <div className="w-full bg-[#f0faff] border border-[#cbebfb] rounded-xl p-3 shadow-sm mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#17162a]">CDR Engine Speed</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-800">
                50M+ Daily
              </span>
            </div>
            <div className="text-[10px] text-[#838fa6]">
              Automated bilateral partner settlements &amp; BTRC audit
            </div>
          </div>
        ),
        checklist: [
          "Multi-tier peak/off-peak tariff matrices",
          "Real-time fraud traffic detection & alert",
          "BTRC & ANS/ICX automated reconciliation",
        ],
        techTags: ["High CDR", "Carrier Invoice", "Tariff Matrix", "BTRC Audit"],
        actionLabel: "View Product Details",
        actionHref: "/products/interconnect-billing",
        footerNote: "Telco Certified",
      },

      // 8. Hotel & Resort Booking Suite
      {
        id: "hotel",
        category: "specialized",
        title: "Hotel & Resort Booking Suite",
        badge: "Hospitality ERP",
        statusBadge: "Front Desk + POS",
        versionBadge: "Interactive",
        icon: "hotel",
        themeColor: "#ea580c",
        lightBg: "#fff7f2",
        borderColor: "#fedfd2",
        textColor: "#ea580c",
        description:
          "End-to-end hotel operations: interactive room booking calendar, guest front-desk check-in, housekeeping status, restaurant POS, and online booking engine.",
        telemetry: (
          <div className="w-full bg-[#fff6f0] border border-[#fedccb] rounded-xl p-3 shadow-sm mb-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#17162a] mb-1">
              <span>Occupancy Rate</span>
              <span className="text-[#ea580c] font-black">92% Booked</span>
            </div>
            <div className="w-full bg-[#fde5d9] h-1.5 rounded-full overflow-hidden mb-1">
              <div className="bg-[#ea580c] h-full w-[92%] rounded-full" />
            </div>
            <div className="text-[10px] text-[#515978]">
              124 Rooms Active · 14 Clean · 6 Cleaning
            </div>
          </div>
        ),
        checklist: [
          "Interactive drag-and-drop room reservation grid",
          "Guest identity card scan & folio management",
          "Restaurant & banquet bill sync to room folio",
        ],
        techTags: ["Room Calendar", "Front Desk Check-in", "Housekeeping", "Restaurant POS"],
        actionLabel: "View Product Details",
        actionHref: "/products/hotel-booking",
        footerNote: "Resort & Boutique Ready",
      },

      // 9. Bulk SMS & WebRTC Meeting
      {
        id: "sms",
        category: "specialized",
        title: "Bulk SMS & WebRTC Meeting",
        badge: "Comms & Video",
        statusBadge: "99.9% Delivery",
        versionBadge: "SMPP Ready",
        icon: "message-square",
        themeColor: "#16a34a",
        lightBg: "#f0fbf4",
        borderColor: "#c4efdc",
        textColor: "#16a34a",
        description:
          "Telecom-grade transactional SMS gateway API with 99.99% OTP delivery rates, combined with encrypted WebRTC video conference rooms for remote teams.",
        telemetry: (
          <div className="w-full bg-[#f0fbf4] border border-[#c3edd3] rounded-xl p-3 shadow-sm mb-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#17162a] mb-1">
              <span>SMS Delivery Rate</span>
              <span className="text-[#16a34a] font-black">0.8s OTP Speed</span>
            </div>
            <div className="w-full bg-[#d6f5e3] h-1.5 rounded-full overflow-hidden mb-1">
              <div className="bg-[#16a34a] h-full w-[98%] rounded-full" />
            </div>
            <div className="text-[10px] text-[#515978]">
              WebRTC: Zero-install HD Video / Screen Share
            </div>
          </div>
        ),
        checklist: [
          "Sub-second OTP delivery with direct operator SMPP",
          "Masking & non-masking campaign dashboard",
          "Zero-install HD browser video rooms & screen share",
        ],
        techTags: ["Direct SMPP", "OTP Instant", "WebRTC Video", "End-to-End Encrypted"],
        actionLabel: "View Product Details",
        actionHref: "/products/bulk-sms-meeting",
        footerNote: "SMPP API Ready",
      },
    ],
    []
  );

  // Filtered Products
  const displayedProducts = useMemo(() => {
    if (activeFilter === "all") return allProducts;
    return allProducts.filter((p) => p.category === activeFilter);
  }, [activeFilter, allProducts]);

  const totalCards = displayedProducts.length;

  // ─────────────────────────────────────────────────────────────
  // HORIZONTAL SCROLL ENGINE (PINNED STICKY SYNCHRONIZATION)
  // ─────────────────────────────────────────────────────────────
  // The outer container is tall enough to allow smooth vertical scrolling.
  // When the section enters the screen, it stays pinned (sticky top-0 h-screen).
  // Vertical scroll translates into horizontal translateX.
  // When horizontal track finishes, vertical scroll naturally resumes!
  // ─────────────────────────────────────────────────────────────
  const updateScroll = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight || 800;
    const trackWidth = track.scrollWidth;

    // Calculate maximum horizontal travel distance
    const maxTranslate = Math.max(0, trackWidth - viewportWidth + 64);
    setMaxScrollX(maxTranslate);

    const rect = container.getBoundingClientRect();
    const scrollableDistance = container.offsetHeight - viewportHeight;

    if (scrollableDistance <= 0) {
      setScrollProgress(0);
      setTranslateX(0);
      return;
    }

    // rect.top is 0 when sticky starts, and -scrollableDistance when sticky ends
    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));

    setScrollProgress(progress);
    setTranslateX(progress * maxTranslate);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateScroll();
        rafId = null;
      });
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateScroll, displayedProducts]);

  // Active Card Index (0 to totalCards - 1)
  const activeCardIndex = Math.min(
    totalCards - 1,
    Math.max(0, Math.round(scrollProgress * (totalCards - 1)))
  );

  // Programmatic Jump to Card
  const scrollToCard = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const containerTop = currentScrollY + rect.top;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const targetProgress = totalCards > 1 ? index / (totalCards - 1) : 0;
    const targetY = containerTop + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  // Natural scroll height: ~65vh per card for natural, comfortable browsing pace
  const outerHeight = totalCards > 4 ? "620vh" : "320vh";

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative bg-[#fafcfe]"
      style={{ height: outerHeight }}
    >
      {/* Pinned Viewport Container (Sticky top-0 h-screen) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-4 lg:py-4">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/3 w-[800px] h-[400px] bg-gradient-to-tr from-[#0072bc]/5 via-[#7c3aed]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[350px] bg-gradient-to-tl from-[#059669]/5 via-[#38bdf8]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* ========================================================
            TOP BAR: SECTION HEADER & CATEGORY TABS & PROGRESS CONTROLS
           ======================================================== */}
        <div className="w-full px-4 sm:px-8 lg:px-12 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-7xl mx-auto border-b border-[#e5eef8] pb-4">
            {/* Left Header */}
            <div className="rv-left">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="ey inline-block text-[11px] font-extrabold tracking-wider text-[#0072bc] uppercase bg-[#0072bc]/10 px-2.5 py-0.5 rounded-full border border-[#0072bc]/20">
                  OUR PRODUCTS
                </span>
                <span className="text-[11px] font-semibold text-[#838fa6]">
                  Horizontal Scroll Showcase
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#17162a]">
                Ready-made software, <em className="text-[#0072bc] not-italic font-serif italic">proven</em> in the field
              </h2>
            </div>

            {/* Right Category Filter Pills & Arrows */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 rv-right">
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#dce9f6] shadow-sm">
                {[
                  { id: "all", label: "All (9)" },
                  { id: "enterprise", label: "Enterprise & ERP" },
                  { id: "retail", label: "Field & Retail" },
                  { id: "specialized", label: "Specialized" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveFilter(tab.id as FilterCategory);
                      scrollToCard(0);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${activeFilter === tab.id
                      ? "bg-[#0072bc] text-white shadow-sm"
                      : "text-[#515978] hover:text-[#0072bc] hover:bg-[#f0f6fd]"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Prev / Next Card Controls */}
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous product"
                  disabled={activeCardIndex <= 0}
                  onClick={() => scrollToCard(activeCardIndex - 1)}
                  className="w-8 h-8 rounded-full border border-[#dce9f6] bg-white text-[#17162a] flex items-center justify-center hover:bg-[#0072bc] hover:text-white hover:border-[#0072bc] transition-all disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#17162a] cursor-pointer shadow-sm"
                >
                  <Icon name="arrow-right" size={14} className="rotate-180" />
                </button>
                <button
                  type="button"
                  aria-label="Next product"
                  disabled={activeCardIndex >= totalCards - 1}
                  onClick={() => scrollToCard(activeCardIndex + 1)}
                  className="w-8 h-8 rounded-full border border-[#dce9f6] bg-white text-[#17162a] flex items-center justify-center hover:bg-[#0072bc] hover:text-white hover:border-[#0072bc] transition-all disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#17162a] cursor-pointer shadow-sm"
                >
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            MIDDLE: HORIZONTAL SCROLL SHOWCASE TRACK
           ======================================================== */}
        <div className="w-full overflow-hidden my-auto py-2 rv-zoom">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 pl-4 sm:pl-8 lg:pl-16 pr-12 sm:pr-20 will-change-transform"
            style={{
              transform: `translateX(-${translateX}px) translateZ(0)`,
              transition: "transform 0.05s linear",
            }}
          >
            {displayedProducts.map((prod, index) => {
              const isCurrent = activeCardIndex === index;

              return (
                <div
                  key={prod.id}
                  className={`w-[320px] sm:w-[370px] md:w-[410px] shrink-0 rounded-3xl p-6 sm:p-7 border bg-white flex flex-col justify-between transition-all duration-300 ${isCurrent
                    ? "shadow-[0_20px_50px_rgba(0,114,188,0.12)] border-[#0072bc]/40 scale-[1.01]"
                    : "shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-[#e2eef9] hover:shadow-xl hover:border-[#0072bc]/30"
                    }`}
                  style={{
                    minHeight: "470px",
                  }}
                >
                  {/* Card Content Top */}
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-10 h-10 rounded-2xl text-white flex items-center justify-center shadow-md shrink-0"
                          style={{ backgroundColor: prod.themeColor }}
                        >
                          <Icon name={prod.icon} size={20} />
                        </div>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${prod.themeColor}15`,
                            color: prod.themeColor,
                            border: `1px solid ${prod.themeColor}30`,
                          }}
                        >
                          {prod.badge}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/25 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        {prod.statusBadge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-[22px] font-black tracking-tight text-[#17162a] mb-2 leading-snug">
                      {prod.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#515978] text-xs sm:text-[13px] leading-relaxed mb-3.5 font-normal">
                      {prod.description}
                    </p>

                    {/* Telemetry / Live Box */}
                    {prod.telemetry}

                    {/* Checklist */}
                    <div className="space-y-1.5 mb-4 text-xs">
                      {prod.checklist.map((pt) => (
                        <div key={pt} className="flex items-center gap-2 font-semibold text-[#17162a]">
                          <span
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 text-white"
                            style={{ backgroundColor: prod.themeColor }}
                          >
                            ✓
                          </span>
                          <span className="truncate">{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {prod.techTags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#f4f8fd] text-[#515978] border border-[#e1edf9]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-[#f0f5fb] flex items-center justify-between">
                    <a
                      href={prod.actionHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl text-white transition-all shadow-md hover:scale-105"
                      style={{ backgroundColor: prod.themeColor }}
                    >
                      <span>{prod.actionLabel}</span>
                      <span>→</span>
                    </a>
                    <span className="text-[11px] text-[#838fa6] font-medium">
                      {prod.footerNote}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            BOTTOM BAR: INTERACTIVE TIMELINE SCRUBBER & SCROLL HINT
           ======================================================== */}
        <div className="w-full px-4 sm:px-8 lg:px-12 shrink-0 rv-up">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#e5eef8]">
            {/* Progress Bar & Indicators */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-mono font-black text-[#0072bc] min-w-[50px]">
                {String(activeCardIndex + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
              </span>

              {/* Scrub Line */}
              <div className="w-48 sm:w-64 h-1.5 bg-[#e1edf9] rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#0072bc] via-[#7c3aed] to-[#059669] transition-[width] duration-75 rounded-full"
                  style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
                />
              </div>

              <span className="text-[11px] text-[#838fa6] font-medium hidden md:inline truncate max-w-[200px]">
                {displayedProducts[activeCardIndex]?.title}
              </span>
            </div>

            {/* Scroll Direction / Status Hint */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#515978]">
              {scrollProgress >= 0.98 ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-pulse">
                  <span>Completed</span>
                  <span>↓ Scroll down to continue</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[#0072bc] bg-[#f0f7fe] px-3 py-1 rounded-full border border-[#d2e4f7]">
                  <span className="animate-pulse">⇄</span>
                  <span>Scroll down to slide horizontally</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
