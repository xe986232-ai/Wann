"use client";

import { CircleUserRound, Bookmark, Heart, Rss, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const quickLinks = [
  { label: "My collections", href: "/account/collections", icon: Bookmark },
  { label: "Likes", href: "/account/wishlist/samples", icon: Heart },
  { label: "My Feed", href: "/account/my-feed/samples", icon: Rss },
];

export function AccountMenu() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <div className="absolute right-0 top-full z-40 hidden pt-4 group-hover:block" role="menu">
      <div className="flex w-[360px] flex-col gap-2 rounded-xl border border-white/10 bg-surface py-2">
        {/* profile */}
        <div className="flex flex-col gap-2 px-2">
          <div className="flex items-center justify-between gap-4 rounded-lg bg-surface-2/60 px-4 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-foreground/80">
                <CircleUserRound size={30} strokeWidth={1.5} />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <span className="truncate text-sm text-foreground">producer_42</span>
                <Link href="/account" className="truncate text-xs text-muted">
                  View profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* credits + plan */}
        <div className="flex flex-col gap-2 px-2">
          <div className="flex items-center justify-between gap-4 rounded-lg bg-surface-2/60 px-4 py-3.5">
            <span className="pl-2 text-xs text-foreground/90">4 credits</span>
            <Link
              href="/account/plans"
              className="flex h-9 items-center justify-center rounded-full bg-accent px-4 text-xs font-medium text-foreground transition-transform hover:scale-105"
            >
              Select plan
            </Link>
          </div>
        </div>

        {/* quick links */}
        <div className="flex gap-2 px-2">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-1 flex-col items-center gap-2 rounded-lg bg-surface-2/60 p-4 text-center transition-colors duration-300 hover:bg-white/5"
            >
              <Icon size={22} className="text-muted" strokeWidth={1.7} />
              <span className="text-xs text-foreground/90">{label}</span>
            </Link>
          ))}
        </div>

        {/* theme toggle */}
        <div className="px-2">
          <div className="flex gap-1 rounded-lg bg-surface-2/60 p-1">
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

        {/* sign out */}
        <div className="px-2">
          <Link
            href="/logout"
            className="flex items-center justify-center gap-2 rounded-lg bg-surface-2/60 px-1 py-2.5 text-xs text-foreground/90 transition-colors duration-300 hover:bg-white/5"
          >
            <LogOut size={18} strokeWidth={1.7} />
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}
