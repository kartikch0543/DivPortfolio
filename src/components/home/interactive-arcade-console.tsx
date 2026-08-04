"use client";

import React, { useState } from "react";
import Link from "next/link";
import { games } from "@/data/games";
import { Gamepad2, Sparkles, ExternalLink, Play, Cpu, Layers, Maximize2 } from "lucide-react";

export function InteractiveArcadeConsole() {
  const [activeSlug, setActiveSlug] = useState(games[0]?.slug || "tiny-together");
  const [isPlaying, setIsPlaying] = useState(false);

  const activeGame = games.find((g) => g.slug === activeSlug) || games[0];
  const itchUrl = activeGame.launch.browser || `https://kdivyanshu.itch.io/${activeSlug}`;

  return (
    <div className="bg-indigo-950 dark:bg-slate-950 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-white relative overflow-hidden">
      {/* Console Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-amber-400/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-indigo-950 grid place-items-center font-bold shadow-xs">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-pixel text-lg sm:text-xl text-white font-bold tracking-wide flex items-center gap-2">
              DIVYANSHU&apos;S HANDHELD ARCADE <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            </h3>
            <p className="text-xs font-mono text-cyan-300">
              Interactive Game Developer Portfolio Console • Select Stage Below
            </p>
          </div>
        </div>

        {/* Stage Selector Buttons */}
        <div className="flex items-center gap-2">
          {games.map((g) => (
            <button
              key={g.slug}
              onClick={() => {
                setActiveSlug(g.slug);
                setIsPlaying(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all border-2 ${
                activeSlug === g.slug
                  ? "bg-amber-400 text-indigo-950 border-white shadow-xs scale-105"
                  : "bg-indigo-900/80 text-white border-indigo-700 hover:bg-indigo-800"
              }`}
            >
              🎮 {g.title}
            </button>
          ))}
        </div>
      </div>

      {/* Screen & Game Controls Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Boy Screen Frame */}
        <div className="lg:col-span-2 bg-slate-900 border-4 border-slate-700 rounded-2xl overflow-hidden shadow-inner flex flex-col relative min-h-[340px]">
          {/* Retro Screen Header */}
          <div className="bg-slate-950 px-4 py-2 border-b-2 border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              ● ACTIVE STAGE: {activeGame.title.toUpperCase()}
            </span>
            <span className="text-[10px]">FPS: 60 • ENGINE: {activeGame.engine.toUpperCase()}</span>
          </div>

          {/* Screen Content / Embedded Player */}
          <div className="flex-1 bg-slate-950 relative flex items-center justify-center p-6 text-center">
            {isPlaying ? (
              <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center space-y-4 p-4">
                <iframe
                  src={itchUrl}
                  className="w-full h-[280px] rounded-lg border-2 border-slate-700 bg-black"
                  title={activeGame.title}
                  allow="autoplay; fullscreen"
                />
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={itchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-pixel font-bold text-xs rounded-full border-2 border-indigo-950 flex items-center gap-1.5 shadow-xs"
                  >
                    PLAY ON ITCH.IO <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs rounded-full border border-slate-600"
                  >
                    Close Demo
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-md py-6">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-emerald-400 text-indigo-950 grid place-items-center mx-auto shadow-md">
                  <Play className="w-8 h-8 fill-indigo-950 translate-x-0.5" />
                </div>
                <div>
                  <h4 className="font-pixel text-xl text-white font-bold">{activeGame.title}</h4>
                  <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">{activeGame.description}</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={itchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-indigo-950 font-pixel font-bold text-xs rounded-full border-2 border-indigo-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:scale-105 flex items-center gap-1.5"
                  >
                    <Play className="w-4 h-4 fill-indigo-950" /> PLAY ON ITCH.IO <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="px-4 py-2.5 bg-indigo-800 hover:bg-indigo-700 text-white font-pixel font-bold text-xs rounded-full border-2 border-indigo-600 transition-all hover:scale-105 flex items-center gap-1.5"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> PREVIEW DEMO
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Handheld Game Boy Controls & Tech Specs */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="bg-indigo-900/60 border-2 border-indigo-700 rounded-2xl p-5 space-y-3">
            <h4 className="font-pixel text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> GAMEPLAY MECHANICS
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-200">
              {activeGame.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">▸</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* D-Pad & Action Buttons Visual Widget */}
          <div className="bg-indigo-900/60 border-2 border-indigo-700 rounded-2xl p-4 flex items-center justify-between">
            {/* D-Pad */}
            <div className="relative w-16 h-16 grid grid-cols-3 grid-rows-3 gap-0.5 bg-slate-800 p-1 rounded-xl">
              <div className="col-start-2 row-start-1 bg-slate-600 rounded-t" />
              <div className="col-start-1 row-start-2 bg-slate-600 rounded-l" />
              <div className="col-start-2 row-start-2 bg-slate-700" />
              <div className="col-start-3 row-start-2 bg-slate-600 rounded-r" />
              <div className="col-start-2 row-start-3 bg-slate-600 rounded-b" />
            </div>

            {/* A / B Action Buttons */}
            <div className="flex gap-2">
              <div className="w-9 h-9 rounded-full bg-rose-500 text-white font-pixel font-bold text-xs grid place-items-center shadow-xs">
                B
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-400 text-indigo-950 font-pixel font-bold text-xs grid place-items-center shadow-xs -translate-y-1">
                A
              </div>
            </div>
          </div>

          <Link
            href={`/games/${activeGame.slug}`}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-pixel font-bold text-xs rounded-full border-2 border-indigo-950 text-center transition-all flex items-center justify-center gap-1.5"
          >
            <Layers className="w-4 h-4" /> VIEW FULL GAME DETAILS
          </Link>
        </div>
      </div>
    </div>
  );
}
