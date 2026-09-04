import { TileWaveformIcon, EqualizerIcon } from "@/components/icons";
import {
  Box,
  Repeat,
  Zap,
  Music4,
  Users,
  Bookmark,
  Gift,
  Wand2,
  Sparkles,
  Smile,
  Wand,
  Rss,
  ToyBrick,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>> | LucideIcon;
}

export interface NavColumn {
  title: string;
  accentClass: string;
  groups: NavItem[][];
  viewAllHref?: string;
}

export const browseColumns: NavColumn[] = [
  {
    title: "Browse",
    accentClass: "text-emerald-400",
    groups: [
      [
        { label: "All samples", href: "/samples", icon: TileWaveformIcon },
        { label: "Sample packs", href: "/sample-packs", icon: Box },
        { label: "Loops", href: "/samples/loops", icon: Repeat },
        { label: "One-shots", href: "/samples/one-shots", icon: Zap },
        { label: "MIDI", href: "/midi", icon: Music4 },
      ],
      [
        { label: "Providers", href: "/providers", icon: Users },
        { label: "Collections", href: "/collections", icon: Bookmark },
        { label: "Free samples", href: "/samples/free", icon: Gift },
        { label: "Songstarters", href: "/samples/songstarters", icon: Wand2 },
        { label: "Inspired By", href: "/inspired-by", icon: Sparkles },
        { label: "Moods", href: "/moods", icon: Smile },
      ],
    ],
  },
  {
    title: "Genres",
    accentClass: "text-sky-400",
    viewAllHref: "/genres",
    groups: [
      [
        { label: "Hip-Hop", href: "/samples/category/hip-hop" },
        { label: "Trap", href: "/samples/category/trap" },
        { label: "Soul", href: "/samples/category/soul" },
        { label: "RnB", href: "/samples/category/rnb" },
        { label: "House", href: "/samples/category/house" },
        { label: "Lo-Fi", href: "/samples/category/lo-fi" },
        { label: "Drill", href: "/samples/category/drill" },
        { label: "Techno", href: "/samples/category/techno" },
        { label: "Deep Tech", href: "/samples/category/deep-tech" },
        { label: "Afro House", href: "/samples/category/afro-house" },
        { label: "Jazz", href: "/samples/category/jazz" },
      ],
    ],
  },
  {
    title: "Instruments",
    accentClass: "text-amber-400",
    viewAllHref: "/instruments",
    groups: [
      [
        { label: "Vocals", href: "/samples/instrument/vocal" },
        { label: "Drums", href: "/samples/instrument/drums" },
        { label: "808", href: "/samples/instrument/808" },
        { label: "Piano", href: "/samples/instrument/piano" },
        { label: "Keys", href: "/samples/instrument/keys" },
        { label: "Guitars", href: "/samples/instrument/guitar" },
        { label: "Synth", href: "/samples/instrument/synth" },
        { label: "Strings", href: "/samples/instrument/strings" },
        { label: "Electric piano", href: "/samples/instrument/electric-piano" },
        { label: "Organ", href: "/samples/instrument/organ" },
        { label: "Trumpet", href: "/samples/instrument/trumpet" },
      ],
    ],
  },
  {
    title: "Tools",
    accentClass: "text-fuchsia-400",
    groups: [
      [
        { label: "Stack Composer", href: "/stack-composer", icon: EqualizerIcon },
        { label: "SFX Generator", href: "/ai/sound-effect", icon: Wand },
        { label: "Desktop App", href: "/desktop-app", icon: ToyBrick },
        { label: "Bridge VST", href: "/plugins/bridge-vst", icon: Rss },
      ],
    ],
  },
];

export const presetsColumn: NavColumn = {
  title: "Presets",
  accentClass: "text-rose-400",
  viewAllHref: "/presets",
  groups: [
    [
      { label: "Serum", href: "/presets/plugin/serum" },
      { label: "Sylenth", href: "/presets/plugin/sylenth" },
      { label: "Vital", href: "/presets/plugin/vital" },
      { label: "Analog Lab", href: "/presets/plugin/analog-lab" },
      { label: "Omnisphere 3", href: "/presets/plugin/omnisphere-3" },
    ],
  ],
};
