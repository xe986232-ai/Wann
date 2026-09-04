export interface Sample {
  id: string;
  name: string;
  type: "loop" | "one-shot";
  tags: string[];
  bpm?: number;
  key?: string;
  duration: string;
}

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
  samples?: Sample[];
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
    samples: [
      {
        id: "cb-01",
        name: "Concrete_82bpm_Drum_Loop_Kick_Hat_Heavy_01.wav",
        type: "loop",
        tags: ["Drums", "Kick", "Lo-Fi"],
        bpm: 82,
        duration: "0:23",
      },
      {
        id: "cb-02",
        name: "Concrete_One-Shot_Kick_Dusty_02.wav",
        type: "one-shot",
        tags: ["Drums", "Kick"],
        duration: "0:01",
      },
      {
        id: "cb-03",
        name: "Concrete_80bpm_Drum_Loop_Kick_Hat_Slow_03.wav",
        type: "loop",
        tags: ["Drums", "Kick", "Lo-Fi"],
        bpm: 80,
        duration: "0:24",
      },
      {
        id: "cb-04",
        name: "Concrete_One-Shot_Snare_Cracked_04.wav",
        type: "one-shot",
        tags: ["Drums", "Snare"],
        duration: "0:01",
      },
      {
        id: "cb-05",
        name: "Concrete_One-Shot_Clap_Worn_05.wav",
        type: "one-shot",
        tags: ["Drums", "Clap"],
        duration: "0:01",
      },
      {
        id: "cb-06",
        name: "Concrete_Bass_One-Shot_E_Synth_Warm_06.wav",
        type: "one-shot",
        tags: ["Synth", "Bass"],
        key: "E",
        duration: "0:02",
      },
      {
        id: "cb-07",
        name: "Concrete_84bpm_Drum_Loop_Full_Kit_07.wav",
        type: "loop",
        tags: ["Drums", "Full Drums"],
        bpm: 84,
        duration: "0:22",
      },
      {
        id: "cb-08",
        name: "Concrete_One-Shot_Snare_Room_08.wav",
        type: "one-shot",
        tags: ["Drums", "Snare"],
        duration: "0:01",
      },
    ],
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
