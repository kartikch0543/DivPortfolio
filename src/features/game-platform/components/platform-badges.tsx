import { Code2, Gamepad2, Monitor, Smartphone } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const icons = {
  Browser: Monitor,
  Windows: Monitor,
  Linux: Monitor,
  macOS: Monitor,
  Android: Smartphone,
  iOS: Smartphone,
  Steam: Gamepad2,
  "itch.io": Gamepad2,
  GitHub: Code2,
} as const;
export function PlatformBadges({ platforms }: { platforms: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => {
        const Icon = icons[platform as keyof typeof icons] ?? Gamepad2;
        return (
          <Badge key={platform} variant="outline">
            <Icon aria-hidden="true" className="size-3" />
            {platform}
          </Badge>
        );
      })}
    </div>
  );
}
