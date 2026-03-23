import { experience } from "@/data/portfolio-data";

const FEATURED_ORGS = new Set([
  "Penn State IT Learning & Development",
  "Penn State Libraries",
]);

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 lg:gap-16">

        {/* Sticky label */}
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-amber md:sticky md:top-20">
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical line — amber fading to transparent */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{
              background: "linear-gradient(to bottom, oklch(0.78 0.13 72 / 0.5), transparent)",
            }}
          />

          {experience.map((entry, i) => {
            const isFeatured = FEATURED_ORGS.has(entry.org);

            return (
              <div key={i} className="relative pl-8 pb-10 last:pb-0 group">

                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-[6px] -translate-x-1/2"
                >
                  {isFeatured ? (
                    <span className="block w-2.5 h-2.5 rounded-full bg-amber" />
                  ) : (
                    <span className="block w-2 h-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={[
                    "surface p-5 transition-all duration-200",
                    "group-hover:border-border group-hover:bg-white/[0.035] group-hover:scale-[1.015]",
                  ].join(" ")}
                >
                  {/* Featured label */}
                  {isFeatured && (
                    <span className="inline-block mb-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-amber">
                      Flagship
                    </span>
                  )}

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <h3 className="font-semibold text-foreground leading-snug">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{entry.org}</p>
                    </div>
                    <span className="text-xs text-muted-foreground/50 whitespace-nowrap shrink-0">
                      {entry.period}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {entry.summary}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {entry.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2 text-sm text-muted-foreground/70">
                        <span className="text-amber mt-0.5 shrink-0 select-none">·</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  {entry.links && entry.links.length > 0 && (
                    <div className="mt-4 flex gap-4 flex-wrap pt-3 border-t border-border/50">
                      {entry.links.map((link, k) => (
                        <a
                          key={k}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
