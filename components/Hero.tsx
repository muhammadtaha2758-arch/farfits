"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const finePointer = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setReduced(mq.matches);
      finePointer.current = fine.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    const enter = window.setTimeout(() => setReady(true), 40);
    return () => {
      mq.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
      window.clearTimeout(enter);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;

      const shoe = shoeRef.current;
      if (shoe) {
        const { x, y } = current.current;
        shoe.style.transform = `rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translate3d(${(x * 10).toFixed(2)}px, ${(y * 8).toFixed(2)}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;

    const onScroll = () => {
      const ambient = ambientRef.current;
      if (!ambient) return;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      ambient.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0) scale(1.08)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (reduced || !finePointer.current) return;
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      target.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    },
    [reduced],
  );

  const onPointerLeave = useCallback(() => {
    target.current = { x: 0, y: 0 };
  }, []);

  return (
    <section
      className={`hero${ready ? " hero--ready" : ""}${reduced ? " hero--reduced" : ""}`}
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero-ambient" ref={ambientRef} aria-hidden="true">
        <Image
          src="/editorial/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-wash" aria-hidden="true" />

      <div className="hero-stage" aria-hidden="true">
        <div className="hero-shoe-float">
          <div className={`hero-shoe${ready ? " hero-shoe--in" : ""}`}>
            <div className="hero-shoe__tilt" ref={shoeRef}>
              <div className="hero-shoe__frame">
                <Image
                  src="/editorial/hero.jpg"
                  alt="White leather sneaker in low light"
                  fill
                  priority
                  sizes="(max-width: 900px) 92vw, 58vw"
                  className="hero-shoe__img"
                />
                <span className="hero-shoe__sheen" />
              </div>
              <span className="hero-shoe__shadow" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scrim" aria-hidden="true" />

      <h1 className="disp">
        <span className="mask">
          <span>FAR</span>
        </span>
        <span className="mask">
          <span style={{ animationDelay: "0.12s" }}>FITS</span>
        </span>
      </h1>

      <div className="sub">
        <div>
          <p className="lab" style={{ marginBottom: 8 }}>
            Authentic Thrifted Footwear
          </p>
          <p className="serif">Curated. Authentic. Distinct.</p>
        </div>
        <Link className="btn" href="/shop">
          Shop Collection <span>→</span>
        </Link>
      </div>
    </section>
  );
}
