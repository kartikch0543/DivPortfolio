export interface DownloadItem {
  id: string;
  platform: "Windows" | "macOS" | "Linux" | "Android" | "Steam" | "itch.io" | "GitHub";
  label: string;
  url: string;
  fileSize?: string;
  version: string;
  checksum?: string;
  iconName: string;
}

export interface ReleaseNoteItem {
  version: string;
  releaseDate: string;
  title: string;
  changelog: string[];
  downloadUrl?: string;
}

export interface SystemRequirements {
  minimum: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  recommended: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface DlcItem {
  id: string;
  gameSlug: string;
  title: string;
  tagline: string;
  price: string;
  coverImage: string;
  releaseDate: string;
  status: "available" | "coming-soon";
}

export interface AchievementItem {
  id: string;
  gameSlug: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  rarityPercentage: number;
}
