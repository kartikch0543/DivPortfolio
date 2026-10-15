"use client";

import { useState } from "react";
import { games } from "@/data/games";
import { PlaceholderRect } from "@/components/ui/placeholder-rect";
import { Maximize2, RotateCcw, ExternalLink, Play } from "lucide-react";

export function SelectedWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeGame = games[activeIndex] || games[0];

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  const handleSelectGame = (index: number) => {
    setIsPlaying(false);
    setActiveIndex(index);
  };

  const toggleFullscreen = () => {
    const iframe = document.getElementById("game-frame");
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
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
                    onClick={() => setIsPlaying(true)}
                    className="group/cta inline-flex items-center gap-2 bg-brand-cream text-brand-primary px-5 py-2.5 text-xs md:text-sm font-bold tracking-[0.06em] uppercase hover:bg-brand-cream/90 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Game in Browser</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(false)}
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

          {/* Interactive Screen Container: Real Game WebGL Player OR Minimal Placeholder */}
          <div className="relative w-full aspect-video min-h-[320px] md:min-h-[460px] bg-black/90 overflow-hidden flex items-center justify-center border-t border-brand-primary/50">
            {isPlaying && activeGame.launch.browser ? (
              <iframe
                id="game-frame"
                src={activeGame.launch.browser}
                title={activeGame.title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; focus-without-user-activation *"
              />
            ) : (
              <PlaceholderRect
                label={`${activeGame.title.toUpperCase()} · GAMEPLAY PREVIEW`}
                sublabel="CLICK 'LAUNCH GAME IN BROWSER' TO RUN WEBGL BUILD DIRECTLY"
                aspectRatio="w-full h-full"
                className="border-0 bg-brand-primary/10"
              >
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="mt-4 inline-flex items-center gap-2 border border-brand-primary px-4 py-2 text-xs font-mono tracking-widest uppercase hover:bg-brand-primary hover:text-brand-cream transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start WebGL Build</span>
                </button>
              </PlaceholderRect>
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
