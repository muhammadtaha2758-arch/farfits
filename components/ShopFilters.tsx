"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CONDITIONS, getBrands, getSizes } from "@/lib/products";

const PRICE_OPTS = [
  ["1", "Under 10,000"],
  ["2", "10,000 – 15,000"],
  ["3", "15,000+"],
] as const;

export function ShopFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let lastY = window.scrollY;
    let current = false;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      const header = document.querySelector("header.site-header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 58;
      const stuck = bar.getBoundingClientRect().top <= headerBottom + 1;

      let next = current;
      if (!stuck || y < 8) next = false;
      else if (delta > 6) next = true;
      else if (delta < -6) next = false;

      if (next !== current) {
        current = next;
        setHidden(next);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function setFilter(key: string, value: string) {
    const q = new URLSearchParams(sp.toString());
    if (value) q.set(key, value);
    else q.delete(key);
    const qs = q.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  }

  const brands = getBrands();
  const sizes = getSizes();

  return (
    <div ref={barRef} className={hidden ? "bar-stick is-hidden" : "bar-stick"}>
      <div className="bar">
      <div className="fs">
        <label className="lab">
          Category{" "}
          <select
            value={sp.get("c") || ""}
            onChange={(e) => setFilter("c", e.target.value)}
          >
            <option value="">All</option>
            {["Sneakers", "Men", "Women"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="lab">
          Brand{" "}
          <select
            value={sp.get("b") || ""}
            onChange={(e) => setFilter("b", e.target.value)}
          >
            <option value="">All</option>
            {brands.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="lab">
          Size{" "}
          <select
            value={sp.get("s") || ""}
            onChange={(e) => setFilter("s", e.target.value)}
          >
            <option value="">All</option>
            {sizes.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="lab">
          Condition{" "}
          <select
            value={sp.get("k") || ""}
            onChange={(e) => setFilter("k", e.target.value)}
          >
            <option value="">All</option>
            {CONDITIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="lab">
          Price{" "}
          <select
            value={sp.get("p") || ""}
            onChange={(e) => setFilter("p", e.target.value)}
          >
            <option value="">All</option>
            {PRICE_OPTS.map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="lab">
        Sort{" "}
        <select
          value={sp.get("o") || "new"}
          onChange={(e) => setFilter("o", e.target.value)}
        >
          <option value="new">Newest</option>
          <option value="lo">Price: Low to High</option>
          <option value="hi">Price: High to Low</option>
        </select>
      </label>
      </div>
    </div>
  );
}
