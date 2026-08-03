import { describe, expect, it } from "vitest";

import { games } from "@/data/games";
import { getPrimaryLaunch, launchTargetLabels } from "@/lib/game-launch";

describe("game launch utilities", () => {
  it("prefers the current browser target", () => {
    expect(getPrimaryLaunch(games[0])).toMatchObject({
      target: "browser",
      label: "Play in browser",
    });
  });

  it("labels every supported target", () => {
    expect(Object.keys(launchTargetLabels)).toEqual([
      "browser",
      "webgl",
      "playStore",
      "steam",
      "github",
    ]);
  });
});
