import { create } from "zustand";

interface TransitionState {
  isExiting: boolean;
  startExit: () => void;
  endExit: () => void;
}

/**
 * Tracks whether an "outgoing page" exit animation should currently be
 * playing. Deliberately plain state (no dependency on Next.js router
 * internals) so it keeps working across Next.js versions.
 */
export const useTransitionStore = create<TransitionState>((set) => ({
  isExiting: false,
  startExit: () => set({ isExiting: true }),
  endExit: () => set({ isExiting: false }),
}));
