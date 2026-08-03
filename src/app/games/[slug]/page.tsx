import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BrowserGamePlayer } from "@/features/games/components/browser-game-player";
import { GameCard } from "@/features/games/components/game-card";
import { games, getGameBySlug } from "@/data/games";
import { getPrimaryLaunch } from "@/lib/game-launch";

export function generateStaticParams() {
  return games.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  return game
    ? {
        title: game.title,
        description: game.description,
        openGraph: {
          title: game.title,
          description: game.description,
          images: [game.bannerImage],
        },
        twitter: {
          card: "summary_large_image",
          title: game.title,
          description: game.description,
        },
      }
    : {};
}
export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();
  const primary = getPrimaryLaunch(game);
  const related = games.filter((item) => item.slug !== game.slug);
  return (
    <>
      <section className="border-border relative overflow-hidden border-b">
        <Image
          alt=""
          className="absolute inset-0 -z-10 object-cover opacity-25"
          fill
          priority
          src={game.bannerImage}
        />
        <Container className="py-16 sm:py-24">
          <Badge variant="secondary">{game.status.replace("-", " ")}</Badge>
          <h1 className="font-pixel mt-5 max-w-3xl text-4xl sm:text-6xl">
            {game.title}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
            {game.description}
          </p>
          {primary ? (
            <a
              className={`${buttonVariants({ variant: "secondary", size: "lg" })} mt-7`}
              href={primary.href}
              rel="noreferrer"
              target="_blank"
            >
              {primary.label}
            </a>
          ) : null}
        </Container>
      </section>
      <Container>
        <Section>
          <BrowserGamePlayer game={game} />
        </Section>
        <Section className="border-border grid gap-8 border-t lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold">About the game</h2>
            <p className="text-muted-foreground mt-3 leading-7">
              {game.developmentStory}
            </p>
            <h3 className="mt-8 text-lg font-semibold">Features</h3>
            <ul className="text-muted-foreground mt-3 grid gap-2">
              {game.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
          <aside className="border-border bg-surface rounded-lg border p-5">
            <h2 className="font-semibold">Game details</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Engine</dt>
                <dd>{game.engine}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Platforms</dt>
                <dd>{game.platforms.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Controls</dt>
                <dd>{game.controls.join(" · ")}</dd>
              </div>
            </dl>
          </aside>
        </Section>
        <Section className="border-border border-t">
          <h2 className="text-2xl font-semibold">Developer notes</h2>
          <p className="text-muted-foreground mt-3 max-w-3xl leading-7">
            {game.developerNotes}
          </p>
          <h3 className="mt-8 text-lg font-semibold">Known issues</h3>
          <ul className="text-muted-foreground mt-3 space-y-2">
            {game.knownIssues.map((issue) => (
              <li key={issue}>• {issue}</li>
            ))}
          </ul>
        </Section>
        <Section className="border-border border-t">
          <h2 className="text-2xl font-semibold">More from KD Arcade</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <GameCard game={item} key={item.slug} />
            ))}
          </div>
          <Link
            className={`${buttonVariants({ variant: "outline" })} mt-6`}
            href="/games"
          >
            All games
          </Link>
        </Section>
      </Container>
    </>
  );
}
