import { cn } from "@/lib/cn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8", className)}>
      <p className="text-xs font-medium tracking-[0.25em] text-muted/90">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-7 text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

