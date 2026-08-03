import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CommunityService } from "@/services/community/community-service";
import { NotificationCenter } from "@/features/community/components/NotificationCenter";
import { Users, FolderKanban, Activity, MessageCircle } from "lucide-react";

export default async function CommunityHubPage() {
  const collections = await CommunityService.getCollections();
  const activityFeed = await CommunityService.getActivityFeed();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <Container className="max-w-6xl space-y-8 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold font-pixel text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-400" /> KD Arcade Community Hub
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Connect with players, share reviews, discover collections, and join dev discussions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <NotificationCenter />
            <Link
              href="/u/kdivyanshu"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-xs border border-slate-700 transition"
            >
              My Public Profile
            </Link>
          </div>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-base text-white flex items-center gap-2 font-pixel">
                <Activity className="w-5 h-5 text-emerald-400" /> Real-time Activity Feed
              </h2>
              <div className="space-y-3">
                {activityFeed.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg flex items-start justify-between gap-4 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-emerald-500 overflow-hidden flex items-center justify-center text-xs font-mono text-emerald-400">
                        {item.userName.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-xs text-slate-200">
                          <Link href={`/u/${item.userName.toLowerCase()}`} className="hover:text-emerald-400 font-semibold">
                            {item.userName}
                          </Link>{" "}
                          <span className="text-slate-400 font-normal">{item.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.subtitle}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Forums & Direct Messaging Placeholder Architecture */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="font-semibold text-base text-white flex items-center gap-2 font-pixel">
                  <MessageCircle className="w-5 h-5 text-purple-400" /> Community Forums & Direct Messages
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  Future Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Forums, player direct messaging, and group channels are architected for Phase 4 Supabase Realtime sync.
              </p>
            </div>
          </div>

          {/* Right Sidebar: Featured Collections */}
          <div className="space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-base text-white flex items-center gap-2 font-pixel">
                <FolderKanban className="w-5 h-5 text-amber-400" /> Featured Collections
              </h2>
              <div className="space-y-3">
                {collections.map((col) => (
                  <div key={col.id} className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2">
                    <div className="font-semibold text-xs text-slate-100">{col.title}</div>
                    <p className="text-xs text-slate-400">{col.description}</p>
                    <div className="text-[10px] font-mono text-emerald-400 flex justify-between pt-1">
                      <span>{col.gameSlugs.length} Games</span>
                      <span>Public Collection</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
