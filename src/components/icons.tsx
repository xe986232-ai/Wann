import { SVGProps } from "react";

/**
 * Icon set sourced from tech-stack-breakdown.md — original SVG code,
 * recolored via currentColor / project design tokens (no external icon
 * packs used for these specific icons).
 */

/** Section Arrow — points left by default; rotate 180deg for "next". */
export function SectionArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 12H19M5 12L11 18M5 12L11 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tile Waveform — mini waveform preview, used on product/sample cards. */
export function TileWaveformIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.66669 9.77865L2.66669 6.22309M5.33335 12.4453L5.33335 3.55642M8.00002 10.4453L8.00002 5.55642M10.6667 11.112L10.6667 4.88976M13.3334 9.11198L13.3334 6.88976"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Play Button (Filled) — solid triangle, used to trigger audio playback. */
export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M29.1261 24.0888C28.1569 23.4925 26.9092 24.1897 26.9092 25.3276V39.5155C26.9092 40.6535 28.1569 41.3507 29.126 40.7543L40.6537 33.6604C41.5767 33.0924 41.5767 31.7508 40.6537 31.1828L29.1261 24.0888Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Equalizer / Sound Bars — two rounded vertical bars; doubles as pause icon. */
export function EqualizerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"
      />
    </svg>
  );
}

/** Settings / Adjust (Wave + Circle) — filters, preferences. */
export function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M22.1667 19.8344C23.2496 19.8344 24.2882 19.4042 25.054 18.6384C25.8198 17.8726 26.25 16.834 26.25 15.751C26.25 14.6681 25.8198 13.6295 25.054 12.8637C24.2882 12.0979 23.2496 11.6677 22.1667 11.6677H21C21.1702 10.9093 21.1728 10.1282 21.0076 9.3689C20.8424 8.60962 20.5127 7.88705 20.0372 7.24246C19.5617 6.59786 18.9499 6.04387 18.2365 5.6121C17.5231 5.18033 16.7223 4.87925 15.8796 4.72604C15.037 4.57283 14.169 4.5705 13.3254 4.71917C12.4817 4.86785 11.6789 5.16462 10.9627 5.59254C9.51621 6.45677 8.51045 7.80275 8.16665 9.33438C6.92293 9.28456 5.69978 9.64984 4.70664 10.3677C3.71349 11.0855 3.01212 12.1113 2.72261 13.2693C2.4331 14.4274 2.57346 15.6457 3.11965 16.7156C3.66585 17.7856 4.58392 18.6406 5.71665 19.1344M14 14.0008V24.5008M17.5 21.0008L14 24.5008L10.5 21.0008"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Menu / List — 3 horizontal lines, used for nav menu / row options. */
export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5.33337 7H18.6667M5.33337 12H18.6667M5.33337 17H18.6667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
