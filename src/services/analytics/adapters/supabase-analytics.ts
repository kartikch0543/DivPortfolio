import type { AnalyticsAdapter, AnalyticsEvent } from "@/types/analytics";

export class SupabaseAnalyticsAdapter implements AnalyticsAdapter {
  name = "supabase-analytics" as const;

  trackEvent(_event: AnalyticsEvent): void {
    if (process.env.NODE_ENV === "development" && _event) {
      // Trace event in dev mode
    }
  }

  trackPageView(path: string): void {
    this.trackEvent({
      name: "page_view",
      category: "page_view",
      properties: { path },
      timestamp: new Date().toISOString(),
    });
  }

  trackGameSession(gameSlug: string, action: "start" | "complete" | "death" | "restart"): void {
    this.trackEvent({
      name: `game_${action}`,
      category: "game_session",
      properties: { gameSlug },
      timestamp: new Date().toISOString(),
    });
  }
}
