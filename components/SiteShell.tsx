"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CartProvider } from "./CartProvider";
import { Cursor } from "./Cursor";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Reveal } from "./Reveal";
import { Toast } from "./Toast";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <CartProvider>
      <Header />
      <main className={`page${isHome ? " home" : ""}`}>{children}</main>
      <Footer />
      <Toast />
      <Cursor />
      <Reveal />
    </CartProvider>
  );
}
