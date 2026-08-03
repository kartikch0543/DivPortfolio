import React from "react";
import Link from "next/link";
import { CmsService } from "@/services/cms-service";
import { Gamepad2, BookOpen, Plus, Sparkles, ArrowRight, Eye, RefreshCw } from "lucide-react";

export default async function CmsDashboardPage() {
  const games = await CmsService.getGames();
  const devlogs = await CmsService.getDevlogs();
  const releases = await CmsService.getReleases();
  const roadmap = await CmsService.getRoadmap();

  const publishedCount = games.filter((g) => g.cmsStatus === "published" || !g.cmsStatus).length;
  const draftCount = games.filter((g) => g.cmsStatus === "draft").length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold font-pixel tracking-wide text-white">Developer Dashboard</h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage your indie studio games, devlogs, media assets, roadmaps, and releases.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/cms/games/new"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition"
          >
            <Plus className="w-4 h-4" /> New Game
          </Link>
          <Link
            href="/cms/devlog"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2 rounded-lg text-sm border border-slate-700 transition"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" /> New Devlog
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Total Games</span>
            <Gamepad2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{games.length}</div>
          <div className="text-xs text-slate-400 font-mono">
            <span className="text-emerald-400">{publishedCount} Published</span> •{" "}
            <span className="text-amber-400">{draftCount} Drafts</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Devlog Posts</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{devlogs.length}</div>
          <div className="text-xs text-slate-400 font-mono">MDX & Markdown Supported</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Active Releases</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{releases.length}</div>
          <div className="text-xs text-slate-400 font-mono">Multi-platform builds</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Roadmap Items</span>
            <RefreshCw className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{roadmap.length}</div>
          <div className="text-xs text-slate-400 font-mono">Future updates planned</div>
        </div>
      </div>

      {/* Main Grid: Recent Games & Devlog Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Games Overview List */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-semibold text-lg text-white flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-emerald-400" /> Games Catalog
            </h3>
            <Link
              href="/cms/games"
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
            >
              Manage Games <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {games.map((game) => (
              <div
                key={game.slug}
                className="flex items-center justify-between p-3.5 bg-slate-900/70 border border-slate-800 rounded-lg hover:border-slate-700 transition"
              >
                <div>
                  <div className="font-medium text-slate-100 flex items-center gap-2">
                    {game.title}
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                      {game.cmsStatus || "published"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {game.genre.join(", ")} • {game.engine}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/games/${game.slug}`}
                    target="_blank"
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="View public page"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/cms/games/${game.slug}/edit`}
                    className="px-2.5 py-1 text-xs font-medium rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900 transition"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Devlogs */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-semibold text-lg text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" /> Recent Devlogs
            </h3>
            <Link
              href="/cms/devlog"
              className="text-xs font-mono text-purple-400 hover:underline flex items-center gap-1"
            >
              Open Manager <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {devlogs.map((devlog) => (
              <div
                key={devlog.id}
                className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-200 text-sm line-clamp-1">{devlog.title}</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-400 uppercase">
                    {devlog.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{devlog.summary}</p>
                <div className="text-[11px] font-mono text-slate-500 flex justify-between pt-1">
                  <span>{devlog.publishedAt}</span>
                  <span>{devlog.readTimeMinutes} min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
