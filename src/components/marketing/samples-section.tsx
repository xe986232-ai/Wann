"use client";

import { useMemo, useState } from "react";
import type { Sample } from "@/lib/products";
import {
  ChevronDownIcon,
  DownloadIcon,
  HeartIcon,
  LoopIcon,
  MenuIcon,
  OneShotIcon,
  PlayIcon,
  SamplesTabIcon,
  SearchIcon,
} from "@/components/icons";

interface SamplesSectionProps {
  samples: Sample[];
}

type TypeFilter = "all" | "loop" | "one-shot";

const TYPE_FILTERS: { label: string; value: TypeFilter }[] = [
  { label: "Loops", value: "loop" },
  { label: "One shots", value: "one-shot" },
];

export function SamplesSection({ samples }: SamplesSectionProps) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    samples.forEach((sample) => sample.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, [samples]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredSamples = samples.filter((sample) => {
    if (typeFilter !== "all" && sample.type !== typeFilter) return false;
    if (activeTag && !sample.tags.includes(activeTag)) return false;
    if (
      query &&
      !sample.name.toLowerCase().includes(query.toLowerCase()) &&
      !sample.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase()),
      )
    )
      return false;
    return true;
  });

  if (samples.length === 0) return null;

  return (
    <div className="mt-lg rounded-2xl bg-surface px-sm py-4 md:px-lg">
      {/* Row 1: Samples tab */}
      <div className="relative w-full max-w-full border-b border-surface-2 pb-3">
        <ul className="flex w-full gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <li>
            <button
              type="button"
              onClick={() => setTypeFilter("all")}
              aria-label="Samples"
              className="inline-flex flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[60px] px-6 py-3 outline outline-2 outline-offset-[-2px] outline-border-subtle transition-all duration-200 ease-in-out select-none"
            >
              <SamplesTabIcon className="h-5 w-5 text-muted" />
              <span className="text-base text-foreground">Samples</span>
              <span className="text-[10px] text-muted">
                ({samples.length})
              </span>
            </button>
          </li>
        </ul>
        <div className="pointer-events-none absolute right-0 top-0 h-14 w-16 bg-gradient-to-l from-surface to-transparent" />
      </div>

      {/* Row 2: Loops / One shots */}
      <div className="relative w-full max-w-full border-b border-surface-2 py-3">
        <ul className="flex w-full items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TYPE_FILTERS.map((filter) => (
            <li key={filter.value}>
              <button
                type="button"
                onClick={() =>
                  setTypeFilter((current) =>
                    current === filter.value ? "all" : filter.value,
                  )
                }
                className={`flex h-11 shrink-0 items-center justify-start gap-1 whitespace-nowrap rounded-3xl px-5 transition-colors duration-200 select-none ${
                  typeFilter === filter.value
                    ? "bg-accent text-white"
                    : "bg-surface-2 text-muted hover:text-foreground"
                }`}
              >
                <span className="text-sm">{filter.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 bg-gradient-to-l from-surface to-transparent" />
      </div>

      {/* Row 3: Search + sort */}
      <div className="flex w-full items-center justify-between gap-4 border-b border-surface-2 py-3">
        <div className="relative min-w-0 flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search samples"
            className="h-11 w-full rounded-3xl bg-surface-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted outline-none"
          />
        </div>
        <button
          type="button"
          aria-label="Sort samples"
          className="flex h-11 shrink-0 items-center gap-2 rounded-3xl bg-surface-2 px-4 text-xs text-muted hover:text-foreground"
        >
          Most Popular
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Row 4: Tag filters */}
      {allTags.length > 0 && (
        <div className="relative w-full">
          <div className="flex w-full items-center gap-2 overflow-x-auto border-b border-surface-2 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  setActiveTag((current) => (current === tag ? null : tag))
                }
                className={`h-9 shrink-0 whitespace-nowrap rounded-3xl border px-4 text-xs transition-colors ${
                  activeTag === tag
                    ? "border-accent text-foreground"
                    : "border-border-subtle text-muted hover:border-border-subtle-hover"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-12 w-16 bg-gradient-to-l from-surface to-transparent" />
        </div>
      )}

      {/* Shared grid: header + every row use grid-cols-subgrid so columns
          line up perfectly and the row dividers stay clean/aligned. */}
      <div className="grid grid-cols-[max-content_1fr_max-content] lg:grid-cols-[max-content_1fr_max-content_max-content_max-content_max-content_max-content]">
        {/* Table header (desktop) */}
        <div className="col-span-full hidden grid-cols-subgrid items-center gap-4 border-b border-surface-2 px-2 py-3 text-xs text-muted lg:grid">
          <div />
          <div>Name</div>
          <div>Type</div>
          <div>Bpm</div>
          <div>Key</div>
          <div>Time</div>
          <div />
        </div>

        {/* Rows */}
        {filteredSamples.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted">
            No samples match your filters.
          </p>
        )}

        {filteredSamples.map((sample) => (
          <div
            key={sample.id}
            className="col-span-full grid grid-cols-subgrid items-center gap-4 border-b border-surface-2 px-2 py-3"
          >
            <button
              type="button"
              aria-label={`Play ${sample.name}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted transition-colors hover:bg-accent hover:text-white"
            >
              <PlayIcon className="h-6 w-6" />
            </button>

            <div className="min-w-0 truncate">
              <p className="truncate text-xs text-foreground">
                {sample.name}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {sample.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden items-center justify-center text-muted lg:flex">
              {sample.type === "loop" ? (
                <LoopIcon className="h-5 w-5" aria-label="Loop" />
              ) : (
                <OneShotIcon className="h-5 w-5" aria-label="One shot" />
              )}
            </div>

            <div className="hidden justify-center text-xs text-muted lg:flex">
              {sample.bpm ?? "-"}
            </div>

            <div className="hidden justify-center text-xs text-muted lg:flex">
              {sample.key ?? "-"}
            </div>

            <div className="hidden justify-center text-xs text-muted lg:flex">
              {sample.duration}
            </div>

            <div className="flex items-center justify-end gap-1">
              <button
                type="button"
                aria-label="Add to wishlist"
                className="hidden h-11 w-11 items-center justify-center rounded-3xl text-muted transition-colors hover:bg-surface-2 hover:text-foreground md:flex"
              >
                <HeartIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Download sample"
                className="hidden h-11 w-11 items-center justify-center rounded-3xl text-muted transition-colors hover:bg-surface-2 hover:text-foreground md:flex"
              >
                <DownloadIcon className="h-5 w-5" />
              </button>
              <div className="relative">
                <button
                  type="button"
                  aria-label="More"
                  onClick={() =>
                    setOpenMenuId((current) =>
                      current === sample.id ? null : sample.id,
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-3xl text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <MenuIcon className="h-5 w-5" />
                </button>
                {openMenuId === sample.id && (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-48 rounded-lg bg-surface-2 py-2 shadow-lg">
                    <button
                      type="button"
                      className="w-full px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                    >
                      Download sample
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                    >
                      Add to wishlist
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                    >
                      Find similar
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                    >
                      Add to collection
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                    >
                      Report sample
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
