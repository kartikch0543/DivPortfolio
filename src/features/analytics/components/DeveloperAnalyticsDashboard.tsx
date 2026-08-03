"use client";

import React, { useState, useEffect } from "react";
import { AnalyticsService } from "@/services/analytics/analytics-service";
import type { DeveloperMetrics } from "@/types/analytics";
import {
  Users,
  Gamepad2,
  Download,
  Clock,
  TrendingUp,
  Globe,
  Monitor,
  Eye,
  BarChart3,
} from "lucide-react";

export function DeveloperAnalyticsDashboard() {
  const [metrics, setMetrics] = useState<DeveloperMetrics | null>(null);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const data = await AnalyticsService.getDeveloperMetrics();
      if (mounted) setMetrics(data);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!metrics) {
    return <div className="text-center py-12 font-mono text-xs text-slate-500">Loading analytics telemetry...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase">Total Visitors</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{metrics.totalVisitors.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 font-mono">+14.2% this week</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase">Game Plays</span>
            <Gamepad2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{metrics.totalGamePlays.toLocaleString()}</div>
          <div className="text-[10px] text-blue-400 font-mono">+18.9% sessions</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase">Downloads</span>
            <Download className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{metrics.totalDownloads.toLocaleString()}</div>
          <div className="text-[10px] text-purple-400 font-mono">Windows / APK</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase">Total Play Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {Math.round(metrics.totalPlayTimeMinutes / 60)} hrs
          </div>
          <div className="text-[10px] text-amber-400 font-mono">Avg 14.8 mins / play</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase">Retention</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{metrics.retentionRate}%</div>
          <div className="text-[10px] text-emerald-400 font-mono">Day-7 player return</div>
        </div>
      </div>

      {/* Grid: Platforms & Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platforms Distribution */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Monitor className="w-4 h-4 text-emerald-400" /> Platform Breakdown
          </h3>
          <div className="space-y-3">
            {metrics.topPlatforms.map((item) => (
              <div key={item.platform} className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>{item.platform}</span>
                  <span className="text-emerald-400">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe className="w-4 h-4 text-blue-400" /> Top Countries
          </h3>
          <div className="space-y-2.5">
            {metrics.topCountries.map((c) => (
              <div key={c.country} className="flex items-center justify-between text-xs p-2.5 bg-slate-900/70 border border-slate-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <span>{c.flag}</span>
                  <span className="text-slate-200 font-medium">{c.country}</span>
                </div>
                <span className="font-mono text-slate-400">{c.count.toLocaleString()} players</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Popular Games & Most Viewed Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Games */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <BarChart3 className="w-4 h-4 text-purple-400" /> Popular Games Ranking
          </h3>
          <div className="space-y-3">
            {metrics.popularGames.map((game, idx) => (
              <div key={game.slug} className="flex items-center justify-between p-3.5 bg-slate-900/70 border border-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-purple-400 font-bold">#{idx + 1}</span>
                  <span className="font-medium text-xs text-white">{game.title}</span>
                </div>
                <span className="font-mono text-xs text-slate-400">{game.plays.toLocaleString()} plays</span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed Pages */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Eye className="w-4 h-4 text-amber-400" /> Most Viewed Pages
          </h3>
          <div className="space-y-2.5">
            {metrics.mostViewedPages.map((page) => (
              <div key={page.path} className="flex items-center justify-between text-xs p-2.5 bg-slate-900/70 border border-slate-800 rounded-lg font-mono">
                <span className="text-slate-300">{page.path}</span>
                <span className="text-slate-400">{page.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
