import { cn } from "@/lib/cn";

export default function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/90 backdrop-blur-md",
        className
      )}
    >
      {children}
    </span>
  );
}

