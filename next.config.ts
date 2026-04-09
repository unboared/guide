import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Include MDX content files in the serverless function bundle
  outputFileTracingIncludes: {
    "/[locale]/docs/[slug]": ["./src/content/docs/**/*.mdx"],
    "/[locale]": ["./src/content/docs/**/*.mdx"],
  },
};

export default withNextIntl(nextConfig);
