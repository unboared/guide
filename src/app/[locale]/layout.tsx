import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Sora } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNavProvider } from "@/components/mobile-nav-provider";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`h-full antialiased ${sora.variable}`}>
      <body className="min-h-full bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <MobileNavProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                  <div className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </MobileNavProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
