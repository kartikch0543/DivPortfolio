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
      <span className="bg-secondary text-secondary-foreground grid size-9 place-items-center rounded-md shadow-sm transition-transform duration-200 group-hover:-rotate-3">
        <Gamepad2 aria-hidden="true" className="size-5" strokeWidth={2.4} />
      </span>
      <span className="font-pixel text-foreground text-base tracking-tight">
        KD Arcade
      </span>
    </Link>
  );
}
