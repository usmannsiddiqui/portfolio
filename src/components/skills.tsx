import { skills } from "@/data/portfolio-data";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <SectionHeading>Skills</SectionHeading>

      <div className="mt-12">
        <div className="flex flex-col gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 items-start"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/40 sm:pt-1.5">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm text-foreground/75 border border-border px-3 py-1 rounded-md hover:text-foreground hover:border-foreground/20 transition-colors duration-150 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
