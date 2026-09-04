"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar({ className = "" }: { className?: string }) {
  const [aiMode, setAiMode] = useState(false);

  return (
    <div
      className={`flex h-12 w-full items-center justify-between gap-2 rounded-[52px] border border-white/10 bg-surface/60 pl-4 pr-3 ${className}`}
    >
      <div className="flex min-w-0 w-full items-center gap-2">
        <Search size={20} className="shrink-0 text-muted" />
        <input
          type="text"
          placeholder="Search sounds, presets, midi"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>

      <label className="flex shrink-0 cursor-pointer select-none items-center gap-2 pl-6">
        <span className="hidden text-xs text-muted sm:block lg:hidden xl:block">
          AI Mode
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={aiMode}
          aria-label="Toggle AI mode"
          onClick={() => setAiMode((v) => !v)}
          className={`relative h-6 w-[45px] shrink-0 rounded-full transition-colors duration-200 ${
            aiMode ? "bg-accent" : "bg-surface-2"
          }`}
        >
          <span
            className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-foreground transition-transform duration-200 ${
              aiMode ? "translate-x-[21px]" : "translate-x-[3px]"
            }`}
          />
        </button>
      </label>
    </div>
  );
}
