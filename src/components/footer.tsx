import { personal } from "@/data/portfolio-data";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-8 mt-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground/40 tracking-wide">
          {personal.name}
        </span>

        {/* Easter egg — Yoda */}
        <span className="text-xs italic text-muted-foreground/25 tracking-wide text-center">
          &ldquo;Do or do not, there is no try.&rdquo; &mdash; Yoda
        </span>

        <span className="text-xs text-muted-foreground/30">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
