export interface Product {
  slug: string;
  name: string;
  providerName: string;
  providerSlug: string;
  image: string;
  downloads: number;
}

export const products: Product[] = [
  {
    slug: "concrete-bloom",
    name: "Concrete Bloom",
    providerName: "Nightshade Audio",
    providerSlug: "nightshade-audio",
    image:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=800&q=80",
    downloads: 128,
  },
  {
    slug: "glass-horizon",
    name: "Glass Horizon",
    providerName: "Faraway Sounds",
    providerSlug: "faraway-sounds",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    downloads: 94,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
