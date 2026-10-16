"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Printer, Eye, FileCode2, ExternalLink } from "lucide-react";

export function CvDocumentView() {
  const [viewMode, setViewMode] = useState<"document" | "pdf">("document");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* View Switcher & Print Controls */}
      <div className="flex items-center justify-between print:hidden">
        <div className="inline-flex p-1 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => setViewMode("document")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === "document"
                ? "bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Interactive CV</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("pdf")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === "pdf"
                ? "bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>PDF Embed</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-mono uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print CV</span>
        </button>
      </div>

      {viewMode === "pdf" ? (
        <div className="w-full h-[85vh] min-h-[700px] rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-neutral-900 shadow-2xl">
          <object
            data="/divyanshu-cv.pdf"
            type="application/pdf"
            className="w-full h-full"
          >
            <div className="p-8 text-center text-white space-y-4">
              <p>Your browser does not support inline PDF viewing.</p>
              <a
                href="/divyanshu-cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 bg-brand-primary text-brand-cream rounded font-bold"
              >
                Click here to view PDF
              </a>
            </div>
          </object>
        </div>
      ) : (
        /* Document View: Exact Replica of Attached CV */
        <div className="bg-white text-neutral-900 p-8 sm:p-14 md:p-16 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 font-sans print:shadow-none print:border-none print:p-0 print:m-0 print:text-black">
          {/* Header */}
          <header className="space-y-2 border-b border-neutral-800 pb-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              Divyanshu Kumar
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-neutral-800">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-600">itch.io:</span>
                <a
                  href="https://kdivyanshu.itch.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  https://kdivyanshu.itch.io/
                </a>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <span className="font-semibold text-neutral-600">Email:</span>
                <a
                  href="mailto:kdivyanshu1012@gmail.com"
                  className="text-blue-700 hover:underline"
                >
                  kdivyanshu1012@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-600">Github:</span>
                <a
                  href="https://github.com/kdivyanshu1012"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  https://github.com/kdivyanshu1012
                </a>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <span className="font-semibold text-neutral-600">Portfolio:</span>
                <a
                  href="https://div-portfolio-eight.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  https://div-portfolio-eight.vercel.app/
                </a>
              </div>
            </div>
          </header>

          {/* Section: SKILLS */}
          <section className="mt-4 space-y-1.5">
            <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-950 border-b border-neutral-400 pb-0.5">
              SKILLS
            </h2>
            <ul className="text-xs text-neutral-800 space-y-1 pl-4 list-disc marker:text-neutral-600">
              <li>
                <span className="font-bold text-neutral-900">Languages:</span> C#, GDScript
              </li>
              <li>
                <span className="font-bold text-neutral-900">Game Engines:</span> Unity, Godot
              </li>
              <li>
                <span className="font-bold text-neutral-900">Tools:</span> Blender, GitHub, Figma, Aseprite, Photoshop
              </li>
              <li>
                <span className="font-bold text-neutral-900">Deployment:</span> Android, WebGL
              </li>
            </ul>
          </section>

          {/* Section: PROJECTS */}
          <section className="mt-5 space-y-3">
            <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-950 border-b border-neutral-400 pb-0.5">
              PROJECTS
            </h2>

            {/* Project 1: Risky Business */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between text-xs gap-2">
                <div className="font-bold text-neutral-950">
                  <span>Risky Business</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <span>Unity</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <span>Web Deployment</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <Link
                    href="/games/risky-business"
                    className="text-blue-700 hover:underline font-normal inline-flex items-center gap-0.5"
                  >
                    Link <ExternalLink className="w-2.5 h-2.5 inline" />
                  </Link>
                </div>
                <div className="text-neutral-700 font-medium">Oct 2026</div>
              </div>
              <ul className="text-xs text-neutral-800 space-y-1 pl-4 list-disc marker:text-neutral-600 leading-relaxed">
                <li>
                  Developed and shipped a 2D incremental game in Unity with resource collection, gambling mechanics, progression upgrades.
                </li>
                <li>
                  Designed the core mechanics around the theme &ldquo;Plot-Twist&rdquo; for IIIT- Nagpur Tantra Fiesta game jam.
                </li>
                <li>
                  Designed, implemented and deployed the game within a span of 10 days.
                </li>
              </ul>
            </div>

            {/* Project 2: Tiny Together */}
            <div className="space-y-1 pt-1">
              <div className="flex flex-wrap items-baseline justify-between text-xs gap-2">
                <div className="font-bold text-neutral-950">
                  <span>Tiny Together</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <span>Unity</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <span>Mobile Deployment</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <span>WEBGL Deployment</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <Link
                    href="/games/tiny-together"
                    className="text-blue-700 hover:underline font-normal inline-flex items-center gap-0.5"
                  >
                    Link <ExternalLink className="w-2.5 h-2.5 inline" />
                  </Link>
                </div>
                <div className="text-neutral-700 font-medium">May 2026</div>
              </div>
              <ul className="text-xs text-neutral-800 space-y-1 pl-4 list-disc marker:text-neutral-600 leading-relaxed">
                <li>
                  Developed and shipped a 2D puzzle-platformer in Unity with 2-player character mechanics.
                </li>
                <li>
                  Implemented 5+ core gameplay systems, including movement, interaction, level progression and puzzle logic.
                </li>
                <li>
                  Designed 10+ unique puzzles/challenges focused on coordination and synchronized gameplay.
                </li>
                <li>
                  Ranked among the Top 10 most rated game in the &ldquo;Brainless Game Jam&rdquo; out of 550+ entries.
                </li>
              </ul>
            </div>

            {/* Project 3: Split You */}
            <div className="space-y-1 pt-1">
              <div className="flex flex-wrap items-baseline justify-between text-xs gap-2">
                <div className="font-bold text-neutral-950">
                  <span>Split You</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <span>Unity</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <span>Mobile Deployment</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <Link
                    href="/games/split-you"
                    className="text-blue-700 hover:underline font-normal inline-flex items-center gap-0.5"
                  >
                    Link <ExternalLink className="w-2.5 h-2.5 inline" />
                  </Link>
                </div>
                <div className="text-neutral-700 font-medium">May 2026</div>
              </div>
              <ul className="text-xs text-neutral-800 space-y-1 pl-4 list-disc marker:text-neutral-600 leading-relaxed">
                <li>
                  Developed &ldquo;Split You,&rdquo; a puzzle-platformer centered around clone-based gameplay and synchronized problem solving.
                </li>
                <li>
                  Designed and implemented a unique mechanic allowing players to spawn controllable clones dynamically, creating emergent puzzle interactions instead of relying on pre-existing duplicate characters.
                </li>
                <li>
                  Built gameplay systems for clone control, player switching, collision handling, and level progression using Unity and C#.
                </li>
              </ul>
            </div>

            {/* Project 4: Ulta He Krega */}
            <div className="space-y-1 pt-1">
              <div className="flex flex-wrap items-baseline justify-between text-xs gap-2">
                <div className="font-bold text-neutral-950">
                  <span>Ulta He Krega</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <span>Unity</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <span>Web Deployment</span>
                  <span className="font-normal text-neutral-500 mx-1.5">|</span>
                  <Link
                    href="/games/ulta-he-krega"
                    className="text-blue-700 hover:underline font-normal inline-flex items-center gap-0.5"
                  >
                    Link <ExternalLink className="w-2.5 h-2.5 inline" />
                  </Link>
                </div>
                <div className="text-neutral-700 font-medium">May 2026</div>
              </div>
              <ul className="text-xs text-neutral-800 space-y-1 pl-4 list-disc marker:text-neutral-600 leading-relaxed">
                <li>
                  Designed a dual-character control system where one character mirrors opposite movement inputs, creating unique puzzle-solving gameplay.
                </li>
                <li>
                  Developed and deployed a complete WebGL build on itch.io within 48 hours during a Game Jam.
                </li>
                <li>
                  Achieved Rank #2 among 25+ teams as a solo developer.
                </li>
                <li>
                  Optimized gameplay flow and level pacing for 4–5 minute session retention.
                </li>
              </ul>
            </div>
          </section>

          {/* Section: ACHIEVEMENTS */}
          <section className="mt-5 space-y-2">
            <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-950 border-b border-neutral-400 pb-0.5">
              ACHIEVEMENTS
            </h2>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-bold text-neutral-950">
                    • Secured Top 3 in a Game Jam conducted by LPU
                    <span className="font-normal text-neutral-500 mx-1.5">|</span>
                    <a
                      href="https://kdivyanshu.itch.io/ulta-he-krega"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline font-normal inline-flex items-center gap-0.5"
                    >
                      Link <ExternalLink className="w-2.5 h-2.5 inline" />
                    </a>
                  </div>
                  <div className="text-neutral-700 font-medium">May 2026</div>
                </div>
                <p className="text-neutral-800 pl-4 mt-0.5 leading-relaxed">
                  Secured 2nd place in LPU&apos;s Game Masters Game Jam 2026, conducted in collaboration with Game Developer Association of India (GDAI), competing against 25+ teams as a solo developer.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-bold text-neutral-950">
                    • Top 10 candidate in Brainless Game jam
                    <span className="font-normal text-neutral-500 mx-1.5">|</span>
                    <a
                      href="https://kdivyanshu.itch.io/tiny-together"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline font-normal inline-flex items-center gap-0.5"
                    >
                      Link <ExternalLink className="w-2.5 h-2.5 inline" />
                    </a>
                  </div>
                  <div className="text-neutral-700 font-medium">May 2026</div>
                </div>
                <p className="text-neutral-800 pl-4 mt-0.5 leading-relaxed">
                  Achieved a Top 10 position in a competitive game jam among 500+ entries in Brainless Game Jam conducted By Brainless.
                </p>
              </div>
            </div>
          </section>

          {/* Section: CERTIFICATIONS */}
          <section className="mt-5 space-y-1">
            <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-950 border-b border-neutral-400 pb-0.5">
              CERTIFICATIONS
            </h2>
            <div className="text-xs pt-1">
              <p className="font-bold text-neutral-950">
                • Unity Certified Associate: Game Developer <span className="font-normal italic text-neutral-600">(In Progress)</span>
              </p>
              <p className="text-neutral-800 pl-4 mt-0.5 leading-relaxed">
                Developing proficiency in gameplay programming, Unity systems, debugging, UI, and game development workflows.
              </p>
            </div>
          </section>

          {/* Section: EDUCATION */}
          <section className="mt-5 space-y-2">
            <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-950 border-b border-neutral-400 pb-0.5">
              EDUCATION
            </h2>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-bold text-neutral-950">• Lovely Professional University</span>
                  <span className="text-neutral-700">Punjab, India</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 pl-4 text-neutral-800">
                  <span>Bachelor of Technology - Computer Science and Engineering; CGPA: 7.32</span>
                  <span className="text-neutral-700 font-medium">August 2023 - Present</span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-bold text-neutral-950">• Apeejay School</span>
                  <span className="text-neutral-700">Jalandhar, Punjab</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 pl-4 text-neutral-800">
                  <span>Intermediate; Percentage: 74%</span>
                  <span className="text-neutral-700 font-medium">April 2021 - March 2022</span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-bold text-neutral-950">• Apeejay School</span>
                  <span className="text-neutral-700">Jalandhar, Punjab</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 pl-4 text-neutral-800">
                  <span>Matriculation; Percentage: 93%</span>
                  <span className="text-neutral-700 font-medium">April 2019 - March 2020</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
