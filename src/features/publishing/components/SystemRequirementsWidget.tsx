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
    <div className="dark:bg-slate-900/40 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
      <h3 className="font-semibold text-lg dark:text-white text-slate-900 font-pixel flex items-center gap-2 border-b dark:border-slate-800 border-slate-200 pb-4">
        <Cpu className="w-5 h-5 text-blue-500" /> System Requirements
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Minimum Specs */}
        <div className="p-4 dark:bg-slate-900/70 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-lg space-y-2">
          <div className="font-semibold text-xs font-mono uppercase text-blue-600 dark:text-blue-400 border-b dark:border-slate-800 border-slate-200 pb-1">
            Minimum Specifications
          </div>
          <dl className="space-y-1.5 dark:text-slate-300 text-slate-700">
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">OS:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.minimum.os}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">Processor:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.minimum.processor}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">Memory:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.minimum.memory}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">Graphics:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.minimum.graphics}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">Storage:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.minimum.storage}</dd>
            </div>
          </dl>
        </div>

        {/* Recommended Specs */}
        <div className="p-4 dark:bg-slate-900/70 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-lg space-y-2">
          <div className="font-semibold text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 border-b dark:border-slate-800 border-slate-200 pb-1">
            Recommended Specifications
          </div>
          <dl className="space-y-1.5 dark:text-slate-300 text-slate-700">
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">OS:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.recommended.os}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">Processor:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.recommended.processor}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">Memory:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.recommended.memory}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">Graphics:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.recommended.graphics}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="dark:text-slate-400 text-slate-500">Storage:</dt>
              <dd className="font-mono text-right dark:text-slate-200 text-slate-900 font-medium">{specs.recommended.storage}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
