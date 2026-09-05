"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTransitionStore } from "@/lib/transition-store";

// Same easing curve as the Lenis smooth-scroll setup (SmoothScroll
// component): quartic ease-out. Fast off the top like a real finger-drag,
// then decelerates naturally — instead of a mechanical in-out curve.
const scrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

const EXIT_DURATION_S = 0.5;
const ENTER_DURATION_S = 0.5;

// How far the outgoing page appears to scroll down before the new page
// takes over, and how far "above" its resting position the incoming
// page starts — expressed in vh so it scales with viewport height.
// Exit and entrance deliberately share this exact same magnitude and
// unit: that's what makes the handoff between them land seamlessly
// instead of jumping (see the note below).
const SCROLL_DISTANCE_VH = 50;

function vhToPx(vh: number) {
  return (vh * window.innerHeight) / 100;
}

/**
 * Wraps the persistent root layout's {children}.
 *
 * Owns a single vertical offset (`y`) used for BOTH halves of the page
 * transition — exit and entrance alike — so the two can never fall out
 * of sync with each other.
 *
 * Sequence for a TransitionLink click:
 *   1. startExit() flips isExiting; y animates 0 -> +SCROLL_DISTANCE_VH
 *      while, in parallel, the real navigation happens (transition-link.tsx
 *      no longer waits for this animation before calling router.push).
 *   2. Handing off to the entrance requires BOTH of these, whichever
 *      finishes later:
 *        - minDurationDone — the exit has played for at least
 *          EXIT_DURATION_S, so a fast/prefetched navigation never cuts
 *          it short.
 *        - navigationDone — the pathname has actually changed, so a
 *          slow network never leaves a dead pause: the exit keeps
 *          visibly holding its "exited" position while the route loads.
 *   3. At handoff, y JUMPS (no animation) from +SCROLL_DISTANCE_VH to
 *      -SCROLL_DISTANCE_VH. This is invisible on screen: the content
 *      underneath has also just swapped to the new page at that exact
 *      moment, so nothing actually visible appears to move — only the
 *      offset that's about to be animated away does.
 *   4. y animates -SCROLL_DISTANCE_VH -> 0, landing the new page.
 *
 * Earlier versions ran the exit and entrance as two *independent*
 * motion.divs — this one, plus a separate one in app/template.tsx —
 * each with its own timer, and the entrance used a different magnitude
 * (a flat 140px exit vs. a 50vh entrance). Because Next.js can swap in
 * the new page's content well before the exit's own timer finishes, the
 * two animations often overlapped for a stretch, and by the time the
 * exit's timer fired the entrance was frequently already near-finished
 * at a *different* offset than the exit — so the "invisible" jump
 * wasn't actually invisible, it landed mid-motion and produced a
 * visible stutter partway through the transition. Owning one shared
 * value with one shared magnitude removes that race entirely: there is
 * only one motion value, so there's nothing left for two timers (or two
 * units) to disagree about.
 *
 * A plain CSS transform is used throughout (never a real scroll
 * position change), so there's no scroll boundary for the browser's
 * native overscroll/rubber-band behavior, or Lenis's own physics, to
 * fight with.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExiting = useTransitionStore((state) => state.isExiting);
  const endExit = useTransitionStore((state) => state.endExit);

  const y = useMotionValue(0);
  const previousPathname = useRef(pathname);
  const wasExiting = useRef(false);

  const minDurationDone = useRef(false);
  const navigationDone = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function playEntrance() {
    y.set(-vhToPx(SCROLL_DISTANCE_VH));
    animate(y, 0, { duration: ENTER_DURATION_S, ease: scrollEase });
  }

  function tryHandoff() {
    if (minDurationDone.current && navigationDone.current) {
      endExit();
      playEntrance();
    }
  }

  useEffect(() => {
    if (isExiting && !wasExiting.current) {
      wasExiting.current = true;
      minDurationDone.current = false;
      navigationDone.current = false;

      animate(y, vhToPx(SCROLL_DISTANCE_VH), {
        duration: EXIT_DURATION_S,
        ease: scrollEase,
      });

      timeoutRef.current = setTimeout(() => {
        minDurationDone.current = true;
        tryHandoff();
      }, EXIT_DURATION_S * 1000);
    }
    if (!isExiting) {
      wasExiting.current = false;
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExiting]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;

      if (wasExiting.current) {
        navigationDone.current = true;
        tryHandoff();
      } else {
        // Navigation that didn't go through a TransitionLink (browser
        // back/forward, etc.) — still play the entrance so every route
        // change gets the same consistent "scroll" feel.
        playEntrance();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <motion.div style={{ y }}>{children}</motion.div>;
}
