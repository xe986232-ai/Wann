"use client";

import { motion } from "framer-motion";

// Same easing as page-transition.tsx / the Lenis smooth-scroll setup:
// quartic ease-out, so the incoming page continues the outgoing page's
// momentum instead of visibly restarting with a different feel.
const scrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

const ENTRANCE_DURATION_S = 0.5;

// How far "scrolled down" the new page appears to start, expressed as
// vh so it scales with viewport height. This is a pure CSS transform,
// not a real scroll position change — see the note below for why.
const SCROLL_SIMULATION_OFFSET = "-50vh";

/**
 * Next.js remounts template.tsx on every navigation within its segment
 * (unlike layout.tsx, which persists) — the official, version-stable way
 * to get a per-page "entrance" animation.
 *
 * Earlier versions of this made the new page start scrolled down for
 * real (via Lenis) and animated the actual scroll position back to 0.
 * That kept landing on a bounce/overshoot: any real scroll position
 * change can interact with the browser's native overscroll/rubber-band
 * response and with Lenis's own internal physics, and no amount of
 * margin/clamping fully avoided it.
 *
 * This version never touches real scroll at all. Instead it translates
 * the page content itself up by SCROLL_SIMULATION_OFFSET (revealing
 * content that would normally be further down the page) and animates
 * that transform back to 0 — visually identical "scroll up to land at
 * the top" effect, but since it's a plain CSS transform, there's no
 * scroll boundary it can ever hit, so there's nothing left to bounce.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: SCROLL_SIMULATION_OFFSET }}
      animate={{ y: 0 }}
      transition={{ duration: ENTRANCE_DURATION_S, ease: scrollEase }}
    >
      {children}
    </motion.div>
  );
}
