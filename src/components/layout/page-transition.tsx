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
// Kept modest — it's just a "drifting away" cue, not a full scroll —
// since it may get cut short (see below) by a fast/prefetched nav.
const EXIT_PEAK_VH = 24;
const EXIT_DURATION_S = 0.45;

// How far "pre-scrolled" the incoming page starts, i.e. how far above
// its resting position, before animating DOWN into place. Used both
// right after an exit (see below) and for navigation with no preceding
// TransitionLink exit (browser back/forward, a plain next/link, etc.),
// so every route change gets the same consistent "arrives from above,
// settles down" feel.
const ENTER_START_VH = 45;
const ENTER_DURATION_S = 0.5;

function vhToPx(vh: number) {
  return (vh * window.innerHeight) / 100;
}

/**
 * Wraps the persistent root layout's {children}.
 *
 * The whole transition — exit AND entrance — moves in ONE direction,
 * down, the entire time. There is no reversal. That matters: it's the
 * difference between "continuing to scroll" (coherent, everything
 * keeps moving the same way) and "bouncing back" (incoherent — the
 * outgoing page would drift one way and the incoming page would arrive
 * moving the opposite way).
 *
 * Sequence for a TransitionLink click:
 *   1. startExit() flips isExiting; y animates 0 -> +EXIT_PEAK_VH
 *      (down) while, in parallel, the real navigation happens
 *      (transition-link.tsx no longer waits for this animation before
 *      calling router.push).
 *   2. The MOMENT the pathname actually changes — whether the exit is
 *      barely underway or already sitting at its full peak waiting on
 *      a slow network — y JUMPS (no animation, `.set()`) from wherever
 *      it is to -ENTER_START_VH. This jump is invisible: the content
 *      underneath has also just swapped to the new page at that exact
 *      instant, so there's nothing continuous on screen for the eye to
 *      catch a jump in — like a cut in film hiding a change in camera
 *      position.
 *   3. y animates -ENTER_START_VH -> 0 (down), landing the new page.
 *      Since step 2 already put y in the right starting place the
 *      instant navigation finished, there's no waiting on a timer here
 *      — the jump-and-continue happens immediately regardless of how
 *      far the exit itself got.
 *
 * An earlier version reversed the exit back to 0 instead of jumping
 * past it, which kept the motion jump-free but made the incoming page
 * arrive moving in the OPPOSITE direction from whichever way the exit
 * had been going — the "kebalik" (reversed) bug. Before that, an even
 * earlier version got the direction right (always down) but gated the
 * jump behind the exit's own fixed-duration timer finishing, so a
 * fast/prefetched navigation forced the exit to keep animating on top
 * of the already-swapped-in new page before jumping — the "double
 * animation with a pause" bug. This version keeps the earlier version's
 * direction (always down, correct) and fixes ITS bug by triggering the
 * jump off actual navigation completion instead of an unrelated timer.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExiting = useTransitionStore((state) => state.isExiting);
  const endExit = useTransitionStore((state) => state.endExit);

  const y = useMotionValue(0);
  const previousPathname = useRef(pathname);
  const exitInProgress = useRef(false);

  function playEntrance() {
    y.set(-vhToPx(ENTER_START_VH));
    animate(y, 0, { duration: ENTER_DURATION_S, ease: scrollEase });
  }

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
        exitInProgress.current = false;
        endExit();
      }
      // Same call either way: jump-and-continue-down after an exit, or
      // play the entrance on its own for navigation with no preceding
      // exit. Both cases want y to end up sliding down into place.
      playEntrance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <motion.div style={{ y }}>{children}</motion.div>;
}
