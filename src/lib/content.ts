import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Use path relative to project root - works both locally and on Vercel
// because Next.js includes files read during build in the serverless bundle
// when they're accessed via process.cwd()
const contentDir = path.join(process.cwd(), "src/content/docs");

export type DocMeta = {
  title: string;
  description: string;
  slug: string;
};

export function getDoc(locale: string, slug: string) {
  try {
    const filePath = path.join(contentDir, locale, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      meta: data as DocMeta,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllDocs(locale: string): DocMeta[] {
  try {
    const dir = path.join(contentDir, locale);
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => {
        const raw = fs.readFileSync(path.join(dir, f), "utf-8");
        const { data } = matter(raw);
        return { ...data, slug: f.replace(".mdx", "") } as DocMeta;
      });
  } catch {
    return [];
  }
}
