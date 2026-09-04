"use client";

import { PlayIcon, SectionArrowIcon, TileWaveformIcon } from "@/components/icons";
import { useRef, useState } from "react";

interface Product {
  name: string;
  provider: string;
  image: string;
  downloads: number;
  href: string;
}

const tags = [
  "Latest",
  "Hip-Hop",
  "RnB",
  "Soul",
  "Boom Bap",
  "Trap",
  "Techno",
  "Tech-House",
  "Amapiano",
  "Pop",
];

const products: Product[] = [
  { name: "Stars", provider: "Wolves", image: "6a8462d8b5012.jpg", downloads: 162, href: "/sample-pack/stars" },
  { name: "Boom Bap Drums Vol.2", provider: "Alliant Audio", image: "6a706a0bbe2bd.jpg", downloads: 151, href: "/sample-pack/boom-bap-drums-vol-2" },
  { name: "GHETTO STORIES VOL 3", provider: "Mystic Samples", image: "6a5e796bb82bf.jpg", downloads: 209, href: "/sample-pack/ghetto-stories-vol-3" },
  { name: "British Techno Vocals", provider: "Element One", image: "6a8583fe2f102.jpg", downloads: 185, href: "/sample-pack/british-techno-vocals" },
  { name: "808 Type Beat", provider: "SHOBEATS", image: "6a8246e5afdf5.jpg", downloads: 105, href: "/sample-pack/808-type-beat" },
  { name: "A Touch Of Boom Bap", provider: "Alliant Audio", image: "6a706808db0af.jpg", downloads: 157, href: "/sample-pack/a-touch-of-boom-bap" },
  { name: "samples from non-exclusive beats 01", provider: "made.+ samples.", image: "6a6a9576262f9.jpg", downloads: 561, href: "/sample-pack/samples-from-non-exclusive-beats-01" },
  { name: "Southside Trench", provider: "OLLLOS", image: "6a771a24795fe.jpg", downloads: 97, href: "/sample-pack/southside-trench" },
  { name: "Hermes", provider: "Aquila Beats", image: "69f394048546e.jpg", downloads: 101, href: "/sample-pack/hermes" },
  { name: "Rare Grooves - Oldschool Hip-Hop", provider: "Godlike Loops", image: "6a7af9a18e3c5.jpg", downloads: 92, href: "/sample-pack/rare-grooves-oldschool-hip-hop" },
  { name: "Reborn Sample Pack", provider: "Double Bang Music", image: "6a7cff393494f.jpg", downloads: 116, href: "/sample-pack/reborn-sample-pack" },
  { name: "OUTPUT", provider: "CJR", image: "6a71bf51d52f8.jpg", downloads: 159, href: "/sample-pack/output" },
  { name: "Cold Blood - Trap Beats", provider: "SOLVED.", image: "6a735de96262d.jpg", downloads: 160, href: "/sample-pack/cold-blood-trap-beats" },
  { name: "KILLAZ - Detroit Bangers", provider: "T-KID The Producer", image: "6a7361ee37790.jpg", downloads: 58, href: "/sample-pack/killaz-detroit-bangers" },
  { name: "UNDERGROUND MIXTAPE VOL. 1", provider: "Mystic Samples", image: "6a778276ba0bd.jpg", downloads: 205, href: "/sample-pack/underground-mixtape-vol-1" },
  { name: "INDIE SOUL SAMPLES", provider: "Motion Emotion Vibes", image: "6a6cde9dce51c.jpg", downloads: 126, href: "/sample-pack/indie-soul-samples" },
  { name: "Gbono Afrobeats", provider: "Flame Audio", image: "6a6d8fba1a2ab.jpeg", downloads: 94, href: "/sample-pack/gbono-afrobeats" },
  { name: "PINK - Afro RnB", provider: "Tichwise Productions", image: "6a6cc3955631e.jpg", downloads: 64, href: "/sample-pack/pink-afro-rnb" },
  { name: "Raw Heritage", provider: "Jungle Loops", image: "6a733b06a45c2.jpg", downloads: 171, href: "/sample-pack/raw-heritage" },
  { name: "'Sinner' Epic Songstarters", provider: "Prosound Sonics", image: "6a65ce2c8ea19.JPG", downloads: 151, href: "/sample-pack/sinner-20-epic-songstarters" },
  { name: "The Real Trap", provider: "SHOBEATS", image: "6a67b661443d2.jpg", downloads: 107, href: "/sample-pack/the-real-trap" },
  { name: "The Boom Files", provider: "Godlike Loops", image: "6a64b4226f0d1.jpg", downloads: 142, href: "/sample-pack/the-boom-files-hip-hop-samples" },
  { name: "Spaces", provider: "SAMPLE SWAMP", image: "6a5d29ac1143e.jpg", downloads: 78, href: "/sample-pack/spaces" },
  { name: "Trap Baby Vol. 1", provider: "Project Blvck", image: "6a5dd2c60dd14.jpg", downloads: 161, href: "/sample-pack/trap-baby-dark-melodic-loops" },
];

