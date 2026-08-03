import type { AnalyticsAdapter, AnalyticsEvent } from "@/types/analytics";

export class GoogleAnalyticsAdapter implements AnalyticsAdapter {
  name = "google-analytics" as const;

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window !== "undefined") {
      const win = window as unknown as { gtag?: (type: string, name: string, options?: Record<string, unknown>) => void };
      if (win.gtag) {
        win.gtag("event", event.name, event.properties);
      }
    }
  }

  trackPageView(path: string): void {
    if (typeof window !== "undefined") {
      const win = window as unknown as { gtag?: (type: string, id: string, options?: Record<string, unknown>) => void };
      if (win.gtag) {
        win.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "GA-MEASUREMENT-ID", {
          page_path: path,
        });
      }
    }
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
