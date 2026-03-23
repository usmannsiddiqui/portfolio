import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import StarWarsCrawl from "@/components/star-wars-crawl";
import Experience from "@/components/experience";
import Work from "@/components/work";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { ParticleBackground } from "@/components/ui/particle-background";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <>
      {/* Full-page interstellar star field — fixed behind all content */}
      <ParticleBackground className="fixed inset-0 -z-10 pointer-events-none w-full h-full" />

      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero reveals immediately — no delay */}
        <BlurFade delay={0}>
          <Hero />
        </BlurFade>

        {/* Sections blur-fade in as they scroll into view */}
        <BlurFade>
          <About />
        </BlurFade>

        <BlurFade>
          <StarWarsCrawl />
        </BlurFade>

        <BlurFade>
          <Experience />
        </BlurFade>

        <BlurFade>
          <Work />
        </BlurFade>

        <BlurFade>
          <Skills />
        </BlurFade>

        <BlurFade>
          <Contact />
        </BlurFade>

        <Footer />
      </main>
    </>
  );
}
