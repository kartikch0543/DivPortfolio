"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { GameCard } from "@/features/games/components/game-card";
import type { Game } from "@/types/game";

export function GameCatalog({ games }: { games: Game[] }) {
  const [query, setQuery] = useState("");
  const visibleGames = useMemo(
    () =>
      games.filter((game) =>
        `${game.title} ${game.genre.join(" ")} ${game.status}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [games, query],
  );

  return (
    <>
      <label className="mb-6 block max-w-sm">
        <span className="sr-only">Search games</span>
        <Input
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search games by title or genre"
          value={query}
        />
      </label>
      {visibleGames.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleGames.map((game) => (
            <GameCard game={game} key={game.slug} />
          ))}
        </div>
      ) : (
        <EmptyState
          description="Try another title, genre, or release status."
          title="No games found"
        />
      )}
    </>
  );
}
