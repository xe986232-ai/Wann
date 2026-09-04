import { Navbar } from "@/components/layout/navbar";
import { HeroCarousel } from "@/components/marketing/hero-carousel";
import { ProductCard } from "@/components/marketing/product-card";

const featured = [
  {
    name: "Midnight Static",
    type: "Sample pack",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Concrete Bloom",
    type: "Drum kit",
    price: "$19",
    image:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Glass Horizon",
    type: "Preset bank",
    price: "$29",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rustbelt Loops",
    type: "MIDI pack",
    price: "$15",
    image:
      "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col pb-xl">
      <Navbar />

      <div className="mt-md md:mt-lg">
        <HeroCarousel />
      </div>

      <section className="mt-lg flex flex-col gap-md px-sm md:px-lg">
        <h4>Featured products</h4>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <ProductCard key={item.name} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
