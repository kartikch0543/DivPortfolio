import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import {
  LayoutDashboard,
  Gamepad2,
  Image as ImageIcon,
  BookOpen,
  Milestone,
  Settings,
  User,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cms/games", label: "Game Manager", icon: Gamepad2 },
  { href: "/cms/media", label: "Media Library", icon: ImageIcon },
  { href: "/cms/devlog", label: "Devlog Manager", icon: BookOpen },
  { href: "/cms/roadmap", label: "Roadmap & Releases", icon: Milestone },
  { href: "/cms/settings", label: "Site Settings", icon: Settings },
  { href: "/cms/profile", label: "Profile", icon: User },
];

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <Container className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Exit CMS
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <h1 className="font-pixel text-lg font-semibold tracking-wide text-slate-100 flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">[DEV]</span> KD Arcade CMS
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Mode
            </span>
          </div>
        </Container>
      </header>

      {/* Main Layout Grid */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-900/50 border-r border-slate-800 p-4 space-y-1">
          <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
            Developer Controls
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                {item.label}
              </Link>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
