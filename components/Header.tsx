"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/shop?c=Sneakers", label: "Sneakers" },
  { href: "/shop?c=Men", label: "Men" },
  { href: "/shop?c=Women", label: "Women" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [over, setOver] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) {
      setOver(false);
      return;
    }

    const onScroll = () => {
      setOver(window.scrollY < window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products
      .filter((p) => `${p.brand} ${p.name}`.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(`/shop?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  }

  return (
    <>
      <header className={`site-header${over ? " over" : ""}`} id="hd">
        <Link className="logo" href="/" aria-label="FARFITS home">
          <span className="mono">F</span>
          FARFITS
        </Link>
        <nav
          className={`main${menuOpen ? " open" : ""}`}
          id="nv"
          aria-label="Primary"
        >
          {NAV.map((item) => {
            const active =
              item.href === pathname ||
              (item.href.startsWith("/shop?") && pathname === "/shop");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "on" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="tools lab">
          <button
            type="button"
            id="bs"
            onClick={() => setSearchOpen((v) => !v)}
          >
            Search
          </button>
          <Link className="hide-m" href="/contact">
            Account
          </Link>
          <Link href="/cart" id="bag">
            Bag ({cart.length})
          </Link>
          <button
            className="burger"
            id="bg"
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </header>
      <div id="search" className={searchOpen ? "open" : undefined}>
        <form onSubmit={onSearchSubmit}>
          <input
            id="si"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand or model"
            aria-label="Search"
          />
        </form>
        <div id="sres" className="lab">
          {query.trim()
            ? results.length
              ? results.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    {p.brand} {p.name}
                  </Link>
                ))
              : (
                  <span className="mute">No results</span>
                )
            : null}
        </div>
      </div>
    </>
  );
}
