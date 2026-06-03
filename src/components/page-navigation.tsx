"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NavItem } from "@/lib/navigation";

export function PageNavigation({
  prev,
  next,
}: {
  prev: NavItem | null;
  next: NavItem | null;
}) {
  const locale = useLocale();
  const t = useTranslations("doc");

  return (
    <div className="mt-16 grid gap-3 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-[var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-x-0.5 group-hover:text-primary" />
          <span className="min-w-0">
            <span
              className="block text-[0.6875rem] uppercase tracking-wider text-[var(--txt-3)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("prevPage")}
            </span>
            <span className="block truncate text-sm font-medium text-foreground">
              {locale === "fr" ? prev.titleFr : prev.titleEn}
            </span>
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex items-center justify-end gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-right transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-[var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <span className="min-w-0">
            <span
              className="block text-[0.6875rem] uppercase tracking-wider text-[var(--txt-3)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("nextPage")}
            </span>
            <span className="block truncate text-sm font-medium text-foreground">
              {locale === "fr" ? next.titleFr : next.titleEn}
            </span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}
