"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { useTransitionStore } from "@/lib/transition-store";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

/**
 * Drop-in replacement for next/link used on the product cards.
 *
 * Starts the exit animation and the real navigation at the same moment,
 * so the new route loads in parallel with the animation instead of only
 * starting once the animation finishes (which left a dead pause on
 * anything slower than an instant, fully-warm cache — e.g. real network
 * conditions in production). page-transition.tsx is responsible for
 * holding the exit in place until BOTH the animation's minimum duration
 * and the navigation itself have completed, whichever is slower.
 */
export function TransitionLink({
  children,
  href,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();
  const startExit = useTransitionStore((state) => state.startExit);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Don't hijack modifier-clicks, middle-clicks, or already-handled clicks
    // (open in new tab / new window should behave like a normal link).
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    startExit();
    router.push(href.toString());
  }

  return (
    <Link href={href} scroll={false} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
