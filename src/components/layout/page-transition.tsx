"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTransitionStore } from "@/lib/transition-store";

// Same easing curve as the Lenis smooth-scroll setup (SmoothScroll
// component): quartic ease-out. Fast off the top like a real finger-drag,
// then decelerates naturally — instead of a mechanical in-out curve.
const scrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

// How far the outgoing page dips DOWN before the new page takes over.
// Kept small and gentle — this is a soft "drifting away" cue, not a
// full scroll — since it may get cut short (see below) by a
// fast/prefetched nav.
const EXIT_PEAK_VH = 14;
const EXIT_DURATION_S = 0.6;

// How far "pre-scrolled" the incoming page starts, i.e. how far above
// its resting position, before animating DOWN into place. Used both
// right after an exit (see below) and for navigation with no preceding
// TransitionLink exit (browser back/forward, a plain next/link, etc.),
// so every route change gets the same consistent "arrives from above,
// settles down" feel.
const ENTER_START_VH = 30;
const ENTER_DURATION_S = 0.7;

// A brief opacity dip right around the handoff softens the instant
// jump even further — it's already invisible in terms of position
// (content swaps at that exact instant), but a touch of cross-fade
// makes the whole thing read as one silky motion instead of a flat
// slide, which is what makes it feel "smooth" rather than mechanical.
const FADE_DURATION_S = 0.35;
const FADE_MIN_OPACITY = 0.4;

function vhToPx(vh: number) {
  return (vh * window.innerHeight) / 100;
}

/**
 * Wraps the persistent root layout's {children}.
 *
 * The whole transition — exit AND entrance — moves in ONE direction,
 * down, the entire time, paired with a subtle opacity dip-and-recover
 * around the handoff. There is no reversal: everything keeps moving
 * the same way, which is what reads as "continuing to scroll" rather
 * than "bouncing back".
 *
 * Sequence for a TransitionLink click:
 *   1. startExit() flips isExiting; y animates 0 -> +EXIT_PEAK_VH
 *      (down) and opacity eases toward FADE_MIN_OPACITY, while, in
 *      parallel, the real navigation happens (transition-link.tsx no
 *      longer waits for this animation before calling router.push).
 *   2. The MOMENT the pathname actually changes — whether the exit is
 *      barely underway or already sitting at its full peak waiting on
 *      a slow network — y JUMPS (no animation, `.set()`) from wherever
 *      it is to -ENTER_START_VH. This jump is invisible: the content
 *      underneath has also just swapped to the new page at that exact
 *      instant, so there's nothing continuous on screen for the eye to
 *      catch a jump in — like a cut in film hiding a change in camera
 *      position. The brief opacity dip from step 1 is still recovering
 *      at this point, which further smooths over the cut.
 *   3. y animates -ENTER_START_VH -> 0 (down) and opacity eases back to
 *      1, landing the new page. Since step 2 already put y in the
 *      right starting place the instant navigation finished, there's
 *      no waiting on a timer here — the jump-and-continue happens
 *      immediately regardless of how far the exit itself got.
 *
 * Longer, gentler durations and a smaller travel distance than earlier
 * versions — the goal here is a soft, continuous drift rather than a
 * snappy flick, without reintroducing the two bugs fixed previously:
 * a reversed direction on the incoming page, or a stall while a fixed
 * timer waited for both exit and navigation to independently finish.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExiting = useTransitionStore((state) => state.isExiting);
  const endExit = useTransitionStore((state) => state.endExit);

  const y = useMotionValue(0);
  const opacity = useMotionValue(1);
  const previousPathname = useRef(pathname);
  const exitInProgress = useRef(false);

  function playEntrance() {
    y.set(-vhToPx(ENTER_START_VH));
    animate(y, 0, { duration: ENTER_DURATION_S, ease: scrollEase });
    animate(opacity, 1, { duration: FADE_DURATION_S, ease: scrollEase });
  }

  useEffect(() => {
    if (isExiting && !exitInProgress.current) {
      exitInProgress.current = true;
      animate(y, vhToPx(EXIT_PEAK_VH), {
        duration: EXIT_DURATION_S,
        ease: scrollEase,
      });
      animate(opacity, FADE_MIN_OPACITY, {
        duration: FADE_DURATION_S,
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
        exitInProgress.current = false;
        endExit();
      }
      // Same call either way: jump-and-continue-down after an exit, or
      // play the entrance on its own for navigation with no preceding
      // exit. Both cases want y (and opacity) to end up settled at
      // rest.
      playEntrance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <motion.div style={{ y, opacity }}>{children}</motion.div>;
}
