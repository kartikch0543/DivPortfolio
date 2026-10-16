"use client";

import React, { useState, useRef, useEffect } from "react";
import type { Game } from "@/types/game";
import { getLaunchPlan } from "@/features/game-platform/services/launch-manager";
import { useGameTelemetry } from "@/hooks/use-game-telemetry";
import { Play, Maximize2, RotateCcw, ShieldAlert, Command, ExternalLink, Smartphone } from "lucide-react";
import {
  isMobileDevice,
  enterGameFullscreenLandscape,
  exitGameFullscreen,
} from "@/utils/mobile-game-utils";

interface EnhancedBrowserPlayerProps {
  game: Game;
}

export function EnhancedBrowserPlayer({ game }: EnhancedBrowserPlayerProps) {
  const launchPlan = getLaunchPlan(game);
  const { recordRestart } = useGameTelemetry(game.slug);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPortraitOnMobile, setIsPortraitOnMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window !== "undefined") {
        const isMobile = isMobileDevice();
        const isPortrait = window.innerHeight > window.innerWidth;
        setIsPortraitOnMobile(isMobile && isPortrait);
      }
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  const handleStartGame = () => {
    setIsLoading(true);
    setIsPlaying(true);
    setLoadingProgress(10);

    if (isMobileDevice()) {
      setTimeout(() => {
        enterGameFullscreenLandscape(containerRef.current);
      }, 80);
    }

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      enterGameFullscreenLandscape(containerRef.current);
    } else {
      exitGameFullscreen();
    }
  };

  const handleRestart = () => {
    recordRestart();
    setIsLoading(true);
    setLoadingProgress(20);
    setTimeout(() => {
      setIsLoading(false);
      setLoadingProgress(100);
    }, 400);
  };

  if (!launchPlan.url) {
    return (
      <div className="dark:bg-slate-900/60 bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-8 text-center space-y-2 shadow-sm">
        <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold font-pixel dark:text-white text-slate-900">Browser Player Unavailable</h3>
        <p className="text-xs dark:text-slate-400 text-slate-600">Download the native desktop build below to play.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative dark:bg-slate-950 bg-slate-900 border dark:border-slate-800 border-slate-700 rounded-xl overflow-hidden shadow-2xl group">
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
            <div className="relative z-10 text-center space-y-4 p-4 max-w-md mx-auto">
              <h3 className="font-pixel text-xl sm:text-2xl text-white font-bold">{game.title}</h3>
              <p className="text-xs font-mono text-emerald-400">Playable Browser Target Ready</p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleStartGame}
                  className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-pixel font-bold text-xs shadow-2xl transition transform hover:scale-105 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-slate-950" /> PLAY GAME
                </button>
                <a
                  href={`https://kdivyanshu.itch.io/${game.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-pixel font-bold text-xs border border-slate-600 transition flex items-center gap-2"
                >
                  View on Itch.io <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
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
              allow="autoplay; fullscreen *; screen-wake-lock; orientation-lock; focus; gamepad"
              className="w-full h-full border-none"
              src={launchPlan.url}
              title={`${game.title} player`}
            />
            {isPortraitOnMobile && (
              <div className="absolute top-3 inset-x-3 z-30 p-2.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 text-xs font-mono flex items-center justify-between gap-2 shadow-xl animate-fade-in">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400 rotate-90 animate-pulse shrink-0" />
                  <span className="text-[11px]">Rotate phone to landscape for fullscreen</span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-400"
                >
                  Landscape
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
