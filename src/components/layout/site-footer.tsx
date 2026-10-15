import Link from "next/link";
import { PlaceholderRect } from "@/components/ui/placeholder-rect";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-cream/40 bg-brand-primary text-brand-cream transition-colors duration-300">
      {/* Top Media / Ambient Banner Placeholder */}
      <div className="relative h-28 md:h-44 overflow-hidden border-b border-brand-cream/40">
        <PlaceholderRect
          label="FOOTER AMBIENT BANNER"
          sublabel="1920 × 400 · GAMEPLAY MONTAGE PLACEHOLDER"
          aspectRatio="h-full w-full"
          className="border-0 bg-brand-cream/5"
        />
      </div>

      {/* Navigation Row with Rolling Text Animations */}
      <nav className="flex border-b border-brand-cream/40">
        <Link
          href="#the-developer"
          className="group/roll flex flex-1 items-center justify-center border-r border-brand-cream/40 p-4 py-8 md:py-12 text-base md:text-xl leading-[1.3] tracking-[0.06em] uppercase transition-colors hover:bg-brand-cream hover:text-brand-primary"
        >
          <span className="relative block shrink-0 overflow-hidden font-bold">
            <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full">
              about
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
            >
              about
            </span>
          </span>
        </Link>

        <Link
          href="#selected-works"
          className="group/roll flex flex-1 items-center justify-center border-r border-brand-cream/40 p-4 py-8 md:py-12 text-base md:text-xl leading-[1.3] tracking-[0.06em] uppercase transition-colors hover:bg-brand-cream hover:text-brand-primary"
        >
          <span className="relative block shrink-0 overflow-hidden font-bold">
            <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full">
              works
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
            >
              works
            </span>
          </span>
        </Link>

        <Link
          href="#contact"
          className="group/roll flex flex-1 items-center justify-center p-4 py-8 md:py-12 text-base md:text-xl leading-[1.3] tracking-[0.06em] uppercase transition-colors hover:bg-brand-cream hover:text-brand-primary"
        >
          <span className="relative block shrink-0 overflow-hidden font-bold">
            <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full">
              contact
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
            >
              contact
            </span>
          </span>
        </Link>
      </nav>

      {/* Grid: Elsewhere & Colophon */}
      <div className="grid grid-cols-4 md:grid-cols-12">
        <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-brand-cream/40">
          <div className="grid grid-cols-4 md:grid-cols-10 border-b border-brand-cream/40">
            {/* Elsewhere Links */}
            <div className="col-span-4 md:col-span-6 p-4 md:p-6 flex flex-col justify-between gap-6 py-8 md:min-h-[16rem] md:py-12">
              <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">
                elsewhere
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="https://kdivyanshu.itch.io/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/roll inline-flex items-center gap-3 text-base md:text-lg leading-[1.3] tracking-[0.06em] uppercase opacity-85 transition-opacity hover:opacity-100"
                  >
                    <span className="relative block shrink-0 overflow-hidden font-bold">
                      <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full">
                        itch.io
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
                      >
                        itch.io
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover/roll:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/kdivyanshu1012"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/roll inline-flex items-center gap-3 text-base md:text-lg leading-[1.3] tracking-[0.06em] uppercase opacity-85 transition-opacity hover:opacity-100"
                  >
                    <span className="relative block shrink-0 overflow-hidden font-bold">
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
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover/roll:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:kdivyanshu1012@gmail.com"
                    className="group/roll inline-flex items-center gap-3 text-base md:text-lg leading-[1.3] tracking-[0.06em] uppercase opacity-85 transition-opacity hover:opacity-100"
                  >
                    <span className="relative block shrink-0 overflow-hidden font-bold">
                      <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full">
                        Email
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
                      >
                        Email
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover/roll:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Colophon */}
            <div className="col-span-4 md:col-span-4 p-4 md:p-6 flex flex-col justify-between gap-6 border-t md:border-t-0 md:border-l border-brand-cream/40 py-8 md:py-12">
              <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">
                colophon
              </p>
              <div className="space-y-1.5 text-[0.65rem] tracking-[0.18em] uppercase opacity-75 font-mono">
                <p>Designed with minimal brutalist grid aesthetics.</p>
                <p>Unity & WebGL Game Engine Deployment.</p>
                <p>© {new Date().getFullYear()} divyanshu. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monumental Giant Wordmark */}
      <div className="grid grid-cols-4 md:grid-cols-12 overflow-hidden select-none">
        <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-brand-cream/40 overflow-hidden">
          <p className="-mb-[0.14em] px-2 text-center text-[24vw] leading-[0.7] font-bold tracking-[-0.13em]">
            divyanshu.
          </p>
        </div>
      </div>
    </footer>
  );
}
