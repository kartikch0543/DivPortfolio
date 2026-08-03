"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import { SiteLogo } from "@/components/layout/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/config/navigation";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="border-border/80 bg-background/90 sticky top-0 z-50 border-b backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <SiteLogo />
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigationItems.map((item) => (
            <Link
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            size="icon"
            variant="ghost"
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </Container>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.nav
            animate={{ height: "auto", opacity: 1 }}
            aria-label="Mobile navigation"
            className="border-border bg-background overflow-hidden border-t lg:hidden"
            exit={{ height: 0, opacity: 0 }}
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
          >
            <Container className="flex flex-col gap-1 py-3">
              {navigationItems.map((item) => (
                <Link
                  className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-3 text-sm font-medium transition-colors"
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
