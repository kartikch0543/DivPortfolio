import type { Game, LaunchTargets } from "@/types/game";

export const launchTargetLabels: Record<keyof LaunchTargets, string> = {
  browser: "Play in browser",
  webgl: "Play WebGL build",
  playStore: "Google Play",
  steam: "Steam",
  github: "View source",
};

export function getPrimaryLaunch(game: Game) {
  const target = (Object.keys(game.launch) as (keyof LaunchTargets)[]).find(
    (key) => game.launch[key],
  );
  return target
    ? { target, href: game.launch[target] as string, label: launchTargetLabels[target] }
    : null;
}
