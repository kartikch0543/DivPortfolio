export type LaunchTargets = {
  browser: string | null;
  webgl: string | null;
  playStore: string | null;
  steam: string | null;
  github: string | null;
};

export type GameStatus = "released" | "in-development" | "coming-soon";

export type Game = {
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
