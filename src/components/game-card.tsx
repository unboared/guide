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
      className="group block rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_0_20px_var(--color-primary-glow)]"
    >
      <div className="flex items-start gap-4">
        {icon ? (
          <img
            src={icon}
            alt={name}
            className="h-12 w-12 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white font-bold text-lg"
            style={{ backgroundColor: color }}
          >
            {name[0]}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
              {category === "quiz" ? "Quiz" : "Action"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
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
