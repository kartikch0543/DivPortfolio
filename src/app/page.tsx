import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { GameCard } from "@/features/games/components/game-card";
import { developer, statistics, technologies } from "@/data/site-content";
import { featuredGames } from "@/data/games";
import { Gamepad2, Sparkles, ShieldCheck, Users, Trophy, Heart, Star, Sparkle, Terminal } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-[#ebf3fa] dark:bg-[#0f121d] text-slate-900 dark:text-slate-100">
      {/* Pixel Sky Clouds Backdrop */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-sky-200/60 via-purple-100/30 to-transparent dark:from-purple-950/40 dark:to-transparent pointer-events-none" />

      {/* Hero Banner Section */}
      <Container className="py-12 sm:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Top Heart Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-950/40 dark:border-purple-600 text-indigo-950 dark:text-purple-300 text-xs font-mono font-bold shadow-[3px_3px_0px_0px_rgba(67,56,202,0.15)]">
            <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>PITCH DECK & INDIE ARCADE HUB</span>
            <span className="text-pink-500 font-bold flex gap-1">
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
            </span>
          </div>

          {/* Main Pixel Title */}
          <div className="space-y-2">
            <h1 className="font-pixel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider uppercase text-indigo-950 dark:text-white drop-shadow-sm">
              PIXEL <span className="bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">CONCEPT</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-indigo-900/80 dark:text-purple-300 tracking-widest uppercase">
              Cozy Pixel-Art Worlds • Interactive HTML5 Games • Indie Craftsmanship
            </p>
          </div>

          {/* START Action Pill Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/games"
              className="inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-indigo-950 font-pixel font-bold text-lg sm:text-xl px-10 py-3.5 rounded-full border-3 border-indigo-950 shadow-[4px_4px_0px_0px_rgba(30,27,75,1)] transition-all hover:scale-105 hover:-translate-y-0.5"
            >
              <Gamepad2 className="w-6 h-6" /> START PLAYING
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 text-indigo-950 dark:text-slate-200 font-pixel font-bold text-sm px-6 py-3.5 rounded-full border-2 border-indigo-950 dark:border-purple-600 shadow-[3px_3px_0px_0px_rgba(30,27,75,0.15)] transition-all hover:scale-105"
            >
              <Users className="w-4 h-4 text-purple-500" /> Community Hub
            </Link>
          </div>

          {/* Pixel City Skyline / Retro Landscape Graphic Bar */}
          <div className="mt-10 p-3 bg-gradient-to-r from-sky-300 via-purple-300 to-pink-300 dark:from-sky-950 dark:via-purple-900 dark:to-pink-950 rounded-2xl border-2 border-indigo-950/40 dark:border-purple-600/60 shadow-[4px_4px_0px_0px_rgba(67,56,202,0.15)] flex items-center justify-between text-xs font-mono font-bold text-indigo-950 dark:text-purple-200">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> RETRO ARCADE SPECIFICATION v2.0
            </span>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80">HTML5</span>
              <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80">WebGL</span>
              <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80">Unity</span>
            </div>
          </div>
        </div>
      </Container>

      <Container className="space-y-12 pb-16">
        {/* WELCOME & WHAT WE DO Section (Inspired by Pinterest Slide 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WELCOME 1. Window Box */}
          <div className="bg-white dark:bg-slate-900 border-2 border-indigo-950 dark:border-purple-700 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(30,27,75,0.2)] flex flex-col">
            <div className="bg-indigo-100 dark:bg-purple-950 px-4 py-2 border-b-2 border-indigo-950 dark:border-purple-700 flex items-center justify-between font-mono font-bold text-xs text-indigo-950 dark:text-purple-300">
              <span className="font-pixel text-sm">WELCOME 1.</span>
              <span className="flex gap-1 text-[10px]">♡ ♡ ♡</span>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-pixel text-xl text-indigo-950 dark:text-white font-bold mb-2">
                  Handcrafted Indie Gaming Experience
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-medium">
                  {developer.philosophy} KD Arcade focuses on intuitive puzzle physics, expressive character animation, and instant browser play.
                </p>
              </div>
              <div className="p-3 bg-indigo-50/70 dark:bg-slate-950 rounded-xl border border-indigo-200 dark:border-purple-800 text-xs font-mono text-purple-950 dark:text-purple-300 font-semibold flex items-center justify-between">
                <span>Developer: Divyanshu Kumar</span>
                <span className="text-emerald-600 dark:text-emerald-400">● Active</span>
              </div>
            </div>
          </div>

          {/* WHAT WE DO_? Window Box */}
          <div className="bg-white dark:bg-slate-900 border-2 border-indigo-950 dark:border-purple-700 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(30,27,75,0.2)] flex flex-col">
            <div className="bg-indigo-100 dark:bg-purple-950 px-4 py-2 border-b-2 border-indigo-950 dark:border-purple-700 flex items-center justify-between font-mono font-bold text-xs text-indigo-950 dark:text-purple-300">
              <span className="font-pixel text-sm">WHAT WE DO_?</span>
              <span className="flex gap-1 text-[10px]">♡ ♡ ♡</span>
            </div>
            <div className="p-6 space-y-3 flex-1">
              <ul className="space-y-2.5 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                <li className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-50 dark:bg-slate-800 border border-purple-200 dark:border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  <span>Instant Browser Playable WebGL & HTML5 Games</span>
                </li>
                <li className="flex items-center gap-2.5 p-2 rounded-xl bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>Community Reviews & Star Rating System</span>
                </li>
                <li className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Cloud Save State & Player Achievements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* NUMBERS / STATS Section (Inspired by Pinterest Slide 3) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-pixel text-xl sm:text-2xl font-bold text-indigo-950 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-sky-500" /> NUMBERS & METRICS
            </h2>
            <span className="text-xs font-mono text-pink-500 font-bold">♡ ♡ ♡</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statistics.map((statistic) => (
              <div
                className="bg-white dark:bg-slate-900 border-2 border-indigo-950 dark:border-purple-700 rounded-2xl p-5 space-y-1 shadow-[4px_4px_0px_0px_rgba(30,27,75,0.15)] hover:scale-103 transition-transform"
                key={statistic.label}
              >
                <div className="flex justify-between items-center text-xs text-pink-500 font-mono">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>♡</span>
                </div>
                <p className="font-pixel text-purple-600 dark:text-purple-400 text-3xl font-bold">{statistic.value}</p>
                <p className="text-slate-700 dark:text-slate-300 text-xs font-mono font-bold uppercase">{statistic.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Games Section (Inspired by Pinterest CONCEPT Slide 4) */}
        <Section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-pixel text-indigo-950 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" /> CONCEPT CATALOG
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Browse featured games with instant browser play</p>
            </div>
            <Link
              href="/games"
              className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border-2 border-indigo-950 dark:border-purple-700 shadow-xs"
            >
              All Releases →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {featuredGames.map((game) => (
              <GameCard game={game} key={game.slug} />
            ))}
          </div>
        </Section>

        {/* Studio Technology Stack (Inspired by Pinterest Slide 7 ANALYSIS) */}
        <Section className="bg-white dark:bg-slate-900 border-2 border-indigo-950 dark:border-purple-700 rounded-2xl p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(30,27,75,0.2)]">
          <div className="flex items-center justify-between border-b-2 border-indigo-950/10 dark:border-purple-700/50 pb-3 text-xs font-mono font-bold text-indigo-950 dark:text-purple-300">
            <span className="font-pixel text-sm flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-pink-500 fill-pink-500" /> TECH STACK & ENGINE INTEGRATION
            </span>
            <span>♡ ♡ ♡</span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-slate-800 text-indigo-950 dark:text-slate-200 border-2 border-indigo-950/20 dark:border-purple-700 shadow-xs"
              >
                ✨ {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* Newsletter / Connect Banner */}
        <Section className="text-center space-y-4">
          <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-sky-200 dark:from-slate-900 dark:to-purple-950 border-3 border-indigo-950 dark:border-purple-700 rounded-3xl p-8 max-w-2xl mx-auto space-y-4 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(30,27,75,0.25)]">
            <div className="flex justify-center items-center gap-2 text-pink-600 dark:text-pink-400 font-mono text-xs font-bold">
              <Sparkle className="w-4 h-4 fill-pink-500" />
              <span className="uppercase tracking-wider">KD Arcade Newsletter</span>
              <Sparkle className="w-4 h-4 fill-pink-500" />
            </div>
            <h2 className="font-pixel text-2xl text-indigo-950 dark:text-white font-bold">STAY IN THE LOOP! ♡</h2>
            <p className="text-slate-800 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto font-medium">
              Connect with Divyanshu Kumar for game launches, feedback, and collaboration.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                className="px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-indigo-950 font-pixel font-bold rounded-full text-xs sm:text-sm transition-all hover:scale-105 flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(30,27,75,1)] border-2 border-indigo-950"
                href="/contact"
              >
                <ShieldCheck className="w-4.5 h-4.5" /> CONNECT WITH US
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
