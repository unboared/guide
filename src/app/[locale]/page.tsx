import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Rocket, Gamepad2, Mic, HelpCircle } from "lucide-react";
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
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-display)" }}>
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Gradient divider */}
      <div className="w-3/5 h-px mb-10 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="grid gap-4 sm:grid-cols-2 w-full max-w-2xl">
        {cards.map(({ key, href, icon: Icon, glow }, index) => (
          <Link
            key={key}
            href={href}
            className={cn(
              "group rounded-xl border border-border bg-card p-6 transition-all duration-200",
              "hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_0_20px_var(--color-primary-glow)]",
              "animate-fade-in-up",
              glow && "animate-glow-pulse border-primary/30"
            )}
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <Icon className="h-8 w-8 mb-3 text-primary" />
            <h2 className="font-semibold mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              {t(`cards.${key}.title`)}
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
