import type {
  DownloadItem,
  ReleaseNoteItem,
  SystemRequirements,
  DlcItem,
  AchievementItem,
} from "@/types/publishing";

const downloadsStore: Record<string, DownloadItem[]> = {
  "tiny-together": [
    {
      id: "dl-tt-win",
      platform: "Windows",
      label: "Windows Portable (.zip)",
      url: "https://github.com/kartikch0543/DivPortfolio/releases/download/v1.0.0/TinyTogether-Windows-x64.zip",
      fileSize: "48.2 MB",
      version: "v1.0.0",
      checksum: "sha256: 8f9a2b1...",
      iconName: "Monitor",
    },
    {
      id: "dl-tt-apk",
      platform: "Android",
      label: "Android Mobile (.apk)",
      url: "https://github.com/kartikch0543/DivPortfolio/releases/download/v1.0.0/TinyTogether-v1.0.0.apk",
      fileSize: "32.1 MB",
      version: "v1.0.0",
      checksum: "sha256: e4c2d1...",
      iconName: "Smartphone",
    },
    {
      id: "dl-tt-steam",
      platform: "Steam",
      label: "Steam Store Page",
      url: "https://store.steampowered.com/app/1234560/Tiny_Together",
      version: "Store Link",
      iconName: "ExternalLink",
    },
    {
      id: "dl-tt-itch",
      platform: "itch.io",
      label: "itch.io Arcade Page",
      url: "https://kdivyanshu.itch.io/tiny-together",
      version: "Store Link",
      iconName: "ExternalLink",
    },
    {
      id: "dl-tt-gh",
      platform: "GitHub",
      label: "GitHub Release Tags",
      url: "https://github.com/kartikch0543/DivPortfolio/releases",
      version: "v1.0.0",
      iconName: "Github",
    },
  ],
  "ulta-he-krega": [
    {
      id: "dl-uhk-win",
      platform: "Windows",
      label: "Windows 64-bit Exe",
      url: "https://github.com/kartikch0543/DivPortfolio/releases/download/v1.1.0/UltaHeKrega-Setup.exe",
      fileSize: "62.5 MB",
      version: "v1.1.0",
      checksum: "sha256: 7a1d3f...",
      iconName: "Monitor",
    },
    {
      id: "dl-uhk-mac",
      platform: "macOS",
      label: "macOS Apple Silicon (.dmg)",
      url: "https://github.com/kartikch0543/DivPortfolio/releases/download/v1.1.0/UltaHeKrega-macOS.dmg",
      fileSize: "58.0 MB",
      version: "v1.1.0",
      checksum: "sha256: 9b2c4a...",
      iconName: "Monitor",
    },
    {
      id: "dl-uhk-linux",
      platform: "Linux",
      label: "Linux AppImage",
      url: "https://github.com/kartikch0543/DivPortfolio/releases/download/v1.1.0/UltaHeKrega.AppImage",
      fileSize: "55.4 MB",
      version: "v1.1.0",
      checksum: "sha256: 3c5e8f...",
      iconName: "Monitor",
    },
    {
      id: "dl-uhk-itch",
      platform: "itch.io",
      label: "itch.io Game Page",
      url: "https://kdivyanshu.itch.io/ulta-he-krega",
      version: "Store Link",
      iconName: "ExternalLink",
    },
  ],
};

const releaseNotesStore: Record<string, ReleaseNoteItem[]> = {
  "tiny-together": [
    {
      version: "v1.0.0",
      releaseDate: "2025-01-15",
      title: "Initial Launch & WebGL Release",
      changelog: [
        "Added 12 cooperative puzzle levels",
        "Full keyboard and gamepad controller support",
        "Integrated high score cloud saves",
        "Added smooth particle physics for character movement",
      ],
    },
  ],
  "ulta-he-krega": [
    {
      version: "v1.1.0",
      releaseDate: "2025-04-10",
      title: "Chaos Mode & Control Inversion",
      changelog: [
        "Added Chaos Run mode with inverted gravity",
        "Optimized WebGL memory allocation to under 120MB",
        "Fixed hitboxes on level 3 moving platforms",
      ],
    },
  ],
};

