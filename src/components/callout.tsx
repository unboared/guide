import { cn } from "@/lib/utils";
import { Info, Lightbulb, AlertTriangle } from "lucide-react";

type CalloutType = "tip" | "info" | "warning";

const config: Record<
  CalloutType,
  { icon: typeof Info; className: string; label: string }
> = {
  tip: {
    icon: Lightbulb,
    className: "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20",
    label: "Astuce",
  },
  info: {
    icon: Info,
    className: "border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20",
    label: "Info",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20",
    label: "Attention",
  },
};

export function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const { icon: Icon, className } = config[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        className
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0 opacity-70" />
      <div className="text-sm leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
}
