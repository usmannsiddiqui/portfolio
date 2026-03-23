import { Mail, Linkedin, Github, Globe } from "lucide-react";
import { personal } from "@/data/portfolio-data";

const LINKS = [
  {
    label: "LinkedIn",
    href: personal.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: personal.github,
    icon: Github,
  },
  {
    label: "AI Guides",
    href: personal.aiGuides,
    icon: Globe,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 lg:gap-16">
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-amber">
            Contact
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-bold text-2xl md:text-3xl text-foreground tracking-tight">
              Let&apos;s Connect
            </h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed max-w-md">
              Whether you have an opportunity, a question, or just want to talk
              about AI and technology — I&apos;d love to hear from you.
            </p>
          </div>

          {/* Email CTA */}
          <a
            href={`mailto:${personal.email}`}
            className="group w-fit flex items-center gap-3 surface px-5 py-3 hover:border-border hover:bg-white/[0.035] transition-all duration-200 hover:scale-[1.015]"
          >
            <Mail className="w-4 h-4 text-amber shrink-0" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-150">
              {personal.email}
            </span>
            <span className="text-muted-foreground/30 group-hover:text-muted-foreground text-sm transition-colors duration-150 ml-1">
              ↗
            </span>
          </a>

          {/* Social links */}
          <div className="flex flex-wrap gap-2">
            {LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-xs font-medium text-muted-foreground border border-border rounded-full px-4 py-2 hover:text-foreground hover:border-foreground/25 transition-all duration-150 hover:scale-[1.03]"
              >
                <Icon className="w-3.5 h-3.5 shrink-0 transition-colors duration-150" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
