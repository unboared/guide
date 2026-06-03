import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Rocket, Gamepad2, Mic, HelpCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Each quick-access card carries its own accent from the brand palette
// (pink / blue / gold / green) so the grid reads as a colourful menu
// rather than an all-red wall. Colours surface on hover (border + glow)
// and tint the icon pill + title.
const cards = [
  {
    key: "getting-started" as const,
    href: "/docs/how-it-works",
    icon: Rocket,
    accent: "#ff2453",
    soft: "var(--pink-soft)",
    glow: "rgba(255,36,83,0.20)",
    border: "rgba(255,36,83,0.45)",
  },
  {
    key: "games" as const,
    href: "/docs/games-overview",
    icon: Gamepad2,
    accent: "#20abf3",
    soft: "var(--blue-soft)",
    glow: "rgba(32,171,243,0.20)",
    border: "rgba(32,171,243,0.45)",
  },
  {
    key: "animate" as const,
    href: "/docs/prepare-event",
    icon: Mic,
    accent: "#f3ca20",
    soft: "var(--gold-soft)",
    glow: "rgba(243,202,32,0.18)",
    border: "rgba(243,202,32,0.45)",
  },
  {
    key: "help" as const,
    href: "/docs/faq",
    icon: HelpCircle,
    accent: "#1bc65f",
    soft: "var(--green-soft)",
    glow: "rgba(27,198,95,0.18)",
    border: "rgba(27,198,95,0.45)",
  },
];

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="mb-14 flex flex-col items-center text-center">
        <img
          src="/images/logo-unboared-sm-tr.png"
          alt="Unboared"
          width={60}
          height={60}
          className="mb-6 h-[60px] w-[60px] animate-fade-in-up drop-shadow-[0_4px_20px_rgba(255,36,83,0.18)]"
        />
        <span
          className="mb-5 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-[var(--line-2)] bg-[var(--surface)] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)", animationDelay: "0.05s" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {t("eyebrow")}
        </span>
        <h1
          className="mb-4 max-w-2xl animate-fade-in-up text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-[3.25rem]"
          style={{ fontFamily: "var(--font-display)", animationDelay: "0.1s" }}
        >
          {t("title")}
        </h1>
        <p
          className="mb-8 max-w-md animate-fade-in-up text-lg leading-relaxed text-muted-foreground"
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
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_var(--pink-glow)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_var(--pink-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs/games-overview"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--line-2)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--txt-3)] hover:bg-[var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </section>

      {/* Quick-access cards — one accent colour each */}
      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {cards.map(({ key, href, icon: Icon, accent, soft, glow, border }, index) => (
          <Link
            key={key}
            href={href}
            style={
              {
                "--ca": accent,
                "--cs": soft,
                "--cg": glow,
                "--cb": border,
                animationDelay: `${0.25 + index * 0.08}s`,
              } as React.CSSProperties
            }
            className={cn(
              "group relative flex animate-fade-in-up flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-200",
              "hover:-translate-y-1 hover:border-[var(--cb)] hover:bg-[var(--surface-2)] hover:shadow-[0_16px_40px_-12px_var(--cg)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            )}
          >
            {/* soft accent wash that fades in on hover */}
            <span
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "var(--cs)" }}
              aria-hidden
            />
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: "var(--cs)", color: "var(--ca)" }}
            >
              <Icon className="h-[22px] w-[22px]" />
            </div>
            <div>
              <h2
                className="mb-1.5 flex items-center gap-1.5 text-lg font-semibold text-foreground transition-colors group-hover:text-[var(--ca)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t(`cards.${key}.title`)}
                <ArrowRight
                  className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  style={{ color: "var(--ca)" }}
                />
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`cards.${key}.description`)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
