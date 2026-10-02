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
    <article className={className}>
      <Link href={`/product/${product.slug}`} className="card-link">
        <ProductImage product={product} ratio={ratio} />
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
      {quickAdd && product.available ? (
        <button
          type="button"
          className="q"
          onClick={() => add(product.slug)}
        >
          Quick Add
        </button>
      ) : null}
    </article>
  );
}
