"use client";

import React, { useState, useEffect } from "react";
import { PublishingService } from "@/services/publishing/publishing-service";
import type { DlcItem } from "@/types/publishing";
import { Sparkles, ShoppingBag } from "lucide-react";

interface DlcGalleryProps {
  gameSlug: string;
}

export function DlcGallery({ gameSlug }: DlcGalleryProps) {
  const [dlcs, setDlcs] = useState<DlcItem[]>([]);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await PublishingService.getDlcs(gameSlug);
      if (mounted) setDlcs(list);
    })();
    return () => {
      mounted = false;
    };
  }, [gameSlug]);

  if (dlcs.length === 0) return null;

  return (
    <div className="dark:bg-slate-900/40 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
      <h3 className="font-semibold text-lg dark:text-white text-slate-900 font-pixel flex items-center gap-2 border-b dark:border-slate-800 border-slate-200 pb-4">
        <Sparkles className="w-5 h-5 text-amber-500" /> Expansions & Downloadable Content (DLC)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dlcs.map((dlc) => (
          <div key={dlc.id} className="p-4 dark:bg-slate-900/70 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-lg flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs dark:text-white text-slate-900">{dlc.title}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono dark:bg-amber-950 bg-amber-50 dark:text-amber-300 text-amber-800 border dark:border-amber-800 border-amber-300">
                  {dlc.price}
                </span>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">{dlc.tagline}</p>
              <div className="text-[10px] font-mono dark:text-slate-500 text-slate-500 mt-2">{dlc.releaseDate}</div>
            </div>

            <button className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1.5 text-xs flex-shrink-0 shadow-xs">
              <ShoppingBag className="w-4 h-4" /> Get DLC
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
