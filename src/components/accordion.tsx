"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("border rounded-lg mb-3 transition-colors duration-200", isOpen ? "border-primary/30" : "border-border")}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-sm hover:bg-muted/50 rounded-lg transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-all duration-200",
            isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>a]:text-primary [&>a]:underline">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return <div className="my-6">{children}</div>;
}
