"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio-data";

const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "work", href: "#work" },
  { label: "skills", href: "#skills" },
  { label: "say hello!", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-sm"
          : "border-b border-transparent bg-background/80 backdrop-blur-sm",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">

        {/* Logo */}
        <a
          href="#"
          aria-label={personal.name}
          className="font-pixel text-xs text-amber hover:text-foreground transition-colors duration-150"
        >
          MUS
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="px-3 py-1.5 text-sm text-muted-foreground rounded-md transition-colors duration-150 hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm font-medium text-amber border border-amber/30 rounded-md hover:border-amber/60 hover:bg-amber/5 transition-colors duration-150"
            >
              resume
            </a>
          </li>
        </ul>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-60 bg-background border-l border-border">
              <SheetTitle className="text-sm font-semibold mb-6">Navigation</SheetTitle>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:text-foreground transition-colors duration-150"
                    >
                      {label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 pt-2 border-t border-border">
                  <a
                    href={personal.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-amber rounded-md hover:bg-amber/5 transition-colors duration-150"
                  >
                    resume ↗
                  </a>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  );
}
