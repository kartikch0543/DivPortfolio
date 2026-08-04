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
    <header className="border-b-2 border-indigo-900/20 dark:border-purple-800/50 bg-background/90 sticky top-0 z-50 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <SiteLogo />
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1.5 lg:flex"
        >
          {navigationItems.map((item) => (
            <Link
              className="text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-950/80 hover:text-purple-700 dark:hover:text-purple-300 rounded-full px-4 py-1.5 text-xs font-mono font-semibold transition-all hover:scale-105"
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
            className="lg:hidden rounded-full"
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
            className="border-b-2 border-indigo-900/20 dark:border-purple-800/50 bg-background overflow-hidden border-t lg:hidden"
            exit={{ height: 0, opacity: 0 }}
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
          >
            <Container className="flex flex-col gap-1 py-3">
              {navigationItems.map((item) => (
                <Link
                  className="text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-950/80 hover:text-purple-700 dark:hover:text-purple-300 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold transition-colors"
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
