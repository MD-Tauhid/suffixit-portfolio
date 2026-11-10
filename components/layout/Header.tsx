"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";
import Icon from "@/components/ui/Icon";
import { navigation, isNavigationActive, isChildActive, type NavigationItem } from "@/lib/navigation";
import "./navigation.css";

const hashEvent = "suffix:navigation";
function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  window.addEventListener(hashEvent, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
    window.removeEventListener(hashEvent, callback);
  };
}
const readHash = () => window.location.hash;
const serverHash = () => "";

function Navigation({ pathname }: { pathname: string }) {
  const hash = useSyncExternalStore(subscribeHash, readHash, serverHash);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(() => navigation.find(item => item.children && isNavigationActive(item, pathname, ""))?.id ?? null);
  const root = useRef<HTMLElement>(null);
  const navigate = () => {
    setDesktopMenu(null);
    setMobileOpen(false);
    // Next's same-page hash navigation uses history rather than a native hashchange.
    requestAnimationFrame(() => requestAnimationFrame(() => window.dispatchEvent(new Event(hashEvent))));
  };

  useEffect(() => {
    if (!desktopMenu && !mobileOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setDesktopMenu(null);
        setMobileOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      const trigger = mobileOpen ? "#hb" : `[data-menu-toggle="${desktopMenu}"]`;
      setDesktopMenu(null);
      setMobileOpen(false);
      root.current?.querySelector<HTMLButtonElement>(trigger)?.focus();
    };
    const resize = () => { setDesktopMenu(null); setMobileOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [desktopMenu, mobileOpen]);

  const focusPanel = (item: NavigationItem) => {
    setDesktopMenu(item.id);
    requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>("#desktop-" + item.id + " [data-menu-link]")?.focus());
  };
  const current = (item: NavigationItem) => isNavigationActive(item, pathname, hash);
  const currentAttribute = (item: NavigationItem) => current(item) ? (item.href === pathname && !hash ? "page" as const : "location" as const) : undefined;

  return <header ref={root} className="site-header !z-50 !border-[#0072bc]/10 !bg-white/95 shadow-[0_4px_24px_-16px_rgba(0,114,188,.25)]" onPointerLeave={event => { if (event.pointerType === "mouse") setDesktopMenu(null); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDesktopMenu(null); }}>
    <div className="mx-auto flex h-[76px] w-[calc(100%-32px)] max-w-[1240px] items-center justify-between gap-5 lg:h-20 lg:w-[calc(100%-48px)]">
      <div className="w-[145px] shrink-0 [&_img]:h-auto [&_img]:w-full lg:w-[160px]"><Logo priority /></div>
      <nav className="hidden lg:block" aria-label="Primary">
        <ul className="flex list-none items-center gap-1 p-0">
          {navigation.map(item => <li key={item.id} onPointerEnter={event => { if (event.pointerType === "mouse") setDesktopMenu(item.children ? item.id : null); }}>
            <div className={`flex items-center rounded-full transition-colors duration-200 ${current(item) ? "bg-[#e8f3fc] text-[var(--br)]" : desktopMenu === item.id ? "bg-[#e8f3fc]/60 text-[var(--br)]" : "text-[#17162a]/70 hover:bg-[#e8f3fc]/60 hover:text-[var(--br)]"}`}>
              <Link href={item.href} onClick={navigate} aria-current={currentAttribute(item)} onKeyDown={event => { if (item.children && event.key === "ArrowDown") { event.preventDefault(); focusPanel(item); } }} className={`relative flex min-h-11 items-center rounded-full py-2.5 pl-4 text-[13px] font-semibold outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--br)] ${item.children ? "pr-1.5" : "pr-4"}`}>
                {current(item) && <span className="mr-2 size-[5px] shrink-0 rounded-full bg-[var(--br)]" aria-hidden="true" />}{item.label}
              </Link>
              {item.children && <button type="button" data-menu-toggle={item.id} aria-label={"Show " + item.label.toLowerCase()} aria-expanded={desktopMenu === item.id} aria-controls={"desktop-" + item.id} onClick={() => setDesktopMenu(desktopMenu === item.id ? null : item.id)} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); focusPanel(item); } }} className="mr-2 flex size-7 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#0072bc]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--br)]"><ChevronDown size={13} className={`transition-transform duration-200 motion-reduce:transition-none ${desktopMenu === item.id ? "rotate-180" : ""}`} /></button>}
            </div>
          </li>)}
        </ul>
      </nav>
      <Link href="/contact" onClick={navigate} className="hidden min-h-11 shrink-0 items-center gap-5 rounded-full bg-[var(--br)] px-5 py-3 text-xs font-semibold text-white transition-opacity duration-200 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--br)] lg:inline-flex">Let’s talk<ArrowUpRight size={16} /></Link>
      <button type="button" id="hb" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mn" onClick={() => { setMobileOpen(!mobileOpen); setDesktopMenu(null); }} className={`flex size-11 shrink-0 items-center justify-center rounded-[14px] border border-solid border-[#0072bc]/15 text-[var(--br)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--br)] lg:hidden ${mobileOpen ? "bg-[#e8f3fc]" : "bg-white"}`}>{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
    </div>

    {navigation.filter(item => item.children).map(item => <div key={item.id} id={"desktop-" + item.id} hidden={desktopMenu !== item.id} className="absolute inset-x-0 top-full hidden px-6 pb-4 lg:block" style={desktopMenu !== item.id ? { display: "none" } : undefined}>
      <div className="site-nav-panel mx-auto grid max-h-[calc(100dvh-104px)] max-w-[1180px] grid-cols-[230px_1fr] overflow-y-auto overscroll-contain rounded-[24px] border border-solid border-[#0072bc]/10 bg-white shadow-[0_22px_55px_-20px_rgba(0,114,188,.28)]">
        <div className="flex flex-col bg-[#e8f3fc] p-7">
          <span className="text-[10px] font-semibold text-[var(--br)]">Explore {item.label.toLowerCase()}</span><p className="mt-5 text-[27px] font-semibold leading-[1.15] tracking-[-.8px]">{item.id === "services" ? "Expertise that works together." : "Software for the way you work."}</p><p className="mb-8 mt-4 text-[11px] leading-[1.85] text-[#17162a]/[.65]">{item.description}</p><Link href={item.href} onClick={navigate} className="mt-auto flex min-h-11 items-center justify-between gap-4 text-xs font-semibold text-[var(--br)]">View all {item.label.toLowerCase()}<ArrowUpRight size={17} /></Link>
        </div>
        <nav aria-label={item.label + " submenu"} className="grid grid-cols-3 gap-x-2 gap-y-1 p-5">
          {item.children?.map(child => {
            const selected = isChildActive(child, pathname, hash);
            return <Link key={child.href} href={child.href} onClick={navigate} data-menu-link aria-current={selected ? child.href.includes("#") ? "location" : "page" : undefined} className={`group flex items-start gap-3 rounded-[14px] px-3 py-4 transition-colors duration-200 outline-offset-2 hover:bg-[#e8f3fc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--br)] ${selected ? "bg-[#e8f3fc] text-[var(--br)]" : "text-[var(--ink)]"}`}>
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-[11px] transition-colors duration-200 ${selected ? "bg-[var(--br)] text-white" : "bg-[#e8f3fc] text-[var(--br)] group-hover:bg-white"}`}><Icon name={child.icon} size={17} /></span>
              <span className="min-w-0"><span className="block text-[12px] font-semibold leading-[1.45]">{child.label}</span><span className="mt-1.5 block text-[10px] leading-[1.65] text-[#17162a]/60">{child.description}</span></span>
            </Link>;
          })}
        </nav>
      </div>
    </div>)}

    <nav id="mn" hidden={!mobileOpen} aria-label="Mobile" className="absolute inset-x-0 top-full max-h-[calc(100dvh-92px)] overflow-y-auto overscroll-contain border-0 border-b border-solid border-[#0072bc]/10 bg-white p-4 pb-6 shadow-[0_22px_45px_-24px_rgba(0,114,188,.3)] lg:!hidden">
      {mobileOpen && <div className="site-nav-panel mx-auto max-w-xl">
        <div className="mb-3 flex items-center justify-between px-3 py-2 text-[10px] text-[#17162a]/[.55]"><span>Explore Suffix IT</span><span>Software &amp; ICT solutions</span></div>
        <ul className="grid list-none gap-1 p-0">{navigation.map(item => <li key={item.id}>
          <div className={`flex items-center rounded-[14px] ${current(item) ? "bg-[#e8f3fc] text-[var(--br)]" : "text-[var(--ink)]"}`}>
            <Link href={item.href} onClick={navigate} aria-current={currentAttribute(item)} className="flex min-h-[52px] flex-1 items-center gap-3 rounded-[14px] px-4 py-3 text-[15px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--br)]">{current(item) && <span className="size-1.5 rounded-full bg-[var(--br)]" aria-hidden="true" />}{item.label}</Link>
            {item.children && <button type="button" aria-label={"Show " + item.label.toLowerCase()} aria-expanded={mobileGroup === item.id} aria-controls={"mobile-" + item.id} onClick={() => setMobileGroup(mobileGroup === item.id ? null : item.id)} className="mr-2 flex size-10 items-center justify-center rounded-full text-[var(--br)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--br)]"><ChevronDown size={17} className={`transition-transform duration-200 motion-reduce:transition-none ${mobileGroup === item.id ? "rotate-180" : ""}`} /></button>}
          </div>
          {item.children && <ul id={"mobile-" + item.id} hidden={mobileGroup !== item.id} style={mobileGroup !== item.id ? { display: "none" } : undefined} className="my-2 ml-5 grid list-none gap-1 border-0 border-l border-solid border-[#0072bc]/15 pl-3">
            {item.children.map(child => <li key={child.href}><Link href={child.href} onClick={navigate} aria-current={isChildActive(child, pathname, hash) ? "location" : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-xs leading-[1.5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--br)] ${isChildActive(child, pathname, hash) ? "bg-[#e8f3fc] font-semibold text-[var(--br)]" : "text-[#17162a]/70"}`}><Icon name={child.icon} size={15} className="shrink-0 text-[var(--br)]" />{child.label}</Link></li>)}
          </ul>}
        </li>)}</ul>
        <Link href="/contact" onClick={navigate} className="mt-5 flex min-h-12 items-center justify-between rounded-full bg-[var(--br)] px-5 py-3 text-sm font-semibold text-white hover:!text-white">Let’s talk about your project<ArrowUpRight size={18} /></Link>
      </div>}
    </nav>
  </header>;
}

/** Route-keyed navigation closes disclosures when the current page changes. */
export default function Header() {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} />;
}
