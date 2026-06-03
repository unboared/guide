"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { useMobileNav } from "./mobile-nav-provider";

const CONSOLE_URL = "https://console.unboared.com/";

function SidebarContent() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("sections");
  const tNav = useTranslations("nav");
  const { close } = useMobileNav();

  const currentSlug = pathname.split("/docs/")[1] || "";

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {navigation.map((section) => (
          <div key={section.key} className="mb-5">
            <h3
              className="mb-2 px-3 pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--txt-3)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t(section.key)}
            </h3>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = currentSlug === item.slug;
                const title = locale === "fr" ? item.titleFr : item.titleEn;
                return (
                  <li key={item.slug} onClick={close}>
                    <Link
                      href={`/docs/${item.slug}`}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative block rounded-[11px] px-3 py-2 text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                        isActive
                          ? "bg-[var(--surface-2)] font-medium text-foreground"
                          : "text-muted-foreground hover:bg-[var(--surface)] hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <span className="absolute -left-4 top-1/2 h-[22px] w-[3px] -translate-y-1/2 rounded-r bg-primary" />
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

      {/* Pinned footer: launch the console */}
      <div className="border-t border-[var(--line)] px-4 py-4">
        <a
          href={CONSOLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-[0_10px_24px_-10px_var(--pink-glow)] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          style={{ background: "linear-gradient(135deg, var(--pink), #ff6a4d)" }}
        >
          <ExternalLink className="h-4 w-4" />
          {tNav("openConsole")}
        </a>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { isOpen, close } = useMobileNav();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden w-[272px] shrink-0 border-r border-[var(--line)] lg:block"
        style={{ background: "linear-gradient(180deg, var(--bg-2), #0a0617)" }}
      >
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
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-r border-[var(--line)] transition-transform duration-200 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "linear-gradient(180deg, var(--bg-2), #0a0617)" }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
