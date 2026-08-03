import Link from "next/link";
import { GithubIcon, TwitterIcon, DiscordIcon } from "@/components/ui/icons";
import { Container } from "@/components/layout/container";
import { SiteLogo } from "@/components/layout/site-logo";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-slate-800 bg-slate-950/80 border-t text-slate-400 text-xs">
      <Container className="py-8 sm:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <SiteLogo />
            <p className="text-slate-400 max-w-xs leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="text-white font-pixel font-semibold uppercase text-xs tracking-wider mb-3">
              Explore Platform
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/games" className="hover:text-purple-400 transition">
                  Games Catalog
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-purple-400 transition">
                  Community Hub
                </Link>
              </li>
              <li>
                <Link href="/devlog" className="hover:text-purple-400 transition">
                  Devlog & Updates
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-400 transition">
                  About the Studio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-white font-pixel font-semibold uppercase text-xs tracking-wider mb-3">
              Developer Controls
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/cms" className="hover:text-purple-400 transition">
                  Developer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/cms/analytics" className="hover:text-purple-400 transition">
                  Analytics & Telemetry
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-purple-400 transition">
                  Player Profile & Cloud Saves
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-purple-400 transition">
                  Sign In / Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-white font-pixel font-semibold uppercase text-xs tracking-wider mb-3">
              Connect With Us
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500 hover:text-purple-400 transition"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-blue-400 transition"
                aria-label="Twitter Profile"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg/kdarcade"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 transition"
                aria-label="Discord Server"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-slate-800/80 text-slate-500 mt-8 flex flex-col sm:flex-row items-center justify-between border-t pt-4 gap-2 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} KD Arcade. All rights reserved. Created by Divyanshu Kumar.</p>
          <p>Built with Next.js 15, TypeScript & Clean Architecture.</p>
        </div>
      </Container>
    </footer>
  );
}
