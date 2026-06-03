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
        className="flex items-center gap-2 rounded-lg border border-[var(--line-2)] bg-[var(--surface)] px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{t("search")}</span>
        <kbd
          className="hidden rounded bg-[var(--surface-3)] px-1.5 py-0.5 text-[10px] sm:inline"
          style={{ fontFamily: "var(--font-mono)" }}
        >
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
  const t = useTranslations("search");
  const ts = useTranslations("sections");
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
    <div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-label={t("label")}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--bg)]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative mx-auto mt-[15vh] w-full max-w-lg px-4">
        <div className="animate-dialog-in overflow-hidden rounded-2xl border border-[var(--line-2)] border-t-2 border-t-primary bg-[var(--surface)] shadow-2xl">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-primary" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t("placeholder")}
              aria-label={t("placeholder")}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-[var(--surface-2)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                {t("noResults")}
              </div>
            )}

            {results.map((result, i) => (
              <button
                key={result.slug}
                onClick={() => navigate(result.slug)}
                onMouseEnter={() => setSelectedIdx(i)}
                className={cn(
                  "flex w-full items-start gap-3 border-l-2 px-4 py-3 text-left transition-all duration-150",
                  i === selectedIdx
                    ? "border-l-primary bg-[var(--pink-soft)]"
                    : "border-l-transparent hover:bg-[var(--surface-2)]"
                )}
              >
                <FileText className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 transition-colors",
                  i === selectedIdx ? "text-primary" : "text-muted-foreground"
                )} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{result.title}</span>
                    <span className="rounded-full bg-[var(--surface-3)] px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {ts.has(result.section) ? ts(result.section) : result.section}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                    {result.excerpt}
                  </p>
                </div>
              </button>
            ))}

            {query.length < 2 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                {t("minChars")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
