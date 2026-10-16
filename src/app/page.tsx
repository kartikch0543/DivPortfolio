import Image from "next/image";
import Link from "next/link";
import { SelectedWorks } from "@/components/home/selected-works";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative text-brand-primary">
      {/* =========================================================================
          HERO SECTION (Exact mijobello structure)
          ========================================================================= */}
      <section className="flex flex-col border-b border-brand-primary/50 md:min-h-[calc(100svh-4rem)]">
        {/* Top Split Media Grid: 8 Cols Gameplay Reel + 4 Cols Portrait */}
        <div className="grid grid-cols-4 md:grid-cols-12 md:min-h-[42svh] md:flex-1 border-b border-brand-primary/50">
          {/* Hero Media Card (8 cols) - Real Key Art Showcase featuring Risky Business */}
          <div className="group relative col-span-4 md:col-span-8 aspect-[4/3] md:aspect-auto md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-brand-primary/50 bg-black/95">
            <Image
              src="/images/games/risky-business-cover.png"
              alt="Risky Business - Shipped Game Art"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

            {/* Corner Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2 border border-brand-cream/40 bg-black/70 px-2.5 py-1 text-[0.62rem] font-mono tracking-widest uppercase text-brand-cream backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>KEY ART · RISKY BUSINESS</span>
            </div>

            <div className="absolute bottom-4 inset-x-4 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
              <div>
                <span className="text-[0.6rem] font-mono tracking-[0.2em] text-brand-cream/70 uppercase">
                  Featured Unity Title · IIITN Tantrafiesta 2026
                </span>
                <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                  Break. Earn. Upgrade. Gamble.
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="border border-brand-cream/50 bg-black/60 px-2 py-0.5 text-[0.6rem] font-mono tracking-widest uppercase text-brand-cream font-bold">
                  Risky Business
                </span>
                <span className="border border-brand-cream/50 bg-black/60 px-2 py-0.5 text-[0.6rem] font-mono tracking-widest uppercase text-brand-cream">
                  Split You
                </span>
                <span className="border border-brand-cream/50 bg-black/60 px-2 py-0.5 text-[0.6rem] font-mono tracking-widest uppercase text-brand-cream">
                  Tiny Together
                </span>
                <span className="border border-brand-cream/50 bg-black/60 px-2 py-0.5 text-[0.6rem] font-mono tracking-widest uppercase text-brand-cream">
                  Ulta He Krega
                </span>
              </div>
            </div>
          </div>

          {/* Portrait / Devlog Artwork Card (4 cols) */}
          <div className="group relative col-span-4 md:col-span-4 aspect-[3/4] md:aspect-auto md:h-full overflow-hidden bg-black/90">
            <Image
              src="/images/devlog-journey.png"
              alt="Game Dev Chronicles & Journey"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-75 grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

            <div className="absolute top-3 right-3 z-10 border border-brand-cream/40 bg-black/70 px-2.5 py-1 text-[0.6rem] font-mono tracking-widest uppercase text-brand-cream backdrop-blur-xs">
              DEVLOG · ISSUE 02
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
              <p className="text-[0.62rem] font-mono tracking-widest uppercase text-brand-cream/70">
                LPU CSE · PUNJAB, INDIA
              </p>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Divyanshu Kumar
              </h4>
              <p className="text-[0.65rem] text-brand-cream/80 font-mono">
                Gameplay Programmer & Indie Creator
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Hero Typography Bar */}
        <div className="grid grid-cols-4 md:grid-cols-12">
          {/* Clamped Name Heading - full width own row on mobile, 7 cols on desktop */}
          <div className="col-span-4 flex items-end px-3 py-4 md:col-span-7 md:px-5 md:py-6 border-b md:border-b-0 border-brand-primary/50">
            <h1
              className="text-[clamp(2.8rem,14vw,14rem)] leading-[0.85] font-bold tracking-[-0.10em] lowercase"
              aria-label="divyanshu."
            >
              divyanshu.
            </h1>
          </div>

          {/* Roles List (3 cols) */}
          <ul className="col-span-3 md:col-span-3 md:border-l border-brand-primary/50 p-3 md:p-5 flex flex-col justify-end gap-1 text-sm leading-[1.2] font-medium tracking-[-0.02em] md:text-xl lg:text-2xl border-r border-brand-primary/50 md:border-r-0">
            <li>Game Developer</li>
            <li>Gameplay Programmer</li>
            <li>Unity & Godot Specialist</li>
          </ul>

          {/* Minimalist Stamp Badge (2 cols) */}
          <div className="col-span-1 md:col-span-2 md:border-l border-brand-primary/50 p-3 md:p-5 flex items-center justify-center border-t md:border-t-0">
            <div className="flex flex-col items-center justify-center border border-brand-primary/50 p-3 text-center select-none w-full max-w-[120px]">
              <span className="text-[0.6rem] font-mono tracking-widest uppercase opacity-70">
                STATUS
              </span>
              <span className="text-xl md:text-2xl font-bold font-mono tracking-tighter">
                4 SHIPPED
              </span>
              <span className="text-[0.55rem] font-mono tracking-widest uppercase opacity-70">
                GAMES BUILT
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE DEVELOPER (About / Statement Section)
          ========================================================================= */}
      <section id="the-developer" className="border-b border-brand-primary/50">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-brand-primary/50 pt-16 md:pt-36 pb-0">
            {/* Section Eyebrow & Title */}
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-brand-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-5">
                <p className="mb-2 md:mb-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">
                  the
                </p>
                <h2 className="text-5xl leading-[0.85] font-bold tracking-[-0.06em] md:text-7xl lg:text-8xl">
                  developer.
                </h2>
              </div>
            </div>

            {/* Split Bio Narrative & Workspace Placeholder */}
            <div className="relative">
              <div className="grid grid-cols-4 md:grid-cols-10 border-b border-brand-primary/50">
                {/* Bio text from About me.docx */}
                <div className="col-span-4 md:col-span-5 border-r-0 md:border-r border-brand-primary/50 p-4 md:p-8 flex flex-col items-start gap-6 py-12 md:py-16">
                  <p className="max-w-[48ch] text-base md:text-lg leading-relaxed">
                    I&apos;m Divyanshu Kumar, a game developer proficient in Unity and C#, with working knowledge of Godot and GDScript. I fell in love with game development after being inspired by Hollow Knight, turning a lifelong passion for AAA, RPGs, and indie games into shipping real games.
                  </p>
                  <p className="max-w-[48ch] text-sm md:text-base leading-relaxed opacity-85">
                    To date, I&apos;ve shipped and built 4 games alongside countless technical experiments. My core toolkit spans Unity, Godot, C#, Figma, Photoshop, Blender, Aseprite, and Milanote for game design documentation.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="https://kdivyanshu.itch.io/"
                      target="_blank"
                      rel="noreferrer"
                      className="group/cta relative inline-block overflow-hidden border border-brand-primary/50 px-5 py-2.5 text-sm md:text-base leading-[1.3] tracking-[0.06em] uppercase transition-colors hover:bg-brand-primary hover:text-brand-cream"
                    >
                      <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/cta:-translate-y-[200%]">
                        itch.io profile →
                      </span>
                      <span
                        className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/cta:translate-y-0 font-bold"
                        aria-hidden="true"
                      >
                        itch.io profile →
                      </span>
                    </a>

                    <a
                      href="https://github.com/kdivyanshu1012"
                      target="_blank"
                      rel="noreferrer"
                      className="group/roll inline-flex items-center gap-1.5 text-xs md:text-sm font-bold tracking-[0.06em] uppercase opacity-80 hover:opacity-100"
                    >
                      <span className="relative block overflow-hidden">
                        <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full">
                          GitHub
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
                        >
                          GitHub
                        </span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Workspace / Production Plan visual (5 cols) - Replaced img8 with img4 */}
                <div className="group relative col-span-4 md:col-span-5 min-h-[260px] md:min-h-[340px] overflow-hidden bg-slate-950 border-t md:border-t-0">
                  <Image
                    src="/images/imported/img4.PNG"
                    alt="Game Production & Technical Design"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                    <span className="text-[0.6rem] font-mono tracking-widest uppercase text-brand-cream/70 border border-brand-cream/30 px-2 py-0.5 rounded backdrop-blur-xs">
                      PRODUCTION ROADMAP
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      Game Architecture & Task Board
                    </h4>
                    <p className="text-[0.65rem] text-brand-cream/80 font-mono">
                      Sprint Architecture: Mechanics, Levels & Pipelines
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Width Technical Showcase Strip - Replaced img3 with GIF2 */}
              <div className="grid grid-cols-4 md:grid-cols-10">
                <div className="group relative col-span-4 md:col-span-10 aspect-[16/7] overflow-hidden bg-slate-950">
                  <Image
                    src="/images/imported/GIF2.gif"
                    alt="Gameplay Mechanics Demonstration & Live Action"
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="space-y-1 max-w-xl">
                      <span className="text-[0.6rem] font-mono tracking-widest uppercase text-brand-cream/70 border border-brand-cream/30 px-2 py-0.5 rounded backdrop-blur-xs">
                        LIVE GAMEPLAY MECHANICS DEMO
                      </span>
                      <h4 className="text-base sm:text-xl font-bold text-white tracking-tight">
                        Real-time Gameplay & Physics Simulation
                      </h4>
                      <p className="text-[0.7rem] text-brand-cream/80 font-mono">
                        Handcrafted puzzle-platformer physics, dual entity synchronization, and state management in action.
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="border border-brand-cream/50 bg-black/60 px-2.5 py-1 text-[0.65rem] font-mono tracking-widest uppercase text-brand-cream">
                        GDAI Jam · Rank #2
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SELECTED WORKS (Interactive 4 Games Showcase with Playable WebGL)
          ========================================================================= */}
      <section id="selected-works" className="border-b border-brand-primary/50">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-brand-primary/50 pt-16 md:pt-36">
            {/* Section Header */}
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-brand-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="mb-2 md:mb-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">
                    selected
                  </p>
                  <h2 className="text-5xl leading-[0.85] font-bold tracking-[-0.06em] md:text-7xl lg:text-8xl">
                    works.
                  </h2>
                </div>
                <div className="text-[0.68rem] font-mono tracking-widest uppercase opacity-75 md:text-right pb-1">
                  [ 4 TITLES READY TO PLAY HERE IN BROWSER ]
                </div>
              </div>
            </div>

            {/* Interactive Component with Playable Builds */}
            <SelectedWorks />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SERVICES & CAPABILITIES (Exact mijobello dynamic min-height rows)
          ========================================================================= */}
      <section id="my-services" className="border-b border-brand-primary/50">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-brand-primary/50 pt-16 md:pt-36">
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-brand-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-5">
                <p className="mb-2 md:mb-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">
                  my
                </p>
                <h2 className="text-5xl leading-[0.85] font-bold tracking-[-0.06em] md:text-7xl lg:text-8xl">
                  skills.
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Capability Row 01 */}
        <div className="group grid grid-cols-4 md:grid-cols-12 border-b border-brand-primary/50 transition-[min-height,background-color] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:min-h-[160px] md:hover:min-h-[220px] hover:bg-brand-primary/5">
          <span className="col-span-1 p-3 md:p-5 flex items-start tabular-nums opacity-60 text-[0.65rem] tracking-[0.18em] uppercase font-mono">
            01
          </span>
          <h3 className="col-span-3 md:col-span-6 border-l border-brand-primary/50 md:border-r p-3 md:p-5 flex items-center text-2xl font-semibold tracking-[-0.03em] md:text-4xl">
            game programming
          </h3>
          <ul className="col-span-3 col-start-2 md:col-span-5 md:col-start-auto border-l border-brand-primary/50 md:border-l-0 p-3 md:p-5 flex flex-col justify-center gap-1.5 text-[0.65rem] md:text-xs tracking-[0.18em] uppercase font-mono">
            <li>unity & c#</li>
            <li>godot & gdscript</li>
            <li>movement & physics</li>
            <li>state machines</li>
            <li>webgl optimization</li>
            <li>level logic & progression</li>
          </ul>
        </div>

        {/* Capability Row 02 */}
        <div className="group grid grid-cols-4 md:grid-cols-12 border-b border-brand-primary/50 transition-[min-height,background-color] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:min-h-[160px] md:hover:min-h-[220px] hover:bg-brand-primary/5">
          <span className="col-span-1 p-3 md:p-5 flex items-start tabular-nums opacity-60 text-[0.65rem] tracking-[0.18em] uppercase font-mono">
            02
          </span>
          <h3 className="col-span-3 md:col-span-6 border-l border-brand-primary/50 md:border-r p-3 md:p-5 flex items-center text-2xl font-semibold tracking-[-0.03em] md:text-4xl">
            systems & mechanics design
          </h3>
          <ul className="col-span-3 col-start-2 md:col-span-5 md:col-start-auto border-l border-brand-primary/50 md:border-l-0 p-3 md:p-5 flex flex-col justify-center gap-1.5 text-[0.65rem] md:text-xs tracking-[0.18em] uppercase font-mono">
            <li>clone synchronization</li>
            <li>mirrored inputs</li>
            <li>incremental loops</li>
            <li>puzzle progression</li>
            <li>2-player co-op systems</li>
            <li>player retention pacing</li>
          </ul>
        </div>

        {/* Capability Row 03 */}
        <div className="group grid grid-cols-4 md:grid-cols-12 border-b border-brand-primary/50 transition-[min-height,background-color] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:min-h-[160px] md:hover:min-h-[220px] hover:bg-brand-primary/5">
          <span className="col-span-1 p-3 md:p-5 flex items-start tabular-nums opacity-60 text-[0.65rem] tracking-[0.18em] uppercase font-mono">
            03
          </span>
          <h3 className="col-span-3 md:col-span-6 border-l border-brand-primary/50 md:border-r p-3 md:p-5 flex items-center text-2xl font-semibold tracking-[-0.03em] md:text-4xl">
            tools & pipeline
          </h3>
          <ul className="col-span-3 col-start-2 md:col-span-5 md:col-start-auto border-l border-brand-primary/50 md:border-l-0 p-3 md:p-5 flex flex-col justify-center gap-1.5 text-[0.65rem] md:text-xs tracking-[0.18em] uppercase font-mono">
            <li>figma ui design</li>
            <li>photoshop</li>
            <li>blender 3d</li>
            <li>aseprite pixel art</li>
            <li>milanote gdd</li>
            <li>android & webgl export</li>
          </ul>
        </div>
      </section>

      {/* =========================================================================
          TRACK RECORD & ACHIEVEMENTS (From CV)
          ========================================================================= */}
      <section className="border-b border-brand-primary/50">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-brand-primary/50 pt-16 md:pt-36">
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-brand-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-5 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <div>
                  <p className="mb-2 md:mb-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">
                    track
                  </p>
                  <h2 className="text-5xl leading-[0.85] font-bold tracking-[-0.06em] md:text-7xl lg:text-8xl">
                    record.
                  </h2>
                </div>
                <span className="text-[0.68rem] font-mono tracking-widest uppercase opacity-70 pb-1">
                  [ COMPETITIVE JAMS & EDUCATION ]
                </span>
              </div>
            </div>

            {/* Achievements Table */}
            <div className="divide-y divide-brand-primary/50">
              {/* Item 1 */}
              <div className="grid grid-cols-4 md:grid-cols-10 p-4 md:p-6 items-baseline gap-4 hover:bg-brand-primary/5 transition-colors">
                <span className="col-span-1 text-[0.65rem] font-mono tracking-widest uppercase opacity-60">
                  01
                </span>
                <div className="col-span-3 md:col-span-6">
                  <h4 className="text-xl md:text-2xl font-bold tracking-[-0.03em]">
                    Rank #2 Solo Developer — LPU Game Masters Game Jam
                  </h4>
                  <p className="text-sm leading-relaxed opacity-85 mt-1">
                    Conducted in collaboration with Game Developer Association of India (GDAI). Competed against 25+ teams as a solo developer with &quot;Ulta He Krega&quot;.
                  </p>
                </div>
                <div className="col-span-4 md:col-span-3 text-left md:text-right text-xs font-mono tracking-wider opacity-70">
                  MAY 2026 · GDAI JAM
                </div>
              </div>

              {/* Item 2 */}
              <div className="grid grid-cols-4 md:grid-cols-10 p-4 md:p-6 items-baseline gap-4 hover:bg-brand-primary/5 transition-colors">
                <span className="col-span-1 text-[0.65rem] font-mono tracking-widest uppercase opacity-60">
                  02
                </span>
                <div className="col-span-3 md:col-span-6">
                  <h4 className="text-xl md:text-2xl font-bold tracking-[-0.03em]">
                    Top 10 Most Rated — Brainless Game Jam
                  </h4>
                  <p className="text-sm leading-relaxed opacity-85 mt-1">
                    Achieved Top 10 position out of 550+ entries worldwide with &quot;Tiny Together&quot;, celebrated for synchronized 2-player character puzzles.
                  </p>
                </div>
                <div className="col-span-4 md:col-span-3 text-left md:text-right text-xs font-mono tracking-wider opacity-70">
                  MAY 2026 · 550+ ENTRIES
                </div>
              </div>

              {/* Item 3 */}
              <div className="grid grid-cols-4 md:grid-cols-10 p-4 md:p-6 items-baseline gap-4 hover:bg-brand-primary/5 transition-colors">
                <span className="col-span-1 text-[0.65rem] font-mono tracking-widest uppercase opacity-60">
                  03
                </span>
                <div className="col-span-3 md:col-span-6">
                  <h4 className="text-xl md:text-2xl font-bold tracking-[-0.03em]">
                    Unity Certified Associate: Game Developer
                  </h4>
                  <p className="text-sm leading-relaxed opacity-85 mt-1">
                    In Progress. Deepening formal mastery in gameplay programming, Unity systems architecture, profiling, and debugging pipelines.
                  </p>
                </div>
                <div className="col-span-4 md:col-span-3 text-left md:text-right text-xs font-mono tracking-wider opacity-70">
                  2026 · IN PROGRESS
                </div>
              </div>

              {/* Item 4 */}
              <div className="grid grid-cols-4 md:grid-cols-10 p-4 md:p-6 items-baseline gap-4 hover:bg-brand-primary/5 transition-colors">
                <span className="col-span-1 text-[0.65rem] font-mono tracking-widest uppercase opacity-60">
                  04
                </span>
                <div className="col-span-3 md:col-span-6">
                  <h4 className="text-xl md:text-2xl font-bold tracking-[-0.03em]">
                    Bachelor of Technology — Computer Science & Engineering
                  </h4>
                  <p className="text-sm leading-relaxed opacity-85 mt-1">
                    Lovely Professional University, Punjab, India. CGPA: 7.32.
                  </p>
                </div>
                <div className="col-span-4 md:col-span-3 text-left md:text-right text-xs font-mono tracking-wider opacity-70">
                  2023 — PRESENT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WANT TO CHAT? (Contact Section)
          ========================================================================= */}
      <section id="contact" className="border-b border-brand-primary/50">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-brand-primary/50 pt-16 md:pt-36 pb-0">
            {/* Header */}
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-brand-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-5">
                <p className="mb-2 md:mb-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">
                  want to
                </p>
                <h2 className="text-5xl leading-[0.85] font-bold tracking-[-0.06em] md:text-7xl lg:text-8xl">
                  chat?
                </h2>
              </div>
            </div>

            {/* Content Row */}
            <div className="relative">
              <div className="grid grid-cols-4 md:grid-cols-10">
                <div className="col-span-4 md:col-span-4 border-r-0 md:border-r border-brand-primary/50 p-4 md:p-8 flex flex-col items-start justify-between gap-8 py-12 md:py-20">
                  <div className="space-y-4">
                    <p className="max-w-[44ch] text-lg md:text-xl leading-relaxed">
                      Got a game project, game jam collaboration, or gameplay programming role in mind? I&apos;d love to hear about it.
                    </p>

                    <div className="space-y-1.5 text-xs font-mono tracking-wider opacity-85 pt-2">
                      <p>
                        <span className="opacity-50">EMAIL:</span>{" "}
                        <a
                          href="mailto:kdivyanshu1012@gmail.com"
                          className="hover:underline"
                        >
                          kdivyanshu1012@gmail.com
                        </a>
                      </p>
                      <p>
                        <span className="opacity-50">LOCATION:</span> Punjab, India
                      </p>
                      <p className="pt-2">
                        <Link
                          href="/cv"
                          className="inline-flex items-center gap-1.5 font-bold text-brand-primary underline hover:opacity-80"
                        >
                          <span>VIEW CURRICULUM VITAE (CV)</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </p>
                    </div>
                  </div>

                  <a
                    href="mailto:kdivyanshu1012@gmail.com"
                    className="group/cta relative inline-block overflow-hidden border border-brand-primary/50 px-5 py-2.5 text-base md:text-lg leading-[1.3] tracking-[0.06em] uppercase transition-colors hover:bg-brand-primary hover:text-brand-cream"
                  >
                    <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/cta:-translate-y-[200%]">
                      contact me →
                    </span>
                    <span
                      className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/cta:translate-y-0 font-bold"
                      aria-hidden="true"
                    >
                      contact me →
                    </span>
                  </a>
                </div>

                <div className="group relative col-span-4 md:col-span-6 min-h-[300px] md:min-h-[460px] overflow-hidden bg-black/90 flex items-center justify-center">
                  <Image
                    src="/images/games/risky-business-banner.png"
                    alt="Risky Business Island Showcase"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
                  <div className="relative z-10 p-6 text-center space-y-2 max-w-sm">
                    <span className="text-[0.6rem] font-mono tracking-[0.2em] text-brand-cream/80 uppercase border border-brand-cream/30 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      OPEN FOR COLLABORATION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Let&apos;s Build Games Together
                    </h3>
                    <p className="text-xs text-brand-cream/80 font-mono">
                      Unity & Godot Gameplay Programming · Game Jam Partnerships
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
