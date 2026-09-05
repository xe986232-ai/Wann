"use client";

import { useContext, useState } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Next.js normally swaps the router context the instant navigation happens,
 * which unmounts the old page before an exit animation can play.
 *
 * This "freezes" the router context snapshot for whatever page is currently
 * inside it, so that page keeps rendering with its last-known content while
 * AnimatePresence plays its exit animation — instead of getting yanked away
 * the moment the new route is ready underneath it.
 */
export function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const [frozen] = useState(context);

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
