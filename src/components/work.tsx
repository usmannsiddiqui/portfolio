import { Bot, Database } from "lucide-react";
import { work } from "@/data/portfolio-data";

const CARD_META: Record<string, { icon: React.ReactNode; featured: boolean }> = {
  "AI Guidance and Enablement at Penn State": {
    icon: <Bot className="w-4 h-4" />,
    featured: true,
  },
  "Faculty Committee Records Integration": {
    icon: <Database className="w-4 h-4" />,
    featured: false,
  },
};

export default function Work() {
  return (
    <section id="work" className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 lg:gap-16">

        {/* Sticky label */}
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-amber md:sticky md:top-20">
            Selected Work
          </h2>
        </div>

        {/* Cards — clean vertical stack */}
        <div className="flex flex-col gap-4">
          {work.map((entry) => {
            const meta = CARD_META[entry.title];
            return (
              <div
                key={entry.title}
                className="surface p-6 flex flex-col gap-4 transition-all duration-200 hover:border-border hover:bg-white/[0.035] hover:scale-[1.015] group"
              >
                {/* Top row: icon + category */}
                <div className="flex items-center gap-2">
                  {meta?.icon && (
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                      {meta.icon}
                    </span>
                  )}
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {entry.category}
                  </p>
                  {meta?.featured && (
                    <span className="ml-auto text-[10px] font-semibold tracking-[0.15em] uppercase text-amber">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title + description */}
                <div>
                  <h3 className="font-semibold text-foreground leading-snug">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {entry.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {entry.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs text-muted-foreground border border-border px-2.5 py-1 rounded-md"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Note + links */}
                {(entry.note || (entry.links && entry.links.length > 0)) && (
                  <div className="flex items-center justify-between pt-3 border-t border-border/50 flex-wrap gap-3">
                    {entry.note && (
                      <p className="text-xs text-muted-foreground/40 italic">{entry.note}</p>
                    )}
                    {entry.links && entry.links.length > 0 && (
                      <div className="flex gap-4 ml-auto">
                        {entry.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 underline underline-offset-2"
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
