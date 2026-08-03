"use client";

import React, { useState, useEffect } from "react";
import { CmsService } from "@/services/cms-service";
import type { MediaAsset } from "@/types/cms";
import { Image as ImageIcon, Upload, Video } from "lucide-react";

export default function MediaLibraryCmsPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [isUploading, setIsUploading] = useState(false);

  const fetchMedia = async () => {
    const data = await CmsService.getMedia();
    setMediaList(data);
  };

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const data = await CmsService.getMedia();
      if (mounted) setMediaList(data);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUploadMock = async () => {
    setIsUploading(true);
    await CmsService.addMedia({
      name: `Media Asset ${Date.now().toString().slice(-4)}`,
      type: "screenshot",
      url: "/images/games/tiny-together-cover.svg",
      sizeBytes: 240500,
    });
    await fetchMedia();
    setIsUploading(false);
  };

  const filteredMedia = mediaList.filter((m) => filterType === "all" || m.type === filterType);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold font-pixel text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-400" /> Media Library
          </h2>
          <p className="text-xs text-slate-400">Manage banners, screenshots, trailers, and promotional media</p>
        </div>
        <button
          onClick={handleUploadMock}
          disabled={isUploading}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition"
        >
          <Upload className="w-4 h-4" /> {isUploading ? "Uploading..." : "Upload Asset"}
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {["all", "banner", "screenshot", "video"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition ${
              filterType === type
                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {type}s
          </button>
        ))}
      </div>

      {/* Media Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((asset) => (
          <div
            key={asset.id}
            className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition"
          >
            <div className="aspect-video bg-slate-950 relative flex items-center justify-center border-b border-slate-800">
              {asset.type === "video" ? (
                <Video className="w-8 h-8 text-purple-400" />
              ) : (
                <div className="text-xs font-mono text-slate-500 p-2 text-center">{asset.name}</div>
              )}
              <span className="absolute top-2 right-2 px-2 py-0.5 text-[9px] font-mono rounded bg-slate-900/90 text-emerald-400 uppercase border border-slate-800">
                {asset.type}
              </span>
            </div>
            <div className="p-3 space-y-1">
              <div className="text-xs font-medium text-slate-200 truncate">{asset.name}</div>
              <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                <span>{asset.uploadedAt}</span>
                <span>{asset.gameSlug || "Global"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
