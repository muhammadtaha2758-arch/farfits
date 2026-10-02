"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartContextValue = {
  cart: string[];
  add: (slug: string) => boolean;
  remove: (slug: string) => void;
  toast: (message: string) => void;
  toastMessage: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ff-cart";

function unique(slugs: string[]) {
  return [...new Set(slugs.filter(Boolean))];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setCart(Array.isArray(parsed) ? unique(parsed) : []);
    } catch {
      setCart([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart, ready]);

  const toast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const id = window.setTimeout(() => setToastMessage(null), 1800);
    return () => window.clearTimeout(id);
  }, [toastMessage]);

  const add = useCallback(
    (slug: string) => {
      let added = false;
      setCart((prev) => {
        if (prev.includes(slug)) return prev;
        added = true;
        return [...prev, slug];
      });
      // Updater runs sync in event handlers — toast after knowing outcome
      if (added) toast("Added to bag");
      else toast("Already in your bag — one of one");
      return added;
    },
    [toast],
  );

  const remove = useCallback((slug: string) => {
    setCart((prev) => prev.filter((s) => s !== slug));
  }, []);

  const value = useMemo(
    () => ({ cart, add, remove, toast, toastMessage }),
    [cart, add, remove, toast, toastMessage],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
