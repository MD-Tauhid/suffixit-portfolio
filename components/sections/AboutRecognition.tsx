"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { recognition } from "@/lib/about";
import styles from "@/app/about/about.styles";
import stampStyles from "./AboutRecognition.module.css";

const standards = [
  "Consistent processes, quality management and continual improvement.",
  "A framework for managing information security and related risks.",
  "A structured approach to delivering and improving IT services.",
];
const connections = [
  { name: "BASIS", image: "/assets/img/basis.png", description: "Software & IT industry", category: "Industry organisation" },
  { name: "BACCO", image: "/assets/img/bacco.png", description: "Contact center & outsourcing", category: "Industry organisation" },
  { name: "Cisco", image: "/assets/img/cisco.png", description: "Networking technology", category: "Technology" },
  { name: "Fortinet", image: "/assets/img/fortinet.png", description: "Cybersecurity technology", category: "Technology" },
  { name: "Sophos", image: "/assets/img/sophos.png", description: "Cybersecurity technology", category: "Technology" },
];
const items = [
  ...recognition.map((item, index) => ({ name: item.title, image: item.image, description: item.description, category: "Management standard", detail: standards[index] })),
  ...connections.map((item) => ({ ...item, detail: "" })),
];
const angles = [-4, 3, -3, 4, 3, -4, 4, -3];
const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";

