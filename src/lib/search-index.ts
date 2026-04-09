import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { navigation } from "./navigation";

export type SearchEntry = {
  slug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  contentFr: string;
  contentEn: string;
  section: string;
};

/**
 * Build a search index from all MDX files at build time.
 * Strips MDX/HTML tags and returns plain text for searching.
 */
export function buildSearchIndex(): SearchEntry[] {
  const contentDir = path.join(process.cwd(), "src/content/docs");
  const entries: SearchEntry[] = [];

  for (const section of navigation) {
    for (const item of section.items) {
      const entry: SearchEntry = {
        slug: item.slug,
        titleFr: item.titleFr,
        titleEn: item.titleEn,
        descriptionFr: "",
        descriptionEn: "",
        contentFr: "",
        contentEn: "",
        section: section.key,
      };

      // Read FR
      try {
        const frPath = path.join(contentDir, "fr", `${item.slug}.mdx`);
        const raw = fs.readFileSync(frPath, "utf-8");
        const { data, content } = matter(raw);
        entry.descriptionFr = data.description || "";
        entry.contentFr = stripMdx(content);
      } catch {}

      // Read EN
      try {
        const enPath = path.join(contentDir, "en", `${item.slug}.mdx`);
        const raw = fs.readFileSync(enPath, "utf-8");
        const { data, content } = matter(raw);
        entry.descriptionEn = data.description || "";
        entry.contentEn = stripMdx(content);
      } catch {}

      entries.push(entry);
    }
  }

  return entries;
}

function stripMdx(content: string): string {
  return (
    content
      // Remove MDX components (keep text children)
      .replace(/<[^>]+>/g, " ")
      // Remove markdown images
      .replace(/!\[.*?\]\(.*?\)/g, " ")
      // Remove markdown links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Remove markdown formatting
      .replace(/#{1,6}\s/g, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      // Remove frontmatter-like lines
      .replace(/^---$/gm, "")
      // Collapse whitespace
      .replace(/\s+/g, " ")
      .trim()
      // Limit length per entry to keep index small
      .slice(0, 2000)
  );
}
