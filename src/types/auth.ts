export type UserRole = "Guest" | "Player" | "Developer" | "Admin";

export type AuthProvider = "email" | "google" | "github" | "discord";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  role: UserRole;
  socials: {
    github?: string;
    twitter?: string;
    itchIo?: string;
    discord?: string;
  };
  favoriteGameSlugs: string[];
  recentlyPlayedSlugs: string[];
  createdAt: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: string;
}

export interface CloudSaveSlot {
  id: string;
  userId: string;
  gameSlug: string;
  slotName: string;
  dataJson: string;
  updatedAt: string;
  checksum?: string;
}
