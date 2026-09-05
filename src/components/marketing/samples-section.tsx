"use client";

import { useMemo, useState } from "react";
import type { Sample } from "@/lib/products";
import {
  CheckIcon,
  ChevronDownIcon,
  CollectionIcon,
  DownloadIcon,
  FlagIcon,
  HeartIcon,
  LoopIcon,
  MenuIcon,
  OneShotIcon,
  PlayIcon,
  ProviderIcon,
  SamplesTabIcon,
  SearchIcon,
  SimilarIcon,
  TempoIcon,
} from "@/components/icons";

interface SamplesSectionProps {
  samples: Sample[];
  packImage?: string;
  providerSlug?: string;
}

type TypeFilter = "all" | "loop" | "one-shot";

const TYPE_FILTERS: { label: string; value: TypeFilter }[] = [
  { label: "Loops", value: "loop" },
  { label: "One shots", value: "one-shot" },
];

const WAVEFORM_BAR_COUNT = 40;

/** Deterministic pseudo-random bar heights (0.12–1) seeded by sample id,
 * so the waveform stays stable across re-renders without real audio data. */
function getWaveformBars(seed: string) {
  let state = 0;
  for (let i = 0; i < seed.length; i++) {
    state = (state * 31 + seed.charCodeAt(i)) >>> 0;
  }
  state = state || 1;

  const bars: number[] = [];
  for (let i = 0; i < WAVEFORM_BAR_COUNT; i++) {
    state = (state * 1103515245 + 12345) >>> 0;
    bars.push(0.12 + ((state >>> 8) % 100) / 100 * 0.88);
  }
  return bars;
}

