export interface Product {
  slug: string;
  name: string;
  tagline: string;
  providerName: string;
  providerSlug: string;
  providerImage: string;
  image: string;
  downloads: number;
  formats: string[];
  featured?: boolean;
  description: string;
}

export const products: Product[] = [
  {
    slug: "concrete-bloom",
    name: "Concrete Bloom",
    tagline: "Textured Lo-Fi Percussion & Foley",
    providerName: "Nightshade Audio",
    providerSlug: "nightshade-audio",
    providerImage:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80",
    image:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=800&q=80",
    downloads: 128,
    formats: ["Wav"],
    featured: true,
    description:
      "Concrete Bloom by Nightshade Audio is a collection of 128 samples built for hazy, lo-fi productions.\n\nDusty percussion loops sit alongside field-recorded foley, giving every hit a worn, tactile character. Layered tape hiss and subtle pitch drift keep the whole kit feeling analog and alive.\n\nThe pack features carefully prepared sounds from close-mic'd drums, cracked vinyl textures, and room-recorded ambience.\n\nAll sounds are royalty-free for commercial tracks, remixes, and DJ sets.\n\nFind that dusty, half-lit vibe with Concrete Bloom from Nightshade Audio.",
  },
  {
    slug: "glass-horizon",
    name: "Glass Horizon",
    tagline: "Ethereal Pads & Ambient Textures",
    providerName: "Faraway Sounds",
    providerSlug: "faraway-sounds",
    providerImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    downloads: 94,
    formats: ["Wav"],
    description:
      "Glass Horizon by Faraway Sounds is a collection of 94 samples designed for wide, cinematic ambient work.\n\nEvolving pads and granular textures drift slowly beneath shimmering top-end detail, perfect for scoring, sound design, or slow-burn intros.\n\nThe pack features carefully prepared sounds from bowed metal, reversed strings, and softly modulated synth layers.\n\nAll sounds are royalty-free for commercial tracks, remixes, and DJ sets.\n\nFind that wide-open, weightless vibe with Glass Horizon from Faraway Sounds.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
