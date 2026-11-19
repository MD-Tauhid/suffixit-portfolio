"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ExternalLink,
  Layers3,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { productDetails, type Product } from "@/lib/products";

export interface ProductCardData {
  slug: string;
  name: string;
  category: string;
  badge: string;
  headline: string;
  metric: string;
  version: string;
}

const defaultProducts: ProductCardData[] = [
  // 1. Center Column Products (Primary Flagships)
  {
    slug: "rupantar-erp",
    name: "Rupantar ERP",
    category: "ERP & Operations",
    badge: "erp",
    headline: "Unified supply chain,\nmulti-warehouse stock &\nNBR VAT finance core.",
    metric: "99.98% Stock Accuracy",
    version: "v4.2 Multi-GL",
  },
  {
    slug: "field-force",
    name: "Field Force (FFMS)",
    category: "Field & Mobility",
    badge: "ffms",
    headline: "Real-time GPS telemetry,\ngeofenced beats &\noffline order booking.",
    metric: "100k+ Field Visits/Day",
    version: "v2.8 Mobile",
  },
  {
    slug: "rupantar-hcm",
    name: "Rupantar HCM",
    category: "Human Capital",
    badge: "hcm",
    headline: "Biometric timeclock sync,\nstatutory tax rules &\n1-click salary payslips.",
    metric: "Realtime IP Punch Sync",
    version: "v3.4 Cloud",
  },
  {
    slug: "smart-pos",
    name: "Smart POS Suite",
    category: "Retail & Commerce",
    badge: "pos",
    headline: "Sub-50ms barcode checkout,\nsplit tender payments &\nthermal Z-report printing.",
    metric: "< 50ms Barcode Scan",
    version: "v2.6 Touch",
  },

  // 2. Right Columns Products
  {
    slug: "ecommerce",
    name: "Suffix E-Commerce",
    category: "Field & Retail",
    badge: "web",
    headline: "High-speed storefront,\nERP stock synchronization &\ninstant bKash checkout.",
    metric: "< 0.8s Page Speed Index",
    version: "v3.0 Next.js",
  },
  {
    slug: "provident-fund",
    name: "Provident Fund",
    category: "ERP & People",
    badge: "pf",
    headline: "Automated trust records,\ncompounding interest &\nstatutory pension audit.",
    metric: "100% NBR Rule Compliant",
    version: "v2.1 Statutory",
  },
  {
    slug: "hotel-booking",
    name: "Hotel Booking PMS",
    category: "Field & Retail",
    badge: "pms",
    headline: "Realtime room calendar,\nseasonal tariff management &\nguest folio reservation.",
    metric: "99.9% Reservation Uptime",
    version: "v2.0 Realtime",
  },
  {
    slug: "interconnect-billing",
    name: "Interconnect Billing",
    category: "Communication",
    badge: "cdr",
    headline: "High-throughput CDR rating,\ncarrier settlements &\ntelecom regulatory reporting.",
    metric: "10M+ CDR / Hour",
    version: "v3.5 Carrier",
  },

  // 3. Left Columns Products
  {
    slug: "bulk-sms-meeting",
    name: "Bulk SMS & Meeting",
    category: "Communication",
    badge: "sms",
    headline: "High-deliverability SMS,\ntelco route failovers &\nencrypted WebRTC meetings.",
    metric: "500k SMS / Minute",
    version: "v2.4 Telco",
  },
  {
    slug: "payroll-system",
    name: "Automated Payroll",
    category: "ERP & People",
    badge: "pay",
    headline: "Configurable salary slabs,\nattendance deductions &\nBEFTN bank advice export.",
    metric: "1-Click Bank Advice",
    version: "v3.1 BEFTN",
  },
  {
    slug: "rupantor-inventory",
    name: "Rupantor Inventory",
    category: "Field & Retail",
    badge: "wms",
    headline: "Multi-depot stock ledger,\nbatch serial barcodes &\nautomated reorder alarms.",
    metric: "0 Loss Discrepancy",
    version: "v3.0 Multi-Depot",
  },
  {
    slug: "transformer-monitoring",
    name: "Transformer IoT",
    category: "Connected Systems",
    badge: "iot",
    headline: "Industrial RTU telemetry,\nthermal overload sensor &\n24/7 SMS SCADA alarms.",
    metric: "24/7 Live Thermal Monitor",
    version: "v2.2 Edge",
  },
];

// ---------- measured geometry (stage px, 864 px tall stage) ----------
const STAGE_H = 864;
const CW = 379; // card width
const CH = 433; // card height
const RAD = 24; // card corner radius
const COLP = 454; // column pitch
const ROWP = 515; // row pitch
const ODD = -ROWP / 2; // vertical offset of odd columns
const BADGE_PX = 13;
const BADGE_MAX_W = 58;
const GPAD = 600;
const CY = 1;

