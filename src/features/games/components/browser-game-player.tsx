import { ExternalLink, MonitorPlay, ShieldAlert } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { getLaunchPlan } from "@/features/game-platform/services/launch-manager";
import type { Game } from "@/types/game";

export function BrowserGamePlayer({ game }: { game: Game }) {
  const launchPlan = getLaunchPlan(game);
  if (launchPlan.embedded)
    return (
      <iframe
        allowFullScreen
        className="border-border aspect-video w-full rounded-lg border bg-black"
        src={launchPlan.url}
        title={`${game.title} game player`}
      />
    );
  if (launchPlan.runtime === "external" && launchPlan.url)
    return (
      <section className="border-border bg-surface rounded-lg border p-8 text-center">
        <MonitorPlay aria-hidden="true" className="text-secondary mx-auto size-8" />
        <h2 className="mt-4 text-xl font-semibold">Play {game.title} on itch.io</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          This game opens in its current external browser home.
        </p>
        <a
          className={`${buttonVariants({ variant: "secondary" })} mt-5`}
          href={launchPlan.url}
          rel="noreferrer"
          target="_blank"
        >
          Launch game <ExternalLink aria-hidden="true" className="size-4" />
        </a>
      </section>
    );
  return (
    <section className="border-border bg-surface rounded-lg border p-8 text-center">
      <ShieldAlert aria-hidden="true" className="text-warning mx-auto size-8" />
      <h2 className="mt-4 text-xl font-semibold">
        This game is not available in a browser yet
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Check back for a supported build or download option.
      </p>
    </section>
  );
}
