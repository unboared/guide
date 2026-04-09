import { cn } from "@/lib/utils";
import { Info, Lightbulb, AlertTriangle } from "lucide-react";

type CalloutType = "tip" | "info" | "warning";

const config: Record<
  CalloutType,
  { icon: typeof Info; borderClass: string; bgClass: string; iconClass: string }
> = {
  tip: {
    icon: Lightbulb,
    borderClass: "border-[#FF6B35]/30",
    bgClass: "bg-[#FF6B35]/5",
    iconClass: "text-[#FF6B35]",
  },
  info: {
    icon: Info,
    borderClass: "border-[#7B61FF]/30",
    bgClass: "bg-[#7B61FF]/5",
    iconClass: "text-[#7B61FF]",
  },
  warning: {
    icon: AlertTriangle,
    borderClass: "border-[#FFB020]/30",
    bgClass: "bg-[#FFB020]/5",
    iconClass: "text-[#FFB020]",
  },
};

export function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const { icon: Icon, borderClass, bgClass, iconClass } = config[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        borderClass,
        bgClass
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconClass)} />
      <div className="text-sm leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
}
