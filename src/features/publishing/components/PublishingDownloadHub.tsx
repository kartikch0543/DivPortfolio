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
        return <Smartphone className="w-4 h-4 text-emerald-500" />;
      case "GitHub":
        return <GithubIcon className="w-4 h-4 text-slate-700 dark:text-slate-300" />;
      case "Steam":
      case "itch.io":
        return <ExternalLink className="w-4 h-4 text-blue-500" />;
      default:
        return <Monitor className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="dark:bg-slate-900/40 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b dark:border-slate-800 border-slate-200 pb-4">
        <div>
          <h3 className="font-semibold text-lg dark:text-white text-slate-900 font-pixel flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-500" /> Multi-Platform Downloads & Links
          </h3>
          <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">
            Get offline builds for Windows, Android APK, macOS, Linux, Steam, and GitHub Releases
          </p>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded dark:bg-emerald-950 bg-emerald-50 dark:text-emerald-300 text-emerald-800 dark:border-emerald-800 border-emerald-300 flex items-center gap-1">
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
            className="p-3.5 dark:bg-slate-900 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-purple-500 rounded-lg flex items-center justify-between gap-3 transition hover-lift group"
          >
            <div className="flex items-center gap-3">
              {renderIcon(item.platform)}
              <div>
                <h4 className="font-semibold text-xs dark:text-slate-200 text-slate-900 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {item.platform} {item.version}
                </h4>
                <p className="text-[10px] font-mono dark:text-slate-500 text-slate-600">{item.fileSize}</p>
              </div>
            </div>
            <Download className="w-4 h-4 dark:text-slate-500 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
          </a>
        ))}
      </div>
    </div>
  );
}
