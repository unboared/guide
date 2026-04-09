import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search-index";

// Build index once and cache
let cachedIndex: ReturnType<typeof buildSearchIndex> | null = null;

export async function GET() {
  if (!cachedIndex) {
    cachedIndex = buildSearchIndex();
  }

  // Return a lighter version for the client (only titles, descriptions, sections, slugs)
  // Full content search happens server-side or we send excerpts
  const lightIndex = cachedIndex.map((entry) => ({
    slug: entry.slug,
    titleFr: entry.titleFr,
    titleEn: entry.titleEn,
    descriptionFr: entry.descriptionFr,
    descriptionEn: entry.descriptionEn,
    contentFr: entry.contentFr,
    contentEn: entry.contentEn,
    section: entry.section,
  }));

  return NextResponse.json(lightIndex, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
