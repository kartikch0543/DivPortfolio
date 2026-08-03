"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      {...props}
    >
      <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
