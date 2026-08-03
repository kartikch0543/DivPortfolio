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
      {/* Ambient Pixel Glow Backdrops inspired by Split You */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pixel-glow-purple pointer-events-none -z-10" />

      {/* Hero Section */}
      <Container className="py-12 sm:py-16 relative">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pixel-float" />
            <span>Independent Game Studio & Publishing Platform</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Small Worlds. <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-sky-400 bg-clip-text text-transparent">
              Big Curiosity.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
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
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium px-4 py-2.5 rounded-lg text-xs sm:text-sm transition hover-lift"
            >
              <Users className="w-4 h-4 text-purple-400" /> Community Hub
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-2 transition"
            >
              Meet Developer <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>

      <Container className="space-y-12">
        {/* Featured Games Section */}
        <Section className="border-slate-800/80 border-t pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-pixel text-white flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-purple-400" /> Featured Releases
              </h2>
              <p className="text-xs text-slate-400 mt-1">Play instant HTML5 / WebGL games in your browser</p>
            </div>
            <Link
              href="/games"
              className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
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
        <Section className="border-slate-800/80 border-t grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-pixel text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-pink-400" /> Player-First Craftsmanship
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {developer.philosophy} {developer.careerGoal}
            </p>
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Engine & Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <Badge key={technology} variant="outline" className="bg-slate-900/80 border-slate-800 text-slate-300 text-xs font-mono">
                    {technology}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {statistics.map((statistic) => (
              <div
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-1 hover-lift"
                key={statistic.label}
              >
                <p className="font-pixel text-purple-400 text-2xl font-bold">{statistic.value}</p>
                <p className="text-slate-400 text-xs font-mono">{statistic.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Development Timeline Section */}
        <Section className="border-slate-800/80 border-t space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-pixel text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-400" /> Studio Journey & Timeline
          </h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <li className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2 hover-lift" key={item.year}>
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-xs text-pink-400 px-2 py-0.5 rounded bg-pink-950/60 border border-pink-800 font-mono">
                    {item.year}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-white">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Newsletter & Follow CTA Banner */}
        <Section className="border-slate-800/80 border-t text-center space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto space-y-4 relative overflow-hidden backdrop-blur">
            <div className="absolute -top-12 -right-12 w-40 h-40 pixel-glow-pink pointer-events-none" />
            <h2 className="font-pixel text-xl sm:text-2xl text-white">Stay In The Loop</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
              Follow devlogs, upcoming game releases, physics experiments, and netcode updates.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg text-xs transition hover-lift flex items-center gap-2"
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
