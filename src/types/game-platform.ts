export type GameRuntime =
  "external" | "iframe" | "unity-webgl" | "html5" | "godot" | "download";
export type SupportedPlatform =
  | "browser"
  | "windows"
  | "linux"
  | "macos"
  | "android"
  | "ios"
  | "steam"
  | "itch"
  | "github"
  | "console";
export type RoadmapStatus = "completed" | "in-progress" | "planned";

export type BrowserBuild = {
  runtime: GameRuntime;
  url: string | null;
  loadingTips?: string[];
  estimatedWait?: string;
};
export type ExternalLinks = {
  itch?: string | null;
  steam?: string | null;
  github?: string | null;
  playStore?: string | null;
};
export type GameDownload = { label: string; platform: SupportedPlatform; url: string };
export type AchievementDefinition = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  reward?: string;
};
export type SaveAdapter = {
  key: string;
  load: <T>() => T | null;
  save: <T>(value: T) => void;
  clear: () => void;
};
export type GameStatistics = {
  playCount?: number;
  averagePlayTimeMinutes?: number;
  completionRate?: number;
  favorites?: number;
  rating?: number;
};
export type PlatformGameFields = {
  id: string;
  subtitle: string;
  longDescription: string;
  version: string;
  developer: string;
  publisher: string;
  tags: string[];
  updatedDate: string;
  browserSupport: boolean;
  screenshots: { src: string; alt: string }[];
  trailer?: { provider: "youtube" | "mp4" | "vimeo"; src: string; poster?: string };
  artwork: string;
  icon: string;
  achievements: AchievementDefinition[];
  systemRequirements: string[];
  browserBuild: BrowserBuild;
  externalLinks: ExternalLinks;
  downloadLinks: GameDownload[];
  roadmapItems: { title: string; status: RoadmapStatus }[];
  statistics?: GameStatistics;
};