// Reference frame timing tables (30 fps)
const A_T = [0, 0.1, 0.2, 0.2, 0.3, 0.5, 0.8, 1, 1.2, 1.5, 1.8, 2, 2.3, 2.7, 3.1, 3.5, 3.9, 4.4, 4.9, 5.4, 5.9, 6.6, 7.3, 8.1, 8.9, 9.9, 10.9, 11.9, 12.8, 13.9, 15, 16.4, 17.7, 19.4, 21, 22.4, 23.8, 24.6, 25.5, 25.8, 26];
const F_T = [0, -3.8, -8.7, -16.1, -27, -41, -59, -80.6, -106.2, -134.4, -163.8, -193.8, -223, -251.8, -278.2, -302.3, -324, -343.9, -362.5, -379.5, -395, -409.4, -422.5, -434.3, -444.4, -453.2, -460.8, -467.5, -473.2, -478, -482, -485.2, -487.8, -489.7, -490.8, -491.3];
const S_T = [0, -0.3, -0.5, -0.8, -1, -1.4, -1.8, -2.3, -2.8, -3.4, -3.9, -4.6, -5.2, -5.9, -6.6, -7.4, -8.1, -8.9, -9.7, -10.5, -11.3, -12.1, -12.9, -13.7, -14.5, -15.3, -16.1, -16.8, -17.5, -18.3, -19.1, -19.8, -20.5, -21.3, -22, -22.6, -23.3, -24, -24.6, -25.3, -25.9, -26.5, -27.1, -27.7, -28.3, -28.8, -29.4, -29.9, -30.5, -30.9, -31.5, -31.9, -32.4, -32.8, -33.3, -33.6, -34, -34.4, -34.7, -35.1, -35.4, -35.7, -36.1, -36.4, -36.7, -37, -37.3, -37.6, -37.9, -38.1, -38.4, -38.7, -39, -39.2, -39.5, -39.7, -40, -40.2, -40.4, -40.7, -40.9, -41.1, -41.3, -41.5, -41.8, -42, -42.2, -42.4, -42.5, -42.7, -42.9, -43.1, -43.3, -43.5, -43.6, -43.8, -44, -44.1, -44.3, -44.4, -44.6, -44.8, -44.9, -45, -45.2, -45.3, -45.5, -45.6, -45.7, -45.9, -46, -46.1, -46.2, -46.4, -46.5, -46.6, -46.7, -46.8, -46.9, -47, -47.1, -47.2, -47.3, -47.4, -47.5, -47.6, -47.7, -47.8, -47.9, -48, -48.1, -48.1, -48.2, -48.3, -48.4, -48.5, -48.5, -48.6, -48.7, -48.8, -48.8, -48.9, -49, -49, -49.1, -49.2, -49.2, -49.3, -49.3, -49.4, -49.4, -49.5, -49.5, -49.6, -49.7, -49.7, -49.8, -49.8, -49.8, -49.9, -49.9, -50, -50, -50.1, -50.1, -50.1, -50.2, -50.2, -50.3, -50.3, -50.3, -50.4, -50.4, -50.4, -50.5, -50.5, -50.5, -50.5, -50.6, -50.6, -50.6, -50.6, -50.7, -50.7];
const F_START = 25;
const S_START = 60;
const TOTAL = -516;
const T_END = S_START + S_T.length - 1;
const LAG = 12.8;
const BLUR_K = 0.17;

function lookup(tab: number[], x: number) {
  if (x <= 0) return tab[0];
  const n = tab.length - 1;
  if (x >= n) return tab[n];
  const i = Math.floor(x);
  const f = x - i;
  return tab[i] + (tab[i + 1] - tab[i]) * f;
}

function prog(t: number, d: number) {
  if (t <= 0) return 0;
  if (t >= T_END && t - F_START - d >= F_T.length) return 1;
  return (lookup(A_T, t) + lookup(F_T, t - F_START - d) + lookup(S_T, t - S_START)) / TOTAL;
}

const ss = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const rimL = (y: number) => 0.08 + 0.92 * ss(-40, 25, y);
const rimR = (y: number) => 0.1 + 0.85 * ss(-5, 30, y) * (1 - ss(115, 150, y));
const rimT = (x: number, y: number) => {
  const d = x - 140;
  const bump = Math.exp(-((d / (d < 0 ? 45 : 18)) ** 2) / 2);
  return 0.13 + 0.8 * bump * ss(-60, -160, y) + 0.12 * ss(150, 300, y);
};
const rimB = (x: number, y: number) => 0.07 + 0.16 * ss(40, -170, x) * ss(80, 180, y);
const H_OFF = [0, 0.03, 0.08, 0.16, 0.26, 0.36, 0.46, 0.56, 0.64, 0.72, 0.8, 0.88, 0.94, 0.97, 1];
const V_OFF = [0, 0.1, 0.2, 0.3, 0.38, 0.46, 0.54, 0.62, 0.7, 0.78, 0.86, 0.93, 1];

type Move = { t0: number; dx: number; dy: number; bx: number; by: number };
type Cell = { c: number; r: number; key: string };

