"use client";

import React, { useState, useEffect } from "react";
import { PublishingService } from "@/services/publishing/publishing-service";
import type { AchievementItem } from "@/types/publishing";
import { Trophy, CheckCircle2, Lock } from "lucide-react";

interface AchievementsWidgetProps {
  gameSlug: string;
}

export function AchievementsWidget({ gameSlug }: AchievementsWidgetProps) {
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await PublishingService.getAchievements(gameSlug);
      if (mounted) setAchievements(list);
    })();
    return () => {
      mounted = false;
    };
  }, [gameSlug]);

  if (achievements.length === 0) return null;

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="dark:bg-slate-900/40 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-4">
        <h3 className="font-semibold text-lg dark:text-white text-slate-900 font-pixel flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> Player Achievements System
        </h3>
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
          {unlockedCount} / {achievements.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-4 rounded-lg border text-xs space-y-2 transition ${
              ach.isUnlocked
                ? "dark:bg-slate-900/80 bg-slate-50 dark:border-slate-700 border-slate-300 dark:text-slate-200 text-slate-900 shadow-xs"
                : "dark:bg-slate-950/60 bg-slate-100 dark:border-slate-800/80 border-slate-200 text-slate-500 opacity-70"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{ach.icon}</span>
              {ach.isUnlocked ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <Lock className="w-4 h-4 dark:text-slate-600 text-slate-400" />
              )}
            </div>

            <div>
              <div className="font-semibold dark:text-slate-100 text-slate-900">{ach.title}</div>
              <p className="text-[11px] dark:text-slate-400 text-slate-600 mt-0.5">{ach.description}</p>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono pt-1 border-t dark:border-slate-800 border-slate-200">
              <span className="text-amber-600 dark:text-amber-400 font-medium">{ach.rarityPercentage}% of players</span>
              <span>{ach.isUnlocked ? "Unlocked" : "Locked"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
