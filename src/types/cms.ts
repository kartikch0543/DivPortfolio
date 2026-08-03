export type PublicationStatus = "draft" | "published" | "archived";

export interface DevlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Markdown / MDX
  gameSlug?: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: PublicationStatus;
  tags: string[];
  coverImage?: string;
  readTimeMinutes?: number;
}

export interface RoadmapItem {
  id: string;
  gameSlug: string;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  targetDate?: string;
  targetVersion?: string;
  category?: string;
}

export interface ReleaseItem {
  id: string;
  gameSlug: string;
  version: string;
  title: string;
  releaseNotes: string;
  releaseDate: string;
  downloadsCount?: number;
  platforms: string[];
}

export interface MediaAsset {
  id: string;
  name: string;
  type: "image" | "banner" | "screenshot" | "video";
  url: string;
  thumbnailUrl?: string;
  sizeBytes?: number;
  uploadedAt: string;
  gameSlug?: string;
}

export interface SiteSettings {
  studioName: string;
  tagline: string;
  description: string;
  canonicalUrl: string;
  contactEmail: string;
  maintenanceMode: boolean;
  featuredGameSlug: string;
  socials: {
    github?: string;
    twitter?: string;
    itchIo?: string;
    discord?: string;
    youtube?: string;
  };
}

export interface ProfileSettings {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  email: string;
  role: "Guest" | "Player" | "Developer" | "Admin";
  website?: string;
  socials: {
    github?: string;
    twitter?: string;
    itchIo?: string;
    discord?: string;
  };
  favoriteGameSlugs: string[];
  recentlyPlayedSlugs: string[];
}