const isOdd = (c: number) => Math.abs(c) % 2 === 1;
const cellX = (c: number) => c * COLP;
const cellY = (c: number, r: number) => r * ROWP + (isOdd(c) ? ODD : 0);
const mod = (a: number, n: number) => ((a % n) + n) % n;

let uidSeed = 0;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function pickProductIndex(n: number, c: number, r: number) {
  if (!n) return -1;
  const g = Math.ceil(n / 3);
  const centre = [0, g];
  const right = n > g ? [g, Math.min(n, 2 * g)] : centre;
  const left = n > 2 * g ? [2 * g, n] : right;
  const [a, b] = !isOdd(c) ? centre : c > 0 ? right : left;
  return a + mod(r + (isOdd(c) ? 0 : Math.trunc(c / 2)), b - a);
}

function noiseTile() {
  if (typeof document === "undefined") return "";
  try {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 128;
    const g = cv.getContext("2d");
    if (!g) return "";
    const im = g.createImageData(128, 128);
    for (let i = 0; i < im.data.length; i += 4) {
      const v = Math.random() * 255;
      im.data[i] = im.data[i + 1] = im.data[i + 2] = v;
      im.data[i + 3] = 255;
    }
    g.putImageData(im, 0, 0);
    return cv.toDataURL();
  } catch {
    return "";
  }
}

