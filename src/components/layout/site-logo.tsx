import Link from "next/link";
import { Gamepad2, Sparkles } from "lucide-react";
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
      <span className="bg-gradient-to-tr from-sky-400 via-emerald-400 to-indigo-600 text-indigo-950 grid size-10 place-items-center rounded-2xl border-2 border-indigo-950 dark:border-indigo-400 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
        <Gamepad2 aria-hidden="true" className="size-5 text-indigo-950" strokeWidth={2.5} />
      </span>
      <div className="flex flex-col">
        <span className="font-pixel text-indigo-950 dark:text-white text-base tracking-wider flex items-center gap-1.5 font-bold">
          KD ARCADE <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
        </span>
        <span className="text-[10px] font-mono text-emerald-700 dark:text-cyan-400 font-bold uppercase tracking-wider">
          Divyanshu Kumar • Gameplay Programmer
        </span>
      </div>
    </Link>
  );
}
