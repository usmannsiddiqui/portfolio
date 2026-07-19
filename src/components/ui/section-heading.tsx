export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="bleed px-6 font-extrabold tracking-tight leading-[0.95] text-foreground text-[clamp(3.25rem,11vw,8.5rem)] select-none">
      {children}
    </h2>
  );
}
