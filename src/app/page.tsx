import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/features/games/components/game-card";
import { developer, statistics, technologies, timeline } from "@/data/site-content";
import { featuredGames } from "@/data/games";
import { Gamepad2, Sparkles, ArrowRight, ShieldCheck, Terminal, Users, Cpu } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient Pixel Glow Backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pixel-glow-purple pointer-events-none -z-10" />

      {/* Hero Section */}
      <Container className="py-12 sm:py-16 relative">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-purple-950/80 bg-purple-100 dark:border-purple-800 border-purple-300 dark:text-purple-300 text-purple-900 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pixel-float" />
            <span>Independent Game Studio & Publishing Platform</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl lg:text-6xl dark:text-white text-slate-900 tracking-tight leading-tight">
            Small Worlds. <br />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
              Big Curiosity.
            </span>
          </h1>

          <p className="dark:text-slate-300 text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            KD Arcade creates playful, expressive HTML5/WebGL and desktop games that combine retro pixel-art charm with modern physics and cloud saves.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/games"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-5 py-2.5 rounded-lg text-xs sm:text-sm shadow-lg shadow-purple-600/25 transition-all hover-lift"
            >
              <Gamepad2 className="w-4 h-4" /> Explore Arcade Games
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 dark:text-slate-200 text-slate-800 font-medium px-4 py-2.5 rounded-lg text-xs sm:text-sm transition hover-lift shadow-sm"
            >
              <Users className="w-4 h-4 text-purple-500" /> Community Hub
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-mono dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 px-3 py-2 transition"
            >
              Meet Developer <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>

      <Container className="space-y-12">
        {/* Featured Games Section */}
        <Section className="dark:border-slate-800/80 border-slate-200 border-t pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-pixel dark:text-white text-slate-900 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-purple-500" /> Featured Releases
              </h2>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-1">Play instant HTML5 / WebGL games in your browser</p>
            </div>
            <Link
              href="/games"
              className="text-xs font-mono text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
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
        <Section className="dark:border-slate-800/80 border-slate-200 border-t grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-pixel dark:text-white text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-pink-500" /> Player-First Craftsmanship
            </h2>
            <p className="dark:text-slate-300 text-slate-700 text-xs sm:text-sm leading-relaxed">
              {developer.philosophy} {developer.careerGoal}
            </p>
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase dark:text-slate-400 text-slate-600 tracking-wider">
                Engine & Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <Badge key={technology} variant="outline" className="dark:bg-slate-900/80 bg-white dark:border-slate-800 border-slate-300 dark:text-slate-300 text-slate-800 text-xs font-mono shadow-xs">
                    {technology}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {statistics.map((statistic) => (
              <div
                className="dark:bg-slate-900/60 bg-white dark:border-slate-800 border-slate-200 rounded-xl p-5 space-y-1 hover-lift shadow-sm"
                key={statistic.label}
              >
                <p className="font-pixel text-purple-600 dark:text-purple-400 text-2xl font-bold">{statistic.value}</p>
                <p className="dark:text-slate-400 text-slate-600 text-xs font-mono">{statistic.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Development Timeline Section */}
        <Section className="dark:border-slate-800/80 border-slate-200 border-t space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-pixel dark:text-white text-slate-900 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-500" /> Studio Journey & Timeline
          </h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <li className="dark:bg-slate-900/60 bg-white dark:border-slate-800 border-slate-200 rounded-xl p-5 space-y-2 hover-lift shadow-sm" key={item.year}>
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-xs text-pink-600 dark:text-pink-400 px-2 py-0.5 rounded dark:bg-pink-950/60 bg-pink-100 dark:border-pink-800 border-pink-300 font-mono">
                    {item.year}
                  </span>
                </div>
                <h3 className="font-semibold text-sm dark:text-white text-slate-900">{item.title}</h3>
                <p className="dark:text-slate-400 text-slate-600 text-xs leading-relaxed">{item.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Newsletter & Follow CTA Banner */}
        <Section className="dark:border-slate-800/80 border-slate-200 border-t text-center space-y-4">
          <div className="dark:bg-slate-900/50 bg-white dark:border-slate-800 border-slate-200 rounded-2xl p-8 max-w-2xl mx-auto space-y-4 relative overflow-hidden backdrop-blur shadow-md">
            <div className="absolute -top-12 -right-12 w-40 h-40 pixel-glow-pink pointer-events-none" />
            <h2 className="font-pixel text-xl sm:text-2xl dark:text-white text-slate-900">Stay In The Loop</h2>
            <p className="dark:text-slate-400 text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
              Follow devlogs, upcoming game releases, physics experiments, and netcode updates.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg text-xs transition hover-lift flex items-center gap-2 shadow-md"
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
