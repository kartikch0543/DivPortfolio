import type { AuthUser, AuthSession, AuthProvider, UserRole } from "@/types/auth";

const DEFAULT_ADMIN_USER: AuthUser = {
  id: "usr-admin-1",
  email: "divyanshu@kdarcade.com",
  name: "Divyanshu Kumar",
  username: "kdivyanshu",
  avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Divyanshu",
  bio: "Indie Game Developer & Creator of KD Arcade. Building browser, mobile, and desktop experiences.",
  role: "Admin",
  socials: {
    github: "https://github.com/kdivyanshu",
    twitter: "https://twitter.com/kdivyanshu",
    itchIo: "https://kdivyanshu.itch.io",
    discord: "https://discord.gg/kdarcade",
  },
  favoriteGameSlugs: ["tiny-together", "ulta-he-krega"],
  recentlyPlayedSlugs: ["tiny-together", "ulta-he-krega"],
  createdAt: "2025-01-01",
};

let currentSession: AuthSession | null = {
  user: DEFAULT_ADMIN_USER,
  token: "mock-jwt-token-admin-session",
  expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
};

export class AuthService {
  /**
   * Get currently active auth session
   */
  static async getSession(): Promise<AuthSession | null> {
    return currentSession ? { ...currentSession } : null;
  }

  /**
   * Get currently logged-in user or guest user object
   */
  static async getCurrentUser(): Promise<AuthUser> {
    if (currentSession?.user) {
      return currentSession.user;
    }
    return {
      id: "guest-user",
      email: "guest@kdarcade.com",
      name: "Guest Player",
      username: "guest",
      avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Guest",
      bio: "Browsing KD Arcade as Guest",
      role: "Guest",
      socials: {},
      favoriteGameSlugs: [],
      recentlyPlayedSlugs: [],
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Email / Password Sign In (Supabase compatible adapter)
   */
  static async signInWithEmail(email: string): Promise<AuthSession> {
    const user: AuthUser = {
      ...DEFAULT_ADMIN_USER,
      email,
      role: email.includes("admin") || email.includes("divyanshu") ? "Admin" : "Player",
    };
    currentSession = {
      user,
      token: `jwt-${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    };
    return currentSession;
  }

  /**
   * Social OAuth Sign In (Google, GitHub, Discord)
   */
  static async signInWithOAuth(provider: AuthProvider): Promise<AuthSession> {
    const user: AuthUser = {
      id: `usr-${provider}-${Date.now()}`,
      email: `player@${provider}.com`,
      name: `${provider.toUpperCase()} Gamer`,
      username: `${provider}_player`,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${provider}`,
      bio: `Signed in via ${provider}`,
      role: "Player",
      socials: {},
      favoriteGameSlugs: ["tiny-together"],
      recentlyPlayedSlugs: ["tiny-together"],
      createdAt: new Date().toISOString(),
    };
    currentSession = {
      user,
      token: `oauth-jwt-${provider}-${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    };
    return currentSession;
  }

  /**
   * Sign Out
   */
  static async signOut(): Promise<void> {
    currentSession = null;
  }

  /**
   * Role validation helpers
   */
  static hasRole(user: AuthUser, requiredRole: UserRole): boolean {
    const hierarchy: Record<UserRole, number> = {
      Guest: 0,
      Player: 1,
      Developer: 2,
      Admin: 3,
    };
    return hierarchy[user.role] >= hierarchy[requiredRole];
  }

  static canAccessCms(user: AuthUser): boolean {
    return user.role === "Developer" || user.role === "Admin";
  }
}
