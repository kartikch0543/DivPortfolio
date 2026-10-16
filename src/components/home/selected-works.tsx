"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { games } from "@/data/games";
import { Maximize2, RotateCcw, ExternalLink, Play, Smartphone } from "lucide-react";
import {
  isMobileDevice,
  enterGameFullscreenLandscape,
  exitGameFullscreen,
} from "@/utils/mobile-game-utils";

export function SelectedWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPortraitOnMobile, setIsPortraitOnMobile] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const activeGame = games[activeIndex] || games[0];

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

  const handlePrev = () => {
    if (isPlaying) exitGameFullscreen();
    setIsPlaying(false);
    setActiveIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isPlaying) exitGameFullscreen();
    setIsPlaying(false);
    setActiveIndex((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  const handleSelectGame = (index: number) => {
    if (isPlaying) exitGameFullscreen();
    setIsPlaying(false);
    setActiveIndex(index);
  };

  const handleStartGame = async () => {
    setIsPlaying(true);
    if (isMobileDevice()) {
      // Automatically fullscreen and lock to landscape on phones
      setTimeout(() => {
        enterGameFullscreenLandscape(playerContainerRef.current);
      }, 50);
    }
  };

  const handleStopGame = async () => {
    await exitGameFullscreen();
    setIsPlaying(false);
  };

  const toggleFullscreen = () => {
    enterGameFullscreenLandscape(playerContainerRef.current);
  };

  return (
    <div className="text-brand-primary">
      {/* Works Display Grid */}
      <div className="grid grid-cols-4 md:grid-cols-10 border-b border-brand-primary/50">
        {/* Left Stacked Game Selectors (Cols 1-2 on desktop, thumbnail strip) */}
        <div className="col-span-4 md:col-span-3 border-b md:border-b-0 md:border-r border-brand-primary/50 flex flex-col">
          <div className="border-b border-brand-primary/50 p-3 md:p-4 text-[0.65rem] font-mono tracking-[0.18em] uppercase opacity-75">
            [ 0{activeIndex + 1} / 0{games.length} TITLES ]
          </div>

          <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
            {games.map((game, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={game.slug}
                  type="button"
                  onClick={() => handleSelectGame(idx)}
                  className={`group relative flex-1 md:flex-none p-3.5 md:p-5 text-left border-r md:border-r-0 md:border-b last:border-b-0 border-brand-primary/50 transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-brand-primary text-brand-cream"
                      : "hover:bg-brand-primary/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[0.62rem] font-mono tracking-widest uppercase opacity-70">
                      0{idx + 1}
                    </span>
                    {game.slug === "ulta-he-krega" && (
                      <span className="text-[0.58rem] font-mono px-1.5 py-0.5 border border-current tracking-wider uppercase">
                        Rank #2
                      </span>
                    )}
                    {game.slug === "tiny-together" && (
                      <span className="text-[0.58rem] font-mono px-1.5 py-0.5 border border-current tracking-wider uppercase">
                        Top 10
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 text-base md:text-xl font-bold tracking-[-0.03em] whitespace-nowrap md:whitespace-normal">
                    {game.title}
                  </h3>
                  <p className="hidden md:block text-[0.65rem] font-mono tracking-wider uppercase opacity-75 mt-1 truncate">
                    {game.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center / Main Game Showcase (Cols 4-10 on desktop) */}
        <div className="col-span-4 md:col-span-7 flex flex-col justify-between">
          {/* Header Info Panel */}
          <div className="bg-brand-primary text-brand-cream p-4 md:p-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[0.65rem] font-mono tracking-[0.18em] uppercase opacity-70">
                    {activeGame.engine} · WebGL Deployment
                  </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold tracking-[-0.03em]">
                  {activeGame.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end">
                {activeGame.genre.map((g) => (
                  <span
                    key={g}
                    className="border border-brand-cream/50 px-2.5 py-0.5 text-[0.62rem] font-mono tracking-[0.18em] uppercase"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm md:text-base leading-relaxed opacity-90 max-w-2xl">
              {activeGame.description}
            </p>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-brand-cream/30">
              <div className="flex items-center gap-3">
                {!isPlaying ? (
                  <button
                    type="button"
                    onClick={handleStartGame}
                    className="group/cta inline-flex items-center gap-2 bg-brand-cream text-brand-primary px-5 py-2.5 text-xs md:text-sm font-bold tracking-[0.06em] uppercase hover:bg-brand-cream/90 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Game in Browser</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleStopGame}
                      className="inline-flex items-center gap-1.5 border border-brand-cream px-3 py-1.5 text-xs font-mono uppercase hover:bg-brand-cream hover:text-brand-primary transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Stop Player
                    </button>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="inline-flex items-center gap-1.5 border border-brand-cream px-3 py-1.5 text-xs font-mono uppercase hover:bg-brand-cream hover:text-brand-primary transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" /> Fullscreen
                    </button>
                  </div>
                )}
              </div>

              <a
                href={`https://kdivyanshu.itch.io/${activeGame.slug}`}
                target="_blank"
                rel="noreferrer"
                className="group/roll inline-flex items-center gap-1.5 text-xs md:text-sm font-bold tracking-[0.06em] uppercase opacity-85 hover:opacity-100"
              >
                <span className="relative block overflow-hidden">
                  <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full">
                    itch.io Page
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
                  >
                    itch.io Page
                  </span>
                </span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Interactive Screen Container: Real Game WebGL Player OR Rich Artwork Preview */}
          <div
            ref={playerContainerRef}
            className="relative w-full aspect-video min-h-[320px] md:min-h-[460px] bg-black/95 overflow-hidden flex items-center justify-center border-t border-brand-primary/50 group"
          >
            {isPlaying && activeGame.launch.browser ? (
              <>
                <iframe
                  id="game-frame"
                  src={activeGame.launch.browser}
                  title={activeGame.title}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen *; screen-wake-lock; orientation-lock; gamepad"
                  allowFullScreen
                />
                {isPortraitOnMobile && (
                  <div className="absolute top-3 inset-x-3 z-30 p-2.5 rounded-lg bg-black/85 backdrop-blur-md border border-brand-cream/30 text-brand-cream text-xs font-mono flex items-center justify-between gap-2 shadow-xl animate-fade-in">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-400 rotate-90 animate-pulse shrink-0" />
                      <span className="text-[11px]">Rotate phone to landscape for fullscreen</span>
                    </div>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="px-2.5 py-1 rounded bg-brand-cream text-brand-primary text-[10px] font-bold uppercase tracking-wider"
                    >
                      Landscape
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {/* Real Game Artwork */}
                <Image
                  src={activeGame.bannerImage || activeGame.coverImage}
                  alt={activeGame.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                {/* Atmospheric Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-3 max-w-lg">
                  <span className="text-[0.65rem] font-mono tracking-[0.25em] text-brand-cream/80 uppercase border border-brand-cream/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    {activeGame.engine} · WebGL Ready
                  </span>
                  <h4 className="text-2xl sm:text-4xl font-bold text-white tracking-[-0.03em] drop-shadow-md">
                    {activeGame.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-cream/90 font-mono tracking-wide max-w-md line-clamp-2">
                    {activeGame.tagline}
                  </p>
                  <button
                    type="button"
                    onClick={handleStartGame}
                    className="mt-3 inline-flex items-center gap-2.5 bg-brand-cream text-brand-primary px-6 py-3 text-xs sm:text-sm font-bold tracking-[0.08em] uppercase hover:bg-white transition-all transform hover:scale-105 shadow-2xl cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Launch Game in Browser</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Controls & Features Footnote */}
          <div className="p-3 md:p-4 border-t border-brand-primary/50 flex flex-wrap items-center justify-between gap-4 text-[0.68rem] font-mono uppercase tracking-wider bg-brand-cream">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-bold opacity-60">CONTROLS:</span>
              {activeGame.controls?.slice(0, 3).map((ctl) => (
                <span key={ctl} className="opacity-80">
                  {ctl}
                </span>
              ))}
            </div>
            <span className="opacity-60 text-right">
              {activeGame.status} · {activeGame.estimatedPlaytime}
            </span>
          </div>
        </div>
      </div>

      {/* Prev / Next Bottom Stepper */}
      <div className="flex h-14 md:h-16 border-b border-brand-primary/50">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous work"
          className="flex flex-1 cursor-pointer items-center justify-center border-r border-brand-primary/50 text-xl font-bold transition-colors hover:bg-brand-primary hover:text-brand-cream"
        >
          ←
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next work"
          className="flex flex-1 cursor-pointer items-center justify-center text-xl font-bold transition-colors hover:bg-brand-primary hover:text-brand-cream"
        >
          →
        </button>
      </div>

      {/* Ticker Strip */}
      <div className="h-10 md:h-12 border-b border-brand-primary/50 overflow-hidden flex items-center select-none">
        <div className="animate-marquee flex h-full w-max items-center text-[0.65rem] tracking-[0.18em] uppercase">
          {[1, 2].map((i) => (
            <span key={i} className="flex shrink-0 items-center">
              <span className="whitespace-nowrap">
                play games in browser<span className="px-6 opacity-40">/</span>
              </span>
              <span className="whitespace-nowrap">
                rank #2 solo dev in gdai jam<span className="px-6 opacity-40">/</span>
              </span>
              <span className="whitespace-nowrap">
                top 10 brainless game jam 550+ entries<span className="px-6 opacity-40">/</span>
              </span>
              <span className="whitespace-nowrap">
                unity certified associate in progress<span className="px-6 opacity-40">/</span>
              </span>
              <span className="whitespace-nowrap">
                4 shipped itch.io games<span className="px-6 opacity-40">/</span>
              </span>
              <span className="whitespace-nowrap">
                c# & gdscript gameplay programming<span className="px-6 opacity-40">/</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
