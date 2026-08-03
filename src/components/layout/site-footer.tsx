import Link from "next/link";
import { Code2, MessageCircle, Radio } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SiteLogo } from "@/components/layout/site-logo";
import { navigationItems } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";

const socialLinks = [
  { href: "#", label: "Code profile", icon: Code2 },
  { href: "#", label: "Community", icon: MessageCircle },
  { href: "#", label: "Social feed", icon: Radio },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-border bg-surface/70 border-t">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <SiteLogo />
            <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-6">
              Independent games made with care, curiosity, and a little chaos.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="text-foreground text-sm font-semibold">Explore</p>
            <ul className="mt-3 space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-foreground text-sm font-semibold">Follow the arcade</p>
            <div className="mt-3 flex gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  aria-label={label}
                  className="border-border text-muted-foreground hover:border-primary hover:text-primary grid size-9 place-items-center rounded-md border transition-colors"
                  href={href}
                  key={label}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-border text-muted-foreground mt-10 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} KD Arcade. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, and good vibes · v{siteConfig.version}</p>
        </div>
      </Container>
    </footer>
  );
}
