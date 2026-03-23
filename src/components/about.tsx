import { about } from "@/data/portfolio-data";

const ROLES = [
  "AI Consultant",
  "Software Developer",
  "Technology Consultant",
];

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 lg:gap-16">
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-amber md:sticky md:top-20">
            About
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {/* Role labels — plain, no color noise */}
          <div className="flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <span
                key={role}
                className="text-xs font-medium text-muted-foreground border border-border px-3 py-1 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-4">
            {about.bio.map((paragraph, i) => (
              <p key={i} className="text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Stat row */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-border/50">
            {[
              { label: "University", value: "Penn State" },
              { label: "Major", value: "Computer Science" },
              { label: "Focus", value: "AI · Automation · Consulting" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">
                  {label}
                </span>
                <span className="text-sm font-medium text-foreground/80">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
