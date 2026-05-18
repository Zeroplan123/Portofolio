import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import type { ReactNode } from "react";

function SmallTitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-[0.22em] text-muted/90">
      {children}
    </p>
  );
}

function TimelineItem({
  title,
  subtitle,
  period,
  description,
}: {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
}) {
  return (
    <div className="relative pl-10 sm:pl-12">
      <div className="absolute left-2 top-2.5 h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_0_6px_rgba(255,255,255,0.06)] sm:left-3" />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-sm font-semibold tracking-tight">{title}</p>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </div>
        <p className="text-xs font-medium tracking-wide text-muted/90">{period}</p>
      </div>
      {description ? (
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export default function About() {
  const skillGroups = [
    {
      title: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    { title: "Backend", items: ["Node.js", "REST API"] },
    { title: "Tools", items: ["Git"] },
  ];

  const timeline = [
    ...site.experience.map((e) => ({
      title: e.title,
      subtitle: e.company,
      period: e.period,
      description: e.description,
    })),
    ...site.education.map((e) => ({
      title: e.school,
      subtitle: e.major,
      period: e.period,
      description: undefined,
    })),
  ];

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="ABOUT"
          title="About me"
          description="Cerita singkat tentang saya, skill yang saya kuasai, serta perjalanan pendidikan dan pengalaman."
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <Card className="h-full">
              <SmallTitle>INTRO</SmallTitle>
              <h3 className="mt-3 text-pretty text-lg font-semibold tracking-tight">
                Halo, saya {site.name}.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Saya membangun website modern yang{" "}
                <span className="text-foreground/90">rapi</span>,{" "}
                <span className="text-foreground/90">responsif</span>, dan punya{" "}
                <span className="text-foreground/90">interaksi halus</span>. Fokus
                saya: UI system yang konsisten, performa, serta integrasi data yang
                stabil.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Location", value: site.location },
                  { label: "Role", value: site.role },
                  { label: "Email", value: site.email },
                ].map((i) => (
                  <div
                    key={i.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xs text-muted">{i.label}</p>
                    <p className="mt-1 text-sm font-medium text-foreground/90">
                      {i.value}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="h-full">
              <SmallTitle>SKILLS SNAPSHOT</SmallTitle>
              <p className="mt-3 text-sm leading-7 text-muted">
                Stack yang paling sering saya pakai untuk membangun produk end-to-end.
              </p>
              <Stagger className="mt-5 flex flex-wrap gap-2">
                {site.skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <Badge className="bg-white/3">{skill}</Badge>
                  </StaggerItem>
                ))}
              </Stagger>
            </Card>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {skillGroups.map((g, idx) => (
            <Reveal key={g.title} delay={idx * 0.05}>
              <Card className="h-full">
                <p className="text-sm font-semibold tracking-tight">{g.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Fokus kemampuan untuk area {g.title.toLowerCase()}.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Badge key={s} className="bg-white/3">
                      {s}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Reveal>
            <Card>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <SmallTitle>JOURNEY</SmallTitle>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">
                    Experience & education
                  </h3>
                </div>
                <p className="text-sm text-muted">
                  Ringkas timeline yang relevan.
                </p>
              </div>

              <div className="relative mt-6">
                <div className="absolute left-[12px] top-1 bottom-1 w-px bg-white/10 sm:left-[14px]" />
                <div className="space-y-6">
                  {timeline.map((t, idx) => (
                    <Reveal key={`${t.title}-${idx}`} delay={idx * 0.03}>
                      <TimelineItem {...t} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
