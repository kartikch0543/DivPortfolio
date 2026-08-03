import { ExternalLink, MonitorPlay } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { Game } from "@/types/game";

export function BrowserGamePlayer({ game }: { game: Game }) {
  if (game.launch.webgl)
    return (
      <iframe
        allowFullScreen
        className="border-border aspect-video w-full rounded-lg border bg-black"
        src={game.launch.webgl}
        title={`${game.title} game player`}
      />
    );
  if (game.launch.browser)
    return (
      <section className="border-border bg-surface rounded-lg border p-8 text-center">
        <MonitorPlay aria-hidden="true" className="text-secondary mx-auto size-8" />
        <h2 className="mt-4 text-xl font-semibold">Play {game.title} on itch.io</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          This game opens in its current external browser home.
        </p>
        <a
          className={`${buttonVariants({ variant: "secondary" })} mt-5`}
          href={game.launch.browser}
          rel="noreferrer"
          target="_blank"
        >
          Launch game <ExternalLink aria-hidden="true" className="size-4" />
        </a>
      </section>
    );
  return null;
}
