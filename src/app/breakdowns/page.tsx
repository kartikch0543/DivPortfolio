import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { technicalBreakdowns } from "@/data/breakdowns";
import { Code2, Cpu, Play, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Breakdowns — KD Arcade",
  description:
    "In-depth architectural breakdowns, gameplay systems design, Unity C# implementation decisions, and measurable outcomes for shipped games.",
};

export default function BreakdownsIndexPage() {
  const breakdowns = Object.values(technicalBreakdowns);

  return (
    <div className="min-h-screen py-12 sm:py-16 bg-brand-cream text-brand-primary">
      <Container className="max-w-6xl px-4 space-y-12">
        <PageHeader
          eyebrow="ENGINEERING & SYSTEMS ARCHITECTURE"
          title="Technical Breakdowns"
          description="A transparent look under the hood: the design problems faced, implementation & architectural decisions made in Unity (C#), and measurable results across 4 shipped games."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {breakdowns.map((item, idx) => (
            <article
              key={item.slug}
              className="group flex flex-col justify-between border-2 border-brand-primary/40 bg-white/60 dark:bg-black/30 backdrop-blur-xs p-6 sm:p-8 space-y-6 transition-all duration-300 hover:border-brand-primary hover:shadow-xl"
            >
              <div className="space-y-4">
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold opacity-70">CASE STUDY 0{idx + 1}</span>
                  <span className="px-2.5 py-0.5 border border-brand-primary/40 rounded-full font-bold uppercase tracking-wider text-[10px]">
                    {item.jamOrContext.includes("Rank #2")
                      ? "Rank #2 Solo Dev"
                      : item.jamOrContext.includes("Top 10")
                      ? "Top 10 Finalist"
                      : "Shipped Title"}
                  </span>
                </div>

                {/* Cover visual */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border border-brand-primary/30 bg-black">
                  <Image
                    src={item.coverImage}
                    alt={item.gameTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                    <span className="font-bold">{item.engine}</span>
                    <span className="opacity-80">{item.genre}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {item.gameTitle}
                  </h2>
                  <p className="text-xs font-mono uppercase tracking-wider text-brand-primary/80 mt-0.5">
                    {item.tagline}
                  </p>
                  <p className="text-sm opacity-90 leading-relaxed mt-3">
                    {item.summary}
                  </p>
                </div>

                {/* Key Architectural Highlights */}
                <div className="space-y-2 border-t border-brand-primary/20 pt-4">
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase opacity-75 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Core Architectural Decisions:
                  </span>
                  <ul className="space-y-1.5 text-xs opacity-90">
                    {item.implementation.architecturePoints.map((point) => (
                      <li key={point.headline} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>{point.headline}:</strong> {point.details.slice(0, 100)}...
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-brand-primary/30">
                <Link
                  href={`/games/${item.slug}/breakdown`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-brand-cream text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <Code2 className="w-3.5 h-3.5" /> Read Full Breakdown →
                </Link>

                <Link
                  href={`/games/${item.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider underline hover:opacity-80"
                >
                  <Play className="w-3 h-3 fill-current" /> Play Game
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
