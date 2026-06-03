import { Link } from "@/i18n/navigation";
import { Users, Clock } from "lucide-react";

type GameCardProps = {
  slug: string;
  name: string;
  description: string;
  players: string;
  duration: string;
  category: "quiz" | "action";
  icon?: string;
  color: string;
};

export function GameCard({
  slug,
  name,
  description,
  players,
  duration,
  category,
  icon,
  color,
}: GameCardProps) {
  return (
    <Link
      href={`/docs/${slug}`}
      className="group block rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-[var(--surface-2)] hover:shadow-[0_0_24px_var(--pink-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <div className="flex items-start gap-4">
        {icon ? (
          <img
            src={icon}
            alt={name}
            className="h-12 w-12 shrink-0 rounded-lg object-cover ring-1 ring-[var(--line-2)]"
          />
        ) : (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
            style={{ backgroundColor: color, fontFamily: "var(--font-display)" }}
          >
            {name[0]}
          </div>
        )}
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <h3
              className="font-semibold text-foreground transition-colors group-hover:text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {name}
            </h3>
            <span className="rounded-full border border-primary/20 bg-[var(--pink-soft)] px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-primary">
              {category === "quiz" ? "Quiz" : "Action"}
            </span>
          </div>
          <p className="mb-3 text-sm text-muted-foreground">{description}</p>
          <div
            className="flex gap-4 text-xs text-[var(--txt-3)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {players}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {duration}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
