import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { personal } from "@/data/portfolio-data";

const LINKS = [
  { label: "GitHub", href: personal.github, icon: Github, external: true },
  { label: "LinkedIn", href: personal.linkedin, icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${personal.email}`, icon: Mail, external: false },
  { label: "Resume", href: personal.resume, icon: FileText, external: true },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col items-center justify-center gap-7 py-24 text-center"
    >
      {/* Pixel greeting */}
      <p className="font-pixel text-sm md:text-base text-foreground leading-relaxed">
        hey, <span className="text-amber">i am</span>
      </p>

      {/* Name + blinking cursor */}
      <h1 className="font-extrabold tracking-tight leading-[1.05] text-4xl md:text-6xl lg:text-7xl text-foreground">
        {personal.name}
        <span
          aria-hidden="true"
          className="animate-blink inline-block w-[0.5ch] h-[0.85em] ml-2 align-baseline translate-y-[0.12em] bg-amber"
        />
      </h1>

      {/* Headline */}
      <p className="text-sm md:text-base text-muted-foreground tracking-wide">
        {personal.headline}
      </p>

      {/* Icon links */}
      <div className="flex items-center gap-5 pt-2">
        {LINKS.map(({ label, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-muted-foreground hover:text-amber transition-all duration-150 hover:scale-110"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </section>
  );
}
