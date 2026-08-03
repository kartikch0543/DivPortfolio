const defaultSiteUrl = "http://localhost:3000";

function resolveSiteUrl(value: string | undefined): string {
  const candidate = value?.trim() || defaultSiteUrl;

  try {
    return new URL(candidate).origin;
  } catch {
    return defaultSiteUrl;
  }
}

export const siteConfig = {
  name: "KD Arcade",
  description: "Independent games, playful worlds, and memorable interactions.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  version: "0.2.0",
} as const;
