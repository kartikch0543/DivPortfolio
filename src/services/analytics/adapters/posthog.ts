import type { AnalyticsAdapter, AnalyticsEvent } from "@/types/analytics";

export class PostHogAdapter implements AnalyticsAdapter {
  name = "posthog" as const;

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window !== "undefined") {
      const win = window as unknown as { posthog?: { capture: (name: string, props?: Record<string, unknown>) => void } };
      if (win.posthog) {
        win.posthog.capture(event.name, event.properties);
      }
    }
  }

  trackPageView(path: string): void {
    this.trackEvent({
      name: "$pageview",
      category: "page_view",
      properties: { current_url: path },
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
