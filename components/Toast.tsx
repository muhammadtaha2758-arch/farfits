"use client";

import { useCart } from "./CartProvider";

export function Toast() {
  const { toastMessage } = useCart();
  return (
    <div id="toast" className={toastMessage ? "on" : undefined}>
      {toastMessage}
    </div>
  );
}
