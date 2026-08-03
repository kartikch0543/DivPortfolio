"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CmsService } from "@/services/cms-service";
import type { Game } from "@/types/game";
import type { PublicationStatus } from "@/types/cms";
import { Gamepad2, Plus, Search, Trash2, Edit, ExternalLink, Filter } from "lucide-react";

export default function GameCatalogCmsPage() {
  const [games, setGames] = useState<(Game & { cmsStatus?: PublicationStatus; category?: string; tags?: string[]; technologies?: string[] })[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [engineFilter, setEngineFilter] = useState<string>("all");

  const refreshGames = async () => {
    const list = await CmsService.getGames();
    setGames(list);
  };

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await CmsService.getGames();
      if (mounted) setGames(list);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (slug: string) => {
    if (confirm(`Are you sure you want to delete "${slug}"?`)) {
      await CmsService.deleteGame(slug);
      await refreshGames();
    }
  };

  const filteredGames = games.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || (g.cmsStatus || "published") === statusFilter;
    const matchesEngine = engineFilter === "all" || g.engine === engineFilter;
    return matchesSearch && matchesStatus && matchesEngine;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold font-pixel text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-emerald-400" /> Game Manager
          </h2>
          <p className="text-xs text-slate-400">Manage game listings, draft/published workflow, categories, and tags</p>
        </div>
        <Link
          href="/cms/games/new"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition"
        >
          <Plus className="w-4 h-4" /> Add New Game
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/50 p-4 border border-slate-800 rounded-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or slug..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Workflow Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <select
            value={engineFilter}
            onChange={(e) => setEngineFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Engines</option>
            <option value="Unity">Unity</option>
            <option value="Godot">Godot</option>
            <option value="HTML5">HTML5</option>
          </select>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono uppercase">
            <tr>
              <th className="p-4">Game</th>
              <th className="p-4">Status</th>
              <th className="p-4">Engine / Tech</th>
              <th className="p-4">Platforms</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredGames.map((game) => (
              <tr key={game.slug} className="hover:bg-slate-900/80 transition">
                <td className="p-4">
                  <div className="font-semibold text-slate-100">{game.title}</div>
                  <div className="text-[11px] font-mono text-slate-400">{game.slug}</div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${
                      game.cmsStatus === "draft"
                        ? "bg-amber-950 text-amber-300 border-amber-800"
                        : game.cmsStatus === "archived"
                        ? "bg-slate-800 text-slate-400 border-slate-700"
                        : "bg-emerald-950 text-emerald-300 border-emerald-800"
                    }`}
                  >
                    {game.cmsStatus || "published"}
                  </span>
                </td>
                <td className="p-4 text-slate-300 font-mono">{game.engine}</td>
                <td className="p-4 text-slate-400">{game.platforms.join(", ")}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/games/${game.slug}`}
                      target="_blank"
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Preview Game"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/cms/games/${game.slug}/edit`}
                      className="p-1.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 transition"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(game.slug)}
                      className="p-1.5 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
