import React from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { CommunityService } from "@/services/community/community-service";
import { Shield, FolderKanban, Activity } from "lucide-react";

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const collections = await CommunityService.getCollections();
  const activityFeed = await CommunityService.getActivityFeed();

  if (!username) notFound();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <Container className="max-w-4xl space-y-8 px-4">
        {/* User Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-emerald-500 overflow-hidden flex items-center justify-center text-3xl font-pixel text-emerald-400">
              {username.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold font-pixel text-white">@{username}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Player
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">KD Arcade Community Member</p>
            </div>
          </div>

          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg text-xs transition">
            + Follow Player
          </button>
        </div>

        {/* Public Collections */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-purple-400" /> Curated Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collections.map((col) => (
              <div key={col.id} className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2">
                <div className="font-semibold text-sm text-slate-100">{col.title}</div>
                <p className="text-xs text-slate-400">{col.description}</p>
                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  {col.gameSlugs.length} Games included
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Stream */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Public Activity
          </h2>
          <div className="space-y-3">
            {activityFeed.map((item) => (
              <div key={item.id} className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-slate-200">{item.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{item.subtitle}</div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
