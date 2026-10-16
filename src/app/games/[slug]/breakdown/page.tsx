import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { technicalBreakdowns } from "@/data/breakdowns";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";

export function generateStaticParams() {
  return Object.keys(technicalBreakdowns).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const breakdown = technicalBreakdowns[slug];
  if (!breakdown) return {};

  return {
    title: `${breakdown.gameTitle} — Technical Breakdown & Architecture`,
    description: breakdown.summary,
    openGraph: {
      title: `${breakdown.gameTitle} — Technical Breakdown`,
      description: breakdown.summary,
      images: [breakdown.bannerImage],
    },
  };
}

export default async function GameBreakdownPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const breakdown = technicalBreakdowns[slug];

  if (!breakdown) {
    notFound();
  }

  const allSlugs = Object.keys(technicalBreakdowns);
  const nextSlug = allSlugs[(allSlugs.indexOf(slug) + 1) % allSlugs.length];
  const nextBreakdown = technicalBreakdowns[nextSlug];

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-brand-cream text-brand-primary">
      <Container className="max-w-5xl px-4 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-primary/40 pb-4 text-xs font-mono">
          <Link
            href="/breakdowns"
            className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider hover:opacity-75 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> All Technical Breakdowns
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`/games/${breakdown.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary text-brand-cream font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Play Game Now
            </Link>
            <a
              href={breakdown.itchUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold uppercase tracking-wider underline hover:opacity-80"
            >
              itch.io <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full border border-brand-primary text-xs font-mono font-bold uppercase tracking-wider bg-brand-primary/5">
              {breakdown.engine}
            </span>
            <span className="px-3 py-1 rounded-full border border-brand-primary/40 text-xs font-mono font-bold uppercase tracking-wider opacity-80">
              {breakdown.genre}
            </span>
            <span className="px-3 py-1 rounded-full border border-brand-primary/40 text-xs font-mono font-bold uppercase tracking-wider opacity-80">
              {breakdown.jamOrContext}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              {breakdown.gameTitle}
            </h1>
            <p className="text-lg sm:text-xl font-mono opacity-85">
              {breakdown.tagline}
            </p>
          </div>

          <p className="text-base sm:text-lg leading-relaxed opacity-90 max-w-3xl">
            {breakdown.summary}
          </p>

          {/* Key visual banner */}
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden border-2 border-brand-primary/40 bg-black shadow-lg">
            <Image
              src={breakdown.bannerImage || breakdown.coverImage}
              alt={`${breakdown.gameTitle} Technical Overview`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
              <span className="font-bold tracking-wider uppercase">
                Architecture Spec · {breakdown.gameTitle}
              </span>
              <span className="opacity-80">WebGL Certified Build</span>
            </div>
          </div>
        </div>

        {/* Section 1: The Problem or Design Challenge */}
        <section className="space-y-6 border-t border-brand-primary/40 pt-10">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase opacity-70 flex items-center gap-2">
              <Layers className="w-4 h-4" /> 01 · Design Challenge
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              {breakdown.challenge.title}
            </h2>
          </div>

          <p className="text-base sm:text-lg leading-relaxed opacity-90 font-sans">
            {breakdown.challenge.description}
          </p>

          <div className="p-6 rounded-xl border border-brand-primary/30 bg-brand-primary/5 space-y-4">
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider">
              Key Technical & Mechanical Roadblocks:
            </h3>
            <ul className="space-y-3">
              {breakdown.challenge.keyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-2" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Implementation and Architectural Decisions */}
        <section className="space-y-8 border-t border-brand-primary/40 pt-10">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase opacity-70 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> 02 · Systems Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              {breakdown.implementation.title}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed opacity-90 font-sans">
              {breakdown.implementation.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {breakdown.implementation.architecturePoints.map((point, index) => (
              <div
                key={point.headline}
                className="p-5 border border-brand-primary/40 bg-white/50 dark:bg-black/20 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold opacity-60">
                    DECISION 0{index + 1}
                  </span>
                  <h3 className="text-base font-bold tracking-tight mt-1">
                    {point.headline}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-85 leading-relaxed mt-2">
                    {point.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Code Sample */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-brand-primary/30 pb-2">
              <span className="font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600" /> Source Implementation: {breakdown.implementation.codeSnippet.fileName}
              </span>
              <span className="opacity-70 uppercase">
                {breakdown.implementation.codeSnippet.language} · Unity Engine
              </span>
            </div>

            <pre className="p-4 sm:p-6 bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm rounded-lg overflow-x-auto shadow-xl leading-relaxed border border-slate-800">
              <code>{breakdown.implementation.codeSnippet.code}</code>
            </pre>

            <p className="text-xs sm:text-sm font-mono opacity-80 italic">
              ℹ {breakdown.implementation.codeSnippet.explanation}
            </p>
          </div>
        </section>

        {/* Section 3: The Result & Measurable Impact */}
        <section className="space-y-8 border-t border-brand-primary/40 pt-10">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase opacity-70 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600" /> 03 · Outcomes & Proof
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              {breakdown.results.title}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed opacity-90 font-sans">
              {breakdown.results.description}
            </p>
          </div>

          {/* Measurable Metric Cards */}
          <div className="grid gap-6 sm:grid-cols-3">
            {breakdown.results.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-6 border-2 border-brand-primary/40 bg-white/70 dark:bg-black/30 space-y-1 text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-brand-primary">
                  {metric.value}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider opacity-75">
                  {metric.label}
                </div>
                <p className="text-[11px] opacity-80 pt-1">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Key Engineering Takeaways */}
          <div className="p-6 border border-brand-primary/30 bg-brand-primary/5 space-y-3 rounded-xl">
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" /> Architectural Takeaways:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm opacity-90">
              {breakdown.results.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Play & Next Breakdown CTA Banner */}
          <div className="p-8 border-2 border-brand-primary bg-brand-primary text-brand-cream flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Experience {breakdown.gameTitle} In Action
              </h3>
              <p className="text-xs sm:text-sm font-mono opacity-85">
                Playable right now in your browser with full WebGL performance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/games/${breakdown.slug}`}
                className="px-6 py-3 bg-brand-cream text-brand-primary font-bold text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors"
              >
                Launch Browser Game →
              </Link>
              {nextBreakdown && (
                <Link
                  href={`/games/${nextBreakdown.slug}/breakdown`}
                  className="px-5 py-3 border border-brand-cream text-brand-cream font-bold text-xs font-mono uppercase tracking-wider hover:bg-brand-cream hover:text-brand-primary transition-colors"
                >
                  Next: {nextBreakdown.gameTitle} →
                </Link>
              )}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
