import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";

import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "divyanshu. — Game Developer & Gameplay Programmer",
    template: "%s | divyanshu.",
  },
  description:
    "Portfolio of Divyanshu Kumar — Gameplay Programmer & Unity/Godot Developer. Shipped games, game jam highlights, and interactive WebGL builds.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "divyanshu.",
    title: "divyanshu. — Game Developer & Gameplay Programmer",
    description:
      "Portfolio of Divyanshu Kumar — Gameplay Programmer & Unity/Godot Developer.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#b2c7ab" },
    { media: "(prefers-color-scheme: dark)", color: "#140807" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased selection:bg-brand-primary selection:text-brand-cream`}>
        <ThemeProvider>
          {/* Global Architectural 12-Column Hairline Grid (Exact mijobello aesthetic) */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 grid grid-cols-4 md:grid-cols-12"
          >
            <span className="h-full border-l border-transparent" />
            <span className="h-full border-l border-brand-primary/15" />
            <span className="h-full border-l border-brand-primary/15" />
            <span className="h-full border-l border-brand-primary/15" />
            <span className="h-full border-l border-brand-primary/15 hidden md:block" />
            <span className="h-full border-l border-brand-primary/15 hidden md:block" />
            <span className="h-full border-l border-brand-primary/15 hidden md:block" />
            <span className="h-full border-l border-brand-primary/15 hidden md:block" />
            <span className="h-full border-l border-brand-primary/15 hidden md:block" />
            <span className="h-full border-l border-brand-primary/15 hidden md:block" />
            <span className="h-full border-l border-brand-primary/15 hidden md:block" />
            <span className="h-full border-l border-brand-primary/15 hidden md:block" />
          </div>

          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 pt-14 md:pt-16">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
