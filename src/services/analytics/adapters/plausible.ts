import type { AnalyticsAdapter, AnalyticsEvent } from "@/types/analytics";

export class PlausibleAdapter implements AnalyticsAdapter {
  name = "plausible" as const;

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window !== "undefined") {
      const win = window as unknown as { plausible?: (name: string, options?: { props?: Record<string, unknown> }) => void };
      if (win.plausible) {
        win.plausible(event.name, { props: event.properties });
      }
    }
  }

  trackPageView(path: string): void {
    this.trackEvent({
      name: "pageview",
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
