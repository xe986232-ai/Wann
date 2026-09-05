"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTransitionStore } from "@/lib/transition-store";

/**
 * Wraps the persistent root layout's {children}.
 *
 * Plays the "outgoing page" half of the transition: when a TransitionLink
 * is clicked, isExiting flips true and this content drifts up + fades out
 * for a beat before the real navigation happens. Once the URL actually
 * changes (new page mounted underneath), isExiting resets so the fresh
 * page starts clean — its own entrance animation is handled separately by
 * app/template.tsx, which Next.js remounts on every navigation natively.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExiting = useTransitionStore((state) => state.isExiting);
  const endExit = useTransitionStore((state) => state.endExit);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      endExit();
    }
  }, [pathname, endExit]);

  return (
    <motion.div
      animate={isExiting ? { opacity: 0, y: -48 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
