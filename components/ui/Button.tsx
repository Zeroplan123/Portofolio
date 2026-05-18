import Link from "next/link";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

export default function Button({
  href,
  children,
  className,
  variant = "primary",
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  external?: boolean;
}) {
  const base =
    "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "glow-ring border border-white/10 bg-white/10 text-foreground hover:-translate-y-0.5 hover:bg-white/12",
    secondary:
      "border border-white/10 bg-transparent text-foreground/90 hover:bg-white/6",
    ghost: "bg-transparent text-foreground/80 hover:text-foreground",
  };

  const content = (
    <span className="relative">
      <span className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-300 [background:linear-gradient(90deg,var(--accent-2),var(--accent-1))] group-hover:opacity-30" />
      {children}
    </span>
  );

  const cls = cn(base, variants[variant], className);

  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={cls} href={href}>
      {content}
    </Link>
  );
}

