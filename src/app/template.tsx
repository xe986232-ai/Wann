"use client";

import { motion } from "framer-motion";

// Same easing as page-transition.tsx / the Lenis smooth-scroll setup:
// quartic ease-out, so the incoming page continues the outgoing page's
// momentum instead of visibly restarting with a different feel.
const scrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Next.js remounts template.tsx on every navigation within its segment
 * (unlike layout.tsx, which persists) — the official, version-stable way
 * to get a per-page "entrance" animation. Picks up where the outgoing
 * page's exit (page-transition.tsx) leaves off: starts below and rises
 * into place with matching physics.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 140 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: scrollEase }}
    >
      {children}
    </motion.div>
  );
}
