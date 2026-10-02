"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { pkr } from "@/lib/format";
import { useCart } from "./CartProvider";
import { ProductImage } from "./ProductImage";

type ProductCardProps = {
  product: Product;
  quickAdd?: boolean;
  ratio?: string;
  className?: string;
};

export function ProductCard({
  product,
  quickAdd = true,
  ratio = "4/5",
  className = "card rv",
}: ProductCardProps) {
  const { add } = useCart();

  return (
    <Link href={`/product/${product.slug}`} className={className}>
      <ProductImage product={product} ratio={ratio} />
      {quickAdd && product.available ? (
        <span
          className="q"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            add(product.slug);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              add(product.slug);
            }
          }}
        >
          Quick Add
        </span>
      ) : null}
      <div className="meta">
        <b className="lab">{product.brand}</b>
        <span className="lab">
          {product.available ? (
            <span className="tag">Available</span>
          ) : (
            <span className="tag sold">Sold</span>
          )}
        </span>
        <span className="n full">{product.name}</span>
        <span>
          Size {product.size} · {product.condition} Condition
        </span>
        <span className="n">{pkr(product.price)}</span>
      </div>
    </Link>
  );
}
