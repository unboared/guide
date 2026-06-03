"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * The guide ships a single dark "command center" theme (see design system
 * playbook). next-themes is wired with forcedTheme so the `dark` class is
 * applied deterministically server- and client-side — no theme flash, and a
 * light variant can be enabled later by dropping `forcedTheme`.
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
