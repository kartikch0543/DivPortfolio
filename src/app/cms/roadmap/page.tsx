"use client";

import React, { useState, useEffect } from "react";
import { CmsService } from "@/services/cms-service";
import type { RoadmapItem, ReleaseItem } from "@/types/cms";
import { Milestone, Plus, Clock, Sparkles } from "lucide-react";

export default function RoadmapReleaseCmsPage() {
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [releases, setReleases] = useState<ReleaseItem[]>([]);

  const fetchAllData = async () => {
    const rm = await CmsService.getRoadmap();
    const rel = await CmsService.getReleases();
    setRoadmap(rm);
    setReleases(rel);
  };

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const rm = await CmsService.getRoadmap();
      const rel = await CmsService.getReleases();
      if (mounted) {
        setRoadmap(rm);
        setReleases(rel);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddRoadmap = async () => {
    const newItem: RoadmapItem = {
      id: `rm-${Date.now()}`,
      gameSlug: "tiny-together",
      title: "New Feature Milestone",
      description: "Planned improvement description...",
      status: "planned",
      targetDate: "Q4 2026",
      targetVersion: "v1.2.0",
    };
    await CmsService.saveRoadmapItem(newItem);
    await fetchAllData();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold font-pixel text-white flex items-center gap-2">
            <Milestone className="w-5 h-5 text-blue-400" /> Roadmap & Release Manager
          </h2>
          <p className="text-xs text-slate-400">Plan milestones, track versions, and manage platform release notes</p>
        </div>
        <button
          onClick={handleAddRoadmap}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
        >
          <Plus className="w-4 h-4" /> Add Milestone
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roadmap Section */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Clock className="w-4 h-4 text-amber-400" /> Feature Roadmap
          </h3>
          <div className="space-y-3">
            {roadmap.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-slate-200">{item.title}</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-slate-800 text-blue-400 uppercase">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{item.description}</p>
                <div className="text-[10px] font-mono text-slate-400 flex justify-between pt-1">
                  <span>Target: {item.targetDate}</span>
                  <span>Version: {item.targetVersion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Release History Section */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Platform Releases
          </h3>
          <div className="space-y-3">
            {releases.map((rel) => (
              <div
                key={rel.id}
                className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-emerald-400 font-mono">
                    v{rel.version} - {rel.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{rel.releaseDate}</span>
                </div>
                <p className="text-xs text-slate-400">{rel.releaseNotes}</p>
                <div className="flex gap-1 pt-1">
                  {rel.platforms.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 text-[9px] font-mono rounded bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
