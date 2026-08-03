import type { AnalyticsAdapter, AnalyticsEvent, DeveloperMetrics, GameTelemetry } from "@/types/analytics";
import { GoogleAnalyticsAdapter } from "./adapters/google-analytics";
import { PlausibleAdapter } from "./adapters/plausible";
import { PostHogAdapter } from "./adapters/posthog";
import { SupabaseAnalyticsAdapter } from "./adapters/supabase-analytics";

const adapters: AnalyticsAdapter[] = [
  new GoogleAnalyticsAdapter(),
  new PlausibleAdapter(),
  new PostHogAdapter(),
  new SupabaseAnalyticsAdapter(),
];

const mockMetricsStore: DeveloperMetrics = {
  totalVisitors: 12450,
  totalGamePlays: 8920,
  totalDownloads: 1420,
  totalPlayTimeMinutes: 42150,
  retentionRate: 72.4,
  topPlatforms: [
    { platform: "Browser", percentage: 58.2 },
    { platform: "Windows", percentage: 24.5 },
    { platform: "Android", percentage: 12.3 },
    { platform: "macOS / Linux", percentage: 5.0 },
  ],
  topCountries: [
    { country: "United States", flag: "🇺🇸", count: 4120 },
    { country: "India", flag: "🇮🇳", count: 3250 },
    { country: "Germany", flag: "🇩🇪", count: 1840 },
    { country: "United Kingdom", flag: "🇬🇧", count: 1410 },
    { country: "Japan", flag: "🇯🇵", count: 980 },
  ],
  popularGames: [
    { slug: "tiny-together", title: "Tiny Together", plays: 5420 },
    { slug: "ulta-he-krega", title: "Ulta He Krega", plays: 3500 },
  ],
  mostViewedPages: [
    { path: "/", views: 18420 },
    { path: "/games", views: 12100 },
    { path: "/games/tiny-together", views: 9840 },
    { path: "/games/ulta-he-krega", views: 6720 },
    { path: "/devlog", views: 4210 },
  ],
};

const mockGameTelemetryStore: Record<string, GameTelemetry> = {
  "tiny-together": {
    gameSlug: "tiny-together",
    totalSessions: 5420,
    completionRate: 78.4,
    totalDeaths: 1420,
    totalRestarts: 840,
    averageProgressPercentage: 86.2,
    activePlayersNow: 14,
  },
  "ulta-he-krega": {
    gameSlug: "ulta-he-krega",
    totalSessions: 3500,
    completionRate: 64.8,
    totalDeaths: 3120,
    totalRestarts: 1980,
    averageProgressPercentage: 72.1,
    activePlayersNow: 8,
  },
};

export class AnalyticsService {
  /**
   * Dispatch custom analytics event to all registered adapters
   */
  static trackEvent(event: AnalyticsEvent): void {
    adapters.forEach((adapter) => {
      try {
        adapter.trackEvent(event);
      } catch (err) {
        console.error(`Analytics adapter ${adapter.name} error:`, err);
      }
    });
  }

  /**
   * Track page view across all adapters
   */
  static trackPageView(path: string): void {
    adapters.forEach((adapter) => {
      try {
        adapter.trackPageView(path);
      } catch (err) {
        console.error(`Analytics adapter ${adapter.name} error:`, err);
      }
    });
  }

  /**
   * Track game telemetry session action
   */
  static trackGameSession(gameSlug: string, action: "start" | "complete" | "death" | "restart"): void {
    adapters.forEach((adapter) => {
      try {
        adapter.trackGameSession(gameSlug, action);
      } catch (err) {
        console.error(`Analytics adapter ${adapter.name} error:`, err);
      }
    });
  }

  /**
   * Get Developer Overview Metrics for dashboard
   */
  static async getDeveloperMetrics(): Promise<DeveloperMetrics> {
    return { ...mockMetricsStore };
  }

  /**
   * Get Telemetry metrics for specific game
   */
  static async getGameTelemetry(gameSlug: string): Promise<GameTelemetry> {
    return (
      mockGameTelemetryStore[gameSlug] || {
        gameSlug,
        totalSessions: 0,
        completionRate: 0,
        totalDeaths: 0,
        totalRestarts: 0,
        averageProgressPercentage: 0,
        activePlayersNow: 0,
      }
    );
  }
}
