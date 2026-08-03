import type { Game } from "@/types/game";
import type {
  DevlogPost,
  MediaAsset,
  ProfileSettings,
  PublicationStatus,
  ReleaseItem,
  RoadmapItem,
  SiteSettings,
} from "@/types/cms";
import { games as initialGames } from "@/data/games";

// In-Memory state fallback that persists across client navigation
let gamesStore: (Game & { cmsStatus?: PublicationStatus; category?: string; tags?: string[]; technologies?: string[] })[] = [
  ...initialGames.map((g) => ({
    ...g,
    cmsStatus: "published" as PublicationStatus,
    category: g.genre[0] || "Adventure",
    tags: g.genre || [],
    technologies: [g.engine],
  })),
];

let devlogsStore: DevlogPost[] = [
  {
    id: "devlog-1",
    slug: "building-tiny-together-coop-mechanics",
    title: "Building Tiny Together: Designing Co-op Physics & Movement",
    summary:
      "A deep dive into how we created responsive character physics and shared puzzle dynamics in Unity for Tiny Together.",
    content: `# Building Tiny Together

Cooperative movement in **Tiny Together** needed to feel weightless yet predictable. We iterated on multiple player controllers to land on our dual-character momentum system.

## Key Design Principles
- **Predictable collisions**: Custom raycast ground checks rather than generic rigidbodies.
- **Shared discovery**: Puzzles require synchronized actions rather than timing reflexes.
- **Visual feedback**: Particle trails indicate player momentum changes.

\`\`\`csharp
// Character jump velocity application
void ApplyJumpForce() {
    if (isGrounded) {
        rb.velocity = new Vector2(rb.velocity.x, jumpForce);
    }
}
\`\`\`

Stay tuned for our upcoming netcode update!`,
    gameSlug: "tiny-together",
    author: "Divyanshu Kumar",
    publishedAt: "2025-01-20",
    updatedAt: "2025-01-20",
    status: "published",
    tags: ["Unity", "Co-op", "Physics", "Game Design"],
    readTimeMinutes: 4,
  },
  {
    id: "devlog-2",
    slug: "ulta-he-krega-postmortem",
    title: "Ulta He Krega: Embracing Arcade Comedy in Game Loops",
    summary:
      "Reflecting on player reactions and unexpected emergent gameplay moments during the launch of Ulta He Krega.",
    content: `# Ulta He Krega Postmortem

When designing arcade games, comedy often comes from subverting player expectations right when they feel most confident.

## Lessons Learned
1. Keep session length short (under 15 mins).
2. Instant restart button reduces friction.
3. Sound design amplifies comic timing.`,
    gameSlug: "ulta-he-krega",
    author: "Divyanshu Kumar",
    publishedAt: "2025-04-15",
    updatedAt: "2025-04-15",
    status: "published",
    tags: ["Arcade", "Postmortem", "Unity"],
    readTimeMinutes: 3,
  },
];

const roadmapStore: RoadmapItem[] = [
  {
    id: "rm-1",
    gameSlug: "tiny-together",
    title: "Self-Hosted WebGL Deployment",
    description: "Migrate from external itch embed to native iframe WebGL build.",
    status: "in-progress",
    targetDate: "Q3 2026",
    targetVersion: "v1.1.0",
    category: "Platform",
  },
  {
    id: "rm-2",
    gameSlug: "tiny-together",
    title: "Gamepad & Touch Controls Support",
    description: "Add virtual touch joystick overlay for mobile web browsers.",
    status: "planned",
    targetDate: "Q4 2026",
    targetVersion: "v1.2.0",
    category: "Controls",
  },
  {
    id: "rm-3",
    gameSlug: "ulta-he-krega",
    title: "High Score Leaderboard Integration",
    description: "Global cross-platform leaderboard for arcade runs.",
    status: "planned",
    targetDate: "Q4 2026",
    targetVersion: "v1.1.0",
    category: "Features",
  },
];

const releaseStore: ReleaseItem[] = [
  {
    id: "rel-1",
    gameSlug: "tiny-together",
    version: "1.0.0",
    title: "Initial Launch",
    releaseNotes: "First official browser build released on itch.io featuring full co-op campaign.",
    releaseDate: "2025-01-18",
    downloadsCount: 1420,
    platforms: ["Browser", "Windows"],
  },
  {
    id: "rel-2",
    gameSlug: "ulta-he-krega",
    version: "1.0.0",
    title: "Arcade Release",
    releaseNotes: "Initial itch.io release with complete level set and sound design.",
    releaseDate: "2025-04-12",
    downloadsCount: 980,
    platforms: ["Browser"],
  },
];

const mediaStore: MediaAsset[] = [
  {
    id: "med-1",
    name: "Tiny Together Banner",
    type: "banner",
    url: "/images/games/tiny-together-banner.svg",
    uploadedAt: "2025-01-18",
    gameSlug: "tiny-together",
  },
  {
    id: "med-2",
    name: "Ulta He Krega Cover",
    type: "image",
    url: "/images/games/ulta-he-krega-cover.svg",
    uploadedAt: "2025-04-12",
    gameSlug: "ulta-he-krega",
  },
];

