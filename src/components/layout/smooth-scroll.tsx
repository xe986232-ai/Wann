"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Module-level reference so other components (e.g. page-transition.tsx)
// can reset Lenis's own internal scroll position in sync with real
// navigation, instead of only calling the native window.scrollTo — Lenis
// tracks its own animated scroll value separately from the browser's,
// and if only the native value is reset, Lenis doesn't know and will
// visibly "correct" itself a frame or two later, which reads as a glitch
// right as a new page lands.
let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

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
    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
