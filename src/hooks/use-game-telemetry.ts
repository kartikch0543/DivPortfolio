"use client";

import { useEffect, useCallback } from "react";
import { AnalyticsService } from "@/services/analytics/analytics-service";

export function useGameTelemetry(gameSlug: string) {
  useEffect(() => {
    // Record session start on mount
    AnalyticsService.trackGameSession(gameSlug, "start");
  }, [gameSlug]);

  const recordCompletion = useCallback(() => {
    AnalyticsService.trackGameSession(gameSlug, "complete");
  }, [gameSlug]);

  const recordDeath = useCallback(() => {
    AnalyticsService.trackGameSession(gameSlug, "death");
  }, [gameSlug]);

  const recordRestart = useCallback(() => {
    AnalyticsService.trackGameSession(gameSlug, "restart");
  }, [gameSlug]);

  const recordProgress = useCallback(
    (percentage: number) => {
      AnalyticsService.trackEvent({
        name: "game_progress",
        category: "game_session",
        properties: { gameSlug, progress: percentage },
        timestamp: new Date().toISOString(),
      });
    },
    [gameSlug]
  );

  return { recordCompletion, recordDeath, recordRestart, recordProgress };
}
