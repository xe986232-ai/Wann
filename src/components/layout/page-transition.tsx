"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTransitionStore } from "@/lib/transition-store";

// Same easing curve as the Lenis smooth-scroll setup (SmoothScroll
// component): quartic ease-out. Fast off the top like a real finger-drag,
// then decelerates naturally — instead of a mechanical in-out curve.
const scrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

// How far the outgoing page dips down before reversing. Kept modest —
// this is just a "flick" cue, not a full page-height scroll — since it
// may have to reverse again almost immediately on a fast/prefetched nav.
const EXIT_PEAK_VH = 24;
const EXIT_DURATION_S = 0.45;

// How far "above" its resting position a page starts when it arrives
// WITHOUT a preceding TransitionLink exit (browser back/forward, a
// plain next/link elsewhere, first load never applies since there's no
// previous pathname). Kept as its own constant since it plays alone,
// with no exit motion to continue from.
const ENTER_START_VH = 40;
const ENTER_DURATION_S = 0.5;

function vhToPx(vh: number) {
  return (vh * window.innerHeight) / 100;
}

/**
 * Wraps the persistent root layout's {children}.
 *
 * Owns a single vertical offset (`y`) for the whole page-transition
 * animation. Exit and entrance are never two separate, independently
 * timed animations — the entrance is simply "reverse whatever `y` is
 * doing, right now, back to 0", so there's no handoff point where two
 * animations have to agree on timing or position.
 *
 * Sequence for a TransitionLink click:
 *   1. startExit() flips isExiting; y starts animating 0 -> +EXIT_PEAK_VH
 *      while, in parallel, the real navigation happens (transition-link.tsx
 *      no longer waits for this animation before calling router.push).
 *   2. The MOMENT the pathname actually changes — whatever y's value is
 *      at that instant, whether the exit is 10% done or already sitting
 *      at its full peak waiting on a slow network — we immediately
 *      animate(y, 0, ...). Framer Motion interrupts the in-flight exit
 *      tween and continues smoothly from its current value and velocity,
 *      so this is one continuous motion, never a jump or a restart.
 *
 * An earlier version gated this handoff behind BOTH "exit's own fixed
 * timer finished" AND "navigation finished", so that a fast/prefetched
 * navigation (which is the common case, and exactly what Next.js's
 * default link prefetching aims for) would still force the exit to play
 * out its FULL duration on top of the already-swapped-in new page,
 * THEN hard-jump to a separate start offset, THEN play a second full
 * animation back to 0. That read as exactly the double-motion-with-a-
 * pause-in-the-middle this version removes: two sequential animations
 * with a snap between them, instead of one continuous one.
 *
 * If navigation happens to be slow, y simply finishes reaching
 * EXIT_PEAK_VH and holds there (nothing left to animate) until the
 * pathname changes — a brief, natural-looking pause at a small offset,
 * not a jarring double-animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExiting = useTransitionStore((state) => state.isExiting);
  const endExit = useTransitionStore((state) => state.endExit);

  const y = useMotionValue(0);
  const previousPathname = useRef(pathname);
  const exitInProgress = useRef(false);

  useEffect(() => {
    if (isExiting && !exitInProgress.current) {
      exitInProgress.current = true;
      animate(y, vhToPx(EXIT_PEAK_VH), {
        duration: EXIT_DURATION_S,
        ease: scrollEase,
      });
    }
    if (!isExiting) {
      exitInProgress.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExiting]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;

      if (exitInProgress.current) {
        // Reverse smoothly from wherever y currently sits — no jump,
        // no waiting on a timer.
        exitInProgress.current = false;
        endExit();
        animate(y, 0, { duration: ENTER_DURATION_S, ease: scrollEase });
      } else {
        // Navigation that didn't go through a TransitionLink exit —
        // still give it the same "arriving from above" entrance so
        // every route change gets a consistent feel.
        y.set(-vhToPx(ENTER_START_VH));
        animate(y, 0, { duration: ENTER_DURATION_S, ease: scrollEase });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <motion.div style={{ y }}>{children}</motion.div>;
}
