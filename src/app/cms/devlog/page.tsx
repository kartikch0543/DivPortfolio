"use client";

import React, { useState, useEffect } from "react";
import { CmsService } from "@/services/cms-service";
import type { DevlogPost } from "@/types/cms";
import { useAutosave } from "@/hooks/use-autosave";
import { BookOpen, Plus, Eye, Edit3, Clock, CheckCircle } from "lucide-react";

export default function DevlogManagerCmsPage() {
  const [devlogs, setDevlogs] = useState<DevlogPost[]>([]);
  const [activeDevlog, setActiveDevlog] = useState<DevlogPost | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">("draft");
  const [gameSlug, setGameSlug] = useState("");

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const fetchDevlogs = async () => {
    const list = await CmsService.getDevlogs();
    setDevlogs(list);
  };

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await CmsService.getDevlogs();
      if (mounted) {
        setDevlogs(list);
        if (list.length > 0) {
          const first = list[0];
          setActiveDevlog(first);
          setTitle(first.title);
          setSlug(first.slug);
          setSummary(first.summary);
          setContent(first.content);
          setStatus(first.status);
          setGameSlug(first.gameSlug || "");
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const selectDevlog = (post: DevlogPost) => {
    setActiveDevlog({ ...post });
    setTitle(post.title);
    setSlug(post.slug);
    setSummary(post.summary);
    setContent(post.content);
    setStatus(post.status);
    setGameSlug(post.gameSlug || "");
  };

  const handleCreateNew = () => {
    const newPost: DevlogPost = {
      id: `devlog-${Date.now()}`,
      slug: `new-devlog-${Date.now().toString().slice(-4)}`,
      title: "Untitled Devlog Entry",
      summary: "Write a short summary...",
      content: "# New Devlog\n\nWrite your MDX or Markdown content here...",
      author: "Kartik Choudhary",
      publishedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      status: "draft",
      tags: ["Devlog"],
    };
    setActiveDevlog(newPost);
    setTitle(newPost.title);
    setSlug(newPost.slug);
    setSummary(newPost.summary);
    setContent(newPost.content);
    setStatus(newPost.status);
    setGameSlug(newPost.gameSlug || "");
  };

  // Autosave architecture hook
  const { isSaving, lastSavedAt } = useAutosave({
    data: { title, slug, summary, content, status, gameSlug },
    enabled: !!activeDevlog,
    delayMs: 2500,
    onSave: async (currentData) => {
      if (!activeDevlog || !currentData.title) return;
      await CmsService.saveDevlog({
        id: activeDevlog.id,
        slug: currentData.slug,
        title: currentData.title,
        summary: currentData.summary,
        content: currentData.content,
        status: currentData.status,
        gameSlug: currentData.gameSlug,
      });
      await fetchDevlogs();
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold font-pixel text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> Devlog Manager
          </h2>
          <p className="text-xs text-slate-400">
            Write devlog entries with MDX/Markdown preview and background autosave
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
        >
          <Plus className="w-4 h-4" /> New Devlog Entry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-mono uppercase text-slate-400 mb-2">Devlog Entries</h3>
          <div className="space-y-2">
            {devlogs.map((post) => (
              <button
                key={post.id}
                onClick={() => selectDevlog(post)}
                className={`w-full text-left p-3 rounded-lg border transition ${
                  activeDevlog?.id === post.id
                    ? "bg-purple-950/40 border-purple-800 text-white"
                    : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="font-medium text-xs line-clamp-1">{post.title}</div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
                  <span>{post.publishedAt}</span>
                  <span className="uppercase text-purple-400">{post.status}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Editor & MDX Preview */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
          {activeDevlog ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("edit")}
                    className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 ${
                      activeTab === "edit"
                        ? "bg-purple-950 text-purple-300 border border-purple-800"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit MDX
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 ${
                      activeTab === "preview"
                        ? "bg-purple-950 text-purple-300 border border-purple-800"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" /> Live Preview
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  {isSaving ? (
                    <span className="flex items-center gap-1 text-amber-400 animate-pulse">
                      <Clock className="w-3.5 h-3.5" /> Autosaving...
                    </span>
                  ) : lastSavedAt ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" /> Autosaved
                    </span>
                  ) : null}
                </div>
              </div>

              {activeTab === "edit" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "draft" | "published" | "archived")}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Summary</label>
                    <input
                      type="text"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Markdown / MDX Content
                    </label>
                    <textarea
                      rows={14}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                /* Live Preview Render */
                <div className="prose prose-invert max-w-none bg-slate-950 p-6 rounded-lg border border-slate-800 text-sm font-sans space-y-4">
                  <h1 className="text-xl font-bold font-pixel text-purple-300">{title || "Untitled"}</h1>
                  <p className="text-slate-400 italic text-xs border-l-2 border-purple-500 pl-3">
                    {summary}
                  </p>
                  <div className="whitespace-pre-wrap font-mono text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-lg">
                    {content}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              Select or create a devlog entry to begin editing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
