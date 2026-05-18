"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const isLight = document.documentElement.classList.contains("light");
      return isLight ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/80 backdrop-blur-md transition hover:bg-white/8 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
