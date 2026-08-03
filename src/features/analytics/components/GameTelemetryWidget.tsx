"use client";

import React, { useState, useEffect } from "react";
import { AnalyticsService } from "@/services/analytics/analytics-service";
import type { GameTelemetry } from "@/types/analytics";
import { Activity, Trophy, Skull, RotateCcw, Zap, Users } from "lucide-react";

interface GameTelemetryWidgetProps {
  gameSlug: string;
}

export function GameTelemetryWidget({ gameSlug }: GameTelemetryWidgetProps) {
  const [telemetry, setTelemetry] = useState<GameTelemetry | null>(null);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const data = await AnalyticsService.getGameTelemetry(gameSlug);
      if (mounted) setTelemetry(data);
    })();
    return () => {
      mounted = false;
    };
  }, [gameSlug]);

  if (!telemetry) return null;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-semibold text-sm text-white font-pixel flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" /> In-Game Telemetry Stats
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
          <Users className="w-3 h-3 animate-pulse" /> {telemetry.activePlayersNow} Active Now
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">Sessions</div>
          <div className="text-lg font-bold text-white">{telemetry.totalSessions.toLocaleString()}</div>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-center gap-1">
            <Trophy className="w-3 h-3 text-amber-400" /> Completion
          </div>
          <div className="text-lg font-bold text-amber-400">{telemetry.completionRate}%</div>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-center gap-1">
            <Skull className="w-3 h-3 text-rose-400" /> Deaths
          </div>
          <div className="text-lg font-bold text-rose-400">{telemetry.totalDeaths.toLocaleString()}</div>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-center gap-1">
            <RotateCcw className="w-3 h-3 text-blue-400" /> Restarts
          </div>
          <div className="text-lg font-bold text-blue-400">{telemetry.totalRestarts.toLocaleString()}</div>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-center space-y-1">
          <div className="text-[10px] text-slate-400 uppercase flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 text-emerald-400" /> Progress
          </div>
          <div className="text-lg font-bold text-emerald-400">{telemetry.averageProgressPercentage}%</div>
        </div>
      </div>
    </div>
  );
}
