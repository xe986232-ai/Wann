"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps every route's content. Next.js remounts `template.tsx` on every
 * navigation (unlike `layout.tsx`, which persists), so this fade+rise
 * plays each time you move between pages — e.g. clicking a sample pack
 * card on the home page into /sample-pack/[slug] — instead of the new
 * page just snapping into place.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