let siteSettingsStore: SiteSettings = {
  studioName: "KD Arcade",
  tagline: "Premium Indie Game Studio & Publishing Platform",
  description:
    "Created by Divyanshu Kumar. Discover, play browser games, track devlogs, and follow future releases.",
  canonicalUrl: "https://kdarcade.com",
  contactEmail: "divyanshu@kdarcade.com",
  maintenanceMode: false,
  featuredGameSlug: "tiny-together",
  socials: {
    github: "https://github.com/kdivyanshu",
    twitter: "https://twitter.com/kdivyanshu",
    itchIo: "https://kdivyanshu.itch.io",
    discord: "https://discord.gg/kdarcade",
  },
};

let profileSettingsStore: ProfileSettings = {
  name: "Divyanshu Kumar",
  username: "kdivyanshu",
  bio: "Indie Game Developer & Creator of KD Arcade. Building playful browser, mobile, and desktop experiences.",
  avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Divyanshu",
  email: "divyanshu@kdarcade.com",
  role: "Admin",
  website: "https://kdarcade.com",
  socials: {
    github: "https://github.com/kdivyanshu",
    twitter: "https://twitter.com/kdivyanshu",
    itchIo: "https://kdivyanshu.itch.io",
    discord: "https://discord.gg/kdarcade",
  },
  favoriteGameSlugs: ["tiny-together", "ulta-he-krega"],
  recentlyPlayedSlugs: ["tiny-together"],
};

export class CmsService {
  // Games CMS operations
  static async getGames(): Promise<(Game & { cmsStatus?: PublicationStatus; category?: string; tags?: string[]; technologies?: string[] })[]> {
    return [...gamesStore];
  }

  static async getGameBySlug(slug: string) {
    return gamesStore.find((g) => g.slug === slug) || null;
  }

  static async saveGame(game: Game & { cmsStatus?: PublicationStatus; category?: string; tags?: string[]; technologies?: string[] }) {
    const existingIndex = gamesStore.findIndex((g) => g.slug === game.slug);
    if (existingIndex >= 0) {
      gamesStore[existingIndex] = { ...gamesStore[existingIndex], ...game };
    } else {
      gamesStore.push(game);
    }
    return game;
  }

  static async deleteGame(slug: string) {
    gamesStore = gamesStore.filter((g) => g.slug !== slug);
    return true;
  }

  // Devlogs operations
  static async getDevlogs(): Promise<DevlogPost[]> {
    return [...devlogsStore];
  }

  static async getDevlogBySlug(slug: string): Promise<DevlogPost | null> {
    return devlogsStore.find((d) => d.slug === slug) || null;
  }

  static async saveDevlog(devlog: Partial<DevlogPost> & { title: string; content: string }) {
    const id = devlog.id || `devlog-${Date.now()}`;
    const slug = devlog.slug || devlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existingIndex = devlogsStore.findIndex((d) => d.id === id || d.slug === slug);

    const fullDevlog: DevlogPost = {
      id,
      slug,
      title: devlog.title,
      summary: devlog.summary || devlog.content.slice(0, 120),
      content: devlog.content,
      gameSlug: devlog.gameSlug,
      author: devlog.author || "Divyanshu Kumar",
      publishedAt: devlog.publishedAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      status: devlog.status || "draft",
      tags: devlog.tags || ["Game Dev"],
      readTimeMinutes: Math.max(1, Math.ceil(devlog.content.split(" ").length / 200)),
    };

    if (existingIndex >= 0) {
      devlogsStore[existingIndex] = fullDevlog;
    } else {
      devlogsStore.unshift(fullDevlog);
    }
    return fullDevlog;
  }

  static async deleteDevlog(id: string) {
    devlogsStore = devlogsStore.filter((d) => d.id !== id);
    return true;
  }

  // Roadmap & Release Manager
  static async getRoadmap(): Promise<RoadmapItem[]> {
    return [...roadmapStore];
  }

  static async saveRoadmapItem(item: RoadmapItem) {
    const idx = roadmapStore.findIndex((r) => r.id === item.id);
    if (idx >= 0) roadmapStore[idx] = item;
    else roadmapStore.push(item);
    return item;
  }

  static async getReleases(): Promise<ReleaseItem[]> {
    return [...releaseStore];
  }

  static async saveReleaseItem(item: ReleaseItem) {
    const idx = releaseStore.findIndex((r) => r.id === item.id);
    if (idx >= 0) releaseStore[idx] = item;
    else releaseStore.push(item);
    return item;
  }

  // Media Operations
  static async getMedia(): Promise<MediaAsset[]> {
    return [...mediaStore];
  }

  static async addMedia(asset: Omit<MediaAsset, "id" | "uploadedAt">) {
    const newAsset: MediaAsset = {
      ...asset,
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    mediaStore.unshift(newAsset);
    return newAsset;
  }

  // Settings
  static async getSiteSettings(): Promise<SiteSettings> {
    return { ...siteSettingsStore };
  }

  static async saveSiteSettings(settings: SiteSettings) {
    siteSettingsStore = { ...settings };
    return siteSettingsStore;
  }

  static async getProfileSettings(): Promise<ProfileSettings> {
    return { ...profileSettingsStore };
  }

  static async saveProfileSettings(settings: ProfileSettings) {
    profileSettingsStore = { ...settings };
    return profileSettingsStore;
  }
}
