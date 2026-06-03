import { Info, Lightbulb, AlertTriangle } from "lucide-react";

type CalloutType = "tip" | "info" | "warning";

const config: Record<
  CalloutType,
  { icon: typeof Info; color: string; soft: string }
> = {
  tip: { icon: Lightbulb, color: "var(--green)", soft: "var(--green-soft)" },
  info: { icon: Info, color: "var(--blue)", soft: "var(--blue-soft)" },
  warning: {
    icon: AlertTriangle,
    color: "var(--gold)",
    soft: "var(--gold-soft)",
  },
};

export function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const { icon: Icon, color, soft } = config[type];

  return (
    <div
      className="my-6 flex gap-3 rounded-xl border border-[var(--line-2)] p-4"
      style={{
        backgroundColor: soft,
        borderLeftColor: color,
        borderLeftWidth: "3px",
      }}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color }} />
      <div className="text-sm leading-relaxed text-foreground [&>p]:mb-0 [&>p+p]:mt-2 [&_a]:text-primary [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
