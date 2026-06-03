"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * The guide ships a single dark "command center" theme (see design system
 * playbook): the palette lives unconditionally on :root in globals.css.
 * next-themes is wired with forcedTheme="dark" so the `dark` class is applied
 * deterministically on <html> (server + client, no flash) — this keeps
 * Tailwind `dark:` variants and any theme-aware integration consistent.
 * Enabling a light theme later means moving the dark tokens under a `.dark`
 * scope, adding light tokens to :root, and dropping `forcedTheme`.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
