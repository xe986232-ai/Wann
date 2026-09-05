"use client";

import { motion } from "framer-motion";

/**
 * Next.js remounts template.tsx on every navigation within its segment
 * (unlike layout.tsx, which persists) — the official, version-stable way
 * to get a per-page "entrance" animation. Picks up where the outgoing
 * page's exit (page-transition.tsx) leaves off: starts slightly below and
 * slides up into place while fading in.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
