"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { ProductImage } from "@/components/ProductImage";
import { IG } from "@/lib/constants";
import { pkr } from "@/lib/format";
import { getProduct } from "@/lib/products";

export default function CartPage() {
  const { cart, remove, toast } = useCart();
  const items = cart.map((s) => getProduct(s)).filter(Boolean);
  const total = items.reduce((a, p) => a + (p?.price ?? 0), 0);
  const msg = encodeURIComponent(
    "Hi FARFITS, I'd like to order:\n" +
      items
        .map(
          (p) =>
            `- ${p!.brand} ${p!.name} (Size ${p!.size}) ${pkr(p!.price)}`,
        )
        .join("\n"),
  );

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(decodeURIComponent(msg));
      toast("Order copied");
    } catch {
      toast("Copy not available");
    }
  }

  return (
    <section>
      <p className="lab mute">Your bag</p>
      <h1
        className="disp"
        style={{
          fontSize: "clamp(50px, 10vw, 150px)",
          marginBottom: 40,
        }}
      >
        Bag
      </h1>
      <div style={{ maxWidth: 900 }}>
        {items.length ? (
          <>
            {items.map((p) =>
              p ? (
                <div className="row" key={p.slug}>
                  <ProductImage product={p} ratio="1/1" />
                  <div>
                    <b className="lab">{p.brand}</b>
                    <p style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</p>
                    <p className="mute">
                      Size {p.size} · {p.condition}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 700 }}>{pkr(p.price)}</p>
                    <button
                      className="lab mute"
                      type="button"
                      style={{ borderBottom: "1px solid" }}
                      onClick={() => remove(p.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : null,
            )}
            <div className="sum">
              <span>Total</span>
              <span>{pkr(total)}</span>
            </div>
            <p className="mute" style={{ margin: "14px 0 24px" }}>
              One-of-one pairs. Checkout is by direct message — confirm size and
              delivery with us on Instagram. Exchange possible.
            </p>
            <div className="cart-actions">
              <a
                className="btn k"
                target="_blank"
                rel="noopener noreferrer"
                href={IG}
              >
                Order via Instagram ↗
              </a>
              <button className="btn l" type="button" onClick={copyOrder}>
                Copy order
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="serif" style={{ fontSize: 44, marginBottom: 28 }}>
              Your bag is empty.
            </p>
            <Link className="btn k" href="/shop">
              Shop collection →
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
