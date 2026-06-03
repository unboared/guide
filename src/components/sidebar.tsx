"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useMobileNav } from "./mobile-nav-provider";

function SidebarContent() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("sections");
  const { close } = useMobileNav();

  const currentSlug = pathname.split("/docs/")[1] || "";

  return (
    <nav className="h-full overflow-y-auto px-4 py-7">
      {navigation.map((section) => (
        <div key={section.key} className="mb-7">
          <h3
            className="mb-2 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--txt-3)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t(section.key)}
          </h3>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = currentSlug === item.slug;
              const title = locale === "fr" ? item.titleFr : item.titleEn;
              return (
                <li key={item.slug} onClick={close}>
                  <Link
                    href={`/docs/${item.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative block rounded-lg px-3 py-2 text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                      isActive
                        ? "bg-[var(--pink-soft)] font-semibold text-primary"
                        : "text-muted-foreground hover:bg-[var(--surface)] hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                    )}
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function Sidebar() {
  const { isOpen, close } = useMobileNav();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-[var(--line)] bg-sidebar-bg lg:block">
        <div className="sticky top-16 h-[calc(100vh-4rem)]">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-[var(--bg)]/70 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-r border-[var(--line)] bg-sidebar-bg transition-transform duration-200 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
