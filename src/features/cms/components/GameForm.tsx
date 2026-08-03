"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gameFormSchema, type GameFormValues } from "@/lib/validations/game-schema";
import { CmsService } from "@/services/cms-service";
import type { Game } from "@/types/game";
import type { PublicationStatus } from "@/types/cms";
import { Save, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

interface GameFormProps {
  initialGame?: Game & { cmsStatus?: PublicationStatus; category?: string; tags?: string[]; technologies?: string[] };
}

export function GameForm({ initialGame }: GameFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const defaultValues: GameFormValues = {
    title: initialGame?.title || "",
    slug: initialGame?.slug || "",
    tagline: initialGame?.tagline || "",
    description: initialGame?.description || "",
    coverImage: initialGame?.coverImage || "/images/games/placeholder-cover.svg",
    bannerImage: initialGame?.bannerImage || "/images/games/placeholder-banner.svg",
    genre: initialGame?.genre || ["Adventure"],
    engine: initialGame?.engine || "Unity",
    platforms: initialGame?.platforms || ["Browser", "Windows"],
    status: initialGame?.status || "released",
    cmsStatus: (initialGame?.cmsStatus as "draft" | "published" | "archived") || "published",
    releaseDate: initialGame?.releaseDate || new Date().toISOString().split("T")[0],
    estimatedPlaytime: initialGame?.estimatedPlaytime || "15-25 min",
    featured: initialGame?.featured ?? true,
    launchBrowser: initialGame?.launch?.browser || "",
    launchWebgl: initialGame?.launch?.webgl || "",
    launchPlayStore: initialGame?.launch?.playStore || "",
    launchSteam: initialGame?.launch?.steam || "",
    launchGithub: initialGame?.launch?.github || "",
    features: Array.isArray(initialGame?.features) ? initialGame.features.join("\n") : "",
    controls: Array.isArray(initialGame?.controls) ? initialGame.controls.join("\n") : "",
    developerNotes: initialGame?.developerNotes || "",
    developmentStory: initialGame?.developmentStory || "",
    tags: Array.isArray(initialGame?.tags) ? initialGame.tags.join(", ") : initialGame?.genre?.join(", ") || "",
    technologies: Array.isArray(initialGame?.technologies)
      ? initialGame.technologies.join(", ")
      : initialGame?.engine || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormValues>({
    resolver: zodResolver(gameFormSchema) as Resolver<GameFormValues>,
    defaultValues,
  });

  const onSubmit: SubmitHandler<GameFormValues> = async (data) => {
    setIsSubmitting(true);
    setSaveSuccess(false);
    try {
      const fullGameData: Game & { cmsStatus?: PublicationStatus; category?: string; tags?: string[]; technologies?: string[] } = {
        slug: data.slug,
        title: data.title,
        tagline: data.tagline,
        description: data.description,
        coverImage: data.coverImage,
        bannerImage: data.bannerImage,
        gallery: [{ src: data.coverImage, alt: `${data.title} scene` }],
        genre: Array.isArray(data.genre) ? data.genre : [data.genre],
        engine: data.engine,
        platforms: Array.isArray(data.platforms) ? data.platforms : [data.platforms],
        status: data.status,
        cmsStatus: data.cmsStatus,
        releaseDate: data.releaseDate,
        estimatedPlaytime: data.estimatedPlaytime,
        featured: data.featured,
        launch: {
          browser: data.launchBrowser || null,
          webgl: data.launchWebgl || null,
          playStore: data.launchPlayStore || null,
          steam: data.launchSteam || null,
          github: data.launchGithub || null,
        },
        features: (data.features || "").split("\n").filter(Boolean),
        controls: (data.controls || "").split("\n").filter(Boolean),
        developerNotes: data.developerNotes || "",
        developmentStory: data.developmentStory || "",
        tags: (data.tags || "").split(",").map((s) => s.trim()).filter(Boolean),
        technologies: (data.technologies || "").split(",").map((s) => s.trim()).filter(Boolean),
        versionHistory: initialGame?.versionHistory || [
          { version: "1.0.0", date: data.releaseDate, notes: "Initial release." },
        ],
        knownIssues: initialGame?.knownIssues || [],
        roadmap: initialGame?.roadmap || [],
        credits: initialGame?.credits || [{ role: "Design & development", name: "Kartik Choudhary" }],
      };

      await CmsService.saveGame(fullGameData);
      setSaveSuccess(true);
      setTimeout(() => {
        router.push("/cms/games");
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error("Failed to save game:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white font-pixel">
              {initialGame ? `Edit Game: ${initialGame.title}` : "Create New Game"}
            </h2>
            <p className="text-xs text-slate-400">Reusable form with Zod validation and clean architecture</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Saved!
            </span>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-5 py-2 rounded-lg text-sm transition disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Game
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-mono uppercase text-emerald-400 tracking-wider">1. Basic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="e.g. Tiny Together"
            />
            {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Slug</label>
            <input
              {...register("slug")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              placeholder="tiny-together"
            />
            {errors.slug && <p className="text-xs text-rose-400 mt-1">{errors.slug.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Tagline</label>
          <input
            {...register("tagline")}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
            placeholder="Small creatures. One big adventure."
          />
          {errors.tagline && <p className="text-xs text-rose-400 mt-1">{errors.tagline.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Full Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
            placeholder="Detailed game description..."
          />
          {errors.description && <p className="text-xs text-rose-400 mt-1">{errors.description.message}</p>}
        </div>
      </div>

      {/* Metadata & Status */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-mono uppercase text-emerald-400 tracking-wider">2. Metadata & Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Engine</label>
            <input
              {...register("engine")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Game Status</label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="released">Released</option>
              <option value="in-development">In Development</option>
              <option value="coming-soon">Coming Soon</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">CMS Workflow Status</label>
            <select
              {...register("cmsStatus")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Tags (Comma-separated)</label>
            <input
              {...register("tags")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="Unity, Co-op, Puzzle"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Technologies</label>
            <input
              {...register("technologies")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="Unity 2022.3, C#, WebGL"
            />
          </div>
        </div>
      </div>

      {/* Launch Targets */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-mono uppercase text-emerald-400 tracking-wider">3. Launch Targets & URLs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">External Browser URL (itch.io)</label>
            <input
              {...register("launchBrowser")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="https://kdivyanshu.itch.io/tiny-together"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Self-Hosted WebGL Build Path</label>
            <input
              {...register("launchWebgl")}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="/games/builds/tiny-together/index.html"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
