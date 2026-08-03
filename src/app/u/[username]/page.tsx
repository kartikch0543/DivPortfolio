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
    <div className="min-h-screen dark:bg-slate-950 bg-slate-50 dark:text-slate-100 text-slate-900 py-10">
      <Container className="max-w-4xl space-y-8 px-4">
        {/* User Card */}
        <div className="dark:bg-slate-900/60 bg-white border dark:border-slate-800 border-slate-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full dark:bg-slate-800 bg-slate-100 border-2 border-emerald-500 overflow-hidden flex items-center justify-center text-3xl font-pixel text-emerald-600 dark:text-emerald-400">
              {username.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold font-pixel dark:text-white text-slate-900">@{username}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold dark:bg-emerald-950 bg-emerald-50 dark:text-emerald-300 text-emerald-800 border dark:border-emerald-800 border-emerald-300 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Player
                </span>
              </div>
              <p className="text-xs font-mono dark:text-slate-400 text-slate-600 mt-1">KD Arcade Community Member</p>
            </div>
          </div>

          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs transition shadow-xs">
            + Follow Player
          </button>
        </div>

        {/* Public Collections */}
        <div className="dark:bg-slate-900/40 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-mono uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-purple-500" /> Curated Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collections.map((col) => (
              <div key={col.id} className="p-4 dark:bg-slate-900/70 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-lg space-y-2">
                <div className="font-semibold text-sm dark:text-slate-100 text-slate-900">{col.title}</div>
                <p className="text-xs dark:text-slate-400 text-slate-600">{col.description}</p>
                <div className="text-[10px] font-mono dark:text-slate-500 text-slate-500 pt-1">
                  {col.gameSlugs.length} Games included
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Stream */}
        <div className="dark:bg-slate-900/40 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-mono uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" /> Public Activity
          </h2>
          <div className="space-y-3">
            {activityFeed.map((item) => (
              <div key={item.id} className="p-3.5 dark:bg-slate-900/70 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium dark:text-slate-200 text-slate-900">{item.title}</div>
                  <div className="dark:text-slate-400 text-slate-600 text-[11px] mt-0.5">{item.subtitle}</div>
                </div>
                <span className="text-[10px] font-mono dark:text-slate-500 text-slate-500">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
