export interface AnalyticsEvent {
  name: string;
  category: "page_view" | "game_session" | "download" | "engagement" | "error";
  properties?: Record<string, string | number | boolean>;
  timestamp: string;
}

export interface DeveloperMetrics {
  totalVisitors: number;
  totalGamePlays: number;
  totalDownloads: number;
  totalPlayTimeMinutes: number;
  retentionRate: number; // Percentage e.g. 68.5
  topPlatforms: { platform: string; percentage: number }[];
  topCountries: { country: string; flag: string; count: number }[];
  popularGames: { slug: string; title: string; plays: number }[];
  mostViewedPages: { path: string; views: number }[];
}

export interface GameTelemetry {
  gameSlug: string;
  totalSessions: number;
  completionRate: number; // e.g. 74.2%
  totalDeaths: number;
  totalRestarts: number;
  averageProgressPercentage: number;
  activePlayersNow: number;
}

export interface AnalyticsAdapter {
  name: "google-analytics" | "plausible" | "posthog" | "supabase-analytics" | "mock";
  init?: () => void;
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (path: string) => void;
  trackGameSession: (gameSlug: string, action: "start" | "complete" | "death" | "restart") => void;
}
