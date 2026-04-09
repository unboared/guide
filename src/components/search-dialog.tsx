"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Search, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchEntry = {
  slug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  contentFr: string;
  contentEn: string;
  section: string;
};

type SearchResult = {
  slug: string;
  title: string;
  description: string;
  section: string;
  excerpt: string;
};

function searchEntries(
  entries: SearchEntry[],
  query: string,
  locale: string
): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 2) return [];

  const results: (SearchResult & { score: number })[] = [];

  for (const entry of entries) {
    const title = locale === "fr" ? entry.titleFr : entry.titleEn;
    const description =
      locale === "fr" ? entry.descriptionFr : entry.descriptionEn;
    const content = locale === "fr" ? entry.contentFr : entry.contentEn;

    let score = 0;
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    const contentLower = content.toLowerCase();

    if (titleLower.includes(q)) score += 10;
    if (descLower.includes(q)) score += 5;
    if (contentLower.includes(q)) score += 1;

    if (score === 0) continue;

    // Build excerpt from content match
    let excerpt = description;
    if (contentLower.includes(q)) {
      const idx = contentLower.indexOf(q);
      const start = Math.max(0, idx - 60);
      const end = Math.min(content.length, idx + q.length + 60);
      excerpt =
        (start > 0 ? "..." : "") +
        content.slice(start, end) +
        (end < content.length ? "..." : "");
    }

    results.push({ slug: entry.slug, title, description, section: entry.section, excerpt, score });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

const sectionLabels: Record<string, Record<string, string>> = {
  fr: {
    discover: "Découvrir",
    "getting-started": "Premiers pas",
    games: "Les jeux",
    animate: "Animer",
    "event-ideas": "Idées de soirées",
    dashboard: "Dashboard",
    account: "Mon compte",
    help: "Aide",
    resources: "Ressources",
  },
  en: {
    discover: "Discover",
    "getting-started": "Getting Started",
    games: "Games",
    animate: "Hosting",
    "event-ideas": "Event Ideas",
    dashboard: "Dashboard",
    account: "My Account",
    help: "Help",
    resources: "Resources",
  },
};

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md border border-border hover:border-muted-foreground/30 bg-muted/30"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{t("search")}</span>
        <kbd className="hidden sm:inline text-[10px] bg-muted px-1 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  );
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const locale = useLocale();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load index on mount
  useEffect(() => {
    fetch("/api/search-index")
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => {});
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Search when query changes
  useEffect(() => {
    const r = searchEntries(index, query, locale);
    setResults(r);
    setSelectedIdx(0);
  }, [query, index, locale]);

  const navigate = useCallback(
    (slug: string) => {
      router.push(`/docs/${slug}`);
      onClose();
    },
    [router, onClose]
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIdx]) {
      navigate(results[selectedIdx].slug);
    }
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Dialog */}
      <div className="relative mx-auto mt-[15vh] w-full max-w-lg px-4">
        <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={locale === "fr" ? "Rechercher dans le guide..." : "Search the guide..."}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button onClick={onClose} className="p-0.5 hover:bg-muted rounded">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                {locale === "fr"
                  ? "Aucun résultat trouvé."
                  : "No results found."}
              </div>
            )}

            {results.map((result, i) => (
              <button
                key={result.slug}
                onClick={() => navigate(result.slug)}
                onMouseEnter={() => setSelectedIdx(i)}
                className={cn(
                  "flex w-full items-start gap-3 px-4 py-3 text-left transition-all duration-150 border-l-2",
                  i === selectedIdx
                    ? "bg-primary/10 border-l-primary"
                    : "border-l-transparent hover:bg-muted/40"
                )}
              >
                <FileText className={cn(
                  "h-4 w-4 mt-0.5 shrink-0 transition-colors",
                  i === selectedIdx ? "text-primary" : "text-muted-foreground"
                )} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{result.title}</span>
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                      {sectionLabels[locale]?.[result.section] || result.section}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {result.excerpt}
                  </p>
                </div>
              </button>
            ))}

            {query.length < 2 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                {locale === "fr"
                  ? "Tapez au moins 2 caractères..."
                  : "Type at least 2 characters..."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
