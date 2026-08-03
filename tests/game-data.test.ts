import { describe, expect, it } from "vitest";

import { games } from "@/data/games";

describe("game data", () => {
  it("has unique slugs and complete launch target keys", () => {
    expect(new Set(games.map((game) => game.slug)).size).toBe(games.length);
    for (const game of games) {
      expect(Object.keys(game.launch).sort()).toEqual([
        "browser",
        "github",
        "playStore",
        "steam",
        "webgl",
      ]);
      expect(game.title).not.toHaveLength(0);
    }
  });
});
