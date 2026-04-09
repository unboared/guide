"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useMobileNav } from "./mobile-nav-provider";
import { SearchButton } from "./search-dialog";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, toggle } = useMobileNav();

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-1.5 rounded-md hover:bg-muted"
          onClick={toggle}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg tracking-tight">Unboared</span>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            Guide
          </span>
        </Link>

        {/* Search — centered */}
        <div className="flex-1 flex justify-center">
          <SearchButton />
        </div>

        {/* Language switcher */}
        <button
          onClick={switchLocale}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
        >
          <Globe className="h-4 w-4" />
          <span className="uppercase">{locale === "fr" ? "EN" : "FR"}</span>
        </button>

        {/* Back to site */}
        <a
          href="https://unboared.com"
          className="hidden sm:flex text-sm text-muted-foreground hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("backToSite")} &rarr;
        </a>
      </div>
    </header>
  );
}
