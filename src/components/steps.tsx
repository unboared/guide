export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 ml-3 border-l border-[var(--line-2)] pl-7 [counter-reset:step]">
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
      <div
        className="absolute -left-[2.4375rem] flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-[var(--surface)] text-xs font-bold text-primary shadow-[0_0_0_4px_var(--bg)] before:content-[counter(step)]"
        style={{ fontFamily: "var(--font-mono)" }}
      />
      <h4
        className="mb-2 font-semibold text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h4>
      <div className="text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
