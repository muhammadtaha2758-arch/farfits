"use client";

import Link from "next/link";
import type { CarouselSlide } from "@/components/ProductCarousel";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductImage } from "@/components/ProductImage";
import {
  AddToBagButton,
  AskSimilarButton,
} from "@/components/ProductActions";
import { pkr } from "@/lib/format";
import type { Product } from "@/lib/products";

const SLIDES: CarouselSlide[] = [
  { label: "Main view" },
  { focus: "toe", label: "Toe detail" },
  { focus: "sole", label: "Sole detail" },
  { focus: "heel", label: "Heel view" },
];

export function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="pdp">
      <div className="pdp-gallery">
        <div className="pdp-gallery__desktop imgs">
          <ProductImage product={product} ratio="4/5" />
          <div className="two">
            <ProductImage product={product} ratio="1/1" focus="toe" />
            <ProductImage product={product} ratio="1/1" focus="sole" />
          </div>
          <ProductImage product={product} ratio="4/5" focus="heel" />
        </div>
        <div className="pdp-gallery__mobile">
          <ProductCarousel product={product} slides={SLIDES} />
        </div>
      </div>

      <div className="pdp-info">
        <div className="pdp-buy">
          <p className="lab mute pdp-crumb">
            <Link href="/shop">Shop</Link> / {product.brand}
          </p>
          <p className="lab pdp-brand">{product.brand}</p>
          <h1 className="pdp-name">{product.name}</h1>
          <p className="pdp-price">{pkr(product.price)}</p>

          <div className="pdp-chips">
            <span className="pdp-chip">Size {product.size}</span>
            <span className="pdp-chip">{product.condition}</span>
            {product.available ? (
              <span className="pdp-chip pdp-chip--ok">In stock</span>
            ) : (
              <span className="pdp-chip pdp-chip--sold">Sold</span>
            )}
          </div>

          <div className="pdp-cta-wrap">
            {product.available ? (
              <AddToBagButton slug={product.slug} variant="pdp" />
            ) : (
              <AskSimilarButton variant="pdp" />
            )}
          </div>
        </div>

        <div className="pdp-specs">
          <dl className="pdp-dl">
            <div>
              <dt>Size</dt>
              <dd>
                {product.size}{" "}
                <span className="tag" style={{ marginLeft: 6 }}>
                  Only size
                </span>
              </dd>
            </div>
            <div>
              <dt>Condition</dt>
              <dd>{product.condition}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{product.available ? "In stock — 1 pair" : "Sold"}</dd>
            </div>
            <div>
              <dt>Authenticity</dt>
              <dd>Inspected before listing</dd>
            </div>
            <div>
              <dt>Exchange</dt>
              <dd>Possible</dd>
            </div>
          </dl>
          <p className="pdp-desc">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
