"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps page content (not the Navbar — that stays outside, in the root
 * layout, so it's locked in place).
 *
 * Effect: both pages move upward, but instead of a sequential handoff
 * they're stacked in the same grid cell so the incoming page fades in
 * directly on top of the outgoing one while both move up — the overlap
 * is what makes it feel merged ("nyatu") rather than a hard cut. The
 * outgoing page sits underneath in DOM/paint order, so the fade-in on
 * top naturally reads as an overlay. Slow, eased timing keeps it
 * deliberate instead of snappy.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grid flex-1">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: -60 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="flex flex-1 flex-col [grid-area:1/1]"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
