import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/layout/page-transition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sondrift — Audio marketplace",
  description: "Sample packs, presets and MIDI for producers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-sans">
        {/* Navbar lives in the persistent layout (not inside the animated
            page transition), so it stays locked in place — only the
            content below it moves during page transitions. */}
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
