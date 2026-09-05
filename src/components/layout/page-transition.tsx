"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTransitionStore } from "@/lib/transition-store";
import { getLenis } from "@/components/layout/smooth-scroll";

// Same easing curve as the Lenis smooth-scroll setup (SmoothScroll
// component): quartic ease-out. Fast off the top like a real finger-drag,
// then decelerates naturally — instead of a mechanical in-out curve.
const scrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

// Minimum time the exit animation gets to play before we're willing to
// hand off to the incoming page's entrance animation.
const EXIT_DURATION_MS = 500;

/**
 * Wraps the persistent root layout's {children}.
 *
 * Plays the "outgoing page" half of the transition: when a TransitionLink
 * is clicked, isExiting flips true and this content drifts down for a
 * beat while the real navigation happens in parallel (see
 * transition-link.tsx — it no longer waits for the animation to finish
 * before navigating).
 *
 * Handing off to the entrance animation requires BOTH of these to be
 * true, whichever finishes later:
 *   1. minDurationDone — the exit has played for at least EXIT_DURATION_MS,
 *      so a fast/prefetched navigation never cuts the exit animation short.
 *   2. navigationDone — the pathname has actually changed, so a slow
 *      network never leaves a dead, un-animated pause: the exit is still
 *      visibly holding its "exited" position while the new route loads,
 *      rather than freezing on an already-finished animation waiting for
 *      navigation to even start.
 * Once both are true, isExiting resets to false — instantly (no
 * animation) — so the fresh page underneath is the only thing moving,
 * driven entirely by app/template.tsx's own entrance animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExiting = useTransitionStore((state) => state.isExiting);
  const endExit = useTransitionStore((state) => state.endExit);
  const previousPathname = useRef(pathname);

  const minDurationDone = useRef(false);
  const navigationDone = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function tryEndExit() {
    if (minDurationDone.current && navigationDone.current) {
      endExit();
    }
  }

  useEffect(() => {
    if (isExiting) {
      minDurationDone.current = false;
      navigationDone.current = false;
      timeoutRef.current = setTimeout(() => {
        minDurationDone.current = true;
        tryEndExit();
      }, EXIT_DURATION_MS);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExiting]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;

      // Reset scroll through Lenis itself (not just window.scrollTo).
      // Lenis tracks its own animated scroll value independently of the
      // browser's real scrollY; resetting only the native value leaves
      // Lenis holding a stale target that it then visibly snaps back to
      // correct a frame or two later — exactly the "landing glitch" this
      // fixes. { immediate: true } skips Lenis's own easing so this is a
      // hard, instant jump to the top, not another animation.
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      navigationDone.current = true;
      tryEndExit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <motion.div
      animate={isExiting ? { y: 140 } : { y: 0 }}
      transition={
        isExiting
          ? { duration: EXIT_DURATION_MS / 1000, ease: scrollEase }
          : { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
}
