import { notFound } from "next/navigation";
import { getDoc } from "@/lib/content";
import { getAllSlugs, getAdjacentPages, getNavItem } from "@/lib/navigation";
import { PageNavigation } from "@/components/page-navigation";
import { compileMDX } from "@/lib/mdx";
import { routing } from "@/i18n/routing";

// Generate all locale + slug combinations at build time
export function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const doc = getDoc(locale, slug);
  if (!doc) {
    const navItem = getNavItem(slug);
    return {
      title: navItem
        ? locale === "fr"
          ? navItem.titleFr
          : navItem.titleEn
        : "Guide Unboared",
    };
  }
  return {
    title: `${doc.meta.title} - Guide Unboared`,
    description: doc.meta.description,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Check slug is valid
  const navItem = getNavItem(slug);
  if (!navItem) {
    notFound();
  }

  const doc = getDoc(locale, slug);
  const { prev, next } = getAdjacentPages(slug);

  if (!doc) {
    // Placeholder for pages not yet written
    const title = locale === "fr" ? navItem.titleFr : navItem.titleEn;
    return (
      <div>
        <article className="prose">
          <h1>{title}</h1>
          <p className="text-muted-foreground">
            {locale === "fr"
              ? "Cette page est en cours de rédaction. Revenez bientôt !"
              : "This page is being written. Come back soon!"}
          </p>
        </article>
        <PageNavigation prev={prev} next={next} />
      </div>
    );
  }

  const content = await compileMDX(doc.content);

  return (
    <div>
      <article className="prose">
        <h1>{doc.meta.title}</h1>
        {doc.meta.description && (
          <p className="text-lg text-muted-foreground -mt-2 mb-8">
            {doc.meta.description}
          </p>
        )}
        {content}
      </article>
      <PageNavigation prev={prev} next={next} />
    </div>
  );
}
