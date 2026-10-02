"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/products";

export type CarouselSlide = {
  ratio?: string;
  focus?: "toe" | "sole" | "heel";
  label: string;
};

type ProductCarouselProps = {
  product: Product;
  slides: CarouselSlide[];
};

export function ProductCarousel({ product, slides }: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const syncIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const next = Math.round(track.scrollLeft / track.clientWidth);
    setIndex(Math.min(Math.max(next, 0), total - 1));
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", syncIndex, { passive: true });
    window.addEventListener("resize", syncIndex);

    return () => {
      track.removeEventListener("scroll", syncIndex);
      window.removeEventListener("resize", syncIndex);
    };
  }, [syncIndex]);

  function goTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(Math.max(i, 0), total - 1);
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  }

  function prev() {
    goTo(index - 1);
  }

  function next() {
    goTo(index + 1);
  }

  return (
    <div className="pdp-carousel-wrap">
      <div className="pdp-carousel-frame">
        <div
          className="pdp-carousel"
          ref={trackRef}
          aria-roledescription="carousel"
          aria-label={`${product.brand} ${product.name} photos`}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.label}
              className="pdp-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={i !== index}
            >
              <ProductImage
                product={product}
                ratio="4/5"
                focus={slide.focus}
              />
            </div>
          ))}
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              className="pdp-carousel__nav pdp-carousel__nav--prev"
              aria-label="Previous image"
              disabled={index === 0}
              onClick={prev}
            >
              ‹
            </button>
            <button
              type="button"
              className="pdp-carousel__nav pdp-carousel__nav--next"
              aria-label="Next image"
              disabled={index === total - 1}
              onClick={next}
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      <div className="pdp-carousel__meta">
        <span className="pdp-carousel__count lab mute">
          {index + 1} / {total}
        </span>
        <div className="pdp-carousel__dots" role="tablist" aria-label="Image slides">
          {slides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${slide.label}`}
              className={`pdp-carousel__dot${i === index ? " on" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
