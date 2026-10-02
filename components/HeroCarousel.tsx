"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  eyebrow: string;
  line: string;
  cta: string;
  href: string;
  position?: string;
};

const INTERVAL_MS = 6000;

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      const len = slides.length;
      setIndex(((next % len) + len) % len);
    },
    [slides.length],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return;
    const id = window.setInterval(() => go(index + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, paused, reduceMotion, go, slides.length]);

  const active = slides[index];

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 48) return;
        go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`hero-slide${i === index ? " is-active" : ""}`}
            aria-hidden={i !== index}
          >
            <div
              className="hero-slide__media"
              style={{ ["--pos" as string]: slide.position || "center 42%" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="hero-veil" aria-hidden="true" />

      <div className="hero-copy">
        <h1 className="disp hero-brand">
          <span className="mask">
            <span>FAR</span>
          </span>
          <span className="mask">
            <span style={{ animationDelay: "0.12s" }}>FITS</span>
          </span>
        </h1>

        <div className="hero-sub" key={index}>
          <div className="hero-sub__text">
            <p className="lab hero-eyebrow">{active.eyebrow}</p>
            <p className="serif hero-line">{active.line}</p>
          </div>
          <Link className="btn hero-cta" href={active.href}>
            {active.cta} <span>→</span>
          </Link>
        </div>
      </div>

      <div className="hero-chrome">
        <div className="hero-progress" role="tablist" aria-label="Hero slides">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${slide.eyebrow}`}
              className={`hero-progress__item${i === index ? " is-active" : ""}${
                paused || reduceMotion ? " is-paused" : ""
              }`}
              onClick={() => go(i)}
            >
              <span className="hero-progress__track">
                <span
                  className="hero-progress__fill"
                  style={
                    i === index && !paused && !reduceMotion
                      ? { animationDuration: `${INTERVAL_MS}ms` }
                      : undefined
                  }
                />
              </span>
            </button>
          ))}
        </div>

        <div className="hero-nav">
          <button
            type="button"
            className="hero-nav__btn"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
          >
            ‹
          </button>
          <span className="lab hero-nav__count">
            {String(index + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="hero-nav__btn"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
