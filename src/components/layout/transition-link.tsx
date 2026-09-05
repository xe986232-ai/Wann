"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { useTransitionStore } from "@/lib/transition-store";

// Keep in sync with the exit animation duration in page-transition.tsx.
export const EXIT_DURATION_MS = 350;

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

/**
 * Drop-in replacement for next/link used on the product cards.
 *
 * On click it plays the current page's exit animation (via
 * useTransitionStore) for EXIT_DURATION_MS, then performs the actual
 * navigation — so leaving the page always gets a brief moment of motion
 * instead of an instant cut, regardless of Next.js version internals.
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

    window.setTimeout(() => {
      router.push(href.toString());
    }, EXIT_DURATION_MS);
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
