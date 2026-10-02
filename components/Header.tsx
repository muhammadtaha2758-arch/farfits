"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FormEvent,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { products } from "@/lib/products";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/shop", label: "Shop", match: { path: "/shop", c: null } },
  { href: "/new-arrivals", label: "New Arrivals", match: { path: "/new-arrivals" } },
  {
    href: "/shop?c=Sneakers",
    label: "Sneakers",
    match: { path: "/shop", c: "Sneakers" },
  },
  { href: "/shop?c=Men", label: "Men", match: { path: "/shop", c: "Men" } },
  {
    href: "/shop?c=Women",
    label: "Women",
    match: { path: "/shop", c: "Women" },
  },
  { href: "/about", label: "About", match: { path: "/about" } },
] as const;

function HeaderInner() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [over, setOver] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isHome = pathname === "/";
  const category = searchParams.get("c");

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const root = document.documentElement;
    if (!menuOpen) return;

    const y = window.scrollY;
    root.classList.add("nav-open");
    document.body.classList.add("nav-open");
    document.body.style.top = `-${y}px`;

    return () => {
      root.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
      document.body.style.top = "";
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const id = window.setTimeout(() => searchInputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [searchOpen]);

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
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((v) => {
      const next = !v;
      if (next) setSearchOpen(false);
      return next;
    });
  }

  function toggleSearch() {
    setSearchOpen((v) => {
      const next = !v;
      if (next) setMenuOpen(false);
      return next;
    });
  }

  return (
    <>
      <header
        className={`site-header${over && !menuOpen ? " over" : ""}`}
        id="hd"
      >
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
              pathname === item.match.path &&
              ("c" in item.match
                ? item.match.c === null
                  ? !category
                  : category === item.match.c
                : true);
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
          <button
            type="button"
            className="nav-close lab"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
        </nav>
        <div className="tools lab">
          <button
            type="button"
            id="bs"
            aria-expanded={searchOpen}
            aria-controls="search"
            onClick={toggleSearch}
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
            aria-label={menuOpen ? "Close menu" : "Menu"}
            aria-expanded={menuOpen}
            aria-controls="nv"
            onClick={toggleMenu}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      <div id="search" className={searchOpen ? "open" : undefined}>
        <form onSubmit={onSearchSubmit}>
          <input
            id="si"
            ref={searchInputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand or model"
            aria-label="Search"
            autoComplete="off"
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

export function Header() {
  return (
    <Suspense fallback={<header className="site-header" id="hd" />}>
      <HeaderInner />
    </Suspense>
  );
}
