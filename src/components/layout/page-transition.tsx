"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps page content (not the Navbar — that stays outside, in the root
 * layout, so it's locked in place). Keyed by pathname so AnimatePresence
 * actually plays an exit animation on the outgoing page before the new
 * one slides/fades in, instead of the old page just vanishing instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{
          opacity: { duration: 0.5, ease: "easeInOut" },
          y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
