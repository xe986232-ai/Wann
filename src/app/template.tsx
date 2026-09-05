"use client";

import { motion } from "framer-motion";
import { useEffect, useLayoutEffect } from "react";
import { getLenis } from "@/components/layout/smooth-scroll";

// Same easing as page-transition.tsx / the Lenis smooth-scroll setup:
// quartic ease-out, so the incoming page continues the outgoing page's
// momentum instead of visibly restarting with a different feel.
const scrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

// How far down the new page starts, before animating back up to the
// top. Expressed as a fraction of the viewport height (rather than a
// fixed px value) so the "amount of scroll" feels the same across phone
// and desktop. Lenis clamps this to the page's actual scroll limit on
// its own, so shorter pages just start at their max scroll instead of
// overshooting.
const SCROLL_START_VH_FRACTION = 0.9;

const ENTRANCE_DURATION_S = 0.5;

/**
 * Next.js remounts template.tsx on every navigation within its segment
 * (unlike layout.tsx, which persists) — the official, version-stable way
 * to get a per-page "entrance" animation. Picks up where the outgoing
 * page's exit (page-transition.tsx) leaves off: starts below and rises
 * into place with matching physics.
 *
 * On top of that small transform slide, the new page also starts already
 * scrolled ~90% of a viewport down and animates its real scroll position
 * back up to the top — so entering a page reads as a long scroll-up
 * rather than a small nudge.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  // Layout effect: runs synchronously right after the new page's DOM is
  // in place but before the browser paints, so this jump is invisible —
  // the very first frame the user sees is already at the "start" offset.
  useLayoutEffect(() => {
    const startY = window.innerHeight * SCROLL_START_VH_FRACTION;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(startY, { immediate: true });
    } else {
      window.scrollTo(0, startY);
    }
  }, []);

  // Regular effect: runs after that first paint, so this is the visible
  // animated part — scrolling from the jumped-to start point back to 0.
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, {
        duration: ENTRANCE_DURATION_S,
        easing: scrollEase,
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      transition={{ duration: ENTRANCE_DURATION_S, ease: scrollEase }}
    >
      {children}
    </motion.div>
  );
}
