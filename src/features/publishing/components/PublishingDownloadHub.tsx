"use client";

import React, { useState, useEffect } from "react";
import { PublishingService } from "@/services/publishing/publishing-service";
import type { DownloadItem } from "@/types/publishing";
import { GithubIcon } from "@/components/ui/icons";
import { Download, Monitor, Smartphone, ExternalLink, ShieldCheck } from "lucide-react";

interface PublishingDownloadHubProps {
  gameSlug: string;
}

export function PublishingDownloadHub({ gameSlug }: PublishingDownloadHubProps) {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await PublishingService.getDownloads(gameSlug);
      if (mounted) setDownloads(list);
    })();
    return () => {
      mounted = false;
    };
  }, [gameSlug]);

  if (downloads.length === 0) return null;

  const renderIcon = (platform: DownloadItem["platform"]) => {
    switch (platform) {
      case "Android":
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case "GitHub":
        return <GithubIcon className="w-4 h-4 text-slate-300" />;
      case "Steam":
      case "itch.io":
        return <ExternalLink className="w-4 h-4 text-blue-400" />;
      default:
        return <Monitor className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-semibold text-lg text-white font-pixel flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-400" /> Multi-Platform Downloads & Links
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Get offline builds for Windows, Android APK, macOS, Linux, Steam, and GitHub Releases
          </p>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Verified Builds
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {downloads.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-slate-900/70 border border-slate-800 hover:border-emerald-500/60 rounded-lg transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {renderIcon(item.platform)}
                <span className="font-semibold text-xs text-white group-hover:text-emerald-400 transition">
                  {item.platform}
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                {item.version}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium">{item.label}</p>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
              <span>{item.fileSize || "Direct Link"}</span>
              <span className="text-emerald-400 group-hover:underline">Download →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
