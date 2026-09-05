"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Animates the scroll itself (buttery inertia/momentum instead of the
 * browser's default jerky wheel-step scrolling) — separate from any page
 * transition. Mounted once in the root layout so it applies everywhere,
 * including the sticky Navbar which still tracks scroll position fine
 * since Lenis just smooths the values, it doesn't change layout.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
