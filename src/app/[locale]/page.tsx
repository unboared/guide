import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Rocket, Gamepad2, Mic, HelpCircle } from "lucide-react";

const cards = [
  {
    key: "getting-started" as const,
    href: "/docs/how-it-works",
    icon: Rocket,
    color: "text-blue-500",
  },
  {
    key: "games" as const,
    href: "/docs/games-overview",
    icon: Gamepad2,
    color: "text-emerald-500",
  },
  {
    key: "animate" as const,
    href: "/docs/prepare-event",
    icon: Mic,
    color: "text-purple-500",
  },
  {
    key: "help" as const,
    href: "/docs/faq",
    icon: HelpCircle,
    color: "text-amber-500",
  },
];

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 w-full max-w-2xl">
        {cards.map(({ key, href, icon: Icon, color }) => (
          <Link
            key={key}
            href={href}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <Icon className={`h-8 w-8 mb-3 ${color}`} />
            <h2 className="font-semibold mb-1 group-hover:text-primary transition-colors">
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
