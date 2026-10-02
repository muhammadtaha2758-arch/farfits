"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function EditRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pointerId = -1;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let axis: "x" | "y" | null = null;
    let dragged = false;

    const reset = () => {
      pointerId = -1;
      axis = null;
      el.style.scrollSnapType = "";
    };

    const onTouchStart = (event: TouchEvent) => {
      if (el.scrollWidth <= el.clientWidth + 1) return;
      const touch = event.touches[0];
      pointerId = -1;
      startX = touch.clientX;
      startY = touch.clientY;
      startLeft = el.scrollLeft;
      axis = null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (el.scrollWidth <= el.clientWidth + 1) return;
      const touch = event.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "x") el.style.scrollSnapType = "none";
      }
      if (axis !== "x") return;
      if (event.cancelable) event.preventDefault();
      if (Math.abs(dx) > 8) dragged = true;
      el.scrollLeft = startLeft - dx;
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (el.scrollWidth <= el.clientWidth + 1) return;
      if (event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = el.scrollLeft;
      axis = null;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "x") el.style.scrollSnapType = "none";
        if (axis === "y") {
          reset();
          return;
        }
        try {
          el.setPointerCapture(event.pointerId);
        } catch {
          /* pointer already released */
        }
      }
      if (axis !== "x") return;
      if (Math.abs(dx) > 8) dragged = true;
      event.preventDefault();
      el.scrollLeft = startLeft - dx;
    };

    const onClick = (event: MouseEvent) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", reset);
    el.addEventListener("touchcancel", reset);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", reset);
    el.addEventListener("pointercancel", reset);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", reset);
      el.removeEventListener("touchcancel", reset);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", reset);
      el.removeEventListener("pointercancel", reset);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <div ref={ref} className="edit">
      {children}
    </div>
  );
}
