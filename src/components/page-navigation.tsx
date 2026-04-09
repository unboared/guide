"use client";

import { useLocale } from "next-intl";
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

  return (
    <div className="mt-16 flex items-center justify-between border-t border-border pt-6">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all rounded-lg px-3 py-2 -mx-3 -my-2 hover:bg-primary/5"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>{locale === "fr" ? prev.titleFr : prev.titleEn}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all rounded-lg px-3 py-2 -mx-3 -my-2 hover:bg-primary/5"
        >
          <span>{locale === "fr" ? next.titleFr : next.titleEn}</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
