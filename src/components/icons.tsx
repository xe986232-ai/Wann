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

/** Chevron Right — small caret used in breadcrumbs and inline navigation. */
export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );
}

/** Heart Plus — outline heart with a plus, used for "add to wishlist". */
export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </svg>
  );
}

/** Flame — used to mark "Featured" tags. */
export function FlameIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 10.941c2.333 -3.308 .167 -7.823 -1 -8.941c0 3.395 -2.235 5.299 -3.667 6.706c-1.43 1.408 -2.333 3.294 -2.333 5.588c0 3.704 3.134 6.706 7 6.706c3.866 0 7 -3.002 7 -6.706c0 -1.712 -1.232 -4.403 -2.333 -5.588c-2.084 3.353 -3.257 3.353 -4.667 2.235" />
    </svg>
  );
}

/** Download — arrow into a tray, used on the primary download button. */
export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5l5 -5" />
      <path d="M5 19h14" />
    </svg>
  );
}

/** Search — magnifying glass, used on filter/search triggers. */
export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M16.25 16.25L12.0833 12.0833M3.75 8.6111C3.75 10.1584 4.36528 11.6425 5.4592 12.7364C6.55311 13.8303 8.03716 14.4456 9.58447 14.4456C11.1318 14.4456 12.6158 13.8303 13.7097 12.7364C14.8037 11.6425 15.4189 10.1584 15.4189 8.6111C15.4189 7.06378 14.8037 5.57974 13.7097 4.48582C12.6158 3.3919 11.1318 2.77661 9.58447 2.77661C8.03716 2.77661 6.55311 3.3919 5.4592 4.48582C4.36528 5.57974 3.75 7.06378 3.75 8.6111Z"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Loop — five bars of varying height, marks loop-type samples. */
export function LoopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M18.6668 11.1666C18.463 9.7001 17.7827 8.3413 16.7307 7.2995C15.6787 6.25769 14.3133 5.59068 12.8449 5.40121C11.3765 5.21174 9.88651 5.51032 8.6045 6.25096C7.32248 6.99159 6.31954 8.1332 5.75016 9.49992M5.3335 6.16658V9.49992H8.66683M5.3335 12.8333C5.5373 14.2998 6.21761 15.6586 7.26963 16.7004C8.32166 17.7422 9.68703 18.4092 11.1554 18.5987C12.6238 18.7881 14.1138 18.4896 15.3958 17.7489C16.6778 17.0083 17.6808 15.8667 18.2502 14.5M18.6668 17.8333V14.5H15.3335"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One Shot — four vertical ticks, marks single-hit samples. */
export function OneShotIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4 12H6M8 8V16M12 5V19M16 8V16M18 12H20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Chevron Down — small caret, used on dropdown/filter triggers. */
export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Samples Tab — five bars of varying height (20x20), used on the "Samples" tab trigger. */
export function SamplesTabIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M3.33331 12.2214L3.33331 7.77691M6.66665 15.5547L6.66665 4.44358M9.99998 13.0547L9.99998 6.94358M13.3333 13.888L13.3333 6.11024M16.6666 11.388L16.6666 8.61024"
        stroke="currentColor"
        strokeWidth="1.67"
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
