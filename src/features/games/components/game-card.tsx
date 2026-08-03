import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Gamepad2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPrimaryLaunch } from "@/lib/game-launch";
import type { Game } from "@/types/game";

export function GameCard({ game }: { game: Game }) {
  const primaryLaunch = getPrimaryLaunch(game);

  return (
    <article className="group dark:bg-slate-900/80 bg-white dark:border-slate-800 border-slate-200 hover:border-purple-500/60 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover-lift flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden dark:bg-slate-950 bg-slate-100">
        <Image
          alt={`${game.title} cover`}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={game.coverImage}
        />
        <div className="absolute top-3 right-3">
          <Badge className="dark:bg-purple-950/90 bg-purple-100 dark:text-purple-300 text-purple-900 dark:border-purple-800 border-purple-300 text-[10px] font-mono uppercase px-2 py-0.5 shadow-xs">
            {game.status.replace("-", " ")}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-pixel text-lg dark:text-white text-slate-900 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {game.title}
          </h3>
          <p className="dark:text-slate-400 text-slate-600 mt-1 text-xs leading-relaxed line-clamp-2 font-sans">
            {game.description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {game.genre.map((g) => (
              <span key={g} className="px-2 py-0.5 rounded text-[10px] font-mono dark:bg-slate-800 bg-slate-100 dark:text-slate-300 text-slate-700 dark:border-transparent border border-slate-200">
                {g}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded text-[10px] font-mono dark:bg-purple-950/60 bg-purple-50 dark:text-purple-300 text-purple-800 dark:border-purple-800/60 border border-purple-200">
              {game.engine}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 dark:border-slate-800/80 border-slate-200 border-t">
            <span className="text-[10px] font-mono dark:text-slate-400 text-slate-600">
              {game.estimatedPlaytime}
            </span>
            <div className="flex items-center gap-2">
              {primaryLaunch && (
                <Link
                  href={`/games/${game.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs transition shadow-xs"
                >
                  <Gamepad2 className="w-3.5 h-3.5" /> Play
                </Link>
              )}
              <Link
                href={`/games/${game.slug}`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-800 text-xs transition border border-slate-200 dark:border-transparent"
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
