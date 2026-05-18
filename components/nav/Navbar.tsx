"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import ThemeToggle from "@/components/theme/ThemeToggle";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const items = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <header className="sticky top-0 z-40">
      <div
        className={cn(
          "border-b border-white/0 transition",
          scrolled ? "bg-black/30 backdrop-blur-xl border-white/10" : "bg-transparent"
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          <a href="#" className="group inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full [background:linear-gradient(90deg,var(--accent-2),var(--accent-1))]" />
            <span className="text-sm font-semibold tracking-tight">
              {site.name}
            </span>
            <span className="hidden text-xs text-muted sm:inline">
              / {site.role} / {year}
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="text-sm text-muted transition hover:text-foreground"
              >
                {it.label}
              </a>
            ))}
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/80 backdrop-blur-md transition hover:bg-white/8 hover:text-foreground"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </Container>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-md md:hidden">
          <div className="absolute inset-x-0 top-0 border-b border-white/10 bg-black/40">
            <Container className="flex h-16 items-center justify-between">
              <span className="text-sm font-semibold">{site.name}</span>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/80 backdrop-blur-md transition hover:bg-white/8 hover:text-foreground"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </Container>
          </div>
          <Container className="pt-24">
            <div className="glass rounded-2xl p-4">
              <div className="flex flex-col">
                {items.map((it) => (
                  <a
                    key={it.href}
                    href={it.href}
                    className="rounded-xl px-4 py-3 text-sm text-foreground/90 transition hover:bg-white/6"
                    onClick={() => setOpen(false)}
                  >
                    {it.label}
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