const systemRequirementsStore: Record<string, SystemRequirements> = {
  "tiny-together": {
    minimum: {
      os: "Windows 10 / macOS 11 / Ubuntu 20.04",
      processor: "Dual Core 2.0 GHz",
      memory: "2 GB RAM",
      graphics: "Intel HD Graphics 4000 / WebGL 2.0",
      storage: "100 MB available space",
    },
    recommended: {
      os: "Windows 11 64-bit",
      processor: "Quad Core 2.8 GHz",
      memory: "4 GB RAM",
      graphics: "NVIDIA GeForce GTX 750 / AMD Radeon R7",
      storage: "250 MB available space",
    },
  },
  "ulta-he-krega": {
    minimum: {
      os: "Windows 10 64-bit",
      processor: "Core i3 2.5 GHz",
      memory: "2 GB RAM",
      graphics: "Integrated WebGL 2.0 GPU",
      storage: "150 MB available space",
    },
    recommended: {
      os: "Windows 11 64-bit",
      processor: "Core i5 3.0 GHz",
      memory: "4 GB RAM",
      graphics: "NVIDIA GTX 1050",
      storage: "300 MB available space",
    },
  },
};

const dlcStore: Record<string, DlcItem[]> = {
  "tiny-together": [
    {
      id: "dlc-tt-1",
      gameSlug: "tiny-together",
      title: "Expansion Pack: Cosmic Co-op",
      tagline: "8 zero-gravity puzzle levels in outer space!",
      price: "FREE",
      coverImage: "/images/games/tiny-together-cover.svg",
      releaseDate: "Coming Q3 2025",
      status: "coming-soon",
    },
  ],
  "ulta-he-krega": [
    {
      id: "dlc-uhk-1",
      gameSlug: "ulta-he-krega",
      title: "Skin Pack: Retro Arcade",
      tagline: "Unlock 8-bit neon character skins and synthwave audio track.",
      price: "$0.99",
      coverImage: "/images/games/ulta-he-krega-cover.svg",
      releaseDate: "2025-05-01",
      status: "available",
    },
  ],
};

const achievementsStore: Record<string, AchievementItem[]> = {
  "tiny-together": [
    {
      id: "ach-tt-1",
      gameSlug: "tiny-together",
      title: "First Step Together",
      description: "Complete level 1 with a partner.",
      icon: "🌟",
      isUnlocked: true,
      unlockedAt: "2025-01-20",
      rarityPercentage: 92.4,
    },
    {
      id: "ach-tt-2",
      gameSlug: "tiny-together",
      title: "Synchronized Jumpers",
      description: "Perform 10 simultaneous ledge jumps in a single run.",
      icon: "⚡",
      isUnlocked: true,
      unlockedAt: "2025-01-22",
      rarityPercentage: 48.1,
    },
    {
      id: "ach-tt-3",
      gameSlug: "tiny-together",
      title: "Perfect Synergy",
      description: "Clear all levels without losing a single life.",
      icon: "🏆",
      isUnlocked: false,
      rarityPercentage: 12.3,
    },
  ],
  "ulta-he-krega": [
    {
      id: "ach-uhk-1",
      gameSlug: "ulta-he-krega",
      title: "Control Master",
      description: "Adapt to 3 control swaps in 30 seconds.",
      icon: "🌀",
      isUnlocked: true,
      unlockedAt: "2025-04-15",
      rarityPercentage: 65.0,
    },
    {
      id: "ach-uhk-2",
      gameSlug: "ulta-he-krega",
      title: "Chaos Survivor",
      description: "Finish Chaos Run without restarting.",
      icon: "🔥",
      isUnlocked: false,
      rarityPercentage: 8.7,
    },
  ],
};

export class PublishingService {
  static async getDownloads(gameSlug: string): Promise<DownloadItem[]> {
    return downloadsStore[gameSlug] || [];
  }

  static async getReleaseNotes(gameSlug: string): Promise<ReleaseNoteItem[]> {
    return releaseNotesStore[gameSlug] || [];
  }

  static async getSystemRequirements(gameSlug: string): Promise<SystemRequirements> {
    return (
      systemRequirementsStore[gameSlug] || {
        minimum: { os: "Any OS", processor: "Any CPU", memory: "1 GB", graphics: "WebGL", storage: "50 MB" },
        recommended: { os: "Modern OS", processor: "Dual Core", memory: "2 GB", graphics: "Dedicated GPU", storage: "100 MB" },
      }
    );
  }

  static async getDlcs(gameSlug: string): Promise<DlcItem[]> {
    return dlcStore[gameSlug] || [];
  }

  static async getAchievements(gameSlug: string): Promise<AchievementItem[]> {
    return achievementsStore[gameSlug] || [];
  }
}
