"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/lib/projects";

function LinkChip({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/90 backdrop-blur-md transition hover:bg-white/8 hover:glow-ring"
    >
      <span className="text-foreground/80">{icon}</span>
      {label}
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="PROJECTS"
          title="Selected work"
          description="Beberapa project yang pernah saya kerjakan. Silakan klik untuk lihat GitHub atau demo."
        />

        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <StaggerItem key={p.title}>
              <Card className="group h-full transition hover:glow-ring">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold tracking-tight">
                      {p.title}
                    </p>
                    {p.year ? <p className="mt-1 text-xs text-muted">{p.year}</p> : null}
                  </div>
                  <motion.div
                    aria-hidden="true"
                    className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5"
                    initial={{ rotate: -6 }}
                    whileHover={{ rotate: 6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  />
                </div>

                <p className="mt-4 text-sm leading-7 text-muted">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="bg-white/3">
                      {t}
                    </Badge>
                  ))}
                </div>

                {p.links?.github || p.links?.live ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.links?.github ? (
                      <LinkChip
                        href={p.links.github}
                        label="GitHub"
                        icon={<Code2 size={14} />}
                      />
                    ) : null}
                    {p.links?.live ? (
                      <LinkChip
                        href={p.links.live}
                        label="Live"
                        icon={<ExternalLink size={14} />}
                      />
                    ) : null}
                  </div>
                ) : null}
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
