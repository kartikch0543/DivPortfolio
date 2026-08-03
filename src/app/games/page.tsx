import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { GameCatalog } from "@/features/games/components/game-catalog";
import { games } from "@/data/games";

export const metadata: Metadata = {
  title: "Games",
  description: "Browse games from KD Arcade.",
};
export default function GamesPage() {
  return (
    <Container className="py-12 sm:py-16">
      <PageHeader
        description="Small worlds, surprising systems, and projects built to be played."
        eyebrow="The library"
        title="Games"
      />
      <div className="mt-10">
        <GameCatalog games={games} />
      </div>
    </Container>
  );
}
