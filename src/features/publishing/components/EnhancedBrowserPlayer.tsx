"use client";

import React, { useState, useRef } from "react";
import type { Game } from "@/types/game";
import { getLaunchPlan } from "@/features/game-platform/services/launch-manager";
import { useGameTelemetry } from "@/hooks/use-game-telemetry";
import { Play, Maximize2, RotateCcw, MonitorPlay, ExternalLink, ShieldAlert, Command } from "lucide-react";

interface EnhancedBrowserPlayerProps {
  game: Game;
}

export function EnhancedBrowserPlayer({ game }: EnhancedBrowserPlayerProps) {
  const launchPlan = getLaunchPlan(game);
  const { recordRestart } = useGameTelemetry(game.slug);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartGame = () => {
    setIsLoading(true);
    setIsPlaying(true);
    setLoadingProgress(10);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleToggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => console.error(err));
      } else {
        document.exitFullscreen().catch((err) => console.error(err));
      }
    }
  };

  const handleRestart = () => {
    recordRestart();
    setIsLoading(true);
    setLoadingProgress(20);
    setTimeout(() => {
      setIsLoading(false);
      setLoadingProgress(100);
    }, 500);
  };

  if (!launchPlan.embedded && launchPlan.runtime === "external" && launchPlan.url) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center space-y-4">
        <MonitorPlay className="w-10 h-10 text-emerald-400 mx-auto" />
        <h3 className="text-xl font-bold font-pixel text-white">Play {game.title} on itch.io</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          This game is hosted on its external browser runtime. Click below to launch in full window.
        </p>
        <a
          href={launchPlan.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg text-xs transition"
        >
          Launch Game <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  if (!launchPlan.embedded) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center space-y-2">
        <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto" />
        <h3 className="text-lg font-bold font-pixel text-white">Browser Player Unavailable</h3>
        <p className="text-xs text-slate-400">Download the native desktop build below to play.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl group">
      {/* Controls Top Overlay Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-200 font-semibold">{game.title}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            {game.engine} Engine
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
            <Command className="w-3 h-3 text-slate-500" /> Controls: {game.controls.join(" · ")}
          </div>
          <button
            onClick={handleRestart}
            className="p-1 hover:text-emerald-400 transition"
            title="Restart Game Session"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleToggleFullscreen}
            className="p-1 hover:text-emerald-400 transition"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center">
        {!isPlaying ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center space-y-4">
            {/* Poster Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={game.bannerImage}
              alt={game.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xs"
            />
            <div className="relative z-10 text-center space-y-3">
              <button
                onClick={handleStartGame}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl transition transform hover:scale-105 mx-auto"
              >
                <Play className="w-8 h-8 fill-slate-950 ml-1" />
              </button>
              <h3 className="font-pixel text-xl text-white">Click to Play {game.title}</h3>
              <p className="text-xs font-mono text-emerald-400">Instant HTML5 / WebGL Session</p>
            </div>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center p-6 space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <div className="text-center space-y-2">
                  <div className="font-pixel text-sm text-white">Loading WebGL Assets...</div>
                  <div className="w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">{loadingProgress}%</div>
                </div>
              </div>
            )}
            <iframe
              allowFullScreen
              className="w-full h-full border-none"
              src={launchPlan.url}
              title={`${game.title} player`}
            />
          </>
        )}
      </div>
    </div>
  );
}
