"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { IG } from "@/lib/constants";

export function AddToBagButton({
  slug,
  variant = "default",
}: {
  slug: string;
  variant?: "default" | "pdp";
}) {
  const { add } = useCart();
  const className =
    variant === "pdp" ? "pdp-cta pdp-cta--primary" : "btn k full";

  return (
    <button className={className} type="button" onClick={() => add(slug)}>
      <span>Add to bag</span>
      {variant === "pdp" ? null : <span>→</span>}
    </button>
  );
}

export function AskSimilarButton({
  variant = "default",
}: {
  variant?: "default" | "pdp";
}) {
  const className =
    variant === "pdp" ? "pdp-cta pdp-cta--secondary" : "btn l full";

  return (
    <a
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      href={IG}
    >
      <span>Ask for similar</span>
      {variant === "pdp" ? null : <span>↗</span>}
    </a>
  );
}

export function ProductNotFound() {
  return (
    <section>
      <h1 className="disp">Not found</h1>
      <Link className="btn l" href="/shop" style={{ marginTop: 30 }}>
        Back to shop
      </Link>
    </section>
  );
}
