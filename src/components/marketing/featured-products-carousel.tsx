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
  {
    name: "Concrete Bloom",
    provider: "Nightshade Audio",
    image:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=800&q=80",
    downloads: 128,
    href: "/sample-pack/concrete-bloom",
  },
  {
    name: "Glass Horizon",
    provider: "Faraway Sounds",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    downloads: 94,
    href: "/sample-pack/glass-horizon",
  },
];

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
                      src={product.image}
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
