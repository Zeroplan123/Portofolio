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
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(600px_circle_at_0%_0%,rgba(34,211,238,0.10),transparent_35%),radial-gradient(500px_circle_at_100%_0%,rgba(124,58,237,0.12),transparent_40%)]" />
        <div className="relative p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

