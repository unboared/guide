import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Rocket, Gamepad2, Mic, HelpCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
  {
    key: "getting-started" as const,
    href: "/docs/how-it-works",
    icon: Rocket,
    glow: true,
  },
  {
    key: "games" as const,
    href: "/docs/games-overview",
    icon: Gamepad2,
    glow: false,
  },
  {
    key: "animate" as const,
    href: "/docs/prepare-event",
    icon: Mic,
    glow: false,
  },
  {
    key: "help" as const,
    href: "/docs/faq",
    icon: HelpCircle,
    glow: false,
  },
];

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="mb-12 flex flex-col items-center text-center">
        <img
          src="/images/logo-unboared-sm-tr.png"
          alt="Unboared"
          width={64}
          height={64}
          className="mb-6 h-16 w-16 animate-fade-in-up drop-shadow-[0_0_24px_var(--pink-glow)]"
        />
        <span
          className="mb-4 animate-fade-in-up rounded-full border border-[var(--line-2)] bg-[var(--surface)] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)", animationDelay: "0.05s" }}
        >
          {t("eyebrow")}
        </span>
        <h1
          className="mb-3 animate-fade-in-up text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-display)", animationDelay: "0.1s" }}
        >
          {t("title")}
        </h1>
        <p
          className="mb-7 max-w-lg animate-fade-in-up text-lg text-muted-foreground"
          style={{ animationDelay: "0.15s" }}
        >
          {t("subtitle")}
        </p>
        <div
          className="flex animate-fade-in-up flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            href="/docs/how-it-works"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_var(--pink-glow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_32px_var(--pink-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs/games-overview"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--line-2)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-[var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="mb-10 h-px w-3/5 bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Quick-access cards */}
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {cards.map(({ key, href, icon: Icon, glow }, index) => (
          <Link
            key={key}
            href={href}
            className={cn(
              "group relative animate-fade-in-up overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-200",
              "hover:-translate-y-0.5 hover:border-primary/50 hover:bg-[var(--surface-2)] hover:shadow-[0_0_24px_var(--pink-glow)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              glow && "animate-glow-pulse border-primary/30"
            )}
            style={{ animationDelay: `${0.25 + index * 0.08}s` }}
          >
            <div className="mb-3 flex w-fit rounded-lg bg-[var(--pink-soft)] p-2 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h2
              className="mb-1 flex items-center gap-1.5 font-semibold text-foreground transition-colors group-hover:text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t(`cards.${key}.title`)}
              <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </h2>
            <p className="text-sm text-muted-foreground">
              {t(`cards.${key}.description`)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
