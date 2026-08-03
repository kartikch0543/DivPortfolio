export type LaunchTargets = {
  browser: string | null;
  webgl: string | null;
  playStore: string | null;
  steam: string | null;
  github: string | null;
};

export type GameStatus = "released" | "in-development" | "coming-soon";

export type Game = {
  id?: string;
  subtitle?: string;
  longDescription?: string;
  version?: string;
  developer?: string;
  publisher?: string;
  tags?: string[];
  updatedDate?: string;
  browserSupport?: boolean;
  trailer?: { provider: "youtube" | "mp4" | "vimeo"; src: string; poster?: string };
  artwork?: string;
  icon?: string;
  achievements?: {
    id: string;
    title: string;
    description: string;
    icon?: string;
    reward?: string;
  }[];
  systemRequirements?: string[];
  downloadLinks?: { label: string; platform: string; url: string }[];
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  bannerImage: string;
  gallery: { src: string; alt: string }[];
  genre: string[];
  engine: string;
  platforms: string[];
  status: GameStatus;
  releaseDate: string;
  estimatedPlaytime: string;
  featured: boolean;
  launch: LaunchTargets;
  features: string[];
  controls: string[];
  developerNotes: string;
  developmentStory: string;
  versionHistory: { version: string; date: string; notes: string }[];
  knownIssues: string[];
  roadmap: string[];
  credits: { role: string; name: string }[];
};
