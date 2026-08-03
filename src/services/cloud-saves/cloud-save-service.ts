import type { CloudSaveSlot } from "@/types/auth";

const cloudSavesStore: CloudSaveSlot[] = [
  {
    id: "cs-1",
    userId: "usr-admin-1",
    gameSlug: "tiny-together",
    slotName: "AutoSave_Level3",
    dataJson: JSON.stringify({ level: 3, score: 1450, inventory: ["key_blue", "map_fragment"] }),
    updatedAt: "2025-01-22T14:30:00Z",
    checksum: "sha256-a8f9021b",
  },
  {
    id: "cs-2",
    userId: "usr-admin-1",
    gameSlug: "ulta-he-krega",
    slotName: "HighScores_ArcadeMode",
    dataJson: JSON.stringify({ maxCombo: 42, totalDeaths: 12, unlockedSkins: ["retro_neon"] }),
    updatedAt: "2025-04-18T09:15:00Z",
    checksum: "sha256-f49a01cc",
  },
];

export class CloudSaveService {
  /**
   * Fetch all cloud save slots for a user
   */
  static async getUserSaves(userId: string): Promise<CloudSaveSlot[]> {
    return cloudSavesStore.filter((cs) => cs.userId === userId);
  }

  /**
   * Save game progress to cloud slot (Supabase DB adapter ready)
   */
  static async saveSlot(slot: Omit<CloudSaveSlot, "id" | "updatedAt">): Promise<CloudSaveSlot> {
    const existingIndex = cloudSavesStore.findIndex(
      (cs) => cs.userId === slot.userId && cs.gameSlug === slot.gameSlug && cs.slotName === slot.slotName
    );

    const newSlot: CloudSaveSlot = {
      ...slot,
      id: existingIndex >= 0 ? cloudSavesStore[existingIndex].id : `cs-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      cloudSavesStore[existingIndex] = newSlot;
    } else {
      cloudSavesStore.push(newSlot);
    }
    return newSlot;
  }
}
