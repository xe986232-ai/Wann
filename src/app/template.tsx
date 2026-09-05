"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps every route's content. Next.js remounts `template.tsx` on every
 * navigation (unlike `layout.tsx`, which persists), so this slide-in plays
 * each time you move between pages — e.g. clicking a sample pack card on
 * the home page into /sample-pack/[slug] — instead of the new page just
 * snapping into place.
 *
 * Internal links must use next/link's <Link> (not a raw <a>) for this to
 * feel seamless: a plain <a> triggers a full browser navigation (unload +
 * reload), which is what causes a black flash between pages. <Link> keeps
 * navigation client-side so this animation is the only thing you see.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
