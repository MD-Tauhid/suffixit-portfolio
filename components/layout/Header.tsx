"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Chevron from "./Chevron";
import { mobileMenu, productMenu, serviceMenu, type Link } from "@/lib/content";

function Dropdown({ items }: { items: Link[] }) {
  return (
    <div className="dd two">
      {items.map((item) => (
        <a key={item.label} href={item.href}>
          <i aria-hidden="true">{item.icon}</i>
          {item.label}
        </a>
      ))}
    </div>
  );
}

/** Client component only for the mobile menu toggle. Dropdowns are pure CSS (hover / focus-within). */
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
              <li><a href="#">Home</a></li>
              <li><a href="#why">About Us</a></li>
              <li>
                <a href="#services">Services <Chevron /></a>
                <Dropdown items={serviceMenu} />
              </li>
              <li>
                <a href="#products">Products <Chevron /></a>
                <Dropdown items={productMenu} />
              </li>
              <li><a href="#clients">Clients</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <div style={{ display: "flex", gap: 10 }}>
            <a className="btn p hd-cta" href="#contact">Get a Quote</a>
            <button
              type="button"
              className="hb"
              id="hb"
              aria-expanded={open}
              aria-controls="mn"
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true">☰</span>
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>
      <div className={`mnav${open ? " open" : ""}`} id="mn" role="navigation" aria-label="Mobile">
        {mobileMenu.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
      </div>
    </>
  );
}
