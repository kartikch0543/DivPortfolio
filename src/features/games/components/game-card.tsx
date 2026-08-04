import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Gamepad2, Sparkles, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPrimaryLaunch } from "@/lib/game-launch";
import type { Game } from "@/types/game";

export function GameCard({ game }: { game: Game }) {
  const primaryLaunch = getPrimaryLaunch(game);
  const isTinyTogether = game.slug === "tiny-together";

  return (
    <article className="group bg-white dark:bg-slate-900 border-3 border-indigo-950 dark:border-indigo-500 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(30,27,75,1)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(30,27,75,1)] hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {/* 16-Bit Stage Select Header Bar */}
      <div className={`flex items-center justify-between px-3.5 py-2 border-b-3 border-indigo-950 dark:border-indigo-500 text-xs font-mono font-bold text-white ${
        isTinyTogether
          ? "bg-gradient-to-r from-emerald-600 to-green-500"
          : "bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500"
      }`}>
        <span className="flex items-center gap-1.5 font-pixel text-xs tracking-wide">
          {isTinyTogether ? <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> : <Zap className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300" />}
          STAGE: {game.title.toUpperCase()}
        </span>
        <div className="flex items-center gap-1 text-[10px]">
          <Star className="w-3 h-3 fill-amber-300 text-amber-300" /> 5.0
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <Image
          alt={`${game.title} cover`}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={game.coverImage}
        />
        <div className="absolute top-2.5 right-2.5">
          <Badge className="bg-amber-400 text-indigo-950 border-2 border-indigo-950 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 shadow-xs">
            {game.status.replace("-", " ")}
          </Badge>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-pixel text-lg dark:text-white text-indigo-950 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors font-bold">
            {game.title}
          </h3>
          <p className="dark:text-slate-300 text-slate-700 mt-1 text-xs leading-relaxed line-clamp-2 font-sans font-medium">
            {game.description}
          </p>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {game.genre.map((g) => (
              <span key={g} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-50 dark:bg-slate-800 text-indigo-950 dark:text-slate-200 border border-indigo-950/30 dark:border-slate-700 font-bold">
                {g}
              </span>
            ))}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-100 dark:bg-cyan-950/80 text-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 font-bold">
              {game.engine}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2.5 border-t-2 border-indigo-950/10 dark:border-slate-800">
            <span className="text-[10px] font-mono text-indigo-900 dark:text-slate-400 font-bold">
              ⏱ {game.estimatedPlaytime}
            </span>
            <div className="flex items-center gap-2">
              {primaryLaunch && (
                <Link
                  href={`/games/${game.slug}`}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-indigo-950 font-pixel font-bold text-xs transition-all hover:scale-105 shadow-[3px_3px_0px_0px_rgba(30,27,75,1)] border-2 border-indigo-950"
                >
                  <Gamepad2 className="w-3.5 h-3.5" /> PLAY
                </Link>
              )}
              <Link
                href={`/games/${game.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-950 dark:text-slate-200 text-xs font-mono font-bold transition-all border border-indigo-950/30 dark:border-slate-700"
              >
                DETAILS <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
