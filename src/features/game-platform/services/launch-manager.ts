import type { Game } from "@/types/game";
import type { BrowserBuild, GameRuntime } from "@/types/game-platform";

export type LaunchPlan =
  | { runtime: GameRuntime; url: string; embedded: boolean }
  | { runtime: "unavailable"; url: null; embedded: false };

export function getLaunchPlan(game: Game, browserBuild?: BrowserBuild): LaunchPlan {
  if (browserBuild?.url)
    return {
      runtime: browserBuild.runtime,
      url: browserBuild.url,
      embedded: true,
    };
  if (game.launch.webgl)
    return { runtime: "unity-webgl", url: game.launch.webgl, embedded: true };
  if (game.launch.browser)
    return { runtime: "html5", url: game.launch.browser, embedded: true };
  return { runtime: "unavailable", url: null, embedded: false };
}