function Waveform({
  sampleId,
  progress,
  onSeek,
}: {
  sampleId: string;
  progress: number;
  onSeek: (fraction: number) => void;
}) {
  const bars = useMemo(() => getWaveformBars(sampleId), [sampleId]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Seek waveform"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        onSeek((event.clientX - rect.left) / rect.width);
      }}
      className="relative h-9 w-[220px] cursor-pointer"
    >
      <div className="absolute inset-0 flex items-center gap-[2px] overflow-hidden">
        {bars.map((height, index) => (
          <div
            key={index}
            className="w-[3px] shrink-0 rounded-full bg-surface-2"
            style={{ height: `${Math.round(height * 100)}%` }}
          />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-[2px] overflow-hidden"
        style={{ width: `${progress * 100}%` }}
      >
        {bars.map((height, index) => (
          <div
            key={index}
            className="w-[3px] shrink-0 rounded-full bg-accent"
            style={{ height: `${Math.round(height * 100)}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SamplesSection({
  samples,
  packImage,
  providerSlug,
}: SamplesSectionProps) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [seek, setSeek] = useState<Record<string, number>>({});

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

  function toggleSelected(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function togglePlay(id: string) {
    setPlayingId((current) => (current === id ? null : id));
  }

  function handleSeek(id: string, fraction: number) {
    setSeek((current) => ({
      ...current,
      [id]: Math.min(1, Math.max(0, fraction)),
    }));
    setPlayingId(id);
  }

  return (
    <div className="mt-lg rounded-2xl bg-surface py-4">
      {/* Row 1: Samples tab */}
      <div className="relative w-full max-w-full border-b border-background pb-3">
        <ul className="flex w-full gap-3 overflow-x-auto px-sm [-ms-overflow-style:none] [scrollbar-width:none] md:px-lg [&::-webkit-scrollbar]:hidden">
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
      <div className="relative w-full max-w-full border-b border-background py-3">
        <ul className="flex w-full items-center gap-2 overflow-x-auto px-sm [-ms-overflow-style:none] [scrollbar-width:none] md:px-lg [&::-webkit-scrollbar]:hidden">
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
      <div className="flex w-full items-center justify-between gap-4 border-b border-background px-sm py-3 md:px-lg">
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
          <div className="flex w-full items-center gap-2 overflow-x-auto border-b border-background px-sm py-3 md:px-lg [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
          line up perfectly and the row dividers stay clean/aligned.
          Track order (lg+): checkbox, thumbnail, play, name, waveform,
          type, bpm, key, time, actions. Below lg only play/name/actions
          stay in flow (the rest use `hidden ... lg:flex/block`). */}
      <div className="grid grid-cols-[max-content_1fr_max-content] lg:grid-cols-[max-content_max-content_max-content_1fr_max-content_max-content_max-content_max-content_max-content_max-content]">
        {/* Table header (desktop) */}
        <div className="col-span-full hidden grid-cols-subgrid items-center gap-4 border-b border-background px-sm py-3 text-xs text-muted md:px-lg lg:grid">
          <div />
          <div />
          <div />
          <div>Name</div>
          <div />
          <div>Type</div>
          <div>Bpm</div>
          <div>Key</div>
          <div>Time</div>
          <div />
        </div>

        {/* Rows */}
        {filteredSamples.length === 0 && (
          <p className="col-span-full px-sm py-8 text-center text-sm text-muted md:px-lg">
            No samples match your filters.
          </p>
        )}

        {filteredSamples.map((sample) => {
          const isSelected = selectedIds.has(sample.id);
          const isPlaying = playingId === sample.id;

          return (
            <div
              key={sample.id}
              className="col-span-full grid grid-cols-subgrid items-center gap-4 border-b border-background px-sm py-3 md:px-lg"
            >
              {/* Multi-download checkbox */}
              <div className="hidden lg:flex items-center justify-center">
                <label
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-border-subtle text-accent transition-colors hover:border-border-subtle-hover"
                  aria-label={`Select ${sample.name} for multi-download`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelected(sample.id)}
                    className="sr-only"
                  />
                  {isSelected && <CheckIcon className="h-4 w-4" />}
                </label>
              </div>

              {/* Thumbnail */}
              <div className="hidden lg:block">
                {packImage ? (
                  <div className="h-11 w-11 overflow-hidden rounded-lg bg-surface-2">
                    <img
                      src={packImage}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-11 w-11 rounded-lg bg-surface-2" />
                )}
              </div>

              {/* Play */}
              <button
                type="button"
                aria-label={isPlaying ? `Pause ${sample.name}` : `Play ${sample.name}`}
                onClick={() => togglePlay(sample.id)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isPlaying
                    ? "bg-accent text-white"
                    : "bg-surface-2 text-muted hover:bg-accent hover:text-white"
                }`}
              >
                <PlayIcon className="h-6 w-6" />
              </button>

              {/* Name + tags */}
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

              {/* Waveform */}
              <div className="hidden lg:block">
                <Waveform
                  sampleId={sample.id}
                  progress={isPlaying ? (seek[sample.id] ?? 0) : 0}
                  onSeek={(fraction) => handleSeek(sample.id, fraction)}
                />
              </div>

              {/* Type */}
              <div className="hidden items-center justify-center text-muted lg:flex">
                {sample.type === "loop" ? (
                  <LoopIcon className="h-5 w-5" aria-label="Loop" />
                ) : (
                  <OneShotIcon className="h-5 w-5" aria-label="One shot" />
                )}
              </div>

              {/* Bpm */}
              <div className="hidden justify-center text-xs text-muted lg:flex">
                {sample.bpm ?? "-"}
              </div>

              {/* Key */}
              <div className="hidden justify-center text-xs text-muted lg:flex">
                {sample.key ?? "-"}
              </div>

              {/* Time */}
              <div className="hidden justify-center text-xs text-muted lg:flex">
                {sample.duration}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  aria-label="Show similar sounds"
                  className="hidden h-11 w-11 items-center justify-center rounded-3xl text-muted transition-colors hover:bg-surface-2 hover:text-foreground md:flex"
                >
                  <SimilarIcon className="h-5 w-5" />
                </button>
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
                    <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-52 rounded-lg bg-surface-2 py-2 shadow-lg">
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                      >
                        <DownloadIcon className="h-4 w-4 text-muted" />
                        Download sample
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                      >
                        <HeartIcon className="h-4 w-4 text-muted" />
                        Add to wishlist
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                      >
                        <TempoIcon className="h-4 w-4 text-muted" />
                        Change Tempo
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                      >
                        <SimilarIcon className="h-4 w-4 text-muted" />
                        Find Similar
                      </button>
                      <a
                        href={
                          providerSlug
                            ? `/provider/sample-packs/${providerSlug}`
                            : "#"
                        }
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                      >
                        <ProviderIcon className="h-4 w-4 text-muted" />
                        View Provider
                      </a>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                      >
                        <CollectionIcon className="h-4 w-4 text-muted" />
                        Add to Collection
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs text-foreground hover:bg-surface"
                      >
                        <FlagIcon className="h-4 w-4 text-muted" />
                        Report Sample
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
