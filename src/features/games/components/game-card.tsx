import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Gamepad2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPrimaryLaunch } from "@/lib/game-launch";
import type { Game } from "@/types/game";

export function GameCard({ game }: { game: Game }) {
  const primaryLaunch = getPrimaryLaunch(game);

  return (
    <article className="group bg-slate-900/70 border border-slate-800 hover:border-purple-500/60 rounded-xl overflow-hidden shadow-lg transition-all hover-lift flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <Image
          alt={`${game.title} cover`}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={game.coverImage}
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-purple-950/80 text-purple-300 border-purple-800 text-[10px] font-mono uppercase px-2 py-0.5">
            {game.status.replace("-", " ")}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-pixel text-lg text-white group-hover:text-purple-400 transition-colors">
            {game.title}
          </h3>
          <p className="text-slate-400 mt-1 text-xs leading-relaxed line-clamp-2">
            {game.description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {game.genre.map((g) => (
              <span key={g} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                {g}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 text-purple-300 border border-purple-800/60">
              {game.engine}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-500">
              {game.estimatedPlaytime}
            </span>
            <div className="flex items-center gap-2">
              {primaryLaunch && (
                <Link
                  href={`/games/${game.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs transition"
                >
                  <Gamepad2 className="w-3.5 h-3.5" /> Play
                </Link>
              )}
              <Link
                href={`/games/${game.slug}`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
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
