import Link from "next/link";
import {
  DownloadIcon,
  InstagramIcon,
  TiktokIcon,
  XSocialIcon,
  YoutubeIcon,
} from "@/components/icons";

interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const columns: FooterColumn[] = [
  {
    title: "Discover",
    links: [
      { label: "All samples", href: "/samples" },
      { label: "Sample packs", href: "/sample-packs" },
      { label: "Loops", href: "/samples/loops" },
      { label: "One-shots", href: "/samples/one-shots" },
      { label: "MIDI", href: "/midi" },
      { label: "Free samples", href: "/samples/free" },
    ],
  },
  {
    title: "Create",
    links: [
      { label: "Presets", href: "/presets" },
      { label: "Stack Composer", href: "/stack-composer" },
      { label: "SFX Generator", href: "/ai/sound-effect" },
      { label: "Songstarters", href: "/samples/songstarters" },
      { label: "Bridge VST", href: "/plugins/bridge-vst" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Genres", href: "/genres" },
      { label: "Instruments", href: "/instruments" },
      { label: "Providers", href: "/providers" },
      { label: "Collections", href: "/collections" },
      { label: "Moods", href: "/moods" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign up", href: "/signup" },
      { label: "Log in", href: "/login" },
      { label: "My collections", href: "/account/collections" },
      { label: "Likes", href: "/account/wishlist/samples" },
      { label: "My Feed", href: "/account/my-feed/samples" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Help Center", href: "https://support.rizwoow.com/", external: true },
      { label: "Terms & Conditions", href: "/page/terms-conditions" },
      { label: "Privacy Policy", href: "/page/privacy-policy" },
      { label: "How it Works", href: "/page/how-works" },
      { label: "Plans & Pricing", href: "/page/pricing" },
      { label: "Contact form", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { label: "Rizwoow on Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Rizwoow on TikTok", href: "https://tiktok.com", icon: TiktokIcon },
  { label: "Rizwoow on YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  { label: "Rizwoow on X", href: "https://x.com", icon: XSocialIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-surface px-sm pt-16 md:px-lg md:pt-24">
      {/* soft brand glow, bottom center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full opacity-60 md:h-[1000px] md:w-[1000px]"
        style={{
          background:
            "radial-gradient(circle, rgba(202,18,72,0.22) 0%, rgba(202,18,72,0.14) 25%, rgba(202,18,72,0.06) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-16">
        {/* link columns */}
        <nav
          className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6"
          aria-labelledby="footer-nav"
        >
          <h2 id="footer-nav" className="sr-only">
            Footer navigation
          </h2>

          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-5">
              <h3 className="text-sm font-medium text-foreground">{column.title}</h3>
              <ul className="flex flex-col gap-3 text-sm text-muted">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      className="transition-colors duration-300 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* desktop app download */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-medium text-foreground">Desktop App</h3>
            <div className="flex flex-col items-start gap-2.5">
              <Link
                href="/desktop-app"
                className="flex items-center gap-2 rounded-full bg-surface-2/60 px-4 py-2.5 text-xs font-medium text-foreground/90 transition-colors duration-200 hover:bg-white/10"
              >
                <DownloadIcon className="h-4 w-4" />
                Mac OS
              </Link>
              <Link
                href="/desktop-app"
                className="flex items-center gap-2 rounded-full bg-surface-2/60 px-4 py-2.5 text-xs font-medium text-foreground/90 transition-colors duration-200 hover:bg-white/10"
              >
                <DownloadIcon className="h-4 w-4" />
                Windows
              </Link>
            </div>
          </div>
        </nav>

        {/* wordmark + copyright */}
        <div className="flex flex-col items-start justify-between gap-10 border-t border-white/5 pb-10 pt-10 lg:flex-row lg:items-end">
          <div className="flex flex-col items-start gap-6">
            <div className="flex gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2/60 text-muted transition-colors duration-200 hover:bg-white/10 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <svg
              viewBox="0 0 400 150"
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-auto opacity-90 md:h-20"
            >
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
                .footer-logo-text {
                  font-family: 'Pacifico', cursive;
                  font-size: 60px;
                  fill: #ffffff;
                }
              `}</style>
              <text
                x="200"
                y="90"
                textAnchor="middle"
                className="footer-logo-text"
                transform="rotate(-4 200 90)"
              >
                Rizwoow
              </text>
            </svg>
          </div>

          <p className="text-sm text-muted">© Rizwoow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
