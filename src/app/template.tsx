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
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
