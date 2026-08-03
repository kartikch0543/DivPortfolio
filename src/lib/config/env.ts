const fallbackSiteUrl = "http://localhost:3000";

export function getPublicSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL): string {
  try {
    return new URL(value?.trim() || fallbackSiteUrl).origin;
  } catch {
    return fallbackSiteUrl;
  }
}
