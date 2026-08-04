import Link from "next/link";
import { GithubIcon, TwitterIcon, DiscordIcon } from "@/components/ui/icons";
import { Container } from "@/components/layout/container";
import { SiteLogo } from "@/components/layout/site-logo";
import { siteConfig } from "@/config/site";
import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-indigo-900/20 dark:border-purple-800/50 dark:bg-slate-950/90 bg-indigo-50/70 dark:text-slate-400 text-slate-700 text-xs">
      <Container className="py-8 sm:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <SiteLogo />
            <p className="dark:text-slate-400 text-slate-600 max-w-xs leading-relaxed font-medium">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="dark:text-white text-indigo-950 font-pixel font-bold uppercase text-xs tracking-wider mb-3">
              Explore Platform
            </p>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/games" className="hover:text-pink-600 dark:hover:text-purple-300 transition">
                  Games Catalog
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-pink-600 dark:hover:text-purple-300 transition">
                  Community Hub
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-pink-600 dark:hover:text-purple-300 transition">
                  About the Studio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="dark:text-white text-indigo-950 font-pixel font-bold uppercase text-xs tracking-wider mb-3">
              Developer Controls
            </p>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/cms" className="hover:text-pink-600 dark:hover:text-purple-300 transition">
                  Developer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/cms/analytics" className="hover:text-pink-600 dark:hover:text-purple-300 transition">
                  Analytics & Telemetry
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-pink-600 dark:hover:text-purple-300 transition">
                  Player Profile & Cloud Saves
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-pink-600 dark:hover:text-purple-300 transition">
                  Sign In / Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="dark:text-white text-indigo-950 font-pixel font-bold uppercase text-xs tracking-wider mb-3">
              Connect With Us
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-2xl dark:bg-slate-900 bg-white border-2 border-indigo-900/30 dark:border-slate-800 dark:text-slate-300 text-indigo-950 hover:border-pink-500 hover:text-pink-500 transition-all hover:scale-110 shadow-[2px_2px_0px_0px_rgba(67,56,202,0.15)]"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-2xl dark:bg-slate-900 bg-white border-2 border-indigo-900/30 dark:border-slate-800 dark:text-slate-300 text-indigo-950 hover:border-sky-500 hover:text-sky-500 transition-all hover:scale-110 shadow-[2px_2px_0px_0px_rgba(67,56,202,0.15)]"
                aria-label="Twitter Profile"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg/kdarcade"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-2xl dark:bg-slate-900 bg-white border-2 border-indigo-900/30 dark:border-slate-800 dark:text-slate-300 text-indigo-950 hover:border-purple-500 hover:text-purple-500 transition-all hover:scale-110 shadow-[2px_2px_0px_0px_rgba(67,56,202,0.15)]"
                aria-label="Discord Server"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-indigo-900/10 dark:border-purple-800/30 text-slate-500 dark:text-slate-400 mt-8 flex flex-col sm:flex-row items-center justify-between pt-4 gap-2 font-mono text-[11px]">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} KD Arcade. Made with <Heart className="w-3 h-3 fill-pink-500 text-pink-500 inline" /> by Divyanshu Kumar.
          </p>
          <p>Built with Next.js 15, TypeScript & Clean Architecture.</p>
        </div>
      </Container>
    </footer>
  );
}
