"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTransitionStore } from "@/lib/transition-store";

// Same easing curve as the Lenis smooth-scroll setup (SmoothScroll
// component): quartic ease-out. Fast off the top like a real finger-drag,
// then decelerates naturally — instead of a mechanical in-out curve.
const scrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Wraps the persistent root layout's {children}.
 *
 * Plays the "outgoing page" half of the transition: when a TransitionLink
 * is clicked, isExiting flips true and this content drifts down for a beat
 * before the real navigation happens. Once the URL actually changes (new
 * page mounted underneath), isExiting resets to false — but that reset is
 * instant (duration: 0), not animated. If it animated, this wrapper would
 * be sliding the new page toward y:0 at the same time app/template.tsx's
 * own entrance animation is also moving it — two animations stacking on
 * top of each other, which reads as a stutter/gap instead of one
 * continuous motion. Snapping this one instantly leaves template.tsx as
 * the sole driver of the incoming page's motion.
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
      animate={isExiting ? { y: 140 } : { y: 0 }}
      transition={
        isExiting
          ? { duration: 0.5, ease: scrollEase }
          : { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
}
