import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GameCard } from "@/features/games/components/game-card";
import { developer, statistics, technologies, timeline } from "@/data/site-content";
import { featuredGames } from "@/data/games";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Container className="py-16 sm:py-24">
        <PageHeader
          eyebrow="Independent game studio"
          title="Small worlds. Big curiosity."
          description="KD Arcade makes playful, expressive games that reward a little exploration."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className={buttonVariants({ variant: "secondary", size: "lg" })}
            href="/games"
          >
            Explore games
          </Link>
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/about"
          >
            Meet the developer
          </Link>
        </div>
      </Container>
      <Container>
        <Section className="border-border border-t">
          <h2 className="text-2xl font-semibold">Featured games</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {featuredGames.map((game) => (
              <GameCard game={game} key={game.slug} />
            ))}
          </div>
        </Section>
        <Section className="border-border grid gap-10 border-t lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">
              Built with a player-first mindset
            </h2>
            <p className="text-muted-foreground mt-4 leading-7">
              {developer.philosophy} {developer.careerGoal}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <Badge key={technology} variant="outline">
                  {technology}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {statistics.map((statistic) => (
              <div
                className="border-border bg-surface rounded-lg border p-5"
                key={statistic.label}
              >
                <p className="font-pixel text-secondary text-2xl">{statistic.value}</p>
                <p className="text-muted-foreground mt-2 text-sm">{statistic.label}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section className="border-border border-t">
          <h2 className="text-2xl font-semibold">Development timeline</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <li className="border-border rounded-lg border p-5" key={item.year}>
                <p className="font-pixel text-secondary text-xs">{item.year}</p>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>
        <Section className="border-border border-t text-center">
          <h2 className="font-pixel text-2xl">Stay in the loop</h2>
          <p className="text-muted-foreground mt-3">
            News, experiments, and the next strange little world.
          </p>
          <Link
            className={`${buttonVariants({ variant: "secondary" })} mt-5`}
            href="/contact"
          >
            Follow KD Arcade
          </Link>
        </Section>
      </Container>
    </>
  );
}
