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
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-lg text-white font-pixel flex items-center gap-2 border-b border-slate-800 pb-4">
        <Sparkles className="w-5 h-5 text-amber-400" /> Expansions & Downloadable Content (DLC)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dlcs.map((dlc) => (
          <div key={dlc.id} className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-white">{dlc.title}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-950 text-amber-300 border border-amber-800">
                  {dlc.price}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{dlc.tagline}</p>
              <div className="text-[10px] font-mono text-slate-500 mt-2">{dlc.releaseDate}</div>
            </div>

            <button className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1.5 text-xs flex-shrink-0">
              <ShoppingBag className="w-4 h-4" /> Get DLC
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
