import React from "react";
import { DeveloperAnalyticsDashboard } from "@/features/analytics/components/DeveloperAnalyticsDashboard";
import { BarChart3 } from "lucide-react";

export default function CmsAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold font-pixel text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" /> Studio & Game Analytics
          </h2>
          <p className="text-xs text-slate-400">
            Track visitors, game plays, downloads, play time, retention, platforms, and geographic reach
          </p>
        </div>
      </div>

      <DeveloperAnalyticsDashboard />
    </div>
  );
}
