import { cn } from "@/lib/cn";

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("glass rounded-2xl", className)}>
      <div className="relative overflow-hidden rounded-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(700px_circle_at_0%_0%,rgba(255,255,255,0.08),transparent_38%),radial-gradient(520px_circle_at_100%_0%,rgba(255,255,255,0.06),transparent_44%)]" />
        <div className="relative p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
