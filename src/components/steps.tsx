export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 ml-4 border-l-2 border-border pl-6 [counter-reset:step]">
      {children}
    </div>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pb-8 last:pb-0 [counter-increment:step]">
      <div className="absolute -left-[2.125rem] flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-semibold text-primary before:content-[counter(step)]" />
      <h4 className="mb-2 font-semibold">{title}</h4>
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}
