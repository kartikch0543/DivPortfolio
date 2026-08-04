import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Gamepad2, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPrimaryLaunch } from "@/lib/game-launch";
import type { Game } from "@/types/game";

export function GameCard({ game }: { game: Game }) {
  const primaryLaunch = getPrimaryLaunch(game);

  return (
    <article className="group dark:bg-slate-900 bg-white border-2 border-indigo-900/30 dark:border-purple-800/50 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(67,56,202,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(192,132,252,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(67,56,202,0.25)] hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {/* Cute Retro Window Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-indigo-100/80 dark:bg-purple-950/80 border-b-2 border-indigo-900/20 dark:border-purple-800/40 text-[10px] font-mono font-bold text-indigo-900 dark:text-purple-300">
        <span className="flex items-center gap-1">
          <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> {game.title}
        </span>
        <div className="flex items-center gap-1 text-[9px] opacity-70">
          <span>♡</span>
          <span>♡</span>
          <span>♡</span>
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950">
        <Image
          alt={`${game.title} cover`}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={game.coverImage}
        />
        <div className="absolute top-2.5 right-2.5">
          <Badge className="bg-pink-100 dark:bg-pink-950/90 text-pink-900 dark:text-pink-300 border border-pink-300 dark:border-pink-800 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
            {game.status.replace("-", " ")}
          </Badge>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-pixel text-lg dark:text-white text-indigo-950 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {game.title}
          </h3>
          <p className="dark:text-slate-400 text-slate-600 mt-1 text-xs leading-relaxed line-clamp-2 font-sans">
            {game.description}
          </p>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {game.genre.map((g) => (
              <span key={g} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-50 dark:bg-slate-800 text-purple-900 dark:text-slate-300 border border-purple-200 dark:border-slate-700">
                {g}
              </span>
            ))}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-50 dark:bg-sky-950/80 text-sky-900 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              {game.engine}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t-2 border-indigo-900/10 dark:border-purple-800/30">
            <span className="text-[10px] font-mono text-purple-700 dark:text-slate-400 font-semibold">
              ⏱ {game.estimatedPlaytime}
            </span>
            <div className="flex items-center gap-2">
              {primaryLaunch && (
                <Link
                  href={`/games/${game.slug}`}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white font-bold text-xs transition-all hover:scale-105 shadow-xs border border-indigo-900/30"
                >
                  <Gamepad2 className="w-3.5 h-3.5" /> Play
                </Link>
              )}
              <Link
                href={`/games/${game.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 text-indigo-900 dark:text-slate-200 text-xs font-semibold transition-all border border-indigo-200 dark:border-slate-700"
              >
                Details <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
