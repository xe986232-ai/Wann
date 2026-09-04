"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const accountLinks = [
  { label: "Account", href: "/account" },
  { label: "Select plan", href: "/account/plans" },
  { label: "Downloads", href: "/account/download-history/samples" },
  { label: "My collections", href: "/account/collections" },
  { label: "My Feed", href: "/account/my-feed/samples" },
  { label: "Sign out", href: "/logout" },
];

export function MobileSettingsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-40 flex h-[100dvh] w-full flex-col overflow-y-auto bg-[#0b0c0f] px-6 pb-40 pt-[200px] lg:hidden"
        >
          <div className="flex w-full flex-col gap-2 rounded-xl border border-white/10 bg-surface py-2">
            <div className="flex gap-2 px-2">
              <div className="flex flex-1 gap-1 rounded-lg bg-surface-2/60 p-1">
                {(["dark", "light"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTheme(mode)}
                    className={`flex-1 rounded-md px-4 py-1.5 text-xs capitalize transition-colors duration-300 ${
                      theme === mode
                        ? "bg-accent text-foreground"
                        : "text-muted hover:bg-white/5"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 px-2">
              {accountLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-lg bg-surface-2/60 px-4 py-3 text-xs text-foreground/90 transition-colors duration-300 hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
