"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

export function SiteHeader() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState({
    delhi: "--:--:--",
    tokyo: "--:--:--",
    london: "--:--:--",
    newyork: "--:--:--",
    sanfran: "--:--:--",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const formatTime = (timeZone: string) => {
        try {
          return new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone,
          }).format(now);
        } catch {
          return "--:--:--";
        }
      };

      setTimeStr({
        delhi: formatTime("Asia/Kolkata"),
        tokyo: formatTime("Asia/Tokyo"),
        london: formatTime("Europe/London"),
        newyork: formatTime("America/New_York"),
        sanfran: formatTime("America/Los_Angeles"),
      });
    };

    const timer = setTimeout(updateTimes, 0);
    const interval = setInterval(updateTimes, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 grid h-14 grid-cols-4 border-b border-brand-primary/50 bg-brand-cream text-brand-primary md:h-16 md:grid-cols-12 transition-colors duration-300">
        {/* Logo (Cols 1-3) */}
        <Link
          href="/"
          className="col-span-2 flex items-center border-r border-brand-primary/50 px-3 text-2xl font-bold tracking-[-0.06em] md:col-span-3 md:px-4 md:text-3xl hover:bg-brand-primary hover:text-brand-cream transition-colors"
        >
          <span>divyanshu.</span>
        </Link>

        {/* Live World Time Marquee (Cols 4-9 Desktop) */}
        <div className="hidden md:col-span-6 md:block border-r border-brand-primary/50 overflow-hidden">
          <div className="group relative h-full overflow-hidden select-none" role="status">
            <div className="animate-marquee flex h-full w-max items-center text-[0.65rem] tracking-[0.18em] uppercase group-hover:[animation-play-state:paused]">
              {/* Repeated twice for seamless marquee loop */}
              {[1, 2].map((idx) => (
                <span key={idx} className="flex shrink-0 items-center">
                  <span className="flex shrink-0 items-center whitespace-nowrap">
                    <span className="flex items-center gap-2 bg-brand-primary px-2.5 py-1 font-bold text-brand-cream">
                      <span>New Delhi</span>
                      <span className="tabular-nums font-mono">{timeStr.delhi}</span>
                      <span className="opacity-70">IST</span>
                    </span>
                    <span aria-hidden="true" className="px-5 opacity-40">
                      /
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <span>Tokyo</span>
                      <span className="tabular-nums font-mono">{timeStr.tokyo}</span>
                      <span className="opacity-40">JST</span>
                    </span>
                    <span aria-hidden="true" className="px-5 opacity-40">
                      /
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <span>London</span>
                      <span className="tabular-nums font-mono">{timeStr.london}</span>
                      <span className="opacity-40">GMT</span>
                    </span>
                    <span aria-hidden="true" className="px-5 opacity-40">
                      /
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <span>New York</span>
                      <span className="tabular-nums font-mono">{timeStr.newyork}</span>
                      <span className="opacity-40">EST</span>
                    </span>
                    <span aria-hidden="true" className="px-5 opacity-40">
                      /
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <span>San Francisco</span>
                      <span className="tabular-nums font-mono">{timeStr.sanfran}</span>
                      <span className="opacity-40">PST</span>
                    </span>
                    <span aria-hidden="true" className="px-5 opacity-40">
                      /
                    </span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Breakdowns Link, CV Link, Theme Toggle & Menu Offset (Cols 10-12) */}
        <div className="col-span-2 flex items-stretch justify-end md:col-span-3">
          <Link
            href="/breakdowns"
            className="hidden md:flex h-full items-center px-2.5 md:px-3 border-l border-brand-primary/50 text-[0.65rem] md:text-xs font-mono font-bold tracking-[0.14em] uppercase hover:bg-brand-primary hover:text-brand-cream transition-colors"
          >
            Breakdowns
          </Link>

          <Link
            href="/cv"
            className="flex h-full items-center px-3 md:px-4 border-l border-brand-primary/50 text-[0.65rem] md:text-xs font-mono font-bold tracking-[0.18em] uppercase hover:bg-brand-primary hover:text-brand-cream transition-colors"
          >
            CV
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="group/roll flex h-full cursor-pointer items-center gap-2.5 px-3 md:px-4 border-l border-brand-primary/50 transition-colors hover:bg-brand-primary hover:text-brand-cream mr-14 md:mr-16"
          >
            <span className="relative block shrink-0 overflow-hidden leading-[1.4] text-[0.65rem] tracking-[0.18em] uppercase font-bold">
              <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full">
                {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
              >
                {mounted ? (isDark ? "Light" : "Dark") : "Theme"}
              </span>
            </span>

            {/* Square theme state indicator */}
            <span
              className="relative block h-3 w-3 overflow-hidden border border-brand-primary transition-colors group-hover/roll:border-brand-cream"
              aria-hidden="true"
            >
              <span
                className={`absolute inset-0 bg-brand-primary transition-transform duration-300 ${
                  isDark ? "translate-x-0" : "-translate-x-full"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Fixed Menu Button on the top right (Exact mijobello pattern) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="fixed top-0 right-0 z-50 flex h-14 w-14 cursor-pointer items-center justify-center border-b border-l border-brand-primary/50 bg-brand-cream text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-cream md:h-16 md:w-16"
      >
        <span className="relative block h-4 w-6">
          <span
            className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
              isOpen ? "top-1/2 -rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute top-1/2 left-0 block h-px w-full bg-current transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
              isOpen ? "top-1/2 rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {/* Full-screen Slide-down Architectural Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-brand-cream text-brand-primary pt-14 md:pt-16">
          <nav className="flex-1 grid grid-cols-1 md:grid-cols-6 border-b border-brand-primary/50">
            <Link
              href="/#the-developer"
              onClick={() => setIsOpen(false)}
              className="group flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-primary/50 p-6 md:p-8 transition-colors hover:bg-brand-primary hover:text-brand-cream"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70">
                01
              </span>
              <span className="text-3xl md:text-5xl font-bold tracking-[-0.06em]">
                about.
              </span>
              <span className="text-xs font-mono tracking-widest uppercase">
                Biography & Background →
              </span>
            </Link>

            <Link
              href="/#selected-works"
              onClick={() => setIsOpen(false)}
              className="group flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-primary/50 p-6 md:p-8 transition-colors hover:bg-brand-primary hover:text-brand-cream"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70">
                02
              </span>
              <span className="text-3xl md:text-5xl font-bold tracking-[-0.06em]">
                works.
              </span>
              <span className="text-xs font-mono tracking-widest uppercase">
                4 Playable Games →
              </span>
            </Link>

            <Link
              href="/breakdowns"
              onClick={() => setIsOpen(false)}
              className="group flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-primary/50 p-6 md:p-8 transition-colors hover:bg-brand-primary hover:text-brand-cream bg-brand-primary/5"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70">
                03
              </span>
              <span className="text-3xl md:text-5xl font-bold tracking-[-0.06em]">
                breakdowns.
              </span>
              <span className="text-xs font-mono tracking-widest uppercase">
                Technical Deep Dives →
              </span>
            </Link>

            <Link
              href="/#my-services"
              onClick={() => setIsOpen(false)}
              className="group flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-primary/50 p-6 md:p-8 transition-colors hover:bg-brand-primary hover:text-brand-cream"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70">
                04
              </span>
              <span className="text-3xl md:text-5xl font-bold tracking-[-0.06em]">
                skills.
              </span>
              <span className="text-xs font-mono tracking-widest uppercase">
                Unity, C# & Toolchain →
              </span>
            </Link>

            <Link
              href="/cv"
              onClick={() => setIsOpen(false)}
              className="group flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-primary/50 p-6 md:p-8 transition-colors hover:bg-brand-primary hover:text-brand-cream"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70">
                05
              </span>
              <span className="text-3xl md:text-5xl font-bold tracking-[-0.06em]">
                cv.
              </span>
              <span className="text-xs font-mono tracking-widest uppercase">
                Curriculum Vitae Document →
              </span>
            </Link>

            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="group flex flex-col justify-between p-6 md:p-8 transition-colors hover:bg-brand-primary hover:text-brand-cream"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70">
                06
              </span>
              <span className="text-3xl md:text-5xl font-bold tracking-[-0.06em]">
                contact.
              </span>
              <span className="text-xs font-mono tracking-widest uppercase">
                Get In Touch →
              </span>
            </Link>
          </nav>

          {/* Quick Links bottom strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 p-4 text-[0.7rem] font-mono tracking-[0.18em] uppercase gap-4">
            <a
              href="https://kdivyanshu.itch.io/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              itch.io ↗
            </a>
            <a
              href="https://github.com/kdivyanshu1012"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              GitHub ↗
            </a>
            <Link href="/cv" onClick={() => setIsOpen(false)} className="hover:underline">
              Curriculum Vitae (CV) ↗
            </Link>
            <a href="mailto:kdivyanshu1012@gmail.com" className="hover:underline text-right">
              kdivyanshu1012@gmail.com ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
