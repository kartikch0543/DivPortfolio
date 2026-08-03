import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { games, getGameBySlug } from "@/data/games";
import { GameCard } from "@/features/games/components/game-card";

// Milestone 5 Publishing Platform Components
import { EnhancedBrowserPlayer } from "@/features/publishing/components/EnhancedBrowserPlayer";
import { PublishingDownloadHub } from "@/features/publishing/components/PublishingDownloadHub";
import { VersionHistoryTimeline } from "@/features/publishing/components/VersionHistoryTimeline";
import { SystemRequirementsWidget } from "@/features/publishing/components/SystemRequirementsWidget";
import { DlcGallery } from "@/features/publishing/components/DlcGallery";
import { AchievementsWidget } from "@/features/publishing/components/AchievementsWidget";

// Milestone 3 Community Components
import { CommentSection } from "@/features/community/components/CommentSection";
import { RatingReviewSection } from "@/features/community/components/RatingReviewSection";
import { WishlistFavoriteActions } from "@/features/community/components/WishlistFavoriteActions";

// Milestone 4 Analytics Components
import { GameTelemetryWidget } from "@/features/analytics/components/GameTelemetryWidget";

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

  const related = games.filter((item) => item.slug !== game.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: game.title,
          description: game.description,
          image: game.bannerImage,
          gamePlatform: game.platforms,
          applicationCategory: game.genre.join(", "),
          url: `/games/${game.slug}`,
        }}
      />

      {/* Hero Header */}
      <section className="dark:border-slate-800 border-slate-200 relative overflow-hidden border-b dark:bg-slate-950 bg-slate-100 dark:text-slate-100 text-slate-900">
        <Image
          alt={game.title}
          className="absolute inset-0 -z-10 object-cover opacity-20"
          fill
          priority
          src={game.bannerImage}
        />
        <Container className="py-12 sm:py-16 px-4">
          <div className="flex items-center justify-between gap-4">
            <Badge variant="secondary" className="font-mono text-xs uppercase font-bold">
              {game.status.replace("-", " ")}
            </Badge>
            <WishlistFavoriteActions gameSlug={game.slug} />
          </div>

          <h1 className="font-pixel mt-4 max-w-3xl text-3xl sm:text-5xl dark:text-white text-slate-900">
            {game.title}
          </h1>
          <p className="dark:text-slate-300 text-slate-700 mt-3 max-w-2xl text-base sm:text-lg leading-relaxed">
            {game.description}
          </p>
        </Container>
      </section>

      <Container className="space-y-10 py-10 px-4">
        {/* Interactive Browser Game Player Launcher */}
        <EnhancedBrowserPlayer game={game} />

        {/* Multi-Platform Downloads Hub */}
        <PublishingDownloadHub gameSlug={game.slug} />

        {/* Telemetry & Performance Widget */}
        <GameTelemetryWidget gameSlug={game.slug} />

        {/* Game Details Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="dark:bg-slate-900/40 bg-white dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
              <h2 className="text-xl font-bold font-pixel dark:text-white text-slate-900">About the game</h2>
              <p className="dark:text-slate-300 text-slate-700 text-xs sm:text-sm leading-relaxed">
                {game.developmentStory}
              </p>
              <h3 className="text-sm font-semibold font-mono text-purple-600 dark:text-purple-400">Core Features</h3>
              <ul className="grid gap-2 text-xs dark:text-slate-300 text-slate-700">
                {game.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* DLC Gallery */}
            <DlcGallery gameSlug={game.slug} />

            {/* Achievements System */}
            <AchievementsWidget gameSlug={game.slug} />

            {/* Version History & Release Notes */}
            <VersionHistoryTimeline gameSlug={game.slug} />

            {/* System Requirements */}
            <SystemRequirementsWidget gameSlug={game.slug} />

            {/* Ratings & Reviews */}
            <RatingReviewSection gameSlug={game.slug} />

            {/* Threaded Community Discussion */}
            <CommentSection gameSlug={game.slug} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="dark:bg-slate-900/60 bg-white dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-4 text-xs font-mono shadow-sm">
              <h2 className="font-semibold text-sm dark:text-white text-slate-900 font-pixel border-b dark:border-slate-800 border-slate-200 pb-2">
                Game Specifications
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="dark:text-slate-500 text-slate-600">Engine</dt>
                  <dd className="dark:text-slate-200 text-slate-900 font-semibold">{game.engine}</dd>
                </div>
                <div>
                  <dt className="dark:text-slate-500 text-slate-600">Supported Platforms</dt>
                  <dd className="dark:text-slate-200 text-slate-900">{game.platforms.join(", ")}</dd>
                </div>
                <div>
                  <dt className="dark:text-slate-500 text-slate-600">Input Controls</dt>
                  <dd className="dark:text-slate-200 text-slate-900">{game.controls.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="dark:text-slate-500 text-slate-600">Release Version</dt>
                  <dd className="text-purple-600 dark:text-purple-400 font-semibold">v1.0.0 Stable</dd>
                </div>
              </dl>
            </div>

            {/* Developer Notes & Known Issues */}
            <div className="dark:bg-slate-900/40 bg-white dark:border-slate-800 border-slate-200 rounded-xl p-6 space-y-3 text-xs shadow-sm">
              <h3 className="font-semibold dark:text-white text-slate-900 font-pixel">Developer Notes</h3>
              <p className="dark:text-slate-400 text-slate-700 leading-relaxed">{game.developerNotes}</p>
              <h4 className="font-semibold text-amber-600 dark:text-amber-400 font-mono pt-2">Known Issues</h4>
              <ul className="space-y-1 dark:text-slate-400 text-slate-700">
                {game.knownIssues.map((issue) => (
                  <li key={issue}>• {issue}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Related Games Engine */}
        <Section className="dark:border-slate-800 border-slate-200 border-t pt-8">
          <h2 className="text-xl font-bold font-pixel dark:text-white text-slate-900">More from KD Arcade</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <GameCard game={item} key={item.slug} />
            ))}
          </div>
          <div className="mt-6">
            <Link
              className={`${buttonVariants({ variant: "outline" })} font-mono text-xs`}
              href="/games"
            >
              Browse All Games →
            </Link>
          </div>
        </Section>
      </Container>
    </>
  );
}
