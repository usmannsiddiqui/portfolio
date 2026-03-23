import Image from "next/image";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio-data";

export default function Hero() {
  return (
    <section id="hero" className="min-h-[90vh] flex items-center py-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center w-full">

        {/* ── Text ── */}
        <div className="flex flex-col gap-6 order-2 md:order-1">

          {/* Status pill */}
          <div className="flex items-center gap-2.5 w-fit">
            <span
              aria-hidden="true"
              className="animate-pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-amber shrink-0"
            />
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
              Penn State University · Computer Science
            </p>
          </div>

          {/* Name */}
          <div>
            <h1 className="font-bold text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.08] tracking-tight text-foreground">
              {personal.name}
            </h1>
            <p className="mt-3 text-base md:text-lg font-medium text-amber tracking-wide">
              {personal.headline}
            </p>
          </div>

          {/* Subheadline */}
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
            {personal.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap pt-1">
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors duration-150"
            >
              <a href="#work">View My Work</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:border-foreground/30 hover:bg-white/[0.04] transition-colors duration-150"
            >
              <a href={`mailto:${personal.email}`}>Contact Me</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <a href={personal.resume} target="_blank" rel="noopener noreferrer">
                Resume ↗
              </a>
            </Button>
          </div>
        </div>

        {/* ── Photo ── */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <div className="w-52 h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 rounded-xl overflow-hidden ring-1 ring-border">
            <Image
              src={personal.photo}
              alt={personal.name}
              width={256}
              height={256}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
