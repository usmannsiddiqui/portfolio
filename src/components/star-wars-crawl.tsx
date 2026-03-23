"use client";

import { useState } from "react";

const CRAWL_TEXT = {
  episode: "EPISODE IV",
  title: "A NEW HIRE",
  body: [
    "It is a period of poorly written code and confusing AI buzzwords.",
    "Striking from a hidden dorm at Penn State, a daring developer has won his first victory against the evil Galactic Empire of Spaghetti Code.",
    "Armed with the legendary tools of TypeScript, pristine UI, and an absurd amount of coffee, MUHAMMAD USMAN SIDDIQUI has restored peace and automation to the galaxy.",
    "He wields the Force of Agentic AI, moving with lightspeed to adopt every new tool pumped out by the Rebel Alliance. From Claude Code to emerging AI features, he builds and ships products faster than the Millennium Falcon.",
    "Despite his mastery of the tech arts, Usman is surprisingly jolly. He prefers talking to humans over droids, eagerly learning from their experiences. With his sights set on mastering the ancient ways of Product Management, he serves as a friendly AI Consultant — proving once and for all that not all tech-bros are completely terrible to talk to.",
  ],
};

export default function StarWarsCrawl() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-24 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 lg:gap-16">
        {/* Label column */}
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-amber">
            ai-consultant.sh
          </h2>
        </div>

        {/* Terminal window */}
        <div>
          <p className="text-sm text-muted-foreground mb-5 max-w-md">
            Hover to pause. May the code be with you.
          </p>

          {/* macOS terminal chrome */}
          <div
            className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ background: "#0d0d0d" }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]"
              style={{ background: "#1a1a1a" }}
            >
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span
                className="ml-auto text-[11px] tracking-wide"
                style={{ color: "#555" }}
              >
                ~/portfolio/ai-consultant.sh — zsh
              </span>
            </div>

            {/* ─── Crawl Viewport ─── */}
            {/*
              overflow-hidden clips everything above/below.
              perspective + perspectiveOrigin create the 3-D receding effect.
              The mask-image fades text in from the bottom and out into the top horizon.
            */}
            <div
              className="sw-crawl-viewport relative overflow-hidden"
              style={{
                height: "460px",
                perspective: "500px",
                perspectiveOrigin: "50% 0%",
                background: "#030303",
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Phase 1 — "A long time ago…" (fades in, holds ~2.5 s, fades out) */}
              <div
                className="sw-intro-text absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: 10 }}
              >
                <p
                  className="text-sm tracking-[0.35em] text-center select-none"
                  style={{ color: "#4bd5ee" }}
                >
                  A long time ago in a galaxy far, far away…
                </p>
              </div>

              {/*
                Phase 2 — Yellow crawl text.
                - position: absolute; top: 0 — element origin at container top.
                - The 0% keyframe holds at translateY(550px), which is below
                  the 460px-tall container → completely invisible during the
                  4.5 s delay and the 7% hold at the start of each loop.
                - transformOrigin: 50% bottom — rotateX pivots around the
                  bottom edge, creating the correct Star Wars tilt.
                - animationPlayState toggled by hover.
              */}
              <div
                className="sw-crawl-text absolute left-0 right-0 px-8 text-center select-none"
                style={{
                  top: 0,
                  transformOrigin: "50% bottom",
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                <p
                  className="text-xl tracking-[0.5em] uppercase mb-3"
                  style={{ color: "#FFE81F", opacity: 0.65 }}
                >
                  {CRAWL_TEXT.episode}
                </p>

                <h3
                  className="font-bold tracking-[0.1em] uppercase mb-12"
                  style={{
                    color: "#FFE81F",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "2.6rem",
                    lineHeight: 1.15,
                  }}
                >
                  {CRAWL_TEXT.title}
                </h3>

                {CRAWL_TEXT.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="mb-10 mx-auto"
                    style={{
                      color: "#FFE81F",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "1.35rem",
                      lineHeight: 1.85,
                      maxWidth: "36ch",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}

                <p
                  className="tracking-[0.45em] uppercase mt-10 mb-48"
                  style={{
                    color: "#FFE81F",
                    opacity: 0.35,
                    fontSize: "0.85rem",
                  }}
                >
                  — To be continued —
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
