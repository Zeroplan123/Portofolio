"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md md:block"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full [background:linear-gradient(90deg,var(--accent-2),var(--accent-1))] md:block"
      />
    </>
  );
}

