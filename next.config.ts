import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Racine fixée sur ce dossier : sinon Turbopack la devine en remontant jusqu'au
  // premier fichier de verrou trouvé (un package-lock.json vide dans le dossier
  // personnel lui a fait surveiller tout le home et saturer la RAM, 25/10/2026).
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Include MDX content files in the serverless function bundle
  outputFileTracingIncludes: {
    "/[locale]/docs/[slug]": ["./src/content/docs/**/*.mdx"],
    "/[locale]": ["./src/content/docs/**/*.mdx"],
    "/api/search-index": ["./src/content/docs/**/*.mdx"],
  },
};

export default withNextIntl(nextConfig);
