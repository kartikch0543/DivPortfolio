"use client";

import React, { useState, useEffect } from "react";
import { PublishingService } from "@/services/publishing/publishing-service";
import type { SystemRequirements } from "@/types/publishing";
import { Cpu } from "lucide-react";

interface SystemRequirementsWidgetProps {
  gameSlug: string;
}

export function SystemRequirementsWidget({ gameSlug }: SystemRequirementsWidgetProps) {
  const [specs, setSpecs] = useState<SystemRequirements | null>(null);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const data = await PublishingService.getSystemRequirements(gameSlug);
      if (mounted) setSpecs(data);
    })();
    return () => {
      mounted = false;
    };
  }, [gameSlug]);

  if (!specs) return null;

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-lg text-white font-pixel flex items-center gap-2 border-b border-slate-800 pb-4">
        <Cpu className="w-5 h-5 text-blue-400" /> System Requirements
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Minimum Specs */}
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2">
          <div className="font-semibold text-xs font-mono uppercase text-blue-400 border-b border-slate-800 pb-1">
            Minimum Specifications
          </div>
          <dl className="space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <dt className="text-slate-400">OS:</dt>
              <dd className="font-mono text-right">{specs.minimum.os}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Processor:</dt>
              <dd className="font-mono text-right">{specs.minimum.processor}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Memory:</dt>
              <dd className="font-mono text-right">{specs.minimum.memory}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Graphics:</dt>
              <dd className="font-mono text-right">{specs.minimum.graphics}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Storage:</dt>
              <dd className="font-mono text-right">{specs.minimum.storage}</dd>
            </div>
          </dl>
        </div>

        {/* Recommended Specs */}
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2">
          <div className="font-semibold text-xs font-mono uppercase text-emerald-400 border-b border-slate-800 pb-1">
            Recommended Specifications
          </div>
          <dl className="space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <dt className="text-slate-400">OS:</dt>
              <dd className="font-mono text-right">{specs.recommended.os}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Processor:</dt>
              <dd className="font-mono text-right">{specs.recommended.processor}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Memory:</dt>
              <dd className="font-mono text-right">{specs.recommended.memory}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Graphics:</dt>
              <dd className="font-mono text-right">{specs.recommended.graphics}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Storage:</dt>
              <dd className="font-mono text-right">{specs.recommended.storage}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
