import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { GameCard } from "@/features/games/components/game-card";
import { statistics, technologies } from "@/data/site-content";
import { featuredGames } from "@/data/games";
import { Gamepad2, Sparkles, ShieldCheck, Users, Trophy, Star, Sparkle, Terminal, Layers, Code, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Top Game World Banner Header (Inspired directly by Divyanshu's itch.io Banner) */}
      <div className="relative border-b-4 border-indigo-950 dark:border-indigo-600 bg-gradient-to-b from-sky-400 via-sky-300 to-indigo-900 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-950 text-white py-12 sm:py-16 overflow-hidden">
        {/* Pixel World Grid & Mountain Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.3),transparent_70%)] pointer-events-none" />

        <Container className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="bg-indigo-950/80 dark:bg-slate-950/90 border-3 border-amber-400 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.8)] backdrop-blur-md">
            {/* Top Stage Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-indigo-950 text-xs font-mono font-bold border-2 border-indigo-950 shadow-xs">
              <Trophy className="w-4 h-4 fill-indigo-950" />
              <span>INDIE GAME STUDIO & GAMEPLAY PROGRAMMER PORTFOLIO</span>
            </div>

            {/* Character & Title Banner */}
            <div className="space-y-3">
              <h1 className="font-pixel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider uppercase text-white drop-shadow-[4px_4px_0px_rgba(30,27,75,1)]">
                DIVYANSHU KUMAR
              </h1>
              <p className="font-pixel text-amber-400 text-sm sm:text-lg tracking-widest uppercase flex items-center justify-center gap-2">
                <span>—</span> 🎮 GAMEPLAY PROGRAMMER <span>—</span>
              </p>
            </div>

            {/* Game Tech Engines Badges (Unity, Godot, C#) */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-900/90 border-2 border-indigo-400 text-white text-xs font-mono font-bold shadow-xs">
                <Layers className="w-4 h-4 text-cyan-400" /> UNITY
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-900/90 border-2 border-indigo-400 text-white text-xs font-mono font-bold shadow-xs">
                <Zap className="w-4 h-4 text-emerald-400" /> GODOT
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-900/90 border-2 border-indigo-400 text-white text-xs font-mono font-bold shadow-xs">
                <Code className="w-4 h-4 text-purple-400" /> C# PROGRAMMING
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/games"
                className="inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-indigo-950 font-pixel font-bold text-lg px-8 py-3.5 rounded-full border-3 border-indigo-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:scale-105"
              >
                <Gamepad2 className="w-5 h-5" /> PLAY MY GAMES
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 bg-white text-indigo-950 font-pixel font-bold text-sm px-6 py-3.5 rounded-full border-2 border-indigo-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.3)] transition-all hover:scale-105"
              >
                <Users className="w-4 h-4 text-purple-600" /> Community Reviews
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container className="space-y-12 py-12">
        {/* Game Featured Showcase: Tiny Together & Split You (Inspired by Pinterest Game Scene UI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tiny Together World Card */}
          <div className="bg-white dark:bg-slate-900 border-3 border-emerald-600 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(30,27,75,1)] dark:shadow-[4px_4px_0px_0px_rgba(34,197,94,0.4)] flex flex-col">
            <div className="bg-emerald-600 px-4 py-2 text-white flex items-center justify-between font-mono font-bold text-xs">
              <span className="font-pixel text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" /> STAGE 1: TINY TOGETHER
              </span>
              <span className="bg-amber-400 text-indigo-950 px-2 py-0.5 rounded text-[10px] uppercase font-bold">CO-OP PUZZLE</span>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-pixel text-xl text-indigo-950 dark:text-white font-bold">
                  Mom & Son Co-Op Platformer
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-medium">
                  A heartwarming co-op puzzle platformer built with responsive custom physics, synchronized lever puzzles, and joint character momentum.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t-2 border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Engine: Unity / WebGL</span>
                <Link
                  href="/games/tiny-together"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-indigo-950 font-pixel font-bold text-xs rounded-full border-2 border-indigo-950 shadow-xs"
                >
                  PLAY NOW →
                </Link>
              </div>
            </div>
          </div>

          {/* Split You World Card */}
          <div className="bg-white dark:bg-slate-900 border-3 border-purple-600 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(30,27,75,1)] dark:shadow-[4px_4px_0px_0px_rgba(168,85,247,0.4)] flex flex-col">
            <div className="bg-purple-700 px-4 py-2 text-white flex items-center justify-between font-mono font-bold text-xs">
              <span className="font-pixel text-sm flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-300 fill-cyan-300" /> STAGE 2: ULTA HE KREGA
              </span>
              <span className="bg-cyan-400 text-indigo-950 px-2 py-0.5 rounded text-[10px] uppercase font-bold">COMEDY ARCADE</span>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-pixel text-xl text-indigo-950 dark:text-white font-bold">
                  Arcade Comedy & Emergent Loops
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-medium">
                  Fast-paced arcade game with subverted controls, instant restart button, comic sound design, and instant browser WebGL execution.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t-2 border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">Engine: Unity / WebGL</span>
                <Link
                  href="/games/ulta-he-krega"
                  className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-indigo-950 font-pixel font-bold text-xs rounded-full border-2 border-indigo-950 shadow-xs"
                >
                  PLAY NOW →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 16-Bit Studio Stats Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-pixel text-xl sm:text-2xl font-bold text-indigo-950 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-sky-500" /> STUDIO STATS & GAME METRICS
            </h2>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">100% INDIE</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statistics.map((statistic) => (
              <div
                className="bg-white dark:bg-slate-900 border-3 border-indigo-950 dark:border-indigo-500 rounded-2xl p-5 space-y-1 shadow-[4px_4px_0px_0px_rgba(30,27,75,1)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] hover:scale-103 transition-transform"
                key={statistic.label}
              >
                <div className="flex justify-between items-center text-xs text-amber-500 font-mono">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>★</span>
                </div>
                <p className="font-pixel text-blue-600 dark:text-cyan-400 text-3xl font-bold">{statistic.value}</p>
                <p className="text-slate-700 dark:text-slate-300 text-xs font-mono font-bold uppercase">{statistic.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Games Catalog Grid */}
        <Section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-pixel text-indigo-950 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> ALL GAMES CATALOG
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Click any title to launch and play directly in your browser</p>
            </div>
            <Link
              href="/games"
              className="text-xs font-mono font-bold text-indigo-950 dark:text-cyan-300 hover:underline flex items-center gap-1 bg-amber-400 dark:bg-slate-900 px-4 py-2 rounded-full border-2 border-indigo-950 shadow-xs"
            >
              BROWSE CATALOG →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {featuredGames.map((game) => (
              <GameCard game={game} key={game.slug} />
            ))}
          </div>
        </Section>

        {/* Technology Stack Badges */}
        <Section className="bg-white dark:bg-slate-900 border-3 border-indigo-950 dark:border-indigo-500 rounded-2xl p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(30,27,75,1)]">
          <div className="flex items-center justify-between border-b-2 border-indigo-950/10 dark:border-slate-800 pb-3 text-xs font-mono font-bold text-indigo-950 dark:text-cyan-300">
            <span className="font-pixel text-sm flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-emerald-500 fill-emerald-500" /> ENGINE & TECH STACK
            </span>
            <span>UNITY • GODOT • C# • NEXT.JS</span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-slate-800 text-indigo-950 dark:text-slate-200 border-2 border-indigo-950/30 dark:border-slate-700 shadow-xs"
              >
                ✨ {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* Connect Banner */}
        <Section className="text-center space-y-4">
          <div className="bg-gradient-to-r from-sky-300 via-indigo-200 to-emerald-200 dark:from-slate-900 dark:to-indigo-950 border-3 border-indigo-950 rounded-3xl p-8 max-w-2xl mx-auto space-y-4 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(30,27,75,1)]">
            <div className="flex justify-center items-center gap-2 text-indigo-950 dark:text-cyan-300 font-mono text-xs font-bold">
              <Sparkle className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="uppercase tracking-wider">KD ARCADE CONNECT</span>
              <Sparkle className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <h2 className="font-pixel text-2xl text-indigo-950 dark:text-white font-bold">GET IN TOUCH WITH DIVYANSHU! 🎮</h2>
            <p className="text-slate-800 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto font-medium">
              Have feedback, questions, or collaboration proposals? Send a message directly.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                className="px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-indigo-950 font-pixel font-bold rounded-full text-xs sm:text-sm transition-all hover:scale-105 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] border-2 border-indigo-950"
                href="/contact"
              >
                <ShieldCheck className="w-4.5 h-4.5" /> CONTACT DEVELOPER
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