export default function AboutRecognition() {
  const boardRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    const stamp = stampRef.current;
    if (!board || !stamp || !Element.prototype.animate) return;

    const impressions = Array.from(board.querySelectorAll<HTMLElement>("[data-impression]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const completed = new Set<HTMLElement>();
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (preference.matches) return;

      let cancelled = false;
      let busy = false;
      let previousPosition: string | undefined;
      const pending = new Set<HTMLElement>();
      const animations = new Set<Animation>();
      const play = async (element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) => {
        const animation = element.animate(frames, { fill: "both", ...options });
        animations.add(animation);
        try {
          await animation.finished;
        } finally {
          animations.delete(animation);
          animation.cancel();
        }
      };
      const reveal = (element: HTMLElement) => {
        completed.add(element);
        element.style.removeProperty("opacity");
      };

      const run = async () => {
        if (busy || cancelled || !pending.size) return;
        busy = true;
        try {
          while (pending.size && !cancelled) {
            const impression = impressions.find((element) => pending.has(element));
            if (!impression) break;
            pending.delete(impression);
            const bounds = impression.getBoundingClientRect();
            // A quick scroll must never leave already-passed content waiting for a stamp.
            if (bounds.bottom < 100) {
              reveal(impression);
              continue;
            }
            if (bounds.top > window.innerHeight) {
              observer.observe(impression);
              continue;
            }

            const surface = board.getBoundingClientRect();
            const x = bounds.left - surface.left + bounds.width / 2 - stamp.offsetWidth / 2;
            const y = bounds.top - surface.top + bounds.height / 2 - stamp.offsetHeight + 28;
            const angle = angles[impressions.indexOf(impression)];
            const hover = `translate3d(${x}px,${y - 68}px,0) rotate(${angle - 8}deg)`;
            const contact = `translate3d(${x}px,${y}px,0) rotate(${angle}deg)`;

            stamp.style.opacity = "1";
            if (previousPosition) {
              await play(stamp, [{ transform: previousPosition }, { transform: hover }], { duration: 160, easing: "cubic-bezier(0.77, 0, 0.175, 1)" });
            }
            stamp.style.transform = hover;

            await Promise.all([
              play(stamp, [
                { transform: hover, opacity: previousPosition ? 1 : 0, offset: 0 },
                { transform: hover, opacity: 1, offset: 0.18 },
                { transform: contact, opacity: 1, offset: 0.46, easing: easeOut },
                { transform: `${contact} scale(1.025,.96)`, offset: 0.53 },
                { transform: contact, offset: 0.61, easing: easeOut },
                { transform: hover, opacity: 1, offset: 1 },
              ], { duration: 500, easing: "cubic-bezier(0.77, 0, 0.175, 1)" }),
              play(impression, [
                { opacity: 0, transform: "scale(1.035)" },
                { opacity: 0.85, transform: "scale(.985)", offset: 0.35 },
                { opacity: 1, transform: "scale(1)" },
              ], { delay: 230, duration: 180, easing: easeOut }).then(() => reveal(impression)),
            ]);
            previousPosition = hover;
            stamp.style.transform = hover;
          }
          await play(stamp, [{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: easeOut });
          stamp.style.opacity = "0";
          previousPosition = undefined;
        } catch {
          // Preference changes, resizing and navigation cancel the choreography.
          if (!cancelled) impressions.forEach(reveal);
          stamp.style.opacity = "0";
        } finally {
          busy = false;
          if (pending.size && !cancelled) void run();
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
          const impression = target as HTMLElement;
          if (completed.has(impression)) return;
          if (boundingClientRect.bottom < 100) {
            reveal(impression);
            observer.unobserve(impression);
          } else if (isIntersecting) {
            pending.add(impression);
            observer.unobserve(impression);
          }
        });
        void run();
      }, { threshold: 0.6, rootMargin: "-80px 0px -5% 0px" });

      impressions.forEach((impression) => {
        if (completed.has(impression)) return;
        if (impression.getBoundingClientRect().bottom < 100) reveal(impression);
        else {
          impression.style.opacity = "0";
          observer.observe(impression);
        }
      });

      dispose = () => {
        cancelled = true;
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
        impressions.forEach((impression) => impression.style.removeProperty("opacity"));
        stamp.style.opacity = "0";
      };
    };

    setup();
    preference.addEventListener("change", setup);
    // Reflow during an active press should reveal content at its new position.
    let previousWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === previousWidth) return;
      previousWidth = window.innerWidth;
      dispose();
      impressions.forEach((impression) => completed.add(impression));
    };
    window.addEventListener("resize", onResize);
    return () => {
      dispose();
      preference.removeEventListener("change", setup);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="recognition" className={stampStyles.section} aria-labelledby="recognition-title">
      <div className={styles.container}>
        <div className={stampStyles.heading} data-about-reveal="heading">
          <div>
            <span className={stampStyles.eyebrow}><span />Standards &amp; industry connections</span>
            <h2 id="recognition-title">Quality, security<br />and service.</h2>
          </div>
          <p>Explore the management standards and industry connections featured by Suffix IT, bringing quality, information security and IT service management into focus.</p>
        </div>
        <div ref={boardRef} className={stampStyles.paper}>
          <div className={stampStyles.grid}>
            {items.map((item, index) => (
              <article key={item.name} className={stampStyles.item}>
                <div className={stampStyles.sealSpace}>
                  <div data-impression className={stampStyles.impression}>
                    <div className={stampStyles.seal} style={{ "--seal-angle": `${angles[index]}deg` } as CSSProperties}>
                      <span className={stampStyles.sealCategory} aria-hidden="true">{item.category}</span>
                      <Image src={item.image} alt={item.name} width={150} height={100} sizes="150px" className={`${stampStyles.logo} ${index < 3 ? stampStyles.standardLogo : ""} ${index === 1 || index === 2 ? stampStyles.originalLogo : ""}`} />
                    </div>
                  </div>
                </div>
                <h3>{item.name}</h3>
                <p className={stampStyles.description}>{item.description}</p>
                {item.detail && <p className={stampStyles.detail}>{item.detail}</p>}
              </article>
            ))}
          </div>
          <div ref={stampRef} className={stampStyles.stamp} aria-hidden="true">
            <div className={stampStyles.handle} />
            <div className={stampStyles.neck} />
            <div className={stampStyles.base}><span>Suffix IT</span></div>
            <div className={stampStyles.rubber} />
          </div>
        </div>
      </div>
    </section>
  );
}
