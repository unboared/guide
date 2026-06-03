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
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bg)]/65">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden -ml-1 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-[var(--surface)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          onClick={toggle}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo: picto losange + wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <img
            src="/images/logo-unboared-sm-tr.png"
            alt="Unboared"
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="flex items-baseline gap-1.5">
            <span
              className="text-[1.0625rem] font-bold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Unboared
            </span>
            <span
              className="rounded-md border border-primary/25 bg-[var(--pink-soft)] px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-primary"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("guideBadge")}
            </span>
          </span>
        </Link>

        {/* Search — centered */}
        <div className="flex flex-1 justify-center">
          <SearchButton />
        </div>

        {/* Language switcher */}
        <button
          onClick={switchLocale}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-[var(--surface)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label={t("switchLanguage")}
        >
          <Globe className="h-4 w-4" />
          <span
            className="uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {locale === "fr" ? "EN" : "FR"}
          </span>
        </button>

        {/* Back to site */}
        <a
          href="https://unboared.com"
          className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg px-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("backToSite")} &rarr;
        </a>
      </div>
    </header>
  );
}
