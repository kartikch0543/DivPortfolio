import Link from "next/link";
import { Gamepad2 } from "lucide-react";
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
      <span className="bg-gradient-to-tr from-purple-600 to-pink-500 text-white grid size-9 place-items-center rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-purple-500/30">
        <Gamepad2 aria-hidden="true" className="size-5" strokeWidth={2.4} />
      </span>
      <span className="font-pixel text-foreground text-base tracking-wide bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        KD ARCADE
      </span>
    </Link>
  );
}
