import Reveal from "@/components/motion/Reveal";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="EXPERIENCE"
          title="Timeline pengalaman"
          description="Pengalaman kerja/magang yang relevan — ditulis sebagai timeline vertikal modern."
        />

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10 sm:left-6" />

          <div className="space-y-6">
            {site.experience.map((item, idx) => (
              <Reveal key={`${item.company}-${idx}`} delay={idx * 0.05}>
                <div className="relative pl-12 sm:pl-16">
                  <div className="absolute left-3 top-7 h-3 w-3 rounded-full [background:linear-gradient(90deg,var(--accent-2),var(--accent-1))] shadow-[0_0_0_6px_rgba(124,58,237,0.12)] sm:left-5" />
                  <Card className="hover:glow-ring transition">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold tracking-tight">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted">{item.company}</p>
                      </div>
                      <p className="text-xs font-medium tracking-wide text-muted/90">
                        {item.period}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      {item.description}
                    </p>
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

