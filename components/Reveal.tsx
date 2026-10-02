"use client";

import { useEffect } from "react";

const STEP = 80;
const CAP = 4;

/** Soft staggered fade-up. One scroll pass, no animation library. */
export function Reveal() {
  useEffect(() => {
    const pending = () =>
      [...document.querySelectorAll(".rv:not(.in)")] as HTMLElement[];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending().forEach((el) => el.classList.add("in"));
      return;
    }

    const scan = () => {
      const line = window.innerHeight * 0.9;
      const groups = new Map<Element, HTMLElement[]>();

      for (const el of pending()) {
        if (el.getBoundingClientRect().top > line) continue;
        const parent = el.parentElement ?? document.body;
        const list = groups.get(parent) ?? [];
        list.push(el);
        groups.set(parent, list);
      }

      for (const list of groups.values()) {
        list.sort((a, b) => {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          return ra.top - rb.top || ra.left - rb.left;
        });
        list.forEach((el, i) => {
          if (i > 0) {
            el.style.setProperty("--rv", `${Math.min(i, CAP) * STEP}ms`);
          }
          el.classList.add("in");
        });
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        scan();
        ticking = false;
      });
    };

    scan();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, []);

  return null;
}
