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
    <nav className="h-full overflow-y-auto py-6 px-4">
      {navigation.map((section) => (
        <div key={section.key} className="mb-6">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-accent text-sidebar-active font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
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
      <aside className="hidden lg:block w-64 shrink-0 border-r border-sidebar-border bg-sidebar-bg">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)]">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-14 z-40 bg-black/40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={cn(
          "fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] w-72 border-r border-sidebar-border bg-sidebar-bg transition-transform duration-200 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
