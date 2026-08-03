"use client";

import React, { useState, useEffect } from "react";
import { PublishingService } from "@/services/publishing/publishing-service";
import type { ReleaseNoteItem } from "@/types/publishing";
import { Milestone, Tag, Calendar, CheckCircle2 } from "lucide-react";

interface VersionHistoryTimelineProps {
  gameSlug: string;
}

export function VersionHistoryTimeline({ gameSlug }: VersionHistoryTimelineProps) {
  const [releases, setReleases] = useState<ReleaseNoteItem[]>([]);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await PublishingService.getReleaseNotes(gameSlug);
      if (mounted) setReleases(list);
    })();
    return () => {
      mounted = false;
    };
  }, [gameSlug]);

  if (releases.length === 0) return null;

  return (
    <div className="dark:bg-slate-900/40 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
      <h3 className="font-semibold text-lg dark:text-white text-slate-900 font-pixel flex items-center gap-2 border-b dark:border-slate-800 border-slate-200 pb-4">
        <Milestone className="w-5 h-5 text-purple-500" /> Version History & Release Notes
      </h3>

      <div className="space-y-4">
        {releases.map((rel) => (
          <div key={rel.version} className="p-4 dark:bg-slate-900/70 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b dark:border-slate-800/80 border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold dark:bg-purple-950 bg-purple-100 dark:text-purple-300 text-purple-900 border dark:border-purple-800 border-purple-300 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {rel.version}
                </span>
                <span className="font-semibold text-sm dark:text-white text-slate-900">{rel.title}</span>
              </div>
              <span className="text-[10px] font-mono dark:text-slate-400 text-slate-600 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Released {rel.releaseDate}
              </span>
            </div>

            <ul className="space-y-1.5 text-xs dark:text-slate-300 text-slate-700">
              {rel.changelog.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