function imageUrl(file: string) {
  return `https://img.slooply.com/fit-in/400x400/filters:quality(60)/${file}`;
}

export function FeaturedProductsCarousel() {
  const [activeTag, setActiveTag] = useState("Latest");
  const scrollerRef = useRef<HTMLUListElement>(null);

  function scrollByAmount(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section className="relative mx-sm rounded-2xl bg-surface py-12 md:mx-lg">
      <div className="mb-10 flex flex-col items-center justify-between gap-3 text-center md:items-start md:text-left">
        <h2 className="px-12 text-xl font-medium lg:text-lg">
          Featured products
        </h2>
        <div className="flex w-full gap-2 overflow-x-auto px-6 [scrollbar-width:none] [-ms-overflow-style:none] md:flex-wrap md:overflow-visible md:px-12 [&::-webkit-scrollbar]:hidden">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`inline-flex h-9 shrink-0 items-center justify-start rounded-3xl border px-4 transition-colors duration-200 ${
                activeTag === tag
                  ? "border-accent"
                  : "border-surface-2 hover:border-muted"
              }`}
            >
              <span className="whitespace-nowrap text-xs">{tag}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full">
        <ul
          ref={scrollerRef}
          className="carousel-viewport flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <li
              key={product.href}
              className="group/card relative flex w-52 shrink-0 flex-col items-start justify-start gap-1 overflow-hidden rounded-2xl bg-surface-2 p-3 transition-colors duration-300 hover:bg-surface-2/70"
            >
              <div className="relative w-full">
                <a href={product.href} className="block">
                  <span className="relative block aspect-square w-full overflow-hidden rounded-lg bg-background">
                    <img
                      src={imageUrl(product.image)}
                      alt={product.name}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </span>
                </a>

                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                  <button
                    type="button"
                    aria-label="Play"
                    className="pointer-events-auto flex h-11 w-11 touch-manipulation select-none items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 ease-in-out active:scale-90 md:hover:bg-background md:hover:text-foreground"
                  >
                    <PlayIcon width={44} height={44} />
                  </button>
                </div>

                <div className="absolute right-2 top-2 z-30">
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur transition-colors duration-200 md:hover:bg-background"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex w-full min-w-0 flex-col px-2 pb-2 pt-3">
                <p className="truncate text-sm font-medium text-foreground transition-colors duration-300">
                  <a href={product.href}>{product.name}</a>
                </p>
                <p className="truncate text-xs text-muted">{product.provider}</p>
              </div>

              <div className="flex flex-row flex-wrap gap-2 px-2 pb-2">
                <span className="flex flex-row items-center gap-1 rounded-full border border-muted/30 px-3 py-1 text-[11px] leading-none text-foreground transition-colors duration-200 md:group-hover/card:border-foreground">
                  <TileWaveformIcon width={16} height={16} />
                  {product.downloads}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3 md:absolute md:right-12 md:top-16 md:mt-0">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => scrollByAmount(-320)}
          className="flex h-[52px] w-[52px] touch-manipulation select-none items-center justify-center rounded-full bg-surface-2 transition-all duration-200 ease-in-out active:scale-90 md:hover:bg-surface"
        >
          <SectionArrowIcon width={24} height={24} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => scrollByAmount(320)}
          className="flex h-[52px] w-[52px] touch-manipulation select-none items-center justify-center rounded-full bg-surface-2 transition-all duration-200 ease-in-out active:scale-90 md:hover:bg-surface"
        >
          <SectionArrowIcon width={24} height={24} className="rotate-180" />
        </button>
      </div>
    </section>
  );
}