export interface ProductGlassWallProps {
  products?: ProductCardData[];
  /** Seconds between automatic hand-offs to next card (User requested 2s). 0 = paused */
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProductGlassWall({
  products = defaultProducts,
  interval = 2, // 2-second upward hand-off as explicitly requested
  className,
  style,
}: ProductGlassWallProps) {
  const router = useRouter();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 1000, h: 720 });
  const [cells, setCells] = React.useState<Cell[]>([]);
  const reactId = React.useId().replace(/[:]/g, "");
  const uid = "pw" + reactId;
  const [noise, setNoise] = React.useState<string>("");
  const [isPaused, setIsPaused] = React.useState(false);
  const effectiveInterval = isPaused ? 0 : interval;

  React.useEffect(() => {
    setNoise(noiseTile());
  }, []);

  // Suffix IT Premium Brand Colors
  const background = "#040a18"; // Deep midnight tech navy
  const glow = "#00c2ff"; // Suffix electric cyan bloom
  const haze = "#0052cc"; // Suffix royal blue haze
  const glass = "#122646"; // Frosted sapphire glass
  const accent = "#001a40"; // Deep midnight orb
  const text = "#ffffff";
  const font = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  type CardEls = {
    root: HTMLDivElement;
    inner: HTMLDivElement;
    glass: HTMLDivElement | null;
    blur: SVGFEGaussianBlurElement | null;
    rim: SVGStopElement[][];
    last: string;
  };
  const els = React.useRef(new Map<string, CardEls>());
  const st = React.useRef({
    clock: 0,
    last: -1,
    moves: [] as Move[],
    base: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    focus: { c: 0, r: 0 },
    nextAuto: effectiveInterval > 0 ? effectiveInterval : Infinity,
    hover: "",
    hoverAmt: new Map<string, number>(),
    cellKey: "",
  });
  const props = React.useRef({ interval: effectiveInterval, speed: 1, products });
  props.current = { interval: effectiveInterval, speed: 1, products };

  const s = size.h / STAGE_H;
  const wr = size.w / s;

  const getProduct = React.useCallback(
    (c: number, r: number) => {
      const idx = pickProductIndex(products.length, c, r);
      return idx >= 0 ? products[idx] : null;
    },
    [products]
  );

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const S = st.current;
    S.nextAuto =
      effectiveInterval > 0
        ? (S.moves.length ? S.moves[S.moves.length - 1].t0 : 0) + effectiveInterval
        : Infinity;
    if (S.nextAuto < S.clock) S.nextAuto = S.clock + effectiveInterval;
  }, [effectiveInterval]);

  const neededCells = React.useCallback((): Cell[] => {
    const S = st.current;
    const halfW = wr / 2 + CW;
    const halfH = STAGE_H / 2 + CH;
    const offs = [S.base, S.target, ...S.moves.map((m) => ({ x: m.bx, y: m.by }))];
    const xs = offs.map((o) => o.x);
    const ys = offs.map((o) => o.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const out: Cell[] = [];
    const c0 = Math.floor((-halfW - maxX) / COLP);
    const c1 = Math.ceil((halfW - minX) / COLP);
    for (let c = c0; c <= c1; c++) {
      const x = cellX(c);
      if (x + maxX < -halfW || x + minX > halfW) continue;
      const oy = isOdd(c) ? ODD : 0;
      const r0 = Math.floor((-halfH - maxY - oy) / ROWP) - 1;
      const r1 = Math.ceil((halfH - minY - oy) / ROWP) + 1;
      for (let r = r0; r <= r1; r++) out.push({ c, r, key: c + ":" + r });
    }
    return out;
  }, [wr]);

  const select = React.useCallback(
    (c: number, r: number) => {
      const S = st.current;
      const P = props.current;
      const dx = -(cellX(c) + S.target.x);
      const dy = -(cellY(c, r) + S.target.y);
      S.focus = { c, r };
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const t0 = S.clock;
        S.moves.push({ t0, dx, dy, bx: S.target.x, by: S.target.y });
        S.target = { x: S.target.x + dx, y: S.target.y + dy };
      }
      if (P.interval > 0) S.nextAuto = S.clock + P.interval;
      const prod = getProduct(c, r);
      if (prod) {
        // Quick navigation or feedback
      }
    },
    [getProduct]
  );

  // Per-frame layout computation
  const frame = React.useCallback(() => {
    const S = st.current;
    const P = props.current;

    // Auto-advance loop: Queue the upward hand-off every `interval` seconds!
    let guard = 0;
    while (S.clock >= S.nextAuto && guard++ < 50) {
      const t0 = S.nextAuto;
      S.focus = { c: S.focus.c, r: S.focus.r + 1 };
      const dy = -(cellY(S.focus.c, S.focus.r) + S.target.y);
      const dx = -(cellX(S.focus.c) + S.target.x);
      S.moves.push({ t0, dx, dy, bx: S.target.x, by: S.target.y });
      S.target = { x: S.target.x + dx, y: S.target.y + dy };
      S.nextAuto += P.interval > 0 ? P.interval : Infinity;
    }

    const fps = 30 * Math.max(0.05, P.speed);
    while (S.moves.length) {
      const m = S.moves[0];
      const tf = (S.clock - m.t0) * fps;
      if (tf > T_END + 80) {
        S.base = { x: S.base.x + m.dx, y: S.base.y + m.dy };
        S.moves.shift();
      } else break;
    }

    const need = neededCells();
    const key = need.map((n) => n.key).join("|");
    if (key !== S.cellKey) {
      S.cellKey = key;
      setCells(need);
    }

    const pos = (c: number, r: number, clock: number) => {
      let x = cellX(c) + S.base.x;
      let y = cellY(c, r) + S.base.y;
      for (const m of S.moves) {
        const len = Math.hypot(m.dx, m.dy) || 1;
        const px = cellX(c) + m.bx;
        const py = cellY(c, r) + m.by;
        const ahead = -(px * m.dx + py * m.dy) / len;
        const d = Math.max(-24, Math.min(80, (LAG * ahead) / ROWP));
        const g = prog((clock - m.t0) * fps, d);
        x += m.dx * g;
        y += m.dy * g;
      }
      return [x, y];
    };

    const dt = 0.5 / fps;
    for (const cell of need) {
      const e = els.current.get(cell.key);
      if (!e) continue;
      const [x, y] = pos(cell.c, cell.r, S.clock);
      const [x0, y0] = pos(cell.c, cell.r, S.clock - dt);
      const vx = Math.abs(x - x0) * 2;
      const vy = Math.abs(y - y0) * 2;
      const h0 = S.hoverAmt.get(cell.key) || 0;
      const h = h0 + ((S.hover === cell.key ? 1 : 0) - h0) * 0.18;
      if (Math.abs(h) > 0.001) S.hoverAmt.set(cell.key, h);
      else S.hoverAmt.delete(cell.key);

      const sharp = 1 - 0.85 * h;
      const bx = vx * BLUR_K * Math.pow(vx / 15, 0.35) * sharp;
      const by = vy * BLUR_K * Math.pow(vy / 15, 0.35) * sharp;
      const lift = h * 8;

      e.root.style.transform = `translate(${(wr / 2 + x - CW / 2).toFixed(2)}px, ${(
        STAGE_H / 2 +
        CY +
        y -
        CH / 2 -
        lift
      ).toFixed(2)}px) scale(${(1 + h * 0.022).toFixed(4)})`;
      e.root.style.zIndex = h > 0.01 ? "2" : "1";
      e.root.style.setProperty("--aw-hover", h.toFixed(3));

      if (e.blur && (bx > 0.05 || by > 0.05)) {
        e.blur.setAttribute("stdDeviation", `${bx.toFixed(2)} ${by.toFixed(2)}`);
        e.inner.style.filter = `url(#${uid}-${cell.key.replace(":", "_").replace(/-/g, "m")})`;
      } else {
        e.inner.style.filter = "none";
      }

      const sig = x.toFixed(1) + "," + y.toFixed(1) + "," + h.toFixed(2) + "," + wr.toFixed(1);
      if (sig !== e.last) {
        e.last = sig;
        const X0 = x - CW / 2;
        const Y0 = y + CY - CH / 2 - lift;
        if (e.glass) {
          e.glass.style.backgroundPosition = `${(-(wr / 2 + X0) - GPAD).toFixed(2)}px ${(
            -(STAGE_H / 2 + Y0) - GPAD
          ).toFixed(2)}px`;
        }
        const hb = 0.3 * h;
        const set = (arr: SVGStopElement[], vals: number[]) => {
          for (let i = 0; i < arr.length; i++) {
            arr[i].setAttribute("stop-opacity", Math.min(1, vals[i] + hb).toFixed(3));
          }
        };
        set(
          e.rim[0],
          H_OFF.map((o, i) => {
            const v = rimT(X0 + o * CW, Y0);
            return i <= 1 ? v + 0.05 * ss(-60, -160, Y0) : v;
          })
        );
        set(
          e.rim[1],
          H_OFF.map((o, i) => {
            const v = rimB(X0 + o * CW, Y0 + CH);
            if (i <= 1) return Math.max(v, rimL(Y0 + CH - 8) * (i ? 0.55 : 0.85));
            if (i >= H_OFF.length - 2) return Math.max(v, rimR(Y0 + CH - 8) * 0.5);
            return v;
          })
        );
        set(
          e.rim[2],
          V_OFF.map((o) => rimL(Y0 + RAD + o * (CH - 2 * RAD)))
        );
        set(
          e.rim[3],
          V_OFF.map((o) => rimR(Y0 + RAD + o * (CH - 2 * RAD)))
        );
      }
    }
  }, [neededCells, wr, uid]);

  // Main animation frame loop
  React.useEffect(() => {
    const S = st.current;
    let raf = 0;
    let visible = true;
    let inView = true;

    const loop = (now: number) => {
      if (S.last >= 0) S.clock += Math.max(0, now - S.last) / 1000;
      S.last = now;
      frame();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || !visible || !inView) return;
      S.last = -1;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVis = () => {
      visible = document.visibilityState !== "hidden";
      if (visible) start();
      else stop();
    };

    document.addEventListener("visibilitychange", onVis);
    let io: IntersectionObserver | null = null;
    if (rootRef.current && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((en) => {
        inView = en[0]?.isIntersecting ?? true;
        if (inView) start();
        else stop();
      });
      io.observe(rootRef.current);
    }

    frame();
    start();

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [frame]);

  useIsomorphicLayoutEffect(() => {
    frame();
  });

  // Backdrop: Suffix IT Cyan/Azure Bloom + Midnight Navy
  const PHI = 197.7;
  const a = (PHI * Math.PI) / 180;
  const dir = [Math.sin(a), -Math.cos(a)];
  const Lref = Math.abs(720 * Math.sin(a)) + Math.abs(864 * Math.cos(a));
  const Lact = Math.abs(wr * Math.sin(a)) + Math.abs(864 * Math.cos(a));
  const shift = (wr - 360 - wr / 2) * dir[0];
  const at = (t: number) => (Lact / 2 + (t - 0.5) * Lref + shift).toFixed(1) + "px";
  const hz = (p: number) => `color-mix(in srgb, ${haze} ${p}%, transparent)`;
  const gl = (p: number) => `color-mix(in srgb, ${glow} ${p}%, transparent)`;
  const bloomX = wr - 720 + 755.5;

  const backdropGradients = [
    `radial-gradient(circle 860px at ${bloomX.toFixed(1)}px 47.6px, ${gl(95)} 0px, ${gl(
      55
    )} 180px, ${gl(35)} 340px, ${gl(8)} 500px, ${gl(0)} 860px)`,
    `linear-gradient(${PHI}deg, ${hz(75)} ${at(0)}, ${hz(70)} ${at(0.2)}, ${hz(45)} ${at(
      0.4
    )}, ${hz(10)} ${at(0.6)}, ${hz(0)} ${at(1)})`,
  ].join(", ");

  // Glass field: Frosted sapphire shading
  const GPHI = 227.4;
  const ga = (GPHI * Math.PI) / 180;
  const gdx = Math.sin(ga);
  const gL = Math.abs(720 * Math.sin(ga)) + Math.abs(864 * Math.cos(ga));
  const gLp =
    Math.abs((wr + 2 * GPAD) * Math.sin(ga)) + Math.abs((STAGE_H + 2 * GPAD) * Math.cos(ga));
  const gat = (t: number) =>
    ((t - 0.5) * gL + (wr / 2 - 360) * gdx + gLp / 2).toFixed(1) + "px";
  const gBase = `color-mix(in srgb, ${glass} 45%, ${background})`;
  const gBand = `color-mix(in srgb, ${glass} 55%, ${haze})`;
  const gLight = `color-mix(in srgb, ${glow} 10%, #d8f3ff)`;
  const gFloor = `color-mix(in srgb, ${glass} 70%, ${glow})`;
  const cm = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
  const gx = (x: number) => (wr / 2 - 360 + x + GPAD).toFixed(1) + "px";
  const gy = (y: number) => (y + GPAD).toFixed(1) + "px";

  const glassFieldGradients = [
    `radial-gradient(ellipse 230px 250px at ${gx(300)} ${gy(540)}, rgba(0, 15, 45, 0.12), rgba(0, 15, 45, 0.06) 60%, rgba(0, 15, 45, 0) 100%)`,
    `radial-gradient(ellipse 130px 92px at ${gx(260)} ${gy(380)}, rgba(0, 15, 45, 0.25), rgba(0, 15, 45, 0.1) 55%, rgba(0, 15, 45, 0) 100%)`,
    `radial-gradient(ellipse 112px 232px at ${gx(515)} ${gy(455)}, rgba(180, 230, 255, 0.12), rgba(180, 230, 255, 0.05) 55%, rgba(180, 230, 255, 0) 100%)`,
    `radial-gradient(circle 482.3px at ${(165.1 + GPAD).toFixed(1)}px ${(740.4 + GPAD).toFixed(
      1
    )}px, ${cm(gFloor, 100)} 0px, ${cm(gFloor, 72.6)} 120.6px, ${cm(gFloor, 24.9)} 241.2px, ${cm(
      gFloor,
      19.4
    )} 361.7px, ${cm(gFloor, 0)} 482.3px)`,
    `radial-gradient(ellipse 212px 305px at ${(730 + wr - 720 + GPAD).toFixed(1)}px ${(
      62 + GPAD
    ).toFixed(1)}px, ${cm(gLight, 96)} 0%, ${cm(gLight, 72)} 35%, ${cm(gLight, 33)} 66%, ${cm(
      gLight,
      0
    )} 100%)`,
    `linear-gradient(${GPHI}deg, ${cm(gBand, 100)} ${gat(0)}, ${cm(gBand, 94.6)} ${gat(0.2)}, ${cm(
      gBand,
      45.9
    )} ${gat(0.4)}, ${cm(gBand, 0)} ${gat(0.6)}, ${cm(gBand, 0)} ${gat(0.8)}, ${cm(
      gBand,
      33
    )} ${gat(1)})`,
  ].join(", ");

  const rimColor = "#70caff";
  const line = "rgba(0, 194, 255, 0.65)";
  const ac = (p: number, w: string) => `color-mix(in srgb, ${accent} ${p}%, ${w})`;

  const renderCard = (cell: Cell) => {
    const prod = getProduct(cell.c, cell.r);
    if (!prod) return null;
    const fid = `${uid}-${cell.key.replace(":", "_").replace(/-/g, "m")}`;

    return (
      <div
        key={cell.key}
        ref={(el) => {
          if (el) {
            const inner = el.firstElementChild as HTMLDivElement;
            const blur = el.querySelector("feGaussianBlur") as SVGFEGaussianBlurElement | null;
            const rim = ["t", "b", "l", "r"].map((k) =>
              Array.from(el.querySelectorAll(`[data-rim="${k}"] stop`)) as SVGStopElement[]
            );
            const glassEl = el.querySelector("[data-glass]") as HTMLDivElement | null;
            els.current.set(cell.key, { root: el, inner, glass: glassEl, blur, rim, last: "" });
          } else {
            els.current.delete(cell.key);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${prod.name}: ${prod.headline.replace(/\n/g, " ")}`}
        onPointerEnter={() => (st.current.hover = cell.key)}
        onPointerLeave={() => {
          if (st.current.hover === cell.key) st.current.hover = "";
        }}
        onClick={() => select(cell.c, cell.r)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select(cell.c, cell.r);
          }
        }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: CW,
          height: CH,
          willChange: "transform",
          cursor: "pointer",
          outline: "none",
          transformOrigin: "50% 50%",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Frosted Glass Body */}
          <div
            data-glass=""
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: RAD,
              backgroundImage: glassFieldGradients,
              backgroundColor: gBase,
              backgroundSize: `${wr + 2 * GPAD}px ${STAGE_H + 2 * GPAD}px`,
              backgroundRepeat: "no-repeat",
              boxShadow:
                "0 24px 50px -15px rgba(0, 10, 35, calc(0.4 + var(--aw-hover, 0) * 0.3)), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            }}
          />

          {/* Dynamic Light Sheen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: RAD,
              pointerEvents: "none",
              backgroundImage: [
                "radial-gradient(ellipse 200px 110px at 92px 405px, rgba(0, 194, 255, 0.06), rgba(0, 194, 255, 0) 100%)",
                "linear-gradient(140deg, rgba(220, 245, 255, 0) 46%, rgba(220, 245, 255, 0.04) 55%, rgba(0, 194, 255, 0.08) 63%, rgba(220, 245, 255, 0.03) 71%, rgba(0, 194, 255, 0.02) 79%, rgba(220, 245, 255, 0) 87%)",
              ].join(", "),
            }}
          />

          {/* Dynamic Rim Light */}
          <svg
            width={CW}
            height={CH}
            viewBox={`0 0 ${CW} ${CH}`}
            style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
            aria-hidden="true"
          >
            <defs>
              {(["t", "b"] as const).map((k) => (
                <linearGradient
                  key={k}
                  id={`${fid}-r${k}`}
                  data-rim={k}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2={CW}
                  y2="0"
                >
                  {H_OFF.map((o) => (
                    <stop key={o} offset={o} style={{ stopColor: rimColor }} stopOpacity="0.25" />
                  ))}
                </linearGradient>
              ))}
              {(["l", "r"] as const).map((k) => (
                <linearGradient
                  key={k}
                  id={`${fid}-r${k}`}
                  data-rim={k}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1={RAD}
                  x2="0"
                  y2={CH - RAD}
                >
                  {V_OFF.map((o) => (
                    <stop key={o} offset={o} style={{ stopColor: rimColor }} stopOpacity="0.25" />
                  ))}
                </linearGradient>
              ))}
            </defs>
            <g fill="none" strokeWidth="2" transform="translate(-0.5 -0.5) scale(1.00264 1.00231)">
              <path
                d={`M1 ${RAD} A${RAD - 1} ${RAD - 1} 0 0 1 ${RAD} 1 H${CW - RAD} A${
                  RAD - 1
                } ${RAD - 1} 0 0 1 ${CW - 1} ${RAD}`}
                stroke={`url(#${fid}-rt)`}
              />
              <path
                d={`M1 ${CH - RAD} A${RAD - 1} ${RAD - 1} 0 0 0 ${RAD} ${CH - 1} H${CW - RAD} A${
                  RAD - 1
                } ${RAD - 1} 0 0 0 ${CW - 1} ${CH - RAD}`}
                stroke={`url(#${fid}-rb)`}
              />
              <path d={`M1 ${RAD} V${CH - RAD}`} stroke={`url(#${fid}-rl)`} />
              <path d={`M${CW - 1} ${RAD} V${CH - RAD}`} stroke={`url(#${fid}-rr)`} />
            </g>
          </svg>

          {/* Suffix 3D Glossy Marble Sphere (Top Left) */}
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 24,
              width: 76,
              height: 76,
              borderRadius: "50%",
              backgroundImage: [
                "radial-gradient(ellipse 13% 9% at 73% 25%, rgba(255, 255, 255, 0.98), rgba(200, 240, 255, 0.45) 50%, rgba(200, 240, 255, 0) 100%)",
                "radial-gradient(ellipse 24% 20% at 74% 31%, rgba(180, 230, 255, 0.5), rgba(180, 230, 255, 0.16) 55%, rgba(180, 230, 255, 0) 100%)",
                "radial-gradient(ellipse 40.6% 72.1% at 2% -20.8%, rgba(0, 194, 255, 1), rgba(0, 194, 255, 0.5) 55%, rgba(0, 194, 255, 0) 100%)",
                "radial-gradient(ellipse 26.3% 27.9% at 100.4% 42.7%, rgba(0, 114, 188, 1), rgba(0, 114, 188, 0.5) 55%, rgba(0, 114, 188, 0) 100%)",
                "radial-gradient(ellipse 28.2% 25.2% at 58.2% 38.4%, rgba(20, 80, 180, 1), rgba(20, 80, 180, 0.5) 55%, rgba(20, 80, 180, 0) 100%)",
                "radial-gradient(ellipse 37.3% 18.4% at 72.3% 30.9%, rgba(100, 210, 255, 1), rgba(100, 210, 255, 0.5) 55%, rgba(100, 210, 255, 0) 100%)",
                "radial-gradient(ellipse 67.2% 14.1% at 34.8% 18.4%, rgba(0, 20, 70, 1), rgba(0, 20, 70, 0.5) 55%, rgba(0, 20, 70, 0) 100%)",
                "radial-gradient(ellipse 46% 40% at 30% 78%, rgba(2, 8, 30, 0.8), rgba(2, 8, 30, 0) 100%)",
                `radial-gradient(circle 54px at 39.7% 104.4%, ${ac(35, "#010816")} 0%, ${ac(
                  55,
                  "#010816"
                )} 40%, ${accent} 75%, ${ac(60, "#0072bc")} 100%)`,
              ].join(", "),
              boxShadow:
                "inset -2px -3px 5px rgba(0, 194, 255, 0.4), inset 2px 2px 3px rgba(255, 255, 255, 0.25), 0 8px 18px rgba(0, 10, 30, 0.5)",
            }}
          >
            {/* Conic rim sheen on the sphere */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                padding: 1,
                backgroundImage:
                  "conic-gradient(from 0deg, rgba(200, 240, 255, 0.3) 0deg, rgba(200, 240, 255, 0.85) 32deg, rgba(200, 240, 255, 0.6) 52deg, rgba(200, 240, 255, 0) 90deg, rgba(200, 240, 255, 0) 250deg, rgba(200, 240, 255, 0.3) 290deg, rgba(200, 240, 255, 0.7) 320deg, rgba(200, 240, 255, 0.3) 360deg)",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
              }}
            />
            {/* Sphere Badge */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                textAlign: "center",
                fontFamily: font,
                fontSize: 12,
                lineHeight: 1,
                letterSpacing: 0.5,
                fontWeight: 700,
                color: "#e2f4ff",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              {prod.badge}
            </div>
          </div>

          {/* Top Right Category Pill Badge */}
          <div
            style={{
              position: "absolute",
              right: 24,
              top: 28,
              display: "flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "rgba(0, 114, 188, 0.15)",
              border: "1px solid rgba(0, 194, 255, 0.28)",
              borderRadius: 999,
              padding: "4px 11px",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#00c2ff",
                boxShadow: "0 0 6px #00c2ff",
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.8,
                color: "#d4f0ff",
                textTransform: "uppercase",
              }}
            >
              {prod.category}
            </span>
          </div>

          {/* Card Message Body */}
          <div
            style={{
              position: "absolute",
              left: 26,
              right: 22,
              top: 130,
              fontFamily: font,
            }}
          >
            {/* Product Title */}
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: -0.6,
                lineHeight: "26px",
                color: "#ffffff",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{prod.name}</span>
            </div>

            {/* Product Headline Description */}
            <div
              style={{
                fontSize: 18,
                lineHeight: "24px",
                fontWeight: 400,
                letterSpacing: -0.2,
                color: "rgba(225, 240, 255, 0.88)",
                whiteSpace: "pre-line",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {prod.headline}
            </div>
          </div>

          {/* Hairline Input Row */}
          <svg
            width={CW}
            height={CH}
            viewBox={`0 0 ${CW} ${CH}`}
            style={{ position: "absolute", inset: 0, overflow: "visible" }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={fid + "-l"} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={CW} y2="0">
                <stop offset="0" style={{ stopColor: line, stopOpacity: 0.15 }} />
                <stop offset="0.45" style={{ stopColor: line, stopOpacity: 0.2 }} />
                <stop offset="0.68" style={{ stopColor: line, stopOpacity: 0.5 }} />
                <stop offset="0.8" style={{ stopColor: line, stopOpacity: 1 }} />
                <stop offset="0.9" style={{ stopColor: line, stopOpacity: 1 }} />
                <stop offset="1" style={{ stopColor: line, stopOpacity: 0.65 }} />
              </linearGradient>
              <filter id={fid} x="-20%" y="-25%" width="140%" height="150%" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="0 0" />
              </filter>
            </defs>
            <path
              d={`M0.6 ${328.5 + 22} A22 22 0 0 1 22.6 328.5 H299.6 M342.4 328.5 H${CW - 22.6} A22 22 0 0 1 ${
                CW - 0.6
              } ${328.5 + 22}`}
              fill="none"
              stroke={`url(#${fid}-l)`}
              strokeWidth="1.3"
            />
          </svg>

          {/* Bottom Metric Label */}
          <div
            style={{
              position: "absolute",
              left: 26,
              top: 348,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: font,
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: 0.2,
              color: "#67d5ff",
              whiteSpace: "nowrap",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            <Zap size={13} className="text-amber-400 fill-amber-400" />
            <span>{prod.metric}</span>
          </div>

          {/* Circular Action Button (Navigate / Explore) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/${prod.slug}`);
            }}
            title={`View ${prod.name} Specifications`}
            style={{
              position: "absolute",
              left: 321 - 21.5,
              top: 333 - 21.5,
              width: 44,
              height: 44,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: "linear-gradient(135deg, #0072bc, #00c2ff)",
              boxShadow:
                "0 0 0 1.6px rgba(0, 194, 255, 0.7), 0 0 14px rgba(0, 194, 255, 0.5)",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onPointerEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.12)";
              e.currentTarget.style.boxShadow =
                "0 0 0 2px rgba(0, 194, 255, 0.95), 0 0 22px rgba(0, 194, 255, 0.8)";
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 0 0 1.6px rgba(0, 194, 255, 0.7), 0 0 14px rgba(0, 194, 255, 0.5)";
            }}
          >
            <ArrowUpRight size={18} color="#ffffff" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={rootRef}
      className={`relative w-full overflow-hidden select-none ${className || ""}`}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        minHeight: 520,
        backgroundColor: background,
        isolation: "isolate",
        ...style,
      }}
    >
      {/* Dynamic Suffix Azure/Cyan Backdrop */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: wr,
          height: STAGE_H,
          transform: `scale(${s})`,
          transformOrigin: "0 0",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: backdropGradients,
            backgroundColor: background,
          }}
        />
        {cells.map(renderCard)}
      </div>

      {/* Subtle Noise Texture */}
      {noise ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `url(${noise})`,
            backgroundSize: "128px 128px",
            opacity: 0.025,
            mixBlendMode: "overlay",
          }}
        />
      ) : null}

      {/* Floating HUD Controls: 2-Second Cycle Status + Pause/Resume & Direct Browse */}
      <div className="pointer-events-auto absolute bottom-5 left-5 right-5 z-20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-semibold text-white/90 shadow-lg backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
          </span>
          <span>Staggered Glass Wall • 2s Auto-Cycle</span>
          <span className="text-white/40">|</span>
          <span className="text-[11px] text-cyan-300 font-mono">12 Systems in Motion</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-black/75 hover:border-cyan-400"
          >
            {isPaused ? <Play size={13} className="text-emerald-400 fill-emerald-400" /> : <Pause size={13} className="text-amber-400 fill-amber-400" />}
            <span>{isPaused ? "Resume Motion" : "Pause Wall"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

