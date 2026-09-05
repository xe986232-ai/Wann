"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps page content (not the Navbar — that stays outside, in the root
 * layout, so it's locked in place).
 *
 * Effect: the outgoing page gets pulled straight down and off, then the
 * incoming page continues that same downward motion into place — like
 * one continuous pull rather than an abrupt cut. `mode="wait"` keeps the
 * two phases sequential (old fully leaves, then new arrives) so the
 * shared direction reads as one connected movement instead of a snap.
 * Slow, eased timing keeps it feeling deliberate rather than rushed.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ y: "-40%" }}
        animate={{ y: "0%" }}
        exit={{ y: "40%" }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
