import Link from "next/link";
import { Gamepad2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link
      aria-label="KD Arcade home"
      className={cn("group inline-flex items-center gap-2.5", className)}
      href="/"
    >
      <span className="bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 text-white grid size-10 place-items-center rounded-2xl border-2 border-indigo-900/80 dark:border-purple-300 shadow-[3px_3px_0px_0px_rgba(67,56,202,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
        <Gamepad2 aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </span>
      <div className="flex flex-col">
        <span className="font-pixel text-slate-900 dark:text-white text-base tracking-wider flex items-center gap-1.5 font-bold">
          KD ARCADE <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
        </span>
        <span className="text-[10px] font-mono text-purple-600 dark:text-purple-300 font-semibold">
          Indie Games & Playful Worlds
        </span>
      </div>
    </Link>
  );
}
