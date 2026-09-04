import { Navbar } from "@/components/layout/navbar";
import { HeroCarousel } from "@/components/marketing/hero-carousel";
import { FeaturedProductsCarousel } from "@/components/marketing/featured-products-carousel";

export default function Home() {
  return (
    <div className="flex flex-col pb-xl">
      <Navbar />

      <div className="mt-md md:mt-lg">
        <HeroCarousel />
      </div>

      <div className="mt-lg">
        <FeaturedProductsCarousel />
      </div>
    </div>
  );
}
