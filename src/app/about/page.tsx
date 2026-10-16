import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { developer } from "@/data/site-content";
import { ArrowUpRight, Award, FileText, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24 bg-brand-cream text-brand-primary">
      <Container className="max-w-5xl px-4 space-y-16">
        {/* Top Header */}
        <div className="space-y-4 border-b border-brand-primary/40 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono tracking-[0.2em] uppercase opacity-75">
              {developer.role} · Punjab, India
            </span>
            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-primary text-xs font-mono font-bold uppercase tracking-wider hover:bg-brand-primary hover:text-brand-cream transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Curriculum Vitae (CV) →</span>
            </Link>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight lowercase">
            {developer.name}.
          </h1>
          <p className="text-lg sm:text-xl font-medium opacity-90 max-w-2xl leading-relaxed">
            {developer.story}
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio Story */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              From Hollow Knight inspiration to 4 shipped and built games.
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed opacity-85 font-sans">
              <p>
                I&apos;m Divyanshu Kumar, a game developer and computer science student at Lovely Professional University. I specialize in gameplay mechanics programming in Unity (C#) and Godot (GDScript), turning high-concept mechanics into tightly tuned player experiences.
              </p>
              <p>
                Whether it&apos;s dual-character cloned synchronization in <em>Split You</em>, upside-down reversed input physics in <em>Ulta He Karega</em> (Rank #2 in LPU Game Masters Game Jam 2026), or high-stakes incremental gambling in <em>Risky Business</em>, I believe the core loop must feel satisfying from the very first input.
              </p>
              <p>
                Alongside gameplay programming, I design my own devlogs, sprint boards, and documentation using Milanote, Figma, Aseprite, and Blender.
              </p>
            </div>

            {/* Achievements Callout */}
            <div className="p-6 rounded-2xl border border-brand-primary/40 bg-brand-primary/5 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Jam Highlights & Honors</span>
              </div>
              <ul className="text-xs sm:text-sm space-y-2 opacity-90 font-mono">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Rank #2 Solo Developer — LPU Game Masters Game Jam 2026 (GDAI)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Top 10 Finalist — Brainless Game Jam (550+ entries) with Tiny Together</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Unity Certified Associate: Game Developer (In Progress)</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/cv"
                className="px-5 py-2.5 rounded-lg bg-brand-primary text-brand-cream text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Read Official CV
              </Link>
              <a
                href="https://kdivyanshu.itch.io/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider underline hover:opacity-80"
              >
                <span>itch.io Library</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Devlog Artwork Poster */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-brand-primary/40 shadow-xl bg-black">
              <Image
                src="/images/devlog-journey.png"
                alt="Devlog Comics & Development Journey"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="text-[0.68rem] font-mono tracking-wider opacity-70 uppercase text-center">
              Devlog Issue 02: &ldquo;Will this be the correct path?&rdquo;
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
