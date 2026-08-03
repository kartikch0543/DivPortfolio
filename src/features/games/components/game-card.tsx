import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Gamepad2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getPrimaryLaunch } from "@/lib/game-launch";
import { cn } from "@/lib/utils";
import type { Game } from "@/types/game";

export function GameCard({ game }: { game: Game }) {
  const primaryLaunch = getPrimaryLaunch(game);
  return (
    <article className="group border-border bg-surface overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          alt={`${game.title} cover`}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={game.coverImage}
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold">{game.title}</h2>
          <Badge variant={game.status === "released" ? "success" : "outline"}>
            {game.status.replace("-", " ")}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          {game.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {game.genre.map((genre) => (
            <Badge key={genre} variant="outline">
              {genre}
            </Badge>
          ))}
          <Badge variant="outline">{game.engine}</Badge>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-muted-foreground text-xs">
            {game.estimatedPlaytime}
          </span>
          <div className="flex gap-2">
            {primaryLaunch ? (
              <a
                aria-label={`${primaryLaunch.label}: ${game.title}`}
                className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
                href={primaryLaunch.href}
                rel="noreferrer"
                target="_blank"
              >
                <Gamepad2 aria-hidden="true" className="size-3.5" />
                Play
              </a>
            ) : null}
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href={`/games/${game.slug}`}
            >
              Details
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
