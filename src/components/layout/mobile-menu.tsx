"use client";

import { SectionArrowIcon } from "@/components/icons";
import { browseColumns, presetsColumn, type NavColumn } from "./nav-data";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function AccordionSection({ column, onNavigate }: { column: NavColumn; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-lg bg-surface-2/60 p-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between pl-1.5"
        aria-expanded={open}
      >
        <span className={`text-sm ${column.accentClass}`}>{column.title}</span>
        <ChevronDown
          size={16}
          className={`text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-4">
              {column.groups.map((group, i) => (
                <div key={i} className="flex w-full flex-col items-start">
                  {group.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onNavigate}
                        className="flex w-full items-center gap-2.5 rounded-lg py-1 pl-2 pr-2.5 text-xs text-foreground/90 hover:bg-white/5"
                      >
                        {Icon && <Icon width={18} height={18} className="shrink-0 text-muted" />}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}

              {column.viewAllHref && (
                <Link
                  href={column.viewAllHref}
                  onClick={onNavigate}
                  className="flex w-full items-center gap-1.5 rounded-lg py-1 pl-2 pr-2.5 text-xs text-muted hover:bg-white/5 hover:text-foreground"
                >
                  View all
                  <SectionArrowIcon width={12} height={12} className="rotate-180" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const allColumns = [...browseColumns, presetsColumn];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-40 flex h-[100dvh] w-full flex-col overflow-y-auto bg-[#0b0c0f] px-6 pb-24 pt-32 lg:hidden"
        >
          <ul className="flex flex-col items-center gap-8">
            <li>
              <Link href="/explore" onClick={onClose} className="text-2xl text-foreground">
                Explore
              </Link>
            </li>
            <li className="flex w-full flex-col items-center gap-3">
              <span className="text-2xl text-foreground">Browse</span>
              <div className="flex w-full flex-col gap-2 pt-4">
                {allColumns.map((column) => (
                  <AccordionSection key={column.title} column={column} onNavigate={onClose} />
                ))}
              </div>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
