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
      embedded: browserBuild.runtime !== "external",
    };
  if (game.launch.webgl)
    return { runtime: "unity-webgl", url: game.launch.webgl, embedded: true };
  if (game.launch.browser)
    return { runtime: "external", url: game.launch.browser, embedded: false };
  return { runtime: "unavailable", url: null, embedded: false };
}
