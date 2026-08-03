import React from "react";
import Link from "next/link";
import { AuthService } from "@/services/auth/auth-service";
import { CloudSaveService } from "@/services/cloud-saves/cloud-save-service";
import { Container } from "@/components/layout/container";
import { games } from "@/data/games";
import { GithubIcon, TwitterIcon } from "@/components/ui/icons";
import {
  Shield,
  Heart,
  History,
  Cloud,
  ExternalLink,
  Settings,
  Gamepad2,
} from "lucide-react";

export default async function ProfilePage() {
  const user = await AuthService.getCurrentUser();
  const cloudSaves = await CloudSaveService.getUserSaves(user.id);

  const favoriteGames = games.filter((g) => user.favoriteGameSlugs.includes(g.slug));
  const recentGames = games.filter((g) => user.recentlyPlayedSlugs.includes(g.slug));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <Container className="max-w-5xl space-y-8 px-4">
        {/* User Card Banner */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-emerald-500 overflow-hidden flex items-center justify-center text-3xl font-pixel text-emerald-400">
                {user.avatarUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold font-pixel text-white">{user.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> {user.role}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-1">@{user.username}</p>
                <p className="text-sm text-slate-300 mt-2 max-w-xl">{user.bio}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {AuthService.canAccessCms(user) && (
                <Link
                  href="/cms"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-4 py-2 rounded-lg text-xs transition"
                >
                  <Gamepad2 className="w-4 h-4" /> Open Developer CMS
                </Link>
              )}
              <Link
                href="/cms/profile"
                className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
                title="Edit Profile Settings"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
            {user.socials.github && (
              <a
                href={user.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
            )}
            {user.socials.twitter && (
              <a
                href={user.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-400 transition"
              >
                <TwitterIcon className="w-4 h-4" /> Twitter
              </a>
            )}
            {user.socials.itchIo && (
              <a
                href={user.socials.itchIo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-rose-400 transition"
              >
                <ExternalLink className="w-4 h-4" /> itch.io
              </a>
            )}
          </div>
        </div>

        {/* Favorite & Recently Played Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Favorite Games */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> Favorite Games
            </h2>
            <div className="space-y-3">
              {favoriteGames.map((game) => (
                <div
                  key={game.slug}
                  className="flex items-center justify-between p-3.5 bg-slate-900/70 border border-slate-800 rounded-lg hover:border-slate-700 transition"
                >
                  <div>
                    <div className="font-semibold text-slate-100 text-sm">{game.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{game.tagline}</div>
                  </div>
                  <Link
                    href={`/games/${game.slug}`}
                    className="px-3 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    Play
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Played */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-blue-400" /> Recently Played
            </h2>
            <div className="space-y-3">
              {recentGames.map((game) => (
                <div
                  key={game.slug}
                  className="flex items-center justify-between p-3.5 bg-slate-900/70 border border-slate-800 rounded-lg hover:border-slate-700 transition"
                >
                  <div>
                    <div className="font-semibold text-slate-100 text-sm">{game.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 font-mono">Played 2 days ago</div>
                  </div>
                  <Link
                    href={`/games/${game.slug}`}
                    className="px-3 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    Resume
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud Saves Architecture Section */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-2">
              <Cloud className="w-4 h-4 text-purple-400" /> Cloud Saves & Sync Architecture
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              Supabase Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cloudSaves.map((slot) => (
              <div
                key={slot.id}
                className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2 font-mono text-xs"
              >
                <div className="flex justify-between text-slate-200">
                  <span className="font-semibold text-purple-300">{slot.slotName}</span>
                  <span className="text-[10px] text-slate-400">{slot.gameSlug}</span>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800 truncate">
                  {slot.dataJson}
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>Synced: {new Date(slot.updatedAt).toLocaleDateString()}</span>
                  <span>Checksum: {slot.checksum}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
