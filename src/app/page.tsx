import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/features/games/components/game-card";
import { developer, statistics, technologies, timeline } from "@/data/site-content";
import { featuredGames } from "@/data/games";
import { Gamepad2, Sparkles, ArrowRight, ShieldCheck, Terminal, Users, Cpu, Heart, Star, Sparkle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <Container className="py-10 sm:py-16 relative">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-purple-950/80 border-2 border-pink-300 dark:border-purple-800 text-pink-900 dark:text-purple-300 text-xs font-mono font-bold shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            <span>Cute Independent Game Studio & Playful Arcade</span>
            <span className="text-pink-400 font-normal">♡ ♡ ♡</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl lg:text-6xl text-indigo-950 dark:text-white tracking-tight leading-tight font-bold">
            Small Worlds. <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-sky-400 bg-clip-text text-transparent">
              Big Curiosity. ✨
            </span>
          </h1>

          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans font-medium">
            KD Arcade makes cute, expressive HTML5/WebGL and desktop games that combine retro pixel-art charm with playful physics and cozy cloud saves.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/games"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(67,56,202,0.25)] transition-all hover:scale-105 border-2 border-indigo-900/30"
            >
              <Gamepad2 className="w-4.5 h-4.5" /> Explore Arcade Games
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border-2 border-indigo-900/30 dark:border-purple-800 text-indigo-950 dark:text-slate-200 font-semibold px-5 py-3 rounded-full text-xs sm:text-sm transition-all hover:scale-105 shadow-[3px_3px_0px_0px_rgba(67,56,202,0.12)]"
            >
              <Users className="w-4 h-4 text-purple-500" /> Community Hub
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-300 hover:text-pink-600 dark:hover:text-pink-400 px-3 py-2 transition"
            >
              Meet Developer <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>

      <Container className="space-y-12">
        {/* Featured Games Section */}
        <Section className="border-t-2 border-indigo-900/10 dark:border-purple-800/30 pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-pixel text-indigo-950 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" /> Featured Games Catalog
                </h2>
                <span className="text-xs text-pink-400 font-mono hidden sm:inline">♡ ♡</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Play instant HTML5 / WebGL games in your browser</p>
            </div>
            <Link
              href="/games"
              className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1 bg-purple-50 dark:bg-purple-950/60 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800"
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

        {/* Studio Statistics & Technology Stack */}
        <Section className="border-t-2 border-indigo-900/10 dark:border-purple-800/30 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 bg-white dark:bg-slate-900 border-2 border-indigo-900/30 dark:border-purple-800/50 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(67,56,202,0.12)]">
            {/* Retro Window Title Bar */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-900/10 dark:border-purple-800/30 text-xs font-mono font-bold text-indigo-900 dark:text-purple-300">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-pink-500" /> Player-First Craftsmanship
              </span>
              <span className="text-[10px] opacity-70">CONCEPT #1</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
              {developer.philosophy} {developer.careerGoal}
            </p>
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase text-purple-700 dark:text-purple-300 font-bold tracking-wider">
                Engine & Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <Badge key={technology} variant="outline" className="bg-purple-50 dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-purple-900 dark:text-slate-200 text-xs font-mono font-semibold rounded-full px-3 py-1">
                    ✨ {technology}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {statistics.map((statistic) => (
              <div
                className="bg-white dark:bg-slate-900 border-2 border-indigo-900/30 dark:border-purple-800/50 rounded-2xl p-5 space-y-1 shadow-[4px_4px_0px_0px_rgba(67,56,202,0.12)] hover-bounce"
                key={statistic.label}
              >
                <div className="flex justify-between items-center text-xs text-pink-400 font-mono">
                  <Star className="w-3.5 h-3.5 fill-pink-400" />
                  <span>♡</span>
                </div>
                <p className="font-pixel text-purple-600 dark:text-purple-400 text-3xl font-bold">{statistic.value}</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs font-mono font-semibold">{statistic.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Development Timeline Section */}
        <Section className="border-t-2 border-indigo-900/10 dark:border-purple-800/30 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-pixel text-indigo-950 dark:text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-500" /> Studio Journey & Timeline
          </h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <li className="bg-white dark:bg-slate-900 border-2 border-indigo-900/30 dark:border-purple-800/50 rounded-2xl p-5 space-y-2 shadow-[4px_4px_0px_0px_rgba(67,56,202,0.12)] hover-bounce" key={item.year}>
                <div className="flex items-center justify-between border-b-2 border-indigo-900/10 dark:border-purple-800/30 pb-2">
                  <span className="font-pixel text-xs text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 border border-pink-300 dark:border-pink-800 font-mono font-bold">
                    {item.year}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">♡ ♡ ♡</span>
                </div>
                <h3 className="font-semibold text-sm text-indigo-950 dark:text-white font-pixel">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">{item.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Newsletter & Follow CTA Banner */}
        <Section className="border-t-2 border-indigo-900/10 dark:border-purple-800/30 text-center space-y-4">
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-sky-100 dark:from-slate-900 dark:to-purple-950 border-2 border-indigo-900/30 dark:border-purple-800/60 rounded-3xl p-8 max-w-2xl mx-auto space-y-4 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(67,56,202,0.15)]">
            <div className="flex justify-center items-center gap-2 text-pink-500 font-mono text-xs">
              <Sparkle className="w-4 h-4 fill-pink-500" />
              <span className="font-bold uppercase tracking-wider">KD Arcade Newsletter</span>
              <Sparkle className="w-4 h-4 fill-pink-500" />
            </div>
            <h2 className="font-pixel text-xl sm:text-2xl text-indigo-950 dark:text-white font-bold">Stay In The Cute Loop! ♡</h2>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto font-medium">
              Follow devlogs, upcoming cute game releases, physics experiments, and netcode updates.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-xs transition-all hover:scale-105 flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(67,56,202,0.2)] border-2 border-indigo-900/30"
                href="/contact"
              >
                <ShieldCheck className="w-4 h-4" /> Connect with KD Arcade
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
