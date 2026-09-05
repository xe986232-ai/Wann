"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FrozenRouter } from "@/components/layout/frozen-router";

/**
 * Page-to-page transition.
 *
 * Intent: when the user clicks a product card, the current page should get
 * a brief moment of its own outgoing motion (as if the scroll simply kept
 * going) before the next page takes over — a relay, not an instant swap.
 *
 * - Outgoing page: drifts up + fades out (continues the "scroll" motion).
 * - Incoming page: starts a little below its resting position and slides
 *   up into place, picking up where the outgoing page's motion left off.
 *
 * Both run at the same time (not mode="wait") so there's no blank gap
 * between them — the handoff feels connected instead of stacked.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -48 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
